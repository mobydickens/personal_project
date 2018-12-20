SELECT t.*, u.username from timelogs as t
JOIN users as u ON u.id = t.user_id
WHERE task_id = $1
ORDER BY t.created_at;