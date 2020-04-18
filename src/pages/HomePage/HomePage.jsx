import React, { Component } from "react";
import "../LoginPage/LoginPage.css";
import analysisService from "../../utils/analysisService";
import PieChart from "../../components/PieChart/PieChart";
import userService from "../../utils/userService";
import RequestsTable from "../../components/Table/RequestTable";
import "./HomePage.css";
import Comments from "../../components/Comments/Comments";

class HomePage extends Component {
  state = {
    user: userService.getUser(),
    comments: ["no comments yet"],
    updateVal: 0,
    title1: "Nothing Yet",
    title2: "Nothing Yet",
    positive: 30,
    negative: 30,
    neutral: 30,
    message: "",
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
    allRequestLinks: [],
    allRequestIds: [],
    allRequestNums: [],
  };

  async componentDidMount() {
    if (this.state.user) {
      let userId = this.state.user._id;
      const allRequests = await analysisService.getRequests(userId);
      for (let i = 0; i < allRequests.length; i++) {
        let link = allRequests[i].link;
        let numReviews = allRequests[i].numReviews;
        let id = allRequests[i]._id;

        this.setState({
          allRequestLinks: this.state.allRequestLinks.concat(link),
          allRequestIds: this.state.allRequestIds.concat(id),
          allRequestNums: this.state.allRequestNums.concat(numReviews),
        });
      }
    }
  }

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

  delRequest = async (idToDel) => {
    let idIndex = this.state.allRequestIds.indexOf(idToDel);

    let remainingLinks = this.state.allRequestLinks;
    remainingLinks.splice(idIndex, 1);

    let remainingNums = this.state.allRequestNums;
    remainingNums.splice(idIndex, 1);

    this.setState({
      allRequestIds: this.state.allRequestIds.filter((p) => p !== idToDel),
      allRequestLinks: remainingLinks,
      allRequestNums: remainingNums,
    });
    let userRequestInfo = {
      userId: this.state.user._id,
      reviewId: idToDel,
    };
    await analysisService.delRequest(userRequestInfo);
  };

  delFunction = async (childData) => {
    // this.setState({ message: childData });
    await this.delRequest(childData);
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

  makeFetchCall = async (e) => {
    e.preventDefault();
    console.log("makeFetchCall being called");
    try {
      let result = await fetch("http://127.0.0.1:5000/sayHi");
      if (result.ok) {
        const parsedRes = await result.json();
        console.log("parsed res", parsedRes);
        this.setState({
          positive: parsedRes.positive,
          negative: parsedRes.negative,
          neutral: parsedRes.neutral,
          title1: "Chart 1",
          title2: "Chart 2",
        });
        return parsedRes;
      }
      throw new Error("didnt work");
    } catch (err) {
      alert("Error!");
    }
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

    let reviewId = await analysisService.saveRequest(request);
    this.setState({
      allRequestLinks: this.state.allRequestLinks.concat(url),
      allRequestIds: this.state.allRequestIds.concat(reviewId.data),
      allRequestNums: this.state.allRequestNums.concat(numReviews),
    });

    console.log("makeFetchCall being called");
    try {
      let result = await fetch("http://127.0.0.1:5000/sayHi/1");
      if (result.ok) {
        const parsedRes = await result.json();
        console.log(parsedRes);
        this.setState({
          positive: parsedRes.positive,
          negative: parsedRes.negative,
          neutral: parsedRes.neutral,
          title1: "Chart 1",
          title2: "Chart 2",
          comments: parsedRes.comments,
        });
        return parsedRes;
      }
      throw new Error("didnt work");
    } catch (err) {
      alert("Error!");
    }
  };

  render() {
    return (
      <div className="LoginPage">
        <div className="yelp">
          <h1>Enter a Yelp.com Url!</h1>
        </div>
        <br></br>
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
          <button
            type="submit"
            className="buttonBlue"
            disabled={this.state.invalidForm}
          >
            Submit
          </button>
        </form>

        <div className="editForm"></div>
        <br></br>

        <div className="flexMe centerMe">
          <br></br>
          <PieChart
            title={"Python's Model"}
            positive={this.state.positive}
            negative={this.state.negative}
            neutral={this.state.neutral}
            shouldShow={true}
          />

          <PieChart
            title={"Mel's Model"}
            positive={this.state.positive}
            negative={this.state.negative}
            neutral={this.state.neutral}
            shouldShow={true}
          />
        </div>
        <br></br>
        <Comments allComments={this.state.comments} />
        <br></br>
        <br></br>

        <RequestsTable
          user={this.state.user}
          allRequestLinks={this.state.allRequestLinks}
          allRequestIds={this.state.allRequestIds}
          allRequestNums={this.state.allRequestNums}
          positive={this.state.positive}
          negative={this.state.negative}
          neutral={this.state.neutral}
          delFunction={this.delFunction}
        />
      </div>
    );
  }
}

export default HomePage;
