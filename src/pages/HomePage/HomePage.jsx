import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../LoginPage/LoginPage.css";
import analysisService from "../../utils/analysisService";
import axios from "axios";

class HomePage extends Component {
  state = {
    invalidForm: true,

    formData: {
      link: "",
      numTweets: 0,
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
    try {
      let result = await analysisService.analyzeRequest(this.state.formData);
      // alert("js says the answer is " + result);
    } catch (err) {
      alert("Error adding Numbers!");
    }
  };

  render() {
    //   return (
    //     <div className="LoginPage">
    //       <header className="header-footer">Home Page</header>
    //       <form className="form-horizontal" onSubmit={this.handleSubmit}>
    //         <div className="form-group">
    //           <div className="col-sm-12">
    //             <input
    //               type="text"
    //               className="form-control"
    //               placeholder="searchTerm"
    //               value={this.state.searchTerm}
    //               name="searchTerm"
    //               onChange={this.handleChange}
    //             />
    //           </div>
    //         </div>
    //         <div className="form-group">
    //           <div className="col-sm-12">
    //             <input
    //               type="number"
    //               className="form-control"
    //               placeholder="How Many Tweets to Analyze?"
    //               value={this.state.numTweets}
    //               name="numTweets"
    //               onChange={this.handleChange}
    //             />
    //           </div>
    //         </div>
    //         <button className="buttonBlue">Submit</button>
    //       </form>
    //     </div>
    //   );
    // }
    return (
      <div className="LoginPage">
        <header className="header-footer">Home Page</header>
        <h1>Lets have python process a request</h1>
        <form
          ref={this.formRef}
          className="form-horizontal"
          onSubmit={this.handleSubmit}
        >
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                placeholder="link"
                value={this.state.formData.link}
                name="link"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="number"
                className="form-control"
                placeholder="number of tweets to process"
                value={this.state.formData.numTweets}
                name="numTweets"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <button type="submit" disabled={this.state.invalidForm}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default HomePage;
