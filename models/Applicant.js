var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var applicantSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  roleAppliedFor: {
    type: String,
  },
  resume: {
    type: String,
  },
  skills: {
    type: Array,
  },
});

const Applicant = mongoose.model("Applicant", applicantSchema);
module.exports = Applicant;
