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
    //setting needed variables
    const { taskInfo, timelogs, daily_dev_hours, start_date } = this.state;
    let rows = [];
    let initialEstimate = 0;
    let devHours_expected = 0;
    let devHours_actual = 0
    let date = moment(start_date); 
    let today = new Date();
    let logDate = 0;
    today.setHours(0,0,0,0);

    //getting initial estimate to find out how many rows I need in my table
    for (let i = 0; i < taskInfo.length; i++) {
      initialEstimate += Number(taskInfo[i].initial_estimate);
    }
    //get how many rows I need in table based on initial estimate
    let rowsNeeded = Math.ceil(initialEstimate / daily_dev_hours);
    //configuring how many hours were spent EACH DAY
    for (let i = 1; i <= rowsNeeded; i++) {
      devHours_expected += daily_dev_hours;
      let actual_hours_today = 0;
      let totalEstimateChange = 0;
      
      for (let j = 0; j < timelogs.length; j++) {
        let logged_date = moment(timelogs[j].created_at).format('L'); 
        logDate = new Date(logged_date);
        if( logged_date === date.format('L') ) {
          actual_hours_today += Number(timelogs[j].spent_time);
        }
        //get estimate change for project based on changes made to estimates in each timelog
        totalEstimateChange += Number(timelogs[j].estimate_change);

      }
      //get dates for column dates, skipping weekends
      let dateCheck = date.format('dddd');
      if(dateCheck.includes("Saturday")) {
        date.add(2, 'days');
      }
      //calculate current estimate per day for the rows (only need to recalculate if the date is NOW or later)
      let currentEstimate = initialEstimate;
      if( logDate >= today ) {
        currentEstimate = initialEstimate - totalEstimateChange;
      }

      //calculate expected % of project complete based on dev hours per day that we alloted to work
      // total hours (initial estimate - dev hours per day (added up to the date) )
      let percent_expected = Number((( devHours_expected / initialEstimate ) * 100).toFixed(2));
      devHours_actual += actual_hours_today;
      let percent_actual = Number((( devHours_actual / initialEstimate) * 100).toFixed(2));

      let expected_hrs_remaining = initialEstimate - devHours_expected;
      if(expected_hrs_remaining < 0) {
        expected_hrs_remaining = 0;
      }
     
      //should this be current estimate or initial estimate??
      let actual_hrs_remaining = currentEstimate - devHours_actual;
      if(expected_hrs_remaining < 0) {
        expected_hrs_remaining = 0;
      };

      rows.push( { 
        date: date.format('L dddd'), 
        expected_hours: daily_dev_hours, 
        actual_hours_today: actual_hours_today, 
        currentEstimate: currentEstimate,
        percent_expected: percent_expected,
        percent_actual: percent_actual,
        hours_expected: expected_hrs_remaining,
        hours_remaining: actual_hrs_remaining } )

      date.add(1, 'day');
    }
    console.log("Initial Estimate: ", initialEstimate, "Rows Needed: ", rowsNeeded, "Current Rows: ", rows);
    return rows;
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