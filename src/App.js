import React, { Component } from 'react';
import TodoInput from './component/Todoinput';
import TodoList from './component/TodoList';

import 'bootstrap/dist/css/bootstrap.min.css';
import uuid from 'uuid';

class App extends Component {
  state = {
    items: [],
    id: uuid(),
    item: '',
    editItem: false,
    isEmpty: true
  };

  handleChange = e => {
    if (e.target.value.length > 0) {
      this.setState({
        item: e.target.value,
        isEmpty: false
      });
    } else {
      this.setState({
        item: e.target.value,
        isEmpty: true
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const newItem = {
      id: this.state.id,
      title: this.state.item
    };

    const updatedItem = [...this.state.items, newItem];

    this.setState({
      items: updatedItem,
      item: '',
      id: uuid(),
      editItem: false,
      isEmpty: true
    });
  };

  clearList = () => {
    this.setState({
      items: []
    });
  };

  handleDelete = id => {
    const filteredDelete = this.state.items.filter(item => item.id !== id);

    this.setState({
      items: filteredDelete
    });
  };

  handleEdit = id => {
    const filteredDelete = this.state.items.filter(item => item.id !== id);

    const selectItem = this.state.items.find(item => item.id === id);

    this.setState({
      items: filteredDelete,
      item: selectItem.title,
      id,
      editItem: true,
      isEmpty: false
    });
  };

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-10 mx-auto col-md-8 mt-4'>
            <h3 className='text-capitalize text-center'>todo input</h3>
            <TodoInput
              item={this.state.item}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              editItem={this.state.editItem}
              isEmpty={this.state.isEmpty}
            />
            <TodoList
              items={this.state.items}
              clearList={this.clearList}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
