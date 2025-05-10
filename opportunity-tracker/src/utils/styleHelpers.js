/**
 * Get color class based on grade levels
 * @param {Array} grades - Array of grade levels
 * @returns {string} CSS class names for styling
 */
export const getGradeColor = (grades) => {
  if (!grades || !Array.isArray(grades)) {
    return 'bg-gray-100 text-gray-800';
  }

  // Grade 9 - Green
  if (grades.includes(9) && grades.length === 1) {
    return 'bg-green-100 text-green-800';
  }
  
  // Grade 10 - Blue
  if (grades.includes(10) && grades.length === 1) {
    return 'bg-blue-100 text-blue-800';
  }
  
  // Grade 11 - Purple
  if (grades.includes(11) && grades.length === 1) {
    return 'bg-purple-100 text-purple-800';
  }
  
  // Grade 12 - Red
  if (grades.includes(12) && grades.length === 1) {
    return 'bg-red-100 text-red-800';
  }
  
  // Multiple grades or other
  return 'bg-gray-100 text-gray-800';
};

/**
 * Get color class based on category
 * @param {string} category - The category name
 * @returns {string} CSS class names for styling
 */
export const getCategoryColor = (category) => {
  switch (category) {
    case 'Math':
      return 'bg-blue-100 text-blue-800';
    case 'Science':
      return 'bg-green-100 text-green-800';
    case 'Robotics & Coding':
      return 'bg-purple-100 text-purple-800';
    case 'Business & Writing':
      return 'bg-yellow-100 text-yellow-800';
    case 'Scholarships':
      return 'bg-red-100 text-red-800';
    case 'Internships':
      return 'bg-indigo-100 text-indigo-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

/**
 * Get background class for upcoming deadlines
 * @param {boolean} isUpcoming - Whether the deadline is upcoming
 * @returns {string} CSS class names for styling
 */
export const getDeadlineClass = (isUpcoming) => {
  return isUpcoming ? 'bg-yellow-50 border-yellow-200' : '';
};