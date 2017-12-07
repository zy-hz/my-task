# 统计作业项数量
UPDATE `wetask_block` a,
(SELECT `BlockId` , COUNT(*) as TaskItemCount FROM `wetask_item` WHERE `IsDeleted` = 0 group by `BlockId`) b
SET a.TaskItemCount = b.TaskItemCount
where a.id = b.BlockId

# 统计课程中的作业项目
UPDATE `wetask_block` a,
(select `BlockId`,count(*) as CourseCount from (
SELECT `BlockId` ,`CourseId` FROM `wetask_item` WHERE `IsDeleted` = 0 group by `BlockId`,`CourseId`) sub_a
group by sub_a.`BlockId`) b
SET a.CourseCount = b.CourseCount
where a.id = b.BlockId
