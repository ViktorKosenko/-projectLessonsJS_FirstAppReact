import React from 'react';

import './search-panel.css';

const SearchPanel = () => {
    return (
        <input
            className="sorm-control search-input"
            type="text"
            placeholder="Поиск по записи"
        />
    )
}

export default SearchPanel;