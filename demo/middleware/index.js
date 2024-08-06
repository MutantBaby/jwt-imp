const express = require("express");
const app = express();

function expressMiddlewareOne(request, response, nextMiddleware) {
  console.log("Im Middleware One");
  nextMiddleware();
}

app.get("/", expressMiddlewareOne, (request, response, nextMiddleware) => {
  console.log("Im standard express callback");
  response.send("<h1>Hello World</h1>");
});

app.listen(3000);
