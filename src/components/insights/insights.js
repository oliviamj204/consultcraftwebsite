import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./insights.css";

// <-- MOVED HELPER FUNCTION AND CONSTANT OUTSIDE THE COMPONENT -->
// This resolves the ESLint dependency warning because the function is now stable
// and doesn't get redefined on every component render.
const MIX_CATEGORIES = [
  'MMA', 'Boxing', 'Wrestling', 'Brazilian Jiu Jitsu', 'Muay Thai', 'Cricket'
];

const getMixedAllSportsNews = (newsArray, maxItems) => {
  const pools = MIX_CATEGORIES.map(cat => newsArray.filter(n => n.category === cat));
  const result = [];
  let anyLeft = true;
  while (anyLeft && (maxItems ? result.length < maxItems : true)) {
    anyLeft = false;
    for (let i = 0; i < pools.length; i++) {
      if (maxItems && result.length >= maxItems) break;
      const pool = pools[i];
      if (pool.length > 0) {
        result.push(pool.shift());
        anyLeft = true;
      }
    }
  }
  return result;
};


export default function Insights() {
  const [latestScores, setLatestScores] = useState([]);
  const [allScores, setAllScores] = useState([]);
  const [showAllScores, setShowAllScores] = useState(false);
  const [latestNews, setLatestNews] = useState([]);
  const [allNews, setAllNews] = useState([]);
  const [displayedNews, setDisplayedNews] = useState([]);
  const [showAllNews, setShowAllNews] = useState(false);
  const [events, setEvents] = useState([]);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All Sports');

  // Carousel settings now apply to BOTH carousels
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    appendDots: dots => (
      <div>
        <ul className="carousel-dots">{dots}</ul>
      </div>
    ),
    customPaging: i => (
      <div className="dot"></div>
    )
  };

  const sanitizeFeatures = (featureArray) => {
    if (!Array.isArray(featureArray)) return [];
    return featureArray.filter(item => {
      if (!item || typeof item !== 'object') return false;
      if (item.hasOwnProperty('name') && item.hasOwnProperty('icon')) return false;
      return item.title && item.sport;
    });
  };

  // <-- The getMixedAllSportsNews function was removed from here -->

  const sportsCategories = [
    'All Sports', 'MMA', 'Boxing', 'Wrestling', 'Brazilian Jiu Jitsu', 'Muay Thai', 'Cricket'
  ];

  // Data for the right sidebar carousel
  const updates = [
    { img: "/asset/events/1.jpg", title: "Lightweight Showdown in Tanzania" },
    { img: "/asset/events/2.jpg"},
  ];

  // Data for the accomplishments carousel
  const accomplishmentsData = [
    {
      img: "/asset/events/1.jpg",
      alt: "Record",
      text: "Chahal vs. Machemba: Title Fight"
    },
    {
      img: "/asset/events/2.jpg",
      alt: "Long Jump",
      text: "Lightweight Showdown in Tanzania"
    }
  ];

  useEffect(() => {
    const fetchSportsData = async () => {
      try {
        const allScoresData = [];
        const leagueIds = [4328, 4329, 4330, 4331, 4332, 4334, 4335, 4336];
        for (const leagueId of leagueIds) {
          try {
            const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/eventspastleague.php?id=${leagueId}`);
            if (response.ok) {
              const data = await response.json();
              const events = (data.events || []).slice(0, 5);
              allScoresData.push(...events);
            }
          } catch {
            // ignore errors for individual leagues
          }
        }
        const validScores = allScoresData.filter(event => 
          event.intHomeScore !== null && event.intAwayScore !== null
        ).sort((a, b) => new Date(b.dateEvent) - new Date(a.dateEvent));
        setAllScores(validScores);
        setLatestScores(validScores.slice(0, 3));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchSportsNews = async () => {
        try {
            const allSportsNews = [];
            const sportQueries = {
              'MMA': ['MMA news', 'UFC news'], 'Boxing': ['boxing news', 'boxing match'],
              'Wrestling': ['WWE news', 'professional wrestling'], 'Brazilian Jiu Jitsu': ['brazilian jiu jitsu', 'BJJ news'],
              'Muay Thai': ['muay thai news', 'muay thai fight'], 'Cricket': ['cricket news', 'cricket match']
            };
            const fetchNewsFromSerpAPI = async (query, category) => {
              try {
                const response = await fetch(`http://localhost:5000/api/news?query=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}`);
                if (!response.ok) throw new Error(`Backend proxy request failed: ${response.status}`);
                const data = await response.json();
                if (!data.success) throw new Error(data.error || 'Backend proxy returned error');
                return data.articles.map(item => ({
                  title: item.title, description: (item.snippet && item.snippet.trim() && item.snippet.trim().toLowerCase() !== 'no description available') ? item.snippet.trim() : '',
                  urlToImage: item.thumbnail || "/asset/boxing.jpg", url: item.link, publishedAt: item.date,
                  source: (item.source && item.source.name) || 'Google News', category: category, priority: 'high'
                }));
              } catch { return []; }
            };
            for (const [category, queries] of Object.entries(sportQueries)) {
              for (const query of queries.slice(0, 2)) {
                try {
                  const articles = await fetchNewsFromSerpAPI(query + ' sports', category);
                  allSportsNews.push(...articles);
                  await new Promise(resolve => setTimeout(resolve, 300));
                } catch { /* ignore */ }
              }
            }
            const uniqueNews = Array.from(new Set(allSportsNews.map(a => a.title.substring(0,50)))).map(title => allSportsNews.find(a => a.title.substring(0,50) === title));
            const sortedNews = uniqueNews.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
            setAllNews(sortedNews);
            const mixedAllSports = getMixedAllSportsNews(sortedNews, 50);
            const initialNews = mixedAllSports.slice(0, 15);
            setLatestNews(initialNews);
            setDisplayedNews(initialNews.slice(0, 6));
            const newsFeatures = mixedAllSports.slice(15, 20).map(article => ({
              img: article.urlToImage || "/asset/boxing.jpg", sport: article.category || "Sports News", title: article.title,
              desc: (article.description && article.description.trim()) || '', url: article.url
            }));
            if (newsFeatures.length < 5) {
              const additionalFeatures = sortedNews.slice(0, 5 - newsFeatures.length).map(article => ({
                img: article.urlToImage || "/asset/boxing.jpg", sport: article.category || "Sports News", title: article.title,
                desc: (article.description && article.description.trim()) || '', url: article.url
              }));
              setFeatures(sanitizeFeatures([...newsFeatures, ...additionalFeatures]));
            } else {
              setFeatures(sanitizeFeatures(newsFeatures));
            }
          } catch (err) {
            setNewsError(err.message);
          } finally {
            setNewsLoading(false);
          }
    };

    const fetchUpcomingEvents = async () => {
      try {
        const allUpcomingEvents = [];
        const leagueIds = [4328, 4329, 4330, 4331];
        for (const leagueId of leagueIds) {
          try {
            const eventResponse = await fetch(`https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=${leagueId}`);
            if (eventResponse.ok) {
              const eventData = await eventResponse.json();
              const events = (eventData.events || []).slice(0, 2).map(event => ({
                title: event.strEvent || `${event.strHomeTeam} vs ${event.strAwayTeam}`,
                subtitle: `${event.strHomeTeam || 'TBD'} vs ${event.strAwayTeam || 'TBD'}`,
                time: event.strTime ? new Date(`2000-01-01 ${event.strTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'TBD',
                location: event.strVenue || event.strCountry || "TBD", date: event.dateEvent, sport: event.strSport || 'Sports'
              }));
              allUpcomingEvents.push(...events);
            }
          } catch { /* ignore */ }
        }
        const sortedEvents = allUpcomingEvents.filter(event => event.date && new Date(event.date) > new Date()).sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 4);
        setEvents(sortedEvents.length > 0 ? sortedEvents : [{ title: "No upcoming events found.", subtitle: "", time: "", location: "", sport: "" }]);
      } catch {
        setEvents([{ title: "Events Loading...", subtitle: "Please wait", time: "TBD", location: "TBD", sport: "Sports" }]);
      }
    };
    fetchSportsData();
    fetchSportsNews();
    fetchUpcomingEvents();
  }, []); // The dependency array can safely remain empty now.

  const handleFilterChange = (category) => {
    setActiveFilter(category);
    setShowAllNews(false);
    if (category === 'All Sports') {
      const mixedAllSports = getMixedAllSportsNews(allNews, 50);
      const newsToShow = mixedAllSports.slice(0, 15);
      setLatestNews(newsToShow);
      setDisplayedNews(newsToShow.slice(0, 6));
      const allSportsFeatures = mixedAllSports.slice(15, 20).map(article => ({
        img: article.urlToImage || "/asset/boxing.jpg", sport: article.category || "Sports News", title: article.title,
        desc: (article.description && article.description.trim()) || '', url: article.url
      }));
      setFeatures(sanitizeFeatures(allSportsFeatures));
    } else {
      const filteredNews = allNews.filter(news => news.category === category);
      const newsToShow = filteredNews.slice(0, 12);
      setLatestNews(newsToShow);
      setDisplayedNews(newsToShow.slice(0, 6));
      const categoryFeatures = filteredNews.slice(0, 5).map(article => ({
        img: article.urlToImage || "/asset/boxing.jpg", sport: article.category || category, title: article.title,
        desc: (article.description && article.description.trim()) || '', url: article.url
      }));
      setFeatures(sanitizeFeatures(categoryFeatures));
    }
  };

  const toggleViewMoreScores = () => {
    setShowAllScores(!showAllScores);
    setLatestScores(showAllScores ? allScores.slice(0, 3) : allScores.slice(0, 12));
  };
  const toggleViewMoreNews = () => {
    setShowAllNews(!showAllNews);
    setDisplayedNews(showAllNews ? latestNews.slice(0, 6) : latestNews);
  };

  return (
    <div className="insights-page">
      <header className="header">
        <h1>SPORTS INSIGHTS</h1>
        <p>Insights that fuel your sports journey</p>
      </header>
      <div className="sports-filter">
        {sportsCategories.map((category) => (
          <button key={category} className={activeFilter === category ? 'active' : ''} onClick={() => handleFilterChange(category)}>
            {category}
          </button>
        ))}
      </div>

      <div className="main-container">
        <aside className="events-sidebar">
          <h3>Events Calendar</h3>
          <div className="date-picker"><span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span></div>
          <ul>
            {events.length > 0 ? events.map((event, i) => (
              <li key={i} className="event-card">
                <h4 className="event-title">{event.title}</h4>
                <p>{event.subtitle}</p>
                <div className="event-details">
                  <span>{event.time}</span>
                  <span>{event.location}</span>
                </div>
              </li>
            )) : (
              <li className="event-card"><h4 className="event-title">Loading events...</h4></li>
            )}
          </ul>
        </aside>

        <main className="feature-section">
          <h2>Latest Sports Features <a href="/" className="more-link">More Features →</a></h2>
          {newsLoading && <p>Loading latest sports news...</p>}
          {newsError && <p>Error loading news: {newsError}</p>}
          {features.map((item, i) => (
            <article className="feature-article-card" key={i}>
              <img src={item.img} alt={item.title} className="feature-article-img" onError={(e) => {e.target.src = '/asset/boxing.jpg'}} />
              <div className="feature-article-content">
                <span className="feature-article-tag">{item.sport}</span>
                <h3>{item.title}</h3>
                {item.desc ? <p>{item.desc}</p> : null}
                <a href={item.url || "#"} className="feature-article-read-more" target="_blank" rel="noopener noreferrer">Read More →</a>
              </div>
            </article>
          ))}
        </main>

        <aside className="updates-sidebar">
          <h3>Supercoach Event Updates</h3>
          <Slider {...carouselSettings}>
            {updates.map((item, i) => (
              <div key={i}>
                <div className="update-card">
                    <img src={item.img} alt={item.title} />
                    <div className="update-card-content">
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                        <span className="time">{item.time}</span>
                    </div>
                </div>
              </div>
            ))}
          </Slider>
        </aside>
      </div>

      <div className="sports-bottom-container">
        <section className="tribe-scores">
          <div className="section-header">
            <h2 className="section-title">Latest Tribe Scores</h2>
            {allScores.length > 3 && (
              <button className="view-more-btn" onClick={toggleViewMoreScores}>
                {showAllScores ? 'View Less' : `View More (${allScores.length - 3} more)`}
              </button>
            )}
          </div>
          <div className="scores-grid">
            {loading && <p>Loading scores...</p>}
            {error && <p>{error}</p>}
            {latestScores.map((match) => (
              <div key={match.idEvent} className="score-card">
                <div className="match-header">
                  <span className="team"><img src={match.strHomeTeamBadge} alt={match.strHomeTeam} /> {match.strHomeTeam}</span>
                  <span className="score">{match.intHomeScore}</span>
                </div>
                <div className="match-header">
                  <span className="team"><img src={match.strAwayTeamBadge} alt={match.strAwayTeam} /> {match.strAwayTeam}</span>
                  <span className="score">{match.intAwayScore}</span>
                </div>
                <div className="match-footer">
                  <p>{match.strLeague}</p>
                  <span className="date">{new Date(match.dateEvent).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="accomplishments">
          <h2 className="section-title">Sportscove Coaches’ Accomplishments</h2>
          <div className="accomplishment-grid">
            <Slider {...carouselSettings}>
              {accomplishmentsData.map((item, i) => (
                <div key={i}>
                    <div className="accomplishment-card">
                        <img src={item.img} alt={item.alt} />
                        <div className="accomplishment-card-content">
                            <h4>{item.text}</h4>
                        </div>
                    </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>

        <section className="latest-news">
          <h2 className="section-title">
            Latest News - {activeFilter}
            {latestNews.length > 0 && <span className="news-count">({latestNews.length} articles)</span>}
          </h2>
          <div className="news-grid">
            {newsLoading && <p>Loading {activeFilter.toLowerCase()} news...</p>}
            {newsError && <p>Error loading news: {newsError}</p>}
            {!newsLoading && displayedNews.length === 0 && (
              <p>No news found for {activeFilter}. Try selecting a different category.</p>
            )}
            {displayedNews.map((newsItem, index) => (
              <div key={`${newsItem.url}-${index}`} className="news-card clickable-card" onClick={() => window.open(newsItem.url, '_blank')}>
                <img src={newsItem.urlToImage || '/asset/boxing.jpg'} alt={newsItem.title} onError={(e) => {e.target.src = '/asset/boxing.jpg'}}/>
                <div className="news-content">
                  <span className={`news-category ${newsItem.priority === 'high' ? 'premium' : ''}`}>
                    {newsItem.category || activeFilter}
                    <span className="news-source">via {typeof newsItem.source === 'object' ? (newsItem.source?.name || 'Google News') : (newsItem.source || 'Google News')}</span>
                  </span>
                  <h4>{newsItem.title}</h4>
                  {newsItem.description ? <p>{newsItem.description}</p> : null}
                  <div className="news-meta">
                    <small>{new Date(newsItem.publishedAt).toLocaleDateString()}</small>
                    <span className="news-link">Click to Read More</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {!newsLoading && latestNews.length > 6 && (
            <div className="view-more-container">
              <button className="view-more-btn" onClick={toggleViewMoreNews}>
                {showAllNews ? `View Less (showing ${displayedNews.length} of ${latestNews.length})` : `View More (${latestNews.length - 6} more articles)`}
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}