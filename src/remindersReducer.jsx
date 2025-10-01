export const getInitialState = () => {
    const storedReminders = localStorage.getItem('reminders');
    const reminders = storedReminders ? JSON.parse(storedReminders) : [];

    return {
        reminders,
        filterStatus: 'all', 
        sortOrder: 'asc',    
    };
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_REMINDER':
            return {
                ...state,
                reminders: [...state.reminders, action.payload]
            }; 
        
        case 'DELETE_REMINDER': 
            return {
                ...state,
                reminders: state.reminders.filter((reminder) => reminder.id !== action.payload)
            };

        case 'TOGGLE_TAKEN':
            return {
                ...state,
                reminders: state.reminders.map((reminder) => {
                    if (reminder.id === action.payload) {
                        return { ...reminder, taken: !reminder.taken }; 
                    }
                    return reminder;
                })
            };

        case 'SET_FILTER':
            return {
                ...state,
                filterStatus: action.payload
            };

        case 'TOGGLE_SORT':
            return {
                ...state,
                sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc'
            };

        default:
            return state; 
    }
};