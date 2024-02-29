package frontend

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/shonh/health/middleware"
)

// 前台api调用
func Frontend() http.Handler {
	r := gin.New()
	// 默认使用两个中间件Logger、Recovery
	/*
		f, _ := os.Create("./log/frontend.log")
		gin.DefaultWriter = io.MultiWriter(f, os.Stdout)
	*/
	// r.Use(PortLogger())
	r.Use(middleware.LoggerMiddleware())
	// 路由
	r.GET("/user", GetAllUser)

	r.GET("/", Root)

	return r
}
