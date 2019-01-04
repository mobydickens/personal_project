import { firstEstimate, rows } from './table_helper';
import moment from 'moment';

describe ('calculating the initial estimate', () => {
  it ('should calculate the initial time estimate for 1 project based on all the estimates on each task', () => {
    const taskInfo = [{initial_estimate: "6"}, {initial_estimate: "4"}, {initial_estimate: "1"}, {initial_estimate: "6"}];
    const initialEstimate = firstEstimate(taskInfo);
    expect(initialEstimate).toEqual(17);
  })
}) 