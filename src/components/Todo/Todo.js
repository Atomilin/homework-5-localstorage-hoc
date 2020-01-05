import React, { PureComponent } from 'react';
import Card from '../Card';
import './Todo.css';
import withLocalstorage from '../../HOCs/withLocalstorage';

class Todo extends PureComponent {
  state = {
    inputValue: '',
  };

  getDataRecord = (id, name, status) => {
    return {
        id: id,
        name: name,
        status: status
    }
  };

  getId() {
    const {savedData} = this.props;
    const biggest = savedData.reduce((acc, el) => Math.max(acc, el.id), 0);
    return biggest + 1;
  }

  handleChange = event => {
    this.setState({
        inputValue: event.target.value
    })
  };

  createNewRecordByEnter = event => {
    event.preventDefault();
    this.createNewRecord();
  };

  toggleRecordComplete = event => {
    const {updateData, savedData} = this.props;
    const
        idRecord = event.target.dataset.todoId,
        newtStatus = event.target.dataset.todoStatus === 'false' ? true : false,
        indexRecord = savedData.findIndex((record) => String(record.id) == idRecord);
        savedData[indexRecord].status = newtStatus;
        updateData(savedData);
    };

    createNewRecord = () => {
      const {updateData, savedData} = this.props;

      const newRecord = this.getDataRecord(this.getId(), this.state.inputValue, false);

      this.setState({
          inputValue: ''
      });

      updateData([...savedData, newRecord]);

  };

  render() {
      return (
          <Card title={'Cписок дел'}>
              <div className="todo t-todo-list">
                  <form className="todo-item todo-item-new" onSubmit={this.createNewRecordByEnter}>
                      <input className="todo-input t-input" placeholder="Введите задачу" value={this.state.inputValue} onChange={this.handleChange}/>
                      <span className="plus t-plus" onClick={this.createNewRecord}>+</span>
                  </form>
                  {
                      this.props.savedData.length
                          ? this.props.savedData.map((currentValue) => this.renderRecord(currentValue))
                          : this.renderEmptyRecord()
                  }
              </div>
          </Card>
      )
  }

  renderEmptyRecord() {
      return  <h3 className="card__title card-title">'Введи своюу первую задачу'</h3>;
  }

  renderRecord = record => {
      return (
          <div className="todo-item t-todo" key={record.id}>
              <p className="todo-item__text">{record.name}</p>
              <span className="todo-item__flag t-todo-complete-flag" 
              data-todo-id={record.id} 
              data-todo-status={record.status} 
              onClick={this.toggleRecordComplete}>
              {record.status ? '[x]' : '[ ]'}</span>
          </div>
      )
  };
}

export default withLocalstorage('todo-app', [])(Todo);
