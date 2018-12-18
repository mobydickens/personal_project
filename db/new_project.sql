INSERT INTO projects (team_id, title, description, daily_hours, start_date)
VALUES
  ($1, $2, $3, $4, $5)
RETURNING *;