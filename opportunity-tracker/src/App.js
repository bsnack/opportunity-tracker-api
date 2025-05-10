import React, { useState, useEffect } from 'react';
import { Filter, Plus, X } from 'lucide-react';
import { initialOpportunities } from './data/opportunities';
import AddOpportunityModal from './components/AddOpportunityModal';
import ListView from './components/ListView';
import CalendarView from './components/CalendarView';
import FilterPanel from './components/FilterPanel';
import { formatDate, isUpcoming } from './utils/dateHelpers';
import { convertToCSV } from './utils/csvHelpers';

// Default categories
const defaultCategories = [
  "Math", 
  "Science", 
  "Robotics & Coding", 
  "Business & Writing", 
  "Scholarships", 
  "Internships",
  "Other"
];

// Default grades
const defaultGrades = [9, 10, 11, 12];

const App = () => {
  const [view, setView] = useState('list'); // 'list' or 'calendar'
  const [opportunities, setOpportunities] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filters, setFilters] = useState({
    category: [],
    grade: [],
    search: '',
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentDate] = useState(new Date());
  
  // Load initial data
  useEffect(() => {
    setOpportunities(initialOpportunities);
  }, []);

  // Helper to save data (simulating CSV storage)
  const saveData = (data) => {
    console.log("Saving data:", data);
    setOpportunities(data);
    
    // In a real app, you might want to download the CSV
    // or send it to a server
    const csvContent = convertToCSV(data);
    console.log("CSV content:", csvContent);
  };
  
  // Add a new opportunity
  const addOpportunity = (newOpportunity) => {
    const updatedOpportunities = [
      ...opportunities,
      { id: Date.now(), ...newOpportunity }
    ];
    saveData(updatedOpportunities);
    setShowAddModal(false);
  };
  
  // Update an existing opportunity
  const updateOpportunity = (id, updatedData) => {
    const updatedOpportunities = opportunities.map(item => 
      item.id === id ? { ...item, ...updatedData } : item
    );
    saveData(updatedOpportunities);
  };
  
  // Delete an opportunity
  const deleteOpportunity = (id) => {
    const updatedOpportunities = opportunities.filter(item => item.id !== id);
    saveData(updatedOpportunities);
  };
  
  // Filter opportunities based on current filters
  const filteredOpportunities = opportunities.filter(item => {
    // Category filter
    if (filters.category.length > 0 && !filters.category.includes(item.category)) {
      return false;
    }
    
    // Grade filter
    if (filters.grade.length > 0 && !item.eligible_grades?.some(grade => filters.grade.includes(grade))) {
      return false;
    }
    
    // Search filter
    if (filters.search && !item.name?.toLowerCase().includes(filters.search.toLowerCase()) && 
        !item.description?.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Sort by deadline (closest first)
  const sortedOpportunities = [...filteredOpportunities].sort((a, b) => {
    return new Date(a.deadlineDate || '2099-12-31') - new Date(b.deadlineDate || '2099-12-31');
  });
  
  // Group opportunities by month for calendar view
  const opportunitiesByMonth = sortedOpportunities.reduce((acc, item) => {
    if (!item.deadlineDate) return acc;
    const month = new Date(item.deadlineDate).getMonth();
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(item);
    return acc;
  }, {});
  
  // Toggle filter panel
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilters({
      category: [],
      grade: [],
      search: '',
    });
  };
  
  // Toggle a filter value
  const toggleFilterValue = (type, value) => {
    setFilters(prev => {
      const current = [...prev[type]];
      const index = current.indexOf(value);
      
      if (index === -1) {
        current.push(value);
      } else {
        current.splice(index, 1);
      }
      
      return {
        ...prev,
        [type]: current,
      };
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Opportunity Tracker</h1>
          <div className="flex space-x-4">
            <button 
              onClick={() => setView('list')} 
              className={`px-4 py-2 rounded-md ${view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              List View
            </button>
            <button 
              onClick={() => setView('calendar')} 
              className={`px-4 py-2 rounded-md ${view === 'calendar' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Calendar View
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Action Bar */}
        <div className="mb-6 flex flex-wrap gap-4 justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Opportunity
            </button>
            
            <button
              onClick={toggleFilter}
              className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>

            {isFilterOpen && (
              <button
                onClick={resetFilters}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                Reset Filters
              </button>
            )}
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="px-4 py-2 border rounded-md w-full sm:w-64"
            />
          </div>
        </div>
        
        {/* Filter Panel */}
        {isFilterOpen && (
          <FilterPanel 
            filters={filters}
            categories={defaultCategories}
            grades={defaultGrades}
            toggleFilterValue={toggleFilterValue}
          />
        )}
        
        {/* List or Calendar View based on selected view */}
        {view === 'list' ? (
          <ListView 
            opportunities={sortedOpportunities}
            currentDate={currentDate}
            updateOpportunity={updateOpportunity}
            deleteOpportunity={deleteOpportunity}
          />
        ) : (
          <CalendarView 
            opportunitiesByMonth={opportunitiesByMonth}
            currentDate={currentDate}
          />
        )}
        
        {/* Add Opportunity Modal */}
        {showAddModal && (
          <AddOpportunityModal
            onSubmit={addOpportunity}
            onCancel={() => setShowAddModal(false)}
            categories={defaultCategories}
            grades={defaultGrades}
          />
        )}
      </main>
    </div>
  );
};

export default App;