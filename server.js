// # Resume Filtering Website (Project Semester 7)
// # Group Member Details
// # Member1 : Harsh Shah (IU1941230147)
// # Member2 : Runil Patel (IU1941230140)
// ##### Project URLs  
// # GitHub Repository: https://github.com/coderharsh02/api-resume-filtering-website
// # Heroku URL:        https://resume-filtering-web.herokuapp.com/api/applicant
////////////////////////////////////////////////////////////////////////////////////

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const ApplicantRoute = require("./routes/applicant");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/keys.env" });

// Database Connection
mongoose.connect(process.env.MONGO_DB_KEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("Connection Established Successfully");
});

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 3000;

app.use("/api/applicant", ApplicantRoute);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
