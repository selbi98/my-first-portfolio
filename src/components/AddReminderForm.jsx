import React,{useState} from "react";
import styles from './AddReminderForm.module.css'

function AddReminderForm ({onAddReminder})  {
    const [name, setName] = useState ('');
    const [time, setTime] = useState ('09:00');

    const handleSubmit = (e) => {
        e.preventDefault()
    
        const trimmedName = name.trim(); 
    
        if (!trimmedName) { 
            alert('Пожалуйста, введите название препарата.'); 
            return; 
        }
        
        const newReminder = {
            id: Date.now(),
            name: trimmedName, 
            time,
            taken: false,
        };
        
        onAddReminder(newReminder);

        setName('');
        setTime('09:00');
    }

return (
    <form onSubmit={handleSubmit} className={styles.form}>
        <input 
type="text"
value={name}
onChange = {(e) => setName(e.target.value)}
placeholder="Название препората..."
required
className={styles.formName}
 />

 <input 
type="time"
value={time}
onChange = {(e) => setTime(e.target.value)}
required
className={styles.formTime}
 />
<button type="submit" className={styles.formButton}>Добавить</button>
    </form>
);
}

export default AddReminderForm