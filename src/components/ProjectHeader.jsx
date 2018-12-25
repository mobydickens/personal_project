import React, { Component } from 'react';
import axios from 'axios';
import { userProjects } from '../ducks/reducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
        <div className='flex flex-col lg:flex-row justify-between'>
          { !this.state.editName ? <h3 onClick={ () => this.setState({ editName: true }) } className='font-josefin m-4'>{this.state.projectName}</h3>
            : <div className='mx-6 flex flex-col lg:flex-row items-center'>Project Name:
                <input
                  className='input focus:outline-none bg-smoke-lighter rounded' 
                  onChange={ (e) => this.setState({ projectName: e.target.value }) }
                  type="text"
                  value={ this.state.projectName }/>
                <button className='mx-2' onClick={ () => this.editName() }>Save</button>
                <button className='mx-2' onClick={ () => this.setState({ editName: false })}>Cancel</button>
              </div>
          }
          <div className={this.state.editName || this.state.editDesc ? 'hidden' : 'my-2 mx-6 flex flex-row'}>
            <Link className='no-underline' to='/reports'><button className='lg:m-4'>See reports for this project</button></Link>
            <button 
              onClick={ () => this.deleteProject(this.props.match.params.id) } 
              className='mx-4 text-sm hidden lg:block'>
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
        <div className='mx-6 hidden lg:block'>
        { !this.state.editDesc ? <div onClick={ () => this.setState({ editDesc: true }) }>{ this.state.projectDescription }</div> 
          : <div className='flex items-center'>Project description:
              <input
                className='input focus:outline-none bg-smoke-lighter rounded'  
                onChange={ (e) => this.setState({ projectDescription: e.target.value }) }
                value={ this.state.projectDescription } 
                type="text"/>
              <button className='mx-2' onClick={ () => this.editDescription() }>Save</button>
              <button className='mx-2' onClick={ () => this.setState({ editDesc: false })}>Cancel</button>
            </div>
        }
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, { userProjects })(ProjectHeader));