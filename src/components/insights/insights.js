// /**
//  * Insights Page Component
//  * 
//  * Fetches real-time sports data from multiple APIs:
//  * 1. TheSportsDB - for sports scores and upcoming events
//  * 2. NewsAPI/Guardian - for latest sports news (with fallback)
//  * 
//  * To use NewsAPI, add your API key to .env file as REACT_APP_NEWS_API_KEY
//  * Otherwise, it will use Guardian API or TheSportsDB as fallback
//  */
// import React, { useState, useEffect } from "react";
// import "./insights.css";

// export default function Insights() {
//   // State for the sections that are now dynamic
//   const [latestScores, setLatestScores] = useState([]);
//   const [allScores, setAllScores] = useState([]); // Store all scores for view more
//   const [showAllScores, setShowAllScores] = useState(false);
//   const [latestNews, setLatestNews] = useState([]);
//   const [allNews, setAllNews] = useState([]); // Store all news for filtering
//   const [displayedNews, setDisplayedNews] = useState([]); // Store currently displayed news
//   const [showAllNews, setShowAllNews] = useState(false);
//   const [events, setEvents] = useState([]);
//   const [features, setFeatures] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [newsLoading, setNewsLoading] = useState(true);
//   const [newsError, setNewsError] = useState(null);
//   const [activeFilter, setActiveFilter] = useState('All Sports');

//   // Sports categories for filtering
//   const sportsCategories = [
//     'All Sports', 'MMA', 'Boxing', 'Wrestling', 
//     'Brazilian Jiu Jitsu', 'Muay Thai', 'Cricket'
//   ];

//   // Keep updates hardcoded as requested (Supercoach Event Updates)
//   const updates = [
//     { img: "/asset/events/1.jpg", title: "Rising Star Dominates the Ring", desc: "19-year-old phenom delivers a stunning knockout...", time: "2d" },
//     { img: "/asset/events/2.jpg", title: "Cricket Stars Shine Bright", desc: "Young talent takes center stage, thrilling fans...", time: "1d" },
//   ];

//   // useEffect hook to fetch data when the component mounts
//   useEffect(() => {
//     const fetchSportsData = async () => {
//       try {
//         const allScoresData = [];
//         const leagueIds = [4328, 4329, 4330, 4331, 4332, 4334, 4335, 4336]; // Multiple leagues
        
//         // Fetch scores from multiple leagues
//         for (const leagueId of leagueIds) {
//           try {
//             const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/eventspastleague.php?id=${leagueId}`);
//             if (response.ok) {
//               const data = await response.json();
//               const events = (data.events || []).slice(0, 5); // Get 5 from each league
//               allScoresData.push(...events);
//             }
//           } catch (err) {
//             console.warn(`Failed to fetch scores for league ${leagueId}:`, err);
//           }
//         }

//         // Filter out invalid scores and sort by date
//         const validScores = allScoresData.filter(event => 
//           event.intHomeScore !== null && event.intAwayScore !== null
//         ).sort((a, b) => new Date(b.dateEvent) - new Date(a.dateEvent));

//         setAllScores(validScores);
//         setLatestScores(validScores.slice(0, 3)); // Show first 3 by default

//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchSportsNews = async () => {
//       try {
//         const allSportsNews = [];
        
//         // Define search terms for different sports categories
//         const sportQueries = {
//           'All Sports': ['sports', 'football', 'soccer', 'basketball', 'tennis'],
//           'MMA': ['MMA', 'mixed martial arts', 'UFC', 'fighting'],
//           'Boxing': ['boxing', 'boxer', 'heavyweight', 'championship fight'],
//           'Wrestling': ['wrestling', 'WWE', 'professional wrestling'],
//           'Brazilian Jiu Jitsu': ['brazilian jiu jitsu', 'BJJ', 'grappling', 'submission'],
//           'Muay Thai': ['muay thai', 'thai boxing', 'kickboxing'],
//           'Cricket': ['cricket', 'test match', 'ODI', 'T20', 'IPL']
//         };

//         // Strategy: Use NewsAPI for high-priority categories (MMA, Boxing, Cricket, All Sports)
//         // Use Guardian API for other categories to conserve NewsAPI requests
//         const newsApiCategories = ['All Sports', 'MMA', 'Boxing', 'Cricket', 'MuayThai'];
//         let newsApiRequestsUsed = 0;
//         const maxNewsApiRequests = 8; // Conservative limit per session (12.5 sessions per day)

