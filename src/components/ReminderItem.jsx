import React from "react";

const ReminderItem = ({ reminder }) => {
    return(
        <div>
            <span>{reminder.name}</span>
            <span>{reminder.time}</span>
        </div>
    );
}

export default ReminderItem;