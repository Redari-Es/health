package body

import (
	"math/rand"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// 模拟视力记录数据
var visionData []Vision

func GetVision(c *gin.Context) {
	t := GetTime()

	// 模拟视力记录数据
	datas := []Vision{
		{Id: 1, UserID: 1, LeftEye: 5.0, RightEye: 4.9, RecordedAt: t},
		{Id: 2, UserID: 2, LeftEye: 4.5, RightEye: 4.3, RecordedAt: t},
		{Id: 3, UserID: 3, LeftEye: 4.0, RightEye: 3.8, RecordedAt: t},
		// 添加更多的记录...
	}

	if len(visionData) == 0 {
		visionData = make([]Vision, 0) // 使用 make 函数初始化一个空的切片
		// 将 Records 添加到 visionRecords 中
		visionData = append(visionData, datas...)
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
func PostVision(c *gin.Context) {
	// 解析 JSON 数据
	var vision Vision
	if err := c.ShouldBindJSON(&vision); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 设置记录ID和UserID和记录时间
	vision.Id = int64(len(visionData) + 1)
	if vision.UserID == 0 {
		vision.UserID = int64(rand.Intn(1000) + 1)
	}
	SetTime(&vision)

	// 添加记录到全局数组
	visionData = append(visionData, vision)
	// 在此处进行处理逻辑，例如保存数据到数据库等

	// 返回成功响应，包含添加的新记录
	c.JSON(http.StatusOK, gin.H{"message": "数据成功接收", "Data": visionData})
}

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

			// 返回成功响应，包含更新后的 visionRecords
			c.JSON(http.StatusOK, gin.H{"message": "Data updated successfully", "Data": visionData})
			return
		}
	}

	// 如果找不到对应的记录，返回错误响应
	c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
}
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
