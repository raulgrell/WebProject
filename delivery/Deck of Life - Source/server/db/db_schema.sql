create database DeckOfLife;

-- Players
CREATE TABLE Player (
    id_player INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
    display_name VARCHAR(50),
    age SMALLINT
    -- CONSTRAINT pk_player PRIMARY KEY (id)
);

-- Users
CREATE TABLE PlayerUser (
    id_user INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
    id_player INTEGER,
    email VARCHAR(50) NOT NULL UNIQUE,
    pass VARCHAR(50) NOT NULL
    -- CONSTRAINT pk_user PRIMARY KEY (id),
    -- CONSTRAINT fk_user_player FOREIGN KEY (id_player) REFERENCES Player(id_player)
);

-- Groups
CREATE TABLE PlayerGroup (
    id_group INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
    display_name VARCHAR(20) NOT NULL
    -- CONSTRAINT pk_playergroup PRIMARY KEY (id)
);

-- Memberships
CREATE TABLE GroupMember (
    id_member INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
    id_player INTEGER NOT NULL,
    id_group INTEGER NOT NULL
    -- CONSTRAINT pk_member PRIMARY KEY (id),
    -- CONSTRAINT fk_member_player FOREIGN KEY (id_player) REFERENCES Player(id_player),
    -- CONSTRAINT fk_member_group FOREIGN KEY (id_group) REFERENCES Group(id_group)
);

-- Friends
CREATE TABLE Friendship (
    id_friendship INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
    id_player INTEGER,
    id_friend INTEGER
    -- CONSTRAINT pk_friendship PRIMARY KEY (id, id_player),
    -- CONSTRAINT fk_player FOREIGN KEY (id_player) REFERENCES Player(id),
    -- CONSTRAINT fk_friend FOREIGN KEY (id_friend) REFERENCES Player(id),
);

-- Cards
CREATE TABLE Cards (
    id_card INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
    id_location INTEGER,
    card_name VARCHAR(20) NOT NULL
    -- CONSTRAINT pk_card PRIMARY KEY (id),
);

-- PlayerCards
CREATE TABLE PlayerCard (
    id_playercard INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
    id_player INTEGER,
    id_group INTEGER,
    is_played BOOLEAN
    -- CONSTRAINT pk_deck PRIMARY KEY (id),
    -- CONSTRAINT fk_player FOREIGN KEY (id_player) REFERENCES Player(id),
    -- CONSTRAINT fk_group FOREIGN KEY (id_group) REFERENCES Groups(id)
);


-- Location
CREATE TABLE Location (
    id_location INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
    display_name VARCHAR(20) NOT NULL
    -- CONSTRAINT pk_locations PRIMARY KEY (id_location)
);


-- Discovered
CREATE TABLE LocationDiscovered (
    id_discovered INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
    id_player INTEGER,
    id_location INTEGER,
    is_favourite BOOLEAN
    -- CONSTRAINT fk_discovery_player FOREIGN KEY (id_player) REFERENCES Player(id_player),
    -- CONSTRAINT fk_discovery_location FOREIGN KEY (id_location) REFERENCES Location(id_location)
);


-- Events
CREATE TABLE Event (
    id_event INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
    display_name VARCHAR(20) NOT NULL,
    date_event date
    -- CONSTRAINT pk_game_events PRIMARY KEY (id)
);


-- Attended
CREATE TABLE EventAttended (
    id_attended INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
    id_event INTEGER,
    id_deck_card INTEGER
    -- CONSTRAINT pk_attended
    -- CONSTRAINT fk_attended_event FOREIGN KEY (id_event) REFERENCES Event (id_event),
    -- CONSTRAINT fk_attended_card FOREIGN KEY (id_deck_card) REFERENCES PlayerCard (id_playercard)
);
