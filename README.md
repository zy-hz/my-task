（本文档是充当临时项目开发文档）

# 作业计划表

为K12学生安排每日回家作业的计划表。

taskFolder -> taskBlock -> taskCourse -> taskItem

taskBlock 表示一份作业，是学生当下需要完成的作业集合。包括若干课程，也可以是混合多个文件夹中的不同课程。建议使用日期作为BlockId，例如20170102

### taskItem数据结构

- ItemId
- FolderId 
- BlockId
- CourseId
- ItemTitle



## 版本计划

### v0.1

1. 分类显示作业

   回家作业，补习班作业、暑假作业分类作业。每个分类有最近一份的概念。日期可以作为一份作业的标记，但不作为分组的依据。在统计中可以作为一个参考指标。

2. 混合显示所有分类作业

   显示每个分类中的最后一份作业，并且按照科目合并显示。引入颜色标记不同分类的作业。



## 第三方

1. weui 标准界面库

   https://github.com/Tencent/weui/blob/master/README_cn.md

2. wafer2 腾讯云框架

   https://github.com/tencentyun/wafer2-startup/blob/master/README.md





# 技巧心得

## 开发调试

1. Sources panel 用于显示当前项目的脚本文件，同浏览器开发不同，微信小程序框架会对脚本文件进行编译的工作，所以在 Sources panel 中开发者看到的文件是经过处理之后的脚本文件，开发者的代码都会被包裹在 define 函数中，并且对于 Page 代码，在尾部会有 require 的主动调用。
2. 在腾讯云中可以启动服务器端的单步调试

