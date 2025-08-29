// import React from "react";
// import "./insights.css";

// export default function Insights() {
//   const events = [
//     {
//       title: "UFC 300: Rodriguez vs Silva",
//       subtitle: "Rodriguez vs Silva",
//       time: "3:15 GMT",
//       location: "Las Vegas",
//     },
//     {
//       title: "UFC 300: Rodriguez vs Silva",
//       subtitle: "Rodriguez vs Silva",
//       time: "3:15 GMT",
//       location: "Cincinnati",
//     },
//     {
//       title: "UFC 300: Rodriguez vs Silva",
//       subtitle: "Rodriguez vs Silva",
//       time: "3:15 GMT",
//       location: "Michigan",
//     },
//     {
//       title: "UFC 300: Rodriguez vs Silva",
//       subtitle: "Rodriguez vs Silva",
//       time: "3:15 GMT",
//       location: "Florida",
//     },
//   ];

//   const features = [
//     {
//       img: "/asset/boxing.jpg",
//       sport: "Boxing",
//       title: "Rising Star Dominates the Ring",
//       desc: "19-year-old phenom delivers a stunning knockout in the second round, shaking up the lightweight division",
//     },
//     {
//       img: "/asset/boxing.jpg",
//       sport: "Cricket",
//       title: "Cricket Stars Shine Bright",
//       desc: "Young talent takes center stage, thrilling fans with remarkable performances",
//     },
//   ];

//   const updates = [
//     {
//       img: "/asset/boxing.jpg",
//       title: "Rising Star Dominates the Ring",
//       desc: "19-year-old phenom delivers a stunning knockout in the second round, shaking up the lightweight division",
//       time: "2d",
//     },
//     {
//       img: "/asset/boxing.jpg",
//       title: "Cricket Stars Shine Bright",
//       desc: "Young talent takes center stage, thrilling fans with remarkable performances",
//       time: "1d",
//     },
    
//   ];

//   return (
//     <div className="insights-page">
//       {/* Header */}
//       <header className="header">
//         <h1>SPORTS INSIGHTS</h1>
//         <p>Insights that fuel your sports journey</p>
//       </header>

//       {/* Filter Buttons */}
//       <div className="sports-filter">
//         <button>All Sports</button>
//         <button>MMA</button>
//         <button>Boxing</button>
//         <button>Wrestling</button>
//         <button>Brazilian Jiu Jitsu</button>
//         <button>Muay Thai</button>
//         <button>Cricket</button>
//         <button>All Sports</button>
//         <button>All Sports</button>
//       </div>

//       <div className="main-container">
//         {/* Left Sidebar */}
//         <aside className="events-sidebar">
//           <h3>Events Calender</h3>
//           <div className="date-picker">
//             <span>Jan 12</span>
//           </div>
//           <ul>
//             {events.map((event, i) => (
//               <li key={i} className="event-card">
//                 <h4 className="event-title">{event.title}</h4>
//                 <p>{event.subtitle}</p>
//                 <div className="event-details">
//                   <span>🕒 {event.time}</span>
//                   <span>📍 {event.location}</span>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </aside>

//         {/* Assume your 'features' data array now includes a 'time' property, e.g., time: '2d' */}

// {/* The middle column is now just a single <main> container */}
// <main className="feature-section">
//   <h2>
//     Sportscove Feature
//     <a href="/" className="more-link">More Features →</a>
//   </h2>

//   {features.map((item, i) => (
//     <article className="feature-article-card" key={i}>
//       <img src={item.img} alt={item.title} className="feature-article-img" />
//       <div className="feature-article-content">
//         <span className="feature-article-tag">{item.sport}</span>
//         <h3>{item.title}</h3>
//         <p>{item.desc}</p>
//         <a href="#" className="feature-article-read-more">Read More →</a>
//       </div>
//     </article>
//   ))}
// </main>

//         {/* Right Sidebar */}
//         <aside className="updates-sidebar">
//           <h3>Supercoach Event Updates</h3>
//           {updates.map((item, i) => (
//             <div className="update-card" key={i}>
//               <img src={item.img} alt={item.title} />
//               <h4>{item.title}</h4>
//               <p>{item.desc}</p>
//               <span className="time">{item.time}</span>
//             </div>
//           ))}
//         </aside>
//       </div>
//       <div className="sports-bottom-container">
      
//       {/* Latest Tribe Scores */}
//       <section className="tribe-scores">
//         <h2 className="section-title">Latest Tribe Scores</h2>
//         <div className="scores-grid">
//           {[1, 2, 3].map((item, index) => (
//             <div key={index} className="score-card">
//               <div className="match-header">
//                 <span className="team">
//                   <img src="/asset/boxing.jpg" alt="Barcelona" />
//                   Barcelona
//                 </span>
//                 <span className="score">3</span>
//               </div>
//               <div className="match-header">
//                 <span className="team">
//                   <img src="/asset/boxing.jpg" alt="Real Madrid" />
//                   Real Madrid
//                 </span>
//                 <span className="score">1</span>
//               </div>
//               <div className="match-footer">
//                 <p>2025-26 Spanish LA LIGA</p>
//                 <span className="date">3rd July</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Coaches' Accomplishments */}
//       <section className="accomplishments">
//         <h2 className="section-title">Sportscove Coaches’ Accomplishments</h2>
//         <div className="accomplishment-grid">
//           <div className="accomplishment-card">
//             <img src="/asset/boxing.jpg" alt="Record" />
//             <p>9.10 to 11:58 seconds - Moni Ehsan Lakshmi Sekar, India team sprint sensation</p>
//           </div>
//           <div className="accomplishment-card">
//             <img src="/asset/boxing.jpg" alt="Long Jump" />
//             <p>Manvi Srivastav cut to 196 in the long jump standards in India</p>
//           </div>
//         </div>
//       </section>

//       {/* Latest News */}
//       <section className="latest-news">
//         <h2 className="section-title">Latest News from the world of Sports</h2>
//         <div className="news-grid">
//           <div className="news-card">
//             <img src="/asset/boxing.jpg" alt="News 1" />
//             <p>Rishabh Pant equals MS Dhoni’s record with 6th Test hundred.</p>
//           </div>
//           <div className="news-card">
//             <img src="/asset/boxing.jpg" alt="News 2" />
//             <p>Alcaraz vs Sinner: Alcaraz wins while Sinner retires at 5-0.</p>
//           </div>
//           <div className="news-card">
//             <img src="/asset/boxing.jpg" alt="News 3" />
//             <p>Pro Kabaddi League: Haryana Steelers announce captain.</p>
//           </div>
//         </div>
//       </section>
//     </div>
//     </div>
//   );
// }
