const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/connection");
const imageUploadRoutes = require("./routes/image.route");

dotenv.config();
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use("/public", express.static("uploads"));
app.use(cors());
app.use(
  morgan((tokens, req, res) =>
    [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ")
  )
);

app.get("/", (req, res) => {
  res.json({
    message: "POST on /uploads to upload your file 🙂",
  });
});

// Upload Endpoints
app.use("/uploads", imageUploadRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Alive on http://localhost:${process.env.PORT}`);
  connectDB();
});
