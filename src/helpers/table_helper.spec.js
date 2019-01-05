import { firstEstimate, rows } from './table_helper';
import moment from 'moment';

describe ('calculating the initial estimate', () => {
  it ('should calculate the initial time estimate for 1 project based on all the estimates on each task', () => {
    const taskInfo = [{initial_estimate: "6"}, {initial_estimate: "4"}, {initial_estimate: "1"}, {initial_estimate: "6"}];
    const initialEstimate = firstEstimate(taskInfo);
    expect(initialEstimate).toEqual(17);
  })
}) 

describe ('creating an array of row objects for the table', () => {
  it ('should create a row from the data passed in', () => {
    let dateFormat = 'YYYY-MM-DD';
    let today = moment('2019-1-4', dateFormat).toDate();
    let rowsNeeded = 4;
    let initialEstimate = 22;
    let start_date = moment('2019-1-1', dateFormat).toDate();
    let timelogs = [
      {created_at: moment('2019-1-2', dateFormat).toDate(), spent_time: "6", estimate_change: "0"},
      {created_at: moment('2019-1-3', dateFormat).toDate(), spent_time: "5", estimate_change: "1"},
      {created_at: moment('2019-1-3', dateFormat).toDate(), spent_time: "7", estimate_change: "-3"}
    ];
    let daily_dev_hours = 6;
    let tableRows = rows(today, rowsNeeded, initialEstimate, start_date, timelogs, daily_dev_hours)
    expect(tableRows).toEqual(
      [
        {
          date: moment('2019-1-1', dateFormat).toDate(),
          expected_hours: 6, 
          spent_today: 0,
          currentEstimate: 22,
          percent_expected: 0.25,
          remaining_expected: 16.5,
          remaining_actual: 22
        },
        {
          date: moment('2019-1-2', dateFormat).toDate(),
          expected_hours: 6, 
          spent_today: 6,
          currentEstimate: 22,
          percent_expected: 0.50,
          remaining_expected: 11,
          remaining_actual: 16
        },
        {
          date: moment('2019-1-3', dateFormat).toDate(),
          expected_hours: 6, 
          spent_today: 12,
          currentEstimate: 20,
          percent_expected: 0.75,
          remaining_expected: 5,
          remaining_actual: 2
        },
        {
          date: moment('2019-1-4', dateFormat).toDate(),
          expected_hours: 6, 
          spent_today: 0,
          currentEstimate: 20,
          percent_expected: 1,
          remaining_expected: 0,
          remaining_actual: 2
        }
      ]
    )
  })
})