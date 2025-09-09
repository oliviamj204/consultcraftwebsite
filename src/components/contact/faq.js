import React, { useState } from "react";
import "./faq.css";

const faqs = [
  {
    question: "What is ConsultCraft Inc. ?",
    answer:
      "ConsultCraft Inc. is a builder of innovative Mobile and Web applications that enhance business connectivity and drive global innovation. Our pipeline includes two dynamic solutions: ConsultCove and SportsCove, catering to diverse user needs such as business consulting, sports and fitness and more."
  },
  {
    question: "Where is ConsultCraft Inc. headquartered and conducting operations?",
    answer:
      "ConsultCraft Inc. is headquartered in Vancouver, BC, Canada. Our team is located remotely across North America and India (for 2024-2025), and we are the process of expanding presence in India with a 100% owned subsidiary entity, owned and managed by the parent company - ConsultCraft Inc. in Canada. More regions will be added as we expand."
  },    
  {
    question: "What is ConsultCove?",
    answer:
      "ConsultCove is a multi-dimensional app designed to revolutionize the way entrepreneurs, business owners (SMB) and enterprises connect and collaborate with a decentralized global talent pool. It bridges the gap between demand and supply in the consulting ecosystem, fostering an environment where ideas can flourish and businesses can thrive."
  },
  {
    question: "How does the matching algorithm in ConsultCove work?",
    answer:
      "ConsultCove's matching algorithm considers various criteria, including skills, experience, and project requirements, geographies, data restrictions, to seamlessly connect consultants and requesters for optimal collaboration."
  },
  {
    question: "What are the key features of ConsultCove?",
    answer:
      "Key features of ConsultCove include a seamless user onboarding process, robust profile verification, a sophisticated matching algorithm, project collaboration tools, payment and contract management, feedback and review systems, and comprehensive customer support."
  },
  {
    question: "What is SportsCove?",
    answer:
      "SportsCove is an app that connects a global community of sports enthusiasts, personal trainers, and fitness professionals, allowing them to barter knowledge, scout talent, and create business opportunities."
  },
  {
    question: "How can personal trainers benefit from SportsCove?",
    answer:
      "Personal trainers can connect with clients from smaller cities worldwide, offering virtual training sessions and expanding their client base beyond geographical limitation"
  },
  {
    question: "What are the main features of SportsCove?",
    answer:
      "SportsCove includes features such as virtual training sessions, talent scouting, recruitment opportunities, and community-building tools to enhance the sports and fitness experience."
  },
  {
    question: "How does ConsultCraft Inc. ensure data security and user privacy?",
    answer:
      "ConsultCraft Inc. adheres to strict data protection and privacy policies in line with local operating regulations, implementing advanced security measures to safeguard user information and ensure compliance with international standards."
  },
  {
    question: "What customer support options are available?",
    answer:
      "ConsultCraft Inc. offers comprehensive customer support through various channels, including email, live chat, and have a dedicated support team to assist users with any queries or issues."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h2 className="faq-title">Your questions, answered !</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <span>{faq.question}</span>
              <span className="faq-icon">
                {activeIndex === index ? "▲" : "▼"}
              </span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
