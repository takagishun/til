import { createServer } from "http";
import fs from "fs";
import { parse } from "url";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url || "", true);
    handle(req, res, parsedUrl);

    if (req.method === "POST") {
      const writable = fs.createWriteStream("./src/tmp/data.png");
      req.on("end", () => {
        res.writeHead(200).end();
      });
      req.pipe(writable);
    }
  }).listen(3000, () => {
    console.log("> Ready on http://localhost:3000");
  });
});
