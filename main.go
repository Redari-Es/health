package main

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/shonh/health/model"
	"github.com/shonh/health/router/backend"
	"github.com/shonh/health/router/frontend"
	"golang.org/x/sync/errgroup"
)

// Init
func init() {
	// 数据库初始化
	model.InitDB()
}

type ServerConfig struct {
	Addr         string
	Handler      http.Handler
	ReadTimeout  time.Duration
	WriteTimeout time.Duration
}

func startServer(config ServerConfig, g *errgroup.Group) {
	server := &http.Server{
		Addr:         config.Addr,
		Handler:      config.Handler,
		ReadTimeout:  config.ReadTimeout,
		WriteTimeout: config.WriteTimeout,
	}

	g.Go(func() error {
		return server.ListenAndServe()
	})
}

func main() {
	g, _ := errgroup.WithContext(context.Background())

	servers := []ServerConfig{
		{
			Addr:         ":5001",
			Handler:      frontend.Frontend(),
			ReadTimeout:  5 * time.Second,
			WriteTimeout: 10 * time.Second,
		},
		{
			Addr:         ":5002",
			Handler:      backend.Backend(),
			ReadTimeout:  20 * time.Second,
			WriteTimeout: 70 * time.Second,
		},
	}

	for _, srv := range servers {
		startServer(srv, g)
	}

	if err := g.Wait(); err != nil {
		log.Fatal(err)
	}
}

/* first time
var (
	g errgroup.Group
)

// Main Server
func main() {

	// frontend
	server01 := &http.Server{
		Addr:         ":5001",
		Handler:      frontend.Frontend(),
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	// backend
	server02 := &http.Server{
		Addr:         ":5002",
		Handler:      backend.Backend(),
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
*/
