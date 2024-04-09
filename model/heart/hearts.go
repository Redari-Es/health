package heart

import (
	"health/model"
	"time"
)

var (
	db = model.DB
)

/*
这个 Hearts 结构体将以上三个结构体的字段整合在一起，并添加了相应的外键关系。通过在 Hearts 结构体中添加 UserID 字段作为外键，可以与用户关联起来。另外，我还为每个字段添加了独立的时间戳，用于记录每个字段的更新时间。
*/
type Hearts struct {
	Id                            int64                   `xorm:"'id' pk autoincr" json:"id"`
	UserID                        int64                   `xorm:"'user_id' index" json:"user_id"`
	HeartRateTimestamp            string                  `xorm:"heart_rate_timestamp" json:"heart_rate_timestamp"`
	HeartRateVariabilityTimestamp string                  `xorm:"hrv_timestamp" json:"hrv_timestamp"`
	RestingHeartRateTimestamp     string                  `xorm:"resting_heart_rate_timestamp" json:"resting_heart_rate_timestamp"`
	CreatedAt                     time.Time               `xorm:"created" json:"created_at"`
	UpdatedAt                     time.Time               `xorm:"updated" json:"updated_at"`
	HeartRate                     []*HeartRate            `xorm:"-"`
	HeartRateVariability          []*HeartRateVariability `xorm:"-"`
	RestingHeartRate              []*RestingHeartRate     `xorm:"-"`
}

type HeartRate struct {
	// 心率相关属性
	Id        int64     `xorm:"'id' pk autoincr" json:"id"`
	UserID    int64     `xorm:"'user_id' index" json:"user_id"`
	HeartRate int       `xorm:"heart_rate" json:"heart_rate"`
	Timestamp string    `xorm:"timestamp" json:"timestamp"`
	CreatedAt time.Time `xorm:"created" json:"created_at"`
	UpdatedAt time.Time `xorm:"updated" json:"updated_at"`
}

type HeartRateVariability struct {
	// 心率变异性相关属性
	Id        int64     `xorm:"'id' pk autoincr" json:"id"`
	UserID    int64     `xorm:"'user_id' index" json:"user_id"`
	HRV       float64   `xorm:"hrv" json:"hrv"`
	Timestamp string    `xorm:"timestamp" json:"timestamp"`
	CreatedAt time.Time `xorm:"created" json:"created_at"`
	UpdatedAt time.Time `xorm:"updated" json:"updated_at"`
}

type RestingHeartRate struct {
	// 静息心率相关属性
	Id               int64     `xorm:"'id' pk autoincr" json:"id"`
	UserID           int64     `xorm:"'user_id' index" json:"user_id"`
	RestingHeartRate int       `xorm:"resting_heart_rate" json:"resting_heart_rate"`
	Timestamp        string    `xorm:"timestamp" json:"timestamp"`
	CreatedAt        time.Time `xorm:"created" json:"created_at"`
	UpdatedAt        time.Time `xorm:"updated" json:"updated_at"`
}
