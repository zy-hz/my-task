CREATE TABLE `wetask_course` (
	`id` BIGINT(20) COLLATE utf8mb4_unicode_ci NOT NULL AUTO_INCREMENT COMMENT '作业所在课目',
	`CourseName` VARCHAR(1024) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '课目',
	`uid` VARCHAR(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户编号',
	INDEX `uid` (`uid`),	
	PRIMARY KEY (`id`)
)
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ;

CREATE TABLE `wetask_folder` (
	`id` BIGINT(20) COLLATE utf8mb4_unicode_ci NOT NULL AUTO_INCREMENT COMMENT '所在文件夹编号-作业分类用',
	`FolderName` VARCHAR(1024) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '文件夹',
	`uid` VARCHAR(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户编号',
	INDEX `uid` (`uid`),	
	PRIMARY KEY (`id`)
)
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ;

CREATE TABLE `wetask_block` (
	`id` BIGINT(20) COLLATE utf8mb4_unicode_ci NOT NULL AUTO_INCREMENT COMMENT '一次作业的编号，昨夜分组用',
	`folder_id` BIGINT(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '所在文件夹编号-作业分类用',
	`BlockName` VARCHAR(1024) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '作业块',
	`CreateDate` DATETIME COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0001-01-01 00:00:00' COMMENT '布置作业日期',
	`DeliverDate` DATETIME COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0001-01-01 00:00:00' COMMENT '发布作业日期',
	`uid` VARCHAR(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户编号',
	INDEX `uid` (`uid`),	
	INDEX `folder_id` (`folder_id`),	
	INDEX `CreateDate` (`CreateDate`),	
	PRIMARY KEY (`id`)
)
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `wetask_item` (
	`id` BIGINT(20) COLLATE utf8mb4_unicode_ci NOT NULL AUTO_INCREMENT COMMENT '作业编号',
	`folder_id` BIGINT(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '所在文件夹编号-作业分类用',
	`block_id` BIGINT(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '一次作业的编号，昨夜分组用',
	`course_id` BIGINT(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '作业所在课目',
	`ItemTitle` VARCHAR(1024) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '作业标题',
	`IsCompleted` TINYINT(1) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 0 COMMENT '是否完成',
	`IsDeleted` TINYINT(1) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 0 COMMENT '是否删除',
	`uid` VARCHAR(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户编号',
	INDEX `uid` (`uid`),	
	INDEX `block_id` (`block_id`),	
	INDEX `course_id` (`course_id`),	
	PRIMARY KEY (`id`)
)
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ;