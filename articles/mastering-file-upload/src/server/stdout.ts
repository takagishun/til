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
      console.log("content-type:", req.headers["content-type"]);
      req
        .on("data", (chunk) => {
          // console.log(`Received ${chunk.length} bytes of data.`);
          process.stdout.write(chunk)
        })
        .on("end", () => {
          res.writeHead(200).end();
        });
    }
  }).listen(3000, () => {
    console.log("> Ready on http://localhost:3000");
  });
});
