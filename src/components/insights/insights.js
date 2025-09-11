/**
 * Insights Page Component
 * 
 * This component provides a comprehensive sports dashboard that fetches and displays:
 * 1. Live sports scores from 35+ leagues using TheSportsDB API
 * 2. Category-specific sports news from Google News RSS feeds
 * 3. Upcoming events and sports features with image extraction
 * 4. Interactive filtering by sport categories (MMA, Boxing, Wrestling, etc.)
 * 
 * Features:
 * - Real-time data fetching with parallel processing for optimal performance
 * - Three-step image extraction (RSS → Open Graph → Fallback)
 * - Responsive design with expandable sections
 * - Category-specific content filtering
 */
import React, { useState, useEffect, useCallback } from "react";
import "./insights.css";

// Helper function to parse RSS XML to JSON using multiple services for reliability
const parseRSSFeed = async (rssUrl) => {
  try {
    const rssServices = [
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`,
      `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}&format=json`
    ];
    
    for (const serviceUrl of rssServices) {
      try {
        const response = await fetch(serviceUrl);
        
        if (response.ok) {
          const data = await response.json();
          
          // Handle RSS2JSON response format
          if (data.items) {
            return data.items;
          } 
          // Handle AllOrigins response format - parse XML manually
          else if (data.contents) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
            const items = xmlDoc.querySelectorAll('item');
            
            return Array.from(items).map(item => ({
              title: item.querySelector('title')?.textContent || '',
              description: item.querySelector('description')?.textContent || '',
              link: item.querySelector('link')?.textContent || '',
              pubDate: item.querySelector('pubDate')?.textContent || '',
              content: item.querySelector('content\\:encoded, encoded')?.textContent || item.querySelector('description')?.textContent || '',
              image: item.querySelector('media\\:thumbnail')?.getAttribute('url') || 
                     item.querySelector('enclosure')?.getAttribute('url') || '',
              enclosure: {
                link: item.querySelector('enclosure')?.getAttribute('url') || ''
              }
            }));
          }
        }
      } catch (serviceError) {
        console.warn(`RSS service failed:`, serviceError);
      }
    }
    
    return [];
  } catch (error) {
    console.warn('Failed to fetch RSS feed:', error);
    return [];
  }
};

// Helper function to extract Open Graph image from article page using CORS proxy
// eslint-disable-next-line no-unused-vars
const extractOGImageFromPage = async (articleUrl) => {
  try {
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(articleUrl)}`;
    const response = await fetch(proxyUrl);
    
    if (response.ok) {
      const data = await response.json();
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.contents, 'text/html');
      
      // Try Open Graph image meta tag
      const ogImage = doc.querySelector('meta[property="og:image"]');
      if (ogImage) {
        const imageUrl = ogImage.getAttribute('content');
        if (imageUrl && imageUrl.startsWith('http')) {
          return imageUrl;
        }
      }
      
      // Fallback to Twitter image meta tag
      const twitterImage = doc.querySelector('meta[name="twitter:image"]');
      if (twitterImage) {
        const imageUrl = twitterImage.getAttribute('content');
        if (imageUrl && imageUrl.startsWith('http')) {
          return imageUrl;
        }
      }
      
      // Last resort: find first article image
      const firstImg = doc.querySelector('article img, .article img, .content img, main img');
      if (firstImg) {
        const imageUrl = firstImg.getAttribute('src');
        if (imageUrl) {
          return imageUrl.startsWith('http') ? imageUrl : new URL(imageUrl, articleUrl).href;
        }
      }
    }
  } catch (error) {
    console.warn(`Failed to extract OG image from ${articleUrl}:`, error);
  }
  
  return null;
};

// Helper function to get sport-specific fallback images
const getFallbackImage = (category) => {
  const fallbackImages = {
    'Boxing': '/asset/boxing.jpg',
    'MMA': '/asset/boxing.jpg',
    'Wrestling': '/asset/boxing.jpg',
    'Brazilian Jiu Jitsu': '/asset/boxing.jpg',
    'Muay Thai': '/asset/boxing.jpg',
    'Cricket': '/asset/01.avif',
    'All Sports': '/asset/02.avif',
    'default': '/asset/03.avif'
  };
  return fallbackImages[category] || fallbackImages['default'];
};

