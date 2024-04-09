package body

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
	StartTime  string       `xorm:"start_time" json:"start_time"`
	EndTime    string       `xorm:"end_time" json:"end_time"`
	Duration   int          `xorm:"duration" json:"duration"`
	Quality    SleepQuality `xorm:"quality" json:"-"`
	QualityDes string       `xorm:"quality_des" json:"quality_des"`
	RecordedAt string       `xorm:"recorded_at" json:"recorded_at"`
}
