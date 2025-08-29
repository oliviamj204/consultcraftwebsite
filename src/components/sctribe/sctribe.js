import React, { useState } from "react";
import "./sctribe.css";
import { ChevronDown } from "lucide-react";
import { coaches } from "../../data/coachdata";
import CoachCard from "./coachcard";

export default function Sctribe() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [filters, setFilters] = useState({
    Sports: "",
    Wellness: "",
    Experience: "",
    Locations: "",
    CoachType: ""
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
    Sports: ["Boxing", "Wrestling", "MMA", "KickBoxing", "KungFu", "Muay Thai"],
    Wellness: ["Yoga", "Meditation", "Kundalini Activation"],
    Experience: ["2+ years", "3+ years", "5+ years", "10+ years", "15+ years", "22+ years"],
    Locations: ["USA", "Canada", "India", "Thailand", "UK", "UAE", "Cyprus"],
    CoachType: ["Super", "Regular"],
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

      // New data structure check
      if (coach.skills) {
        return Object.values(coach.skills).some(
          (skill) => skill.displayName === activeSkillFilter && skill.category === activeCategory
        );
      }
      
      // Fallback for old data structure
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

      <div className="sctribe-filter-bar">
        {Object.keys(dropdowns).map((category) => (
          <div key={category} className="filter-wrapper">
            <div
              className="filter-item"
              onClick={() => toggleDropdown(category)}
            >
              {filters[category] || category} <ChevronDown size={18} />
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