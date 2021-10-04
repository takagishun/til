import { createServer } from "http";
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
      console.log("content-type =====\n", req.headers["content-type"]);
      let body: any = [];
      req
        .on("data", (chunk) => {
          body.push(chunk);
        })
        .on("end", () => {
          body = Buffer.concat(body);

          console.log("request body======\n" + body);

          res.writeHead(200).end();
        });
    }
  }).listen(3000, () => {
    console.log("> Ready on http://localhost:3000");
  });
});
