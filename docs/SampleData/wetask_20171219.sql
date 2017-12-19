-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2017-12-19 00:12:03
-- 服务器版本： 5.7.18
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wetask`
--

-- --------------------------------------------------------

--
-- 表的结构 `wetask_block`
--

CREATE TABLE `wetask_block` (
  `id` bigint(20) NOT NULL COMMENT '一次作业块编号',
  `FolderId` bigint(20) NOT NULL COMMENT '所在文件夹编号-作业分类用',
  `BlockName` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '作业块',
  `CreateDate` datetime NOT NULL DEFAULT '0001-01-01 00:00:00' COMMENT '布置作业日期',
  `DeliverDate` datetime NOT NULL DEFAULT '0001-01-01 00:00:00' COMMENT '发布作业日期',
  `TaskItemCount` int(11) NOT NULL DEFAULT '0' COMMENT '作业项数量',
  `TaskItemCompletedCount` int(11) NOT NULL DEFAULT '0' COMMENT '完成的作业项数量',
  `CourseCount` int(11) NOT NULL DEFAULT '0' COMMENT '有作业项的课程数量',
  `uid` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户编号'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='作业块';

--
-- 转存表中的数据 `wetask_block`
--

INSERT INTO `wetask_block` (`id`, `FolderId`, `BlockName`, `CreateDate`, `DeliverDate`, `TaskItemCount`, `TaskItemCompletedCount`, `CourseCount`, `uid`) VALUES
(2, 6, '星期四', '2017-11-30 00:00:00', '2017-12-01 00:00:00', 10, 10, 5, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(3, 6, '星期五', '2017-12-01 00:00:00', '2017-12-02 00:00:00', 11, 11, 5, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(6, 6, '星期一', '2017-12-04 00:00:00', '2017-12-05 00:00:00', 9, 9, 5, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(10, 6, '星期二', '2017-12-05 00:00:00', '2017-12-06 00:00:00', 7, 7, 5, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(11, 6, '星期三', '2017-12-06 00:00:00', '2017-12-07 00:00:00', 8, 8, 4, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(12, 6, '星期四', '2017-12-07 00:00:00', '2017-12-08 00:00:00', 7, 7, 5, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(13, 6, '星期五', '2017-12-08 00:00:00', '2017-12-09 00:00:00', 10, 10, 5, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(14, 7, '星期六', '2017-12-02 00:00:00', '2017-12-08 00:00:00', 2, 2, 2, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(20, 7, '星期六', '2017-12-09 00:00:00', '2017-12-10 00:00:00', 2, 2, 2, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(22, 6, '星期一', '2017-12-11 00:00:00', '2017-12-12 00:00:00', 8, 8, 5, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(25, 6, '星期二', '2017-12-12 00:00:00', '2017-12-13 00:00:00', 9, 9, 5, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(26, 16, '星期三', '2017-12-13 00:00:00', '2017-12-14 00:00:00', 3, 1, 3, 'odq0h0Re4kSp1rAjxiGaLR_neNu4'),
(27, 6, '星期三', '2017-12-13 00:00:00', '2017-12-14 00:00:00', 9, 9, 4, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(28, 6, '星期四', '2017-12-14 00:00:00', '2017-12-15 00:00:00', 8, 8, 5, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(29, 6, '星期五', '2017-12-15 00:00:00', '2017-12-16 00:00:00', 1, 1, 1, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(30, 6, '星期一', '2017-12-18 00:00:00', '2017-12-19 00:00:00', 9, 9, 5, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY');

-- --------------------------------------------------------

--
-- 表的结构 `wetask_course`
--

CREATE TABLE `wetask_course` (
  `id` bigint(20) NOT NULL COMMENT '作业所在课目',
  `CourseName` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '课目',
  `uid` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户编号'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='课程';

--
-- 转存表中的数据 `wetask_course`
--

INSERT INTO `wetask_course` (`id`, `CourseName`, `uid`) VALUES
(6, '语文', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(7, '数学', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(8, '英语', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(9, '科学', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(10, '社会', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(16, '语文', 'odq0h0Re4kSp1rAjxiGaLR_neNu4'),
(17, '数学', 'odq0h0Re4kSp1rAjxiGaLR_neNu4'),
(18, '英语', 'odq0h0Re4kSp1rAjxiGaLR_neNu4'),
(19, '科学', 'odq0h0Re4kSp1rAjxiGaLR_neNu4'),
(20, '社会', 'odq0h0Re4kSp1rAjxiGaLR_neNu4');

-- --------------------------------------------------------

--
-- 表的结构 `wetask_folder`
--

CREATE TABLE `wetask_folder` (
  `id` bigint(20) NOT NULL COMMENT '所在文件夹编号-作业分类用',
  `FolderName` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '文件夹',
  `AsBlockName` tinyint(1) NOT NULL DEFAULT '0' COMMENT '作为作业项名称',
  `FolderIcon` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '文件夹图标',
  `DaysOnIcon` tinyint(1) NOT NULL DEFAULT '1' COMMENT '图标上显示日期',
  `uid` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户编号'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='作业文件夹';

--
-- 转存表中的数据 `wetask_folder`
--

INSERT INTO `wetask_folder` (`id`, `FolderName`, `AsBlockName`, `FolderIcon`, `DaysOnIcon`, `uid`) VALUES
(6, '回家作业', 0, 'folder_1', 1, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(7, '新东方', 1, 'folder_2', 1, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(8, '学而思', 1, 'folder_2', 1, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(9, '暑假作业', 1, 'folder_3', 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(10, '寒假作业', 1, 'folder_4', 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(16, '回家作业', 0, 'folder_1', 1, 'odq0h0Re4kSp1rAjxiGaLR_neNu4'),
(17, '新东方', 1, 'folder_2', 1, 'odq0h0Re4kSp1rAjxiGaLR_neNu4'),
(18, '学而思', 1, 'folder_2', 1, 'odq0h0Re4kSp1rAjxiGaLR_neNu4'),
(19, '暑假作业', 1, 'folder_3', 0, 'odq0h0Re4kSp1rAjxiGaLR_neNu4'),
(20, '寒假作业', 1, 'folder_4', 0, 'odq0h0Re4kSp1rAjxiGaLR_neNu4');

-- --------------------------------------------------------

--
-- 表的结构 `wetask_item`
--

CREATE TABLE `wetask_item` (
  `id` bigint(20) NOT NULL COMMENT '作业编号',
  `FolderId` bigint(20) NOT NULL COMMENT '所在文件夹编号-作业分类用',
  `BlockId` bigint(20) NOT NULL COMMENT '一次作业的编号',
  `CourseId` bigint(20) NOT NULL COMMENT '作业所在课目',
  `ItemTitle` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '作业标题',
  `FirstDoTime` datetime NOT NULL DEFAULT '0001-01-01 00:00:00' COMMENT '第一次时间',
  `LastDoTime` datetime NOT NULL DEFAULT '0001-01-01 00:00:00' COMMENT '最后一次时间',
  `SpendSecond` int(11) NOT NULL DEFAULT '0' COMMENT '用时，单位秒',
  `PauseSecond` int(11) NOT NULL DEFAULT '0' COMMENT '暂停时间，单位秒',
  `PauseCount` int(11) NOT NULL DEFAULT '0' COMMENT '暂停次数，单位秒',
  `IsCompleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否完成',
  `IsRunning` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否运行中',
  `EnableRemove` tinyint(1) NOT NULL DEFAULT '0' COMMENT '启动移除',
  `IsDeleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否删除',
  `uid` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户编号'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='作业项';

--
-- 转存表中的数据 `wetask_item`
--

INSERT INTO `wetask_item` (`id`, `FolderId`, `BlockId`, `CourseId`, `ItemTitle`, `FirstDoTime`, `LastDoTime`, `SpendSecond`, `PauseSecond`, `PauseCount`, `IsCompleted`, `IsRunning`, `EnableRemove`, `IsDeleted`, `uid`) VALUES
(16, 6, 2, 9, '全品a35', '2017-11-30 17:28:16', '2017-11-30 17:28:16', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(17, 6, 2, 9, '昨夜本的三十七三十八', '2017-11-30 17:28:19', '2017-11-30 17:28:19', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(18, 6, 2, 6, '文言文两则', '2017-11-30 18:52:30', '2017-11-30 19:09:32', 1022, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(19, 6, 2, 6, '准备作文', '2017-11-30 18:50:19', '2017-11-30 18:50:19', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(20, 6, 2, 6, '准备四单元考', '2017-11-30 21:11:03', '2017-12-03 09:47:55', 231, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(21, 6, 2, 7, '作业本p28到29', '2017-11-30 17:27:55', '2017-12-04 21:40:49', 2070, 4, 1, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(22, 6, 2, 10, '作业本37到38', '2017-11-30 17:27:40', '2017-12-06 19:54:03', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(23, 6, 2, 8, '玉溪有吧完成报纸', '2017-11-30 17:53:13', '2017-11-30 20:25:55', 4990, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(24, 6, 2, 8, '书写练习', '2017-11-30 20:36:59', '2017-11-30 20:49:14', 604, 131, 2, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(25, 6, 2, 8, '背课文', '2017-11-30 19:40:45', '2017-12-06 19:53:55', 298, 4215, 2, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(32, 6, 3, 6, '文言文两则', '2017-12-02 17:26:30', '2017-12-02 17:26:30', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(33, 6, 3, 6, '作文', '2017-12-02 18:21:32', '2017-12-02 19:08:30', 2818, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(34, 6, 3, 6, '复习四单元', '2017-12-03 09:47:45', '2017-12-03 09:48:02', 17, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(35, 6, 3, 7, '作业本', '2017-12-02 17:27:18', '2017-12-02 17:27:18', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(36, 6, 3, 8, '背课文', '2017-12-02 17:26:08', '2017-12-02 17:26:11', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(37, 6, 3, 8, '油漆同步阅读', '2017-12-02 17:26:24', '2017-12-02 17:26:24', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(38, 6, 3, 9, '全品b三十三十一', '2017-12-02 17:26:38', '2017-12-02 17:26:38', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(39, 6, 3, 9, '课本131到132语习', '2017-12-02 17:26:45', '2017-12-02 17:26:45', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(40, 6, 3, 10, '作业本', '2017-12-02 17:26:52', '2017-12-02 17:26:52', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(41, 6, 3, 10, '预学案做完本面', '2017-12-02 17:31:19', '2017-12-02 17:53:53', 1354, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(42, 6, 3, 8, '练习书写三页', '2017-12-02 17:27:01', '2017-12-02 17:27:01', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(50, 6, 6, 6, '预习猫', '2017-12-04 18:46:45', '2017-12-04 18:55:09', 504, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(51, 6, 6, 6, '准备默写两首古诗', '2017-12-04 18:45:24', '2017-12-04 18:45:24', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(52, 6, 6, 7, '全品的四十四十一', '2017-12-04 18:45:14', '2017-12-04 18:45:14', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(53, 6, 6, 8, '名师', '2017-12-04 18:46:08', '2017-12-04 18:46:08', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(54, 6, 6, 8, '练习书写', '2017-12-04 19:26:41', '2017-12-04 19:26:41', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(55, 6, 6, 8, '默写课文', '2017-12-04 18:58:10', '2017-12-04 19:26:37', 1707, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(56, 6, 6, 8, '默写课文', '0001-01-01 00:00:00', '0001-01-01 00:00:00', 0, 0, 0, 0, 0, 0, 1, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(57, 6, 6, 8, '默写课文', '0001-01-01 00:00:00', '0001-01-01 00:00:00', 0, 0, 0, 0, 0, 0, 1, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(58, 6, 6, 8, '默写课文', '0001-01-01 00:00:00', '0001-01-01 00:00:00', 0, 0, 0, 0, 0, 0, 1, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(59, 6, 6, 9, '订正全品B30-31', '2017-12-04 18:45:52', '2017-12-04 18:45:52', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(60, 6, 6, 9, '复习托盘天平的使用', '2017-12-04 21:30:00', '2017-12-04 21:30:00', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(61, 6, 6, 10, '作业本p40-41', '2017-12-04 18:46:27', '2017-12-04 18:46:27', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(75, 6, 10, 9, '作业本黄本子p3536', '2017-12-05 20:29:47', '2017-12-05 20:29:47', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(76, 6, 10, 6, '整理西游记', '2017-12-05 21:26:55', '2017-12-05 22:43:08', 4573, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(77, 6, 10, 7, '卷子', '2017-12-05 20:30:04', '2017-12-05 20:30:04', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(78, 6, 10, 8, '名师经典', '2017-12-05 20:29:56', '2017-12-05 20:29:56', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(79, 6, 10, 8, '练字一面', '2017-12-05 20:30:32', '2017-12-05 20:47:17', 1005, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(80, 6, 10, 8, '背默课文', '2017-12-05 22:43:16', '2017-12-05 22:43:16', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(81, 6, 10, 10, '作业本', '2017-12-05 20:29:35', '2017-12-05 21:34:42', 124, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(82, 6, 11, 6, '纠错试卷', '2017-12-06 20:03:29', '2017-12-06 20:48:20', 2691, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(83, 6, 11, 8, '名师经典a41到42', '2017-12-06 17:23:26', '2017-12-06 19:55:41', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(84, 6, 11, 8, '书写练习', '2017-12-06 18:33:38', '2017-12-06 19:53:06', 239, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(85, 6, 11, 8, '默写书p47到二b', '2017-12-06 17:22:56', '2017-12-06 17:50:57', 910, 753, 1, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(86, 6, 11, 7, '昨夜本澜本复习题第30到31', '2017-12-06 17:56:41', '2017-12-06 19:51:11', 1407, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(87, 6, 11, 7, '订正试卷', '2017-12-06 18:42:00', '2017-12-06 18:54:13', 733, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(88, 6, 11, 7, '数学书上题', '2017-12-06 21:02:30', '2017-12-06 21:51:33', 2943, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(89, 6, 11, 9, '作业本', '2017-12-06 17:22:39', '2017-12-06 19:53:40', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(102, 6, 12, 6, '试卷', '2017-12-07 20:30:16', '2017-12-07 21:16:52', 2796, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(103, 6, 12, 7, '全屏a小', '2017-12-07 17:38:39', '2017-12-07 17:45:38', 419, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(104, 6, 12, 8, '练字', '2017-12-07 21:55:28', '2017-12-07 21:55:28', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(105, 6, 12, 8, '名师经典', '2017-12-07 17:48:22', '2017-12-07 18:22:47', 2065, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(106, 6, 12, 8, '准备考试', '2017-12-09 21:15:01', '2017-12-09 21:15:01', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(107, 6, 12, 9, '全品A', '2017-12-07 19:01:13', '2017-12-07 20:10:59', 1770, 2416, 1, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(108, 6, 12, 10, '作业本', '2017-12-07 18:23:42', '2017-12-07 19:00:15', 2193, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(136, 6, 13, 6, '写作文', '2017-12-09 17:27:56', '2017-12-09 18:18:05', 3009, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(137, 6, 13, 6, '名校课堂选题', '2017-12-09 17:26:17', '2017-12-09 17:26:17', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(138, 6, 13, 6, '准备西游记测试', '2017-12-10 21:34:50', '2017-12-10 21:34:50', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(139, 6, 13, 7, '数学书', '2017-12-09 16:09:15', '2017-12-09 16:09:15', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(140, 6, 13, 8, '卷子', '2017-12-08 20:14:26', '2017-12-08 20:14:26', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(141, 6, 13, 8, '练字', '2017-12-09 17:26:27', '2017-12-09 17:26:27', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(142, 6, 13, 8, '背课文', '2017-12-10 11:11:03', '2017-12-10 11:11:03', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(143, 6, 13, 9, '全品诶密度', '2017-12-09 16:09:25', '2017-12-09 16:09:25', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(144, 6, 13, 9, '冰镇试卷', '2017-12-09 17:27:21', '2017-12-09 17:27:21', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(145, 6, 13, 10, '语学案43到56', '2017-12-08 20:14:34', '2017-12-08 20:14:34', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(146, 7, 14, 7, '我怎么知道', '2017-12-09 14:11:31', '2017-12-09 14:11:31', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(147, 7, 14, 9, '都在早上有能力', '2017-12-09 14:11:35', '2017-12-09 14:11:35', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(155, 7, 20, 7, '作业本', '2017-12-09 20:05:28', '2017-12-09 20:31:52', 1584, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(156, 7, 20, 9, '作业本', '2017-12-11 20:53:43', '2017-12-11 20:53:43', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(157, 6, 22, 6, '预习狼翻译背诵', '2017-12-11 18:38:43', '2017-12-11 19:05:31', 1608, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(158, 6, 22, 7, '作业本30到31', '2017-12-11 18:35:41', '2017-12-11 18:35:41', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(159, 6, 22, 7, '全屏ap46', '2017-12-11 18:35:45', '2017-12-11 18:35:45', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(160, 6, 22, 8, '预习', '2017-12-11 18:35:51', '2017-12-11 18:35:51', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(161, 6, 22, 8, '准备背单词', '2017-12-11 20:25:35', '2017-12-11 20:25:35', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(162, 6, 22, 9, '全品p38', '2017-12-11 18:36:02', '2017-12-11 18:36:02', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(163, 6, 22, 9, '全民at40', '2017-12-11 18:36:15', '2017-12-11 18:36:15', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(164, 6, 22, 10, '作业本第45到46第一课时', '2017-12-11 18:35:56', '2017-12-11 18:35:56', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(169, 6, 25, 6, '预习动物诗坛', '2017-12-12 18:12:14', '2017-12-12 18:39:58', 1664, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(170, 6, 25, 6, '名校课堂p43', '2017-12-12 18:40:25', '2017-12-12 19:53:40', 4395, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(171, 6, 25, 7, '全屏', '2017-12-12 17:30:29', '2017-12-12 17:30:29', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(172, 6, 25, 7, '作业本', '2017-12-12 17:30:33', '2017-12-12 17:30:33', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(173, 6, 25, 8, '没写两篇', '2017-12-12 20:03:42', '2017-12-12 20:03:42', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(174, 6, 25, 8, '纠错', '2017-12-13 06:45:57', '2017-12-13 06:45:57', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(175, 6, 25, 9, '卷子做试题', '2017-12-12 17:30:12', '2017-12-12 17:30:12', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(176, 6, 25, 9, '全品上四级', '2017-12-12 20:03:52', '2017-12-12 20:03:52', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(177, 6, 25, 10, '作业本', '2017-12-12 17:30:22', '2017-12-12 17:30:22', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(178, 16, 26, 16, 'adf', '0001-01-01 00:00:00', '0001-01-01 00:00:00', 0, 0, 0, 0, 0, 0, 1, 'odq0h0Re4kSp1rAjxiGaLR_neNu4'),
(179, 16, 26, 17, 'ddd', '2017-12-14 08:35:08', '2017-12-14 08:35:08', 0, 0, 0, 0, 1, 0, 0, 'odq0h0Re4kSp1rAjxiGaLR_neNu4'),
(180, 16, 26, 18, 'aaa', '2017-12-13 13:59:34', '2017-12-14 08:23:49', 66255, 0, 0, 1, 0, 0, 0, 'odq0h0Re4kSp1rAjxiGaLR_neNu4'),
(181, 6, 27, 6, '名校p四十四四十五四十六', '2017-12-13 21:18:54', '2017-12-13 21:18:54', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(182, 6, 27, 6, '背诵狼', '2017-12-13 20:38:17', '2017-12-13 20:38:17', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(183, 6, 27, 8, '名师经典第二课', '2017-12-13 20:38:30', '2017-12-13 20:38:30', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(184, 6, 27, 8, '小作文', '2017-12-13 20:38:38', '2017-12-13 20:38:38', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(185, 6, 27, 8, '冰镇报纸', '2017-12-13 20:38:49', '2017-12-13 20:38:49', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(186, 6, 27, 9, 'a41时45课练上', '2017-12-13 20:38:54', '2017-12-13 20:38:54', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(187, 6, 27, 7, '作业本六三', '2017-12-13 20:39:02', '2017-12-13 20:39:02', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(188, 6, 27, 7, '全品六三', '2017-12-13 20:39:11', '2017-12-13 20:39:11', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(189, 6, 27, 9, '卷子做到12题不要文字', '2017-12-13 21:18:59', '2017-12-13 21:18:59', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(190, 6, 28, 6, '名校课堂', '2017-12-14 18:00:13', '2017-12-14 18:36:46', 2193, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(191, 6, 28, 7, '作业本', '2017-12-14 17:59:13', '2017-12-14 17:59:13', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(192, 6, 28, 7, '全屏', '2017-12-14 17:59:33', '2017-12-14 17:59:33', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(193, 6, 28, 8, '没写', '2017-12-14 21:42:08', '2017-12-14 21:42:08', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(194, 6, 28, 8, '名师经典', '2017-12-14 17:59:22', '2017-12-14 17:59:22', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(195, 6, 28, 9, '作业本', '2017-12-14 17:59:41', '2017-12-14 17:59:41', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(196, 6, 28, 9, '卷子', '2017-12-14 18:37:19', '2017-12-14 20:24:46', 6447, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(197, 6, 28, 10, '作业本', '2017-12-14 17:59:47', '2017-12-14 17:59:47', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(198, 6, 29, 6, '准备考试', '2017-12-18 17:29:22', '2017-12-18 17:29:22', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(199, 6, 30, 10, '预学案', '2017-12-18 20:34:55', '2017-12-18 20:34:55', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(200, 6, 30, 6, '预习', '2017-12-18 20:36:06', '2017-12-18 20:36:06', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(201, 6, 30, 6, '准备默写', '2017-12-18 17:35:07', '2017-12-18 17:35:07', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(202, 6, 30, 7, '作业本', '2017-12-18 17:35:04', '2017-12-18 17:35:04', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(203, 6, 30, 7, '全品', '2017-12-18 20:35:31', '2017-12-18 20:35:31', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(204, 6, 30, 8, '名师金典', '2017-12-18 20:35:06', '2017-12-18 20:35:06', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(205, 6, 30, 8, '默写', '2017-12-18 20:35:16', '2017-12-18 20:35:16', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(206, 6, 30, 9, '全品', '2017-12-18 20:37:34', '2017-12-18 21:03:29', 1555, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(207, 6, 30, 9, '密度卷', '2017-12-18 17:34:59', '2017-12-18 17:34:59', 0, 0, 0, 1, 0, 0, 0, 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(208, 16, 26, 16, 'aaaaaaaa', '0001-01-01 00:00:00', '0001-01-01 00:00:00', 0, 0, 0, 0, 0, 0, 1, 'odq0h0Re4kSp1rAjxiGaLR_neNu4'),
(209, 16, 26, 16, 'abc', '0001-01-01 00:00:00', '0001-01-01 00:00:00', 0, 0, 0, 0, 0, 0, 1, 'odq0h0Re4kSp1rAjxiGaLR_neNu4'),
(210, 16, 26, 16, 'dd', '0001-01-01 00:00:00', '0001-01-01 00:00:00', 0, 0, 0, 0, 0, 0, 1, 'odq0h0Re4kSp1rAjxiGaLR_neNu4'),
(211, 16, 26, 19, 'bbb', '0001-01-01 00:00:00', '0001-01-01 00:00:00', 0, 0, 0, 0, 0, 0, 0, 'odq0h0Re4kSp1rAjxiGaLR_neNu4');

-- --------------------------------------------------------

--
-- 表的结构 `wetask_time`
--

CREATE TABLE `wetask_time` (
  `id` bigint(20) NOT NULL COMMENT '做作业的时间记录',
  `ItemId` bigint(20) NOT NULL COMMENT '作业编号',
  `CurrentTime` datetime NOT NULL DEFAULT '0001-01-01 00:00:00' COMMENT '记录时间',
  `TimeType` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '时间类型',
  `uid` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户编号'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='时间记录';

--
-- 转存表中的数据 `wetask_time`
--

INSERT INTO `wetask_time` (`id`, `ItemId`, `CurrentTime`, `TimeType`, `uid`) VALUES
(25, 22, '2017-11-30 17:27:40', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(26, 21, '2017-11-30 17:27:55', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(27, 16, '2017-11-30 17:28:16', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(28, 17, '2017-11-30 17:28:19', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(29, 21, '2017-11-30 17:51:11', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(30, 21, '2017-11-30 17:51:23', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(31, 21, '2017-11-30 17:51:42', 'pause', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(32, 21, '2017-11-30 17:51:46', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(33, 23, '2017-11-30 17:53:13', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(34, 23, '2017-11-30 17:53:28', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(35, 23, '2017-11-30 18:47:47', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(36, 19, '2017-11-30 18:50:19', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(37, 18, '2017-11-30 18:52:30', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(38, 18, '2017-11-30 19:09:32', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(51, 25, '2017-11-30 19:40:45', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(52, 25, '2017-11-30 19:41:42', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(53, 25, '2017-11-30 19:41:47', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(54, 25, '2017-11-30 19:41:50', 'pause', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(55, 25, '2017-11-30 19:42:24', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(56, 25, '2017-11-30 19:42:32', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(57, 25, '2017-11-30 19:42:34', 'pause', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(58, 23, '2017-11-30 19:57:19', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(59, 23, '2017-11-30 20:25:55', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(60, 24, '2017-11-30 20:36:59', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(61, 24, '2017-11-30 20:37:01', 'pause', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(62, 24, '2017-11-30 20:37:06', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(63, 24, '2017-11-30 20:40:15', 'pause', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(64, 24, '2017-11-30 20:42:21', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(65, 24, '2017-11-30 20:49:14', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(66, 25, '2017-11-30 20:52:15', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(67, 25, '2017-11-30 20:52:47', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(68, 25, '2017-11-30 20:56:04', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(69, 25, '2017-11-30 21:00:41', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(70, 25, '2017-11-30 21:03:46', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(71, 25, '2017-11-30 21:03:55', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(72, 25, '2017-11-30 21:10:40', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(73, 25, '2017-11-30 21:10:44', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(74, 25, '2017-11-30 21:10:51', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(75, 20, '2017-11-30 21:11:03', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(76, 20, '2017-11-30 21:11:26', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(77, 20, '2017-11-30 21:11:34', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(78, 20, '2017-11-30 21:11:38', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(79, 20, '2017-11-30 21:11:47', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(80, 21, '2017-11-30 21:26:42', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(81, 21, '2017-11-30 21:37:56', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(83, 20, '2017-11-30 22:23:32', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(84, 20, '2017-11-30 22:23:44', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(85, 20, '2017-11-30 22:24:10', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(86, 20, '2017-11-30 22:24:15', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(87, 20, '2017-11-30 22:24:31', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(88, 20, '2017-11-30 22:24:38', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(89, 20, '2017-11-30 22:27:10', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(145, 36, '2017-12-02 17:26:08', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(146, 36, '2017-12-02 17:26:11', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(147, 37, '2017-12-02 17:26:24', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(148, 32, '2017-12-02 17:26:30', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(149, 38, '2017-12-02 17:26:38', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(150, 39, '2017-12-02 17:26:45', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(151, 40, '2017-12-02 17:26:52', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(152, 42, '2017-12-02 17:27:01', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(153, 35, '2017-12-02 17:27:18', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(154, 41, '2017-12-02 17:31:19', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(155, 41, '2017-12-02 17:53:53', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(156, 33, '2017-12-02 18:21:32', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(157, 33, '2017-12-02 19:08:30', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(202, 20, '2017-12-03 09:47:35', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(203, 34, '2017-12-03 09:47:45', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(204, 20, '2017-12-03 09:47:55', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(205, 34, '2017-12-03 09:48:02', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(221, 52, '2017-12-04 18:45:14', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(222, 51, '2017-12-04 18:45:24', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(223, 59, '2017-12-04 18:45:52', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(224, 53, '2017-12-04 18:46:08', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(225, 61, '2017-12-04 18:46:27', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(226, 50, '2017-12-04 18:46:45', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(227, 50, '2017-12-04 18:55:09', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(228, 55, '2017-12-04 18:58:10', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(229, 55, '2017-12-04 19:26:37', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(230, 54, '2017-12-04 19:26:41', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(238, 60, '2017-12-04 21:30:00', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(239, 21, '2017-12-04 21:40:49', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(257, 81, '2017-12-05 20:29:35', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(258, 75, '2017-12-05 20:29:47', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(259, 78, '2017-12-05 20:29:56', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(260, 77, '2017-12-05 20:30:04', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(261, 79, '2017-12-05 20:30:32', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(262, 79, '2017-12-05 20:47:17', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(263, 76, '2017-12-05 21:26:55', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(264, 81, '2017-12-05 21:32:24', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(265, 81, '2017-12-05 21:32:38', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(266, 81, '2017-12-05 21:34:42', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(267, 76, '2017-12-05 22:43:08', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(268, 80, '2017-12-05 22:43:16', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(272, 89, '2017-12-06 17:22:39', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(273, 85, '2017-12-06 17:22:56', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(274, 85, '2017-12-06 17:23:14', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(275, 85, '2017-12-06 17:23:16', 'pause', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(276, 83, '2017-12-06 17:23:26', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(277, 83, '2017-12-06 17:23:45', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(278, 83, '2017-12-06 17:24:02', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(279, 89, '2017-12-06 17:30:52', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(280, 85, '2017-12-06 17:35:49', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(287, 85, '2017-12-06 17:50:57', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(288, 86, '2017-12-06 17:56:41', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(289, 86, '2017-12-06 18:20:08', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(290, 89, '2017-12-06 18:30:58', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(291, 84, '2017-12-06 18:33:38', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(292, 84, '2017-12-06 18:37:37', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(293, 87, '2017-12-06 18:42:00', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(294, 87, '2017-12-06 18:54:13', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(304, 86, '2017-12-06 19:51:07', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(305, 86, '2017-12-06 19:51:11', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(306, 83, '2017-12-06 19:51:16', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(307, 84, '2017-12-06 19:51:24', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(308, 83, '2017-12-06 19:51:36', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(309, 83, '2017-12-06 19:51:49', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(310, 83, '2017-12-06 19:52:16', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(311, 83, '2017-12-06 19:52:20', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(312, 83, '2017-12-06 19:52:38', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(313, 84, '2017-12-06 19:53:00', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(314, 84, '2017-12-06 19:53:06', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(315, 89, '2017-12-06 19:53:14', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(316, 89, '2017-12-06 19:53:24', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(317, 89, '2017-12-06 19:53:32', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(318, 89, '2017-12-06 19:53:40', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(319, 25, '2017-12-06 19:53:55', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(320, 22, '2017-12-06 19:54:03', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(321, 83, '2017-12-06 19:55:37', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(322, 83, '2017-12-06 19:55:41', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(325, 82, '2017-12-06 20:03:29', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(326, 82, '2017-12-06 20:48:20', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(327, 88, '2017-12-06 21:02:30', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(328, 88, '2017-12-06 21:51:33', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(340, 103, '2017-12-07 17:38:39', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(341, 103, '2017-12-07 17:45:38', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(342, 105, '2017-12-07 17:48:22', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(343, 105, '2017-12-07 18:22:47', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(344, 108, '2017-12-07 18:23:42', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(345, 108, '2017-12-07 19:00:15', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(346, 107, '2017-12-07 19:01:13', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(347, 107, '2017-12-07 19:14:53', 'pause', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(348, 107, '2017-12-07 19:55:09', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(349, 107, '2017-12-07 20:10:59', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(350, 102, '2017-12-07 20:30:16', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(351, 102, '2017-12-07 21:16:52', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(352, 104, '2017-12-07 21:55:28', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(411, 140, '2017-12-08 20:14:26', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(412, 145, '2017-12-08 20:14:34', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(448, 146, '2017-12-09 14:11:31', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(449, 147, '2017-12-09 14:11:35', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(450, 139, '2017-12-09 16:09:15', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(451, 143, '2017-12-09 16:09:25', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(459, 137, '2017-12-09 17:26:17', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(460, 141, '2017-12-09 17:26:27', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(461, 144, '2017-12-09 17:27:21', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(462, 136, '2017-12-09 17:27:56', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(466, 136, '2017-12-09 18:18:05', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(467, 155, '2017-12-09 20:05:28', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(468, 155, '2017-12-09 20:31:52', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(469, 106, '2017-12-09 21:15:01', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(470, 142, '2017-12-10 11:11:03', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(471, 138, '2017-12-10 21:34:50', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(473, 158, '2017-12-11 18:35:41', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(474, 159, '2017-12-11 18:35:45', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(475, 160, '2017-12-11 18:35:51', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(476, 164, '2017-12-11 18:35:56', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(477, 162, '2017-12-11 18:36:02', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(478, 163, '2017-12-11 18:36:15', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(479, 157, '2017-12-11 18:38:43', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(480, 157, '2017-12-11 19:05:31', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(481, 161, '2017-12-11 20:25:35', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(482, 156, '2017-12-11 20:53:43', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(485, 175, '2017-12-12 17:30:12', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(486, 177, '2017-12-12 17:30:22', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(487, 171, '2017-12-12 17:30:29', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(488, 172, '2017-12-12 17:30:33', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(489, 169, '2017-12-12 18:12:14', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(490, 169, '2017-12-12 18:39:58', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(491, 170, '2017-12-12 18:40:25', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(492, 170, '2017-12-12 19:53:40', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(493, 173, '2017-12-12 20:03:42', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(494, 176, '2017-12-12 20:03:52', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(495, 174, '2017-12-13 06:45:57', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(496, 180, '2017-12-13 13:59:34', 'start', 'odq0h0Re4kSp1rAjxiGaLR_neNu4'),
(497, 182, '2017-12-13 20:38:17', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(498, 183, '2017-12-13 20:38:30', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(499, 184, '2017-12-13 20:38:38', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(500, 185, '2017-12-13 20:38:49', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(501, 186, '2017-12-13 20:38:54', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(502, 187, '2017-12-13 20:39:02', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(503, 188, '2017-12-13 20:39:11', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(504, 181, '2017-12-13 21:18:54', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(505, 189, '2017-12-13 21:18:59', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(506, 180, '2017-12-14 08:23:49', 'done', 'odq0h0Re4kSp1rAjxiGaLR_neNu4'),
(507, 179, '2017-12-14 08:35:08', 'start', 'odq0h0Re4kSp1rAjxiGaLR_neNu4'),
(508, 191, '2017-12-14 17:59:13', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(509, 194, '2017-12-14 17:59:22', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(510, 192, '2017-12-14 17:59:33', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(511, 195, '2017-12-14 17:59:41', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(512, 197, '2017-12-14 17:59:47', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(513, 190, '2017-12-14 18:00:13', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(514, 190, '2017-12-14 18:36:46', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(515, 196, '2017-12-14 18:37:19', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(516, 196, '2017-12-14 20:24:46', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(517, 193, '2017-12-14 21:42:08', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(518, 198, '2017-12-18 17:29:22', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(519, 207, '2017-12-18 17:34:59', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(520, 202, '2017-12-18 17:35:04', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(521, 201, '2017-12-18 17:35:07', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(522, 199, '2017-12-18 20:34:55', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(523, 204, '2017-12-18 20:35:06', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(524, 205, '2017-12-18 20:35:16', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(525, 203, '2017-12-18 20:35:31', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(526, 200, '2017-12-18 20:36:06', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(527, 206, '2017-12-18 20:37:34', 'start', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY'),
(528, 206, '2017-12-18 21:03:29', 'done', 'odq0h0fxF2NvyY-0zNFeLC2VD8fY');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `wetask_block`
--
ALTER TABLE `wetask_block`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`),
  ADD KEY `FolderId` (`FolderId`),
  ADD KEY `CreateDate` (`CreateDate`);

