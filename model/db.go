package model

import (
	"fmt"
	"os"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/shonh/health/router/frontend"
	"xorm.io/xorm"
	"xorm.io/xorm/log"
)

var (
	engine    *xorm.Engine
	userName      = "root"
	passWord      = "root"
	ipAddress     = "127.0.0.1"
	port      int = 3306
	dbName        = "health"
	charset       = "utf8mb4"
)

type User struct {
	Id      int64
	Name    string
	Age     int
	Gender  int
	Avata   string
	Passwd  string    `xorm:"varchar(200)"`
	Created time.Time `xorm:"created`
	Updated time.Time `xorm:"updated`
}
type Heart struct {
	Id      int
	Rate    int
	Created time.Time `xorm:"created`
	Updated time.Time `xorm:"updated`
}

func DBInit() {
	// 数据库连接设置
	var err error
	// database := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=%s", userName, passWord, ipAddress, port, dbName, charset)
	database := fmt.Sprintf("%s:%s@/%s?charset=%s", userName, passWord, dbName, charset)
	engine, err := xorm.NewEngine("mysql", database)
	if err != nil {
		fmt.Printf("Failed to create engine:%v", err)
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
			return
		}
		defer f.Close()
	} else if err != nil {
		// 其他错误
		println(err.Error())
		return
	} else {
		// 文件已经存在
		println("文件已存在 - 正在写入")
	}

	// 打开文件并设置日志记录器
	f, err := os.OpenFile(filePath, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		println(err.Error())
		return
	}

	engine.SetLogger(log.NewSimpleLogger(f))

	// 名称映射
	// engine.SetMapper()
	//数据库连接
	err = engine.Ping()
	if err != nil {
		println("数据库链接失败")
	}

	// 数据库同步
	err = engine.Sync(new(User), new(Heart), new(frontend.Article))
	if err != nil {
		fmt.Println("数据库表结构同步失败")
	} else {
		fmt.Println("数据库表同步成功")
	}

	defer engine.Close()
}
