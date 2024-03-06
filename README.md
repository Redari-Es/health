# RESUME

## 项目信息

- **项目名称**: {Health}
- **作者**: ShonH
- **邮箱**: shonh@redaries.xyz
- **版权信息**: MIT License
- **博客**: [www.redaries.xyz](http://www.redaries.xyz)
- **创建时间**: 

## 项目概述

- **简介** Health是一个健康管理系统
- **目标用户**
- **主要功能**

## 技术栈

- **前端**: React,Material-UI,Tailwind CSS,Animate CSS
- **后端**: Go,Gin,XORM,Mariadb(MySQL),Redis
- **API**: RESTful API
- **测试**:pprof
- **部署**: Docker,Kubernetes

## 开发进度

- **当前阶段**: 开发中
- **预计发布日期**: 2024年6月
- **里程碑**:
  - 2024年3月1日:
  - 2024年3月2日: 编写了日志中间件，用于存储到文件中，并读取以json格式输出
  - 2024年3月3日:启用了中间件Swaggor，用于API文档生成
  - 2024年3月4日: 增加了邮件发送功能，邮件配置读写，JWT令牌, Pprof 性能优化分析
  - 2024年3月6日: 拆分了models目录，进行了数据库表设计
  - 2024年4月: XXX功能完成
  - 2024年5月: XXX功能完成


## 重构优化(Refactor)
### 
**内容**
- 2024年3月4日:
    - 优化了邮件配置读取，有json和INI格式，邮件配置只上传了示例
- 2024年3月6日:
    - 将engine.Sync替换成更精准的更新Sync2
    - 将new(User)内容拆分成循环，便于添加数据表时
    - 增加DropTables，由于Sync是增量更新，有时需要先删除





## Project Structure
|Folder|Description|
|-|-|
|assets|Gin静态资源|
|conf|存放配置文件|
|docs|swagger生成的api文档|
|draw|UML图例|
|frontend-health|前端分离的UI|
|logs|日志|
|middleware|中间件|
|models|数据ORM|
|pprof|性能分析|
|router|拆分的路由|
|tmp|fresh热更新生成的可执行文件存放目录|
|util|工具方法|
|vendor|go vendor 未上传 减小体积|
|view|GinWeb 前端页面|


## 运行
### 前台
> cd frontend-health
> npm run server
### 后台
使用fresh 热加载
> fresh -c ./conf/fresh.conf



## 服务端口

|服务|端口|服务内容|
|-|-|-|
|前台|3000|用户界面|
|前台API|5001|用户API|
|后台|5002|后台管理|

## 中间件
### Swagger2.0
API文档
> swag fmt 格式
> swag init
swaggerFiles 替换成files

> 访问 localhost:5002/swagger/index.html

### pprof
性能分析


## 贡献指南

- **如何贡献**: 请查看[CONTRIBUTING.md](CONTRIBUTING.md)文件了解如何参与项目。
- **问题跟踪**: 项目问题和功能请求可以在[GitHub Issues](https://github.com/redaries/Health/issues)中提交。

## 许可证

Health项目使用MIT许可证。有关详细信息，请参见[LICENSE](LICENSE)文件。

## 联系信息

- **作者**: ShonH
- **邮箱**: shonh@redaries.xyz
- **博客**: [www.redaries.xyz](http://www.redaries.xyz)

---
