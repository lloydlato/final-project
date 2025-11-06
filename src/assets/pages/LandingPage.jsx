// src/pages/Landing.jsx
import React from "react";

export default function Landing() {
  return (
    <section className="landing">
      <div className="landing-content">
        <h1>
          GLOBAL <span>TECHNOLOGY</span>
        </h1>
        <p>
          Discover the future with cutting-edge virtual reality and innovative
          learning technology. Step into the next era of education and
          exploration.
        </p>
        <button className="cta-btn">Get Started</button>
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
      <div className="landing-image">
        <img
          src="https://img.freepik.com/free-photo/people-wearing-vr-glasses_23-2149130493.jpg"
          alt="VR Experience"
        />
      </div>
    </section>
  );
}
