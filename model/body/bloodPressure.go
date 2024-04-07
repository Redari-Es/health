package body

import (
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

var bloodPressureData []BloodPressure

func preesureStatus(systolic, diastolic int) string {
	var statusMap = []string{"低血压", "正常", "高血压"}
	key := 0
	switch {
	case systolic <= 90 && diastolic <= 60:
		key = 0
	case systolic >= 140 && diastolic >= 90:
		key = 2
	default:
		key = 1

	}
	return statusMap[key]
}

// 生成模拟的血压数据
func GenerateBloodPressureData(userID int64, numRecords int) []BloodPressure {
	// 使用当前时间作为基准时间
	baseTime := time.Now()

	// 生成指定数量的血压记录
	for i := 1; i <= numRecords; i++ {
		// 随机生成收缩压和舒张压
		systolic := rand.Intn(150) + 90 // 假设收缩压在 90 到 240 mmHg 之间
		diastolic := rand.Intn(50) + 60 // 假设舒张压在 60 到 110 mmHg 之间

		// 随机生成脉搏
		pulse := rand.Intn(50) + 60 // 假设脉搏在 60 到 110 次/分之间
		// 随机选择血糖状态
		status := preesureStatus(systolic, diastolic)

		// 在基准时间上加上随机的时间偏移量，模拟不同的记录时间
		recordedAt := baseTime.Add(time.Duration(rand.Intn(24*30*6)) * time.Hour) // 假设最大偏移为 6 个月

		// 格式化记录时间
		recordedAtFormatted := recordedAt.Format("2006-01-02 15:04:05")

		// 创建血压记录
		data := BloodPressure{
			Id:         int64(i),
			UserID:     userID,
			Systolic:   systolic,
			Diastolic:  diastolic,
			Pulse:      pulse,
			Status:     status,
			RecordedAt: recordedAtFormatted,
		}

		// 将血压记录添加到数据切片中
		bloodPressureData = append(bloodPressureData, data)
	}

	return bloodPressureData
}

func GetBloodPressure(c *gin.Context) {
	id := rand.Int63n(1000) + 1
	if len(bloodPressureData) == 0 {
		bloodPressureData = make([]BloodPressure, 0) // 使用 make 函数初始化一个空的切片
		GenerateBloodPressureData(id, 10)
	}

	c.JSON(http.StatusOK, bloodPressureData)
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
	data.Id = int64(len(bloodPressureData) + 1)
	if data.UserID == 0 {
		data.UserID = rand.Int63n(1000) + 1
	}
	data.RecordedAt = t
	data.Status = preesureStatus(data.Systolic, data.Diastolic)

	// 添加记录到全局数组
	bloodPressureData = append(bloodPressureData, data)
	// 在此处进行处理逻辑，例如保存数据到数据库等

	c.JSON(http.StatusOK, gin.H{"message": "数据成功接收"})
}

func UpdateBloodPressure(c *gin.Context) {
	// 从请求中获取要更新的视力记录的 ID
	id := c.Param("id")

	// 从请求中解析 JSON 数据并更新到 bloodPressureData 中对应的记录
	var requestData map[string]interface{}
	if err := c.BindJSON(&requestData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 遍历视力记录列表，查找对应的记录并更新
	for index, record := range bloodPressureData {
		if strconv.FormatInt(record.Id, 10) == id {
			// 更新记录信息
			bloodPressureData[index].Systolic = requestData["systolic"].(int)
			bloodPressureData[index].Diastolic = requestData["diastolic"].(int)
			bloodPressureData[index].Pulse = requestData["pulse"].(int)
			bloodPressureData[index].Status = requestData["status"].(string)

			// 返回成功响应，包含更新后的 bloodPressureData
			c.JSON(http.StatusOK, gin.H{"message": "Data updated successfully", "Data": bloodPressureData})
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
	for index, record := range bloodPressureData {
		if strconv.FormatInt(record.Id, 10) == id {
			// 从 bloodPressureData 中删除对应的记录
			bloodPressureData = append(bloodPressureData[:index], bloodPressureData[index+1:]...)

			// 返回成功响应
			c.JSON(http.StatusOK, gin.H{"message": "Record deleted successfully"})
			return
		}
	}

	// 如果找不到对应的记录，返回错误响应
	c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
}
