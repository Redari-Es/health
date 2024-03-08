package backend

import (
	"health/middleware"
	"health/router"
	"health/util"
	"net/http"

	_ "health/docs" // swagger生成的docs目录位置

	// swagger生成的docs目录位置
	// swagger生成的docs目录位置

	"github.com/gin-contrib/pprof"
	"github.com/gin-gonic/gin"
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
	r.Use(middleware.SetupCORS()) //跨域中间件

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

	// JWT
	// 保护的路由
	// protected := r.Group("/")
	// protected.Use(util.JWTMiddleware())
	// {
	// 	protected.GET("/protected", func(c *gin.Context) {
	// 		claims := c.MustGet("claims").(*util.CustomClaims)
	// 		c.JSON(http.StatusOK, gin.H{"message": "This is a protected route", "user_id": claims.UserID})
	// 	})
	//
	// 	// 登录路由
	// 	r.POST("/login", util.loginHandler)
	// }
	r.POST("/login", util.LoginHandler)

	return r
}
