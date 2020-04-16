import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../LoginPage/LoginPage.css";
import analysisService from "../../utils/analysisService";
import axios from "axios";
import PieChart from "../../components/PieChart/PieChart";
import userService from "../../utils/userService";
import RequestsTable from "../../components/Table/RequestTable";

class HomePage extends Component {
  state = {
    user: userService.getUser(),
    mainDonut: {},
    invalidForm: true,
    firstCompareDonut: {
      showFirstDonut: true,
    },
    secondCompareDonut: {
      showSecondDonut: true,
    },
    formData: {
      link: "",
      numTweets: 0,
    },
    shouldUpdate: false,
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

  showPie = () => {
    this.setState({
      firstCompareDonut: {
        showFirstDonut: true,
      },
      secondCompareDonut: {
        showSecondDonut: true,
      },
    });
  };

  hidePie = () => {
    this.setState({
      firstCompareDonut: {
        showFirstDonut: false,
      },
      secondCompareDonut: {
        showSecondDonut: false,
      },
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    let url = this.state.formData.link;
    let numReviews = this.state.formData.numTweets;
    let userId = this.state.user._id;

    let request = {
      link: url,
      numReviews: numReviews,
      userId: userId,
    };

    await analysisService.saveRequest(request);

    this.setState({ shouldUpdate: true });
  };

  render() {
    return (
      <div className="LoginPage">
        <h1>Enter any Yelp.com url!</h1>
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
        <div className="flexMe centerMe">
          <PieChart
            title="Chart 1"
            data={[20, 50, 50]}
            shouldShow={this.state.firstCompareDonut.showFirstDonut}
          />

          <PieChart
            title="Chart 2"
            data={[30, 10, 50]}
            shouldShow={this.state.secondCompareDonut.showSecondDonut}
          />
        </div>
        <br></br>
        <button onClick={this.showPie} type="button">
          Compare!
        </button>
        <button onClick={this.hidePie} type="button">
          Close
        </button>
        <RequestsTable user={this.state.user} />
      </div>
    );
  }
}

export default HomePage;