//         // Fetch news from NewsAPI for priority categories (limited requests)
//         for (const [category, queries] of Object.entries(sportQueries)) {
//           if (newsApiCategories.includes(category) && newsApiRequestsUsed < maxNewsApiRequests) {
//             for (const query of queries.slice(0, 2)) { // 2 queries per priority category
//               try {
//                 if (newsApiRequestsUsed >= maxNewsApiRequests) break;
                
//                 const newsResponse = await fetch(
//                   `https://newsapi.org/v2/everything?q=${encodeURIComponent(query + ' sports')}&sortBy=publishedAt&pageSize=20&language=en&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
//                 );
                
//                 if (newsResponse.ok) {
//                   const newsData = await newsResponse.json();
//                   newsApiRequestsUsed++;
                  
//                   if (newsData.articles && newsData.articles.length > 0) {
//                     const articles = newsData.articles
//                       .filter(article => article.title !== '[Removed]' && article.description !== '[Removed]')
//                       .slice(0, 10) // Take top 10 from each NewsAPI call
//                       .map(article => ({
//                         title: article.title.replace(/<[^>]*>/g, ''),
//                         description: (article.description || `Latest ${category.toLowerCase()} news and updates`).replace(/<[^>]*>/g, ''),
//                         urlToImage: article.urlToImage || "/asset/boxing.jpg",
//                         url: article.url,
//                         publishedAt: article.publishedAt,
//                         category: category,
//                         source: article.source.name || 'NewsAPI',
//                         priority: 'high' // Mark as high priority content
//                       }));
//                     allSportsNews.push(...articles);
//                     console.log(`NewsAPI: Fetched ${articles.length} articles for ${category} - ${query}`);
//                   }
//                 } else {
//                   console.warn(`NewsAPI failed for ${query}:`, newsResponse.status);
//                 }
                
//                 // Add delay to respect rate limits
//                 await new Promise(resolve => setTimeout(resolve, 200));
                
//               } catch (err) {
//                 console.warn(`Failed to fetch NewsAPI for ${query}:`, err);
//               }
//             }
//           }
//         }

//         // Fetch remaining categories from Guardian API (unlimited free)
//         for (const [category, queries] of Object.entries(sportQueries)) {
//           for (const query of queries.slice(0, 3)) { // More queries for Guardian since it's free
//             try {
//               const guardianResponse = await fetch(
//                 `https://content.guardianapis.com/search?q=${encodeURIComponent(query)}&section=sport&show-fields=thumbnail,trailText,byline&page-size=15&api-key=test`
//               );
              
//               if (guardianResponse.ok) {
//                 const guardianData = await guardianResponse.json();
//                 const articles = (guardianData.response.results || []).map(article => ({
//                   title: article.webTitle.replace(/<[^>]*>/g, ''),
//                   description: (article.fields?.trailText || `Latest ${category.toLowerCase()} news and updates`).replace(/<[^>]*>/g, ''),
//                   urlToImage: article.fields?.thumbnail || "/asset/boxing.jpg",
//                   url: article.webUrl,
//                   publishedAt: article.webPublicationDate,
//                   category: category,
//                   source: 'The Guardian',
//                   priority: 'medium'
//                 }));
//                 allSportsNews.push(...articles);
//                 console.log(`Guardian: Fetched ${articles.length} articles for ${category} - ${query}`);
//               }
              
//               // Shorter delay for Guardian
//               await new Promise(resolve => setTimeout(resolve, 100));
              
//             } catch (err) {
//               console.warn(`Failed to fetch Guardian for ${query}:`, err);
//             }
//           }
//         }

//         // If still not enough content, fetch from additional free sources
//         if (allSportsNews.length < 50) {
//           const additionalNews = await fetchAdditionalFreeSources();
//           allSportsNews.push(...additionalNews);
//         }

//         // Remove duplicates based on title similarity
//         const uniqueNews = removeDuplicateNews(allSportsNews);
        
