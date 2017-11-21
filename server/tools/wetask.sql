CREATE TABLE `wetask_block` (
	`BlockId` INT(11) COLLATE utf8mb4_unicode_ci NOT NULL AUTO_INCREMENT COMMENT '一次作业的编号，昨夜分组用',
	`BlockName` VARCHAR(1024) COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '作业块',
	PRIMARY KEY (`BlockId`)
)
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `wetask_course` (
	`CourseId` INT(11) COLLATE utf8mb4_unicode_ci NOT NULL AUTO_INCREMENT COMMENT '作业所在课目',
	`CourseName` VARCHAR(1024) COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '课目',
	PRIMARY KEY (`CourseId`)
)
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ;

CREATE TABLE `wetask_folder` (
	`FolderId` INT(11) COLLATE utf8mb4_unicode_ci NOT NULL AUTO_INCREMENT COMMENT '所在文件夹编号-作业分类用',
	`FolderName` VARCHAR(1024) COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '文件夹',
	PRIMARY KEY (`FolderId`)
)
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ;

CREATE TABLE `wetask_item` (
	`ItemId` INT(11) COLLATE utf8mb4_unicode_ci NOT NULL AUTO_INCREMENT COMMENT '作业编号',
	`FolderId` INT(11) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '所在文件夹编号-作业分类用',
	`BlockId` INT(11) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '一次作业的编号，昨夜分组用',
	`CourseId` INT(11) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '作业所在课目',
	`ItemTitle` VARCHAR(1024) COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '作业标题',
	PRIMARY KEY (`ItemId`)
)
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ;

INSERT INTO `wetask_folder` (`FolderId`, `FolderName`) VALUES
	(1, '回家作业');
	
INSERT INTO `wetask_course` (`CourseId`, `CourseName`) VALUES
	(1, '语文'),
	(2, '数学'),
	(3, '英语'),
	(4, '科学'),
	(5, '社会');