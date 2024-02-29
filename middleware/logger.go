package middleware

import (
	"fmt"
	"io"
	"log"
	"os"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

func LoggerMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 开始时间
		startTime := time.Now()

		// 处理请求
		c.Next()

		// 结束时间
		endTime := time.Now()

		// 提取请求信息
		clientIP := c.ClientIP()
		method := c.Request.Method
		path := c.Request.URL.Path
		statusCode := c.Writer.Status()
		latency := endTime.Sub(startTime)

		// 打开日志文件
		host := strings.Split(c.Request.Host, ":")
		port := host[len(host)-1]
		logFile := fmt.Sprintf("./logs/server_%s.log", port)
		file, err := os.OpenFile(logFile, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
		// file, err := os.Create(logFile)
		// file, err := os.OpenFile("access.log", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0666)
		if err != nil {
			fmt.Println("Failed to open log file:", err)
			return
		}
		defer file.Close()

		// 日志格式
		// logMessage := fmt.Sprintf("[Gin] %v | %3d | %13v | %15s | %-7s %s",
		logMessage := fmt.Sprintf("%v | [server_%s] | %3d | %13v | %15s | %-7s %s",
			endTime.Format("2006/01/02 - 15:04:05"),
			port,
			statusCode,
			latency,
			clientIP,
			method,
			path,
		)

		// 将日志信息写入文件
		// logger := log.New(file, os.Stdout, log.LstdFlags)
		logger := log.New(file, "", 0)
		gin.DefaultWriter = io.Writer(os.Stdout)
		logger.Println(logMessage)
		// 更新起始时间为当前请求结束时间
		startTime = endTime
	}
}

// middleware
func Logger() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 获取端口
		port := c.Request.URL.Port()
		// 打印
		log.Printf("Request received on port %s\n", port)
		c.Next()
	}
}

func LoggerToFile(filename string) gin.HandlerFunc {

	f, err := os.Create(filename)
	if err != nil {
		panic(err)
	}
	defer f.Close()
	// 设置 gin 的默认日志输出为同时写入文件和当前请求的响应 writer
	return func(c *gin.Context) {
		gin.DefaultWriter = io.MultiWriter(f, os.Stdout)
		c.Next()
	}
}
func PortLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		host := strings.Split(c.Request.Host, ":")
		port := host[len(host)-1]
		logFile := fmt.Sprintf("./log/service_%s.log", port)
		// file, err := os.OpenFile(logFile, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
		file, err := os.Create(logFile)
		if err != nil {
			fmt.Println("Failed to open log file:", err)
			c.Abort()
			return
		}
		defer file.Close() //延迟关闭文件
		gin.DefaultWriter = io.MultiWriter(file, os.Stdout)
		log.SetOutput(gin.DefaultWriter)
		log.Println("Log Message Starting")
		c.Next()

	}
}
