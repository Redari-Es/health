package backend

import (
	"net/http"

	_ "github.com/shonh/health/docs" // swagger生成的docs目录位置
	"github.com/shonh/health/router"

	// swagger生成的docs目录位置
	// swagger生成的docs目录位置

	"github.com/gin-contrib/pprof"
	"github.com/gin-gonic/gin"
	"github.com/shonh/health/middleware"
	sf "github.com/swaggo/files"
	gs "github.com/swaggo/gin-swagger"
)

// 后台管理
func Backend() http.Handler {
	r := gin.New()
	/*
		f, _ := os.Create("./log/backend.log")
		gin.DefaultWriter = io.MultiWriter(f, os.Stdout)
	*/
	// 中间件使用
	// r.Use(PortLogger())
	r.Use(middleware.LoggerMiddleware())
	r.Use(middleware.ReadAllLogMiddleware("logs"))

	// 路由
	r.GET("/", router.GetRoot)
	{
		admin := r.Group("/admin")
		// admin.Use(gin.BasicAuth(gin.Accounts{
		// 	"admin": "admin",
		//}))

		admin.GET("/logs", middleware.LogsHandler)
		admin.GET("/swagger/*any", gs.WrapHandler(sf.Handler))
		// r.GET("/swagger/*any", UIHandle)
	}
	// 设置pprof路由
	pprof.Register(r)
	// pprof.Register(r,"dev/pprof")

	return r
}
