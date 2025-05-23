CREATE SCHEMA IF NOT EXISTS taskmanagement;
USE taskmanagement;

DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
	id int(11) not null auto_increment primary key,
    name varchar(150),
	created_at timestamp null default current_timestamp,
    updated_at timestamp null on update current_timestamp
);

CREATE TABLE tasks (
	id int(11) not null auto_increment primary key,
    name varchar(50)	,
    description text,
    user_id int(11),
    status tinyint,
	created_at timestamp null default current_timestamp,
    updated_at timestamp null on update current_timestamp,
	CONSTRAINT fk_tasks_user_id  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO
	users(name)
VALUES
	('User1'),
	('User2'),
	('User3');
    
INSERT INTO
	tasks(name, description, user_id, status)
VALUES
	('Tarea 1', 'Descripción de tarea 1', 1, 0),
	('Tarea 2', 'Descripción de tarea 2', 2, 0),
	('Tarea 3', 'Descripción de tarea 3', 3, 0);