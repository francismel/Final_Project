import React, { Component } from "react";
import "../LoginPage/LoginPage.css";
import analysisService from "../../utils/analysisService";
import PieChart from "../../components/PieChart/PieChart";
import userService from "../../utils/userService";
import RequestsTable from "../../components/Table/RequestTable";
import "./HomePage.css";
import Comments from "../../components/Comments/Comments";
import Movie from "../../components/Movie/Movie";

class HomePage extends Component {
  state = {
    user: userService.getUser(),
    comments: ["no comments yet"],
    updateVal: 0,
    positive: 33,
    negative: 33,
    neutral: 33,
    url:
      "https://m.media-amazon.com/images/M/MV5BMzFkM2YwOTQtYzk2Mi00N2VlLWE3NTItN2YwNDg1YmY0ZDNmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX67_CR0,0,67,98_AL_.jpg",
    title: "Home Alone",
    year: "(1990)",
    reviews: {},
    testReviews: {
      '"Home Alone" is one of the most popular movies from the earl':
        "positive",
      "Home alone reviewHome alone is a warm, family comedy film ma":
        "positive",
      "My all time favorite film. Macaulay Culkin did superbly as a":
        "positive",
      "Home Alone is a nostalgic film for me, having watched it rel":
        "negative",
      "Home Alone (1990) Rating: 8/10It might be dumb and corny, bu":
        "negative",
      "In the Eighties, John Hughes churned out a handful of movies": "neutral",
      "It's that time of year again, the time of year when it is ac": "neutral",
      "I HAVE REVIEWED OVER 400 (C H R I S T M A S ) MOVIES AND SPE": "neutral",
    },

    postResponse: "",
    invalidForm: true,
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

    return fetch("http://127.0.0.1:5000/poster", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        link: url,
        numReviews: numReviews,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("ignore for now!");
      })
      .then((data) => {
        this.setState({
          postResponse: data.hi,
          reviews: data.reviews,
          positive: data.positive,
          negative: data.negative,
          neutral: data.neutral,
          title: data.title,
          year: data.year,
          url: data.photo,
        });
      });
  };

  render() {
    return (
      <div className="LoginPage">
        <div className="yelp">
          <h1>Enter an IMDB.com user reviews Url!</h1>
          <p className="small">
            example: 'https://www.imdb.com/title/tt0099785/reviews?ref_=tt_ql_3'
          </p>
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
                type="numTweets"
                className="form-control"
                placeholder="# reviews to process: "
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
        <Comments allComments={this.state.testReviews} />
        <br></br>
        <br></br>
        <Movie
          src={this.state.url}
          title={this.state.title}
          year={this.state.year}
        />

        <RequestsTable
          user={this.state.user}
          allRequestLinks={this.state.allRequestLinks}
          allRequestIds={this.state.allRequestIds}
          allRequestNums={this.state.allRequestNums}
          title={this.state.title}
          year={this.state.year}
          src={this.state.url}
          positive={this.state.positive}
          negative={this.state.negative}
          neutral={this.state.neutral}
          delFunction={this.delFunction}
        />
        <p>{this.state.postResponse}</p>
      </div>
    );
  }
}

export default HomePage;
