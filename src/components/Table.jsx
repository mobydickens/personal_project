import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getTableArray } from '../ducks/reducer';

import { tableRowsNeeded, rows } from '../helpers/table_helper';

class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //project response:
      daily_dev_hours: '',
      title: '',
      description: '',
      start_date: '',
      //tasks and timelogs responses:
      taskInfo: [],
      timelogs: []
    }
    this.getTableInfo = this.getTableInfo.bind(this);
  }
  
  componentDidMount() {
    this.getTableInfo();
  }
  
  //getting all of the required information for the table and chart in one request and setting state. 
  async getTableInfo() {
    let res = await axios.get( `/api/table/${this.props.projectId}`);
    const { projectInfo, taskInfo, timelogs } = res.data;
    this.setState({
      daily_dev_hours: projectInfo.daily_hours,
      title: projectInfo.title,
      description: projectInfo.description,
      start_date: projectInfo.start_date,
      taskInfo: taskInfo,
      timelogs: timelogs
    })
  }

  // table helper function
  createTableRows = () => {
    const { taskInfo, timelogs, daily_dev_hours, start_date } = this.state;
    //see table_helper.js for function
    let initialEstimate = tableRowsNeeded(taskInfo);
    let rowsNeeded = Math.ceil(initialEstimate / daily_dev_hours);
    //see table_helper.js for function
    let tableRows = rows(rowsNeeded, initialEstimate, start_date, timelogs, daily_dev_hours);
    //put the array in the reducer
    this.props.getTableArray(tableRows);
    return tableRows;
  }

  render() {

    let tableArray = this.createTableRows();
    console.log(tableArray);
    let table = tableArray.map((row, i) => {
      return (
        <tr className={ i % 2 !== 0 ? 'bg-white' : 'bg-grey-lightest' } key={i}>
          <td className='border px-1 lg:px-4 py-2 text-sm lg:text-base'>{row.date.format('MMM Do')}</td>
          <td className='border px-1 lg:px-4 py-2 text-sm lg:text-base'>{row.spent_today}</td>
          <td className='border px-1 lg:px-4 py-2 text-sm lg:text-base'>{row.currentEstimate ? row.currentEstimate.toFixed(2) : ""}</td>
          <td className='border px-1 lg:px-4 py-2 text-sm lg:text-base'>{row.remaining_expected.toFixed(2)}</td>
          <td className='border px-1 lg:px-4 py-2 text-sm lg:text-base'>{row.remaining_actual ? row.remaining_actual.toFixed(2) : ""}</td>
        </tr>
      )
    })

    return (
      <table className='border shadow-md w-full bg-white mt-4 lg:mt-0 lg:m-6'>
        <tbody>
          <tr>
            <th className='px-1 lg:px-4 py-2 text-sm lg:text-base'>Date</th>
            <th className='px-1 lg:px-4 py-2 text-sm lg:text-base'>Hours <br/>spent</th>
            <th className='px-1 lg:px-4 py-2 text-sm lg:text-base'>Current <br/>estimate</th>
            <th className='px-1 lg:px-4 py-2 text-sm lg:text-base'>Expected <br/>remaining</th>
            <th className='px-1 lg:px-4 py-2 text-sm lg:text-base'>Actual <br/>remaining</th>
          </tr>
          {table}
        </tbody>
      </table>
    );
  }
}

function mapState(state) {
  return {
    projectId: state.currentProjectId
  }
}
export default connect(mapState, { getTableArray })(Table);