const path = require('path');

const env = process.env.NODE_ENV;

const getKeyDir = () => {
  const devKeysDir = path.resolve(__dirname, '../keys');
  const envKeysDir = process.env.KEYS_DIR;

  if (env === 'development' && !envKeysDir) {
    console.log('\x1b[43m\x1b[30m You use unsafe security keys for development \x1b[0m');
    return devKeysDir;
  }

  if (!envKeysDir) {
    console.log('\x1b[41m\x1b[30m You use unsafe security keys for development in production! \x1b[0m');
    return devKeysDir;
  }

  return envKeysDir;
};

const keysDir = getKeyDir();

const pubKeyPath = path.resolve(keysDir, 'private.key');
const privKeyPath = path.resolve(keysDir, 'public.key');

module.exports = {
  auth: {
    keys: {
      pub: pubKeyPath,
      priv: privKeyPath,
    },
    providers: {
      google: {
        clientId: '8073520539-8us40p8qccin3pv7ken41fdmaj6la655.apps.googleusercontent.com',
        clientSecret: 'QS68ySaEHOnhgnSIzNoNQkY8',
        scope: [],
      },
      facebook: {
        clientId: '983697358646093', // '2230353447281120',
        clientSecret: 'deda7705792c1eea4d30be0e081e31db', // '76975c78f2c6156be58a339b5280d275',
        callbackUrl: '/signin/facebook/callback',
        scope: ['public_profile', 'email', 'user_age_range', 'user_gender'], // https://developers.facebook.com/docs/facebook-login/permissions
      },
    },
  },
};
