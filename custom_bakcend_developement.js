const http = require("http");
const url = require("url");

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject("Invalid Json");
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const method = req.method;
  const parseUrl = url.parse(req.url, true);
  const path = parseUrl.pathname;

  if (method === "POST" && path === "/register") {
    try {
      const { username, email, password } = await parseBody(req);
      if (!username || !password) {
        res.writeHead(400).end("user not fouhnd");
        return;
      }
      console.log(username);
      console.log(email);
      console.log(password);
      return res.writeHead(201).end("register succesfullt");
    } catch (error) {}
  }
});

server.listen(3000, () => {
  console.log("listening on port 3000");
});
