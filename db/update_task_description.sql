UPDATE tasks
SET description = $1
WHERE id = $2
RETURNING *; 