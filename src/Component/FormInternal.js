import React, { Component } from 'react'
import './myCss.css'

class FormInternal extends Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      surname: '',
      gender: 'male',
      age: '',
      id: '',
      data: [],
      isSubmitted: false,
      isEdit: false,
      editId: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  handleSurnameChange = (event) => {
    this.setState({
      surname: event.target.value
    })
  }

  handleAgeChange = (event) => {
    this.setState({
      age: event.target.value
    })
  }

  handleGenderChange = (event) => {
    this.setState({
      gender: event.target.value
    })
  }

  logit = () => {
    console.log(this.state.data);
  }

  deleteRow = (id) => {
    let data = this.state.data.filter(person => {
      return person.id !== id
    });
    this.setState({
      data: data
    })
  }

  editRow = (id) => {
    let rowData = this.state.data.filter(person => {
      return person.id === id
    })[0];

    this.setState({
      name: rowData.name,
      surname: rowData.surname,
      age: rowData.age,
      gender: rowData.gender,
      isEdit: true,
      editId: id
    })
  }

  handleSubmit(event) {
    const name = this.state.name;
    const surname = this.state.surname;
    const age = this.state.age;
    const gender = this.state.gender;
    if (!this.state.isEdit) {
      const id = this.state.data.length + 1;
      const info = { id: id, name: name, surname: surname, age: age, gender: gender };
      this.setState(prevState => ({
        data: [...prevState.data, info],
        isSubmitted: true
      }), this.logit);
    } else {
      const editData = this.state.data.filter(person => person.id !== this.state.editId)
      console.log(editData)
      const info = { id: this.state.editId, name, surname, age, gender };
      console.log(info)
      const data = [...editData, info];
      console.log(data)
      this.setState({
        data: data,
        isSubmitted: true,
        isEdit: false
      }, this.logit);
    }
    event.preventDefault();
    this.setState({ name: '', surname: '', age: '', gender: 'male' });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className='body'>
          <fieldset className='fieldset'>
            <legend>Personal information:</legend>
            <div className='form-smart'>
              <label>Name</label>
              <input type="Text" value={this.state.name}
                onChange={this.handleNameChange}
                placeholder={"Enter your name"}></input>
              <div>
                {this.state.errorMessage}
              </div>
            </div>
            <div className='form-smart'>
              <label>Surname</label>
              <input type="Text" value={this.state.surname}
                onChange={this.handleSurnameChange}
                placeholder={"Enter your surname"}></input>
              <div>
                {this.state.errorMessage}
              </div>
            </div>
            <div className='form-smart'>
              <label>Age</label>
              <input type="number" value={this.state.age}
                onChange={this.handleAgeChange}
                placeholder={"Enter your age"}></input>
              <div>
                {this.state.errorMessage}
              </div>
            </div>
            <div className='form-smart'>
              <label>Gender</label>
              <select value={this.state.gender}
                onChange={this.handleGenderChange} className='list-show'>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </select>
            </div>
            <div className="submit-button">
              <input type="submit" value="Submit" />
            </div>
          </fieldset>
        </form>
        {this.state.isSubmitted &&
          <div>
            <table>
              <caption>Personal Information</caption>
              <tr>
                <th>id</th>
                <th>First Name</th>
                <th>Surname</th>
                <th>Age</th>
                <th>Gender</th>
                <th></th>
              </tr>
              {this.state.data.map(person => (
                <tr>
                  <td>{person.id}</td>
                  <td>{person.name}</td>
                  <td>{person.surname}</td>
                  <td>{person.age}</td>
                  <td>{person.gender}</td>
                  <td>
                    <button onClick={() => this.deleteRow(person.id)}>Delete</button>
                    <button onClick={() => this.editRow(person.id)}>Edit</button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        }
      </div>
    )
  }
}

export default FormInternal