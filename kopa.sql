-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 16, 2019 at 08:28 PM
-- Server version: 5.7.27-0ubuntu0.16.04.1
-- PHP Version: 7.0.33-0ubuntu0.16.04.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kopa`
--

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `CompanyId` int(11) NOT NULL,
  `CompanyOwnershipGroupId` int(11) NOT NULL,
  `CompanyName` varchar(9000) NOT NULL,
  `CompanyRegistrationDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`CompanyId`, `CompanyOwnershipGroupId`, `CompanyName`, `CompanyRegistrationDate`) VALUES
(3, 9, 'Safaricom', '2019-10-13 12:46:00');

-- --------------------------------------------------------

--
-- Table structure for table `company_branches`
--

CREATE TABLE `company_branches` (
  `CompanyBranchId` int(11) NOT NULL,
  `CompanyId` int(11) NOT NULL,
  `BranchName` varchar(9000) NOT NULL,
  `BranchPhysicalAddress` varchar(9000) NOT NULL,
  `CompanyBranchRegistrationDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `company_clients`
--

CREATE TABLE `company_clients` (
  `ClientId` int(11) NOT NULL,
  `ClientFirstName` varchar(500) NOT NULL,
  `ClientMiddleName` varchar(500) NOT NULL,
  `ClientSurname` varchar(500) NOT NULL,
  `ClientNationalId` varchar(500) NOT NULL,
  `ClientProfilePicName` varchar(900) NOT NULL,
  `ClientNationalIdPicName` varchar(900) NOT NULL,
  `GenderId` int(11) NOT NULL,
  `ClientPhoneNumber` varchar(500) NOT NULL,
  `ClientPhysicalAddress` varchar(9000) NOT NULL,
  `ClientEmail` varchar(500) DEFAULT NULL,
  `ClientRegistrationDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `company_owners`
--

CREATE TABLE `company_owners` (
  `CompanyOwnerId` int(11) NOT NULL,
  `OwnerFirstName` varchar(900) NOT NULL,
  `OwnerMiddleName` varchar(900) NOT NULL,
  `OwnerSurname` varchar(900) NOT NULL,
  `OwnerNationalId` varchar(900) NOT NULL,
  `OwnerPhoneNumber` varchar(200) NOT NULL,
  `OwnerEmail` varchar(500) NOT NULL,
  `GenderId` int(11) NOT NULL,
  `EncryptedPassword` varchar(9000) NOT NULL,
  `Salt` varchar(9000) NOT NULL,
  `OwnerRegisteredDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `company_owners`
--

INSERT INTO `company_owners` (`CompanyOwnerId`, `OwnerFirstName`, `OwnerMiddleName`, `OwnerSurname`, `OwnerNationalId`, `OwnerPhoneNumber`, `OwnerEmail`, `GenderId`, `EncryptedPassword`, `Salt`, `OwnerRegisteredDate`) VALUES
(2, 'Silas', 'Onyango', 'Konytango', '31547206', '0707902812', 'silas.onyango93@gmail.com', 1, '604081509c7b2203cb80d344179af513bdcbd2080b34a26b92572d485e85fb2135d426281a4fc3e3bce20a462ab6eeef9225a4c349568855211c829e91f4f264', 'mxN4iI5Au9H3Bu5k5FwpzPZ4iZL+W1o3bSfEg3nrPjWkeERVv/w6y5VkQ2udbCCPLyh3bFxj74L+G/yfHFrA0wYehkE6Ta9/DRn0RGmd8Q3CYBj71+3mAoCYYLXi7fr9IVNbtv1FeMVVx3BSjlSJTbAg+U/2mi7Otxce1h8xLyA=', '2019-10-10 13:28:18');

-- --------------------------------------------------------

--
-- Table structure for table `company_ownership_groups`
--

CREATE TABLE `company_ownership_groups` (
  `CompanyOwnershipGroupId` int(11) NOT NULL,
  `OwnershipGroupName` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `company_ownership_groups`
--

INSERT INTO `company_ownership_groups` (`CompanyOwnershipGroupId`, `OwnershipGroupName`) VALUES
(9, 'Safaricom');

-- --------------------------------------------------------

--
-- Table structure for table `company_system_users`
--

CREATE TABLE `company_system_users` (
  `SystemUserId` int(11) NOT NULL,
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
  `UserRegistrationDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `employment_categories`
--

CREATE TABLE `employment_categories` (
  `EmploymentCategoryId` int(11) NOT NULL,
  `CategoryDescription` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `gender`
--

CREATE TABLE `gender` (
  `GenderId` int(11) NOT NULL,
  `GenderDescription` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gender`
--

INSERT INTO `gender` (`GenderId`, `GenderDescription`) VALUES
(1, 'Male'),
(2, 'Female');

-- --------------------------------------------------------

--
-- Table structure for table `loan_application`
--

CREATE TABLE `loan_application` (
  `LoanApplicationId` int(11) NOT NULL,
  `ClientId` int(11) NOT NULL,
  `CompanyId` int(11) NOT NULL,
  `CompanyBranchId` int(11) NOT NULL,
  `SystemUserId` int(11) NOT NULL,
  `LoanAmount` int(11) NOT NULL,
  `LoanApplicationDate` datetime NOT NULL,
  `ExpectedSettlementDate` date NOT NULL,
  `LoanRating` int(11) NOT NULL,
  `IsFullyPaid` int(11) NOT NULL,
  `RemainingLoanAount` int(11) NOT NULL,
  `EmploymentStatus` int(11) NOT NULL,
  `EmploymentCategoryId` int(11) DEFAULT NULL,
  `Occupation` varchar(500) NOT NULL,
  `EmploymentStation` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `loan_repayment_installments`
--

CREATE TABLE `loan_repayment_installments` (
  `InstallmentId` int(11) NOT NULL,
  `LoanApplicationId` int(11) NOT NULL,
  `InstallmentAmount` int(11) NOT NULL,
  `InstallmentDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ownership_groups_company_owners_rship`
--

CREATE TABLE `ownership_groups_company_owners_rship` (
  `OGCOId` int(11) NOT NULL,
  `CompanyOwnershipGroupId` int(11) NOT NULL,
  `CompanyOwnerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ownership_groups_company_owners_rship`
--

INSERT INTO `ownership_groups_company_owners_rship` (`OGCOId`, `CompanyOwnershipGroupId`, `CompanyOwnerId`) VALUES
(3, 9, 2);

-- --------------------------------------------------------

--
-- Table structure for table `session_logs`
--

CREATE TABLE `session_logs` (
  `SessionLogId` int(11) NOT NULL,
  `SystemUserId` int(11) NOT NULL,
  `SessionStartDate` datetime NOT NULL,
  `SessionEndDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `system_admin`
--

CREATE TABLE `system_admin` (
  `AdminId` int(11) NOT NULL,
  `AdminFirstName` varchar(200) NOT NULL,
  `AdminMiddleName` varchar(200) NOT NULL,
  `AdminSurname` varchar(200) NOT NULL,
  `AdminPhoneNumber` varchar(200) NOT NULL,
  `AdminEmail` varchar(200) NOT NULL,
  `GenderId` int(11) NOT NULL,
  `AdminNationalId` varchar(200) NOT NULL,
  `EncryptedPassword` varchar(9000) NOT NULL,
  `Salt` varchar(9000) NOT NULL,
  `RegisteredDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `system_admin`
--

INSERT INTO `system_admin` (`AdminId`, `AdminFirstName`, `AdminMiddleName`, `AdminSurname`, `AdminPhoneNumber`, `AdminEmail`, `GenderId`, `AdminNationalId`, `EncryptedPassword`, `Salt`, `RegisteredDate`) VALUES
(2, 'Silas', 'Onyango', 'Konyango', '0707902812', 'silas.onyango93@gmail.com', 1, '31547206', 'fb191b2f94907ea80958962b229ea8e2325c8a57a5980ac9fa4c21206bf92306691ee35b1a72cc1b0fe5c7be9cd0673cf069d70fa1ca806cf63c026877c6b812', 'vL7hf4bbFlUPZb3ZFDGxkbhZwF5Y8YZ/+MnvSFhbudYmtzmHq2W4CF0cTLj9UbtclyG/3aAdfssv7PJqCUXhVwH22Fw+lJRr0LMWXYk4giyojlUeBmJISQr0RJw2eSZrqL1VjQhbXKEQKAP0cKwvx/eCYGEwltV6xabU6EGFT+4=', '2019-10-05 09:37:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`CompanyId`),
  ADD KEY `CompanyOwnershipGroupId` (`CompanyOwnershipGroupId`);

--
-- Indexes for table `company_branches`
--
ALTER TABLE `company_branches`
  ADD PRIMARY KEY (`CompanyBranchId`),
  ADD KEY `CompanyId` (`CompanyId`);

--
-- Indexes for table `company_clients`
--
ALTER TABLE `company_clients`
  ADD PRIMARY KEY (`ClientId`),
  ADD KEY `GenderId` (`GenderId`);

--
-- Indexes for table `company_owners`
--
ALTER TABLE `company_owners`
  ADD PRIMARY KEY (`CompanyOwnerId`),
  ADD KEY `GenderId` (`GenderId`);

--
-- Indexes for table `company_ownership_groups`
--
ALTER TABLE `company_ownership_groups`
  ADD PRIMARY KEY (`CompanyOwnershipGroupId`);

--
-- Indexes for table `company_system_users`
--
ALTER TABLE `company_system_users`
  ADD PRIMARY KEY (`SystemUserId`),
  ADD KEY `CompanyBranchId` (`CompanyBranchId`),
  ADD KEY `GenderId` (`GenderId`);

--
-- Indexes for table `employment_categories`
--
ALTER TABLE `employment_categories`
  ADD PRIMARY KEY (`EmploymentCategoryId`);

--
-- Indexes for table `gender`
--
ALTER TABLE `gender`
  ADD PRIMARY KEY (`GenderId`);

--
-- Indexes for table `loan_application`
--
ALTER TABLE `loan_application`
  ADD PRIMARY KEY (`LoanApplicationId`),
  ADD KEY `ClientId` (`ClientId`),
  ADD KEY `CompanyId` (`CompanyId`),
  ADD KEY `CompanyBranchId` (`CompanyBranchId`),
  ADD KEY `SystemUserId` (`SystemUserId`),
  ADD KEY `EmploymentCategoryId` (`EmploymentCategoryId`);

--
-- Indexes for table `loan_repayment_installments`
--
ALTER TABLE `loan_repayment_installments`
  ADD PRIMARY KEY (`InstallmentId`),
  ADD KEY `LoanApplicationId` (`LoanApplicationId`);

--
-- Indexes for table `ownership_groups_company_owners_rship`
--
ALTER TABLE `ownership_groups_company_owners_rship`
  ADD PRIMARY KEY (`OGCOId`),
  ADD KEY `CompanyOwnershipGroupId` (`CompanyOwnershipGroupId`),
  ADD KEY `CompanyOwnerId` (`CompanyOwnerId`);

--
-- Indexes for table `session_logs`
--
ALTER TABLE `session_logs`
  ADD PRIMARY KEY (`SessionLogId`),
  ADD KEY `SystemUserId` (`SystemUserId`);

--
-- Indexes for table `system_admin`
--
ALTER TABLE `system_admin`
  ADD PRIMARY KEY (`AdminId`),
  ADD KEY `GenderId` (`GenderId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `CompanyId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `company_branches`
--
ALTER TABLE `company_branches`
  MODIFY `CompanyBranchId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `company_clients`
--
ALTER TABLE `company_clients`
  MODIFY `ClientId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `company_owners`
--
ALTER TABLE `company_owners`
  MODIFY `CompanyOwnerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `company_ownership_groups`
--
ALTER TABLE `company_ownership_groups`
  MODIFY `CompanyOwnershipGroupId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `company_system_users`
--
ALTER TABLE `company_system_users`
  MODIFY `SystemUserId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `employment_categories`
--
ALTER TABLE `employment_categories`
  MODIFY `EmploymentCategoryId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `gender`
--
ALTER TABLE `gender`
  MODIFY `GenderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `loan_application`
--
ALTER TABLE `loan_application`
  MODIFY `LoanApplicationId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `loan_repayment_installments`
--
ALTER TABLE `loan_repayment_installments`
  MODIFY `InstallmentId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `ownership_groups_company_owners_rship`
--
ALTER TABLE `ownership_groups_company_owners_rship`
  MODIFY `OGCOId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `session_logs`
--
ALTER TABLE `session_logs`
  MODIFY `SessionLogId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `system_admin`
--
ALTER TABLE `system_admin`
  MODIFY `AdminId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `companies`
--
ALTER TABLE `companies`
  ADD CONSTRAINT `companies_ibfk_1` FOREIGN KEY (`CompanyOwnershipGroupId`) REFERENCES `company_ownership_groups` (`CompanyOwnershipGroupId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `company_branches`
--
ALTER TABLE `company_branches`
  ADD CONSTRAINT `company_branches_ibfk_1` FOREIGN KEY (`CompanyId`) REFERENCES `companies` (`CompanyId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `company_clients`
--
ALTER TABLE `company_clients`
  ADD CONSTRAINT `company_clients_ibfk_1` FOREIGN KEY (`GenderId`) REFERENCES `gender` (`GenderId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `company_owners`
--
ALTER TABLE `company_owners`
  ADD CONSTRAINT `company_owners_ibfk_1` FOREIGN KEY (`GenderId`) REFERENCES `gender` (`GenderId`);

--
-- Constraints for table `company_system_users`
--
ALTER TABLE `company_system_users`
  ADD CONSTRAINT `company_system_users_ibfk_1` FOREIGN KEY (`CompanyBranchId`) REFERENCES `company_branches` (`CompanyBranchId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `company_system_users_ibfk_2` FOREIGN KEY (`GenderId`) REFERENCES `gender` (`GenderId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `loan_application`
--
ALTER TABLE `loan_application`
  ADD CONSTRAINT `loan_application_ibfk_1` FOREIGN KEY (`ClientId`) REFERENCES `company_clients` (`ClientId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `loan_application_ibfk_2` FOREIGN KEY (`CompanyId`) REFERENCES `companies` (`CompanyId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `loan_application_ibfk_3` FOREIGN KEY (`CompanyId`) REFERENCES `companies` (`CompanyId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `loan_application_ibfk_4` FOREIGN KEY (`CompanyBranchId`) REFERENCES `company_branches` (`CompanyBranchId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `loan_application_ibfk_5` FOREIGN KEY (`SystemUserId`) REFERENCES `company_system_users` (`SystemUserId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `loan_application_ibfk_6` FOREIGN KEY (`EmploymentCategoryId`) REFERENCES `employment_categories` (`EmploymentCategoryId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `loan_repayment_installments`
--
ALTER TABLE `loan_repayment_installments`
  ADD CONSTRAINT `loan_repayment_installments_ibfk_1` FOREIGN KEY (`LoanApplicationId`) REFERENCES `loan_application` (`LoanApplicationId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ownership_groups_company_owners_rship`
--
ALTER TABLE `ownership_groups_company_owners_rship`
  ADD CONSTRAINT `ownership_groups_company_owners_rship_ibfk_1` FOREIGN KEY (`CompanyOwnershipGroupId`) REFERENCES `company_ownership_groups` (`CompanyOwnershipGroupId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ownership_groups_company_owners_rship_ibfk_2` FOREIGN KEY (`CompanyOwnerId`) REFERENCES `company_owners` (`CompanyOwnerId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `session_logs`
--
ALTER TABLE `session_logs`
  ADD CONSTRAINT `session_logs_ibfk_1` FOREIGN KEY (`SystemUserId`) REFERENCES `company_system_users` (`SystemUserId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `system_admin`
--
ALTER TABLE `system_admin`
  ADD CONSTRAINT `system_admin_ibfk_1` FOREIGN KEY (`GenderId`) REFERENCES `gender` (`GenderId`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
