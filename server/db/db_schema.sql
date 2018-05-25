create database DeckOfLife;

-- Players
CREATE TABLE Player (
    id_player INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
    display_name VARCHAR(50),
    age SMALLINT,
    email VARCHAR(255),
    `password` VARCHAR(255)
);

-- Groups
CREATE TABLE PlayerGroup (
    id_group INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
    display_name VARCHAR(20) NOT NULL
);

-- Memberships
CREATE TABLE GroupMember (
    id_member INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
    id_player INTEGER NOT NULL,
    id_group INTEGER NOT NULL
);

-- Friends
CREATE TABLE Friendship (
    id_friendship INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
    id_player INTEGER,
    id_friend INTEGER
);

-- Cards
CREATE TABLE Cards (
    id_card INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
    id_location INTEGER,
    display_name VARCHAR(20) NOT NULL
);

-- PlayerCards
CREATE TABLE PlayerCard (
    id_playercard INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
    id_player INTEGER,
    id_group INTEGER,
    `state` BOOLEAN
);

-- Location
CREATE TABLE Location (
    id_location INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
    display_name VARCHAR(20) NOT NULL
);

-- Discovered
CREATE TABLE LocationDiscovered (
    id_discovered INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
    id_player INTEGER,
    id_location INTEGER,
    is_favourite BOOLEAN
);

-- Events
CREATE TABLE `Event` (
    id_event INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
    display_name VARCHAR(20) NOT NULL,
    date_event date
);

-- Attended
CREATE TABLE Encounter (
    id_attended INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
    id_event INTEGER,
    id_card INTEGER
);
