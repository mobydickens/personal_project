UPDATE tasks
SET 
  title = $3,
  description = $4,
  initial_estimate = $5
WHERE id = $1
AND project_id = $2;