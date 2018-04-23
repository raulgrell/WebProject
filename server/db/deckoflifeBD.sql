CREATE TABLE PlayerGroup (
    id INT NOT NULL AUTO_INCREMENT UNIQUE,
    name_group VARCHAR(20) NOT NULL,
    CONSTRAINT pk_player_group PRIMARY KEY (id)
);

CREATE TABLE GroupMembership (
    id_group INT,
    id_player INT,
    CONSTRAINT fk_membership_group FOREIGN KEY (id_group)
        REFERENCES PlayerGroup (id),
    CONSTRAINT fk_membership_player FOREIGN KEY (id_player)
        REFERENCES Player (id)
);

CREATE TABLE Friendship (
    id INT NOT NULL AUTO_INCREMENT UNIQUE,
    id_player INT,
    id_friend INT,
    CONSTRAINT fk_friendship_player FOREIGN KEY (id_player)
        REFERENCES Player (id),
    CONSTRAINT fk_friendship_friend FOREIGN KEY (id_friend)
        REFERENCES Player (id),
    CONSTRAINT pk_friendship PRIMARY KEY (id , id_player)
);

CREATE TABLE PlayerCard (
    id INT NOT NULL AUTO_INCREMENT UNIQUE,
    id_player INT,
    id_group INT,
    is_played BOOLEAN,
    CONSTRAINT pk_deck PRIMARY KEY (id),
    CONSTRAINT fk_playercard_player FOREIGN KEY (id_player)
        REFERENCES Player (id),
    CONSTRAINT fk_playercard_group FOREIGN KEY (id_group)
        REFERENCES PlayerGroup (id)
);

CREATE TABLE Place (
    id INT NOT NULL AUTO_INCREMENT UNIQUE,
    place_name TEXT(20) NOT NULL,
    CONSTRAINT pk_places PRIMARY KEY (id)
);

CREATE TABLE Card (
    id INT NOT NULL AUTO_INCREMENT UNIQUE,
    id_place INT,
    card_name TEXT(20) NOT NULL,
    CONSTRAINT pk_card PRIMARY KEY (id),
    CONSTRAINT fk_card_place FOREIGN KEY (id_place)
        REFERENCES Place (id)
);

CREATE TABLE LocationDiscovered (
    id_player INT,
    id_place INT,
    CONSTRAINT fk_locationdiscovered_player FOREIGN KEY (id_player)
        REFERENCES Player (id),
    CONSTRAINT fk_locationdiscovered_place FOREIGN KEY (id_place)
        REFERENCES Place (id),
    is_favourite BOOLEAN
);



CREATE TABLE GameEvent (
    id INT NOT NULL AUTO_INCREMENT UNIQUE,
    Name TEXT(20) NOT NULL,
    date_event DATE,
    CONSTRAINT pk_game_events PRIMARY KEY (id)
);

CREATE TABLE EventsAttended (
    id_event INT,
    id_deck_card INT,
    CONSTRAINT fk_eventsattended_event FOREIGN KEY (id_event)
        REFERENCES gameEvent (id),
    CONSTRAINT fk_eventsattended_deck_card FOREIGN KEY (id_deck_card)
        REFERENCES PlayerCard (id)
);


INSERT INTO place(place_name) VALUES ('parque');

INSERT INTO card(id_place, card_name) VALUES (1, 'Visita ao Parque');

INSERT INTO gameevent(Name, date_event) VALUES ('Correr', '20170510');

INSERT INTO locationdiscovered(id_player, id_place, is_favourite) VALUES (1,1,1);

INSERT INTO playercard(id_player, id_group, is_played) VALUES (1, 1, 0);

INSERT INTO userinfo(id_player, email, pass) VALUES (2, 'jaquinzinho@hotmail.com', '123pass');




