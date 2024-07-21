DROP DATABASE IF EXISTS songs_prod;
CREATE DATABASE songs_prod;

\c songs_prod;

CREATE TABLE songs (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 artist TEXT NOT NULL,
 album TEXT,
 time TEXT,
 is_favorite BOOLEAN
 
);