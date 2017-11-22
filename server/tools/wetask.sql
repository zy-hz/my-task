CREATE TABLE `wetask_block` (
	`id` BIGINT(20) COLLATE utf8mb4_unicode_ci NOT NULL AUTO_INCREMENT COMMENT '一次作业的编号，昨夜分组用',
	`block_name` VARCHAR(1024) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '作业块',
	`uid` VARCHAR(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户编号',
	INDEX `uid` (`uid`),	
	PRIMARY KEY (`id`)
)
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `wetask_course` (
	`id` BIGINT(20) COLLATE utf8mb4_unicode_ci NOT NULL AUTO_INCREMENT COMMENT '作业所在课目',
	`course_name` VARCHAR(1024) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '课目',
	`uid` VARCHAR(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户编号',
	INDEX `uid` (`uid`),	
	PRIMARY KEY (`id`)
)
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ;

CREATE TABLE `wetask_folder` (
	`id` BIGINT(20) COLLATE utf8mb4_unicode_ci NOT NULL AUTO_INCREMENT COMMENT '所在文件夹编号-作业分类用',
	`folder_name` VARCHAR(1024) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '文件夹',
	`uid` VARCHAR(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户编号',
	INDEX `uid` (`uid`),	
	PRIMARY KEY (`id`)
)
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ;

CREATE TABLE `wetask_item` (
	`id` BIGINT(20) COLLATE utf8mb4_unicode_ci NOT NULL AUTO_INCREMENT COMMENT '作业编号',
	`folder_id` BIGINT(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '所在文件夹编号-作业分类用',
	`block_id` BIGINT(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '一次作业的编号，昨夜分组用',
	`course_id` BIGINT(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '作业所在课目',
	`item_title` VARCHAR(1024) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '作业标题',
	`uid` VARCHAR(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户编号',
	INDEX `uid` (`uid`),	
	PRIMARY KEY (`id`)
)
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ;

INSERT INTO `wetask_folder` (`id`, `folder_name`, `uid`) VALUES
	(1, '回家作业', 'devtest');
	
INSERT INTO `wetask_course` (`id`, `course_name`, `uid`) VALUES
	(1, '语文', 'devtest'),
	(2, '数学', 'devtest'),
	(3, '英语', 'devtest'),
	(4, '科学', 'devtest'),
	(5, '社会', 'devtest');