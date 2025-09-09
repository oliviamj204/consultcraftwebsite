import React from "react";
import { Link } from "react-router-dom";
import "./coachcard.css";

export default function CoachCard({ coachId, coach, activeFilters }) {

  const getDefaultLink = () => {
    if (coach.skills) {
      const firstSkillKey = Object.keys(coach.skills)[0];
      return `/coaches/${coachId}/${firstSkillKey}`;
    }
    // Fallback for old data structure
    return `/supercoaches/${coachId}`;
  };

  return (
    <div className="coach-card">
      <img src={coach.thumbnail} alt={coach.name} className="coach-image" />

      <div className="coach-info">
        <div className="coach-meta">
          {/* Check if coach data is in the NEW format */}
          {coach.skills ? (
            // Render advanced, clickable tags
            Object.entries(coach.skills)
              .filter(([skillKey, skillData]) => {
                const activeSkillFilter = activeFilters.Sports || activeFilters.Wellness;
                if (!activeSkillFilter) return true;
                return skillData.displayName === activeSkillFilter;
              })
              .map(([skillKey, skillData]) => (
                <React.Fragment key={skillKey}>
                  <Link to={`/coaches/${coachId}/${skillKey}`} className="tag-link">
                    {skillData.displayName}
                  </Link>
                  <span className="tag">{skillData.experience}</span>
                </React.Fragment>
              ))
          ) : (
            // FALLBACK: Render simple tags for OLD data format
            <>
              {coach.Sports && <span className="tag">{coach.Sports}</span>}
              {coach.Wellness && <span className="tag">{coach.Wellness}</span>}
              {coach.Experience && <span className="tag">{coach.Experience}</span>}
            </>
          )}

          {/* Common tags displayed for all coaches */}
          <span className="tag">{coach.Location}</span>
          <span className="tag">{coach.CoachType}</span>
        </div>

        <h2 className="coach-name">{coach.name}</h2>

        <Link to={getDefaultLink()} className="see-story-btn">
          See Story ↗
        </Link>
      </div>
    </div>
  );
}