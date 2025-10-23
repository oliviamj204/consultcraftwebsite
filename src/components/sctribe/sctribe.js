import React, { useState } from "react";
import "./sctribe.css";
import { ChevronDown } from "lucide-react";
import { coaches } from "../../data/coachdata";
import CoachCard from "./coachcard";
import anthemVideo from "./Every minute v.1 .mp4";

export default function Sctribe() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [filters, setFilters] = useState({
    Sports: "",
    Wellness: "",
    Experience: "",
    Locations: "",
    CoachType: "" // The state key remains 'CoachType' for logic
  });

  const clearFilters = () => {
    setFilters({
      Sports: "",
      Wellness: "",
      Experience: "",
      Locations: "",
      CoachType: ""
    });
    setOpenDropdown(null);
  };

  const dropdowns = {
    Sports: ["Boxing", "Kickboxing", "Kung Fu", "MMA", "Muay Thai", "Wrestling"],
    Wellness: ["Kundalini Activation", "Meditation", "Yoga"],
    // START CHANGE 1: The experience array is now sorted numerically.
    Experience: ["2+ years", "3+ years", "5+ years", "10+ years", "15+ years", "22+ years"].sort(
        (a, b) => parseInt(a) - parseInt(b)
    ),
    // END CHANGE 1
    Locations: ["Canada", "Cyprus", "India", "Thailand", "UAE", "UK", "USA"],
    CoachType: ["Regular", "Super"], // The key remains 'CoachType'
  };

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const selectFilter = (category, value) => {
    if (category === "Sports") {
      setFilters({ ...filters, Sports: value, Wellness: "" });
    } else if (category === "Wellness") {
      setFilters({ ...filters, Sports: "", Wellness: value });
    } else {
      setFilters({ ...filters, [category]: value });
    }
    setOpenDropdown(null);
  };

  const coachArray = Object.entries(coaches).map(([id, data]) => ({
    id,
    ...data
  }));

  const filteredCoaches = coachArray.filter((coach) => {
    const activeSkillFilter = filters.Sports || filters.Wellness;
    const activeCategory = filters.Sports ? "Sports" : "Wellness";

    const matchesSkill = () => {
      if (!activeSkillFilter) return true;
      if (coach.skills) {
        return Object.values(coach.skills).some(
          (skill) => skill.displayName === activeSkillFilter && skill.category === activeCategory
        );
      }
      if (filters.Sports) return coach.Sports === filters.Sports;
      if (filters.Wellness) return coach.Wellness === filters.Wellness;
      return false;
    };
    
    const hasExperience = () => {
        if (!filters.Experience) return true;
        const selectedExp = parseInt(filters.Experience);
        const coachExp = parseInt(coach.Experience || "0"); 
        return coachExp >= selectedExp;
    };

    return (
      coach.thumbnail &&
      matchesSkill() &&
      hasExperience() &&
      (!filters.Locations || coach.Location === filters.Locations) &&
      (!filters.CoachType || coach.CoachType === filters.CoachType)
    );
  });

  return (
    <div className="sctribe-container">
      <h1 className="sctribe-header">SPORTSCOVE TRIBE</h1>
      <p className="sctribe-title">Meet the Tribe. Find your Coach</p>

      {/* START: Tribe Anthem Section */}
      <div className="tribe-anthem-section">
        <h2 className="anthem-headline">A CHAMPION'S MINDSET</h2>
        <p className="anthem-attribution">— Tanner Smith, VP SportsCove</p>
        <div className="video-responsive-wrapper">
          <video
            controls
            width="100%"
            autoPlay
            muted
            loop
            playsInline
          >
            {/* STEP 2: Use the imported variable as the source */}
            <source src={anthemVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        {/* START: Add this new credits block */}
        <div className="video-credits">
            <p>
            Video: Tanner Smith, Edit: <a href="https://www.instagram.com/jerrowmathullah/" target="_blank" rel="noopener noreferrer">Jerrow</a>
            </p>
            <p>Location Credits: Title Boxing Club, Greenwood, Seattle</p>
        </div>
        {/* END: Add this new credits block */}
      </div>
      {/* END: Tribe Anthem Section */}

      {/* START: MOVED FILTER BAR */}
      <div className="sctribe-filter-bar">
        {Object.keys(dropdowns).map((category) => (
          <div key={category} className="filter-wrapper">
            <div
              className="filter-item"
              onClick={() => toggleDropdown(category)}
            >
              {/* START CHANGE 2: Display "Coach Type" with a space for the UI, but use "CoachType" for logic. */}
              {filters[category] || (category === 'CoachType' ? 'Coach Type' : category)}{' '}
              {/* END CHANGE 2 */}
              <ChevronDown size={18} />
            </div>
            {openDropdown === category && (
              <div className="dropdown-menu">
                {dropdowns[category].map((item) => (
                  <div
                    className="dropdown-item"
                    key={item}
                    onClick={() => selectFilter(category, item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <button className="clear-filters" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>
      {/* END: MOVED FILTER BAR */}

      <div className="coach-grid">
        {filteredCoaches.length > 0 ? (
          filteredCoaches.map((coach) => (
            <CoachCard
              key={coach.id}
              coachId={coach.id}
              coach={coach}
              activeFilters={filters}
            />
          ))
        ) : (
          <div className="no-coaches">
            <h2>No coaches match the selected filters</h2>
            <p>Try adjusting your filters to explore more coaches.</p>
          </div>
        )}
      </div>
    </div>
  );
}