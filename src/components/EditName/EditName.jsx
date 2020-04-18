import React, { Component } from "react";
import userService from "../../utils/userService";
import "./EditName.css";

class EditName extends Component {
  state = {
    user: userService.getUser(),
    invalidForm: true,
    formData: {
      name: "",
    },
  };

  formRef = React.createRef();

  handleChange = (e) => {
    const formData = {
      ...this.state.formData,
      [e.target.name]: e.target.value,
    };
    this.setState({
      formData,
      invalidForm: !this.formRef.current.checkValidity(),
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <form
          ref={this.formRef}
          className="form-horizontal flexMe"
          onSubmit={this.handleSubmit}
        >
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                placeholder="New Name: "
                value={this.state.formData.name}
                name="name"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <button
            className="submit"
            type="submit"
            disabled={this.state.invalidForm}
          >
            Edit
          </button>
        </form>
      </div>
    );
  }
}

export default EditName;
