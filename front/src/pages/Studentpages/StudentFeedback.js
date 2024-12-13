
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentFeedback = () => {
  const [feedbackData, setFeedbackData] = useState({
    name: "",
    email: "",
    contact: "",
    classExperience: "",
    teacherFeedback: "",
    suggestions: "",
    rating: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData({ ...feedbackData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback Submitted:", feedbackData);
    alert("Thank you for your feedback!");
  };

  return (
    <div className="container mt-4">
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4>Feedback</h4>
          <p className="text-muted">
          "Your Feedback Matters! 🌟 Help Us Improve by Sharing Your Thoughts."</p>
        </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name and Email in one row */}
          <div className="form-group row">
          <label htmlFor="firstName" className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                name="name"
                value={feedbackData.name}
                id="name"
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
              <label htmlFor="email" className="col-sm-2 col-form-label">
                Email:
              </label>
              <div className="col-sm-4">
              <input
                type="email"
                className="form-control"
                name="email"
                value={feedbackData.email}
                id="email"
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

         

          {/* Class Experience */}
          <div className="form-group row">
            <label html for="classExperience" className="col-sm-2 col-form-label">
              How was your experience?
            </label>
            <div className="col-sm-10">
            <textarea
              className="form-control"
              name="classExperience"
              value={feedbackData.classExperience}
              id="classExperience"
              onChange={handleChange}
              placeholder="Share your experience"
              required
            />
          </div>
          </div>

          {/* Teacher Feedback */}
          <div className="form-group row">
            <label htmlFor="teacherFeedback" className="col-sm-2 col-form-label">Feedback about the teacher(s):</label>
            <div className="col-sm-10">
            <textarea
              className="form-control"
              name="teacherFeedback"
              id="teacherFeedback"
              value={feedbackData.teacherFeedback}
              onChange={handleChange}
              placeholder="Share your feedback about the teacher(s)"
              required
            />
          </div>
          </div>

          {/* Suggestions */}
          <div className="form-group row">
            <label htmlFor="suggestions" className="col-sm-2 col-form-label">Any suggestions for improvement:</label>
            <div className="col-sm-10">
            <textarea
              className="form-control"
              name="suggestions"
              id="suggestions"
              value={feedbackData.suggestions}
              onChange={handleChange}
              placeholder="Share your suggestions"
            />
          </div>
          </div>

           {/* Contact Number */}
           <div className="form-group row">
            <label htmlFor="contact" className="col-sm-2 col-form-label">
              Contact Number:
            </label>
            <div className="col-sm-4">
            <input
              type="tel"
              className="form-control"
              name="contact"
              value={feedbackData.contact}
              id="contact"
              onChange={handleChange}
              placeholder="Enter your contact number"
              required
            />
          </div>
          
          {/* Rating */}
            <label className="col-sm-2 col-form-label">Overall Rating:</label>
            <div className="col-sm-4">
            <select
              className="form-select"
              name="rating"
              value={feedbackData.rating}
              onChange={handleChange}
              required
            >
              <option value="">Select Rating</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>
          </div>
          

          <div className="text-center">
            <button type="submit" className="btn btn-warning px-5">
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    
  );
};

export default StudentFeedback;
