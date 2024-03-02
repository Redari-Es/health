package backend

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/shonh/health/middleware"
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
	r.GET("/", func(c *gin.Context) {
		c.JSON(
			http.StatusOK,
			gin.H{
				"code":  http.StatusOK,
				"error": "Welcome server 02",
			},
		)
	})
	r.GET("/logs", middleware.LogsHandler)

	return r
}
