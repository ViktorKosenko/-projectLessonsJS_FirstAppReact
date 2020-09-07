import React, { Component } from 'react';

import './post-status-filter.css';

export default class PostStatusFilter extends Component {
    constructor(props) {
        super(props);
        this.button = [
            {name: 'all', label: 'Все'},
            {name: 'like', label: 'Понравилось'},
            {name: 'important', label: 'Важные'}
        ]
    }
    
    render() {
        const buttons = this.button.map(({name, label}) => {
            const {filter, onFilterSelect} = this.props;

            const active = filter === name,
                clazz = active ? 'btn-info' : 'btn-outline-secondary';

            return (
            <button 
                key={name}
                type='button'
                className={`btn ${clazz}`}
                onClick={() => onFilterSelect(name)}>{label}</button>
            )
        });
        return (
            <div className="btn-group">
                {buttons}
            </div>
        )
    }
}