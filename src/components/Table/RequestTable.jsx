import React from "react";
import analysisService from "../../utils/analysisService";
import "./RequestTable.css";

class RequestsTable extends React.Component {
  renderTableData() {
    let structureToMap = this.props.allRequestLinks;

    if (this.props.allRequestLinks.length === 0) {
      structureToMap = ["no requests, just dummy data :)"];
    }
    return structureToMap.map((link, index) => {
      let numReviews = this.props.allRequestNums[index];
      let id = this.props.allRequestIds[index];

      return (
        <tr key={index}>
          <td>{this.props.title}</td>
          <td>{this.props.year}</td>

          <td>
            <img
              height="43"
              width="30"
              alt="nothing found"
              src={this.props.src}
            ></img>
          </td>
          <td>{this.props.positive}</td>
          <td>{this.props.negative}</td>
          <td>{this.props.neutral}</td>

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
    });
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
