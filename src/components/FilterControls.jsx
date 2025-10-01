import React from "react"

function FilterControls ({currentFilter, onFilterChange, onSortToggle, sortOrder}) {

    return(
        <div className="filter-control">
            <button onClick={onSortToggle}>
            Сортировка по времени ({sortOrder === 'asc' ? '↑' : '↓'})
            </button>
            <button onClick={() => onFilterChange('all')}>все</button>
            <button onClick={() => onFilterChange('pending')}>Невыпольненные</button>
            <button onClick={() => onFilterChange('taken')}>Выполненные</button>
        </div>
    )

}


export default FilterControls;