import React from "react";
import ReminderItem from "./ReminderItem";

const ReminderList = ({ reminders }) => {
    return (
      <div>
        {reminders.map((reminder) => (
          <ReminderItem key={reminder.id} reminder={reminder} />
        ))}
      </div>
    );
  };

export default ReminderList;

