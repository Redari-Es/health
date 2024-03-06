package body

import (
	"health/model"
	"time"
)

var db = model.DB

// 身体测量表
type BodyMeasurement struct {
	ID        int       `xorm:"'id' pk autoincr" json:"id"`
	UserID    int       `xorm:"'user_id'" json:"user_id"`
	Height    float64   `xorm:"'height'" json:"height"`
	Weight    float64   `xorm:"'weight'" json:"weight"`
	Waist     float64   `xorm:"'waist'" json:"waist"`
	Hip       float64   `xorm:"'hip'" json:"hip"`
	Chest     float64   `xorm:"'chest'" json:"chest"`
	CreatedAt time.Time `xorm:"'created_at' created" json:"created_at"`
	UpdatedAt time.Time `xorm:"'updated_at' updated" json:"updated_at"`
}

// 健身记录
type ExerciseRecord struct {
	ID           int       `xorm:"'id' pk autoincr" json:"id"`
	UserID       int       `xorm:"'user_id'" json:"user_id"`
	ExerciseType string    `xorm:"'exercise_type'" json:"exercise_type"`
	Duration     int       `xorm:"'duration'" json:"duration"`
	Calories     float64   `xorm:"'calories'" json:"calories"`
	CreatedAt    time.Time `xorm:"'created_at' created" json:"created_at"`
	UpdatedAt    time.Time `xorm:"'updated_at' updated" json:"updated_at"`
}

// PhysicalExam 定义了体检表的结构体
type PhysicalExam struct {
	ID            int64     `xorm:"'id' pk autoincr" json:"id"`
	UserID        int64     `xorm:"'user_id' index" json:"user_id"`
	Name          string    `xorm:"'name'" json:"name"`
	Age           int       `xorm:"'age'" json:"age"`
	Gender        string    `xorm:"'gender'" json:"gender"`
	Height        float64   `xorm:"'height'" json:"height"`
	Weight        float64   `xorm:"'weight'" json:"weight"`
	BloodPressure string    `xorm:"'blood_pressure'" json:"blood_pressure"`
	HeartRate     int       `xorm:"'heart_rate'" json:"heart_rate"`
	Glucose       float64   `xorm:"'glucose'" json:"glucose"`
	Cholesterol   float64   `xorm:"'cholesterol'" json:"cholesterol"`
	Triglycerides float64   `xorm:"'triglycerides'" json:"triglycerides"`
	EKGResult     string    `xorm:"'ekg_result'" json:"ekg_result"`
	BMI           float64   `xorm:"'bmi'" json:"bmi"`
	CreatedAt     time.Time `xorm:"created" json:"created_at"`
	UpdatedAt     time.Time `xorm:"updated" json:"updated_at"`
}

// 呼吸
type RespiratoryRate struct {
	ID          int       `xorm:"'id' pk autoincr" json:"id"`
	UserID      int       `xorm:"'user_id'" json:"user_id"`
	Respiratory int       `xorm:"'respiratory_rate'" json:"respiratory_rate"`
	RecordedAt  time.Time `xorm:"'recorded_at'" json:"recorded_at"`
	CreatedAt   time.Time `xorm:"'created_at' created" json:"created_at"`
	UpdatedAt   time.Time `xorm:"'updated_at' updated" json:"updated_at"`
}
