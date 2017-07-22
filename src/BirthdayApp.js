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
    <div className="form-group">
      <input type="text" className="form-control" placeholder="Name" ref={node => {
            name = node;
          }}/>
      <div className="input-group">
        <input type="date" className="form-control" placeholder="Search for..." ref={node => {
            birthday = node;
          }}/>
        <span className="input-group-btn">
          <button className="btn btn-default" type="button" onClick={() => {
              addBirthday({
                name: name.value,
                date: birthday.value
              });
              name.value = '';
              birthday.value = '';
            }}>Add</button>
        </span>
      </div>
    </div>
  )
}

const Birthday = ({birthday, remove}) => {
  // Each birthday
  return (
    <tr>
    <td>{birthday.name}</td>
    <td>{birthday.date}</td>
    <td>
      <button className="btn btn-danger" onClick={() => {remove(birthday.id)}}>Remove</button>
    </td>
    </tr>
  );
}

const BirthdayList = ({birthdays, remove}) => {
  // Map through the birthdays
  const birthdayNode = birthdays.map((birthday) => {
    return (
      <Birthday birthday={birthday} key={birthday.id} remove={remove}/>
    )
  });
  if (birthdayNode.length > 0) {
    return (
    <table className="table table-striped">
      <thead>
        <tr>
          <td>Name</td>
          <td>Birthday</td>
          <td colSpan="2"></td>
        </tr>
      </thead>
      <tbody>{birthdayNode}</tbody>
    </table>);
  } else {
    return (
      <table className="table table-striped"></table>
    )
  }
}

window.id = 0;
class BirthdayApp extends Component {
  constructor(props) {
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: [
        {name: "test", date: "2017-07-14", id: "0"}
      ]
    }
  }
  // Add Birthday Handler
  addBirthday(val) {
    // Assemble data
    const birthday = {name: val.name, date: val.date, id: window.id++}

    this.state.data.push(birthday);
    console.log(birthday);

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
      <div>
      <Title />
      <BirthdayForm addBirthday={this.addBirthday.bind(this)} />
      <BirthdayList 
        birthdays={this.state.data}
        remove={this.handleRemove.bind(this)}
      />
      </div>
    );
  }
}
export default BirthdayApp;
