
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






## 运行
### 前台
> cd frontend-health
> npm run server
### 后台
使用fresh 热加载
> fresh -c fresh.conf



## 服务端口
前台：3000
前台API：5001
后台：5002

## 中间件
### Swagger2.0
API文档
> swag fmt 格式
> swag init
swaggerFiles 替换成files

> 访问 localhost:5002/swagger/index.html

### pprof
性能分析
