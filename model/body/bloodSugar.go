package body

import (
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

// 模拟视力记录数据
var bloodSugarData []BloodSugar

const (
	NormalStatus    = "正常"
	LowSugarStatus  = "低糖"
	HighSugarStatus = "高糖"
)

// 生成模拟的血糖数据
func sugarStatus(value float64) string {
	statusMap := []string{NormalStatus, LowSugarStatus, HighSugarStatus}
	key := 0
	switch {
	case value < 3.9:
		key = 0
	case value < 6.0:
		key = 1
	default:
		key = 2
	}
	return statusMap[key]
}

// 当前用户ID的数据模拟
func GenerateBloodSugarData(userID int64, numRecords int) []BloodSugar {

	// 使用当前时间作为基准时间
	baseTime := time.Now()

	// 生成指定数量的血糖记录
	for i := 1; i <= numRecords; i++ {
		// 随机生成血糖值
		// 生成一个介于 0 到 20 之间的随机数，并将其保留小数点后一位
		value := rand.Float64() * 20 // 生成一个0到20之间的随机数

		// 将生成的浮点数保留小数点后一位
		value = float64(int(value*10)) / 10
		// 随机选择血糖状态
		// status := statusOptions[rand.Intn(len(statusOptions))]

		status := sugarStatus(value)

		// 在基准时间上加上随机的时间偏移量，模拟不同的记录时间
		recordedAt := baseTime.Add(time.Duration(rand.Intn(24*30*6)) * time.Hour) // 假设最大偏移为 6 个月

		// 格式化记录时间
		recordedAtFormatted := recordedAt.Format("2006-01-02 15:04:05")

		// 创建血糖记录
		data := BloodSugar{
			Id:         int64(i),
			UserID:     userID,
			Value:      value,
			Status:     status,
			RecordedAt: recordedAtFormatted,
		}

		// 将血糖记录添加到数据切片中
		bloodSugarData = append(bloodSugarData, data)
	}

	return bloodSugarData
}

// API
// @Summary	 获取用户数据
// @Description 获取用户数据
// @Tags			bloodSugar
// @Accept			json
// @Produce		json
// @Param			id	path		int		true	"用户ID"
// @Success		200	{object}	Vision	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/api/bloodSugar [get]

// @Summary	 接收用户数据
// @Description 接收用户数据
// @Tags			bloodSugar
// @Accept			json
// @Produce		json
// @Param			id	path		int		true	"用户ID"
// @Success		200	{object}	Vision	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/api/bloodSugar [post]

// @Summary	 更新用户数据
// @Description 更新用户数据
// @Tags			bloodSugar
// @Accept			json
// @Produce		json
// @Param			id	path		int		true	"用户ID"
// @Success		200	{object}	Vision	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/api/bloodSugar [update]

// @Summary	 删除用户数据
// @Description 删除用户数据
// @Tags			bloodSugar
// @Accept			json
// @Produce		json
// @Param			id	path		int		true	"用户ID"
// @Success		200	{object}	Vision	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/api/bloodSugar [delete]

func GetBloodSugar(c *gin.Context) {
	id := rand.Int63n(1000) + 1
	if len(bloodSugarData) == 0 {
		bloodSugarData = make([]BloodSugar, 0) // 使用 make 函数初始化一个空的切片
		GenerateBloodSugarData(id, 10)
	}
	c.JSON(http.StatusOK, bloodSugarData)
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
	data.Id = int64(len(bloodSugarData) + 1)
	if data.UserID == 0 {
		data.UserID = rand.Int63n(1000) + 1
	}
	data.RecordedAt = t
	data.Status = sugarStatus(data.Value)

	// 添加记录到全局数组
	bloodSugarData = append(bloodSugarData, data)
	// 在此处进行处理逻辑，例如保存数据到数据库等

	c.JSON(http.StatusOK, gin.H{"message": "数据成功接收", "Data": bloodSugarData})
}

func UpdateBloodSugar(c *gin.Context) {
	// 从请求中获取要更新的视力记录的 ID
	id := c.Param("id")

	// 从请求中解析 JSON 数据并更新到 Records 中对应的记录
	var requestData map[string]interface{}
	if err := c.BindJSON(&requestData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 遍历记录列表，查找对应的记录并更新
	for index, record := range bloodSugarData {
		if strconv.FormatInt(record.Id, 10) == id {
			// 更新记录信息
			bloodSugarData[index].Value = requestData["value"].(float64)
			bloodSugarData[index].Status = requestData["status"].(string)

			// 返回成功响应，包含更新后的Records
			c.JSON(http.StatusOK, gin.H{"message": "Data updated successfully", "Record": bloodSugarData})
			return
		}
	}

	// 如果找不到对应的记录，返回错误响应
	c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
}
func DeleteBloodSugar(c *gin.Context) {
	// 从请求中获取要删除的记录的 ID
	id := c.Param("id")

	// 遍历记录列表，查找对应的记录并删除
	for index, record := range bloodSugarData {
		if strconv.FormatInt(record.Id, 10) == id {
			// 从 visionRecords 中删除对应的记录
			bloodSugarData = append(bloodSugarData[:index], bloodSugarData[index+1:]...)

			// 返回成功响应
			c.JSON(http.StatusOK, gin.H{"message": "Record deleted successfully"})
			return
		}
	}

	// 如果找不到对应的记录，返回错误响应
	c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
}
