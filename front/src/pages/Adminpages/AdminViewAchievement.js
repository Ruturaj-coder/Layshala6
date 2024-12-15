import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import { Table, Button, Modal, InputGroup, FormControl } from "react-bootstrap";

const AdminViewAchievement = () => {
  const [achievements, setAchievements] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch achievements from the backend
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const token = localStorage.getItem("AdminToken");
        const response = await axios.get(
          "http://localhost:5000/api/admin/achievements",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAchievements(response.data.achievements);
      } catch (err) {
        console.error("Error fetching achievements:", err);
      }
    };

    fetchAchievements();
  }, []);

  // Handle opening and closing the modal
  const handleShowModal = (achievement) => {
    setSelectedAchievement(achievement);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedAchievement(null);
    setShowModal(false);
  };

  // Filter achievements based on search query
  const filteredAchievements = achievements.filter((achievement) =>
    achievement.studentId?.studentName
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const downloadAchievementAsPDF = (achievement) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Achievement Details", 10, 10);

    doc.setFontSize(12);
    doc.text(`Student Name: ${achievement.studentId.studentName}`, 10, 30);
    doc.text(`Event Name: ${achievement.eventName || "N/A"}`, 10, 40);
    doc.text(
      `Event Date: ${new Date(achievement.eventDate).toLocaleDateString()}`,
      10,
      50
    );
    doc.text(`Rank: ${achievement.rank || "N/A"}`, 10, 60);
    doc.text(`Place: ${achievement.place || "N/A"}`, 10, 70);
    doc.text(`State: ${achievement.state || "N/A"}`, 10, 80);
    doc.text(`Event Type: ${achievement.eventtype || "N/A"}`, 10, 90);
    doc.text(`Location: ${achievement.location || "N/A"}`, 10, 100);

    if (achievement.certificate) {
      const certificateImage = `data:image/jpeg;base64,${achievement.certificate}`;
      doc.addImage(certificateImage, "JPEG", 10, 110, 100, 100); // x, y, width, height
    }

    doc.save(`${achievement.studentId.studentName}_Achievement.pdf`);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Achievements</h1>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search by student name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Student Name</th>
            <th>Event Name</th>
            <th>Event Date</th>
            <th>Rank</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAchievements.map((achievement, index) => (
            <tr key={achievement._id}>
              <td>{index + 1}</td>
              <td>{achievement.studentId?.studentName || "N/A"}</td>
              <td>{achievement.eventName || "N/A"}</td>
              <td>{new Date(achievement.eventDate).toLocaleDateString()}</td>
              <td>{achievement.rank || "N/A"}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleShowModal(achievement)}
                >
                  View Certificate
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Modal for Viewing Certificate */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Achievement Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAchievement && (
            <div>
              <p>
                <strong>Student Name:</strong>{" "}
                {selectedAchievement.studentId.studentName}
              </p>
              <p>
                <strong>Event Name:</strong> {selectedAchievement.eventName || "N/A"}
              </p>
              <p>
                <strong>Event Date:</strong>{" "}
                {new Date(selectedAchievement.eventDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Rank:</strong> {selectedAchievement.rank || "N/A"}
              </p>
              <p>
                <strong>Place:</strong> {selectedAchievement.place || "N/A"}
              </p>
              <p>
                <strong>State:</strong> {selectedAchievement.state || "N/A"}
              </p>
              <p>
                <strong>Event Type:</strong> {selectedAchievement.eventtype || "N/A"}
              </p>
              <p>
                <strong>Location:</strong> {selectedAchievement.location || "N/A"}
              </p>
              <p>
                <strong>Certificate:</strong>
              </p>
              {selectedAchievement.certificate && (
                <img
                  src={`data:image/jpeg;base64,${selectedAchievement.certificate}`}
                  alt="Certificate"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              )}
              <button
                className="btn btn-primary mt-3"
                onClick={() => downloadAchievementAsPDF(selectedAchievement)}
              >
                Download as PDF
              </button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminViewAchievement;
