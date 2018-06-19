-- MySQL dump 10.16  Distrib 10.2.14-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: web
-- ------------------------------------------------------
-- Server version	10.2.14-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `card`
--

DROP TABLE IF EXISTS `card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `card` (
  `id_card` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_location` int(11) DEFAULT NULL,
  `display_name` varchar(255) DEFAULT NULL,
  `action` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `img_card` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_card`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card`
--

LOCK TABLES `card` WRITE;
/*!40000 ALTER TABLE `card` DISABLE KEYS */;
INSERT INTO `card` VALUES (1,1,'Watch TV','Watch TV','Catch up on a series!','/static/1.png'),(2,2,'A Walk','Go for a walk','Check out the area','/static/2.png'),(3,3,'Jogging','Jog in the park','Get that blood pumpin','/static/3.png'),(4,2,'Pump Iron','Go to the gym','Pump some iron','/static/4.png'),(5,3,'3v3 Basketball','3v3 Basketball','Claim the court!','/static/5.png'),(6,1,'LAN Party','Host a LAN Party','rek sum n00bs','/static/6.png'),(7,5,'Gourmet Groceries','Buy exotic ingredients','Get some stuff for food','/static/7.png'),(8,7,'Murder','Kill some teens','Their parents are asleep','/static/8.png'),(9,4,'Read','Read a book','Read a book','/static/9.png'),(10,1,'Take a Peek!','Look out the window','It\'s quite nice out there','/static/10.png'),(11,2,'Zombies','Prepare for zombies','Pretend there is a zombie apocalypse','/static/11.png');
/*!40000 ALTER TABLE `card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discovered`
--

DROP TABLE IF EXISTS `discovered`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `discovered` (
  `id_discovered` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_player` int(11) DEFAULT NULL,
  `id_location` int(11) DEFAULT NULL,
  `is_favourite` tinyint(1) DEFAULT NULL,
  `is_visited` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id_discovered`),
  UNIQUE KEY `u_discovered_location_player` (`id_location`,`id_player`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discovered`
--

LOCK TABLES `discovered` WRITE;
/*!40000 ALTER TABLE `discovered` DISABLE KEYS */;
INSERT INTO `discovered` VALUES (1,1,1,1,1,NULL,NULL),(2,1,2,1,1,NULL,NULL),(3,1,3,0,0,NULL,NULL),(10,2,1,1,1,NULL,NULL),(11,2,2,0,0,NULL,NULL),(12,1,5,0,0,NULL,NULL);
/*!40000 ALTER TABLE `discovered` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `encounter`
--

DROP TABLE IF EXISTS `encounter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `encounter` (
  `id_encounter` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_event` int(11) DEFAULT NULL,
  `id_playercard` int(11) DEFAULT NULL,
  `display_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_encounter`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `encounter`
--

LOCK TABLES `encounter` WRITE;
/*!40000 ALTER TABLE `encounter` DISABLE KEYS */;
INSERT INTO `encounter` VALUES (1,1,1,NULL,NULL);
/*!40000 ALTER TABLE `encounter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event` (
  `id_event` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_card` int(11) DEFAULT NULL,
  `display_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id_event`),
  CONSTRAINT `fk_event_card` FOREIGN KEY (`id_event`) REFERENCES `card` (`id_card`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,1,'Watch TV','Invite some friends over',NULL,NULL),(2,2,'A Walk','Go see a sight',NULL,NULL),(3,3,'Jogging','Play in a tournament',NULL,NULL),(4,4,'Pump Iron','Watch a concert',NULL,NULL),(5,5,'3v3 Basketball','Help people',NULL,NULL);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friendship`
--

DROP TABLE IF EXISTS `friendship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `friendship` (
  `id_friendship` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_player` int(11) DEFAULT NULL,
  `id_friend` int(11) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `is_accepted` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id_friendship`),
  UNIQUE KEY `u_friendship_player_friend` (`id_player`,`id_friend`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friendship`
--

LOCK TABLES `friendship` WRITE;
/*!40000 ALTER TABLE `friendship` DISABLE KEYS */;
INSERT INTO `friendship` VALUES (1,1,2,'',NULL,NULL,1),(23,1,13,NULL,NULL,NULL,0),(24,2,1,NULL,NULL,NULL,0),(25,1,14,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `friendship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `group` (
  `id_group` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `display_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_group`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
INSERT INTO `group` VALUES (1,'The Big Boys');
/*!40000 ALTER TABLE `group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `location` (
  `id_location` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_parent` int(11) DEFAULT NULL,
  `display_name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `img_location` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_location`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,1,'Home','A Cozy little nook',NULL),(2,1,'Town','A lively little town',NULL),(3,2,'Park','A lush, green space',NULL),(4,2,'Library','A trove of knowledge',NULL),(5,2,'Market','A bustling atmosphere',NULL),(6,2,'Nearby','Lots of things to see!',NULL),(7,6,'Woods','A forest in the trees',NULL),(8,7,'Cabin','A cabin in the woods',NULL),(9,2,'Casa do Dias','Cenas!',NULL);
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member` (
  `id_member` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_group` int(11) DEFAULT NULL,
  `id_player` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_member`),
  UNIQUE KEY `u_member_group_player` (`id_group`,`id_player`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,1,1),(2,1,2);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `player` (
  `id_player` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_lfg` int(11) DEFAULT NULL,
  `display_name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_player`),
  UNIQUE KEY `u_player_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES (1,NULL,'Raul','I like pizzas',20,NULL,NULL,'rg@gmail.com','$2b$10$7ex9PGZeIB8GKjrUkHOVHe3xsfBlloREKB9jKrQu4n7Xr815PGTiW',NULL),(2,NULL,'Pedro','I like pies',20,NULL,NULL,'p@gmail.com','$2b$10$7ex9PGZeIB8GKjrUkHOVHe3xsfBlloREKB9jKrQu4n7Xr815PGTiW',NULL),(13,NULL,'Dias','I like fries',14,NULL,NULL,'asd@gmail.com','$2b$10$7ex9PGZeIB8GKjrUkHOVHe3xsfBlloREKB9jKrQu4n7Xr815PGTiW',NULL),(14,NULL,'Pedro','I like games',12,NULL,NULL,'qwe@gmail.com','$2a$12$KeUcPpGBR28IJOS5uyNRb.NCKClgWxjfw7asmQIeszXNwebbHZUni',NULL),(15,NULL,'Carlos','I like football',32,NULL,NULL,'zxc@gmail.com','$2a$12$Ie.Dp7gwg2NH7MBDQXlCgeleD7hJ8Itah8yqxhy.U10i9.hpIZYAW',NULL),(16,NULL,'Thales','I like beds',20,NULL,NULL,'aaa@gmail.com','$2a$12$OFPpRfxH15pXZG/GmyvewOoyTdx97mFqXRvS.pFpMspvPPuy4pvYK',NULL),(17,NULL,'Bruno','I like movies',42,NULL,NULL,'qqq@gmail.com','$2a$12$0en1e41/B5sIGGFesUGzl.u697jzJfCX6kkgZlI5afHDyvz87VJ2i',NULL);
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`web`@`localhost`*/ /*!50003 TRIGGER create_player_records
AFTER INSERT ON player
FOR EACH ROW
INSERT INTO discovered (id_player, id_location, is_favourite, is_visited, created_at, updated_at)
  VALUES (NEW.id_player, 1, FALSE , FALSE, NOW(), NOW()) */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `playercard`
--

DROP TABLE IF EXISTS `playercard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `playercard` (
  `id_playercard` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_card` int(11) DEFAULT NULL,
  `id_player` int(11) DEFAULT NULL,
  `id_group` int(11) DEFAULT NULL,
  `state` enum('New','Played','Discarded') NOT NULL DEFAULT 'New',
  PRIMARY KEY (`id_playercard`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playercard`
--

LOCK TABLES `playercard` WRITE;
/*!40000 ALTER TABLE `playercard` DISABLE KEYS */;
INSERT INTO `playercard` VALUES (1,1,2,NULL,'Played'),(2,1,1,1,'Played'),(59,4,1,NULL,'Discarded'),(60,10,1,NULL,'Played'),(61,1,1,NULL,'Played'),(62,2,1,NULL,'Played'),(63,1,2,NULL,'Played'),(64,10,2,NULL,'Played'),(65,1,2,NULL,'Played'),(66,10,2,NULL,'Played'),(67,10,2,NULL,'Played'),(68,1,2,NULL,'Played'),(69,6,1,NULL,'Played'),(70,1,1,NULL,'Played'),(71,6,1,NULL,'Played'),(72,2,1,NULL,'Played'),(73,6,1,NULL,'Played'),(74,2,2,NULL,'New'),(75,10,2,NULL,'Played'),(76,10,2,NULL,'New'),(77,1,1,NULL,'Played'),(78,3,1,NULL,'Discarded'),(79,1,1,NULL,'Played'),(80,6,1,NULL,'Played'),(81,5,1,NULL,'Played'),(82,2,1,NULL,'New'),(83,6,2,NULL,'Discarded'),(84,4,1,NULL,'Discarded'),(85,2,1,NULL,'Discarded'),(86,1,1,NULL,'Discarded'),(87,1,1,NULL,'Discarded'),(88,3,1,NULL,'Discarded'),(89,4,1,NULL,'Discarded'),(90,3,1,NULL,'Played'),(91,1,1,NULL,'Discarded'),(92,4,1,NULL,'Discarded'),(93,10,1,NULL,'Discarded'),(94,4,1,NULL,'Discarded'),(95,6,1,NULL,'Discarded'),(96,1,1,NULL,'Played'),(97,5,1,NULL,'Discarded'),(98,2,1,NULL,'Discarded'),(99,2,1,NULL,'Played'),(100,6,1,NULL,'Played'),(101,6,1,NULL,'Played'),(102,10,2,NULL,'New'),(103,4,2,NULL,'New'),(104,10,2,NULL,'New'),(105,2,1,NULL,'Discarded'),(106,10,1,NULL,'Discarded'),(107,7,1,NULL,'Discarded'),(108,3,1,NULL,'Discarded'),(109,2,1,NULL,'Discarded'),(110,3,1,NULL,'Discarded'),(111,1,1,NULL,'Discarded'),(112,2,1,NULL,'Discarded'),(113,5,1,NULL,'Played'),(114,11,1,NULL,'New'),(115,10,1,NULL,'Discarded'),(116,5,1,NULL,'New'),(117,6,1,NULL,'New'),(118,6,1,NULL,'New');
/*!40000 ALTER TABLE `playercard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('2imBP-K-ZSNiJodtsL27KLJDC5JdWG4g',1529423544,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":2}}'),('IxDSMywRw-tAQa0VKEb5uFLQkBViv6NP',1529412748,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('PW0-F3gQPr7SC_kplOK_CY3ZuBKpu7yM',1529412748,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":2}}'),('XL5PY2W0pjRUepdVwB3ULySZZWRMh_Xc',1529423550,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('hNiPzNgGKTylbqgwnwIRhF6aKQTMc_bM',1529417203,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('xs9YxL0XkSHe2HWuCUiMmdgJMj6xvOD1',1529412748,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-19 13:04:09