--
-- Indexes for table `wetask_course`
--
ALTER TABLE `wetask_course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `wetask_folder`
--
ALTER TABLE `wetask_folder`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `wetask_item`
--
ALTER TABLE `wetask_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`),
  ADD KEY `BlockId` (`BlockId`),
  ADD KEY `CourseId` (`CourseId`);

--
-- Indexes for table `wetask_time`
--
ALTER TABLE `wetask_time`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`),
  ADD KEY `ItemId` (`ItemId`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `wetask_block`
--
ALTER TABLE `wetask_block`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '一次作业块编号', AUTO_INCREMENT=31;
--
-- 使用表AUTO_INCREMENT `wetask_course`
--
ALTER TABLE `wetask_course`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '作业所在课目', AUTO_INCREMENT=21;
--
-- 使用表AUTO_INCREMENT `wetask_folder`
--
ALTER TABLE `wetask_folder`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '所在文件夹编号-作业分类用', AUTO_INCREMENT=21;
--
-- 使用表AUTO_INCREMENT `wetask_item`
--
ALTER TABLE `wetask_item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '作业编号', AUTO_INCREMENT=212;
--
-- 使用表AUTO_INCREMENT `wetask_time`
--
ALTER TABLE `wetask_time`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '做作业的时间记录', AUTO_INCREMENT=529;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
