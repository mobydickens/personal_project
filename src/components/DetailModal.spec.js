// import { calculateEstimate } from './DetailModal';

describe ('calculate estimate function in the detail modal', () => {
  it ('should calculate the total estimate of time for a task from the initial estimate and timelogs', () => {
    const logs = [3, 4, 1.5, -2];
    const reduced = logs.reduce((accumulator, logValue) => {
      return accumulator + logValue;
    }, 0)
    expect(reduced).toEqual(6.5);
    expect(reduced).toBeDefined();
  })
})

describe ('calculate current estimate for a task', () => {
  it ('should equal current estimate for a task', () => {
    const initial_estimate = 10;
    const currentEstimate = 6.5 + initial_estimate;
    expect(currentEstimate).toEqual(16.5);
  })
})

describe ('function returns the time spent executing a task', () => {
  it ('should return a number adding all of the timelogs for one task', () => {
    const logs = [2, 2, 0.5, 1];
    let timeSpent = logs.reduce((accumulator, logValue) => {
        return accumulator + logValue
      }, 0);
    expect(timeSpent).toEqual(5.5);
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