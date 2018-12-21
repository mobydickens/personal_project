import React, { Component } from 'react';
import axios from 'axios';
import { userProjects } from '../ducks/reducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class ProjectHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: '',
      projectDescription: '',
      editName: false,
      editDesc: false
    }
  }
  
  //this component gets the title of the project to display on the page
  async componentDidMount() {
    let res = await axios.get(`/api/project/${this.props.match.params.id}`);
    this.setState({
      projectName: res.data.title,
      projectDescription: res.data.description
    })
  }

   deleteProject = (id) => {
    axios.delete(`/api/deleteproject/${id}`).then(res => {
      this.props.userProjects(res.data);
    });
    this.props.history.push('/home');
  }

  async editName() {
    let res = await axios.put(`/api/editname/${ this.props.projectId }`, { title: this.state.projectName } );
    this.setState({
      projectName: res.data.title,
      editName: false
    })
  }

  async editDescription() {
    let res = await axios.put(`/api/editdesc/${ this.props.projectId }`, { description: this.state.projectDescription });
    this.setState({
      projectName: res.data.description,
      editDesc: false
    })
  }

  render() {
    return (
      <div>
        <div className='flex justify-between'>
          { !this.state.editName ? <h3 onClick={ () => this.setState({ editName: true }) } className='font-josefin m-6'>{this.state.projectName}</h3>
            : <div>Project Name: 
                <input 
                  onChange={ (e) => this.setState({ projectName: e.target.value }) }
                  type="text"
                  value={ this.state.projectName }/>
                <button onClick={ () => this.editName() }>Save</button>
                <button onClick={ () => this.setState({ editName: false })}>Cancel</button>
              </div>
          }
          <button 
            onClick={ () => this.deleteProject(this.props.match.params.id) } 
            className='p-4 mx-6 text-sm'>
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
        <div className='mx-6'>
        { !this.state.editDesc ? <div onClick={ () => this.setState({ editDesc: true }) }>{ this.state.projectDescription }</div> 
          : <div>Project description:
              <input 
                onChange={ (e) => this.setState({ projectDescription: e.target.value }) }
                value={ this.state.projectDescription } 
                type="text"/>
              <button onClick={ () => this.editDescription() }>Save</button>
              <button onClick={ () => this.setState({ editDesc: false })}>Cancel</button>
            </div>
        }
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, { userProjects })(ProjectHeader));