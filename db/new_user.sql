INSERT INTO users (email, username, hash_value)
VALUES ($1, $2, $3)
RETURNING *;