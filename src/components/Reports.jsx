import React, { Component } from 'react';
import LoggedInHeader from './LoggedInHeader.jsx';
import Table from './Table.jsx';
import { connect } from 'react-redux';
import { getTableArray, userLogin } from '../ducks/reducer';
import Plot from 'react-plotly.js';
import { Link } from 'react-router-dom';
import { requireLogin } from '../helpers/login_service';
import ProjectHeader from './ProjectHeader';
import OnTrack from './OnTrack.jsx';
import moment from 'moment';

class Reports extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      rerender: false
    }
  }

  //window was not rerendering chart and table upon resize. This contains an event listener to set state and trigger a new render upon resize. 
  async componentDidMount() {
    console.log("History: ", this.props.history);
    await requireLogin(this.props.userLogin, this.props.history);
    window.addEventListener('resize', this.resizeFunction);
  };
  
  //reusable resize function
  resizeFunction = () => {
    this.setState({
      rerender: true
    })
  }
  //removing the resize function when we navigate away from the page so it won't continually fire a new event listener
  //event listeners keep listening because they don't know when to stop firing unless specifically told
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFunction);
  };

  render() {
    let dateArray = this.props.tableArray.map(obj => {
      return moment(obj.date).format();
    })
    let expectedRemaining = this.props.tableArray.map(obj => {
      return Number((obj.remaining_expected).toFixed(2));
    })
    let actualRemaining = this.props.tableArray.filter(obj => {
      if(obj.remaining_actual !== "") {
      return true;
      } else {return false}
    }).map(obj => {
      return Number((obj.remaining_actual).toFixed(2));
    })
    return (
      <div>
        <LoggedInHeader />
          <div className='bg-grey-light h-full lg:h-screen'>
            <ProjectHeader />
            <Link to={`/project/${this.props.match.params.id}`}><i className="fas fa-arrow-left text-black m-4"></i></Link>
            {/* for large screen */}
            <div className='flex flex-col lg:flex-row justify-center'>
              <div className='w-1/2'>
                <div className='hidden lg:block border-b border-grey shadow-md bg-white'>
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
                    {
                      width: document.documentElement.clientWidth / 2, 
                      height: document.documentElement.clientHeight / 2, 
                      title: 'Progress chart', 
                      yaxis: { title: 'Hours' }, 
                      showlegend: true, 
                      legend: {x:1, y:1, xanchor:'auto'}, 
                      displayModeBar:false}
                    } 
                    config={{displayModeBar: false}}/>
                  </div>
                </div>
                  {/* //for small screen */}
                <div className='w-full lg:hidden shadow-md bg-white'>
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
                    {
                      width: document.documentElement.clientWidth , 
                      height: document.documentElement.clientHeight / 2, 
                      title: 'Progress chart', 
                      yaxis: { title: 'Hours' }, 
                      showlegend: true, 
                      legend: {x:1, y:1, xanchor:'auto'}, 
                      displayModeBar:false}
                    } 
                  config={{displayModeBar: false}}/>
                </div>

                <div className='lg:block'>
                  <Table id={this.props.match.params.id}/>
                </div>
            </div>
            <OnTrack />
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
export default connect(mapState, { getTableArray, userLogin })(Reports);