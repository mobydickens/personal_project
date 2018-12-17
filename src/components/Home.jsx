import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { userProjects } from '../ducks/reducer';

class Home extends Component {

  async componentDidMount() {
    let res = await axios.get(`/api/projects/${this.props.userId}`);
    console.log(res);
    this.props.userProjects(res);
  }

  render() {
    const { userId, username, projects } = this.props;
    let projectList = projects.map(project => {
      return (
        <div key={project.id}>
          <h4>{project.title}</h4>
          <p>Team {project.name}</p>
          <p>{project.description}</p>
          <p>Start date: {project.start_date}</p>
        </div>
      )
    })
    return (
      <div>
        <div>Home</div>
        { !userId ? "Please log in" : 
          <div>
            <div>{username}, you are logged in.</div>
            {projectList}
          </div>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.userId,
    email: state.email,
    username: state.username,
    projects: state.projects
  }
}

export default connect(mapStateToProps, { userProjects })(Home);