//         // Sort by priority (NewsAPI first) then by date
//         const sortedNews = uniqueNews.sort((a, b) => {
//           if (a.priority !== b.priority) {
//             const priorityOrder = { 'high': 0, 'medium': 1, 'low': 2 };
//             return priorityOrder[a.priority] - priorityOrder[b.priority];
//           }
//           return new Date(b.publishedAt) - new Date(a.publishedAt);
//         });

//         console.log(`Total articles fetched: ${sortedNews.length}, NewsAPI requests used: ${newsApiRequestsUsed}`);

//         // Store all news and set initial display
//         setAllNews(sortedNews);
//         const initialNews = sortedNews.slice(0, 15); // Show more articles initially
//         setLatestNews(initialNews);
//         setDisplayedNews(initialNews.slice(0, 6)); // Initially show only 6 news items
        
//         // Use different articles for features section to avoid duplication
//         const newsFeatures = sortedNews.slice(15, 20).map(article => ({
//           img: article.urlToImage || "/asset/boxing.jpg",
//           sport: article.category || "Sports News",
//           title: article.title,
//           desc: article.description || "Latest sports update...",
//           url: article.url
//         }));
        
//         // If not enough articles for features, use different ones
//         if (newsFeatures.length < 5) {
//           const additionalFeatures = sortedNews.slice(0, 5 - newsFeatures.length).map(article => ({
//             img: article.urlToImage || "/asset/boxing.jpg",
//             sport: article.category || "Sports News", 
//             title: article.title,
//             desc: article.description || "Latest sports update...",
//             url: article.url
//           }));
//           setFeatures([...newsFeatures, ...additionalFeatures]);
//         } else {
//           setFeatures(newsFeatures);
//         }

//       } catch (err) {
//         setNewsError(err.message);
//         console.error('News fetching error:', err);
        
//         // Final fallback - use sports events as news
//         const fallbackNews = await fetchSportsEventsAsNews();
//         setAllNews(fallbackNews);
//         const fallbackLatestNews = fallbackNews.slice(0, 12);
//         setLatestNews(fallbackLatestNews);
//         setDisplayedNews(fallbackLatestNews.slice(0, 6)); // Initially show only 6 news items
//         setFeatures(fallbackNews.slice(0, 5));
        
//       } finally {
//         setNewsLoading(false);
//       }
//     };

//     const fetchFallbackNews = async () => {
//       // Fetch from TheSportsDB as backup news source
//       try {
//         const leagues = [4328, 4329, 4330]; // Different league IDs
//         const fallbackArticles = [];
        
//         for (const leagueId of leagues) {
//           const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/eventspastleague.php?id=${leagueId}`);
//           if (response.ok) {
//             const data = await response.json();
//             const events = (data.events || []).slice(0, 3).map(event => ({
//               title: `${event.strEvent} - Match Report`,
//               description: `${event.strHomeTeam} faced ${event.strAwayTeam} in an exciting ${event.strLeague} match`,
//               urlToImage: event.strThumb || "/asset/boxing.jpg",
//               url: "#",
//               publishedAt: event.dateEvent,
//               category: event.strSport || 'Sports',
//               source: 'TheSportsDB',
//               priority: 'low'
//             }));
//             fallbackArticles.push(...events);
//           }
//         }
//         return fallbackArticles;
//       } catch (err) {
//         return [];
//       }
//     };

//     // Function to fetch from additional free sources
//     const fetchAdditionalFreeSources = async () => {
//       const additionalNews = [];
      
//       try {
//         // Use more TheSportsDB leagues as additional news sources
//         const extraLeagues = [4337, 4338, 4339, 4340, 4341, 4342];
//         for (const leagueId of extraLeagues) {
//           try {
//             const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/eventspastleague.php?id=${leagueId}`);
//             if (response.ok) {
//               const data = await response.json();
//               const events = (data.events || []).slice(0, 5).map(event => ({
//                 title: `${event.strEvent} - Match Summary`,
//                 description: `${event.strHomeTeam} ${event.intHomeScore || 0} - ${event.intAwayScore || 0} ${event.strAwayTeam} in ${event.strLeague}`,
//                 urlToImage: event.strThumb || "/asset/boxing.jpg",
//                 url: "#",
//                 publishedAt: event.dateEvent,
//                 category: event.strSport || 'Sports',
//                 source: 'TheSportsDB',
//                 priority: 'low'
//               }));
//               additionalNews.push(...events);
//             }
//           } catch (err) {
//             console.warn(`Failed to fetch additional league ${leagueId}:`, err);
//           }
//         }
//       } catch (err) {
//         console.warn('Failed to fetch additional sources:', err);
//       }
      
