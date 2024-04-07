package frontend

import (
	"health/middleware"
	"health/model/body"
	"health/model/users"
	"net/http"

	"github.com/gin-gonic/gin"
)

// 前台api调用
func Frontend() http.Handler {
	r := gin.New()
	// 中间件
	// 默认使用两个中间件Logger、Recovery
	r.Use(middleware.LoggerMiddleware())  //日志存储中间件
	r.Use(middleware.ReadLogMiddleware()) //日志读取中间件
	r.Use(middleware.SetupCORS())         //跨域中间件

	// 路由
	r.GET("/", root)
	r.GET("/user", getAllUser)
	r.GET("/log", middleware.LogHandler)
	{
		api := r.Group("/api")
		//vision
		api.GET("/vision", body.GetVision)
		api.POST("/vision", body.PostVision)
		api.PUT("/vision/:id", body.UpdateVision)
		api.DELETE("/vision/:id", body.DeleteVision)

		//bloodSugar
		api.GET("/bloodSugar", body.GetBloodSugar)
		api.POST("/bloodSugar", body.PostBloodSugar)
		api.PUT("/bloodSugar/:id", body.UpdateBloodSugar)
		api.DELETE("/bloodSugar/:id", body.DeleteBloodSugar)
		//bloodPressure
		api.GET("/bloodPressure", body.GetBloodPressure)
		api.POST("/bloodPressure", body.PostBloodPressure)
		api.PUT("/bloodPressure/:id", body.UpdateBloodPressure)
		api.DELETE("/bloodPressure/:id", body.DeleteBloodPressure)
	}
	//User
	r.POST("/login", users.Logins)
	r.POST("/register", users.Registers)

	return r
}
