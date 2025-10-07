import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./insights.css";

// <-- MOVED HELPER FUNCTION AND CONSTANT OUTSIDE THE COMPONENT -->
const MIX_CATEGORIES = [
  'MMA', 'Boxing', 'Wrestling', 'Brazilian Jiu Jitsu', 'Muay Thai',
  'MMA', 'Boxing', 'Wrestling', 'Brazilian Jiu Jitsu', 'Muay Thai',
  'Cricket'
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

// ++ NEW COMPONENT FOR THE YOUTUBE VIDEO ++
function YouTubeLive() {
  const videoId = "pdr9npWLqLA"; // Example YouTube live video
  const [videoError, setVideoError] = useState(false);

  const handleVideoError = () => {
    setVideoError(true);
  };

  useEffect(() => {
    const fixYouTubeOverlays = () => {
      const container = document.querySelector('.youtube-live-container');
      if (container) {
        const overlays = container.querySelectorAll('.cued-overlay, .ytmCuedOverlayHost, .ytmWatchPlayerControlsHost, .ytmVideoCoverHost');
        overlays.forEach(overlay => {
          overlay.style.position = 'absolute';
          overlay.style.top = '0';
          overlay.style.left = '0';
          overlay.style.width = '100%';
          overlay.style.height = '100%';
          overlay.style.zIndex = '1';
          overlay.style.pointerEvents = 'auto';
        });
      }
    };

    fixYouTubeOverlays();
    window.addEventListener('resize', fixYouTubeOverlays);
    
    const observer = new MutationObserver(fixYouTubeOverlays);
    const container = document.querySelector('.youtube-live-container');
    if (container) {
      observer.observe(container, { childList: true, subtree: true });
    }

    return () => {
      window.removeEventListener('resize', fixYouTubeOverlays);
      observer.disconnect();
    };
  }, []);

  if (videoError) {
    return (
      <div className="youtube-live-container">
        <div className="youtube-responsive-wrapper">
          <div className="youtube-live-wrapper error">
            <div className="youtube-error-content">
              <div className="youtube-error-icon">🎥</div>
              <div className="youtube-error-title">Live Sports Stream</div>
              <div className="youtube-error-subtitle">Video temporarily unavailable</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="youtube-live-container">
      <div className="youtube-responsive-wrapper">
        <div className="youtube-live-wrapper">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1&modestbranding=1&rel=0&showinfo=0`}
            title="YouTube live stream"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            onError={handleVideoError}
          />
        </div>
      </div>
    </div>
  );
}

// Photo Gallery Component
function PhotoGallery() {
  const [activePerson, setActivePerson] = useState(null);
  const [showPhotosPopup, setShowPhotosPopup] = useState(false);
  const [personPhotos, setPersonPhotos] = useState([]);
  const [personWinnings, setPersonWinnings] = useState([]);

  const peopleData = [
    { 
      name: 'Lionel', 
      directory: 'lionel', 
      displayName: 'Lionel Hupping',
      photos: ['Lionel07.jpg','lionel02.png','Lionel08.webp','Lionel09.webp'],
      winnings: [ 'Muay Thai' ]
    },
    { 
      name: 'Neeraj', 
      directory: 'neeraj', 
      displayName: 'Neeraj NJ',
      photos: ['Neeraj06.jpeg', 'Neeraj13 (1).jpeg','Neeraj12.jpeg','Neeraj07 (1).jpeg'],
      winnings: [ 'Muay Thai' ]
    },
    { 
      name: 'Prasanth', 
      directory: 'prasanth', 
      displayName: 'Prashant Jha',
      photos: ['Prasanth Jha08.jpg', 'Prasanth Jha09.jpeg','Prasanth Jha07.jpeg'],
      winnings: [ 'MMA', 'Muay Thai' ]
    },
    { 
      name: 'Raghav', 
      directory: 'raghav', 
      displayName: 'Raghav Jamwal',
      photos: ['Raghav02 (1).jpg','Raghav04 (1).jpeg','Raghav04.jpg','Raghav06.jpeg'],
      winnings: [
        'A four-time National Gold Medalist in grappling.',
        'Won a Bronze Medal at the Asian Grappling Championships.',
        'Captained Team India to a third-place finish at the 2023 Asian Grappling Championships in Astana, Kazakhstan.',
        'Achieved a #29 ranking in Asia in Modern Pentathlon, coming close to Olympic qualification.',
        'Earned a Bronze Medal in Muay Thai'
      ]
    },
    { 
      name: 'Surya', 
      directory: 'surya', 
      displayName: 'Surya Sagar',
      photos: ['Surya01.jpg', 'Surya10.jpg','Surya03.jpg','Surya12.jpg'],
      winnings: [ 'Muay Thai' ]
    },
    { 
      name: 'Raghavendra', 
      directory: 'raghavendra', 
      displayName: 'Raghavendra Singh Shekhawat',
      photos: ['Raghav03 (1).jpeg','Raghav04 (2).jpeg','Raghav11 (2).jpg'],
      winnings: [
        'Raghavendra “Desert Devil” Singh Shekhawat holds an undefeated professional MMA record of 2-0-0.',
        'He is ranked #25 in Pro Men’s Featherweight in Asia South.',
        'He is also ranked #1,307 in the Asia Pacific region.',
        'He has competed in top Indian MMA organizations including Ronin FC, Kombat Creed Championship (KCC), and GC, with connections to Matrix Fight Night.',
        'His fighting style reflects his Rajasthani warrior heritage, combining strategic patience with explosive finishing ability.',
        'Known by the moniker “Desert Devil,” he is recognized for his discipline, honor, and technical excellence in MMA.'
      ]
    },
    { 
      name: 'Kuldeep Tarkar', 
      directory: 'kuldeep', 
      displayName: 'Kuldeep Tarkar',
      photos: ['IMG_0211.JPG','IMG_1361.PNG','IMG_1465.JPG','IMG_2992.JPG'],
      winnings: [
        'Kuldeep Tarkar holds a professional boxing record of 3 wins and 1 loss (3-1-0).',
        'He is a national-level amateur boxing achiever who successfully transitioned into professional boxing.',
        'He has competed under major promotions such as Grassroot Boxing Promotions & Management and Susegado Strike.',
        'His career reflects a combination of technical precision, ring intelligence, and mental toughness.',
        'He represents one of India’s most accomplished boxers, with success across both amateur and professional levels.'
      ]
    },
    { 
      name: 'Hardeep Singh Dhillon', 
      directory: 'hardeep', 
      displayName: 'Hardeep Singh Dhillon',
      photos: ['Hardeep01.jpeg','Hardeep02.jpeg','Hardeep02.jpg','Hardeep03.jpg'],
      winnings: [
        'Hardeep Singh became the first Indian heavyweight Greco-Roman wrestler to qualify for the Olympics, earning his spot at the Rio 2016 Olympics in the 98kg category.',
        'He won a Gold Medal at the 2013 Commonwealth Wrestling Championships.',
        'He secured a Silver Medal at the 2016 Asian Wrestling Championships.',
        'He represented India at the Rio 2016 Olympics, competing against Turkey’s Cenk Ildem in the round of 16.',
        'His achievements established him among Asia’s top Greco-Roman wrestling competitors.'
      ]
    },
    { 
      name: 'Dylan Lockard', 
      directory: 'dylan', 
      displayName: 'Dylan Lockard',
      photos: ['Dylan (2).webp','Dylan03 (2).webp','Dylan04 (1).jpg'],
      winnings: [
        'Dylan Lockard holds an impressive professional MMA record of 7 wins and 2 losses (7-2-0).',
        'He is ranked #14 Pro Men’s Lightweight in New England.',
        'He competed on Dana White’s Contender Series in 2019, showcasing his skills in front of UFC President Dana White.',
        'He has fought in top regional organizations such as Classic Entertainment & Sports (CES) MMA, New England Fights (NEF), and Combat Zone.',
        'He trains out of New England Cartel in Danville, New Hampshire.',
        'His career reflects UFC-level experience and recognition as one of New England’s most accomplished fighters.'
      ]
    },
    { 
      name: 'Asim Bin Al Dayani', 
      directory: 'asim', 
      displayName: 'Asim Bin Al Dayani',
      photos: ['IMG_3224.JPG','IMG_3255 (1).JPG'],
      winnings: [
        'Asim Bin Saleh Al Dayani is a 5× Muay Thai National Champion.',
        'He is also a 2× Kickboxing National Champion.',
        'He has competed in 24 bouts, achieving 19 victories.',
        'He has won WMC State and National titles in Muay Thai.',
        'He represented India at the UAE Muay Thai Nation Championship, where he secured a podium finish.',
        'He has competed across Muay Thai, Kickboxing, and MMA, demonstrating exceptional versatility and skill.',
        'His accomplishments make him one of India’s most decorated and versatile strikers.'
      ]
    },
    { 
      name: 'Anil Mehta', 
      directory: 'anil', 
      displayName: 'Anil Mehta',
      photos: ['Anil Mehta fight 2.png','Anil Mehta Fight Thumnbail.png','Anil01 (1).png','Anil04 (1).jpg'],
      winnings: [
        'Anil Mehta transitioned from being a police officer to becoming one of India’s top Muay Thai talents.',
        'He trained in Thailand, immersing himself in authentic Muay Thai culture and techniques.',
        'He learned from world-class trainers and sparring partners in Thailand.',
        'He has been an advocate for Indian fighters, raising awareness about visa challenges that restrict access to training in Thailand.',
        'His journey reflects dedication, courage, and a commitment to mastering the art of eight limbs.'
      ]
    }
  ];

  const handleTabClick = (person) => {
    const photoUrls = person.photos.map(photo => `/asset/New folder/${person.directory}/${photo}`);
    
    setActivePerson(person);
    setPersonPhotos(photoUrls);
    setPersonWinnings(person.winnings || []);
    setShowPhotosPopup(true);
  };

  const closePopup = () => {
    setShowPhotosPopup(false);
    setActivePerson(null);
    setPersonPhotos([]);
    setPersonWinnings([]);
  };

  // Split coaches into two rows for the staggered layout
  const topRowCoaches = peopleData.slice(0, 5);
  const bottomRowCoaches = peopleData.slice(5);

  return (
    <div className="photo-gallery">
      <div className="gallery-container">
        <div className="gallery-tabs-wrapper">
          <div className="gallery-tab-row">
            {topRowCoaches.map((person) => (
              <button 
                key={person.name} 
                className={`gallery-tab ${activePerson?.name === person.name ? 'active' : ''}`}
                onClick={() => handleTabClick(person)}
              >
                {person.displayName}
              </button>
            ))}
          </div>
          <div className="gallery-tab-row">
            {bottomRowCoaches.map((person) => (
              <button 
                key={person.name} 
                className={`gallery-tab ${activePerson?.name === person.name ? 'active' : ''}`}
                onClick={() => handleTabClick(person)}
              >
                {person.displayName}
              </button>
            ))}
          </div>
        </div>
      </div>

      {showPhotosPopup && (
        <div className="photos-popup-overlay" onClick={closePopup}>
          <div className="photos-popup-container" onClick={(e) => e.stopPropagation()}>
            <div className="photos-popup-header">
              <h3>{activePerson?.displayName}'s Gallery</h3>
              <button className="popup-close-btn" onClick={closePopup}>×</button>
            </div>
            <div className="photos-popup-content">
              <div className="popup-body-split">
                <div className="popup-info-panel">
                  <h4>Accomplishments</h4>
                  {personWinnings.length > 0 ? (
                    <ul>
                      {personWinnings.map((win, index) => (
                        <li key={index}>🏆 {win}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No accomplishments listed.</p>
                  )}
                </div>
                <div className="popup-photos-panel">
                  {personPhotos.length > 0 ? (
                    <div className="photos-popup-grid">
                      {personPhotos.map((photo, index) => (
                        <div key={index} className="popup-photo-item">
                          <img 
                            src={photo} 
                            alt={`${activePerson?.displayName} ${index + 1}`}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentElement.style.display = 'none';
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-photos-message">No photos available for {activePerson?.displayName}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Insights() {
  const [latestNews, setLatestNews] = useState([]);
  const [allNews, setAllNews] = useState([]);
  const [displayedNews, setDisplayedNews] = useState([]);
  const [showAllNews, setShowAllNews] = useState(false);
  const [events, setEvents] = useState([]);
  const [features, setFeatures] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All Sports');
  const [wellnessData, setWellnessData] = useState([]);
  const [activeWellnessTab, setActiveWellnessTab] = useState('Performance');
  const [wellnessLoading, setWellnessLoading] = useState(true);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    swipeToSlide: true,
    touchThreshold: 5,
    swipe: true,
    lazyLoad: 'ondemand',
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

  const sportsCategories = [
    'All Sports', 'MMA', 'Boxing', 'Wrestling', 'Brazilian Jiu Jitsu', 'Muay Thai'
  ];

  const updates = [
    { img: "/asset/events/1.jpg", title: "Lightweight Showdown in Tanzania" },
    { img: "/asset/events/2.jpg"},
  ];

  useEffect(() => {
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
        const upcomingCombat = [
          { title: 'UFC Fight Night', subtitle: 'Allen vs. Evloev', time: '8:00 PM', location: 'Las Vegas, NV', date: '2025-11-15', sport: 'MMA' },
          { title: 'Top Rank Boxing', subtitle: 'Shakur Stevenson vs. Navarrete', time: '10:00 PM', location: 'New York, NY', date: '2025-12-05', sport: 'Boxing' },
          { title: 'ONE Fight Night', subtitle: 'Rodtang vs. Superlek', time: '7:00 PM', location: 'Singapore', date: '2025-10-25', sport: 'Muay Thai' },
          { title: 'Bellator 315', subtitle: 'Amosov vs. Jackson', time: '9:00 PM', location: 'Dublin, Ireland', date: '2025-11-01', sport: 'MMA' }
        ].filter(e => e.date && new Date(e.date) > new Date())
         .sort((a, b) => new Date(a.date) - new Date(b.date))
         .slice(0, 4);
        setEvents(upcomingCombat.length > 0 ? upcomingCombat : [{ title: 'Combat events coming soon', subtitle: '', time: 'TBD', location: 'TBD', sport: 'Combat Sports' }]);
      } catch {
        setEvents([{ title: 'Events Loading...', subtitle: 'Please wait', time: 'TBD', location: 'TBD', sport: 'Combat Sports' }]);
      }
    };

    const fetchWellnessData = async () => {
      try {
        const response = await fetch('/asset/readingmaterails-20.csv');
        const csvText = await response.text();
        
        const parseCSVLine = (line) => {
          const result = [];
          let current = '';
          let inQuotes = false;
          
          for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              result.push(current.trim());
              current = '';
            } else {
              current += char;
            }
          }
          result.push(current.trim());
          return result;
        };
        
        const lines = csvText.split('\n').filter(line => line.trim());
        const headers = parseCSVLine(lines[0]);
        
        const wellnessArticles = [];
        for (let i = 1; i < lines.length; i++) {
          const values = parseCSVLine(lines[i]);
          if (values.length >= 5 && values[1]) {
            const article = {};
            headers.forEach((header, index) => {
              article[header] = values[index] || '';
            });
            
            const cleanArticle = {
              id: article[''] || `article-${i}`,
              tab: article.tab,
              headline: article.headline,
              summary: article.summary,
              tags: article.tags,
              source_label: article.source_label,
              content_type: article.content_type,
              est_read_sec: parseInt(article.est_read_sec) || 20,
              extract: article.extract || ''
            };
            
            wellnessArticles.push(cleanArticle);
          }
        }
        
        const groupedData = {};
        const categories = ['Performance', 'Training', 'Recovery', 'Community'];
        
        categories.forEach(cat => {
          groupedData[cat] = wellnessArticles
            .filter(item => item.tab === cat)
            .slice(0, 6);
        });
        
        setWellnessData(groupedData);
      } catch (err) {
        console.error('Error fetching wellness data:', err);
        setWellnessData({});
      } finally {
        setWellnessLoading(false);
      }
    };

    fetchSportsNews();
    fetchUpcomingEvents();
    fetchWellnessData();
  }, []);

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
          <YouTubeLive />
          
          <section className="wellness-reading-section">
            <h2>Sports and Wellness Oriented Reading</h2>
            
            <div className="wellness-tabs">
              {['Performance', 'Training', 'Recovery', 'Community'].map((category) => (
                <button
                  key={category}
                  className={`wellness-tab ${activeWellnessTab === category ? 'active' : ''}`}
                  onClick={() => setActiveWellnessTab(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="wellness-content">
              {wellnessLoading && <p>Loading wellness articles...</p>}
              {!wellnessLoading && (
                <div className="wellness-cards-container">
                  <div className="wellness-cards-scroll">
                    {wellnessData[activeWellnessTab]?.map((article, index) => (
                      <div key={article.id || index} className="wellness-reading-card">
                        <div className="wellness-card-header">
                          <span className="wellness-tab-badge">{article.tab || 'General'}</span>
                        </div>
                        <h3 className="wellness-card-title">{article.headline || 'Untitled'}</h3>
                        <p className="wellness-card-summary">{article.summary || 'No summary available'}</p>
                        <div className="wellness-card-tags">
                          {article.tags ? article.tags.split(',').slice(0, 4).map((tag, i) => (
                            <span key={i} className="wellness-tag">{tag.trim()}</span>
                          )) : null}
                        </div>
                        <div className="wellness-card-footer">
                          <span className="wellness-label">{article.source_label || ''}</span>
                          <button className="wellness-read-btn">Read Article</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="photo-gallery-section">
            <h2>SportsCove Super Coaches in Action</h2>
            <PhotoGallery />
          </section>

          <h2>Headlines</h2>
          {newsLoading && <p>Loading latest sports news...</p>}
          {newsError && <p>Error loading news: {newsError}</p>}
          {features.map((item, i) => (
            <a 
              href={item.url || "#"} 
              className="feature-article-card" 
              key={i}
              target="_blank" 
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <img src={item.img} alt={item.title} className="feature-article-img" onError={(e) => {e.target.src = '/asset/boxing.jpg'}} />
              <div className="feature-article-content">
                <span className="feature-article-tag">{item.sport}</span>
                <h3>{item.title}</h3>
                {item.desc ? <p>{item.desc}</p> : null}
                <span className="feature-article-read-more">Read More →</span>
              </div>
            </a>
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
              <a key={`${newsItem.url}-${index}`} className="news-card clickable-card" href={newsItem.url} target="_blank" rel="noopener noreferrer">
                <img src={newsItem.urlToImage || '/asset/boxing.jpg'} alt={newsItem.title} onError={(e) => {e.target.src = '/asset/boxing.jpg'}}/>
                <div className="news-content">
                  <span className={`news-category ${newsItem.priority === 'high' ? 'premium' : ''}`}>
                    {newsItem.category || activeFilter}
                  </span>
                  <h4>{newsItem.title}</h4>
                  {newsItem.description ? <p>{newsItem.description}</p> : null}
                  <div className="news-meta">
                    <small>{new Date(newsItem.publishedAt).toLocaleDateString()}</small>
                    <span className="news-link">Click to Read More</span>
                  </div>
                </div>
              </a>
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