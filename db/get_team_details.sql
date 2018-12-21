SELECT u.username from users_and_teams as ut
JOIN teams as t ON t.id = ut.team_id
JOIN users as u ON u.id = ut.user_id
WHERE t.id = $1;