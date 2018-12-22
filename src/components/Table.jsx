import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';


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

  render() {

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