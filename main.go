package main

import (
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/shonh/health/middleware"
	"github.com/shonh/health/router/frontend"
	"golang.org/x/sync/errgroup"
)

var (
	g errgroup.Group
)

// 前台api调用
func router01() http.Handler {
	r := gin.New()
	// 默认使用两个中间件Logger、Recovery
	/*
		f, _ := os.Create("./log/frontend.log")
		gin.DefaultWriter = io.MultiWriter(f, os.Stdout)
	*/
	// r.Use(PortLogger())
	r.Use(middleware.LoggerMiddleware())
	// 路由
	r.GET("/user", frontend.GetAllUser)

	r.GET("/", frontend.Root)

	return r
}

// 后台管理
func router02() http.Handler {
	r := gin.New()
	/*
		f, _ := os.Create("./log/backend.log")
		gin.DefaultWriter = io.MultiWriter(f, os.Stdout)
	*/
	// r.Use(PortLogger())
	r.Use(middleware.LoggerMiddleware())

	r.GET("/", func(c *gin.Context) {
		c.JSON(
			http.StatusOK,
			gin.H{
				"code":  http.StatusOK,
				"error": "Welcome server 02",
			},
		)
	})

	return r
}

func main() {

	server01 := &http.Server{
		Addr:         ":2021",
		Handler:      router01(),
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	server02 := &http.Server{
		Addr:         ":2022",
		Handler:      router02(),
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	g.Go(func() error {
		return server01.ListenAndServe()
	})

	g.Go(func() error {
		return server02.ListenAndServe()
	})

	if err := g.Wait(); err != nil {
		log.Fatal(err)
	}
	// select {}
}
