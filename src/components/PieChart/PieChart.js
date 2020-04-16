import React, { Component } from "react";
import Chart from "react-apexcharts";
import "./PieChart.css";

class PieChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        labels: ["Positive", "Negative", "Neutral"],
        title: {
          text: props.title,
        },
      },

      series: props.data,
    };
  }

  render() {
    return this.props.shouldShow ? (
      <div className="donut">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          width="380"
        />
      </div>
    ) : (
      <p></p>
    );
  }
}

export default PieChart;
