package middleware

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

var (
	loglevel = level0
)

const (
	level0 = "INFO"  // 用于提供程序正常运行时的重要信息，比如启动信息、关键操作等。
	level1 = "DEBUG" // 用于详细级别的调试信息，通常用于开发和调试阶段。
	level2 = "WARN"  // 用于表示一些警告信息，表明程序可能存在潜在问题，但不会影响程序的正常运行。
	level3 = "ERROR" // 用于表示错误消息，如程序出现的错误、异常等。
	level4 = "FATAL" // 用于表示严重错误，可能导致程序崩溃或无法继续运行。
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
		if err != nil {
			fmt.Println("Failed to open log file:", err)
			return
		}
		defer file.Close()

		// 日志格式
		logMessage := fmt.Sprintf("[server_%s] | [%-s] | %v | %3d | %13v | %15s | %-7s | %s |",
			port,
			loglevel,
			endTime.Format("2006/01/02 - 15:04:05"),
			statusCode,
			latency,
			clientIP,
			method,
			path,
		)

		// 将日志信息写入文件
		// logger := log.New(file, os.Stdout, log.LstdFlags)
		logger := log.New(file, "", 0)
		// gin.DefaultWriter = io.MultiWriter(os.Stdout)
		logger.Println(logMessage)
		// 更新起始时间为当前请求结束时间
		startTime = endTime
	}
}

// 读取日志文件中间件
func ReadLogMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 打开日志文件
		host := strings.Split(c.Request.Host, ":")
		port := host[len(host)-1]
		logFile := fmt.Sprintf("./logs/server_%s.log", port)
		file, err := os.Open(logFile)
		if err != nil {
			fmt.Println("Failed to open log file:", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to open log file"})
			c.Abort()
			return
		}
		defer file.Close()

		// 读取日志内容
		logContent, err := io.ReadAll(file)
		if err != nil {
			fmt.Println("Failed to read log file:", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read log file"})
			c.Abort()
			return
		}

		// 将日志内容传递给下一个处理函数
		c.Set("logContent", string(logContent))

		c.Next()
	}
}

func ReadAllLogMiddleware(logsDir string) gin.HandlerFunc {
	return func(c *gin.Context) {
		// 打开指定目录
		dir, err := os.Open(logsDir)
		if err != nil {
			fmt.Println("Failed to open log directory:", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to open log directory"})
			c.Abort()
			return
		}
		defer dir.Close()

		// 读取目录内容
		files, err := dir.Readdir(0)
		if err != nil {
			fmt.Println("Failed to read log directory:", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read log directory"})
			c.Abort()
			return
		}

		logs := make(map[string]string)
		for _, file := range files {
			if file.IsDir() {
				continue
			}

			logFile := filepath.Join(logsDir, file.Name())
			logContent, err := os.ReadFile(logFile)
			if err != nil {
				fmt.Println("Failed to read log file:", err)
				continue
			}

			// 以文件名命名日志内容
			logs[file.Name()] = string(logContent)
			// logs[fmt.Sprintf("%s", file.Name())] = string(logContent)
		}

		// 将读取的日志内容传递给下一个处理函数
		c.Set("logs", logs)

		c.Next()
	}
}

// 显示日志API
/*  正常输出json
func LogHandler(c *gin.Context) {
	logContent, exists := c.Get("logContent")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Log content not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"logContent": logContent})
}
*/

// 用于美化json输出
func FormatLogContent(logContent string) string {
	var prettyJSON bytes.Buffer
	error := json.Indent(&prettyJSON, []byte(logContent), "", "    ")
	if error != nil {
		return logContent
	}
	return prettyJSON.String()
}

// 打印单日志API
func LogHandler(c *gin.Context) {
	logContent, exists := c.Get("logContent")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Log content not found"})
		return
	}

	prettyLogContent := FormatLogContent(logContent.(string))

	c.JSON(http.StatusOK, gin.H{"logContent": prettyLogContent})
}

// 打印所有日志API
func LogsHandler(c *gin.Context) {
	logs, exists := c.Get("logs")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Logs not found"})
		return
	}

	formattedLogs := make(map[string]string)
	for filename, content := range logs.(map[string]string) {
		prettyLogContent := FormatLogContent(content)
		formattedLogs[filename] = prettyLogContent
	}

	c.JSON(http.StatusOK, gin.H{"logs": formattedLogs})
}

// ENDING
// 其他日志 不适用
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
