import { useState } from 'react';
import axios from 'axios';

function StudentForm({ getStudents }) {
  const [student, setStudent] = useState({ name: '', email: '', phone: '' });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/students', student);
    setStudent({ name: '', email: '', phone: '' });
    getStudents();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={student.name} onChange={handleChange} placeholder="Name" required /><br/>
      <input name="email" value={student.email} onChange={handleChange} placeholder="Email" required /><br/>
      <input name="phone" value={student.phone} onChange={handleChange} placeholder="Phone" required /><br/>
      <button type="submit">Add Student</button>
    </form>
  );
}

export default StudentForm;
