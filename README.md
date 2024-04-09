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


## 项目开发进度
由于在开始时未有详细记录时间，统一以2月10日春节开始
- **当前阶段**: 开发中
- **预计发布日期**: 2024年6月
- **里程碑**:
    - **2024年2月**
        - 2024年2月10日: 春节先建立文档
        - 2024年2月11: 开始前端React项目，边学边做
        - 2024年2月12日: 解决React-router的一些版本相关问题，了解useRoutes并采用它，路由看routes.js文件
        - 2024年2月14日: 了解MaterialUI和TailwindCSS内容
        - 2024年2月20日:完成了一些页面的编写
        - 2024年2月29日:
    - **2024年3月**
        - 2024年3月1日: 开始编写README文档
        - 2024年3月2日: 编写了日志中间件，用于存储到文件中，并读取以json格式输出
        - 2024年3月3日:启用了中间件Swaggor，用于API文档生成
        - 2024年3月4日: 增加了邮件发送功能，邮件配置读写，JWT令牌, Pprof 性能优化分析
        - 2024年2月5日: 赶论文了
        - 2024年3月6日: 拆分了models目录，进行了数据库表设计，避免依赖循环
        - 2024年3月8日: 完成论文初稿，接入Echarst图表 
    - **2024年4月**
        - 2024年4月2日: 前端菜单和图表亮色模式和深色模式功能优化
        - 2024年4月5日: 前端用户路由保护
        - 2024年4月6日: 用户注册，日志分页显示
        - 2024年4月9日: 添加了大量页面，获取后端模拟数据重构了路由，目前只能单一用户，下一步需要多用户登录实现
        - 2024年5月: XXX功能完成


## 重构优化(Refactor)
**内容**
    - **2024年2月**
        - 2024年2月10日:
        - 2024年2月10日:
    - **2024年3月**
        * 2024年3月2日:
            + 优化文档结构、提交规范
        * 2024年3月4日:
            + 优化了邮件配置读取，有json和INI格式，邮件配置只上传了示例
        * 2024年3月6日:
            + 将engine.Sync替换成更精准的更新Sync2
            + 将new(User)内容拆分成循环，便于添加数据表时
            + 增加DropTables，由于Sync是增量更新，有时需要先删除
            + 避免依赖循环





## 项目结构(Project Structure)
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
|pprof|性能分析|
|router|拆分的路由|
|tmp|fresh热更新生成的可执行文件存放目录|
|util|工具方法|
|vendor|go vendor 未上传 减小体积|
|view|GinWeb 前端页面|


## 运行
### 前台
> cd frontend-health
> npm start
> npm run build
### 后台
使用fresh 热加载
> fresh -c ./conf/fresh.conf
### 统计函数
cloc --list-file='./conf/file_list.txt'
> cloc --by-file .




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
