// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:timestamp", function (req, res) {
  let { timestamp } = req.params;

  //Check if unix
  if (Number(timestamp)) {
    const utc = new Date(Number(timestamp)).toUTCString();
    const unix = Number(timestamp);

    return res.json({ unix, utc });

    // Check if timestamp can parse
  } else if (new Date(timestamp) != "Invalid Date") {
    const utc = new Date(timestamp).toUTCString();
    const unix = Date.parse(new Date(timestamp));

    return res.json({ unix, utc });
  }

  return res.json({ error: "Invalid Date" });
});

app.get("/api", function (req, res) {
  const timestamp = new Date();
  const utc = timestamp.toUTCString();
  const unix = Date.parse(timestamp);

  return res.send({ unix, utc });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
