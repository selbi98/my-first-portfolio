import React from "react";
import ReminderItem from "./ReminderItem";

const ReminderList = ({ reminders, onDeleteReminder, onToggleTaken}) => {
    return (
      <div className="reminder-list"> 
        {reminders.map((reminder) => (
          <ReminderItem 
          key={reminder.id} 
          reminder={reminder}
          onDeleteReminder={onDeleteReminder}
          onToggleTaken={onToggleTaken}
          />
        ))}
      </div>
    );
  };

export default ReminderList;