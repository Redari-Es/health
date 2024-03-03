# RESUME

## 项目信息

- **项目名称**: {Health}
- **作者**: Shon
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
  - 2024年4月: 用户注册和登录功能完成
  - 2024年5月: XXX功能完成
  - 2024年6月: XXX功能完成

## 贡献指南

- **如何贡献**: 请查看[CONTRIBUTING.md](CONTRIBUTING.md)文件了解如何参与项目。
- **问题跟踪**: 项目问题和功能请求可以在[GitHub Issues](https://github.com/redaries/Health/issues)中提交。

## 许可证

Health项目使用MIT许可证。有关详细信息，请参见[LICENSE](LICENSE)文件。

## 联系信息

- **作者**: Shon
- **邮箱**: shonh@redaries.xyz
- **博客**: [www.redaries.xyz](http://www.redaries.xyz)

---




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
