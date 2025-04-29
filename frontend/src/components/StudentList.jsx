import axios from 'axios';

function StudentList({ students, getStudents, setSelectedStudent, setEditing }) {

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:5000/api/students/${id}`);
    getStudents();
  };

  return (
    <div>
      <h2>Students</h2>
      {students.map((student) => (
        <div key={student._id}>
          <p>{student.name} | {student.email} | {student.phone}</p>
          <button onClick={() => {
            setSelectedStudent(student);
            setEditing(true);
          }}>
            Edit
          </button>
          <button onClick={() => deleteStudent(student._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default StudentList;
