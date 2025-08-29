import React, { useState } from "react";
import "./contact.css";
import FAQ from "./faq";

export default function Contact() {
  // State to hold form data (camelCase fields to match Apps Script)
  const [formData, setFormData] = useState({
    Firstname: "",
    Lastname: "",
    Phone: "",
    Email: "",
    Message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionMessage("");

    // ✅ Your deployed Google Apps Script URL
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbzmeMJfpg1UKkv2nJdcwXfmUBn68bG8RtYU9Rbz8-_bAGhh7WA8ZoN6DbaUKIhB-HIz/exec";

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: new URLSearchParams(formData), // Form-encoded data
      });

      const result = await response.json();

      if (result.status === "success") {
        setSubmissionMessage("✅ Success! Your message has been sent.");
        setFormData({
          Firstname: "",
          Lastname: "",
          Phone: "",
          Email: "",
          Message: "",
        });
      } else {
        setSubmissionMessage("❌ Error: " + result.message);
      }
    } catch (error) {
      console.error("Error!", error);
      setSubmissionMessage(`❌ Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-section">
      <div className="contact-wrapper">
        {/* Left Side */}
        <div className="contactform-left">
          <h2>
            Collaborate, create, or just <br />
            chat — <span className="highlight">we're listening.</span>
          </h2>

          <div className="contact-info">
            <h3>Office</h3>
            <div className="info-row">
              <img src="/asset/destination.png" alt="Location" className="icon" />
              <p>
                US - 4520 W Oakeller Avenue <br />
                Tampa, FL 33611 Suite #13348
              </p>
            </div>
            <div className="info-row">
              <img src="/asset/destination.png" alt="Location" className="icon" />
              <p>
                Canada - PO Box 73553, <br />
                Vancouver RPO Downtown, BC, V6E 4L9, Canada
              </p>
            </div>
            {/* This is the new wrapper for your two columns */}
<div className="info-grid">
  {/* Column 1: Mail */}
  <div className="info-column">
    <h3>Mail</h3>
    <p>sc-support@consultcraftinc.com</p>
    <p>info@consultcraftinc.com</p>
  </div>
  {/* Column 2: Contact */}
  <div className="info-column">
    <h3>Contact</h3>
    <p>+1 (206) 457-6678</p>
    <p>+91-7070175888</p>
  </div>
</div>
          </div>
        </div>

        {/* Right Side */}
        <div className="contactform-right">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="Firstname"
                placeholder="Your First Name"
                value={formData.Firstname}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="Lastname"
                placeholder="Your Last Name"
                value={formData.Lastname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <input
                type="tel"
                name="Phone"
                placeholder="Enter Your Phone Number"
                value={formData.Phone}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="Email"
                placeholder="Enter Your Email"
                value={formData.Email}
                onChange={handleChange}
                required
              />
            </div>
            <textarea
              name="Message"
              placeholder="I would like to get in touch with you..."
              value={formData.Message}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
            {submissionMessage && (
              <p className="submission-message">{submissionMessage}</p>
            )}
          </form>
        </div>
      </div>
      <FAQ />
    </div>
  );
}
