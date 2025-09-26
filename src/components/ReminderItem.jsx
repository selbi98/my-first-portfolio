import React from "react";
import styles from './ReminderItem.module.css'; 

const ReminderItem = ({ reminder, onDeleteReminder, onToggleTaken}) => {
    return(
        <div className={reminder.taken ? styles.itemCompleted : styles.item} 
        onClick={() => onToggleTaken(reminder.id)}>
            <span>{reminder.name}</span>
            <span>{reminder.time}</span>
            <button onClick={(e) => { 
                    e.stopPropagation(); 
                    onDeleteReminder(reminder.id);
                }} 
                className={styles.deleteButton}>Удалить</button>
        </div>
    );
}

export default ReminderItem;