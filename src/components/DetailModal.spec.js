// import { calculateEstimate } from './DetailModal';

describe ('calculate estimates in the detail modal', () => {
  it ('should calculate the total estimate from just the timelogs', () => {
    const logs = [3, 4, 1.5, -2];
    const reduced = logs.reduce((accumulator, logValue) => {
      return accumulator + logValue;
    }, 0)
    expect(reduced).toEqual(6.5);
    expect(reduced).toBeDefined();
  })
  it ('should equal current estimate for a task from both the timelogs and the initial estimate', () => {
    const initial_estimate = 10;
    const currentEstimate = 6.5 + initial_estimate;
    expect(currentEstimate).toEqual(16.5);
  })
})

describe ('will calculate time spent and hours remaining', () => {
  it ('should return a number adding all of the timelogs for one task', () => {
    const logs = [2, 2, 0.5, 1];
    let timeSpent = logs.reduce((accumulator, logValue) => {
        return accumulator + logValue
      }, 0);
    expect(timeSpent).toEqual(5.5);
  })
  it ('should return a number that tells how many hours are left to spend', () => {
    let remaining = 16.5 - 5.5;
    expect(remaining).toEqual(11);
  })
})


// THE FUNCTIONS I'M TRYING TO TEST ARE BELOW _ THEY COME FROM DETAIL_MODAL

// export function calculateEstimate() {
//   return logs.reduce((accumulator, logValue) => {
//     return accumulator + +logValue.estimate_change;
//   }, 0)
// }

// let currentEstimate = +task.initial_estimate + calculateEstimate();

// let timeSpent = function() {
//   return logs.reduce((acc, logValue) => {
//     return Number((acc + +logValue.spent_time).toFixed(2));
//   }, 0)
// }();

// let remaining = Number((currentEstimate - timeSpent).toFixed(2));