//       return additionalNews;
//     };

//     // Function to remove duplicate news articles
//     const removeDuplicateNews = (newsArray) => {
//       const seen = new Set();
//       return newsArray.filter(article => {
//         const titleKey = article.title.toLowerCase().substring(0, 50); // First 50 chars
//         if (seen.has(titleKey)) {
//           return false;
//         }
//         seen.add(titleKey);
//         return true;
//       });
//     };

//     const fetchSportsEventsAsNews = async () => {
//       // Last resort - create news from sports events
//       const sampleNews = [
//         {
//           title: "Latest Sports Updates Available",
//           description: "Stay tuned for the latest sports news and updates from around the world",
//           urlToImage: "/asset/boxing.jpg",
//           url: "#",
//           publishedAt: new Date().toISOString(),
//           category: "Sports",
//           source: "SportsCove"
//         }
//       ];
//       return sampleNews;
//     };

//     const fetchUpcomingEvents = async () => {
//       try {
//         const allUpcomingEvents = [];
//         const leagueIds = [4328, 4329, 4330, 4331]; // Different league IDs for variety
        
//         for (const leagueId of leagueIds) {
//           try {
//             const eventResponse = await fetch(`https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=${leagueId}`);
//             if (eventResponse.ok) {
//               const eventData = await eventResponse.json();
//               const events = (eventData.events || []).slice(0, 2).map(event => ({
//                 title: event.strEvent || `${event.strHomeTeam} vs ${event.strAwayTeam}`,
//                 subtitle: `${event.strHomeTeam || 'TBD'} vs ${event.strAwayTeam || 'TBD'}`,
//                 time: event.strTime ? 
//                   new Date(`2000-01-01 ${event.strTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 
//                   'TBD',
//                 location: event.strVenue || event.strCountry || "TBD",
//                 date: event.dateEvent,
//                 sport: event.strSport || 'Sports'
//               }));
//               allUpcomingEvents.push(...events);
//             }
//           } catch (err) {
//             console.warn(`Failed to fetch events for league ${leagueId}:`, err);
//           }
//         }
        
//         // Sort by date and take most recent upcoming events
//         const sortedEvents = allUpcomingEvents
//           .filter(event => event.date && new Date(event.date) > new Date())
//           .sort((a, b) => new Date(a.date) - new Date(b.date))
//           .slice(0, 4);
          
//         if (sortedEvents.length > 0) {
//           setEvents(sortedEvents);
//         } else {
//           // Fallback to generic upcoming events
//           setEvents([
//             { 
//               title: "Upcoming Championship Match", 
//               subtitle: "Finals", 
//               time: "TBD", 
//               location: "Stadium TBD",
//               sport: "Sports"
//             },
//             { 
//               title: "League Tournament", 
//               subtitle: "Semi-Finals", 
//               time: "TBD", 
//               location: "Arena TBD",
//               sport: "Sports" 
//             }
//           ]);
//         }
//       } catch (err) {
//         console.error('Events fetching error:', err);
//         // Minimal fallback
//         setEvents([
//           { title: "Events Loading...", subtitle: "Please wait", time: "TBD", location: "TBD", sport: "Sports" }
//         ]);
//       }
//     };

//     fetchSportsData();
//     fetchSportsNews();
//     fetchUpcomingEvents();
//   }, []); // Empty array means this effect runs only once

//   // Filter function for sports categories
//   const handleFilterChange = (category) => {
//     setActiveFilter(category);
//     setShowAllNews(false); // Reset to show limited news when changing filters
    
//     if (category === 'All Sports') {
//       const newsToShow = allNews.slice(0, 15); // Show 15 articles for All Sports
//       setLatestNews(newsToShow);
//       setDisplayedNews(newsToShow.slice(0, 6)); // Initially show only 6
//       setFeatures(allNews.slice(15, 20).map(article => ({
//         img: article.urlToImage || "/asset/boxing.jpg",
//         sport: article.category || "Sports News",
//         title: article.title,
//         desc: article.description || "Latest sports update...",
//         url: article.url
//       })));
//     } else {
//       const filteredNews = allNews.filter(news => 
//         news.category === category || 
//         news.title.toLowerCase().includes(category.toLowerCase()) ||
//         news.description.toLowerCase().includes(category.toLowerCase())
//       );
      
