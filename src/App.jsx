import { useState, useEffect } from 'react'
import './App.css'
import AddReminderForm from './components/AddReminderForm'
import ReminderList from './components/ReminderList';

const getInitialReminders = () => {
  const storedReminders = localStorage.getItem('reminders');
  return storedReminders ? JSON.parse(storedReminders) : [];
};

function App() {
  const [reminders, setReminders] = useState(getInitialReminders);

  const addReminder = (newReminder) => {
    setReminders([...reminders, newReminder])
  };

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]); 

  return (
    <div className='App'>
      <h1>Напоминания о приёме лекарств</h1>
      <AddReminderForm onAddReminder={addReminder}/>
      <ReminderList reminders={reminders}/>
    </div>
  )
}

export default App
