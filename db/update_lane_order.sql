UPDATE tasks
SET lane_order = $2
WHERE id = $1
RETURNING *; 