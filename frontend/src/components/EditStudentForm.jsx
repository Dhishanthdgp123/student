import { useState } from 'react';
import axios from 'axios';

function EditStudentForm({ selectedStudent, getStudents, setEditing }) {
  const [student, setStudent] = useState(selectedStudent);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/students/${student._id}`, student);
    setEditing(false);
    getStudents();
  };

  return (
    <form onSubmit={handleUpdate}>
      <input name="name" value={student.name} onChange={handleChange} /><br/>
      <input name="email" value={student.email} onChange={handleChange} /><br/>
      <input name="phone" value={student.phone} onChange={handleChange} /><br/>
      <button type="submit">Update Student</button>
    </form>
  );
}

export default EditStudentForm;
