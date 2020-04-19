import React from "react";

class Movie extends React.Component {
  render() {
    return this.props.title ? (
      <div>
        <h4>
          {this.props.title} {this.props.year}
        </h4>
        <img
          height="98"
          width="67"
          alt="nothing found"
          src={this.props.src}
        ></img>
      </div>
    ) : (
      <p>nothing</p>
    );
  }
}

export default Movie;
