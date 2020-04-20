import React from "react";
import "./Comments.css";

class Comments extends React.Component {
  renderTableData() {
    let structureToMap = Object.keys(this.props.allComments);
    if (structureToMap.length === 0) {
      structureToMap = ["no comments were found  :("];
    }
    return structureToMap.map((comment, index) => {
      if (comment.length > 150) {
        comment = comment.slice(0, 150) + "...";
      }
      return (
        <tr key={index}>
          <td>
            <div className="textDiv">{comment}</div>
          </td>
          <td>{this.props.allComments[comment][0]}</td>
          <td>{this.props.allComments[comment][0]}</td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    let header = ["Comments", "Python Model", "Mel Model"];
    return header.map((head) => {
      return <th key={head}>{head.toUpperCase()}</th>;
    });
  }

  render() {
    return (
      <div>
        <h2 id="newTitle">Some Comments</h2>
        <table id="requestGreen">
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Comments;
