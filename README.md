（本文档是充当临时项目开发文档）

# 作业计划表

为K12学生安排每日回家作业的计划表。

## 版本计划

### v0.1

1. 新增课程
2. 新增作业



## 第三方

1. weui 标准界面库

   https://github.com/Tencent/weui/blob/master/README_cn.md

2. wafer2 腾讯云框架

   https://github.com/tencentyun/wafer2-startup/blob/master/README.md





# 技巧心得

## 开发调试

1. Sources panel 用于显示当前项目的脚本文件，同浏览器开发不同，微信小程序框架会对脚本文件进行编译的工作，所以在 Sources panel 中开发者看到的文件是经过处理之后的脚本文件，开发者的代码都会被包裹在 define 函数中，并且对于 Page 代码，在尾部会有 require 的主动调用。
2. 在腾讯云中可以启动服务器端的单步调试

