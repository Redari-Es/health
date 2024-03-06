package model

import (
	"fmt"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"xorm.io/xorm"
	"xorm.io/xorm/log"
)

var (
	DB, engine *xorm.Engine
	// DB 用于数据库的操作
	// engine 用于数据库的连接
)

const (
	userName      = "root"
	passWord      = "root"
	ipAddress     = "127.0.0.1"
	port      int = 3306
	dbName        = "health"
	charset       = "utf8mb4"
)

func InitDB() *xorm.Engine {
	// 数据库连接设置
	var err error
	// database := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=%s", userName, passWord, ipAddress, port, dbName, charset)
	database := fmt.Sprintf("%s:%s@/%s?charset=%s", userName, passWord, dbName, charset)
	// 创建连接
	engine, err := xorm.NewEngine("mysql", database)
	if err != nil {
		fmt.Printf("Failed to create Engine:%v", err)
	}

	// 数据库日志
	// 设置日志
	engine.ShowSQL(true)
	engine.Logger().SetLevel(log.LOG_DEBUG)

	// 日志存储文件
	filePath := "./logs/mysql.log"
	// 检查文件是否存在
	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		// 文件不存在，创建文件
		f, err := os.Create(filePath)
		if err != nil {
			println(err.Error())
			return nil
		}
		defer f.Close()
	} else if err != nil {
		// 其他错误
		println(err.Error())
		return nil
	} else {
		// 文件已经存在
		println("文件已存在 - 正在写入")
	}

	// 打开文件并设置日志记录器
	f, err := os.OpenFile(filePath, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		println(err.Error())
		return nil
	}

	engine.SetLogger(log.NewSimpleLogger(f))
	// 名称映射
	// Engine.SetMapper()
	//数据库连接
	err = engine.Ping()
	if err != nil {
		println("数据库链接失败")
	}

	// 数据库
	DB = engine

	//	defer engine.Close()
	return DB
}
