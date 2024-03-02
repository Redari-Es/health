package backend

import (
	"net/http"

	_ "github.com/shonh/health/docs" // swagger生成的docs目录位置
	"github.com/shonh/health/router"

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
	// r.Use(PortLogger())
	r.Use(middleware.LoggerMiddleware())
	r.Use(middleware.ReadAllLogMiddleware("logs"))

	// 路由
	r.GET("/", router.GetRoot)
	r.GET("/logs", middleware.LogsHandler)
	r.GET("/swagger/*any", gs.WrapHandler(sf.Handler))
	// r.GET("/swagger/*any", UIHandle)

	return r
}