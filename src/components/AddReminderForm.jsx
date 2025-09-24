import React,{useState} from "react";

function AddReminderForm ()  {
    const [name, setName] = useState ('');
    const [time, setTime] = useState ('09:00');

return (
    <form>
        <input 
type="text"
value={name}
onChange = {(e) => setName(e.target.value)}
placeholder="Название препората..."
 />

 <input 
type="time"
value={time}
onChange = {(e) => setTime(e.target.value)}
 />
<button type="sumbit">Добавить</button>
    </form>
);
}

export default AddReminderForm