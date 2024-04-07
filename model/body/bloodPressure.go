package body

import (
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

var bloodPressureRecords []BloodPressure

// 生成模拟的血压数据
func GenerateBloodPressureData(userID int64, numRecords int) []BloodPressure {
	var bloodPressureData []BloodPressure

	// 使用当前时间作为基准时间
	baseTime := time.Now()

	// 生成指定数量的血压记录
	for i := 0; i < numRecords; i++ {
		// 随机生成收缩压和舒张压
		systolic := rand.Intn(150) + 90 // 假设收缩压在 90 到 240 mmHg 之间
		diastolic := rand.Intn(50) + 60 // 假设舒张压在 60 到 110 mmHg 之间

		// 随机生成脉搏
		pulse := rand.Intn(50) + 60 // 假设脉搏在 60 到 110 次/分之间

		// 在基准时间上加上随机的时间偏移量，模拟不同的记录时间
		recordedAt := baseTime.Add(time.Duration(rand.Intn(24*30*6)) * time.Hour) // 假设最大偏移为 6 个月

		// 格式化记录时间
		recordedAtFormatted := recordedAt.Format("2006-01-02 15:04:05")

		// 创建血压记录
		bloodPressureRecord := BloodPressure{
			UserID:     userID,
			Systolic:   systolic,
			Diastolic:  diastolic,
			Pulse:      pulse,
			RecordedAt: recordedAtFormatted,
		}

		// 将血压记录添加到数据切片中
		bloodPressureData = append(bloodPressureData, bloodPressureRecord)
	}

	return bloodPressureData
}

func GetBloodPressure(c *gin.Context) {
	id := rand.Int63n(1000) + 1
	if len(bloodPressureRecords) == 0 {
		bloodPressureRecords = make([]BloodPressure, 0) // 使用 make 函数初始化一个空的切片
		GenerateBloodSugarData(id, 10)
	}

	c.JSON(http.StatusOK, bloodPressureRecords)
}

func PostBloodPressure(c *gin.Context) {
	t := GetTime()
	// 解析 JSON 数据
	var data BloodPressure
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 设置记录ID和UserID和记录时间
	data.Id = int64(len(bloodSugarRecords) + 1)
	if data.UserID == 0 {
		data.UserID = rand.Int63n(1000) + 1
	}
	data.RecordedAt = t

	// 添加记录到全局数组
	bloodPressureRecords = append(bloodPressureRecords, data)
	// 在此处进行处理逻辑，例如保存数据到数据库等

	c.JSON(http.StatusOK, gin.H{"message": "数据成功接收"})
}

func UpdateBloodPressure(c *gin.Context) {
	// 从请求中获取要更新的视力记录的 ID
	id := c.Param("id")

	// 从请求中解析 JSON 数据并更新到 visionRecords 中对应的记录
	var requestData map[string]interface{}
	if err := c.BindJSON(&requestData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 遍历视力记录列表，查找对应的记录并更新
	for index, record := range visionRecords {
		if strconv.FormatInt(record.Id, 10) == id {
			// 更新记录信息
			visionRecords[index].LeftEye = requestData["leftEye"].(float64)
			visionRecords[index].RightEye = requestData["rightEye"].(float64)

			// 返回成功响应，包含更新后的 visionRecords
			c.JSON(http.StatusOK, gin.H{"message": "Data updated successfully", "Record": visionRecords})
			return
		}
	}

	// 如果找不到对应的记录，返回错误响应
	c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
}
func DeleteBloodPressure(c *gin.Context) {
	// 从请求中获取要删除的视力记录的 ID
	id := c.Param("id")

	// 遍历视力记录列表，查找对应的记录并删除
	for index, record := range visionRecords {
		if strconv.FormatInt(record.Id, 10) == id {
			// 从 visionRecords 中删除对应的记录
			visionRecords = append(visionRecords[:index], visionRecords[index+1:]...)

			// 返回成功响应
			c.JSON(http.StatusOK, gin.H{"message": "Record deleted successfully"})
			return
		}
	}

	// 如果找不到对应的记录，返回错误响应
	c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
}
