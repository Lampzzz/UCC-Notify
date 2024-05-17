import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  studentNo: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  middleName: {
    type: String,
  },

  year: {
    type: String,
    required: true,
  },

  section: {
    type: String,
    required: true,
  },

  course: {
    type: String,
    required: true,
  },

  phoneNo: {
    type: Numbeer,
    required: true,
  },

  picture: { type: String, required: true },

  createdAt: {
    type: String,
    default: new Date(),
    required: true,
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
