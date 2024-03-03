
## RESUME
- Author: Shon
- Email: shon@redaries.xyz
- Project Name: {Health}
- CopyRight:
- Blog: www.redaries.xyz
- Time: 03/04,2024


## 毕业设计
基于Gin+Xorm的健康管理系统的设计与实现
# Project Description
该管理系统用于健康信息管理

## Key Features

1. **Task Management:** Users can create, assign, and organize tasks with detailed descriptions and due dates.
   
2. **Collaboration:** Team members can collaborate on tasks, share files, and leave comments for effective communication.
   
3. **Priority Setting:** Tasks can be prioritized based on importance and urgency to help users focus on critical objectives.
   
4. **Progress Tracking:** Users can track task progress, monitor deadlines, and receive notifications for upcoming tasks.
   
5. **Reporting:** Generate reports on task completion, team productivity, and project milestones for performance analysis.


## Technology Stack
### Go
- Gin Web Framework (Web 框架)
- XORM (数据库ORM)

### Database
- Mariadb (MySQL)

### React
- Material UI
- Tailwind CSS
- Animate CSS

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
|model|数据ORM|
|pprof|性能分析 未上传|
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
