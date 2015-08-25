-- phpMyAdmin SQL Dump
-- version 3.5.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 22, 2013 at 01:47 AM
-- Server version: 5.5.30-cll
-- PHP Version: 5.2.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `webdan5_memorygame`
--

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE IF NOT EXISTS `scores` (
  `score_id` int(11) NOT NULL AUTO_INCREMENT,
  `score` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_bin NOT NULL,
  `email` varchar(150) COLLATE utf8_bin NOT NULL,
  `timestamp` varchar(100) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`score_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=39 ;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`score_id`, `score`, `name`, `email`, `timestamp`) VALUES
(22, 2500, 'Master', 'master@something.com', '1375506385'),
(32, 2000, 'Daniel', 'dan@example.com', '1375800728'),
(33, 3000, 'Daniel', 'daniel@awesome.com', '1375800977'),
(34, 400, 'Jenny', 'jenny@lycon.com', '1375802802'),
(35, 2000, 'The Loser', 'me@me.com', '1375847382'),
(36, 1800, 'Jason', 'jason@me.com', '1375847617'),
(37, 3100, 'PinkMary', 'mary@me.com', '1375847643'),
(38, 1300, 'johnny', 'johnny@whatever.com', '1376031728');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
