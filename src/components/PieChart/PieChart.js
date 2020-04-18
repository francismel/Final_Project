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

      series: [30, 30, 30],
    };
  }

  render() {
    return this.props.shouldShow ? (
      <div className="donut">
        <Chart
          options={this.state.options}
          series={[
            this.props.positive,
            this.props.negative,
            this.props.neutral,
          ]}
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
