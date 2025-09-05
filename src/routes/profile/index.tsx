import { Hono } from 'hono';
import { ensureAuthenticatedMiddleware, type AuthenticatedEnv } from '../../session.js';
import Profile from '../../components/profile/Profile.js';
import { t } from '../../i18n/index.js';

const profileApp = new Hono<AuthenticatedEnv>();
profileApp.use(ensureAuthenticatedMiddleware);

profileApp.get('/', (c) => {
  const session = c.get('session');

  return c.render(<Profile username={session.user.name} />, { title: t(c, 'profile.title') });
});

export default profileApp;
