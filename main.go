package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/testdata/protoexample"
)

// Login
type Login struct {
	User     string `form:"username" json:"user" uri:"user" xml:"user" binding:"required`
	Password string `form:"password" json:"password" uri:"password" xml:"password" binding:"required`
}

func main() {
	// 1.创建路由
	r := gin.Default()
	// 2.绑定路由规则，执行的函数
	// gin.Context,封装了request和response
	// root
	r.GET("/", func(c *gin.Context) {

		c.String(http.StatusOK, "hello World!")
	})
	// user
	r.GET("/user/:name/*action", func(c *gin.Context) {
		name := c.Param("name")
		action := c.Param("action")
		// 截取
		action = strings.Trim(action, "/")
		c.String(http.StatusOK, name+" is "+action)
	})
	// user2
	r.GET("/user", func(c *gin.Context) {
		// 指定默认值
		name := c.DefaultQuery("name", "Shon")
		c.String(http.StatusOK, fmt.Sprintf("hello %s", name))
	})
	// form
	r.POST("/form", func(c *gin.Context) {
		types := c.DefaultPostForm("type", "post")
		username := c.PostForm("username")
		password := c.PostForm("userpassword")
		c.String(http.StatusOK, fmt.Sprintf("usname:%s,password:%s,type:%s", username, password, types))
	})
	// group
	v1 := r.Group("/v1")

	{
		v1.GET("/login", login)
		v1.GET("/submit", submit)
	}
	v2 := r.Group("/v2")
	{
		v2.POST("/login", login)
		v2.POST("/submit", submit)
	}
	// JSON
	r.POST("/loginJSON", func(c *gin.Context) {
		//声明接收的变量
		var json Login
		// 将request的body中的数据，自动按照json格式解析到结构体
		if err := c.ShouldBindJSON(&json); err != nil {
			// 返回错误信息
			// gin.H封装了生成json数据的工具
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		// 判断用户名密码是否正确
		if json.User != "shon" || json.Password != "admin" {
			c.JSON(http.StatusBadRequest, gin.H{"status": "304"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"status": "200"})
	})
	// form
	r.POST("/loginForm", func(c *gin.Context) {

		// 声明接收的变量
		var form Login
		//Bind()默认解析并绑定form格式
		// 根据请求头中的content-type自动推断
		if err := c.Bind(&form); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if form.User != "shon" || form.Password != "admin" {
			c.JSON(http.StatusBadRequest, gin.H{"status": "304"})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"status": "200"})
	})
	// URI
	r.GET("/:user/:password", func(c *gin.Context) {
		// 声明接收变量
		var login Login
		if err := c.ShouldBindUri(&login); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if login.User != "shon" || login.Password != "admin" {
			c.JSON(http.StatusBadRequest, gin.H{"status": "304"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"status": "200"})
	})
	// 1.JSON响应
	r.GET("/someJSON", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "someJSON", "status": 200})
	})
	// 2.结构体响应
	r.GET("/someStruct", func(c *gin.Context) {
		var msg struct {
			Name    string
			Message string
			Number  int
		}
		msg.Name = "shon"
		msg.Message = "hello"
		msg.Number = 123
		c.JSON(200, msg)
	})
	// 3.XML响应
	r.GET("/someXML", func(c *gin.Context) {
		c.XML(200, gin.H{"message": "hello xml"})
	})
	// 4.YAML响应
	r.GET("/someYAML", func(c *gin.Context) {
		c.YAML(200, gin.H{"message": "hello YAML"})
	})
	// 5.protobu
	r.GET("/someProtoBuf", func(c *gin.Context) {
		reps := []int64{int64(1), int64(2)}
		//定义数据
		label := "lebel"
		//传protobuf格式数据
		data := &protoexample.Test{
			Label: &label,
			Reps:  reps,
		}
		c.ProtoBuf(200, data)
	})
	// render1
	/*
		r.LoadHTMLGlob("view/*")
		r.GET("/index", func(c *gin.Context) {
			c.HTML(http.StatusOK, "index.html", gin.H{"title": "Hello index", "author": "Shon"})
		})
	*/
	// render2 分离式
	r.LoadHTMLGlob("view/**/*")
	r.GET("/index", func(c *gin.Context) {
		c.HTML(http.StatusOK, "page/index.html", gin.H{"title": "Hello Index", "author": "Shon"})
	})

	// 静态文件
	r.Static("/static", "./static")

	// 重定向
	r.GET("/index/shon", func(c *gin.Context) {
		c.Redirect(http.StatusMovedPermanently, "http;//www.redaries.xyz")
	})
	// 同步异步
	// 1.异步
	r.GET("/long_async", func(c *gin.Context) {
		// 需要一个副本
		copyContext := c.Copy()
		// 异步处理
		go func() {
			time.Sleep(3 * time.Second)
			log.Println("异步执行：" + copyContext.Request.URL.Path)
		}()
	})
	// 2.同步
	r.GET("/long_sync", func(c *gin.Context) {
		time.Sleep(3 * time.Second)
		log.Println("同步执行：" + c.Request.URL.Path)
	})
	// 日志文件
	gin.DisableConsoleColor()
	// Logging to a file.
	f, _ := os.Create("gin.log")
	// gin.DefaultWriter = io.MultiWriter(f)
	// 如果需要同时将日志写入文件和控制台，使用以下代码
	gin.DefaultWriter = io.MultiWriter(f, os.Stdout)

	// 3.监听端口，默认在2020
	r.Run(":2020")
}

// funtion
func login(c *gin.Context) {
	name := c.DefaultQuery("name", "shon")
	c.String(200, fmt.Sprintf("hello %s\n", name))
}
func submit(c *gin.Context) {
	name := c.DefaultQuery("name", "ShonH")
	c.String(200, fmt.Sprintf("hello %s\n", name))
}
