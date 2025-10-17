import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./insights.css";

// YouTube Live Component
function YouTubeLive() {
  const videoId = "m7q56YaTGzI";
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
    },

    { 
      name: 'Animish Dighe', 
      directory: 'animish', 
      displayName: 'Animish Dighe',
      photos: ['Animish Dighe - Muay Thai 3.JPG','Animish Dighe - Muay Thai 8.JPG','Animish Dighe - Muay Thai 11.JPG','Animish Dighe Profile Shot.png'],
      winnings: [
        'Animesh Dighe is one of India’s top Muay Thai and MMA athletes, holding multiple national and state titles.',
        'He is the World Muay Thai Council (WMC) National Champion (2024), the Kerala State Title Holder (2023), and the Maharashtra State Title Holder (2022).',
        'He represented India at the 2021 World Muay Thai Championship in Bangkok, Thailand, reaching the quarterfinals (Top 16) in the under-71 kg category.',
        'A 3× National Gold Medalist in Karate and Black Belt from the Shotokan School of Karate, he has also won State-level Gold in Brazilian Jiu-Jitsu (Maharashtra).',
        'He has represented Maharashtra in Muay Thai Nationals and competed at the state level in Boxing and Taekwondo.',
        'With a professional fight record of 10–2–0, he competes in the Middleweight (Muay Thai) and Lightweight (MMA) categories.',
        'Trained in Muay Thai, Boxing, Kickboxing, Wrestling, Brazilian Jiu-Jitsu, and Karate, Animesh embodies versatility and excellence in combat sports.',
        'His journey reflects discipline, adaptability, and a relentless pursuit of mastery across multiple martial arts.'
      ]
    }
  ];

  // Sort the data alphabetically by displayName
  peopleData.sort((a, b) => a.displayName.localeCompare(b.displayName));

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

  return (
    <div className="photo-gallery">
      <div className="gallery-container">
        <div className="gallery-tabs-grid">
          {peopleData.map((person) => (
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

// Main Insights Component
export default function Insights() {
  const [wellnessData, setWellnessData] = useState([]);
  const [activeWellnessTab, setActiveWellnessTab] = useState('Performance');
  const [wellnessLoading, setWellnessLoading] = useState(true);
  
  // State for coaches
  const [allCoachVideos, setAllCoachVideos] = useState({}); 
  const [videosLoadingStatus, setVideosLoadingStatus] = useState({}); 
  const [expandedCoach, setExpandedCoach] = useState('Animish Dighe');

  // Data for all coaches
  const coachesData = [
    { name: 'Animish Dighe', channelId: 'UCxl5QbYGSTCLZDcb1XxoW1A' },
    { name: 'Aditya Raj Sharma', channelId: 'UCNGvw7BkQJQqc4YTB-B_gqQ' },
    { name: 'Jitesh Banjan', channelId: 'UCUf-D9PfTquZylgBd4mU24Q' },
    { name: 'Abhishek Negi', channelId: 'UC4g2X4SjqWajcXbM7X2Xv_A' },
    { name: 'Ben Barry', channelId: 'UCITFEZjlt8aBLXuMMwFQFnQ' },
    { name: 'Sindhu Singh', channelId: 'UCiPmiHhI2a-S_joXVEaISEg' }
  ];

  const carouselSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    swipeToSlide: true,
    draggable: true,
    touchMove: true,
    swipe: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1, arrows: true }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1, arrows: true }
      }
    ]
  };

  const updatesCarouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    swipeToSlide: true,
  };

  const updates = [
    { img: "/asset/events/1.jpg" }, { img: "/asset/events/2.jpg" },
    { img: "/asset/events/3.jpg" }, { img: "/asset/events/4.jpg" },
    { img: "/asset/events/5.jpg" }
  ];

  // Function to fetch videos for a specific coach
  const fetchVideosForCoach = async (coach) => {
    try {
      setVideosLoadingStatus(prev => ({ ...prev, [coach.name]: true }));

      const CACHE_KEY = `coachVideos_cache_${coach.channelId}`;
      const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours

      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { videos, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_DURATION) {
          console.log(`Using cached videos for ${coach.name}`);
          setAllCoachVideos(prev => ({ ...prev, [coach.name]: videos }));
          return;
        }
      }

      const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
      if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY === 'YOUR_YOUTUBE_API_KEY_HERE') {
        console.error('YouTube API key is not configured!');
        setAllCoachVideos(prev => ({ ...prev, [coach.name]: [] }));
        return;
      }
      
      const url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${coach.channelId}&part=snippet,id&order=date&maxResults=50&type=video`;
      
      console.log(`Fetching videos for ${coach.name}...`);
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        console.error(`YouTube API Error for ${coach.name}:`, data.error);
        setAllCoachVideos(prev => ({ ...prev, [coach.name]: [] }));
      } else if (data.items) {
        const videos = data.items.map(item => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
          publishedAt: item.snippet.publishedAt,
          description: item.snippet.description
        }));
        
        setAllCoachVideos(prev => ({ ...prev, [coach.name]: videos }));
        
        localStorage.setItem(CACHE_KEY, JSON.stringify({ videos, timestamp: Date.now() }));
      }
    } catch (err) {
      console.error(`Error fetching videos for ${coach.name}:`, err);
      setAllCoachVideos(prev => ({ ...prev, [coach.name]: [] }));
    } finally {
      setVideosLoadingStatus(prev => ({ ...prev, [coach.name]: false }));
    }
  };
  
  useEffect(() => {
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
    fetchWellnessData();

    const defaultCoach = coachesData.find(c => c.name === expandedCoach);
    if (defaultCoach) {
      fetchVideosForCoach(defaultCoach);
    }
  }, []);

  const toggleCoach = (coachName) => {
    const newExpandedCoach = expandedCoach === coachName ? null : coachName;
    setExpandedCoach(newExpandedCoach);

    if (newExpandedCoach && !allCoachVideos[newExpandedCoach]) {
      const coachToFetch = coachesData.find(c => c.name === newExpandedCoach);
      if (coachToFetch) {
        fetchVideosForCoach(coachToFetch);
      }
    }
  };

  return (
    <div className="insights-page">
      <header className="header">
        <h1>SPORTS INSIGHTS</h1>
        <p>Insights that fuel your sports journey</p>
      </header>
      <div className="main-container">
        <main className="feature-section">
          <div className="youtube-updates-container">
            <div className="youtube-live-wrapper">
              <YouTubeLive />
            </div>
            <aside className="updates-sidebar">
              <h3>Supercoach Event Updates</h3>
              <Slider {...updatesCarouselSettings}>
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

          <section className="watch-coaches-section">
            <h2>Watch the Coaches</h2>
            
            {coachesData.map((coach) => {
              const isLoading = videosLoadingStatus[coach.name];
              const videos = allCoachVideos[coach.name] || [];

              return (
                <div className="coach-flap-container" key={coach.name}>
                  <div 
                    className={`coach-flap ${expandedCoach === coach.name ? 'expanded' : ''}`}
                    onClick={() => toggleCoach(coach.name)}
                  >
                    <span className="coach-flap-name">{coach.name}</span>
                    <span className="coach-flap-icon">{expandedCoach === coach.name ? '▼' : '▶'}</span>
                  </div>
                  
                  {expandedCoach === coach.name && (
                    <div className="coach-videos-wrapper">
                      {isLoading && <p className="loading-text">Loading videos for {coach.name}...</p>}
                      
                      {!isLoading && videos.length > 0 && (
                        <div className="coach-videos-scroll">
                          {videos.map((video) => (
                            <div key={video.id} className="video-card">
                              <a 
                                href={`https://www.youtube.com/watch?v=${video.id}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="video-thumbnail-link"
                              >
                                <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
                                <div className="play-button-overlay"><div className="play-icon">▶</div></div>
                              </a>
                              <div className="video-info">
                                <h4 className="video-title">{video.title}</h4>
                                <p className="video-date">
                                  {new Date(video.publishedAt).toLocaleDateString('en-US', { 
                                    year: 'numeric', month: 'short', day: 'numeric' 
                                  })}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {!isLoading && videos.length === 0 && (
                        <p className="no-videos-text">No videos available for {coach.name} at the moment.</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        </main>
      </div>
    </div>
  );
}