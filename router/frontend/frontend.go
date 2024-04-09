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
		//breath
		api.GET("/breath", body.GetBreath)
		api.POST("/breath", body.PostBreath)
		api.PUT("/breath/:id", body.UpdateBreath)
		api.DELETE("/breath/:id", body.DeleteBreath)
		//eRecord
		api.GET("/eRecord", body.GetERecord)
		api.POST("/eRecord", body.PostERecord)
		api.PUT("/eRecord/:id", body.UpdateERecord)
		api.DELETE("/eRecord/:id", body.DeleteERecord)
		//bodyInfo
		api.GET("/bodyInfo", body.GetBodyInfo)
		api.POST("/bodyInfo", body.PostBodyInfo)
		api.PUT("/bodyInfo", body.PostBodyInfo)
		api.DELETE("/bodyInfo/:id", body.DeleteBodyInfo)
		//sleepInfo
		api.GET("/sleep", body.GetSleep)
		api.POST("/sleep", body.PostSleep)
		api.PUT("/sleep", body.PostSleep)
		api.DELETE("/sleep/:id", body.DeleteSleep)
	}
	//User
	r.POST("/login", users.Logins)
	r.POST("/register", users.Registers)

	return r
}
