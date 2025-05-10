import React from 'react';
import { Clock } from 'lucide-react';
import { formatDate, isUpcoming } from '../utils/dateHelpers';
import { getGradeColor } from '../utils/styleHelpers';

// Month names for calendar view
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const CalendarView = ({ opportunitiesByMonth, currentDate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {monthNames.map((month, index) => (
        <div key={month} className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b font-medium">
            {month}
          </div>
          <div className="p-4">
            {opportunitiesByMonth[index] && opportunitiesByMonth[index].length > 0 ? (
              <div className="space-y-3">
                {opportunitiesByMonth[index].map(item => (
                  <div 
                    key={item.id} 
                    className={`p-2 border rounded hover:bg-gray-50 ${
                      isUpcoming(item.deadlineDate, currentDate) ? 'border-yellow-300 bg-yellow-50' : ''
                    }`}
                  >
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      {item.name}
                    </a>
                    <div className="text-xs text-gray-600 mt-1 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatDate(item.deadlineDate)}
                      {isUpcoming(item.deadlineDate, currentDate) && (
                        <span className="ml-1 inline-block px-1.5 py-0.5 bg-red-100 text-red-800 text-xs rounded-full">
                          Soon!
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap mt-1 gap-1">
                      {item.eligible_grades && (
                        <span className={`px-1.5 py-0.5 text-xs rounded-full ${getGradeColor(item.eligible_grades)}`}>
                          Gr. {item.eligible_grades.join(', ')}
                        </span>
                      )}
                      <span className="px-1.5 py-0.5 bg-gray-100 text-xs rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500 text-center py-4">
                No opportunities
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalendarView;