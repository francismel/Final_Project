import React from "react";
import analysisService from "../../utils/analysisService";
import "./RequestTable.css";

class RequestsTable extends React.Component {
  renderTableData() {
    let structureToMap = this.props.titles;

    if (this.props.titles.length === 0) {
      structureToMap = ["no requests, just dummy data :)"];
    }
    return this.props.titles.length === 0 ? (
      <tr key={"zero"}>
        <td>None Yet!</td>
        <td></td>

        <td></td>
        <td></td>
        <td></td>
        <td></td>

        <td></td>
      </tr>
    ) : (
      structureToMap.map((link, index) => {
        let numReviews = this.props.allRequestNums[index];
        let id = this.props.allRequestIds[index];

        return (
          <tr key={index}>
            <td>{this.props.titles[index]}</td>
            <td>{this.props.years[index]}</td>

            <td>
              <img
                height="43"
                width="30"
                alt="no poster :("
                src={this.props.srcs[index]}
              ></img>
            </td>
            <td>{Math.floor(this.props.positives[index] * 100)}</td>
            <td>{Math.floor(this.props.negatives[index] * 100)}</td>
            <td>{Math.floor(this.props.neutrals[index] * 100)}</td>

            <td>
              <button
                className="button"
                value={id}
                onClick={(e) => this.sendData(e.target.value)}
              >
                X
              </button>
            </td>
          </tr>
        );
      })
    );
  }

  async delRequest(idToDel) {
    let userRequestInfo = {
      userId: this.props.user._id,
      reviewId: idToDel,
    };
    await analysisService.delRequest(userRequestInfo);
  }

  sendData = (val) => {
    if (!val) {
      return;
    }
    this.props.delFunction(val);
  };

  renderTableHeader() {
    let header = [
      "movie",
      "year",
      "poster",
      "% Positive",
      "% Negative",
      "% Neutral",
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
