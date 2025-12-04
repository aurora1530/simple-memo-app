import { createMiddleware } from 'hono/factory';
import type { Context } from 'hono';
import { getCookie, setCookie } from 'hono/cookie';
import type { Locale } from './index.js';

const isLocale = (v: string | undefined): v is Locale => v === 'ja' || v === 'en';

const detectFromAcceptLanguage = (c: Context): Locale | undefined => {
  const header = c.req.header('accept-language');
  if (!header) return undefined;
  const lower = header.toLowerCase();
  // Very small parser: prefer order of appearance
  if (lower.includes('ja')) return 'ja';
  if (lower.includes('en')) return 'en';
  return undefined;
};

export const i18nMiddleware = createMiddleware<{
  Variables: { language: Locale };
}>(async (c, next) => {
  // Priority: query -> cookie -> accept-language -> default('ja')
  const q = c.req.query('lang');
  let lang: Locale | undefined;
  if (isLocale(q)) {
    lang = q;
    setCookie(c, 'lang', lang, {
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
    });
  } else {
    const cookieLang = getCookie(c, 'lang');
    if (isLocale(cookieLang)) {
      lang = cookieLang;
    } else {
      lang = detectFromAcceptLanguage(c) ?? 'ja';
    }
  }

  c.set('language', lang);
  await next();
});

