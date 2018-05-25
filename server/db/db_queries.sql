-- All locations discovered by user
SELECT
  player.display_name   as `player_display_name`,
  location.display_name as `location_display_name`,
  location.description  as `location_description`
FROM discovered
  INNER JOIN player ON player.id_player = discovered.id_player
  INNER JOIN location ON location.id_location = discovered.id_location
WHERE player.id_player = ?;

-- All locations available to user
WITH discovered_locations AS (
    SELECT id_location
    FROM discovered
    WHERE id_player = ?
)
SELECT location.*
FROM location
  INNER JOIN discovered_locations
    ON location.id_parent = discovered_locations.id_location;

-- All cards played by user
SELECT
  player.display_name   AS player_display_name,
  card.display_name     AS card_display_name,
  location.display_name AS location_display_name
FROM playercard
  INNER JOIN player ON player.id_player = playercard.id_player
  INNER JOIN card ON card.id_card = playercard.id_card
  INNER JOIN location ON location.id_location = card.id_location
WHERE
  player.id_player = 1
  AND is_played = TRUE;

-- All cards available to user (cards from locations the user has visited)
WITH discovered_locations AS (
    SELECT id_location
    FROM discovered
    WHERE id_player = ?
          AND is_visited = TRUE
)
SELECT *
FROM discovered_locations
  LEFT JOIN card ON discovered_locations.id_location = card.id_location;

-- All group activities participated in
WITH player_group AS (
    SELECT `group`.id_group
    FROM `group`
      INNER JOIN member ON member.id_group = `group`.id_group
    WHERE id_player = ?
)
SELECT *
FROM player_group
  LEFT JOIN playercard ON player_group.id_group = playercard.id_group;

-- All groups a player belongs to
SELECT
  `group`.id_group,
  `group`.display_name
FROM `group`
  INNER JOIN member ON member.id_group = `group`.id_group
WHERE id_player = ?;

-- Player's most recent group
SELECT `group`.display_name
FROM `group`
  INNER JOIN member ON member.id_group = `group`.id_group
WHERE id_player = ?
ORDER BY `group`.id_group DESC
LIMIT 1;

-- All friends who have the card in the player's group slot
WITH friends AS (
    SELECT *
    FROM friendship
    WHERE id_player = ? OR id_friend = ?
)
SELECT *
FROM friends;

-- All friends holding a given card
-- All friends who have a hand card in common

-- All locations favourited by friends
-- All locations discovered by friends
-- All locations visited by friends
-- All cards played by friends

-- All locations discovered bu members of a group
-- All locations visited bu members of a group
-- All cards played by members of a group

-- All players who a player has been in a group with

-- Aggregates

-- How many cards each player has played
-- How many unique cards each player has played
-- How many locations each player has discovered
-- How many groups each player has participated in
-- How many players have been in the groups

-- Set discovered location as favourite

-- Deal Card
INSERT INTO playercard (id_card, id_player, id_group, is_played)
WITH discovered_locations AS (
    SELECT id_location, id_player
    FROM discovered
    WHERE id_player = ? AND is_visited = TRUE
), available_cards AS (
    SELECT card.id_card, discovered_locations.id_player
    FROM discovered_locations
      LEFT JOIN card ON discovered_locations.id_location = card.id_location
)
SELECT
  available_cards.id_card,
  available_cards.id_player,
  NULL AS id_group,
  FALSE AS is_played from available_cards
ORDER BY RAND() LIMIT 1;

-- Drop Card
    SELECT
      card.*
    FROM playercard
      INNER JOIN player ON player.id_player = playercard.id_player
      INNER JOIN card ON card.id_card = playercard.id_card
    WHERE
      player.id_player = 1 AND
      playercard.state = 'Played';

    UPDATE playercard
      SET state = 'Played'
    WHERE id_playercard = 2;

-- Hold Card
