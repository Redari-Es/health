package frontend

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/shonh/health/middleware"
)

// 前台api调用
func Frontend() http.Handler {
	r := gin.New()
	// 中间件
	// 默认使用两个中间件Logger、Recovery
	r.Use(middleware.LoggerMiddleware())
	r.Use(middleware.ReadLogMiddleware())
	// 路由
	r.GET("/", root)
	r.GET("/user", getAllUser)
	r.GET("/log", middleware.LogHandler)

	return r
}
