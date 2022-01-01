var jsonServer = require("json-server");
const low = require("lowdb");
var server = jsonServer.create();
const db = low("db.json");

// Add custom routes before JSON Server router
server.get(
  "/data/:id/sessions/:sessionId/voters/:voterName",
  function (req, res) {
    // See https://github.com/typicode/lowdb
    var user = db
      .get("sessions")
      .find({ id: sessionId })
      .get("voters")
      .find({ voterName })
      .value();
    if (user) {
      res.jsonp(user);
    } else {
      res.sendStatus(404);
    }
  }
);

server.use(function (req, res, next) {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

// Use default router
// server.use(router)
server.listen(3000, function () {
  console.log("JSON Server is running");
});
