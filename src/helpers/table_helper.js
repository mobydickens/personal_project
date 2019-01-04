import moment from 'moment';

//THIS FUNCTION IS FOR GETTING THE AMOUNT OF ROWS FOR THE TABLE
//task info and daily dev hours are passed in from state in Table Component
export let firstEstimate= function(taskInfo) {
  let initialEstimate = 0;
  //getting initial estimate for the entire project, calculated from the initial estimates on EACH task
  for (let i = 0; i < taskInfo.length; i++) {
    initialEstimate += Number(taskInfo[i].initial_estimate);
  }
  return initialEstimate;
}

export let rows = function(today, rowsNeeded, initialEstimate, start_date, timelogs, daily_dev_hours) {
  let rows = [];
  let devHours_expected = 0;
  let devHours_actual = 0
  let date = moment(start_date); 
 
  let logDate = 0;
  today.setHours(0,0,0,0);
//configuring how many hours were spent EACH DAY
  for (let i = 1; i <= rowsNeeded; i++) {
    devHours_expected += daily_dev_hours;
    let actual_hours_today = 0;
    let currentEstimate = initialEstimate;
      
    for (let j = 0; j < timelogs.length; j++) {
      let logged_date = moment(timelogs[j].created_at).format('L'); 
      logDate = new Date(logged_date);
      if( logged_date === date.format('L') ) {
        actual_hours_today += Number(timelogs[j].spent_time);
      }

      //calculate current estimate per day for the rows (only need to recalculate if the date is NOW or later)
      if( logDate <= date.toDate() ) {
        currentEstimate += Number(timelogs[j].estimate_change);
      }
    }

    //get dates for column, skipping weekends (Sat/Sun)
    let dateCheck = date.format('dddd');
    if(dateCheck.includes("Saturday")) {
      date.add(2, 'days');
    }

    //calculate expected % of project that is expected to be complete based on dev hours per day that we alloted to work
    let percent_expected = Number( devHours_expected / (daily_dev_hours * rowsNeeded ));
    devHours_actual += actual_hours_today;

    //calculated expected hours remaining to finish project
    let expected_hrs_remaining = currentEstimate * (1 - percent_expected);
    if(expected_hrs_remaining < 0) {
      expected_hrs_remaining = 0;
    }
  
    // estimate actual hours remaining to finish project
    let actual_hrs_remaining = currentEstimate - devHours_actual;
    if(expected_hrs_remaining < 0) {
      expected_hrs_remaining = 0;
    };

    // push all of the data to the array
    rows.push( { 
      date: date.clone(), 
      expected_hours: daily_dev_hours, 
      spent_today: ( date.toDate() <= today ? actual_hours_today : "" ), 
      currentEstimate: ( date.toDate() <= today ? currentEstimate : "" ),
      percent_expected: percent_expected,
      remaining_expected: expected_hrs_remaining,
      remaining_actual: ( date.toDate() <= today ? actual_hrs_remaining : "" ) })

    date.add(1, 'day');
  }
  return rows;
}

