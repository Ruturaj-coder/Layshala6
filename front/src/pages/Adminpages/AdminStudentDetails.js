import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Table, Button, InputGroup, FormControl } from "react-bootstrap";

const AdminStudentDetails = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch students from the backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("AdminToken");
        const response = await axios.get("http://localhost:5000/api/admin/students", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(response.data.students);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };

    fetchStudents();
  }, []);

  // Handle opening and closing the modal
  const handleShowModal = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
    setShowModal(false);
  };

  // Filter students based on search query
  const filteredStudents = students.filter((student) =>
    student.studentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Student Details</h1>

      {/* Search Bar */}
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search by student name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>

      {/* Student Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={student._id}>
              <td>{index + 1}</td>
              <td>{student.studentName}</td>
              <td>{student.phonePrimary}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>{student.gender}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleShowModal(student)}
                >
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Detailed View */}
      {selectedStudent && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedStudent.studentName}'s Full Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Display Student Photo */}
            <div className="text-center mb-4">
              <img
                src={selectedStudent.image}
                alt="Student Photo"
                className="img-fluid rounded"
                style={{ maxWidth: "200px", height: "auto" }}
              />
            </div>

            {/* Display All Details */}
            <div>
              <p><strong>Venue:</strong> {selectedStudent.venue}</p>
              <p><strong>Date:</strong> {new Date(selectedStudent.date).toLocaleDateString()}</p>
              <p><strong>Date of Birth:</strong> {new Date(selectedStudent.dob).toLocaleDateString()}</p>
              <p><strong>Age:</strong> {selectedStudent.age}</p>
              <p><strong>School:</strong> {selectedStudent.school}</p>
              <p><strong>Grade:</strong> {selectedStudent.grade}</p>
              <p><strong>College:</strong> {selectedStudent.college}</p>
              <p><strong>Occupation:</strong> {selectedStudent.occupation}</p>
              <p><strong>Gender:</strong> {selectedStudent.gender}</p>
              <p><strong>Marital Status:</strong> {selectedStudent.maritalStatus}</p>
              <p><strong>Aadhaar No:</strong> {selectedStudent.aadhaarNo}</p>
              <p><strong>PAN No:</strong> {selectedStudent.panNo}</p>
              <p><strong>Religion:</strong> {selectedStudent.religion}</p>
              <p><strong>Caste:</strong> {selectedStudent.caste}</p>
              <p><strong>Nationality:</strong> {selectedStudent.nationality}</p>
              <p><strong>Previous Dance Education:</strong> {selectedStudent.previousDanceEducation}</p>
              <p><strong>Guru Name:</strong> {selectedStudent.guruName}</p>
              <p><strong>Exams Appeared:</strong> {selectedStudent.examsAppeared}</p>
              <p><strong>Gharana:</strong> {selectedStudent.gharana}</p>
              <p><strong>Father's Name:</strong> {selectedStudent.parentDetails.fatherName}</p>
              <p><strong>Father's Occupation:</strong> {selectedStudent.parentDetails.fatherOccupation}</p>
              <p><strong>Mother's Name:</strong> {selectedStudent.parentDetails.motherName}</p>
              <p><strong>Mother's Occupation:</strong> {selectedStudent.parentDetails.motherOccupation}</p>
              <p><strong>Home Address:</strong> {selectedStudent.homeAddress}</p>
              <p><strong>Primary Phone:</strong> {selectedStudent.phonePrimary}</p>
              <p><strong>Alternate Phone:</strong> {selectedStudent.phoneAlternate}</p>
              <p><strong>Email:</strong> {selectedStudent.email}</p>
              <p><strong>Emergency Contact:</strong> {selectedStudent.emergencyContact}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default AdminStudentDetails;
