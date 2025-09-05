import type { Context } from 'hono';

export type Locale = 'ja' | 'en';

export type I18nKey =
  | 'app.title'
  | 'home.tagline'
  | 'nav.register'
  | 'nav.login'
  | 'nav.logout'
  | 'nav.profile'
  | 'nav.memoList'
  | 'nav.trash'
  | 'nav.createMemo'
  | 'nav.loggedInAs'
  | 'nav.lang.ja'
  | 'nav.lang.en'
  | 'memo.heading'
  | 'trash.heading'
  | 'notFound.message'
  | 'notFound.title'
  | 'error.message'
  | 'error.title'
  | 'forbidden.heading'
  | 'forbidden.title'
  | 'profile.title'
  | 'profile.changePassword'
  | 'auth.username.exists'
  | 'auth.registered'
  | 'auth.badCredentials'
  | 'auth.loggedIn'
  | 'auth.loggedOut'
  | 'auth.session.invalid'
  | 'auth.password.changed.relogin'
  | 'auth.password.old.wrong'
  | 'auth.password.new.mismatch'
  | 'auth.password.new.same'
  | 'auth.login.required'
  | 'auth.username.required'
  | 'auth.username.max'
  | 'auth.password.min'
  | 'auth.password.regex'
  | 'memo.create.title'
  | 'memo.update.title'
  | 'memo.show.title'
  | 'memo.created'
  | 'memo.updated'
  | 'memo.deleted'
  | 'memo.restored'
  | 'memo.deletedCompletely'
  | 'memo.nochange'
  | 'memo.limit.exceeded'
  | 'memo.empty'
  | 'common.edit'
  | 'memo.shared'
  | 'common.delete'
  | 'memo.restore'
  | 'memo.deleteCompletely'
  | 'common.updated'
  | 'common.created'
  | 'memo.share'
  | 'memo.share.stop'
  | 'form.title'
  | 'form.body'
  | 'form.placeholder.title'
  | 'form.placeholder.body'
  | 'form.title.required'
  | 'form.body.required'
  | 'form.title.max'
  | 'form.body.max'
  | 'auth.password.hint.title'
  | 'auth.password.alnum'
  | 'common.back'
  | 'modal.close'
  | 'share.title'
  | 'share.copy.desc'
  | 'share.copy'
  | 'alert.copied'
  | 'confirm.delete'
  | 'confirm.deleteCompletely'
  | 'confirm.restore'
  | 'confirm.shareCreate'
  | 'confirm.shareStop'
  | 'confirm.logout'
  | 'pager.first'
  | 'pager.prev'
  | 'pager.next'
  | 'pager.last';

const dict: Record<Locale, Record<I18nKey, string>> = {
  ja: {
    'app.title': 'Simple Memo App',
    'home.tagline': '極めてシンプルなメモアプリ。',
    'nav.register': '新規登録',
    'nav.login': 'ログイン',
    'nav.logout': 'ログアウト',
    'nav.profile': 'プロフィール',
    'nav.memoList': 'メモ一覧',
    'nav.trash': 'ゴミ箱',
    'nav.createMemo': 'メモを作成',
    'nav.loggedInAs': 'ログイン中',
    'nav.lang.ja': '日本語',
    'nav.lang.en': 'English',
    'memo.heading': 'Memo',
    'trash.heading': 'ゴミ箱',
    'notFound.message': 'ページが見つかりませんでした。code: 404 Not Found',
    'notFound.title': '404 Not Found',
    'error.message': 'エラーが発生しました。code: 500 Internal Server Error',
    'error.title': '500 Internal Server Error',
    'forbidden.heading': 'アクセスが許可されていません',
    'forbidden.title': 'Forbidden',
    'profile.title': 'プロフィール',
    'profile.changePassword': 'パスワード変更',
    'auth.username.exists': '{username}は既に登録されています',
    'auth.registered': '{username}の登録が完了しました',
    'auth.badCredentials': 'ユーザー名またはパスワードが違います',
    'auth.loggedIn': 'ログインしました',
    'auth.loggedOut': 'ログアウトしました',
    'auth.session.invalid': 'セッション状態が不正です。ログインし直してください。',
    'auth.password.changed.relogin': 'パスワードを変更しました。ログインし直してください。',
    'auth.password.old.wrong': '現在のパスワードが違います',
    'auth.password.new.mismatch': '新しいパスワードが一致しません',
    'auth.password.new.same': '新しいパスワードは現在のパスワードと異なる必要があります',
    'auth.login.required': 'ログインしてください',
    'auth.username.required': 'ユーザー名を入力してください',
    'auth.username.max': 'ユーザー名は{max}文字以下で入力してください',
    'auth.password.min': 'パスワードは{min}文字以上で入力してください',
    'auth.password.regex': 'パスワードは英字の大文字・小文字、そして数字をそれぞれ1文字以上含む必要があります',
    'memo.create.title': '新規作成',
    'memo.update.title': 'メモの更新',
    'memo.show.title': 'メモの表示',
    'memo.created': 'メモを作成しました',
    'memo.updated': 'メモを更新しました',
    'memo.deleted': 'メモを削除しました',
    'memo.restored': 'メモを復元しました',
    'memo.deletedCompletely': 'メモを完全に削除しました',
    'memo.nochange': '変更がありません',
    'memo.limit.exceeded': 'メモは{max}個までしか作成できません',
    'memo.empty': 'メモがありません。',
    'common.edit': '編集',
    'memo.shared': '共有中',
    'common.delete': '削除',
    'memo.restore': '復元',
    'memo.deleteCompletely': '完全に削除',
    'common.updated': '更新',
    'common.created': '作成',
    'memo.share': '共有',
    'memo.share.stop': '共有を停止',
    'form.title': 'Title',
    'form.body': 'Body',
    'form.placeholder.title': 'タイトルを入力',
    'form.placeholder.body': 'メモ内容を入力',
    'common.back': '戻る',
    'form.title.required': 'タイトルを入力してください',
    'form.body.required': '本文を入力してください',
    'form.title.max': 'タイトルは{max}文字以内で入力してください',
    'form.body.max': '本文は{max}文字以内で入力してください',
    'modal.close': '閉じる',
    'share.title': '共有リンク',
    'share.copy.desc': '共有リンクをコピーしてください',
    'share.copy': 'コピー',
    'alert.copied': 'コピーしました',
    'auth.password.hint.title': 'パスワードの要件:',
    'auth.password.alnum': '半角英数字のみ使用可能です',
    'confirm.delete': '本当に削除しますか？',
    'confirm.deleteCompletely': '完全に削除します。本当に削除しますか？',
    'confirm.restore': '本当に復元しますか？',
    'confirm.shareCreate': '共有リンクを新たに作成しますか？',
    'confirm.shareStop': '共有を停止しますか？共有リンクが無効化されます。',
    'confirm.logout': 'ログアウトしますか？',
    'pager.first': '最初',
    'pager.prev': '前',
    'pager.next': '次',
    'pager.last': '最後',
  },
  en: {
    'app.title': 'Simple Memo App',
    'home.tagline': 'A very simple memo app.',
    'nav.register': 'Register',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    'nav.profile': 'Profile',
    'nav.memoList': 'Memos',
    'nav.trash': 'Trash',
    'nav.createMemo': 'Create Memo',
    'nav.loggedInAs': 'Logged in as',
    'nav.lang.ja': '日本語',
    'nav.lang.en': 'English',
    'memo.heading': 'Memo',
    'trash.heading': 'Trash',
    'notFound.message': 'Page not found. code: 404 Not Found',
    'notFound.title': '404 Not Found',
    'error.message': 'An error occurred. code: 500 Internal Server Error',
    'error.title': '500 Internal Server Error',
    'forbidden.heading': 'Access is not allowed',
    'forbidden.title': 'Forbidden',
    'profile.title': 'Profile',
    'profile.changePassword': 'Change Password',
    'auth.username.exists': '{username} is already registered',
    'auth.registered': 'Registered {username} successfully',
    'auth.badCredentials': 'Incorrect username or password',
    'auth.loggedIn': 'Logged in',
    'auth.loggedOut': 'Logged out',
    'auth.session.invalid': 'Invalid session state. Please log in again.',
    'auth.password.changed.relogin': 'Password changed. Please log in again.',
    'auth.password.old.wrong': 'Current password is incorrect',
    'auth.password.new.mismatch': 'New passwords do not match',
    'auth.password.new.same': 'New password must be different from current password',
    'auth.login.required': 'Please log in',
    'auth.username.required': 'Please enter a username',
    'auth.username.max': 'Username must be at most {max} characters',
    'auth.password.min': 'Password must be at least {min} characters',
    'auth.password.regex': 'Password must include at least one uppercase letter, one lowercase letter, and one number',
    'memo.create.title': 'Create Memo',
    'memo.update.title': 'Update Memo',
    'memo.show.title': 'View Memo',
    'memo.created': 'Memo created',
    'memo.updated': 'Memo updated',
    'memo.deleted': 'Memo deleted',
    'memo.restored': 'Memo restored',
    'memo.deletedCompletely': 'Memo permanently deleted',
    'memo.nochange': 'No changes',
    'memo.limit.exceeded': 'You can only create up to {max} memos',
    'memo.empty': 'No memos.',
    'common.edit': 'Edit',
    'memo.shared': 'Shared',
    'common.delete': 'Delete',
    'memo.restore': 'Restore',
    'memo.deleteCompletely': 'Delete Permanently',
    'common.updated': 'Updated',
    'common.created': 'Created',
    'memo.share': 'Share',
    'memo.share.stop': 'Stop Sharing',
    'form.title': 'Title',
    'form.body': 'Body',
    'form.placeholder.title': 'Enter title',
    'form.placeholder.body': 'Enter memo content',
    'common.back': 'Back',
    'form.title.required': 'Please enter title',
    'form.body.required': 'Please enter body',
    'form.title.max': 'Title must be at most {max} characters',
    'form.body.max': 'Body must be at most {max} characters',
    'modal.close': 'Close',
    'share.title': 'Share Link',
    'share.copy.desc': 'Copy the share link',
    'share.copy': 'Copy',
    'alert.copied': 'Copied',
    'auth.password.hint.title': 'Password requirements:',
    'auth.password.alnum': 'Only alphanumeric characters are allowed',
    'confirm.delete': 'Are you sure you want to delete?',
    'confirm.deleteCompletely': 'This will permanently delete. Continue?',
    'confirm.restore': 'Restore this memo?',
    'confirm.shareCreate': 'Create a new share link?',
    'confirm.shareStop': 'Stop sharing? The link will be disabled.',
    'confirm.logout': 'Do you want to logout?',
    'pager.first': 'First',
    'pager.prev': 'Prev',
    'pager.next': 'Next',
    'pager.last': 'Last',
  },
};

const isLocale = (v: string | undefined): v is Locale => v === 'ja' || v === 'en';

export const getLocale = (c: Context): Locale => {
  const lang = (c.get('language') as string | undefined) || 'ja';
  return isLocale(lang) ? lang : 'ja';
};

export const t = (c: Context, key: I18nKey, params?: Record<string, string | number>): string => {
  const locale = getLocale(c);
  let s = dict[locale][key] ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      s = s.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    }
  }
  return s;
};
