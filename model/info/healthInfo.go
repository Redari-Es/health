package info

import (
	"time"
)

// 健康信息表
type HealthInfo struct {
	ID            int       `xorm:"'id' pk autoincr" json:"id"`
	UserID        int       `xorm:"'user_id'" json:"user_id"`
	Height        float64   `xorm:"'height'" json:"height"`
	Weight        float64   `xorm:"'weight'" json:"weight"`
	BloodPressure string    `xorm:"'blood_pressure'" json:"blood_pressure"`
	BloodSugar    float64   `xorm:"'blood_sugar'" json:"blood_sugar"`
	BMI           float64   `xorm:"'bmi'" json:"bmi"`
	CreatedAt     time.Time `xorm:"'created_at' created" json:"created_at"`
	UpdatedAt     time.Time `xorm:"'updated_at' updated" json:"updated_at"`
}
