-- Players
ALTER TABLE Player ADD CONSTRAINT pk_player PRIMARY KEY (id_player);

-- Users
ALTER TABLE PlayerUser ADD CONSTRAINT pk_user PRIMARY KEY (id_user);
ALTER TABLE PlayerUser ADD CONSTRAINT fk_user_player FOREIGN KEY (id_player) REFERENCES Player(id_player);

-- Groups
ALTER TABLE PlayerGroup ADD CONSTRAINT pk_group PRIMARY KEY (id_group);

-- Memberships
ALTER TABLE GroupMembership ADD CONSTRAINT pk_member PRIMARY KEY (id_member);
ALTER TABLE GroupMembership ADD CONSTRAINT fk_member_player FOREIGN KEY (id_player) REFERENCES Player(id_player);
ALTER TABLE GroupMembership ADD CONSTRAINT fk_member_group FOREIGN KEY (id_group) REFERENCES PlayerGroup(id_group);

-- Friends
ALTER TABLE Friendship ADD CONSTRAINT pk_friendship PRIMARY KEY (id_friendship);
ALTER TABLE Friendship ADD CONSTRAINT fk_friendship_player FOREIGN KEY (id_player) REFERENCES Player(id_player);
ALTER TABLE Friendship ADD CONSTRAINT fk_friendship_friend FOREIGN KEY (id_friend) REFERENCES Player(id_player);

-- Cards
ALTER TABLE Cards ADD CONSTRAINT pk_card PRIMARY KEY (id_card);
ALTER TABLE Cards ADD CONSTRAINT fk_card_location FOREIGN KEY (id_location) REFERENCES Location(id_location);

-- PlayerCards
ALTER TABLE PlayerCard ADD CONSTRAINT pk_playercard PRIMARY KEY (id_playercard);
ALTER TABLE PlayerCard ADD CONSTRAINT fk_playercard_player FOREIGN KEY (id_player) REFERENCES Player(id_player);
ALTER TABLE PlayerCard ADD CONSTRAINT fk_playercard_group FOREIGN KEY (id_group) REFERENCES PlayerGroup(id_group);

-- Location
ALTER TABLE Location ADD CONSTRAINT pk_location PRIMARY KEY (id_location);

-- Discovered
ALTER TABLE LocationDiscovered ADD CONSTRAINT fk_discovery_player FOREIGN KEY (id_player) REFERENCES Player(id_player);
ALTER TABLE LocationDiscovered ADD CONSTRAINT fk_discovery_location FOREIGN KEY (id_location) REFERENCES Location(id_location);

-- Events
ALTER TABLE Event ADD CONSTRAINT pk_event PRIMARY KEY (id_event);

-- Attended
ALTER TABLE EventAttended ADD CONSTRAINT fk_attended_event FOREIGN KEY (id_event) REFERENCES Event (id_event);
ALTER TABLE EventAttended ADD CONSTRAINT fk_attended_card  FOREIGN KEY (id_deck_card) REFERENCES PlayerCard (id_playercard);