/**
 * Format a date string for display
 * @param {string} dateString - The date string to format
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

/**
 * Check if a deadline is upcoming (within 30 days)
 * @param {string} deadlineDate - The deadline date string
 * @param {Date} currentDate - The current date
 * @returns {boolean} True if the deadline is upcoming
 */
export const isUpcoming = (deadlineDate, currentDate) => {
  if (!deadlineDate) return false;
  
  const deadline = new Date(deadlineDate);
  const diffTime = deadline - currentDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays >= 0 && diffDays <= 30;
};

/**
 * Sort opportunities by their deadline
 * @param {Array} opportunities - The opportunities to sort
 * @returns {Array} Sorted opportunities
 */
export const sortByDeadline = (opportunities) => {
  return [...opportunities].sort((a, b) => {
    // Handle null or undefined deadlines
    if (!a.deadlineDate && !b.deadlineDate) return 0;
    if (!a.deadlineDate) return 1;
    if (!b.deadlineDate) return -1;
    
    // Sort by date
    return new Date(a.deadlineDate) - new Date(b.deadlineDate);
  });
};

/**
 * Group opportunities by month based on their deadline
 * @param {Array} opportunities - The opportunities to group
 * @returns {Object} Opportunities grouped by month
 */
export const groupByMonth = (opportunities) => {
  return opportunities.reduce((acc, item) => {
    if (!item.deadlineDate) return acc;
    
    const month = new Date(item.deadlineDate).getMonth();
    if (!acc[month]) {
      acc[month] = [];
    }
    
    acc[month].push(item);
    return acc;
  }, {});
};