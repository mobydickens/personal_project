import React, { Component } from 'react';
import LoggedInHeader from './LoggedInHeader.jsx';
import Table from './Table.jsx';
import { connect } from 'react-redux';
import { getTableArray } from '../ducks/reducer';
import Plot from 'react-plotly.js';
import { Link } from 'react-router-dom';

class Reports extends Component {
  
  render() {
    let dateArray = this.props.tableArray.map(obj => {
      return obj.date.format();
    })
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
        <Link to={`/project/${this.props.currentProjectId}`}><i className="fas fa-arrow-left text-black m-4"></i></Link>
        {/* for large screen */}
        <div className='hidden lg:block w-1/2 border-b border-grey'>
          <Plot 
          useResizeHandler={true}
          data={[
            {
              x: dateArray,
              y: expectedRemaining,
              type: 'scatter',
              mode: 'Line Dash',
              marker: {color: 'blue'},
              name: 'expected'
            },
            {
              x: dateArray,
              y: actualRemaining,
              type: 'scatter',
              mode: 'Line Dash',
              marker: {color: 'green'},
              name: 'actual'
            }
          ]}
          layout={
            {title: 'Progress chart', yaxis: { title: 'Hours' }, showlegend:true, legend: {x:1, y:1, xanchor:'auto'}, displayModeBar:false}
            } 
          config={{displayModeBar: false}}/>
          </div>
            {/* //for small screen */}
          <div className='w-full lg:hidden border-b border-grey'>
          <Plot 
          data={[
            {
              x: dateArray,
              y: expectedRemaining,
              type: 'scatter',
              mode: 'Line Dash',
              marker: {color: 'blue'},
              name: 'expected'
            },
            {
              x: dateArray,
              y: actualRemaining,
              type: 'scatter',
              mode: 'Line Dash',
              marker: {color: 'green'},
              name: 'actual'
            }
          ]}
          layout={
            {width: window.screen.width-10, height: window.screen.height / 2, title: 'Progress chart', yaxis: { title: 'Hours' }, showlegend:true, legend: {x:1, y:1, xanchor:'auto'}, displayModeBar:false}
            } 
          config={{displayModeBar: false}}/>
          </div>

        <div className='lg:block'>
          <Table />
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    tableArray: state.tableArray,
    currentProjectId: state.currentProjectId
  }
}
export default connect(mapState, { getTableArray })(Reports);