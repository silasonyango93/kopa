-- MySQL dump 10.13  Distrib 5.7.26, for osx10.14 (x86_64)
--
-- Host: localhost    Database: kopa
-- ------------------------------------------------------
-- Server version	5.7.26

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
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companies` (
  `CompanyId` int(11) NOT NULL AUTO_INCREMENT,
  `CompanyOwnershipGroupId` int(11) NOT NULL,
  `CompanyName` varchar(9000) NOT NULL,
  `CompanyRegistrationDate` datetime NOT NULL,
  PRIMARY KEY (`CompanyId`),
  KEY `CompanyOwnershipGroupId` (`CompanyOwnershipGroupId`),
  CONSTRAINT `companies_ibfk_1` FOREIGN KEY (`CompanyOwnershipGroupId`) REFERENCES `company_ownership_groups` (`CompanyOwnershipGroupId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_branches`
--

DROP TABLE IF EXISTS `company_branches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_branches` (
  `CompanyBranchId` int(11) NOT NULL AUTO_INCREMENT,
  `CompanyId` int(11) NOT NULL,
  `BranchName` varchar(9000) NOT NULL,
  `BranchPhysicalAddress` varchar(9000) NOT NULL,
  `CompanyBranchRegistrationDate` datetime NOT NULL,
  PRIMARY KEY (`CompanyBranchId`),
  KEY `CompanyId` (`CompanyId`),
  CONSTRAINT `company_branches_ibfk_1` FOREIGN KEY (`CompanyId`) REFERENCES `companies` (`CompanyId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_branches`
--

LOCK TABLES `company_branches` WRITE;
/*!40000 ALTER TABLE `company_branches` DISABLE KEYS */;
/*!40000 ALTER TABLE `company_branches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_clients`
--

DROP TABLE IF EXISTS `company_clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_clients` (
  `ClientId` int(11) NOT NULL AUTO_INCREMENT,
  `ClientUniqueId` varchar(500) NOT NULL,
  `ClientFirstName` varchar(500) NOT NULL,
  `ClientMiddleName` varchar(500) NOT NULL,
  `ClientSurname` varchar(500) NOT NULL,
  `ClientNationalId` varchar(500) NOT NULL,
  `ClientProfilePicName` varchar(900) NOT NULL,
  `GenderId` int(11) NOT NULL,
  `ClientDOB` date NOT NULL,
  `ClientPhoneNumber` varchar(500) NOT NULL,
  `ClientPhysicalAddress` varchar(9000) NOT NULL,
  `ClientEmail` varchar(500) DEFAULT NULL,
  `ClientRegistrationDate` datetime NOT NULL,
  `EmploymentStatus` int(11) NOT NULL,
  `EmploymentCategoryId` int(11) NOT NULL,
  `Occupation` varchar(500) NOT NULL,
  `EmploymentStation` varchar(500) NOT NULL,
  PRIMARY KEY (`ClientId`),
  KEY `GenderId` (`GenderId`),
  KEY `EmploymentCategoryId` (`EmploymentCategoryId`),
  CONSTRAINT `company_clients_ibfk_1` FOREIGN KEY (`GenderId`) REFERENCES `gender` (`GenderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `company_clients_ibfk_2` FOREIGN KEY (`EmploymentCategoryId`) REFERENCES `employment_categories` (`EmploymentCategoryId`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_clients`
--

LOCK TABLES `company_clients` WRITE;
/*!40000 ALTER TABLE `company_clients` DISABLE KEYS */;
/*!40000 ALTER TABLE `company_clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_owners`
--

DROP TABLE IF EXISTS `company_owners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_owners` (
  `CompanyOwnerId` int(11) NOT NULL AUTO_INCREMENT,
  `OwnerFirstName` varchar(900) NOT NULL,
  `OwnerMiddleName` varchar(900) NOT NULL,
  `OwnerSurname` varchar(900) NOT NULL,
  `OwnerNationalId` varchar(900) NOT NULL,
  `OwnerPhoneNumber` varchar(200) NOT NULL,
  `OwnerEmail` varchar(500) NOT NULL,
  `GenderId` int(11) NOT NULL,
  `EncryptedPassword` varchar(9000) NOT NULL,
  `Salt` varchar(9000) NOT NULL,
  `OwnerRegisteredDate` datetime NOT NULL,
  PRIMARY KEY (`CompanyOwnerId`),
  KEY `GenderId` (`GenderId`),
  CONSTRAINT `company_owners_ibfk_1` FOREIGN KEY (`GenderId`) REFERENCES `gender` (`GenderId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_owners`
--

LOCK TABLES `company_owners` WRITE;
/*!40000 ALTER TABLE `company_owners` DISABLE KEYS */;
/*!40000 ALTER TABLE `company_owners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_ownership_groups`
--

DROP TABLE IF EXISTS `company_ownership_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_ownership_groups` (
  `CompanyOwnershipGroupId` int(11) NOT NULL AUTO_INCREMENT,
  `OwnershipGroupName` varchar(200) NOT NULL,
  PRIMARY KEY (`CompanyOwnershipGroupId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_ownership_groups`
--

LOCK TABLES `company_ownership_groups` WRITE;
/*!40000 ALTER TABLE `company_ownership_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `company_ownership_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_system_users`
--

DROP TABLE IF EXISTS `company_system_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_system_users` (
  `SystemUserId` int(11) NOT NULL AUTO_INCREMENT,
  `CompanyBranchId` int(11) NOT NULL,
  `UserFirstName` varchar(900) NOT NULL,
  `UserMiddleName` varchar(900) NOT NULL,
  `UserSurname` varchar(900) NOT NULL,
  `GenderId` int(11) NOT NULL,
  `StaffNo` varchar(200) DEFAULT NULL,
  `UserNationalId` varchar(200) NOT NULL,
  `UserEmail` varchar(200) NOT NULL,
  `UserPhoneNumber` varchar(200) NOT NULL,
  `UserPhysicalAddress` varchar(9000) NOT NULL,
  `UserEncryptedPassword` varchar(9000) NOT NULL,
  `UserSalt` varchar(9000) NOT NULL,
  `UserRegistrationDate` datetime NOT NULL,
  PRIMARY KEY (`SystemUserId`),
  KEY `CompanyBranchId` (`CompanyBranchId`),
  KEY `GenderId` (`GenderId`),
  CONSTRAINT `company_system_users_ibfk_1` FOREIGN KEY (`CompanyBranchId`) REFERENCES `company_branches` (`CompanyBranchId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `company_system_users_ibfk_2` FOREIGN KEY (`GenderId`) REFERENCES `gender` (`GenderId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_system_users`
--

LOCK TABLES `company_system_users` WRITE;
/*!40000 ALTER TABLE `company_system_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `company_system_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `configuration_table`
--

DROP TABLE IF EXISTS `configuration_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `configuration_table` (
  `ConfigId` int(11) NOT NULL,
  `ConfigDescription` varchar(200) NOT NULL,
  `ConfigStatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configuration_table`
--

LOCK TABLES `configuration_table` WRITE;
/*!40000 ALTER TABLE `configuration_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `configuration_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employment_categories`
--

DROP TABLE IF EXISTS `employment_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employment_categories` (
  `EmploymentCategoryId` int(11) NOT NULL AUTO_INCREMENT,
  `CompanyId` int(11) NOT NULL,
  `CategoryDescription` varchar(500) NOT NULL,
  PRIMARY KEY (`EmploymentCategoryId`),
  KEY `CompanyId` (`CompanyId`),
  CONSTRAINT `employment_categories_ibfk_1` FOREIGN KEY (`CompanyId`) REFERENCES `companies` (`CompanyId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employment_categories`
--

LOCK TABLES `employment_categories` WRITE;
/*!40000 ALTER TABLE `employment_categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `employment_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gender`
--

DROP TABLE IF EXISTS `gender`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gender` (
  `GenderId` int(11) NOT NULL AUTO_INCREMENT,
  `GenderDescription` varchar(100) NOT NULL,
  PRIMARY KEY (`GenderId`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gender`
--

LOCK TABLES `gender` WRITE;
/*!40000 ALTER TABLE `gender` DISABLE KEYS */;
/*!40000 ALTER TABLE `gender` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan_application`
--

DROP TABLE IF EXISTS `loan_application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loan_application` (
  `LoanApplicationId` int(11) NOT NULL AUTO_INCREMENT,
  `ClientId` int(11) NOT NULL,
  `CompanyId` int(11) NOT NULL,
  `CompanyBranchId` int(11) NOT NULL,
  `SystemUserId` int(11) NOT NULL,
  `LoanAmount` int(11) NOT NULL,
  `LoanApplicationDate` datetime NOT NULL,
  `ExpectedSettlementDate` date NOT NULL,
  `LoanRating` int(11) DEFAULT NULL,
  `IsFullyPaid` int(11) NOT NULL,
  `RemainingLoanAmount` int(11) NOT NULL,
  `EmploymentStatus` int(11) NOT NULL,
  `EmploymentCategoryId` int(11) DEFAULT NULL,
  `Occupation` varchar(500) NOT NULL,
  `EmploymentStation` varchar(500) NOT NULL,
  PRIMARY KEY (`LoanApplicationId`),
  KEY `ClientId` (`ClientId`),
  KEY `CompanyId` (`CompanyId`),
  KEY `CompanyBranchId` (`CompanyBranchId`),
  KEY `SystemUserId` (`SystemUserId`),
  KEY `EmploymentCategoryId` (`EmploymentCategoryId`),
  CONSTRAINT `loan_application_ibfk_1` FOREIGN KEY (`ClientId`) REFERENCES `company_clients` (`ClientId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `loan_application_ibfk_2` FOREIGN KEY (`CompanyId`) REFERENCES `companies` (`CompanyId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `loan_application_ibfk_3` FOREIGN KEY (`CompanyId`) REFERENCES `companies` (`CompanyId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `loan_application_ibfk_4` FOREIGN KEY (`CompanyBranchId`) REFERENCES `company_branches` (`CompanyBranchId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `loan_application_ibfk_5` FOREIGN KEY (`SystemUserId`) REFERENCES `company_system_users` (`SystemUserId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `loan_application_ibfk_6` FOREIGN KEY (`EmploymentCategoryId`) REFERENCES `employment_categories` (`EmploymentCategoryId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan_application`
--

LOCK TABLES `loan_application` WRITE;
/*!40000 ALTER TABLE `loan_application` DISABLE KEYS */;
/*!40000 ALTER TABLE `loan_application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan_repayment_installments`
--

DROP TABLE IF EXISTS `loan_repayment_installments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loan_repayment_installments` (
  `InstallmentId` int(11) NOT NULL AUTO_INCREMENT,
  `LoanApplicationId` int(11) NOT NULL,
  `InstallmentAmount` int(11) NOT NULL,
  `InstallmentDate` datetime NOT NULL,
  PRIMARY KEY (`InstallmentId`),
  KEY `LoanApplicationId` (`LoanApplicationId`),
  CONSTRAINT `loan_repayment_installments_ibfk_1` FOREIGN KEY (`LoanApplicationId`) REFERENCES `loan_application` (`LoanApplicationId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan_repayment_installments`
--

LOCK TABLES `loan_repayment_installments` WRITE;
/*!40000 ALTER TABLE `loan_repayment_installments` DISABLE KEYS */;
/*!40000 ALTER TABLE `loan_repayment_installments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ownership_groups_company_owners_rship`
--

DROP TABLE IF EXISTS `ownership_groups_company_owners_rship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ownership_groups_company_owners_rship` (
  `OGCOId` int(11) NOT NULL AUTO_INCREMENT,
  `CompanyOwnershipGroupId` int(11) NOT NULL,
  `CompanyOwnerId` int(11) NOT NULL,
  PRIMARY KEY (`OGCOId`),
  KEY `CompanyOwnershipGroupId` (`CompanyOwnershipGroupId`),
  KEY `CompanyOwnerId` (`CompanyOwnerId`),
  CONSTRAINT `ownership_groups_company_owners_rship_ibfk_1` FOREIGN KEY (`CompanyOwnershipGroupId`) REFERENCES `company_ownership_groups` (`CompanyOwnershipGroupId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ownership_groups_company_owners_rship_ibfk_2` FOREIGN KEY (`CompanyOwnerId`) REFERENCES `company_owners` (`CompanyOwnerId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ownership_groups_company_owners_rship`
--

LOCK TABLES `ownership_groups_company_owners_rship` WRITE;
/*!40000 ALTER TABLE `ownership_groups_company_owners_rship` DISABLE KEYS */;
/*!40000 ALTER TABLE `ownership_groups_company_owners_rship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session_logs`
--

DROP TABLE IF EXISTS `session_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `session_logs` (
  `SessionLogId` int(11) NOT NULL AUTO_INCREMENT,
  `SystemUserId` int(11) NOT NULL,
  `SessionStartDate` datetime NOT NULL,
  `SessionEndDate` datetime NOT NULL,
  PRIMARY KEY (`SessionLogId`),
  KEY `SystemUserId` (`SystemUserId`),
  CONSTRAINT `session_logs_ibfk_1` FOREIGN KEY (`SystemUserId`) REFERENCES `company_system_users` (`SystemUserId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session_logs`
--

LOCK TABLES `session_logs` WRITE;
/*!40000 ALTER TABLE `session_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `session_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_admin`
--

DROP TABLE IF EXISTS `system_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `system_admin` (
  `AdminId` int(11) NOT NULL AUTO_INCREMENT,
  `AdminFirstName` varchar(200) NOT NULL,
  `AdminMiddleName` varchar(200) NOT NULL,
  `AdminSurname` varchar(200) NOT NULL,
  `AdminPhoneNumber` varchar(200) NOT NULL,
  `AdminEmail` varchar(200) NOT NULL,
  `GenderId` int(11) NOT NULL,
  `AdminNationalId` varchar(200) NOT NULL,
  `EncryptedPassword` varchar(9000) NOT NULL,
  `Salt` varchar(9000) NOT NULL,
  `RegisteredDate` datetime NOT NULL,
  PRIMARY KEY (`AdminId`),
  KEY `GenderId` (`GenderId`),
  CONSTRAINT `system_admin_ibfk_1` FOREIGN KEY (`GenderId`) REFERENCES `gender` (`GenderId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_admin`
--

LOCK TABLES `system_admin` WRITE;
/*!40000 ALTER TABLE `system_admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `system_admin` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-19  9:33:33
