import { useEffect, useReducer, useState, useMemo } from 'react'
import './App.css'
import AddReminderForm from './components/AddReminderForm'
import ReminderList from './components/ReminderList';
import FilterControls from './components/FilterControls';

const getInitialReminders = () => {
  const storedReminders = localStorage.getItem('reminders');
  return storedReminders ? JSON.parse(storedReminders) : [];
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_REMINDER':
     return [...state, action.payload]; 
    
    case 'DELETE_REMINDER': 
     return state.filter((reminder) => reminder.id !== action.payload);

    case 'TOGGLE_TAKEN':
     return state.map((reminder) => {
    
      if (reminder.id === action.payload) {
      return { ...reminder, taken: !reminder.taken }; 
    }
   
    return reminder;
  });

    default:
      return state; 
  }
};


function App() {
  const [reminders, dispatch] = useReducer(reducer, [], getInitialReminders);

  const [filterStatus, setFilterStatus] = useState ('all');

  const [sortOrder, setSortOrder] = useState ('asc');

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]); 

  const addReminder = (newReminder) => {
    dispatch({ type: 'ADD_REMINDER', payload: newReminder })
  };

const deleteReminder = (id) => {
  dispatch({type: 'DELETE_REMINDER', payload: id})
};

const toggleTaken = (id) => {
  dispatch({type: 'TOGGLE_TAKEN', payload: id})
};

const handleFilterChange = (status) => {
setFilterStatus(status)
};

const FilteredReminders = useMemo(() => {
  let filteredList;
  switch (filterStatus) {
      case 'taken':
          filteredList = reminders.filter(r => r.taken);
          break;
      case 'pending':
          filteredList = reminders.filter(r => !r.taken);
          break;
      case 'all':
      default:
          filteredList = reminders;
  }

  let sortedList = [...filteredList];

  sortedList.sort((a, b) => {
    
      if (sortOrder === 'asc') {
          return a.time.localeCompare(b.time); 
      } else {
          return b.time.localeCompare(a.time); 
      }
  });

  return sortedList;
}, [reminders, filterStatus, sortOrder]); 

const toggleSortOrder = () => {
  setSortOrder( prevOrder => prevOrder == 'asc' ? 'desc' : 'asc')
};


  return (
    <div className='App'>
      <h1>Напоминания о приёме лекарств</h1>
      <AddReminderForm onAddReminder={addReminder}/>
      <FilterControls 
      onFilterChange = {handleFilterChange}
      currentFilter = {filterStatus}
      onSortToggle = {toggleSortOrder}

      />
      {FilteredReminders.length > 0 ? (
        <ReminderList 
        reminders={FilteredReminders}
        onDeleteReminder={deleteReminder}
        onToggleTaken={toggleTaken}
        /> ) : (
          <p className='empty message'>Напоминаний пока нет. Добавьте первое, чтобы начать!</p>
        )}
      
    </div>
  )
}

export default App
