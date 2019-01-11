import React, { Component } from 'react';
import Header from './Header.jsx';
import axios from 'axios';
import { connect } from 'react-redux';
import { addNewTeam, getMyTeams, userLogin } from '../ducks/reducer';
import TeamList from './TeamList.jsx';
import { Link } from 'react-router-dom';
import BackgroundTernary from '../components/BackgroundTernary.jsx';
import { requireLogin } from '../helpers/login_service';

class Team extends Component {

  constructor(props) {
    super(props);
    this.state = {
      teamName: '',
      memberEmail: '',
      teammates: [ 
        { id: this.props.userId, username: this.props.username }
      ],
      newTeammates: [],
      done: false,
      loggedIn: false,
      fieldsRequired: false,
      emailNotFound: false
    }
    this.add = this.add.bind(this);
    this.addTeam = this.addTeam.bind(this);
  }

  async componentDidMount() {
    await requireLogin(this.props.userLogin, this.props.history);
    let res = await axios.get('/api/teams');
    this.props.getMyTeams(res.data);
    this.setState({
      loading: false,
      loggedIn: true
    })
  }

  //this checks whether email is valid in db. If yes, it adds the user to the teammates array. 
  async add() {
    let res = await axios.get(`/api/member/?email=${this.state.memberEmail}`);
    if(res.data.found) {
      this.state.teammates.push(res.data);
      this.setState({
        memberEmail: ''
      })
    } else {
      this.setState({emailNotFound: true})
    }
  }

  //sends information we gathered in both inputs to back end to add team to db
  async addTeam() {
    const { teamName, teammates } = this.state;
    if(!teamName) {
      this.setState({
        fieldsRequired: true,
      })
    } else {
      this.props.addNewTeam(this.state.teammates);
      let res = await axios.post('/api/newteam', { name: teamName, team: [...teammates] } );
      this.setState({
        teammates: [{ id: this.props.userId, username: this.props.username }],
        done: true,
        teamName: ''
      })
      
      this.props.getMyTeams(res.data);
    }
  }

  //if you add someone by mistake to your team, this allows you to delete them
  deleteFromTeammates = (i) => {
    const { teammates } = this.state;
    teammates.splice(i, 1);
    this.setState({
      teammates: teammates
    })
  }

  render() {

    let team = this.state.teammates.map((user, i) => {
      return (
        <div className='flex' key={i}>
          <p className='m-1'>{user.username}</p>
          { user.username !== this.props.username ? 
            <button 
              onClick={ () => this.deleteFromTeammates(i) }
              className='ml-2 text-grey-dark'>
              X
            </button> : "" }        
        </div>
      )
    })

    return (
      <div>
         <div className='absolute pin-t z-10 w-full'>
          <Header />
        </div>
        <BackgroundTernary />
        <div className='absolute mt-20 flex flex-col lg:flex-row justify-center p-2 w-full'>
        {/* middle box */}

          <div className='flex flex-col w-full lg:w-2/5'>
            {/* form box */}
            <div className='bg-white shadow-lg p-6 rounded'>
              <div className='flex justify-center'>
                <div className='mt-4 text-xl'>Start a new team</div>
              </div>


              { !this.state.done ?
                <div>
                  <div className='flex justify-center'>
                    {this.state.fieldsRequired ? <div className='text-red-lighter mt-4'>Team name required</div> : ""}
                  </div>
                  <form className='flex flex-col p-2 lg:p-16'>
                    <label>Choose team name: </label>
                    <input
                      autoFocus="autofocus"
                      onChange={ (e) => this.setState({ teamName: e.target.value, fieldsRequired: false })} 
                      className='input-underlined focus:outline-none border-grey' 
                      type="text" 
                      value={ this.state.teamName }
                    />
                    <label className='my-4'>Enter new teammate's email: </label>
                    {this.state.emailNotFound ? <div className='text-red-lighter'>User not found!</div> : ""}
                    <div className='flex items-center w-full border-b border-grey'>
                      <input
                        onChange={ (e) => this.setState({ memberEmail: e.target.value, emailNotFound: false })} 
                        className='input focus:outline-none' 
                        type="text"
                        value={ this.state.memberEmail }/>
                      <button className='text-grey' onClick={ () => this.add() }>Add</button>
                    </div>
                    
                    <div className='flex flex-col'>
                      <p className='my-4'>Team members:</p>
                      <div>{team}</div>
                      <div className='flex justify-center'>
                        <div> 
                          <button 
                            className='btn-reg bg-blue hover:bg-blue-dark hover:border-blue-dark m-2' 
                            onClick={ () => this.addTeam() }>
                            Start Team
                          </button>
                        </div>
                      </div>
                      <div className='flex justify-center m-2'>
                        <Link to='/home'><button className='text-grey'>Cancel</button></Link>
                      </div>
                    </div>
                  </form>
                </div>
              :
                <div className='flex flex-col justify-center m-6'>
                  <div>Your team has been created!</div>
                  <div className='flex justify-center'>
                    <button className='btn-reg bg-blue hover:bg-blue-dark hover:border-blue-dark m-2' onClick={() => this.setState({done: false})}>Start Another team?</button>
                  </div>
                  <div className='flex justify-center m-2'>
                    <Link to='/home'><button className='text-grey'>Cancel</button></Link>
                  </div>
                </div> 
              }
            </div> 
          </div>
        
          {/* Individual user team list */}
          <div className='mt-8'>
            <TeamList />
          </div>

        </div>
      </div>
    );
  }
}
function mapState(state) {
  return {
    userId: state.userId,
    username: state.username,
    email: state.email
  }
}
export default connect(mapState, { addNewTeam, getMyTeams, userLogin })(Team);