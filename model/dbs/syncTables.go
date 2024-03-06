package dbs

import (
	"health/model/body"
	"health/model/info"
	"health/model/other"
	"health/model/users"
	"log"

	"xorm.io/xorm"
)

// DropTables 删除所有表
func DropTables(engine *xorm.Engine) error {
	tables, err := engine.DBMetas()
	if err != nil {
		log.Fatalf("Failed to get tables: %v", err)
	}

	for _, table := range tables {
		err := engine.DropTables(table.Name)
		if err != nil {
			log.Fatalf("Failed to drop table %s: %v", table.Name, err)
		}
	}
	log.Println("Success Drop Database All Tables")
	return nil
}

// 之后优化项目
// Sync 是增量更新 若要删除表重新构建确保数据已保存
// Sync2 比 Sync更加精确
func SyncTables(engine *xorm.Engine) error {
	models := []any{
		// users
		new(users.User),
		new(users.AdminUser),
		new(users.Account),
		new(users.Family),
		new(users.Member),
		// body
		new(body.ExerciseRecord),
		new(body.BodyMeasurement),
		new(body.PhysicalExam),
		new(body.RespiratoryRate),
		// info
		new(info.HealthInfo),
		// other
		new(other.Article),
	}

	for _, model := range models {
		err := engine.Sync2(model)
		if err != nil {
			log.Fatalf("数据库表结构同步失败")
			log.Fatalf("%v", err)
		}
	}

	// 继续同步其他表结构
	/*
		err := engine.Sync2(new(AdminUser))
		if err != nil {
			return err
		}
	*/
	log.Println("Success Sync2 Database Tables")

	// 在这里继续同步其他表结构...

	return nil
}

/*
func syncTables(engine *xorm.Engine) error {
	err := engine.Sync2(new(User), new(HeartRate), new(Article), new(ExerciseRecord), new(HealthInfo))
	if err != nil {
		fmt.Println("数据库表结构同步失败")
		log.Fatalf("%v", err)
	} else {
		fmt.Println("数据库表同步成功")
	}

	err = engine.Sync2(new(AdminUser))
	if err != nil {
		return err
	}
	log.Fatalf("Success Sync2 All Tables")

	// 在这里继续同步其他表结构...
	return nil
}
*/
