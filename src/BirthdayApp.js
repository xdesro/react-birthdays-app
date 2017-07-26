import React, { Component } from 'react';
import axios from 'axios';
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
      <div className="form-group">
        <label htmlFor="name-input" className="control-label">Name</label>
        <input id="name-input" type="text" className="form-control" placeholder="" ref={node => {
              name = node;
            }}/>
        <p className="help-block">Type in your friend's name here.</p>
      </div>
      <div className="form-group">
        <input type="date" className="form-control" placeholder="Search for..." ref={node => {
              birthday = node;
            }}/>
      </div>
      <button className="btn btn-default" type="button" onClick={() => {
        addBirthday({
          name: name.value,
          date: birthday.value
        });
        name.value = '';
        birthday.value = '';
      }}>Add</button>
    </div>
  )
}

const Birthday = ({birthday, remove}) => {
  // Each birthday
  return (
    <tr>
    <td>{birthday.name}</td>
    <td>{birthday.birthday}</td>
    <td>
      <button className="btn btn-info" onClick={() => {remove(birthday.id)}}>Remove</button>
    </td>
    </tr>
  );
}

const BirthdayList = ({birthdays, remove}) => {
  // Map through the birthdays
  // console.log(birthdays);

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

const rootUrl = 'http://localhost:3005';

class BirthdayApp extends Component {
  
  getInitialState() {
    return {
     friends: []
    }
  }
  componentDidMount() {
    const _this = this;
    this.serverRequest = 
    axios
      .get(rootUrl + '/friends')
      .then(function(result) {    
      _this.setState({
          friends: result.data
      });
    });
  }
  componentWillUnmount() {
    this.serverRequest.abort();
  }
  constructor(props) {
    // Pass props to parent class
    super(props);
  //   // Set initial state
    this.state = {friends: []}
  //     data: [
  //       {name: "test", date: "2017-07-14", id: "0"}
  //     ]
  //   }
  }
  // Add Birthday Handler
  addBirthday(val) {
    // Assemble data
    const birthday = {name: val.name, date: val.date, id: window.id++}

    this.state.data.push(birthday);

    this.setState({data: this.state.data});
  }

  handleRemove(id) {
    const remainder = this.state.friends.filter((birthday) => {
      if(birthday.id !== id) {
        return birthday;
      } else {
        return;
      }
    });

    this.setState({friends: remainder});
  }

  render() {
    return (
      <div>
      <Title />
      <BirthdayForm addBirthday={this.addBirthday.bind(this)} />
      <BirthdayList 
        birthdays={this.state.friends}
        remove={this.handleRemove.bind(this)}
      />
      </div>
    );
  }
}
export default BirthdayApp;
