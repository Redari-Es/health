package body

import (
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

// 模拟视力记录数据
var breathData []RespiratoryRate

// 当前用户ID的数据模拟
func GenerateBreathData(userID int64, numRecords int) []RespiratoryRate {
	// 使用当前时间作为基准时间
	baseTime := time.Now()

	// 生成指定数量的血糖记录
	for i := 1; i <= numRecords; i++ {
		// 随机生成血糖值
		// 生成一个介于 0 到 20 之间的随机数，并将其保留小数点后一位
		value := rand.Intn(40) + 10
		// 在基准时间上加上随机的时间偏移量，模拟不同的记录时间
		recordedAt := baseTime.Add(time.Duration(rand.Intn(24*30*6)) * time.Hour) // 假设最大偏移为 6 个月

		// 格式化记录时间
		recordedAtFormatted := recordedAt.Format("2006-01-02 15:04:05")

		// 创建记录
		data := RespiratoryRate{
			Id:          int64(i),
			UserID:      userID,
			Respiratory: value,
			RecordedAt:  recordedAtFormatted,
		}

		// 将血糖记录添加到数据切片中
		breathData = append(breathData, data)
	}

	return breathData
}

// @Summary		获取用户数据
// @Description	获取用户数据
// @Tags			breath
// @Accept			json
// @Produce		json
// @Param			id	path		int		true	"用户ID"
// @Success		200	{object}	Vision	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/api/breath [get]
func GetBreath(c *gin.Context) {
	// 模拟记录数据
	id := rand.Int63n(1000) + 1
	if len(breathData) == 0 {
		breathData = make([]RespiratoryRate, 0) // 使用 make 函数初始化一个空的切片
		GenerateBreathData(id, 10)
	}

	// 定义一个处理器函数，用于处理获取视力记录的请求
	// 将视力记录数据转换为 JSON 格式
	c.JSON(http.StatusOK, breathData)
}

// @Summary	 接收用户数据
// @Description	接收用户前端数据
// @Tags			breath
// @Accept			json
// @Produce		json
// @Param			id	path		int		true	"用户ID"
// @Success		200	{object}	Vision	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/api/breath [post]
func PostBreath(c *gin.Context) {
	// 解析 JSON 数据
	var data RespiratoryRate
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 设置记录ID和UserID和记录时间
	data.Id = int64(len(breathData) + 1)
	if data.UserID == 0 {
		data.UserID = int64(rand.Intn(1000) + 1)
	}
	SetTime(&data)

	// 添加记录到全局数组
	breathData = append(breathData, data)
	// 在此处进行处理逻辑，例如保存数据到数据库等

	// 返回成功响应，包含添加的新记录
	c.JSON(http.StatusOK, gin.H{"message": "数据成功接收", "Data": breathData})
}

// @Summary	 更新用户数据
// @Description	更新用户数据
// @Tags			breath
// @Accept			json
// @Produce		json
// @Param			id	path		int		true	"用户ID"
// @Success		200	{object}	Vision	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/api/breath [update]
func UpdateBreath(c *gin.Context) {
	// 从请求中获取要更新的记录的 ID
	id := c.Param("id")

	// 解析 JSON 数据
	var data RespiratoryRate
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// 遍历记录列表，查找对应的记录并更新
	for index, record := range breathData {
		if strconv.FormatInt(record.Id, 10) == id {
			// 更新记录信息
			breathData[index].Respiratory = data.Respiratory
			breathData[index].RecordedAt = GetTime()

			// 返回成功响应，包含更新后的 visionRecords
			c.JSON(http.StatusOK, gin.H{"message": "Data updated successfully", "Data": breathData})
			return
		}
	}

	// 如果找不到对应的记录，返回错误响应
	c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
}

// @Summary	 更新用户数据
// @Description	更新用户数据
// @Tags			breath
// @Accept			json
// @Produce		json
// @Param			id	path		int		true	"用户ID"
// @Success		200	{object}	Vision	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/api/breath [delete]
func DeleteBreath(c *gin.Context) {
	// 从请求中获取要删除的记录的 ID
	id := c.Param("id")

	// 遍历记录列表，查找对应的记录并删除
	for index, record := range breathData {
		if strconv.FormatInt(record.Id, 10) == id {
			// 从 Records 中删除对应的记录
			breathData = append(breathData[:index], breathData[index+1:]...)

			// 返回成功响应
			c.JSON(http.StatusOK, gin.H{"message": "Record deleted successfully"})
			return
		}
	}

	// 如果找不到对应的记录，返回错误响应
	c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
}
