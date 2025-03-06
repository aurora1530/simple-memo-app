import { MAX_MEMO_COUNT } from '../src/routes/memo/constant.js';
import {
  type User,
  type Memo,
  users,
  englishMemos,
  japaneseMemos,
} from './sampleData.js';

const url = 'http://localhost:3000';

const createFormData = (data: object): string => {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
};

const getValueToSendFromCookie = (cookie: string): string => {
  return cookie.split(';')[0];
};

/**
 *
 * @param user
 * @returns {Promise<string>} - session cookie
 */
const createUser = async (user: User): Promise<string | undefined> => {
  const formData = createFormData(user);
  const res = await fetch(`${url}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
    credentials: 'include',
    redirect: 'manual',
  });

  if (res.status === 302) {
    const cookie = res.headers.get('set-cookie');
    return cookie ? getValueToSendFromCookie(cookie) : undefined;
  }
};

const loginUser = async (
  user: User,
  sessionCookie: string
): Promise<string | undefined> => {
  const formData = createFormData(user);
  const res = await fetch(`${url}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Cookie: sessionCookie,
    },
    credentials: 'include',
    redirect: 'manual',
    body: formData,
  });
  if (res.status === 302) {
    const cookie = res.headers.get('set-cookie');
    return cookie ? getValueToSendFromCookie(cookie) : undefined;
  }
};

const createMemo = async (memo: Memo, cookie: string): Promise<boolean> => {
  const formData = createFormData(memo);
  const res = await fetch(`${url}/memo/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Cookie: cookie,
    },
    credentials: 'include',
    redirect: 'manual',
    body: formData,
  });

  if (res.status === 302) {
    return true;
  }

  console.error('Failed to create memo');
  return false;
};

const createUserAndMemos = async (user: User) => {
  const sessionCookie = await createUser(user);
  if (!sessionCookie) {
    console.error(`Failed to create user. ${user.username}`);
  }

  const loginCookie = await loginUser(user, sessionCookie ?? '');
  if (!loginCookie) {
    console.error('Failed to login');
    return;
  }
  console.log('User logged in');

  await fetch(`${url}/memo`, {
    method: 'GET',
    headers: {
      Cookie: loginCookie,
    },
    credentials: 'include',
  });

  const jaOrEn = Math.random() < 0.5 ? 'ja' : 'en';
  const memos = jaOrEn === 'ja' ? japaneseMemos : englishMemos;

  const randomizedMemos = memos.sort(() => Math.random() - 0.5);
  const randomizedSize = Math.floor(Math.random() * MAX_MEMO_COUNT) + 1;
  const selectedMemos = randomizedMemos.slice(0, randomizedSize);

  for (const memo of selectedMemos) {
    const result = await createMemo(memo, loginCookie);
    if (!result) {
      console.error('Failed to create memo');
    }
  }

  console.log(`User ${user.username} and ${randomizedSize} memos created`);
};

const createUsersAndMemos = async () => {
  // serverの起動を待つ
  await new Promise<void>((resolve) => {
    let count = 0;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${url}/healthCheck`);
        if (res.ok) {
          clearInterval(interval);
          resolve();
        }
      } catch (e) {
        count++;

        // 10回リトライしてダメだったら終了
        if (count >= 10) {
          console.error('Failed to connect to server');
          clearInterval(interval);
          process.exit(1);
        }
      }
    }, 500);
  });

  console.time('sample data creation');
  await Promise.all(users.map(createUserAndMemos));

  console.timeEnd('sample data creation');
  console.log('All users and memos created');
};

createUsersAndMemos();