//       // Sort filtered news by priority (high priority first)
//       const sortedFilteredNews = filteredNews.sort((a, b) => {
//         if (a.priority !== b.priority) {
//           const priorityOrder = { 'high': 0, 'medium': 1, 'low': 2 };
//           return priorityOrder[a.priority] - priorityOrder[b.priority];
//         }
//         return new Date(b.publishedAt) - new Date(a.publishedAt);
//       });
      
//       const newsToShow = sortedFilteredNews.slice(0, 12); // Show 12 articles for specific categories
//       setLatestNews(newsToShow);
//       setDisplayedNews(newsToShow.slice(0, 6)); // Initially show only 6
//       setFeatures(sortedFilteredNews.slice(0, 5).map(article => ({
//         img: article.urlToImage || "/asset/boxing.jpg",
//         sport: article.category || category,
//         title: article.title,
//         desc: article.description || `Latest ${category.toLowerCase()} update...`,
//         url: article.url
//       })));
//     }
//   };

//   // Function to toggle view more scores
//   const toggleViewMoreScores = () => {
//     if (showAllScores) {
//       setLatestScores(allScores.slice(0, 3));
//       setShowAllScores(false);
//     } else {
//       setLatestScores(allScores.slice(0, 12)); // Show up to 12 scores
//       setShowAllScores(true);
//     }
//   };

//   // Function to toggle view more news
//   const toggleViewMoreNews = () => {
//     if (showAllNews) {
//       // Show only 6 news items
//       setDisplayedNews(latestNews.slice(0, 6));
//       setShowAllNews(false);
//     } else {
//       // Show all available news
//       setDisplayedNews(latestNews);
//       setShowAllNews(true);
//     }
//   };

//   return (
//     <div className="insights-page">
//       {/* Header and Filters (static) */}
//       <header className="header">
//         <h1>SPORTS INSIGHTS</h1>
//         <p>Insights that fuel your sports journey</p>
//       </header>
//       <div className="sports-filter">
//         {sportsCategories.map((category) => (
//           <button
//             key={category}
//             className={activeFilter === category ? 'active' : ''}
//             onClick={() => handleFilterChange(category)}
//           >
//             {category}
//           </button>
//         ))}
//       </div>

//       {/* Main 3-column layout */}
//       <div className="main-container">
//         {/* Left Sidebar (dynamic) */}
//         <aside className="events-sidebar">
//           <h3>Events Calendar</h3>
//           <div className="date-picker"><span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span></div>
//           <ul>
//             {events.length > 0 ? events.map((event, i) => (
//               <li key={i} className="event-card">
//                 <h4 className="event-title">{event.title}</h4>
//                 <p>{event.subtitle}</p>
//                 <div className="event-details">
//                   <span>🕒 {event.time}</span>
//                   <span>📍 {event.location}</span>
//                 </div>
//               </li>
//             )) : (
//               <li className="event-card">
//                 <h4 className="event-title">Loading events...</h4>
//               </li>
//             )}
//           </ul>
//         </aside>

//         {/* Middle Section (dynamic) */}
//         <main className="feature-section">
//           <h2>
//             Latest Sports Features
//             <a href="/" className="more-link">More Features →</a>
//           </h2>
//           {newsLoading && <p>Loading latest sports news...</p>}
//           {newsError && <p>Error loading news: {newsError}</p>}
//           {features.map((item, i) => (
//             <article className="feature-article-card" key={i}>
//               <img src={item.img} alt={item.title} className="feature-article-img" onError={(e) => {e.target.src = '/asset/boxing.jpg'}} />
//               <div className="feature-article-content">
//                 <span className="feature-article-tag">{item.sport}</span>
//                 <h3>{item.title}</h3>
//                 <p>{item.desc}</p>
//                 <a href={item.url || "#"} className="feature-article-read-more" target="_blank" rel="noopener noreferrer">Read More →</a>
//               </div>
//             </article>
//           ))}
//         </main>

//         {/* Right Sidebar (static) */}
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

