SELECT t.name, p.id, p.title, p.description, p.start_date FROM users as u
JOIN users_and_teams as ut ON u.id = ut.user_id
JOIN teams as t ON t.id = ut.team_id
JOIN projects as p ON p.team_id = t.id
WHERE u.id = $1;