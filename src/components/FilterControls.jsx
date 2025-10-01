import React from "react";
import styles from './FilterControls.module.css'; 

function FilterControls ({currentFilter, onFilterChange, onSortToggle, sortOrder}) {

    const filters = [
        { label: 'Все', status: 'all' },
        { label: 'Невыполненные', status: 'pending' },
        { label: 'Выполненные', status: 'taken' },
    ];
    return(
        <div className={styles.controlsContainer}>
        
            <button 
                onClick={onSortToggle}
                className={styles.sortButton}
            >
                Время {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
            
            <div className={styles.filterButtons}>
                {filters.map(filter => (
                    <button
                        key={filter.status}
                        onClick={() => onFilterChange(filter.status)}
        
                        className={currentFilter === filter.status ? styles.activeFilter : ''} 
                    >
                        {filter.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default FilterControls;