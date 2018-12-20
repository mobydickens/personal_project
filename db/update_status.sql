UPDATE tasks
SET status = $1
WHERE id = $2
RETURNING *; 