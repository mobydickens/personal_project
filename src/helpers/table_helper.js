
//THIS FUNCTION IS FOR GETTING THE AMOUNT OF ROWS FOR THE TABLE
//task info and daily dev hours are passed in from state in Table Component
export let tableRowsNeeded = function(taskInfo) {
  let initialEstimate = 0;
  //getting initial estimate for the entire project, calculated from the initial estimates on EACH task
  for (let i = 0; i < taskInfo.length; i++) {
    initialEstimate += Number(taskInfo[i].initial_estimate);
  }
  return initialEstimate;
}

