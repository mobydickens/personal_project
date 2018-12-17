CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL UNIQUE,
  hash_value TEXT NOT NULL
);

INSERT INTO users (username, email, hash_value)
VALUES 
('mrsshepherd', 'mrsshep@email.com', 'testpassword'),
('mrshep', 'mrshep@email.com', 'testpassword'),
('karen', 'karen@email.com', 'testpassword'),
('hal', 'hal@email.com', 'testpassword');

CREATE TABLE teams (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(45) NOT NULL
);

INSERT INTO teams (name)
VALUES
  ('Team Awesome'),
  ('Team Super Duper Awesome');

CREATE TABLE users_and_teams (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER NOT NULL,
  team_id INTEGER NOT NULL,
  FOREIGN KEY user_id REFERENCES users(id),
  FOREIGN KEY team_id REFERENCES teams(id)
);

INSERT INTO (user_id, team_id)
VALUES
  (7, 1),
  (7, 2),
  (6, 1),
  (6, 2),

CREATE TABLE projects (
  id SERIAL PRIMARY KEY NOT NULL,
  team_id INTEGER NOT NULL,
  title VARCHAR(45) NOT NULL,
  description VARCHAR(300),
  start_date DATE NOT NULL,
  daily_hours INTEGER NOT NULL,
  FOREIGN KEY team_id REFERENCES teams(id)
);

INSERT INTO projects (team_id, title, description, start_date, daily_hours)
VALUES
  (1, 'My First Project', 'A project for the masses', '2018-12-17', 6),
  (1, 'My Second Project', 'A project for individuals', '2018-12-17', 6),
  (2, 'My Fourth Project', 'A project to figure out which are better: Starks or Baratheons?', '2018-12-17', 6),
  (2, 'My Fifth Project', 'A project about code', '2018-12-17', 5),
  (2, 'My Sixth Project', 'A project to learn redux', '2018-12-17', 8);


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