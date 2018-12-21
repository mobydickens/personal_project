DELETE FROM users_and_teams
WHERE user_id = $2
AND team_id = $1;