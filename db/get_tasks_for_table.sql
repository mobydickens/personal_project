SELECT t.id as task_id, t.lane_order, t.status, t.initial_estimate, t.created_at from projects as p 
JOIN tasks as t ON p.id = t.project_id
WHERE p.id = $1;
