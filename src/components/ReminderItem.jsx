import React, { useState } from "react";
import styles from './ReminderItem.module.css'; 

const ReminderItem = ({ reminder, onDeleteReminder, onToggleTaken}) => {

    const [isDeleting, setIsDeleting] = useState (false);
    
    const handleDelete = (e) => {
        e.stopPropagation(); 
        setIsDeleting(true); 
        
        setTimeout(() => {
            onDeleteReminder(reminder.id);
        }, 300); 
    };
    
    return(
        <div 
            className={`${isDeleting ? styles.isDeleting : ''} ${reminder.taken ? styles.itemCompleted : styles.item}`} 
            onClick={() => onToggleTaken(reminder.id)}
        >
            <span>{reminder.name}</span>
            <span>{reminder.time}</span>

            <button onClick={handleDelete} 
                className={styles.deleteButton}>
                Удалить
            </button>
        </div>
    );
}

export default ReminderItem;