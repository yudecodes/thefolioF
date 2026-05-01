import React, { useState, useEffect } from "react";
import Footer from '../components/Footer'; // Siguraduhin na tama ang path

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [error, setError] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  
  useEffect(() => {
    if (showWarning) {
      const timer = setTimeout(() => setShowWarning(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showWarning]);

  const handleContactSubmit = (e) => {
    e.preventDefault();

    let errorMessage = "";

    if (formData.name.trim() === "") {
      errorMessage = "⚠️ Please enter your name.";
    } else if (formData.email.trim() === "") {
      errorMessage = "⚠️ Please enter your email address.";
    } else if (formData.message.trim() === "") {
      errorMessage = "⚠️ Please enter a message before sending.";
    }

    if (errorMessage) {
      setError(errorMessage);
      setShowWarning(true);
      return;
    }

    alert("Thank you! Your message has been sent.");

    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      {showWarning && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            backgroundColor: "#BA0C2F",
            color: "white",
            textAlign: "center",
            padding: "15px",
            fontWeight: "bold",
            zIndex: 1000,
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)"
          }}
        >
          {error}
        </div>
      )}

      
      <section>
        <h2>Connect With Us</h2>

        <form onSubmit={handleContactSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="example@email.com"
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <button
            type="submit"
            style={{
              background: "#002D62",
              color: "white",
              padding: "10px",
              border: "none",
              cursor: "pointer"
            }}
          >
            Send Message
          </button>
        </form>
      </section>

      
      <section>
        <h2>Helpful Links</h2>

        <table>
          <thead>
            <tr>
              <th>Resource</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <a
                  href="https://www.mlb.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MLB.com
                </a>
              </td>
              <td>Official site for Major League Baseball scores.</td>
            </tr>

            <tr>
              <td>
                <a
                  href="https://www.baseball-reference.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Baseball Reference
                </a>
              </td>
              <td>The best place for historical statistics.</td>
            </tr>
          </tbody>
        </table>

        <br />

        <h3>Our Featured Location: Wrigley Field</h3>

        <p style={{ fontSize: "0.9rem", marginBottom: "10px" }}>
          Experience the historic atmosphere and the sound of the organ at the
          "Friendly Confines".
        </p>

        <div
          className="map-container"
          style={{
            marginTop: "20px",
            border: "5px solid #002D62"
          }}
        >
          <iframe
            title="Wrigley Field Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.123533877914!2d-87.65792948455716!3d41.94843837921643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd3b2e5959109%3A0x66763a0ecf4414!2sWrigley%20Field!5e0!3m2!1sen!2sus!4v1647451234567!5m2!1sen!2sus"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Contact;