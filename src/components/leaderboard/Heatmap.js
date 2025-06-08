import React from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const Heatmap = ({ data, startDate, endDate }) => {
  // Generate a date range for the heatmap
  const generateDateRange = () => {
    const dates = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dates;
  };

  // Group dates by week for display
  const groupByWeek = (dates) => {
    const weeks = [];
    let week = [];
    
    dates.forEach((date, index) => {
      const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)
      
      // Start a new week on Sunday
      if (dayOfWeek === 0 && week.length > 0) {
        weeks.push([...week]);
        week = [];
      }
      
      week.push(date);
      
      // Push the last week if we're at the end
      if (index === dates.length - 1) {
        weeks.push(week);
      }
    });
    
    return weeks;
  };

  // Get the activity level for a specific date
  const getActivityLevel = (date) => {
    if (!data || !data.length) return 0;
    
    const dateStr = date.toISOString().split('T')[0];
    const activity = data.find(item => {
      const itemDate = new Date(item.date);
      return itemDate.toISOString().split('T')[0] === dateStr;
    });
    
    return activity ? Math.min(4, Math.floor(activity.count / 2)) : 0;
  };

  // Generate the heatmap data
  const dates = generateDateRange();
  const weeks = groupByWeek(dates);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Get unique months for the x-axis labels
  const uniqueMonths = [];
  const monthSet = new Set();
  
  dates.forEach(date => {
    const monthStr = `${date.getFullYear()}-${date.getMonth()}`;
    if (!monthSet.has(monthStr)) {
      monthSet.add(monthStr);
      uniqueMonths.push({
        month: date.getMonth(),
        year: date.getFullYear(),
        firstDay: new Date(date.getFullYear(), date.getMonth(), 1),
        lastDay: new Date(date.getFullYear(), date.getMonth() + 1, 0)
      });
    }
  });

  return (
    <div className="heatmap-container">
      <div className="heatmap-header">
        <div className="month-labels">
          {uniqueMonths.map((month, index) => {
            const monthStart = month.firstDay;
            const monthEnd = month.lastDay;
            const totalDays = monthEnd.getDate();
            const startWeek = Math.floor((monthStart.getDay() + monthStart.getDate() - 1) / 7);
            const endWeek = Math.floor((monthEnd.getDate() + monthStart.getDay()) / 7);
            const width = ((endWeek - startWeek + 1) / Math.ceil(dates.length / 7)) * 100;
            
            return (
              <div 
                key={`${month.year}-${month.month}`}
                className="month-label"
                style={{
                  width: `${width}%`,
                  left: `${(startWeek / Math.ceil(dates.length / 7)) * 100}%`
                }}
              >
                {monthNames[month.month]}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="heatmap-content">
        <div className="day-labels">
          {weekDays.map((day, index) => (
            <div key={index} className="day-label">
              {index % 2 === 0 ? day : ''}
            </div>
          ))}
        </div>
        
        <div className="heatmap-grid">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="heatmap-week">
              {week.map((date, dayIndex) => {
                const level = getActivityLevel(date);
                const dateStr = date.toISOString().split('T')[0];
                const tooltipId = `heatmap-cell-${weekIndex}-${dayIndex}`;
                
                return (
                  <React.Fragment key={dayIndex}>
                    <div
                      id={tooltipId}
                      className={`heatmap-cell level-${level}`}
                      data-tooltip-content={`${date.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}\n${level * 2 || 'No'} contributions`}
                    />
                    <Tooltip anchorId={tooltipId} place="top" effect="solid" />
                  </React.Fragment>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      <div className="heatmap-legend">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div key={level} className={`legend-block level-${level}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
};

export default Heatmap;
