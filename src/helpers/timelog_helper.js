
//this function calculates what the ALL logs say the estimate change adds up to be. 
export function calculateEstimate(logs) {
  return logs.reduce((accumulator, logValue) => {
    return accumulator + +logValue.estimate_change;
  }, 0)
}

export function calculateSpent(logs) {
  return logs.reduce((accumulator, logValue) => {
    return accumulator + +logValue.spent_time;
  }, 0)
};