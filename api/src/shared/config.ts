export default {
  jwtSecret: 'Top secret string',
  tokens: {
    access: {
      type: 'access',
      expiresIn: 3600,
    },
    refresh: {
      type: 'refresh',
      expiresIn: 15000,
    },
  },
};
