import Student from "../models/studentModel.js";
import errorHandler from "../utils/errorHandler.js";

export const studentRegistration = async (req, res) => {
  try {
    const {
      studentNo,
      firstName,
      lastName,
      middleName,
      year,
      section,
      course,
      email,
      phoneNo,
    } = req.body;

    const errors = [];
    const existingEmail = await Student.findOne({ email });
    const existingStudentNo = await Student.findOne({ studentNo });

    if (!studentNo) {
      errors.push({
        field: "studentNo",
        message: "Student Number is required.",
      });
    }

    if (existingStudentNo) {
      errors.push({
        field: "studentNo",
        message: "Student Number already exists",
      });
    }

    if (!email) {
      errors.push({
        field: "email",
        message: "Email is required",
      });
    }

    if (existingEmail) {
      errors.push({
        field: "email",
        message: "Email already exists",
      });
    }

    if (!firstName) {
      errors.push({
        field: "firstName",
        message: "First Name is required.",
      });
    }

    if (!lastName) {
      errors.push({
        field: "lastName",
        message: "Last Name is required.",
      });
    }

    if (!course) {
      errors.push({
        field: "course",
        message: "Course is required.",
      });
    }

    if (!phoneNo) {
      errors.push({
        field: "phoneNo",
        message: "Phone Number is required.",
      });
    }

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const newStudent = await Student.create({
      picture: req.file ? req.file.filename : "default.jpg",
      studentNo,
      firstName,
      lastName,
      middleName: middleName ? middleName : "",
      year,
      section,
      course,
      email,
      phoneNo,
    });

    res.status(201).send(newStudent);
  } catch (err) {
    errorHandler(res, err);
  }
};

export const editStudent = async (req, res) => {
  const student = await Student.findById(req.params.id);
  const {
    studentNo,
    firstName,
    lastName,
    middleName,
    year,
    section,
    course,
    email,
    phoneNo,
  } = req.body;

  try {
    student.studentNo = studentNo || student.studentNo;
    student.firstName = firstName || student.firstName;
    student.lastName = lastName || student.lastName;
    student.middleName = middleName !== undefined ? middleName : "";
    student.email = email || student.email;
    student.picture = req.file ? req.file.filename : student.picture;
    student.year = year || student.year;
    student.section = section || student.section;
    student.course = course || student.course;
    student.phoneNo = phoneNo || student.phoneNo;

    const updatedStudent = await student.save();

    res.status(200).json(updatedStudent);
  } catch (err) {
    errorHandler(res, err);
  }
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    await Student.findByIdAndDelete(id);

    res.status(200).send("Delete Successfully");
  } catch (err) {
    errorHandler(res, err);
  }
};
