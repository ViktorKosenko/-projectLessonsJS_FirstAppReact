import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css';

const App = () => {

    const data = [
        {label: 'Going to lealrn React', important: false, id: 'qw1'},
        {label: 'That is so good', important: true, like: true, id: 'qw2'},
        {label: 'I need a break...', important: false, id: 'qw3'}, {}
    ]

    return (
        <div className="app">
            <AppHeader/>
            <div className="search-panel d-flex">
                <SearchPanel/>
                <PostStatusFilter/>                
            </div>
            <PostList posts={data} />
            <PostAddForm/>
        </div>
        )
}

export default App;