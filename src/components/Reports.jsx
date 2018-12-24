import React, { Component } from 'react';
import LoggedInHeader from './LoggedInHeader.jsx';
import Table from './Table.jsx';
import { connect } from 'react-redux';
import { getTableArray } from '../ducks/reducer';
import Plot from 'react-plotly.js';

class Reports extends Component {
  
  render() {
    let dateArray = this.props.tableArray.map(obj => {
      return obj.date.format();
    })
    console.log(dateArray)
    let expectedRemaining = this.props.tableArray.map(obj => {
      return Number((obj.remaining_expected).toFixed(2));
    })
    let actualRemaining = this.props.tableArray.filter(obj => {
      if(obj.remaining_actual !== "") {
      return true;
      }
    }).map(obj => {
      return Number((obj.remaining_actual).toFixed(2));
    })
    return (
      <div>
        <LoggedInHeader />
        <Plot data={[
          {
            x: dateArray,
            y: expectedRemaining,
            type: 'scatter',
            mode: 'lines+points',
            marker: {color: 'blue'},
            name: 'expected'
          },
          {
            x: dateArray,
            y: actualRemaining,
            type: 'scatter',
            mode: 'lines+points',
            marker: {color: 'green'},
            name: 'actual'
          }
        ]}
        layout={
          {width: 920, height: 640, title: 'Progress chart', yaxis: { title: 'Hours' }}
          } />
        <Table />
      </div>
    );
  }
}

function mapState(state) {
  return {
    tableArray: state.tableArray
  }
}
export default connect(mapState, { getTableArray })(Reports);