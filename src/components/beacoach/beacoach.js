// import React from "react";
// import "./beacoach.css";

// export default function BeACoach() {
//   return (
//     <div className="beacoach-container">
//       {/* Hero Section */}
//       <section className="beacoach-hero">
//         <h1 className="beacoach-title">Coach Standards & Verification Process</h1>
//         <p className="beacoach-subtitle">
//           Verification and standards designed to ensure a safe, high-quality
//           coaching and learning experience
//         </p>
//       </section>

//       {/* Tab Navigation */}
//       <div className="beacoach-tabs">
//         <button className="beacoach-tab-button active">Verification Process</button>
//         <button className="beacoach-tab-button">Standards & Guidelines</button>
//         <button className="beacoach-tab-button">Badge System</button>
//         <button className="beacoach-tab-button">FAQs</button>
//       </div>

//       {/* Verification Process Section */}
//       <section className="verification-process">
//         <div className="process-header">
//           <h2>Verification Process</h2>
//           <p className="process-description">Step by Step Verification process followed by Sportscove</p>
//         </div>
        
//         <div className="verification-steps">
//           <div className="verification-step">
//             <div className="step-circle">
//               <div className="coachstep-number">01.</div>
//               <h3 className="coachstep-title">Coach Application</h3>
//               <p className="step-description">Download the Sportscove App and apply to Be a Coach</p>
//             </div>
//           </div>

//           <div className="verification-step">
//             <div className="step-circle">
//               <div className="coachstep-number">02.</div>
//               <h3 className="coachstep-title">Background Check</h3>
//               <p className="step-description">Confirming the background to avoid anything wrong</p>
//             </div>
//           </div>

//           <div className="verification-step">
//             <div className="step-circle">
//               <div className="coachstep-number">03.</div>
//               <h3 className="coachstep-title">Review Experience</h3>
//               <p className="step-description">The minimum experience required to be a coach on Sportscove is 3 years.</p>
//             </div>
//           </div>

//           <div className="verification-step">
//             <div className="step-circle">
//               <div className="coachstep-number">04.</div>
//               <h3 className="coachstep-title">Approval</h3>
//               <p className="step-description">If the background and experience is satisfied, the coaching profile is approved and you are ready to teach</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Standards & Guidelines Section */}
//       <section className="standards-guidelines-section">
//         <div className="standards-header">
//           <h2 className="standards-title">Standards & Guidelines</h2>
//           <p className="standards-subtitle">Guidelines to follow as a coach once you have your profile up</p>
//         </div>

//         <div className="standards-grid">
//           <div className="standard-box standard-box-1">
//             <h3 className="standard-title">Follow a code of conduct</h3>
//             <p className="standard-description">Respect, inclusivity and no harassment tol create a supportive environment for all athletes</p>
//           </div>

//           <div className="standard-box standard-box-2">
//             <h3 className="standard-title">Respect platform rules</h3>
//             <p className="standard-description">Warm ups and correct techniques reduces risk of injuritas and builds long term athlete confidence</p>
//           </div>

//           <div className="standard-box standard-box-3">
//             <h3 className="standard-title">Use proper online setup</h3>
//             <p className="standard-description">Clear audio video and stable internet for learners to get high-quality sessions that are easy to follow</p>
//           </div>

//           <div className="standard-box standard-box-4">
//             <h3 className="standard-title">Continuous Development</h3>
//             <p className="standard-description">Actively seek reviews/ratings to improve coaching practice.</p>
//           </div>

//           <div className="standard-box standard-box-5">
//             <h3 className="standard-title">Be on your best behaviour</h3>
//             <p className="standard-description">Harassment, discrimination and abusive language will NOT be tolerated. Uphold profession boundaries, i.e no favouritism or inappropriate behaviour.</p>
//           </div>

//           <div className="standard-box standard-box-6">
//             <h3 className="standard-title">Emphasize Safety</h3>
//             <p className="standard-description">Warm ups and correct techniques reduces risk of injuritas and builds long term athlete confidence</p>
//           </div>
//         </div>
//       </section>

//       {/* Badge System Section */}
//       <section className="badge-system-section">
//         <div className="badge-header">
//           <h2 className="badge-title">Badge System - <span className="badge-highlight">What coach are you?</span></h2>
//           <p className="badge-subtitle">The types of coaches and what they are</p>
//         </div>

//         <div className="badge-cards-container">
//           <div className="badge-card standard-coach">
//             <div className="badge-card-header">
//               <div className="heart-icon">
//                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
//                 </svg>
//               </div>
//             </div>
//             <div className="badge-card-content">
//               <div className="badge-rating">
//                 <span className="rating-number">5.0</span>
//                 <div className="star-icon">
//                   <svg viewBox="0 0 24 24" fill="currentColor">
//                     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
//                   </svg>
//                 </div>
//               </div>
//               <h3 className="badge-coach-title">Coach</h3>
//             </div>
//           </div>

//           <div className="badge-card super-coach">
//             <div className="super-coach-banner">
//               <span>🏆</span>
//               <span>SUPER COACH</span>
//               <span>🏆</span>
//             </div>
//             <div className="badge-card-header">
//               <div className="heart-icon">
//                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
//                 </svg>
//               </div>
//             </div>
//             <div className="badge-card-content">
//               <div className="badge-rating">
//                 <span className="rating-number">5.0</span>
//                 <div className="star-icon">
//                   <svg viewBox="0 0 24 24" fill="currentColor">
//                     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
//                   </svg>
//                 </div>
//               </div>
//               <h3 className="badge-coach-title">Coach</h3>
//             </div>
//           </div>
//         </div>

//         <div className="badge-descriptions">
//           <div className="badge-description standard-description">
//             <h3 className="description-title">Standard Coaches</h3>
//             <p className="description-text">Coaches with blah blah blah blah</p>
//           </div>
          
//           <div className="badge-description super-description">
//             <h3 className="description-title">Supercoaches</h3>
//             <p className="description-text">Coaches with blah blah blah blah</p>
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="faq-section">
//         <div className="faq-header">
//           <h2 className="faq-title">FAQs</h2>
//           <p className="faq-subtitle">To be done exactly as the FAQ section in contacts page</p>
//         </div>
//       </section>
//     </div>
//   );
// }