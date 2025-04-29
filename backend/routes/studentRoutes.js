const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// ✅ Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Create new student
router.post('/', async (req, res) => {
  const { name, email, phone } = req.body;
  const newStudent = new Student({ name, email, phone });

  try {
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Update student (PUT = full update)
router.put('/:id', async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true, runValidators: true } // ✅ Always validate and return new doc
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Delete student
router.delete('/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; // ✅ Final export