//       {/* Bottom container for dynamic and semi-dynamic content */}
//       <div className="sports-bottom-container">
        
//         {/* Latest Tribe Scores - DYNAMIC SECTION */}
//         <section className="tribe-scores">
//           <div className="section-header">
//             <h2 className="section-title">Latest Tribe Scores</h2>
//             {allScores.length > 3 && (
//               <button className="view-more-btn" onClick={toggleViewMoreScores}>
//                 {showAllScores ? 'View Less' : `View More (${allScores.length - 3} more)`}
//               </button>
//             )}
//           </div>
//           <div className="scores-grid">
//             {loading && <p>Loading scores...</p>}
//             {error && <p>{error}</p>}
//             {latestScores.map((match) => (
//               <div key={match.idEvent} className="score-card">
//                 <div className="match-header">
//                   <span className="team">
//                     <img src={match.strHomeTeamBadge} alt={match.strHomeTeam} /> 
//                     {match.strHomeTeam}
//                   </span>
//                   <span className="score">{match.intHomeScore}</span>
//                 </div>
//                 <div className="match-header">
//                   <span className="team">
//                     <img src={match.strAwayTeamBadge} alt={match.strAwayTeam} /> 
//                     {match.strAwayTeam}
//                   </span>
//                   <span className="score">{match.intAwayScore}</span>
//                 </div>
//                 <div className="match-footer">
//                   <p>{match.strLeague}</p>
//                   <span className="date">{new Date(match.dateEvent).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Coaches' Accomplishments - MANUAL / SEMI-DYNAMIC SECTION */}
//         <section className="accomplishments">
//           <h2 className="section-title">Sportscove Coaches’ Accomplishments</h2>
//           <div className="accomplishment-grid">
//             {/* This content is not from the API and can be updated manually */}
//             <div className="accomplishment-card">
//               <img src="/asset/boxing.jpg" alt="Record" />
//               <p>9.10 to 11:58 seconds - Moni Ehsan Lakshmi Sekar, India team sprint sensation</p>
//             </div>
//             <div className="accomplishment-card">
//               <img src="/asset/boxing.jpg" alt="Long Jump" />
//               <p>Manvi Srivastav cut to 196 in the long jump standards in India</p>
//             </div>
//           </div>
//         </section>

//         {/* Latest News - DYNAMIC SECTION */}
//         <section className="latest-news">
//           <h2 className="section-title">
//             Latest News - {activeFilter}
//             {latestNews.length > 0 && <span className="news-count">({latestNews.length} articles)</span>}
//           </h2>
//           <div className="news-grid">
//             {newsLoading && <p>Loading {activeFilter.toLowerCase()} news...</p>}
//             {newsError && <p>Error loading news: {newsError}</p>}
//             {!newsLoading && displayedNews.length === 0 && (
//               <p>No news found for {activeFilter}. Try selecting a different category.</p>
//             )}
//             {displayedNews.map((newsItem, index) => (
//               <div key={`${newsItem.url}-${index}`} className="news-card clickable-card" onClick={() => window.open(newsItem.url, '_blank')}>
//                 <img 
//                   src={newsItem.urlToImage || '/asset/boxing.jpg'} 
//                   alt={newsItem.title}
//                   onError={(e) => {e.target.src = '/asset/boxing.jpg'}}
//                 />
//                 <div className="news-content">
//                   <span className={`news-category ${newsItem.priority === 'high' ? 'premium' : ''}`}>
//                     {newsItem.category || activeFilter}
//                     <span className="news-source">via {newsItem.source}</span>
//                   </span>
//                   <h4>{newsItem.title}</h4>
//                   <p>{newsItem.description}</p>
//                   <div className="news-meta">
//                     <small>{new Date(newsItem.publishedAt).toLocaleDateString()}</small>
//                     <span className="news-link">Click to Read More</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           {/* View More News Button */}
//           {!newsLoading && latestNews.length > 6 && (
//             <div className="view-more-container">
//               <button 
//                 className="view-more-btn" 
//                 onClick={toggleViewMoreNews}
//               >
//                 {showAllNews ? `View Less (showing ${displayedNews.length} of ${latestNews.length})` : `View More (${latestNews.length - 6} more articles)`}
//               </button>
//             </div>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// }