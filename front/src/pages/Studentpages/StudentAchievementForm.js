import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/AchievementForm.css"; // For additional custom styles
import axios from "axios";
import statesData from "../../data/states.json"; // Import the states data

const StudentAchievementForm = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    rank: "",
    place: "", // New field
    state: "",
    eventtype: "",
    location: "", // New field
    certificate: null,
  });

  const [achievements, setAchievements] = useState([]);

  // Fetch previous achievements
  const fetchAchievements = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("User is not logged in");

      const response = await axios.get(
        "http://localhost:5000/api/student/achievements",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAchievements(response.data.achievements); // Assuming achievements are in the response data
    } catch (error) {
      console.error("Error fetching achievements:", error);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, certificate: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("User is not logged in");

      const formDataToSend = new FormData();
      formDataToSend.append("eventName", formData.eventName);
      formDataToSend.append("eventDate", formData.eventDate);
      formDataToSend.append("rank", formData.rank);
      formDataToSend.append("place", formData.place);
      formDataToSend.append("state", formData.state);
      formDataToSend.append("eventtype", formData.eventtype);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("certificate", formData.certificate);

      await axios.post(
        "http://localhost:5000/api/student/achievements",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Fetch updated achievements
      fetchAchievements();
    } catch (error) {
      console.error("Error submitting achievement:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4>Submit Your Achievement</h4>
          <p className="text-muted">"Showcase Your Triumphs! 🏆 Let Your Achievements Shine Bright 🏅."</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Name of the Event:</label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              placeholder="Enter the event name"
              required
            />
          </div>

          <label className="col-sm-2 col-form-label">Date of the Event:</label>
          <div className="col-sm-4">
            <input
              type="date"
              className="form-control"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Rank Achieved:</label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              name="rank"
              value={formData.rank}
              onChange={handleChange}
              placeholder="Enter the rank"
              required
            />
          </div>

          <label className="col-sm-2 col-form-label">Place:</label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              name="place"
              value={formData.place}
              onChange={handleChange}
              placeholder="Enter the place"
              required
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label">State</label>
          <div className="col-sm-4">
            <select
              className="form-control"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              {statesData.states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <label className="col-sm-2 col-form-label">Event Type</label>
          <div className="col-sm-4">
            <select
              className="form-control"
              id="eventtype"
              name="eventtype"
              value={formData.eventtype}
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              <option value="Exam Certification">Exam Certification</option>
              <option value="Event Performances">Event Performances</option>
              <option value="Competition">Competition</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Location/Address:</label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter the location/address"
              rows="3"
              required
            ></textarea>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Upload Certificate:</label>
          <div className="col-sm-10">
            <input
              type="file"
              className="form-control"
              accept=".jpg,.jpeg,.png,.gif,.svg"
              onChange={handleFileChange}
              required
            />
            <small className="form-text text-muted">
              SVG, PNG, JPG, or GIF (max. 800x400px)
            </small>
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-warning px-5">
            Submit Achievement
          </button>
        </div>
      </form>

      {/* Existing Previous Achievements Section */}
      {/* Existing Previous Achievements Section */}

      <div className="mt-4">
  <div
    className="card p-4"
    style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}
  >
    <h4
      className="text-center"
      style={{
        fontFamily: "Noto Sans",
        fontWeight: "800",
        fontSize: "20px",
        opacity: "0.5",
      }}
    >
      PREVIOUS ACHIEVEMENTS
    </h4>
    <div className="row">
      {achievements.length > 0 ? (
        achievements.map((achievement) => (
          <div
            key={achievement._id}
            className="col-md-4 mb-4"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              className="card card-hover"
              style={{
                width: "100%",
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#ffffff",
                overflow: "hidden",
              }}
            >
              <img
                src={`data:image/jpg;base64,${achievement.certificate}`}
                alt="certificate"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <div style={{ padding: "15px" }}>
                <h5 style={{ fontWeight: "bold", textAlign: "center" }}>
                  {achievement.eventName}
                </h5>
                <p style={{ textAlign: "center" }}>
                  {new Date(achievement.eventDate).toDateString()}
                </p>
                <p style={{ textAlign: "center" }}>Rank: {achievement.rank}</p>
                <p style={{ textAlign: "center" }}>Place: {achievement.place}</p>
                <p style={{ textAlign: "center" }}>State: {achievement.state}</p>
                <p style={{ textAlign: "center" }}>Eventype: {achievement.eventtype}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No achievements to display</p>
      )}
    </div>
  </div>
</div>
    </div>
  );
};

export default StudentAchievementForm;
