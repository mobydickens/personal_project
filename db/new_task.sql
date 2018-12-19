INSERT INTO tasks (project_id, lane_order, title, description, status, initial_estimate)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;