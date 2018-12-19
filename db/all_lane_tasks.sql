SELECT * FROM tasks
WHERE project_id = $1
AND status LIKE $2;