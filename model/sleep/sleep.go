package sleep

import (
	"health/model"
	"time"
)

var (
	db = model.DB
)

type SleepQuality int

const (
	Excellent SleepQuality = iota
	Good
	Regular
	Poor
)

func GetSleepQualityDescription(quality SleepQuality) string {
	switch quality {
	case Excellent:
		return "非常好"
	case Good:
		return "好"
	case Regular:
		return "一般"
	case Poor:
		return "差"
	default:
		return "未知"
	}
}

type Sleep struct {
	Id         int64        `xorm:"'id' pk autoincr" json:"id"`
	UserID     int64        `xorm:"'user_id' index" json:"user_id"`
	StartTime  time.Time    `xorm:"start_time" json:"start_time"`
	EndTime    time.Time    `xorm:"end_time" json:"end_time"`
	Duration   float64      `xorm:"duration" json:"duration"`
	Quality    SleepQuality `xorm:"quality" json:"quality"`
	RecordedAt time.Time    `xorm:"recorded_at" json:"recorded_at"`
}
