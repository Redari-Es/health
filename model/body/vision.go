package body

import (
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

// 模拟视力记录数据
var visionData []Vision

// 当前用户ID的数据模拟
func GenerateVisionData(userID int64, numRecords int) []Vision {
	// 使用当前时间作为基准时间
	baseTime := time.Now()

	// 生成指定数量的血糖记录
	for i := 1; i <= numRecords; i++ {
		// 随机生成血糖值
		// 生成一个介于 0 到 20 之间的随机数，并将其保留小数点后一位
		// 将生成的浮点数保留小数点后一位
		left := rand.Float64()*8 + 1 // 生成一个0到8之间的随机数
		left = float64(int(left*10)) / 10
		right := rand.Float64()*8 + 1 //
		right = float64(int(left*10)) / 10
		// 在基准时间上加上随机的时间偏移量，模拟不同的记录时间
		recordedAt := baseTime.Add(time.Duration(rand.Intn(24*30*6)) * time.Hour) // 假设最大偏移为 6 个月

		// 格式化记录时间
		recordedAtFormatted := recordedAt.Format("2006-01-02 15:04:05")

		// 创建血糖记录
		data := Vision{
			Id:         int64(i),
			UserID:     userID,
			LeftEye:    left,
			RightEye:   right,
			RecordedAt: recordedAtFormatted,
		}

		// 将血糖记录添加到数据切片中
		visionData = append(visionData, data)
	}

	return visionData
}

// @Summary		获取用户数据
// @Description	获取用户数据
// @Tags			vision
// @Accept			json
// @Produce		json
// @Param			id	path		int		true	"用户ID"
// @Success		200	{object}	Vision	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/api/vision [get]
func GetVision(c *gin.Context) {
	// 模拟视力记录数据
	id := rand.Int63n(1000) + 1
	if len(visionData) == 0 {
		visionData = make([]Vision, 0) // 使用 make 函数初始化一个空的切片
		GenerateVisionData(id, 10)
	}

	// 定义一个处理器函数，用于处理获取视力记录的请求
	// 将视力记录数据转换为 JSON 格式
	c.JSON(http.StatusOK, visionData)
}

// 将字符串转换为浮点数
func parseFloat(str string) (float64, error) {
	// 使用 strconv.ParseFloat 将字符串转换为浮点数
	floatValue, err := strconv.ParseFloat(str, 64)
	if err != nil {
		return 0, err
	}
	return floatValue, nil
}

// @Summary	 接收用户数据
// @Description	接收用户前端数据
// @Tags			vision
// @Accept			json
// @Produce		json
// @Param			id	path		int		true	"用户ID"
// @Success		200	{object}	Vision	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/api/vision [post]
func PostVision(c *gin.Context) {
	// 解析 JSON 数据
	var data Vision
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 设置记录ID和UserID和记录时间
	data.Id = int64(len(visionData) + 1)
	if data.UserID == 0 {
		data.UserID = int64(rand.Intn(1000) + 1)
	}
	SetTime(&data)

	// 添加记录到全局数组
	visionData = append(visionData, data)
	// 在此处进行处理逻辑，例如保存数据到数据库等

	// 返回成功响应，包含添加的新记录
	c.JSON(http.StatusOK, gin.H{"message": "数据成功接收", "Data": visionData})
}

// @Summary	 更新用户数据
// @Description	更新用户数据
// @Tags			vision
// @Accept			json
// @Produce		json
// @Param			id	path		int		true	"用户ID"
// @Success		200	{object}	Vision	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/api/vision [update]
func UpdateVision(c *gin.Context) {
	// 从请求中获取要更新的视力记录的 ID
	id := c.Param("id")

	// 从请求中解析 JSON 数据并更新到 visionRecords 中对应的记录
	var requestData map[string]interface{}
	if err := c.BindJSON(&requestData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 遍历视力记录列表，查找对应的记录并更新
	for index, record := range visionData {
		if strconv.FormatInt(record.Id, 10) == id {
			// 更新记录信息
			visionData[index].LeftEye = requestData["leftEye"].(float64)
			visionData[index].RightEye = requestData["rightEye"].(float64)
			visionData[index].RecordedAt = GetTime()

			// 返回成功响应，包含更新后的 visionRecords
			c.JSON(http.StatusOK, gin.H{"message": "Data updated successfully", "Data": visionData})
			return
		}
	}

	// 如果找不到对应的记录，返回错误响应
	c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
}

// @Summary	 更新用户数据
// @Description	更新用户数据
// @Tags			vision
// @Accept			json
// @Produce		json
// @Param			id	path		int		true	"用户ID"
// @Success		200	{object}	Vision	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/api/vision [delete]
func DeleteVision(c *gin.Context) {
	// 从请求中获取要删除的视力记录的 ID
	id := c.Param("id")

	// 遍历视力记录列表，查找对应的记录并删除
	for index, record := range visionData {
		if strconv.FormatInt(record.Id, 10) == id {
			// 从 visionRecords 中删除对应的记录
			visionData = append(visionData[:index], visionData[index+1:]...)

			// 返回成功响应
			c.JSON(http.StatusOK, gin.H{"message": "Record deleted successfully"})
			return
		}
	}

	// 如果找不到对应的记录，返回错误响应
	c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
}
