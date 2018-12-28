DELETE FROM timelogs as t
USING tasks as ta, projects as p
WHERE p.id = $1 and p.id = ta.project_id and ta.id = t.task_id;