CREATE TABLE `wetask_course` (
	`id` BIGINT(20) COLLATE utf8mb4_unicode_ci NOT NULL AUTO_INCREMENT COMMENT '作业所在课目',
	`CourseName` VARCHAR(1024) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '课目',
	`uid` VARCHAR(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户编号',
	INDEX `uid` (`uid`),	
	PRIMARY KEY (`id`)
)
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci  COMMENT='课程';

CREATE TABLE `wetask_folder` (
	`id` BIGINT(20) COLLATE utf8mb4_unicode_ci NOT NULL AUTO_INCREMENT COMMENT '所在文件夹编号-作业分类用',
	`FolderName` VARCHAR(1024) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '文件夹',
	`uid` VARCHAR(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户编号',
	INDEX `uid` (`uid`),	
	PRIMARY KEY (`id`)
)
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='作业文件夹';

CREATE TABLE `wetask_block` (
	`id` BIGINT(20) COLLATE utf8mb4_unicode_ci NOT NULL AUTO_INCREMENT COMMENT '一次作业块编号',
	`FolderId` BIGINT(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '所在文件夹编号-作业分类用',
	`BlockName` VARCHAR(1024) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '作业块',
	`CreateDate` DATETIME COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0001-01-01 00:00:00' COMMENT '布置作业日期',
	`DeliverDate` DATETIME COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0001-01-01 00:00:00' COMMENT '发布作业日期',
	`uid` VARCHAR(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户编号',
	INDEX `uid` (`uid`),	
	INDEX `FolderId` (`FolderId`),	
	INDEX `CreateDate` (`CreateDate`),	
	PRIMARY KEY (`id`)
)
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='作业块';;

CREATE TABLE `wetask_item` (
	`id` BIGINT(20) COLLATE utf8mb4_unicode_ci NOT NULL AUTO_INCREMENT COMMENT '作业编号',
	`FolderId` BIGINT(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '所在文件夹编号-作业分类用',
	`BlockId` BIGINT(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '一次作业的编号',
	`CourseId` BIGINT(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '作业所在课目',
	`ItemTitle` VARCHAR(1024) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '作业标题',
	`FirstDoTime` DATETIME COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0001-01-01 00:00:00' COMMENT '第一次时间',
	`LastDoTime` DATETIME COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0001-01-01 00:00:00' COMMENT '最后一次时间',
	`SpendSecond` INT(11) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 0 COMMENT '用时，单位秒',
	`PauseSecond` INT(11) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 0 COMMENT '暂停时间，单位秒',
	`PauseCount` INT(11) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 0 COMMENT '暂停次数，单位秒',
	`IsCompleted` TINYINT(1) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 0 COMMENT '是否完成',
	`IsRunning` TINYINT(1) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 0 COMMENT '是否运行中',
	`EnableRemove` TINYINT(1) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 0 COMMENT '启动移除',
	`IsDeleted` TINYINT(1) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 0 COMMENT '是否删除',
	`uid` VARCHAR(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户编号',
	INDEX `uid` (`uid`),	
	INDEX `BlockId` (`BlockId`),	
	INDEX `CourseId` (`CourseId`),	
	PRIMARY KEY (`id`)
)
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='作业项'; 

CREATE TABLE `wetask_time` (
	`id` BIGINT(20) COLLATE utf8mb4_unicode_ci NOT NULL AUTO_INCREMENT COMMENT '做作业的时间记录',
	`ItemId` BIGINT(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '作业编号',
	`CurrentTime` DATETIME COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0001-01-01 00:00:00' COMMENT '记录时间',
	`TimeType` VARCHAR(16) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '时间类型',
	`uid` VARCHAR(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户编号',
	INDEX `uid` (`uid`),	
	INDEX `ItemId` (`ItemId`),	
	PRIMARY KEY (`id`)
)
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='时间记录';