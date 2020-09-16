module.exports = {
  async up(db, client) {
    db.collection('tokens').createIndex({ createdAt: -1 }, { expireAfterSeconds: 3600 });
  },

  async down(db, client) {
    db.collection('tokens').dropIndex({ createdAt: -1 }, { expireAfterSeconds: 3600 });
  },
};
