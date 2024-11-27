-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 13, 2024 at 10:48 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `grading_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `ID` int(11) NOT NULL,
  `ADMIN` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`ID`, `ADMIN`) VALUES
(1, 'Monarch Admin');

-- --------------------------------------------------------

--
-- Table structure for table `grading_db`
--

CREATE TABLE `grading_db` (
  `Id` int(11) NOT NULL,
  `Sub_code` varchar(50) NOT NULL,
  `sub_grade` varchar(50) NOT NULL,
  `remarks` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `grading_db`
--

INSERT INTO `grading_db` (`Id`, `Sub_code`, `sub_grade`, `remarks`) VALUES
(1, 'CCP 1101', '2', 'Passed'),
(2, 'CIC 1101', '1.75', 'Passed'),
(3, 'CSP 1101', '3', 'Passed'),
(4, 'MLC 1101', '3', 'Passed'),
(5, 'PPE 110', '1.75', NULL),
(6, 'ZGE 11021', '2', 'Passed'),
(7, 'ZGE 1108', '2.25', 'Passed');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `ID` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`ID`, `username`, `password`) VALUES
(1, 'admin', 'bold123'),
(78, 'qwe', '202cb962ac59075b964b07152d234b70'),
(79, 'akjfkontol', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3e'),
(80, 'qwe', 'b5ba77af1f7bda735894e746a199acb1d2c836424da2fc46be'),
(81, 'q', '2e96772232487fb3a058d58f2c310023e07e4017c94d56cc5f'),
(82, 'q', '2e96772232487fb3a058d58f2c310023e07e4017c94d56cc5f'),
(83, 'qqwe', 'a834ee0d6b730dfefb4628f21817fc0a6aa09f3628dfee383f'),
(84, 'admin', '7fcf4ba391c48784edde599889d6e3f1e47a27db36ecc050cc'),
(85, 'q', '2e96772232487fb3a058d58f2c310023e07e4017c94d56cc5f'),
(86, '', 'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83'),
(87, '', 'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83'),
(88, '', 'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83'),
(89, '', 'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83'),
(90, '', 'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83'),
(91, 'q', '2e96772232487fb3a058d58f2c310023e07e4017c94d56cc5f'),
(92, 'q', '2e96772232487fb3a058d58f2c310023e07e4017c94d56cc5f'),
(93, 'q', '2e96772232487fb3a058d58f2c310023e07e4017c94d56cc5f'),
(94, 'q', '2e96772232487fb3a058d58f2c310023e07e4017c94d56cc5f'),
(95, 'q', '2e96772232487fb3a058d58f2c310023e07e4017c94d56cc5f'),
(96, 'q', '2e96772232487fb3a058d58f2c310023e07e4017c94d56cc5f'),
(97, 'we', '501e1a450169c4a3d9c01a8128cf3c813b509146c423b930fd'),
(98, 'q', '2e96772232487fb3a058d58f2c310023e07e4017c94d56cc5f'),
(99, 'q', '2e96772232487fb3a058d58f2c310023e07e4017c94d56cc5f'),
(100, 'q', '2e96772232487fb3a058d58f2c310023e07e4017c94d56cc5f'),
(101, 'q', '2e96772232487fb3a058d58f2c310023e07e4017c94d56cc5f'),
(102, 'q', '2e96772232487fb3a058d58f2c310023e07e4017c94d56cc5f'),
(103, 'q', '2e96772232487fb3a058d58f2c310023e07e4017c94d56cc5f'),
(104, 'q', '2e96772232487fb3a058d58f2c310023e07e4017c94d56cc5f');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `ID` int(11) NOT NULL,
  `Student_ID` int(50) NOT NULL,
  `Student_name` varchar(50) NOT NULL,
  `Course` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`ID`, `Student_ID`, `Student_name`, `Course`) VALUES
(1, 35655, 'Jhon Hendrick Cabalu', 'BSIT');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `ID` int(11) NOT NULL,
  `Sub_code` varchar(50) NOT NULL,
  `Subs` varchar(50) NOT NULL,
  `units` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`ID`, `Sub_code`, `Subs`, `units`) VALUES
(1, 'CCP 1101', 'Computer Programming 1', 3),
(2, 'CIC 1101', 'Introduction to Computing', 3),
(3, 'CSP 1101', 'Social and Professional Issues in Computing', 3),
(4, 'MLC 1101', 'Literacy/Civic Welfare/Military Science 1', 3),
(5, 'PPE 1101', 'Physical Education 1', 3),
(6, 'ZGE 11021', 'The Contemporary World', 3),
(7, 'ZGE 1108', 'Understanding the Self', 3);

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `ID` int(11) NOT NULL,
  `Teachers_ID` int(50) NOT NULL,
  `Teachers_Name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`ID`, `Teachers_ID`, `Teachers_Name`) VALUES
(1, 123456, 'Hazel Casilang');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `grading_db`
--
ALTER TABLE `grading_db`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `grading_db`
--
ALTER TABLE `grading_db`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
