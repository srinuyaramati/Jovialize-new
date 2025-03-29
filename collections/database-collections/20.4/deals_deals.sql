-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: deals
-- ------------------------------------------------------
-- Server version	8.0.28

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
  `dealId` int NOT NULL AUTO_INCREMENT,
  `title` text,
  `shortDescription` text,
  `longDescription` text,
  `status` enum('Active','Inactive') DEFAULT 'Inactive',
  `dealPrice` varchar(255) DEFAULT NULL,
  `activeFrom` datetime DEFAULT NULL,
  `activeTo` datetime DEFAULT NULL,
  `city` int DEFAULT NULL,
  `dealType` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`dealId`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deals`
--

LOCK TABLES `deals` WRITE;
/*!40000 ALTER TABLE `deals` DISABLE KEYS */;
INSERT INTO `deals` VALUES (9,'£109—Leicestershire retreat w/meals & spa access, 50% off','Travelzoo members who have stayed at Sketchley Grange Hotel & Spa say it\'s a \'gem\' with \'delicious food\' and \'lovely staff\'. A country house hotel in Leicestershire, suite stays here are up to 50% off. You\'ll get breakfast, dining credit, prosecco, and access to the spa and leisure club.','<ul><li>Valid Monday-Friday until 30 September, 2024. Saturdays are an extra £30,payable direct to the hotel</li><li>It\'s £99 to stay Sundays from July-September</li><li>Overnight accommodation in a Contemporary Junior Suite, with full English breakfast, for two</li><li>£25-per-person credit towards dinner</li><li>A bottle of prosecco on arrival (worth £36)</li><li>Late checkout until 1pm (worth £20)</li><li>Full use of the spa and leisure facilities (supplements apply for treatments)</li></ul>','Active','10000','2024-04-25 00:00:00','2024-04-29 00:00:00',2,NULL,'2024-04-20 07:07:07','2024-04-20 08:50:06'),(10,'£109—Leicestershire retreat w/meals & spa access, 50% off','Travelzoo members who have stayed at Sketchley Grange Hotel & Spa say it\'s a \'gem\' with \'delicious food\' and \'lovely staff\'. A country house hotel in Leicestershire, suite stays here are up to 50% off. You\'ll get breakfast, dining credit, prosecco, and access to the spa and leisure club.','<ul><li>Valid Monday-Friday until 30 September, 2024. Saturdays are an extra £30,payable direct to the hotel</li><li>It\'s £99 to stay Sundays from July-September</li><li>Overnight accommodation in a Contemporary Junior Suite, with full English breakfast, for two</li><li>£25-per-person credit towards dinner</li><li>A bottle of prosecco on arrival (worth £36)</li><li>Late checkout until 1pm (worth £20)</li><li>Full use of the spa and leisure facilities (supplements apply for treatments)</li></ul>','Active','1000','2024-04-20 00:00:00','2024-04-30 00:00:00',2,NULL,'2024-04-20 07:07:13','2024-04-20 07:07:13'),(11,'£109—Leicestershire retreat w/meals & spa access, 50% off','Travelzoo members who have stayed at Sketchley Grange Hotel & Spa say it\'s a \'gem\' with \'delicious food\' and \'lovely staff\'. A country house hotel in Leicestershire, suite stays here are up to 50% off. You\'ll get breakfast, dining credit, prosecco, and access to the spa and leisure club.','<ul><li>Valid Monday-Friday until 30 September, 2024. Saturdays are an extra £30,payable direct to the hotel</li><li>It\'s £99 to stay Sundays from July-September</li><li>Overnight accommodation in a Contemporary Junior Suite, with full English breakfast, for two</li><li>£25-per-person credit towards dinner</li><li>A bottle of prosecco on arrival (worth £36)</li><li>Late checkout until 1pm (worth £20)</li><li>Full use of the spa and leisure facilities (supplements apply for treatments)</li></ul>','Active','1000','2024-04-20 00:00:00','2024-04-30 00:00:00',1,NULL,'2024-04-20 07:07:22','2024-04-20 07:07:22'),(12,'£109—Leicestershire retreat w/meals & spa access, 50% off','Travelzoo members who have stayed at Sketchley Grange Hotel & Spa say it\'s a \'gem\' with \'delicious food\' and \'lovely staff\'. A country house hotel in Leicestershire, suite stays here are up to 50% off. You\'ll get breakfast, dining credit, prosecco, and access to the spa and leisure club.','<ul><li>Valid Monday-Friday until 30 September, 2024. Saturdays are an extra £30,payable direct to the hotel</li><li>It\'s £99 to stay Sundays from July-September</li><li>Overnight accommodation in a Contemporary Junior Suite, with full English breakfast, for two</li><li>£25-per-person credit towards dinner</li><li>A bottle of prosecco on arrival (worth £36)</li><li>Late checkout until 1pm (worth £20)</li><li>Full use of the spa and leisure facilities (supplements apply for treatments)</li></ul>','Active','1000','2024-04-20 00:00:00','2024-04-30 00:00:00',2,NULL,'2024-04-20 07:07:26','2024-04-20 07:07:26'),(13,'£109—Leicestershire retreat w/meals & spa access, 50% off','Travelzoo members who have stayed at Sketchley Grange Hotel & Spa say it\'s a \'gem\' with \'delicious food\' and \'lovely staff\'. A country house hotel in Leicestershire, suite stays here are up to 50% off. You\'ll get breakfast, dining credit, prosecco, and access to the spa and leisure club.','<ul><li>Valid Monday-Friday until 30 September, 2024. Saturdays are an extra £30,payable direct to the hotel</li><li>It\'s £99 to stay Sundays from July-September</li><li>Overnight accommodation in a Contemporary Junior Suite, with full English breakfast, for two</li><li>£25-per-person credit towards dinner</li><li>A bottle of prosecco on arrival (worth £36)</li><li>Late checkout until 1pm (worth £20)</li><li>Full use of the spa and leisure facilities (supplements apply for treatments)</li></ul>','Active','1000','2024-04-20 00:00:00','2024-04-30 00:00:00',1,NULL,'2024-04-20 07:07:29','2024-04-20 07:07:29'),(14,'£109—Leicestershire retreat w/meals & spa access, 50% off','Travelzoo members who have stayed at Sketchley Grange Hotel & Spa say it\'s a \'gem\' with \'delicious food\' and \'lovely staff\'. A country house hotel in Leicestershire, suite stays here are up to 50% off. You\'ll get breakfast, dining credit, prosecco, and access to the spa and leisure club.','<ul><li>Valid Monday-Friday until 30 September, 2024. Saturdays are an extra £30,payable direct to the hotel</li><li>It\'s £99 to stay Sundays from July-September</li><li>Overnight accommodation in a Contemporary Junior Suite, with full English breakfast, for two</li><li>£25-per-person credit towards dinner</li><li>A bottle of prosecco on arrival (worth £36)</li><li>Late checkout until 1pm (worth £20)</li><li>Full use of the spa and leisure facilities (supplements apply for treatments)</li></ul>','Active','1000','2024-04-20 00:00:00','2024-04-30 00:00:00',2,NULL,'2024-04-20 07:07:35','2024-04-20 07:07:35');
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

-- Dump completed on 2024-04-20 14:28:34
