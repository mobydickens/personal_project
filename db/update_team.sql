UPDATE timelogs
SET spent_time = $2, estimate_change = $3, comment = $4
WHERE id = $1
RETURNING *; 