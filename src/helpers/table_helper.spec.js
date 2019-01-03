import { tableRowsNeeded } from './table_helper';

describe ('rows needed', () => {
  it ('should calculate the initial time estimate for 1 project based on all the estimates on each task', () => {
    const taskInfo = [{initial_estimate: "6"}, {initial_estimate: "4"}, {initial_estimate: "1"}, {initial_estimate: "6"}];
    const initialEstimate = tableRowsNeeded(taskInfo);
    expect(initialEstimate).toEqual(17);
  })
}) 