import { calculateEstimate, calculateSpent } from './timelog_helper';

describe ('calculate estimates in the detail modal', () => {
  it ('should calculate the total estimate from just the timelogs', () => {
    const logs = [
      {estimate_change: "3"}, 
      {estimate_change: "4"}, 
      {estimate_change: ".5"}, 
      {estimate_change: "-2"}
    ];
    const estimate = calculateEstimate(logs);
    expect(estimate).toEqual(5.5);
  })
  it ('should return 0 if no timelogs are given', () => {
    const logs = [];
    const estimate = calculateEstimate(logs);
    expect(estimate).toEqual(0);
  })
})

describe ('will calculate time spent and hours remaining', () => {
  it ('should return a number adding all of the timelogs for one task', () => {
    const logs = [
      {spent_time: "2"}, 
      {spent_time: "3"}, 
      {spent_time: ".2"}, 
      {spent_time: "1"}
    ];
    const spent = calculateSpent(logs);
    expect(spent).toEqual(6.2);
  })
  it ('should return 0 if no time has been spent', () => {
    const logs = [];
    const spent = calculateSpent(logs);
    expect(spent).toEqual(0);
  })
})