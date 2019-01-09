DELETE FROM timelogs
WHERE task_id = $1

-- INSERT INTO timelogs (task_id, user_id, spent_time, estimate_change, comment)
-- VALUES 
-- (44, 6, 1, 0, 'comment comment'),
-- (44, 6, 1, 0, 'comment 2'),
-- (44, 6, 1, 0, 'comment 3'),
-- (44, 6, 1, 0, 'comment 4'),
-- (44, 6, 1, 0, 'comment 5'),
-- (44, 6, 1, 0, 'comment 6');