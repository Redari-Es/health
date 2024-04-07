package body

import (
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

// 模拟视力记录数据
var bloodSugarRecords []BloodSugar

// BloodSugar

// 生成模拟的血糖数据
// 当前用户ID的数据模拟
func GenerateBloodSugarData(userID int64, numRecords int) []BloodSugar {
	var bloodSugarData []BloodSugar
	statusOptions := []string{"Low", "Normal", "High"}

	// 使用当前时间作为基准时间
	baseTime := time.Now()

	// 生成指定数量的血糖记录
	for i := 0; i < numRecords; i++ {
		// 随机生成血糖值
		value := rand.Float64() * 300 // 假设血糖值在 0 到 300 之间

		// 随机选择血糖状态
		status := statusOptions[rand.Intn(len(statusOptions))]

		// 在基准时间上加上随机的时间偏移量，模拟不同的记录时间
		recordedAt := baseTime.Add(time.Duration(rand.Intn(24*30*6)) * time.Hour) // 假设最大偏移为 6 个月

		// 格式化记录时间
		recordedAtFormatted := recordedAt.Format("2006-01-02 15:04:05")

		// 创建血糖记录
		bloodSugarRecord := BloodSugar{
			UserID:           userID,
			Value:            value,
			BloodSugarStatus: status,
			RecordedAt:       recordedAtFormatted,
		}

		// 将血糖记录添加到数据切片中
		bloodSugarData = append(bloodSugarData, bloodSugarRecord)
	}

	return bloodSugarData
}
func GetBloodSugar(c *gin.Context) {
	id := rand.Int63n(1000) + 1
	if len(bloodSugarRecords) == 0 {
		bloodSugarRecords = make([]BloodSugar, 0) // 使用 make 函数初始化一个空的切片
		GenerateBloodSugarData(id, 10)
	}

	c.JSON(http.StatusOK, bloodSugarRecords)
}

func PostBloodSugar(c *gin.Context) {
	t := time.Now().Format("2006-01-02 15:04:05")
	// 解析 JSON 数据
	var data BloodSugar
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
	bloodSugarRecords = append(bloodSugarRecords, data)
	// 在此处进行处理逻辑，例如保存数据到数据库等

	c.JSON(http.StatusOK, gin.H{"message": "数据成功接收", "visionRecordes": bloodSugarRecords})
}

func UpdateBloodSugar(c *gin.Context) {
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
func DeleteBloodSugar(c *gin.Context) {
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