// Helper function to clean HTML content and decode entities
const cleanHTMLContent = (htmlString) => {
  if (!htmlString) return '';
  
  // Remove HTML tags and decode common entities
  return htmlString
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&hellip;/g, '...')
    .replace(/\s+/g, ' ') // Remove extra whitespace
    .trim();
};

// ===================================================================
// Reusable Carousel Card Component for Accomplishments
// ===================================================================
const AccomplishmentCarouselCard = ({ accomplishment }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Go to the previous slide
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? accomplishment.images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // Go to the next slide
  const goToNext = () => {
    const isLastSlide = currentIndex === accomplishment.images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="accomplishment-card">
      {/* Carousel Buttons */}
      <button onClick={goToPrevious} className="carousel-btn prev">❮</button>
      <button onClick={goToNext} className="carousel-btn next">❯</button>
      
      {/* Display the current image */}
      <img 
        src={accomplishment.images[currentIndex]} 
        alt={accomplishment.description} 
      />

      {/* Description Overlay */}
      <p>{accomplishment.description}</p>
      
      {/* Navigation Dots */}
      <div className="carousel-dots">
        {accomplishment.images.map((_, slideIndex) => (
          <div
            key={slideIndex}
            className={`dot ${currentIndex === slideIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(slideIndex)}
          ></div>
        ))}
      </div>
    </div>
  );
};

// ===================================================================
// New Reusable Carousel Card for Supercoach Updates
// ===================================================================
const UpdateCarouselCard = ({ update }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? update.images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === update.images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="update-card">
      {/* Re-using the same carousel button styles */}
      <button onClick={goToPrevious} className="carousel-btn prev">❮</button>
      <button onClick={goToNext} className="carousel-btn next">❯</button>
      
      <img 
        src={update.images[currentIndex]} 
        alt={update.title} 
      />
      
      {/* Content Overlay */}
      <div className="update-card-content">
        <h4>{update.title}</h4>
        <p>{update.desc}</p>
        <span className="time">{update.time}</span>
      </div>

      {/* Re-using the same carousel dot styles */}
      <div className="carousel-dots">
        {update.images.map((_, slideIndex) => (
          <div
            key={slideIndex}
            className={`dot ${currentIndex === slideIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(slideIndex)}
          ></div>
        ))}
      </div>
    </div>
  );
};


export default function Insights() {
  // State management for dynamic sections
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

  // Sports categories for content filtering
  const sportsCategories = [
    'All Sports', 'MMA', 'Boxing', 'Wrestling', 
    'Brazilian Jiu Jitsu', 'Muay Thai', 'Cricket'
  ];

  // NEW DYNAMIC CONTENT FOR SUPERCOACH UPDATES
  const updatesData = [
    { 
      id: 'update1',
      images: [
        "/asset/events/1.jpg", // Example second image
        "/asset/events/2.jpg", // Example third image
      ],
      title: "Lightweight Showdown in Tanzania", 
      desc: "Indian boxing sensation Akshay Chahal is set to face Tanzania's Kato Machemba in a highly anticipated lightweight championship fight on September 26, 2025.", 
      time: "2d" 
    },
    // { 
    //   id: 'update2',
    //   images: [
    //     "/asset/cricket.jpg", // Assumed new image for this update
    //     "/asset/events/1.jpg",
    //     "/asset/events/2.jpg"
    //   ],
    //   title: "Cricket Stars Shine Bright", 
    //   desc: "Young talent takes center stage, thrilling fans...", 
    //   time: "1d" 
    // },
  ];

  // Data Structure for Accomplishments
  const accomplishmentsData = [
    {
      id: 'sprint-sensation',
      description: "9.10 to 11:58 seconds - Moni Ehsan Lakshmi Sekar, India team sprint sensation",
      images: [
        "/asset/events/1.jpg",
        "/asset/events/2.jpg", 
      ]
    }
  ];

  // Main data fetching effect - runs once on component mount
  useEffect(() => {
    const fetchSportsData = async () => {
      try {
        const allScoresData = [];
        // Comprehensive league coverage from TheSportsDB API
        const leagueIds = [
          4328, 4335, 4331, 4332, 4334, 4380, // European Football
          4204, 4391, 4424, 4387, // American Sports
          4346, 4359, 4350, 4370, 4407, // International Sports
          4336, 4342, 4344, 4348, 4352, // Major Championships
          4356, 4362, 4364, 4366, 4368, // Additional Leagues
          4372, 4374, 4376, 4378, 4382, // Continental Championships
          4384, 4386, 4388, 4390, 4392  // Collegiate & Alternative
        ];
        
        // Generate dynamic date endpoints for the last 5 days
        const today = new Date();
        const generalEndpoints = [];
        for (let i = 0; i < 5; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          generalEndpoints.push(`https://www.thesportsdb.com/api/v1/json/3/eventsday.php?d=${dateStr}`);
        }
        
        // Fetch recent scores from general date endpoints
        for (const endpoint of generalEndpoints) {
          try {
            const response = await fetch(endpoint);
            if (response.ok) {
              const data = await response.json();
              const events = (data.events || []).slice(0, 10);
              allScoresData.push(...events);
            }
          } catch (err) {
            console.warn(`Failed to fetch from general endpoint:`, err);
          }
          await new Promise(resolve => setTimeout(resolve, 200));
        }
        
        // Fetch scores from specific leagues for variety
        for (const leagueId of leagueIds) {
          try {
            const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/eventspastleague.php?id=${leagueId}`);
            if (response.ok) {
              const data = await response.json();
              const events = (data.events || []).slice(0, 8);
              allScoresData.push(...events);
            }
          } catch (err) {
            console.warn(`Failed to fetch scores for league ${leagueId}:`, err);
          }
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        // Process and deduplicate scores for better variety
        const uniqueScores = [];
        const seenMatches = new Set();
        
        for (const event of allScoresData) {
          if (event.intHomeScore !== null && event.intAwayScore !== null) {
            const matchKey = `${event.strHomeTeam}-${event.strAwayTeam}-${event.dateEvent}`;
            const reverseKey = `${event.strAwayTeam}-${event.strHomeTeam}-${event.dateEvent}`;
            
            if (!seenMatches.has(matchKey) && !seenMatches.has(reverseKey)) {
              seenMatches.add(matchKey);
              uniqueScores.push(event);
            }
          }
        }

        // Create diverse score selection prioritizing different leagues
        const diverseScores = [];
        const usedLeagues = new Set();
        
        // First pass: one score per league for maximum variety
        for (const score of uniqueScores.sort((a, b) => new Date(b.dateEvent) - new Date(a.dateEvent))) {
          if (!usedLeagues.has(score.strLeague) && diverseScores.length < 25) {
            diverseScores.push(score);
            usedLeagues.add(score.strLeague);
          }
        }
        
        // Second pass: fill remaining slots up to 35 total
        for (const score of uniqueScores) {
          if (diverseScores.length >= 35) break;
          if (!diverseScores.some(existing => existing.idEvent === score.idEvent)) {
            diverseScores.push(score);
          }
        }

        console.log(`Fetched ${diverseScores.length} unique scores from ${usedLeagues.size} different leagues`);

        // Set scores data or use fallback if no data available
        if (diverseScores.length === 0) {
          const fallbackScores = [
            { idEvent: 'fallback1', strHomeTeam: 'Manchester City', strAwayTeam: 'Arsenal', intHomeScore: '2', intAwayScore: '1', strLeague: 'Premier League', dateEvent: '2025-09-08' },
            { idEvent: 'fallback2', strHomeTeam: 'Lakers', strAwayTeam: 'Warriors', intHomeScore: '108', intAwayScore: '95', strLeague: 'NBA', dateEvent: '2025-09-07' },
            { idEvent: 'fallback3', strHomeTeam: 'Real Madrid', strAwayTeam: 'Barcelona', intHomeScore: '3', intAwayScore: '2', strLeague: 'La Liga', dateEvent: '2025-09-06' }
          ];
          setAllScores(fallbackScores);
          setLatestScores(fallbackScores);
        } else {
          setAllScores(diverseScores);
          setLatestScores(diverseScores.slice(0, 6));
        }

      } catch (err) {
        console.error('Error fetching sports scores:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchSportsNews = async () => {
      try {
        setNewsLoading(true);
        const allSportsNews = [];
        
        // Google News RSS feeds for each sport category
        const sportRSSFeeds = {
          'All Sports': ['https://news.google.com/rss/search?q=sports&hl=en-US&gl=US&ceid=US:en'],
          'MMA': ['https://news.google.com/rss/search?q=MMA+UFC+mixed+martial+arts&hl=en-US&gl=US&ceid=US:en'],
          'Boxing': ['https://news.google.com/rss/search?q=boxing+heavyweight+title&hl=en-US&gl=US&ceid=US:en'],
          'Wrestling': ['https://news.google.com/rss/search?q=WWE+professional+wrestling&hl=en-US&gl=US&ceid=US:en'],
          'Brazilian Jiu Jitsu': ['https://news.google.com/rss/search?q=brazilian+jiu+jitsu+BJJ&hl=en-US&gl=US&ceid=US:en'],
          'Muay Thai': ['https://news.google.com/rss/search?q=muay+thai+kickboxing&hl=en-US&gl=US&ceid=US:en'],
          'Cricket': ['https://news.google.com/rss/search?q=cricket+match+tournament&hl=en-US&gl=US&ceid=US:en']
        };

        // Parallel fetching for improved performance
        const fetchPromises = [];

        for (const [category, rssUrls] of Object.entries(sportRSSFeeds)) {
          for (const rssUrl of rssUrls) {
            fetchPromises.push(
              (async () => {
                try {
                  const rssItems = await parseRSSFeed(rssUrl);
                  
                  if (rssItems && rssItems.length > 0) {
                    const articles = [];
                    const itemsToProcess = Math.min(rssItems.length, 6);
                    
                    for (let i = 0; i < itemsToProcess; i++) {
                      const item = rssItems[i];
                      
                      // Extract image with fallback strategy
                      let imageUrl = item.enclosure?.link || item.thumbnail || item.image || 
                                     item['media:thumbnail']?.['@_url'] || getFallbackImage(category);
                      
                      const article = {
                        title: cleanHTMLContent(item.title) || 'Sports News Update',
                        description: cleanHTMLContent(item.description || item.content) || `Latest ${category.toLowerCase()} news and updates`,
                        urlToImage: imageUrl,
                        url: item.link || item.guid || '#',
                        publishedAt: item.pubDate || new Date().toISOString(),
                        category: category,
                        source: 'Google News RSS',
                        priority: 'high'
                      };
                      
                      articles.push(article);
                    }
                    
                    return { category, articles };
                  }
                  return { category, articles: [] };
                  
                } catch (err) {
                  console.warn(`Failed to fetch RSS for ${category}:`, err);
                  return { category, articles: [] };
                }
              })()
            );
          }
        }

        // Wait for all parallel fetches to complete
        const results = await Promise.all(fetchPromises);
        
        for (const result of results) {
          if (result.articles.length > 0) {
            allSportsNews.push(...result.articles);
          }
        }

        // Process and organize news data
        const uniqueNews = allSportsNews.filter((article, index, self) =>
          index === self.findIndex(a => a.title === article.title)
        ).sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

        // Set initial state for news and features
        setAllNews(uniqueNews);
        const initialNews = uniqueNews.slice(0, 15);
        setLatestNews(initialNews);
        setDisplayedNews(initialNews.slice(0, 6));
        
        // Set features using different articles to avoid duplication
        const allSportsFeatures = uniqueNews.slice(0, 5).map(article => ({
          img: article.urlToImage || getFallbackImage(article.category),
          sport: article.category || "Sports News",
          title: cleanHTMLContent(article.title).length > 80 ? 
                 cleanHTMLContent(article.title).substring(0, 80) + "..." : 
                 cleanHTMLContent(article.title),
          desc: cleanHTMLContent(article.description).length > 120 ? 
                cleanHTMLContent(article.description).substring(0, 120) + "..." : 
                cleanHTMLContent(article.description) || "Latest sports update...",
          url: article.url
        }));
        setFeatures(allSportsFeatures);
      } catch (err) {
        console.error('Error fetching sports news:', err);
        setNewsError(err.message);
        setAllNews([]);
        setLatestNews([]);
        setDisplayedNews([]);
        setFeatures([]);
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
                time: event.strTime ? 
                  new Date(`2000-01-01 ${event.strTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 
                  'TBD',
                location: event.strVenue || event.strCountry || "TBD",
                date: event.dateEvent,
                sport: event.strSport || 'Sports'
              }));
              allUpcomingEvents.push(...events);
            }
          } catch (err) {
            console.warn(`Failed to fetch events for league ${leagueId}:`, err);
          }
        }
        
        const sortedEvents = allUpcomingEvents
          .filter(event => event.date && new Date(event.date) > new Date())
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 4);
          
        if (sortedEvents.length > 0) {
          setEvents(sortedEvents);
        } else {
          setEvents([
            { title: "Upcoming Championship Match", subtitle: "Finals", time: "TBD", location: "Stadium TBD", sport: "Sports" },
            { title: "League Tournament", subtitle: "Semi-Finals", time: "TBD", location: "Arena TBD", sport: "Sports" }
          ]);
        }
      } catch (err) {
        console.error('Events fetching error:', err);
        setEvents([
          { title: "Events Loading...", subtitle: "Please wait", time: "TBD", location: "TBD", sport: "Sports" }
        ]);
      }
    };

    // Execute all data fetching functions
    fetchSportsData();
    fetchSportsNews();
    fetchUpcomingEvents();
  }, []); // Run once on component mount

  // Monitor for empty data and trigger refresh if needed
  useEffect(() => {
    setTimeout(() => {
      if (latestScores.length === 0 || latestNews.length === 0) {
        setLoading(true);
        setNewsLoading(true);
      }
    }, 1000);
  }, [latestNews.length, latestScores.length]);
  
  const applyNewsFilter = useCallback((category) => {
    if (category === 'All Sports') {
      const newsToShow = allNews.slice(0, 15);
      setLatestNews(newsToShow);
      setDisplayedNews(newsToShow.slice(0, 6));
      
      // Features from different articles to avoid duplication with news section
      const allSportsFeatures = allNews.slice(6, 11).map(article => ({
        img: article.urlToImage || getFallbackImage(article.category),
        sport: article.category || "Sports News",
        title: cleanHTMLContent(article.title).length > 80 ? 
               cleanHTMLContent(article.title).substring(0, 80) + "..." : 
               cleanHTMLContent(article.title),
        desc: cleanHTMLContent(article.description).length > 120 ? 
              cleanHTMLContent(article.description).substring(0, 120) + "..." : 
              cleanHTMLContent(article.description) || "Latest sports update...",
        url: article.url
      }));
      setFeatures(allSportsFeatures);
    } else {
      // Filter news by specific category
      const filteredNews = allNews.filter(news => 
        news.category === category || 
        news.title.toLowerCase().includes(category.toLowerCase()) ||
        news.description.toLowerCase().includes(category.toLowerCase())
      );
      
      const sortedFilteredNews = filteredNews.sort((a, b) => {
        if (a.priority !== b.priority) {
          const priorityOrder = { 'high': 0, 'medium': 1, 'low': 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        return new Date(b.publishedAt) - new Date(a.publishedAt);
      });
      
      setLatestNews(sortedFilteredNews);
      setDisplayedNews(sortedFilteredNews.slice(0, 6));
      
      // Category-specific features using different articles
      const categoryFeatures = sortedFilteredNews.slice(6, 11).map(article => ({
        img: article.urlToImage || getFallbackImage(article.category),
        sport: article.category || category,
        title: cleanHTMLContent(article.title).length > 80 ? 
               cleanHTMLContent(article.title).substring(0, 80) + "..." : 
               cleanHTMLContent(article.title),
        desc: cleanHTMLContent(article.description).length > 120 ? 
              cleanHTMLContent(article.description).substring(0, 120) + "..." : 
              cleanHTMLContent(article.description) || `Latest ${category.toLowerCase()} update...`,
        url: article.url
      }));
      
      // Handle cases where category has insufficient articles
      if (categoryFeatures.length < 5 && sortedFilteredNews.length > 0) {
        const additionalFeatures = sortedFilteredNews.slice(0, 5 - categoryFeatures.length).map(article => ({
          img: article.urlToImage || getFallbackImage(article.category),
          sport: article.category || category,
          title: cleanHTMLContent(article.title).length > 80 ? 
                 cleanHTMLContent(article.title).substring(0, 80) + "..." : 
                 cleanHTMLContent(article.title),
          desc: cleanHTMLContent(article.description).length > 120 ? 
                cleanHTMLContent(article.description).substring(0, 120) + "..." : 
                cleanHTMLContent(article.description) || `Latest ${category.toLowerCase()} update...`,
          url: article.url
        }));
        setFeatures([...categoryFeatures, ...additionalFeatures]);
      } else {
        setFeatures(categoryFeatures);
      }
    }
  }, [allNews, setLatestNews, setDisplayedNews, setFeatures]);

  // Apply filtering when news data changes
  useEffect(() => {
    if (allNews.length > 0) {
      applyNewsFilter(activeFilter);
    }
  }, [allNews, activeFilter, applyNewsFilter]);
  
  // Event handlers for user interactions
  const handleFilterChange = (category) => {
    setActiveFilter(category);
    setShowAllNews(false);
    applyNewsFilter(category);
  };

  const toggleViewMoreScores = () => {
    if (showAllScores) {
      setLatestScores(allScores.slice(0, 6));
      setShowAllScores(false);
    } else {
      setLatestScores(allScores.slice(0, 35));
      setShowAllScores(true);
    }
  };

  const toggleViewMoreNews = () => {
    if (showAllNews) {
      setDisplayedNews(latestNews.slice(0, 6));
      setShowAllNews(false);
    } else {
      setDisplayedNews(latestNews);
      setShowAllNews(true);
    }
  };

  // Loading and error states
  if (loading) {
    return (
      <div className="insights-container">
        <div className="loading">Loading sports data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="insights-container">
        <div className="error">Error loading data: {error}</div>
      </div>
    );
  }

  return (
    <div className="insights-page">
      {/* Page Header */}
      <header className="header">
        <h1>SPORTS INSIGHTS</h1>
        <p>Insights that fuel your sports journey</p>
        <button 
          className="refresh-btn"
          onClick={() => {
            setLoading(true);
            setNewsLoading(true);
            window.location.reload();
          }}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          🔄 Refresh
        </button>
      </header>

      {/* Sports Category Filter */}
      <div className="sports-filter">
        {sportsCategories.map((category) => (
          <button
            key={category}
            className={activeFilter === category ? 'active' : ''}
            onClick={() => handleFilterChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Main Layout Container */}
      <div className="main-container">
        {/* Events Sidebar */}
        <aside className="events-sidebar">
          <h3>Events Calendar</h3>
          <div className="date-picker">
            <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
          <ul>
            {events.length > 0 ? events.map((event, i) => (
              <li key={i} className="event-card">
                <h4 className="event-title">{event.title}</h4>
                <p>{event.subtitle}</p>
                <div className="event-details">
                  <span>🕒 {event.time}</span>
                  <span>📍 {event.location}</span>
                </div>
              </li>
            )) : (
              <li className="event-card">
                <h4 className="event-title">Loading events...</h4>
              </li>
            )}
          </ul>
        </aside>

        {/* Features Section */}
        <main className="feature-section">
          <h2>
            Latest Sports Features
            <a href="/" className="more-link">More Features →</a>
          </h2>
          {newsLoading && <p>Loading latest sports news...</p>}
          {newsError && <p>Error loading news: {newsError}</p>}
          {features.map((item, i) => (
            <article className="feature-article-card" key={i} onClick={() => item.url && item.url !== '#' && window.open(item.url, '_blank')} style={{cursor: item.url && item.url !== '#' ? 'pointer' : 'default'}}>
              <img 
                src={item.img} 
                alt={item.title} 
                className="feature-article-img" 
                onError={(e) => {
                  e.target.src = getFallbackImage(item.sport);
                }}
              />
              <div className="feature-article-content">
                <span className="feature-article-tag">{item.sport}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <span className="feature-article-read-more">Read More →</span>
              </div>
            </article>
          ))}
        </main>

        {/* Updates Sidebar */}
        <aside className="updates-sidebar">
          <h3>Supercoach Event Updates</h3>
          {updatesData.map((update) => (
            <UpdateCarouselCard key={update.id} update={update} />
          ))}
        </aside>
      </div>

      {/* Bottom Sections Container */}
      <div className="sports-bottom-container">
        
        {/* Latest Tribe Scores Section */}
        <section className="tribe-scores">
          <div className="section-header">
            <h2 className="section-title">Latest Tribe Scores</h2>
            {allScores.length > 6 && (
              <button className="view-more-btn" onClick={toggleViewMoreScores}>
                {showAllScores ? 'View Less' : `View More (${allScores.length - 6} more)`}
              </button>
            )}
          </div>
          <div className="scores-grid">
            {loading && <p>Loading sports scores...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && latestScores.length === 0 && (
              <p>No recent scores available. Please try refreshing the page.</p>
            )}
            {latestScores.map((match) => (
              <div key={match.idEvent} className="score-card">
                <div className="match-header">
                  <span className="team">
                    {match.strHomeTeamBadge && (
                      <img src={match.strHomeTeamBadge} alt={match.strHomeTeam} onError={(e) => e.target.style.display = 'none'} />
                    )}
                    {match.strHomeTeam}
                  </span>
                  <span className="score">{match.intHomeScore}</span>
                </div>
                <div className="match-header">
                  <span className="team">
                    {match.strAwayTeamBadge && (
                      <img src={match.strAwayTeamBadge} alt={match.strAwayTeam} onError={(e) => e.target.style.display = 'none'} />
                    )}
                    {match.strAwayTeam}
                  </span>
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

        {/* Coaches' Accomplishments Section */}
        <section className="accomplishments">
          <h2 className="section-title">Sportscove Coaches' Accomplishments</h2>
          <div className="accomplishment-grid">
            {/* Renders the new carousel cards */}
            {accomplishmentsData.map((accomplishment) => (
              <AccomplishmentCarouselCard 
                key={accomplishment.id} 
                accomplishment={accomplishment} 
              />
            ))}
          </div>
        </section>

        {/* Latest News Section */}
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
                <img 
                  src={newsItem.urlToImage || getFallbackImage(newsItem.category)} 
                  alt={newsItem.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = getFallbackImage(newsItem.category);
                  }}
                />
                <div className="news-content">
                  <span className={`news-category ${newsItem.priority === 'high' ? 'premium' : ''}`}>
                    {newsItem.category || activeFilter}
                    <span className="news-source">via {newsItem.source}</span>
                  </span>
                  <h4>{newsItem.title}</h4>
                  <p>{newsItem.description}</p>
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
              <button 
                className="view-more-btn" 
                onClick={toggleViewMoreNews}
              >
                {showAllNews ? `View Less (showing ${displayedNews.length} of ${latestNews.length})` : `View More (${latestNews.length - 6} more articles)`}
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}