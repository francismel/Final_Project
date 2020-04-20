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
    positive: 0.33,
    negative: 0.33,
    neutral: 0.33,
    melPos: 0.33,
    melNeg: 0.33,
    melNeu: 0.33,
    positives: [],
    negatives: [],
    neutrals: [],
    urls: [],
    titles: [],
    years: [],

    reviews: {
      "No Reviews Yet": ["", ""],
    },

    postResponse: "",
    navbarName: "",
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
          navbarName: this.state.user.name,
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

    let remainingUrls = this.state.urls;
    remainingUrls.splice(idIndex, 1);

    let remainingPositives = this.state.positives;
    remainingPositives.splice(idIndex, 1);

    let remainingNegatives = this.state.negatives;
    remainingNegatives.splice(idIndex, 1);

    let remainingNeutrals = this.state.neutrals;
    remainingNeutrals.splice(idIndex, 1);

    let remainingTitles = this.state.titles;
    remainingTitles.splice(idIndex, 1);

    let remainingYears = this.state.years;
    remainingYears.splice(idIndex, 1);

    this.setState({
      allRequestIds: this.state.allRequestIds.filter((p) => p !== idToDel),
      urls: remainingUrls,
      titles: remainingTitles,
      years: remainingYears,
      positives: remainingPositives,
      negatives: remainingNegatives,
      neutrals: remainingNeutrals,
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

    return fetch("https://flaskappfrancis.herokuapp.com/poster", {
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

        // alert(
        //   "not a valid link. You must enter a link to USER REVIEWS page of IMDB movie. See example below. "
        // );
      })
      .then((data) => {
        this.setState({
          postResponse: data.hi,
          reviews: data.reviews,
          positive: data.positive,
          negative: data.negative,
          neutral: data.neutral,
          titles: this.state.titles.concat(data.title),
          years: this.state.years.concat(data.year),
          urls: this.state.urls.concat(data.photo),
          positives: this.state.positives.concat(data.positive),
          negatives: this.state.negatives.concat(data.negative),
          neutrals: this.state.neutrals.concat(data.neutral),
          melPos: data.melPos,
          melNeg: data.melNeg,
          melNeu: data.melNeu,
        });
      });
  };

  render() {
    return (
      <div className="LoginPage">
        <div className="yelp">
          <h1>
            Enter an IMDB.com <span className="highlight">User Reviews </span>
            Url!
          </h1>
          <ul class="list-group">
            <li class="list-group-item">Instructions:</li>

            <li class="list-group-item list-group-item-primary">
              1.Open any IMDB movie page.
            </li>
            <li class="list-group-item list-group-item-secondary">
              2.Click the 'users review' tab.
            </li>
            <li class="list-group-item list-group-item-success">
              <img
                width="300"
                height="133"
                alt="parasite imdb"
                src="https://i.imgur.com/uzD0QTn.jpg"
              ></img>
            </li>
            <li class="list-group-item list-group-item-danger">
              3.You are now at a reviews page
            </li>
            <li class="list-group-item list-group-item-warning">
              <img
                width="300"
                height="125"
                alt="parasite reviews page"
                src="https://i.imgur.com/QmSqxd4.png"
              ></img>
            </li>
            <li class="list-group-item list-group-item-info">
              4.Paste your url below!
            </li>
            <li class="list-group-item list-group-item-light">
              example:
              'https://www.imdb.com/title/tt0099785/reviews?ref_=tt_ql_3'
            </li>
          </ul>
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
                id="link"
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
        <Comments allComments={this.state.reviews} />
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
          titles={this.state.titles}
          years={this.state.years}
          srcs={this.state.urls}
          positives={this.state.positives}
          negatives={this.state.negatives}
          neutrals={this.state.neutrals}
          delFunction={this.delFunction}
        />
      </div>
    );
  }
}

export default HomePage;
