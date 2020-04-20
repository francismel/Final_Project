import React, { Component } from "react";
import userService from "../../utils/userService";

class EditForm extends Component {
  state = {
    name: "",
    email: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    let formData = {
      name: this.state.name,
      userId: this.props.user._id,
    };
    try {
      let result = await userService.editUser(formData);
      this.props.changeName(result.newName);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className="LoginPage">
        <div className="verticalLine">hey</div>
        <header className="bigBlue">Edit Info</header>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                placeholder="New Name: "
                value={this.state.name}
                name="name"
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-12 text-center">
              <button className="buttonBlue">Edit</button>
              &nbsp;&nbsp;&nbsp;
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default EditForm;
