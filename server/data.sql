CREATE DATABASE todoapp;

CREATE TABLE todos (
    id VARCHAR(255) PRIMARY KEY, 
    user_email varchar(255),
    title varchar(30),
    progress int,
    date varchar(300)
);

CREATE TABLE users (
    email varchar(255) primary key,
    hashed_password varchar(255)
);
