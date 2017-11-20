CREATE TABLE `wetask_block` (
	`BlockId` INT(11) NOT NULL AUTO_INCREMENT COMMENT '一次作业的编号，昨夜分组用',
	`BlockName` VARCHAR(1024) NULL DEFAULT NULL COMMENT '作业块',
	PRIMARY KEY (`BlockId`)
)
COLLATE='utf8_general_ci'
ENGINE=MyISAM;

CREATE TABLE `wetask_course` (
	`CourseId` INT(11) NOT NULL AUTO_INCREMENT COMMENT '作业所在课目',
	`CourseName` VARCHAR(1024) NULL DEFAULT NULL COMMENT '课目',
	PRIMARY KEY (`CourseId`)
)
COLLATE='utf8_general_ci'
ENGINE=MyISAM;

CREATE TABLE `wetask_folder` (
	`FolderId` INT(11) NOT NULL AUTO_INCREMENT COMMENT '所在文件夹编号-作业分类用',
	`FolderName` VARCHAR(1024) NULL DEFAULT NULL COMMENT '文件夹',
	PRIMARY KEY (`FolderId`)
)
COLLATE='utf8_general_ci'
ENGINE=MyISAM;

CREATE TABLE `wetask_item` (
	`ItemId` INT(11) NOT NULL AUTO_INCREMENT COMMENT '作业编号',
	`FolderId` INT(11) NOT NULL COMMENT '所在文件夹编号-作业分类用',
	`BlockId` INT(11) NOT NULL COMMENT '一次作业的编号，昨夜分组用',
	`CourseId` INT(11) NOT NULL COMMENT '作业所在课目',
	`ItemTitle` VARCHAR(1024) NULL DEFAULT NULL COMMENT '作业标题',
	PRIMARY KEY (`ItemId`)
)
COLLATE='utf8_general_ci'
ENGINE=MyISAM;

INSERT INTO `wetask_course` (`CourseId`, `CourseName`) VALUES
	(1, '语文'),
	(2, '数学'),
	(3, '英语'),
	(4, '科学'),
	(5, '社会');