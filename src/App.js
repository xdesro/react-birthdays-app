import React, { Component } from 'react';
import './App.css';

const Title = () => {
  return (
    <div>
      <div>
        <h1>Birthdays</h1>
      </div>
    </div>
  );
}

const BirthdayForm = ({addBirthday}) => {
  let name;
  let birthday;

  return (
    <div>
      <input ref={node => {
        name = node;
      }} />
      <input type="date" ref={node => {
        birthday = node;
      }} />
      <button onClick={() => {
        addBirthday({
          name: name.value,
          date: birthday.value
        });
        name.value = '';
        birthday.value = '';
      }}>+</button>
    </div>
  )
}

const Birthday = ({birthday, remove}) => {
  // Each birthday
  return (<li onClick={() => {remove(birthday.id)}}>{birthday.name}: {birthday.date}</li>);
}

const BirthdayList = ({birthdays, remove}) => {
  // Map through the birthdays
  const birthdayNode = birthdays.map((birthday) => {
    return (
      <Birthday birthday={birthday} key={birthday.id} remove={remove} />
    )
  });
  return (<ul>{birthdayNode}</ul>);
}

window.id = 0;
class BirthdayApp extends Component {
  constructor(props) {
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: []
    }
  }
  // Add Birthday Handler
  addBirthday(val) {
    // Assemble data
    const birthday = {name: val.name, date: val.date, id: window.id++}

    this.state.data.push(birthday);

    this.setState({data: this.state.data});
  }

  handleRemove(id) {
    const remainder = this.state.data.filter((birthday) => {
      if(birthday.id !== id) {
        return birthday;
      }
    });

    this.setState({data: remainder});
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Title />
            <BirthdayForm addBirthday={this.addBirthday.bind(this)} />
            <BirthdayList 
              birthdays={this.state.data}
              remove={this.handleRemove.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default BirthdayApp;
// export default App;
