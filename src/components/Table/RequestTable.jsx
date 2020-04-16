import React, { Component } from "react";
import analysisService from "../../utils/analysisService";
import "./RequestTable.css";

class RequestsTable extends React.Component {
  state = {
    allRequestLinks: [],
    allRequestNums: [],
    allRequestId: [],
  };

  async componentDidMount() {
    this.loadData();
  }

  async loadData() {
    if (this.props.user) {
      let userId = this.props.user._id;
      const allRequests = await analysisService.getRequests(userId);

      for (let i = 0; i < allRequests.length; i++) {
        let link = allRequests[i].link;
        let numReviews = allRequests[i].numReviews;
        let id = allRequests[i]._id;

        this.setState({
          allRequestLinks: this.state.allRequestLinks.concat(link),
          allRequestId: this.state.allRequestId.concat(id),
        });
        this.setState({
          allRequestNums: this.state.allRequestNums.concat(numReviews),
        });
      }
    }
  }

  async loadAfterDelete() {
    let userId = this.props.user._id;
    const allRequests = await analysisService.getRequests(userId);

    this.setState({
      allRequestLinks: [],
      allRequestId: [],
      allRequestNums: [],
    });

    for (let i = 0; i < allRequests.length; i++) {
      let link = allRequests[i].link;
      let numReviews = allRequests[i].numReviews;
      let id = allRequests[i]._id;

      this.setState({
        allRequestLinks: this.state.allRequestLinks.concat(link),
        allRequestId: this.state.allRequestId.concat(id),
      });
      this.setState({
        allRequestNums: this.state.allRequestNums.concat(numReviews),
      });
    }
  }

  renderTableData() {
    return this.state.allRequestLinks.map((link, index) => {
      let numReviews = this.state.allRequestNums[index];
      let id = this.state.allRequestId[index];

      return (
        <tr key={index}>
          <td>{link}</td>
          <td>{numReviews}</td>
          <td>{30}</td>
          <td>{40}</td>
          <td>{30}</td>
          <td>{id}</td>
          <td>
            <button value={id} onClick={(e) => this.delRequest(e.target.value)}>
              X
            </button>
          </td>
        </tr>
      );
    });
  }

  async delRequest(idToDel) {
    let userRequestInfo = {
      userId: this.props.user._id,
      reviewId: idToDel,
    };
    await analysisService.delRequest(userRequestInfo);
  }

  renderTableHeader() {
    let header = [
      "url",
      "# reviews",
      "% Positive",
      "% Negative",
      "% Neutral",
      "review Id",
      "DEL",
    ];
    return header.map((head) => {
      return <th key={head}>{head.toUpperCase()}</th>;
    });
  }

  render() {
    return (
      <div>
        <h2 id="title">Past Requests</h2>
        <table id="requests">
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default RequestsTable;
