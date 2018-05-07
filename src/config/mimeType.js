const mime = require('mime');
const path = require('path');

module.exports = (filePath) => {
  let ext = path.extname(filePath);
  if (ext) {
    ext = filePath;
  }
  return mime.getType(ext) || 'text/plain';
};
