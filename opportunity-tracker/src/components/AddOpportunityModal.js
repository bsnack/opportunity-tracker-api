import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddOpportunityModal = ({ onSubmit, onCancel, categories, grades }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Math',
    deadlineDate: '',
    startDate: '',
    endDate: '',
    link: '',
    description: '',
    eligible_grades: [],
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const toggleGrade = (grade) => {
    const grades = [...formData.eligible_grades];
    const index = grades.indexOf(grade);
    
    if (index === -1) {
      grades.push(grade);
    } else {
      grades.splice(index, 1);
    }
    
    setFormData({
      ...formData,
      eligible_grades: grades,
    });
  };
  
  const handleSubmit = () => {
    // Validate form data
    if (!formData.name || !formData.category) {
      alert('Name and category are required!');
      return;
    }
    
    onSubmit(formData);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl p-6 max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Opportunity</h2>
          <button 
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="new-name">Name</label>
            <input
              id="new-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Opportunity name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="new-category">Category</label>
            <select
              id="new-category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="new-deadline">Deadline Date</label>
              <input
                id="new-deadline"
                type="date"
                name="deadlineDate"
                value={formData.deadlineDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="new-start">Start Date</label>
              <input
                id="new-start"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="new-end">End Date</label>
              <input
                id="new-end"
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="new-link">Link</label>
            <input
              id="new-link"
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="https://example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="new-description">Description</label>
            <textarea
              id="new-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Brief description of the opportunity"
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Eligible Grades</label>
            <div className="flex flex-wrap gap-2">
              {grades.map(grade => (
                <button
                  key={grade}
                  type="button"
                  onClick={() => toggleGrade(grade)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    formData.eligible_grades.includes(grade) 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Grade {grade}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Opportunity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOpportunityModal;