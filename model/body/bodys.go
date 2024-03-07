package body

import (
	"health/model"
	"time"
)

var db = model.DB

// 身体测量表
type BodyMeasurement struct {
	ID         int64     `xorm:"'id' pk autoincr" json:"id"`
	UserID     int64     `xorm:"'user_id' index" json:"user_id"`
	Height     float64   `xorm:"'height'" json:"height"`
	Weight     float64   `xorm:"'weight'" json:"weight"`
	Waist      float64   `xorm:"'waist'" json:"waist"`
	Hip        float64   `xorm:"'hip'" json:"hip"`
	Chest      float64   `xorm:"'chest'" json:"chest"`
	BloodType  int       `xorm:"'blood_type'" json:"blood_type"`
	RecordedAt time.Time `xorm:"recorded_at" json:"recorded_at"`
}

// 健身记录
type ExerciseRecord struct {
	ID           int64     `xorm:"'id' pk autoincr" json:"id"`
	UserID       int64     `xorm:"'user_id' index" json:"user_id"`
	ExerciseType string    `xorm:"'exercise_type'" json:"exercise_type"`
	Duration     float64   `xorm:"'duration'" json:"duration"`
	Calories     float64   `xorm:"'calories'" json:"calories"`
	RecordedAt   time.Time `xorm:"recorded_at" json:"recorded_at"`
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
	RecordedAt    time.Time `xorm:"recorded_at" json:"recorded_at"`
}

// 呼吸
type RespiratoryRate struct {
	ID          int64     `xorm:"'id' pk autoincr" json:"id"`
	UserID      int64     `xorm:"'user_id' index" json:"user_id"`
	Respiratory int       `xorm:"'respiratory_rate'" json:"respiratory_rate"`
	RecordedAt  time.Time `xorm:"'recorded_at'" json:"recorded_at"`
}

// 血压
type BloodPressure struct {
	ID         int64     `xorm:"pk autoincr" json:"id"`
	UserID     int64     `xorm:"'user_id' index" json:"user_id"`
	Systolic   int       `xorm:"not null" json:"systolic"`
	Diastolic  int       `xorm:"not null" json:"diastolic"`
	Pulse      int       `xorm:"not null" json:"pulse"`
	RecordedAt time.Time `xorm:"not null" json:"recorded_at"`
}

// 血糖
type BloodSugar struct {
	ID               int64     `xorm:"'id' pk autoincr" json:"id"`
	UserID           int64     `xorm:"'user_id' index" json:"user_id"`
	Value            float64   `xorm:"'value' not null" json:"value"`
	BloodSugarStatus string    `xorm:"'status' not null" json:"status"`
	RecordedAt       time.Time `xorm:"'recorded_at' not null" json:"recorded_at"`
}

// 视力
type Vision struct {
	ID         int64     `xorm:"pk autoincr" json:"id"`
	UserID     int64     `xorm:"'user_id' index" json:"user_id"`
	LeftEye    float64   `xorm:"not null" json:"left_eye"`
	RightEye   float64   `xorm:"not null" json:"right_eye"`
	Unit       string    `xorm:"not null" json:"unit"`
	RecordedAt time.Time `xorm:"not null" json:"recorded_at"`
}

// body中间表
type BodyInfo struct {
	ID                int64 `xorm:"pk autoincr" json:"id"`
	UserID            int64 `xorm:"'user_id' index" json:"user_id"`
	VisionID          int   `xorm:"'vision_id'" json:"vision_id"`
	BloodSugarID      int   `xorm:"'blood_sugar_id'" json:"blood_sugar_id"`
	BloodPressureID   int   `xorm:"'blood_pressure_id'" json:"blood_pressure_id"`
	RespiratoryRateID int   `xorm:"'respiratory_rate_id'" json:"respiratory_rate_id"`
	PhysicalExamID    int   `xorm:"'physical_exam_id'" json:"physical_exam_id"`
	ExerciseRecordID  int   `xorm:"'exercise_record_id'" json:"exercise_record_id"`
	MeasurementID     int   `xorm:"'measurement_id'" json:"measurement_id"`

	// 外键关联表
	Vision          *Vision          `xorm:"-" json:"vision"`
	BloodSugar      *BloodSugar      `xorm:"-" json:"blood_sugar"`
	BloodPressure   *BloodPressure   `xorm:"-" json:"blood_pressure"`
	RespiratoryRate *RespiratoryRate `xorm:"-" json:"respiratory_rate"`
	PhysicalExam    *PhysicalExam    `xorm:"-" json:"physical_exam"`
	ExerciseRecord  *ExerciseRecord  `xorm:"-" json:"exercise_record"`
	Measurement     *BodyMeasurement `xorm:"-" json:"measurement"`
}
