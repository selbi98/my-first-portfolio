import { useEffect, useReducer, useMemo } from 'react';
import './App.css';
import { reducer, getInitialState } from './remindersReducer';
import AddReminderForm from './components/AddReminderForm';
import ReminderList from './components/ReminderList';
import FilterControls from './components/FilterControls';


function App() {
    const [state, dispatch] = useReducer(reducer, null, getInitialState);
    const { reminders, filterStatus, sortOrder } = state;

    useEffect(() => {
        localStorage.setItem('reminders', JSON.stringify(reminders));
    }, [reminders]); 

    const addReminder = (newReminder) => {
        dispatch({ type: 'ADD_REMINDER', payload: newReminder });
    };

    const deleteReminder = (id) => {
        dispatch({ type: 'DELETE_REMINDER', payload: id });
    };

    const toggleTaken = (id) => {
        dispatch({ type: 'TOGGLE_TAKEN', payload: id });
    };

    const handleFilterChange = (status) => {
        dispatch({ type: 'SET_FILTER', payload: status });
    };

    const toggleSortOrder = () => {
        dispatch({ type: 'TOGGLE_SORT' });
    };

    const filteredAndSortedReminders = useMemo(() => {
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


    return (
        <div className='App'>
            <h1>Напоминания о приёме лекарств</h1>
            <AddReminderForm onAddReminder={addReminder}/>
            <FilterControls 
                onFilterChange={handleFilterChange}
                currentFilter={filterStatus}
                onSortToggle={toggleSortOrder}
                sortOrder={sortOrder} 
            />
            {filteredAndSortedReminders.length > 0 ? (
                <ReminderList 
                    reminders={filteredAndSortedReminders}
                    onDeleteReminder={deleteReminder}
                    onToggleTaken={toggleTaken}
                /> 
            ) : (
                <p className='empty message'>Напоминаний пока нет. Добавьте первое, чтобы начать!</p>
            )}
        </div>
    );
}

export default App;