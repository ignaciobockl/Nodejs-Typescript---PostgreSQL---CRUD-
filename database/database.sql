CREATE DATABASE firstapi;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email TEXT
);

INSERT INTO users (name, email)
    VALUES ('nacho', 'nacho@gmail.com'),
           ('nachotta', 'nachotta@gmail.com'),
           ('esmeralda', 'esmeralda@gmail.com');