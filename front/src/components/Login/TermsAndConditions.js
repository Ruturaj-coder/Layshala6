import React from "react";
import { Modal, Button } from "react-bootstrap";

const TermsAndConditions = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Terms and Conditions</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
        <ol>
          <li>Minimum age for admission is 5 years; for exams, it is 7 years.</li>
          <li>Batches have two scheduled classes per week, combining theory and practical dance.</li>
          <li>
            Extra training sessions on Tabla will depend on the portion completed and availability.
            Students bear the Tabla fees, which are split among them.
          </li>
          <li>
            Curriculum is fixed per examination syllabus but aims to go beyond the curriculum.
          </li>
          <li>
            Minimum 80% attendance and no pending dues are required to qualify for exams/certifications.
            Attendance log will be maintained, and regularity contributes to marks.
          </li>
          <li>
            Dress Code:
            <ul>
              <li>Boys and girls: Indian dress code (Salwar/Leggings, Kurta, and Dupatta).</li>
              <li>Not permitted: Sleeveless tops, shorts, jeans, skirts.</li>
              <li>Shoes must be removed during class.</li>
              <li>Ghungroos are sacred and must be respected.</li>
            </ul>
          </li>
          <li>Bring notebook, pen, water bottle, ghungroos, and a napkin to every class.</li>
          <li>
            Absenteeism is discouraged. Fees must be paid regardless of attendance.
          </li>
          <li>
            Once the planned curriculum is completed, an internal assessment is conducted.
          </li>
          <li>
            Pending dues disqualify students from final exams. Fees are non-pro-ratable.
          </li>
          <li>
            Participation in stage performances requires prior approval. Uniform costume and jewelry are mandatory.
          </li>
          <li>
            Students contribute monetarily and volunteer for annual performances.
          </li>
          <li>
            The teacher/guru decides on a student’s continuation in case of discrepancies.
          </li>
          <li>
            Hygiene and cleanliness are a shared responsibility between the association and students.
          </li>
          <li>
            Health-related issues must be disclosed, and a fitness certificate may be required for serious conditions.
          </li>
          <li>
            Doubts/discussions require prior appointments with the teacher/guru.
          </li>
          <li>
            Leaves require prior approval from the teacher/guru via phone or personal message.
          </li>
          <li>
            Notes and compositions taught in class are confidential and cannot be shared externally.
          </li>
        </ol>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TermsAndConditions;
