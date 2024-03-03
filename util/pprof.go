package util

import (
	"net/http/pprof"

	"github.com/gin-gonic/gin"
)

func pprofMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		pprof.Index(c.Writer, c.Request)
		pprof.Cmdline(c.Writer, c.Request)
		pprof.Profile(c.Writer, c.Request)
		pprof.Symbol(c.Writer, c.Request)
		pprof.Trace(c.Writer, c.Request)
		c.Abort()
	}
}

// SetupPprofRoutes 在 Gin 引擎中设置 pprof 路由
func SetupPprofRoutes(r *gin.Engine) {
	debugGroup := r.Group("/debug")
	{
		debugGroup.GET("/", func(c *gin.Context) {
			pprof.Index(c.Writer, c.Request)
		})
		debugGroup.GET("/cmdline", func(c *gin.Context) {
			pprof.Cmdline(c.Writer, c.Request)
		})
		debugGroup.GET("/profile", func(c *gin.Context) {
			pprof.Profile(c.Writer, c.Request)
		})
		debugGroup.GET("/symbol", func(c *gin.Context) {
			pprof.Symbol(c.Writer, c.Request)
		})
		debugGroup.GET("/trace", func(c *gin.Context) {
			pprof.Trace(c.Writer, c.Request)
		})
	}
}

// setupPprofRoutes 设置 pprof 路由并返回一个 gin.HandlerFunc
/*
func SetupPprofRoutes(r *gin.Engine) {
	r.GET("/debug/pprof/", gin.WrapH(pprof.Index))
	r.GET("/debug/pprof/cmdline", gin.WrapH(pprof.Cmdline))
	r.GET("/debug/pprof/profile", gin.WrapH(pprof.Profile))
	r.GET("/debug/pprof/symbol", gin.WrapH(pprof.Symbol))
	r.GET("/debug/pprof/trace", gin.WrapH(pprof.Trace))
}
*/

// setupPprofRoutes 设置 pprof 路由
/*
func SetupPprofRoutes(r *gin.Engine) {
	// 注册 pprof 路由
	r.Any("/debug/pprof/*any", func(c *gin.Context) {
		// 使用 pprof 的 HTTP 处理函数
		pprof.Index(c.Writer, c.Request)
		c.Abort()
	})
}
*/
