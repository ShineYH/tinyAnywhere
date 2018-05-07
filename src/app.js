const http = require('http');
const conf = require('./config/baseConfig');
const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const handlebars = require('handlebars');
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const mimeType = require('./config/mimeType');
/*eslint no-undef: "off"*/
const tplPath = path.join(__dirname, './template/temp.tpl');
const source = fs.readFileSync(tplPath);
const template = handlebars.compile(source.toString());

const server = http.createServer(async (req, res) => {
  const root = conf.root;
  const filePath = path.join(root, req.url);
  try {
    const st = await stat(filePath);
    if (st.isFile()) {
      res.statusCode = 200;
      const contentType = mimeType(filePath);
      res.setHeader('Content-Type' ,contentType);
      fs.createReadStream(filePath).pipe(res);
    } else if (st.isDirectory()) {
      const files = await readdir(filePath);
      res.statusCode = 200;
      res.setHeader('Content-Type' ,'text/html');
      // dir为文件相对于root的路径
      const dir = path.relative(conf.root, filePath);
      const data = {
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : '',  // 1.dir前面要加/,conf.root就是根目录 2.path.relative 当访问是跟路径时，返回空，所以要判断dir
        files
      };
      res.end(template(data));
    }
  } catch (err) {
    res.statusCode = 400;
    res.setHeader('Content-Type' ,'text/plain');
    res.end(`${filePath} is not a file or directory`);
  }
});

server.listen(conf.port , conf.hostname , () => {
  const url = `http://${conf.hostname}:${conf.port}`;
  /* eslint-disable-next-line */
  console.info(`server started at ${url}`);
});

