UPDATE tasks
SET lane_order = $2, status = $3
WHERE id = $1
RETURNING *; 