import React from "react";
import "./tailoredroles.css";

export default function TailoredRoles() {
  const roles = [
    {
      title: "Guest Mode",
      description:
        "Lets new users explore the platform without signing up. Browse coaches and get a feel for the app!",
      icon: "/asset/Guest (1).png"
    },
    {
      title: "Learner Mode",
      description:
        "Gives you the full training experience - book sessions, get feedback, complete practice tasks and stay on track with your sport journey.",
      icon: "/asset/Learner.png"
    },
    {
      title: "Coach Mode",
      description:
        "Lets coaches schedule sessions and give feedback. They can track learner progress and support long-term skill development.",
      icon: "/asset/Coach (1).png"
    }
  ];

  return (
    <section className="role-section">
      <h2 className="role-title">TAILORED FOR EVERY ROLE</h2>
      <div className="role-cards">
        {roles.map((role, index) => (
          <div key={index} className="role-card">
  <div className="role-icon-wrapper">
    <img src={role.icon} alt={role.title} className="role-icon" />
  </div>
  <h3>{role.title}</h3>
  <p>{role.description}</p>
</div>
        ))}
      </div>
    </section>
  );
}
