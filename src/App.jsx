import { useEffect, useReducer } from 'react'
import './App.css'
import AddReminderForm from './components/AddReminderForm'
import ReminderList from './components/ReminderList';

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

  return (
    <div className='App'>
      <h1>Напоминания о приёме лекарств</h1>
      <AddReminderForm onAddReminder={addReminder}/>
      {reminders.length > 0 ? (
        <ReminderList 
        reminders={reminders}
        onDeleteReminder={deleteReminder}
        onToggleTaken={toggleTaken}
        /> ) : (
          <p className='empty message'>Напоминаний пока нет. Добавьте первое, чтобы начать!</p>
        )}
      
    </div>
  )
}

export default App
