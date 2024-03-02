package router

// 用于定义通用Handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetRoot(c *gin.Context) {
	c.JSON(
		http.StatusOK,
		gin.H{
			"code":  http.StatusOK,
			"error": "Welcome server 02",
		})
}
