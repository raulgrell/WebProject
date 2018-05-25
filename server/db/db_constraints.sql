ALTER TABLE `Player` ADD CONSTRAINT pk_player PRIMARY KEY (id_player);
ALTER TABLE `Friendship` ADD CONSTRAINT pk_friendship PRIMARY KEY (id_friendship);
ALTER TABLE `Location` ADD CONSTRAINT pk_location PRIMARY KEY (id_location);
ALTER TABLE `Group` ADD CONSTRAINT pk_group PRIMARY KEY (id_group);
ALTER TABLE `Card` ADD CONSTRAINT pk_card PRIMARY KEY (id_card);
ALTER TABLE `PlayerCard` ADD CONSTRAINT pk_playercard PRIMARY KEY (id_playercard);
ALTER TABLE `Member` ADD CONSTRAINT pk_member PRIMARY KEY (id_member);
ALTER TABLE `Event` ADD CONSTRAINT pk_event PRIMARY KEY (id_event);
ALTER TABLE `Encounter` ADD CONSTRAINT pk_encounter PRIMARY KEY (id_encounter);

-- Member -> Player + Group
ALTER TABLE Member ADD CONSTRAINT fk_member_player FOREIGN KEY (id_player) REFERENCES Player (id_player);
ALTER TABLE Member ADD CONSTRAINT fk_member_group FOREIGN KEY (id_group) REFERENCES `Group` (id_group);

-- Friend -> Player + Player
ALTER TABLE Friendship ADD CONSTRAINT fk_friendship_player FOREIGN KEY (id_player) REFERENCES Player (id_player);
ALTER TABLE Friendship ADD CONSTRAINT fk_friendship_friend FOREIGN KEY (id_friend) REFERENCES Player (id_player);

-- Card -> Location
ALTER TABLE Card ADD CONSTRAINT fk_card_location FOREIGN KEY (id_location) REFERENCES Location (id_location);

-- PlayerCards -> Player + Group
ALTER TABLE PlayerCard ADD CONSTRAINT fk_playercard_player FOREIGN KEY (id_player) REFERENCES Player (id_player);
ALTER TABLE PlayerCard ADD CONSTRAINT fk_playercard_group FOREIGN KEY (id_group) REFERENCES `Group` (id_group);

-- Discovered -> Player + Location
ALTER TABLE Discovered ADD CONSTRAINT fk_discovery_player FOREIGN KEY (id_player) REFERENCES Player (id_player);
ALTER TABLE Discovered ADD CONSTRAINT fk_discovery_location FOREIGN KEY (id_location) REFERENCES Location (id_location);

-- Attended -> Event + PlayerCard
ALTER TABLE Attended ADD CONSTRAINT fk_attended_event FOREIGN KEY (id_event) REFERENCES Event (id_event);
ALTER TABLE Attended ADD CONSTRAINT fk_attended_card  FOREIGN KEY (id_playercard) REFERENCES PlayerCard (id_playercard);
