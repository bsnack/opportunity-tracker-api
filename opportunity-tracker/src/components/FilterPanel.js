import React from 'react';

const FilterPanel = ({ filters, categories, grades, toggleFilterValue }) => {
  return (
    <div className="mb-6 bg-white p-4 rounded-md shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium text-gray-700 mb-2">Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => toggleFilterValue('category', category)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.category.includes(category)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-700 mb-2">Grade</h3>
          <div className="flex flex-wrap gap-2">
            {grades.map(grade => (
              <button
                key={grade}
                onClick={() => toggleFilterValue('grade', grade)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.grade.includes(grade)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                Grade {grade}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;