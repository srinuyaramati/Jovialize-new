-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: deals
-- ------------------------------------------------------
-- Server version	5.7.44-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `deals`
--

DROP TABLE IF EXISTS `deals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deals` (
  `dealId` int(11) NOT NULL AUTO_INCREMENT,
  `title` text,
  `shortDescription` text,
  `longDescription` text,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `createdDate` datetime DEFAULT NULL,
  `dealPrice` varchar(9) NOT NULL,
  `activeFrom` datetime DEFAULT NULL,
  `activeTo` datetime DEFAULT NULL,
  `city` int(11) NOT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dealType` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`dealId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deals`
--

LOCK TABLES `deals` WRITE;
/*!40000 ALTER TABLE `deals` DISABLE KEYS */;
INSERT INTO `deals` VALUES (1,'£109—Leicestershire retreat w/meals & spa access, 50% off','Travelzoo members who have stayed at Sketchley Grange Hotel & Spa say it\'s a \'gem\' with \'delicious food\' and \'lovely staff\'. A country house hotel in Leicestershire, suite stays here are up to 50% off. You\'ll get breakfast, dining credit, prosecco, and access to the spa and leisure club.','Travelzoo members who have stayed at Sketchley Grange Hotel & Spa say it\'s a \'gem\' with \'delicious food\' and \'lovely staff\'. A country house hotel in Leicestershire, suite stays here are up to 50% off. You\'ll get breakfast, dining credit, prosecco, and access to the spa and leisure club.','Active','2024-04-15 00:00:00','1000','2024-04-15 00:00:00','2024-04-15 00:00:00',1,1,'2024-04-15 15:57:07',1),(2,'£109—Leicestershire retreat w/meals & spa access, 50% off','Travelzoo members who have stayed at Sketchley Grange Hotel & Spa say it\'s a \'gem\' with \'delicious food\' and \'lovely staff\'. A country house hotel in Leicestershire, suite stays here are up to 50% off. You\'ll get breakfast, dining credit, prosecco, and access to the spa and leisure club.','Travelzoo members who have stayed at Sketchley Grange Hotel & Spa say it\'s a \'gem\' with \'delicious food\' and \'lovely staff\'. A country house hotel in Leicestershire, suite stays here are up to 50% off. You\'ll get breakfast, dining credit, prosecco, and access to the spa and leisure club.','Active','2024-04-15 00:00:00','1000','2024-04-15 00:00:00','2024-04-15 00:00:00',1,1,'2024-04-15 15:58:45',1),(3,'£109—Leicestershire retreat w/meals & spa access, 50% off','Travelzoo members who have stayed at Sketchley Grange Hotel & Spa say it\'s a \'gem\' with \'delicious food\' and \'lovely staff\'. A country house hotel in Leicestershire, suite stays here are up to 50% off. You\'ll get breakfast, dining credit, prosecco, and access to the spa and leisure club.','Travelzoo members who have stayed at Sketchley Grange Hotel & Spa say it\'s a \'gem\' with \'delicious food\' and \'lovely staff\'. A country house hotel in Leicestershire, suite stays here are up to 50% off. You\'ll get breakfast, dining credit, prosecco, and access to the spa and leisure club.','Active','2024-04-15 00:00:00','1000','2024-04-15 00:00:00','2024-04-15 00:00:00',1,1,'2024-04-15 16:58:43',1),(4,'£109—Leicestershire retreat w/meals & spa access, 50% off','Travelzoo members who have stayed at Sketchley Grange Hotel & Spa say it\'s a \'gem\' with \'delicious food\' and \'lovely staff\'. A country house hotel in Leicestershire, suite stays here are up to 50% off. You\'ll get breakfast, dining credit, prosecco, and access to the spa and leisure club.','Travelzoo members who have stayed at Sketchley Grange Hotel & Spa say it\'s a \'gem\' with \'delicious food\' and \'lovely staff\'. A country house hotel in Leicestershire, suite stays here are up to 50% off. You\'ll get breakfast, dining credit, prosecco, and access to the spa and leisure club.','Active','2024-04-15 00:00:00','1000','2024-04-15 00:00:00','2024-04-15 00:00:00',1,1,'2024-04-15 17:02:54',1),(5,'£109—Leicestershire retreat w/meals & spa access, 50% off','Travelzoo members who have stayed at Sketchley Grange Hotel & Spa say it\'s a \'gem\' with \'delicious food\' and \'lovely staff\'. A country house hotel in Leicestershire, suite stays here are up to 50% off. You\'ll get breakfast, dining credit, prosecco, and access to the spa and leisure club.','Travelzoo members who have stayed at Sketchley Grange Hotel & Spa say it\'s a \'gem\' with \'delicious food\' and \'lovely staff\'. A country house hotel in Leicestershire, suite stays here are up to 50% off. You\'ll get breakfast, dining credit, prosecco, and access to the spa and leisure club.','Active','2024-04-15 00:00:00','1000','2024-04-15 00:00:00','2024-04-15 00:00:00',1,1,'2024-04-15 17:20:54',1),(6,'£109—Leicestershire retreat w/meals & spa access, 50% off','Travelzoo members who have stayed at Sketchley Grange Hotel & Spa say it\'s a \'gem\' with \'delicious food\' and \'lovely staff\'. A country house hotel in Leicestershire, suite stays here are up to 50% off. You\'ll get breakfast, dining credit, prosecco, and access to the spa and leisure club.','Travelzoo members who have stayed at Sketchley Grange Hotel & Spa say it\'s a \'gem\' with \'delicious food\' and \'lovely staff\'. A country house hotel in Leicestershire, suite stays here are up to 50% off. You\'ll get breakfast, dining credit, prosecco, and access to the spa and leisure club.','Active','2024-04-15 00:00:00','1000','2024-04-15 00:00:00','2024-04-15 00:00:00',1,1,'2024-04-15 17:28:39',1),(7,'£109—Leicestershire retreat w/meals & spa access, 50% off','Travelzoo members who have stayed at Sketchley Grange Hotel & Spa say it\'s a \'gem\' with \'delicious food\' and \'lovely staff\'. A country house hotel in Leicestershire, suite stays here are up to 50% off. You\'ll get breakfast, dining credit, prosecco, and access to the spa and leisure club.','Travelzoo members who have stayed at Sketchley Grange Hotel & Spa say it\'s a \'gem\' with \'delicious food\' and \'lovely staff\'. A country house hotel in Leicestershire, suite stays here are up to 50% off. You\'ll get breakfast, dining credit, prosecco, and access to the spa and leisure club.','Active','2024-04-15 00:00:00','1000','2024-04-15 00:00:00','2024-04-15 00:00:00',1,1,'2024-04-15 17:30:30',1);
/*!40000 ALTER TABLE `deals` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-18 14:33:10
