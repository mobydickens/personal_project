import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getTableArray, onTrackInfo } from '../ducks/reducer';
import { firstEstimate, rows } from '../helpers/table_helper';
import moment from 'moment';

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
    let res = await axios.get( `/api/table/${this.props.id}`);
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
    let initialEstimate = firstEstimate(taskInfo);
    let rowsNeeded = Math.ceil(initialEstimate / daily_dev_hours);
    //see table_helper.js for function
    let tableRows = rows(new Date(), rowsNeeded, initialEstimate, start_date, timelogs, daily_dev_hours);
    //put the array in the reducer
    this.props.getTableArray(tableRows);

    //send info to the reducer so that I can calculate whether the user is behind or ahead of schedule
    let info = tableRows.filter(row => {
      if(moment(row.date).format('L') === moment(new Date()).format('L')) {
        return true;
      } else {
        return false;
      };
    });
   
  this.props.onTrackInfo(info);
    return tableRows;
  }

  render() {

    let tableArray = this.createTableRows();
   
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
export default connect(mapState, { getTableArray, onTrackInfo })(Table);