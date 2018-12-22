import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
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
    let res = await axios.get( `/api/table/${this.props.projectId}`);
    console.log(res.data);
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

  //table helper function
  createTableRows = () => {
    const { taskInfo, timelogs, daily_dev_hours, start_date } = this.state;
    let rows = [];
    let initialEstimate = 0;
    let date = moment(start_date); 
    //getting initial estimate to find out how many rows I need in my table
    for (let i = 0; i < taskInfo.length; i++) {
      initialEstimate += Number(taskInfo[i].initial_estimate);
    }
    //get how many rows I need in table based on initial estimate
    let rowsNeeded = Math.ceil(initialEstimate / daily_dev_hours);
    //get dates for column dates, skipping weekends
    for (let i = 1; i <= rowsNeeded; i++) {
      let dateCheck = date.format('dddd');
      if(dateCheck.includes("Saturday")) {
        console.log("hit?")
        date.add(2, 'days');
      }
        // let spentTime
      rows.push( { date: date.format('L dddd'), expected_hours: daily_dev_hours } )
      date.add(1, 'day');
      console.log(date.format('L dddd'))
    }
  

 
    console.log("Initial Estimate: ", initialEstimate, "Rows Needed: ", rowsNeeded, "Current Rows: ", rows)
  }


  render() {
    this.createTableRows();
    return (
      <div>
        Table component
      </div>
    );
  }
}

function mapState(state) {
  return {
    projectId: state.currentProjectId
  }
}
export default connect(mapState)(Table);

//neeed to fetch start_date for the particular project
//fetch dev_hours per day
//timelogs for this particular project from all statuses

// moment().format('L'); 