import React from "react";
import analysisService from "../../utils/analysisService";
import "./RequestTable.css";

class RequestsTable extends React.Component {
  renderTableData() {
    return this.props.allRequestLinks.map((link, index) => {
      let numReviews = this.props.allRequestNums[index];
      let id = this.props.allRequestIds[index];

      return (
        <tr key={index}>
          <td>{link}</td>
          <td>{numReviews}</td>
          <td>{30}</td>
          <td>{40}</td>
          <td>{30}</td>
          <td>{id}</td>
          <td>
            <button value={id} onClick={(e) => this.sendData(e.target.value)}>
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
    this.props.delFunction(val);
  };

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
