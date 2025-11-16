import React from "react";
import techIcons from "../techIcons.json";

export default function ScrollingIcons() {
  // Get all icon entries
  const iconEntries = Object.entries(techIcons);
  
  // Split icons into two rows
  const midPoint = Math.ceil(iconEntries.length / 2);
  const row1Icons = iconEntries.slice(0, midPoint);
  const row2Icons = iconEntries.slice(midPoint);

  // Helper function to render icon elements
  const renderIcon = ([filename, data]: [string, { name: string; category: string }], index: number) => (
    <div key={`${filename}-${index}`} className="tech-icon">
      <img 
        src={`/tech_icons/${filename}`}
        width={40}
        height={40}
        alt={data.name}
      />
      <span>{data.name}</span>
    </div>
  );

  return (
    <div className="scrolling-icons-container">
      {/* First row - scrolls left to right */}
      <div className="scrolling-row scroll-left-to-right">
        <div className="scrolling-content">
          {row1Icons.map(renderIcon)}
          {/* Duplicate for seamless loop */}
          {row1Icons.map((entry, index) => renderIcon(entry, index + row1Icons.length))}
        </div>
      </div>

      {/* Second row - scrolls right to left */}
      <div className="scrolling-row scroll-right-to-left">
        <div className="scrolling-content">
          {row2Icons.map(renderIcon)}
          {/* Duplicate for seamless loop */}
          {row2Icons.map((entry, index) => renderIcon(entry, index + row2Icons.length))}
        </div>
      </div>
    </div>
  );
}
