UPDATE projects
SET description = $2
WHERE id = $1
RETURNING *; 