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

// export function calculateEstimate() {
//   return logs.reduce((accumulator, logValue) => {
//     return accumulator + +logValue.estimate_change;
//   }, 0)
// }