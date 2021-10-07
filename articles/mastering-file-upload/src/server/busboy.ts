import { createServer } from "http";
import fs from "fs";
import { parse } from "url";
import next from "next";
import Busboy from 'busboy'
import {inspect} from "util";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url || "", true);
    handle(req, res, parsedUrl);

    if (req.method === "POST") {
      const busboy = new Busboy({ headers: req.headers });
      busboy.on('file', (fieldname, file, filename) => {
        const writable = fs.createWriteStream(`./src/tmp/${filename}`);
        file.pipe(writable)
      });
      busboy.on('field', (fieldname, val) => {
        console.log('Field [' + fieldname + ']: value: ' + inspect(val));
      });
      busboy.on('finish', function() {
        console.log('Done parsing form!');
        res.end();
      });
      req.pipe(busboy);
    }
  }).listen(3000, () => {
    console.log("> Ready on http://localhost:3000");
  });
});
