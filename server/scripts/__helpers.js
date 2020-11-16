module.exports = {
  createDbUrlPreview: url => {
    if (!url) return 'DB URL missing!';
    const parts = url.split('@');
    if (parts.length < 2) return 'DB URL invalid!';
    return '***' + parts[1];
  },
};
