# ͳ����ҵ������
UPDATE `wetask_block` a,
(SELECT `BlockId` , COUNT(*) as TaskItemCount FROM `wetask_item` WHERE `IsDeleted` = 0 group by `BlockId`) b
SET a.TaskItemCount = b.TaskItemCount
where a.id = b.BlockId

# ͳ����ҵ���������
UPDATE `wetask_block` a,
(SELECT `BlockId` , COUNT(*) as TaskItemCompletedCount FROM `wetask_item` WHERE `IsDeleted` = 0 and IsCompleted= 1 group by `BlockId`) b
SET a.TaskItemCompletedCount= b.TaskItemCompletedCount
where a.id = b.BlockId

# ͳ�ƿγ��е���ҵ��Ŀ
UPDATE `wetask_block` a,
(select `BlockId`,count(*) as CourseCount from (
SELECT `BlockId` ,`CourseId` FROM `wetask_item` WHERE `IsDeleted` = 0 group by `BlockId`,`CourseId`) sub_a
group by sub_a.`BlockId`) b
SET a.CourseCount = b.CourseCount
where a.id = b.BlockId

# ɾ����������
DELETE FROM `wetask_folder` WHERE `uid` = 'odq0h0Re4kSp1rAjxiGaLR_neNu4';
DELETE FROM `wetask_block` WHERE `uid` = 'odq0h0Re4kSp1rAjxiGaLR_neNu4';
DELETE FROM `wetask_course` WHERE `uid` = 'odq0h0Re4kSp1rAjxiGaLR_neNu4';
DELETE FROM `wetask_item` WHERE `uid` = 'odq0h0Re4kSp1rAjxiGaLR_neNu4';
DELETE FROM `wetask_time` WHERE `uid` = 'odq0h0Re4kSp1rAjxiGaLR_neNu4';