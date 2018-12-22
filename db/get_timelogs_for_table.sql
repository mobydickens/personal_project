SELECT l.spent_time, l.estimate_change, l.created_at FROM tasks as t 
JOIN timelogs as l ON l.task_id = t.id
WHERE t.project_id = $1;
