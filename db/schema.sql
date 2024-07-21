DROP DATABASE IF EXISTS songs_db;
CREATE DATABASE songs_db;

\c songs_db;

CREATE TABLE songs (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 artist TEXT NOT NULL,
 album TEXT,
 time TEXT,
 is_favorite BOOLEAN
 
);