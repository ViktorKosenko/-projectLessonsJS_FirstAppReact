import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css';
import styled from 'styled-components';
//import style from './App.module.css';

const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px;
`

// const StyledAppBlock = styled(AppBlock)`
//     background-color: grey;
// `

const toggleState = (data, id, state) => {
    const index = data.findIndex(elem => elem.id === id),
        newItem = {...data[index]};

    for (let key in newItem) {
        if (key === state) {
            newItem[key] = !newItem[key];
        }
    }
    
    const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

    return newArr
}

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { label: 'Going to lealrn React', important: false, like: false, id: 1 },
                { label: 'That is so good', important: true, like: true, id: 2 },
                { label: 'I need a break...', important: false, like: false, id: 3 }
            ],
            term: '',
            filter: 'all'
        };
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id),
                newArr = [...data.slice(0, index), ...data.slice(index + 1)];

            return {
                data: newArr
            }
        })
    }

    addItem = (body) => {
        const newItem = {
            label: body,
            important: false,
            like: false,
            id: this.maxId++
        }
        this.setState(({ data }) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    onToggleImportant = (id) => {
        this.setState(({ data }) => {
            return {
                data: toggleState(data, id, "important")
            }
        })
  
    }

    onToggleLiked = (id) => {
        this.setState(({ data }) => {
            return {
                data: toggleState(data, id, "like")
            }
        })
    }

    searchPost = (items, term) => {
        if (term === 0) {
            return items
        }

        return items.filter( (item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
        });
    }

    filterPost(items, filter) {
        switch (filter) {
            case 'like': 
                return items.filter(item => item.like);
            case 'important':
                return items.filter(item => item.important);
            default: 
                return items;
        }
    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }

    onFilterSelect = (filter) => {
        this.setState({filter})
    }

    render() {
        const {data, term, filter} = this.state;

        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return (
            <AppBlock>
                <AppHeader
                    liked={liked}
                    allPosts={allPosts} />
                <div className="search-panel d-flex">
                    <SearchPanel 
                        onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}/>
                </div>
                <PostList
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLiked={this.onToggleLiked} />
                <PostAddForm
                    onAdd={this.addItem} />
            </AppBlock>
        )
    }
}