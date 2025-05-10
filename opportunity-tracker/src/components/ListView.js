import React, { useState } from 'react';
import { Clock, Edit, Trash } from 'lucide-react';
import { formatDate, isUpcoming } from '../utils/dateHelpers';
import { getGradeColor } from '../utils/styleHelpers';

const ListView = ({ opportunities, currentDate, updateOpportunity, deleteOpportunity }) => {
  const [editingId, setEditingId] = useState(null);

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      {opportunities.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {opportunities.map(item => (
            <div key={item.id} className={`p-4 ${isUpcoming(item.deadlineDate, currentDate) ? 'bg-yellow-50' : ''}`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-blue-600 hover:underline"
                    >
                      {item.name}
                    </a>
                    {item.eligible_grades && (
                      <span className={`px-2 py-1 text-xs rounded-full ${getGradeColor(item.eligible_grades)}`}>
                        {item.eligible_grades.length === 1 
                          ? `Grade ${item.eligible_grades[0]}` 
                          : `Grades ${item.eligible_grades.join(', ')}`}
                      </span>
                    )}
                    <span className="inline-block px-2 py-1 bg-gray-100 text-xs rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  {item.deadlineDate && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>Deadline: {formatDate(item.deadlineDate)}</span>
                      {isUpcoming(item.deadlineDate, currentDate) && (
                        <span className="ml-2 inline-block px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full">
                          Upcoming!
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingId(item.id)}
                    className="p-1 text-gray-400 hover:text-blue-500"
                    aria-label="Edit opportunity"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteOpportunity(item.id)}
                    className="p-1 text-gray-400 hover:text-red-500"
                    aria-label="Delete opportunity"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Edit Form - conditionally rendered */}
              {editingId === item.id && (
                <EditOpportunityForm 
                  opportunity={item}
                  onSave={(updatedData) => {
                    updateOpportunity(item.id, updatedData);
                    setEditingId(null);
                  }}
                  onCancel={() => setEditingId(null)}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center text-gray-500">
          No opportunities found. Add some or adjust your filters.
        </div>
      )}
    </div>
  );
};

const EditOpportunityForm = ({ opportunity, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...opportunity });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleGrade = (grade) => {
    const currentGrades = [...formData.eligible_grades];
    const index = currentGrades.indexOf(grade);
    
    if (index === -1) {
      currentGrades.push(grade);
    } else {
      currentGrades.splice(index, 1);
    }
    
    setFormData(prev => ({
      ...prev,
      eligible_grades: currentGrades
    }));
  };

  return (
    <div className="mt-4 p-4 border rounded-md bg-gray-50">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={`edit-name-${opportunity.id}`}>Name</label>
        <input
          id={`edit-name-${opportunity.id}`}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={`edit-category-${opportunity.id}`}>Category</label>
        <select
          id={`edit-category-${opportunity.id}`}
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="Robotics & Coding">Robotics & Coding</option>
          <option value="Business & Writing">Business & Writing</option>
          <option value="Scholarships">Scholarships</option>
          <option value="Internships">Internships</option>
          <option value="Other">Other</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={`edit-deadline-${opportunity.id}`}>Deadline</label>
          <input
            id={`edit-deadline-${opportunity.id}`}
            type="date"
            name="deadlineDate"
            value={formData.deadlineDate || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={`edit-start-${opportunity.id}`}>Start Date</label>
          <input
            id={`edit-start-${opportunity.id}`}
            type="date"
            name="startDate"
            value={formData.startDate || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={`edit-end-${opportunity.id}`}>End Date</label>
          <input
            id={`edit-end-${opportunity.id}`}
            type="date"
            name="endDate"
            value={formData.endDate || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={`edit-link-${opportunity.id}`}>Link</label>
        <input
          id={`edit-link-${opportunity.id}`}
          type="url"
          name="link"
          value={formData.link || ''}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={`edit-desc-${opportunity.id}`}>Description</label>
        <input
          id={`edit-desc-${opportunity.id}`}
          type="text"
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Eligible Grades</label>
        <div className="flex flex-wrap gap-2">
          {[9, 10, 11, 12].map(grade => {
            const isSelected = formData.eligible_grades?.includes(grade);
            return (
              <button
                key={grade}
                type="button"
                onClick={() => toggleGrade(grade)}
                className={`px-3 py-1 rounded-md text-sm ${
                  isSelected
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                Grade {grade}
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 mr-2"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(formData)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};
// In your ListView component, add:

export default ListView;