import { Hono } from 'hono';
import { ensureLoginedMiddleware, type LoginedEnv } from '../../session.js';
import Profile from '../../components/profile/Profile.js';

const profileApp = new Hono<LoginedEnv>();
profileApp.use(ensureLoginedMiddleware);

profileApp.get('/', (c) => {
  const session = c.get('session');

  return c.render(<Profile username={session.user.name} />, {
    title: 'Profile',
  });
});

export default profileApp;
