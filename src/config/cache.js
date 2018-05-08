const cacheInfo = require('./baseConfig').cache;

function setResHeader(state, req, res) {
  if (cacheInfo.cacheControl) {
    res.setHeader('Cache-Control', `public, max-age=${cacheInfo.maxAge}`);
  }
  if (cacheInfo.expires) {
    res.setHeader('Expires', new Date(Date.now() + cacheInfo.maxAge).toUTCString());
  }
  if (cacheInfo.lastModified) {
    res.setHeader('Last-Modified', state.mtime.toUTCString());
  }
  if (cacheInfo.etag) {
    res.setHeader('Etag', state.mtime.toUTCString());
  }
}

module.exports = (state, req, res) => {
  setResHeader(state, req, res);
  const lastModified = req.headers['if-modified-since'];
  const etag = req.headers['if-none-match'];
  if (lastModified && lastModified === res.getHeader('Last-Modified')) {
    return true;
  }
  if (etag && lastModified === res.getHeader('Etag')) {
    return true;
  }
  return false;
};