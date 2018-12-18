SELECT t.name, t.id FROM users as u
JOIN users_and_teams as ut ON u.id = ut.user_id
JOIN teams as t ON t.id = ut.team_id 
WHERE u.id = $1;