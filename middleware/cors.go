package middleware

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// 跨域中间件
func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		method := c.Request.Method
		origin := c.Request.Header.Get("Origin")
		if origin != "" {
			c.Header("Access-Control-Allow-Origin", "*")
			c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
			c.Header("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization")
			c.Header("Access-Control-Allow-Credentials", "true")
			c.Set("content-type", "application/json")
		}
		//放行所有OPTIONS方法
		if method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
		}
		c.Next()
	}
}

// SetupCORS 创建并返回一个 CORS 中间件
func SetupCORS() gin.HandlerFunc {
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowAllOrigins = true                          // 允许所有来源
	corsConfig.AddAllowHeaders("Authorization")                // 允许在请求中包含 Authorization 头
	corsConfig.AddAllowMethods("GET", "POST", "PUT", "DELETE") // 允许的 HTTP 方法
	// corsConfig.AllowOrigins = []string{"http://localhost:3000"} //指定允许的来源列表

	// 返回一个使用指定配置的 CORS 中间件
	return cors.New(corsConfig)
}
