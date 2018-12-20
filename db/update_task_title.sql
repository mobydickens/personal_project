UPDATE tasks
SET title = $1
WHERE id = $2
RETURNING *; 