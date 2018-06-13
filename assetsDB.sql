-- MySQL dump 10.13  Distrib 5.7.17, for Linux (x86_64)
--
-- Host: localhost    Database: assets_db
-- ------------------------------------------------------
-- Server version	5.7.21

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
-- Table structure for table `asset`
--

CREATE DATABASE assets_db;
USE assets_db;

DROP TABLE IF EXISTS `asset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `asset` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `name` varchar(255) NOT NULL,
  `notes` text,
  `blocked` tinyint(4) NOT NULL DEFAULT '0',
  `serialNumber` varchar(255) NOT NULL,
  `employeeId` int(11) NOT NULL DEFAULT '1',
  `employeeIdId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `serialNumber` (`serialNumber`),
  KEY `fk_b5df8ea76f92d2d315cfab09e6b` (`employeeIdId`),
  CONSTRAINT `fk_b5df8ea76f92d2d315cfab09e6b` FOREIGN KEY (`employeeIdId`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset`
--

LOCK TABLES `asset` WRITE;
/*!40000 ALTER TABLE `asset` DISABLE KEYS */;
INSERT INTO `asset` VALUES (1,'2018-06-13 09:03:18.908000','2018-06-13 09:03:18.908000','iPhone 5s',NULL,0,'07fa0g9a70fq09u0bq90ba',2,NULL);
/*!40000 ALTER TABLE `asset` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'2018-06-13 08:50:00.592423','2018-06-13 08:50:00.592423','Depot'),(2,'2018-06-13 09:04:27.555000','2018-06-13 09:04:27.555000','Ulises Santana');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1518263551147,'DefaultEmployee1518263551147'),(1518607787176,'DefaultUser1518607787176');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `record`
--

DROP TABLE IF EXISTS `record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `fromEmployeeId` int(11) NOT NULL DEFAULT '1',
  `toEmployeeId` int(11) NOT NULL DEFAULT '1',
  `assetId` int(11) NOT NULL,
  `assetIdId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_2aef18e10ec1c4b0a9522e82083` (`assetIdId`),
  CONSTRAINT `fk_2aef18e10ec1c4b0a9522e82083` FOREIGN KEY (`assetIdId`) REFERENCES `asset` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `record`
--

LOCK TABLES `record` WRITE;
/*!40000 ALTER TABLE `record` DISABLE KEYS */;
INSERT INTO `record` VALUES (1,'2018-06-13 09:03:18.915000',1,1,1,NULL),(2,'2018-06-13 09:05:30.577000',1,2,1,NULL);
/*!40000 ALTER TABLE `record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `admin` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'2018-06-13 08:50:00.597666','2018-06-13 08:50:00.597666','Administrator','$2a$05$.wqPbn47zrOcCvKY/VFwX.AIBGNiktACOYvdH59bsV3dGQpm.fn8S','admin@admin.com',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-13 10:15:47
