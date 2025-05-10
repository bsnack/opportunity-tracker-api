import React from 'react';
import { Clock, Edit, Trash } from 'lucide-react';
import { formatDate, isUpcoming } from '../../utils/dateHelpers';
import { getGradeColor } from '../../utils/styleHelpers';

const OpportunityItem = ({ 
  opportunity, 
  currentDate, 
  onEdit, 
  onDelete 
}) => {
  const { 
    id, 
    name, 
    link, 
    description, 
    category, 
    deadlineDate, 
    eligible_grades 
  } = opportunity;

  const upcomingDeadline = isUpcoming(deadlineDate, currentDate);

  return (
    <div className={`p-4 ${upcomingDeadline ? 'bg-yellow-50' : ''}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg font-semibold text-blue-600 hover:underline"
            >
              {name}
            </a>
            {eligible_grades && (
              <span className={`px-2 py-1 text-xs rounded-full ${getGradeColor(eligible_grades)}`}>
                {eligible_grades.length === 1 
                  ? `Grade ${eligible_grades[0]}` 
                  : `Grades ${eligible_grades.join(', ')}`}
              </span>
            )}
            <span className="inline-block px-2 py-1 bg-gray-100 text-xs rounded-full">
              {category}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{description}</p>
          {deadlineDate && (
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              <span>Deadline: {formatDate(deadlineDate)}</span>
              {upcomingDeadline && (
                <span className="ml-2 inline-block px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full">
                  Upcoming!
                </span>
              )}
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(id)}
            className="p-1 text-gray-400 hover:text-blue-500"
            aria-label="Edit opportunity"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(id)}
            className="p-1 text-gray-400 hover:text-red-500"
            aria-label="Delete opportunity"
          >
            <Trash className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpportunityItem;