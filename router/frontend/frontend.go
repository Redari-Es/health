package frontend

import (
	"net/http"

	// _ "docs"

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
	r.GET("/user", GetAllUser)
	// r.GET("/swagger/*any", gs.WrapHandler(swaggerFiles.Handler))
	r.GET("/log", middleware.LogHandler)

	r.GET("/", Root)

	return r
}
