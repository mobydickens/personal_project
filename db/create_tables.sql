CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL UNIQUE,
  hash_value TEXT NOT NULL
);

CREATE TABLE teams (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(45) NOT NULL
);

CREATE TABLE users_and_teams (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER NOT NULL,
  team_id INTEGER NOT NULL,
  FOREIGN KEY user_id REFERENCES users(id),
  FOREIGN KEY team_id REFERENCES teams(id)
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY NOT NULL,
  team_id INTEGER NOT NULL,
  title VARCHAR(45) NOT NULL,
  description VARCHAR(300),
  start_date DATE NOT NULL,
  daily_hours INTEGER NOT NULL,
  FOREIGN KEY team_id REFERENCES teams(id)
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY NOT NULL,
  project_id INTEGER NOT NULL,
  lane_order INTEGER NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  status TEXT NOT NULL,
  initial_estimate DECIMAL NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  FOREIGN KEY project_id REFERENCES projects(id)
);

CREATE TABLE timelogs (
  id SERIAL PRIMARY KEY NOT NULL,
  task_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  spent_time DECIMAL NOT NULL,
  estimate_change DECIMAL NOT NULL,
  comment VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  FOREIGN KEY user_id REFERENCES users(id),
  FOREIGN KEY task_id REFERENCES tasks(id)
);