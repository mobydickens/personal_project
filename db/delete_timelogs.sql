DELETE FROM timelogs
WHERE task_id = $1




-- DELETE FROM timelogs as t
-- USING tasks as ta, projects as p
-- WHERE p.id = 70 and p.id = ta.project_id and ta.id = t.task_id;

-- INSERT INTO timelogs (task_id, user_id, spent_time, estimate_change, comment)
-- VALUES 
-- (44, 6, 1, 0, 'comment comment'),
-- (44, 6, 1, 0, 'comment 2'),
-- (44, 6, 1, 0, 'comment 3'),
-- (44, 6, 1, 0, 'comment 4'),
-- (44, 6, 1, 0, 'comment 5'),
-- (44, 6, 1, 0, 'comment 6');