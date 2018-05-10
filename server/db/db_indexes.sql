

ALTER TABLE `Player` ADD CONSTRAINT pk_player PRIMARY KEY (id_player);
ALTER TABLE `PlayerUser` ADD CONSTRAINT pk_user PRIMARY KEY (id_user);
ALTER TABLE `Group` ADD CONSTRAINT pk_group PRIMARY KEY (id_group);
ALTER TABLE `Member` ADD CONSTRAINT pk_member PRIMARY KEY (id_member);
ALTER TABLE `Friendship` ADD CONSTRAINT pk_friendship PRIMARY KEY (id_friendship);
ALTER TABLE `Card` ADD CONSTRAINT pk_card PRIMARY KEY (id_card);
ALTER TABLE `PlayerCard` ADD CONSTRAINT pk_playercard PRIMARY KEY (id_playercard);
ALTER TABLE `Location` ADD CONSTRAINT pk_location PRIMARY KEY (id_location);
ALTER TABLE `Event` ADD CONSTRAINT pk_event PRIMARY KEY (id_event);