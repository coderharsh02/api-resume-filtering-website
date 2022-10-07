const fs = require("fs");
const pdfParse = require("pdf-parse");
const Applicant = require("../models/Applicant");

const skills = [" C ", "C++", "Java", "Python", "Javascript", "database"];

const index = (req, res, next) => {
  Applicant.find()
    .then((response) => {
      res.json({ response });
    })
    .catch((err) => {
      res.json({ message: "An error Occurred" });
    });
};

const show = (req, res, next) => {
  let applicantID = req.body.applicantID;
  Applicant.findById(applicantID)
    .then((response) => {
      res.json({ response });
    })
    .catch((err) => {
      res.json({ message: "An error Occurred" });
    });
};

const store = (req, res, next) => {
  var applicant = new Applicant({
    name: req.body.name,
    email: req.body.email,
    roleAppliedFor: req.body.roleAppliedFor,
  });

  pdfText = "";

  if (req.file) {
    pdfFile = fs.readFileSync("uploads/" + req.file.filename);
    pdfParse(pdfFile)
      .then((data) => {
        pdfText = data.text;
        applicant.skills = skills.filter((skill) => pdfText.includes(skill));
        applicant.resume = req.file.path;

        applicant
          .save()
          .then((response) => {
            res.json({
              message: "Applicant Added Successfully!",
            });
          })
          .catch((err) => {
            res.json({
              message: err,
            });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const update = (req, res, next) => {
  let applicantID = req.body.applicantID;
  let updatedData = {
    name: req.body.name,
    email: req.body.email,
    roleAppliedFor: req.body.roleAppliedFor,
    skills: [],
  };

  pdfText = "";
  if (req.file) {
    pdfFile = fs.readFileSync("uploads/" + req.file.filename);
    pdfParse(pdfFile)
      .then((data) => {
        pdfText = data.text;
        console;
        updatedData.skills = skills.filter((skill) => pdfText.includes(skill));
        console.log("req.file.path" , updatedData.skills);
        updatedData.resume = req.file.path;
        Applicant.findByIdAndUpdate(applicantID, { $set: updatedData })
          .then(() => {
            res.json({
              message: "Applicant updated successfully!",
            });
          })
          .catch((error) => {
            res.json({
              message: "An error occurred",
            });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// delete an applicant
const destroy = (req, res, next) => {
  let applicantID = req.body.applicantID;
  Applicant.findOneAndRemove(applicantID)
    .then(() => {
      res.json({
        message: "Applicant deleted successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occurred!",
      });
    });
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
