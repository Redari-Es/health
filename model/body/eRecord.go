package body

import (
	"fmt"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

// 模拟视力记录数据
var eRecordData []ExerciseRecord

// 运动种类枚举
const (
	_ = iota
	None
	Running
	Cycling
	Swimming
	Yoga
	Gymnastics
)

// 运动种类字符串映射
var sportNames = map[int]string{
	None:       "不动",
	Running:    "跑步",
	Cycling:    "骑行",
	Swimming:   "游泳",
	Yoga:       "瑜伽",
	Gymnastics: "体操",
}

// 生成模拟的血糖数据
func eRecordStatus(value int) string {
	return sportNames[value]
}

// 运动种类卡路里消耗量（每分钟）
var caloriePerMinute = map[int]float64{
	None:       2.0,
	Running:    10.0,
	Cycling:    8.0,
	Swimming:   12.0,
	Yoga:       5.0,
	Gymnastics: 6.0,
}

// 计算卡路里消耗量
func calculateCalories(sportType int, duration int) float64 {
	calories := caloriePerMinute[sportType] * float64(duration)
	// 使用 fmt.Sprintf 格式化字符串，控制小数位数为2位
	caloriesStr := fmt.Sprintf("%.2f", calories)
	// 将格式化后的字符串转换为 float64 类型并返回
	caloriesFloat, _ := strconv.ParseFloat(caloriesStr, 64)
	return caloriesFloat
}

// 当前用户ID的数据模拟
func GenerateERecordData(userID int64, numRecords int) []ExerciseRecord {

	// 使用当前时间作为基准时间
	baseTime := time.Now()

	// 生成指定数量的记录
	for i := 1; i <= numRecords; i++ {
		// 随机生成值
		typeKey := rand.Intn(4) + 1
		sport := eRecordStatus(typeKey)
		duration := rand.Intn(600)
		cal := calculateCalories(typeKey, duration)

		// 随机选择状态
		// 在基准时间上加上随机的时间偏移量，模拟不同的记录时间
		recordedAt := baseTime.Add(time.Duration(rand.Intn(24*30*6)) * time.Hour) // 假设最大偏移为 6 个月
		// 格式化记录时间
		recordedAtFormatted := recordedAt.Format("2006-01-02 15:04:05")

		// 创建记录
		data := ExerciseRecord{
			Id:           int64(i),
			UserID:       userID,
			ExerciseType: sport,
			Duration:     duration,
			Calories:     cal,
			RecordedAt:   recordedAtFormatted,
		}

		// 将记录添加到数据切片中
		eRecordData = append(eRecordData, data)
	}
	return eRecordData
}

// API
// @Summary	 获取用户数据
// @Description 获取用户数据
// @Tags			eRecord
// @Accept			json
// @Produce		json
// @Param			id	path		int		true	"用户ID"
// @Success		200	{object}	Vision	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/api/eRecord [get]

// @Summary	 接收用户数据
// @Description 接收用户数据
// @Tags			eRecord
// @Accept			json
// @Produce		json
// @Param			id	path		int		true	"用户ID"
// @Success		200	{object}	Vision	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/api/eRecord [post]

// @Summary	 更新用户数据
// @Description 更新用户数据
// @Tags			eRecord
// @Accept			json
// @Produce		json
// @Param			id	path		int		true	"用户ID"
// @Success		200	{object}	Vision	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/api/eRecord [update]

// @Summary	 删除用户数据
// @Description 删除用户数据
// @Tags			eRecord
// @Accept			json
// @Produce		json
// @Param			id	path		int		true	"用户ID"
// @Success		200	{object}	Vision	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/api/eRecord [delete]

func GetERecord(c *gin.Context) {
	id := rand.Int63n(1000) + 1
	if len(eRecordData) == 0 {
		eRecordData = make([]ExerciseRecord, 0) // 使用 make 函数初始化一个空的切片
		GenerateERecordData(id, 10)
	}
	c.JSON(http.StatusOK, eRecordData)
}

func PostERecord(c *gin.Context) {
	var data ExerciseRecord
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// 获取请求体中的所有字段
	// var requestData map[string]interface{}
	// if err := c.BindJSON(&requestData); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error(), "Message": "requestData"})
	// 	return
	// }

	// 从 requestData 中获取必要的字段值
	/*
		sportKey := int(requestData["sport"].(float64)) // 注意类型转换
		sport := eRecordStatus(sportKey)
		duration := int(requestData["duration"].(float64)) // 注意类型转换
	*/
	sport := eRecordStatus(data.Sport)
	// 设置记录ID和UserID和记录时间
	data.Id = int64(len(eRecordData) + 1)
	data.ExerciseType = sport
	data.Calories = calculateCalories(data.Sport, data.Duration)

	if data.UserID == 0 {
		userID := rand.Int63n(1000) + 1
		data.UserID = userID
	}
	data.RecordedAt = GetTime()
	fmt.Println(data)

	// 添加记录到全局数组
	eRecordData = append(eRecordData, data)

	// 在此处进行处理逻辑，例如保存数据到数据库等

	c.JSON(http.StatusOK, gin.H{"message": "数据成功接收", "data": data})
}

func UpdateERecord(c *gin.Context) {
	// 从请求中获取要更新的记录的 ID
	id := c.Param("id")

	var data ExerciseRecord
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// 从请求中解析 JSON 数据并更新到 visionRecords 中对应的记录
	var requestData map[string]interface{}
	if err := c.BindJSON(&requestData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	sportKey := requestData["sport"].(int)
	sport := eRecordStatus(sportKey)

	// 遍历记录列表，查找对应的记录并更新
	for index, record := range eRecordData {
		if strconv.FormatInt(record.Id, 10) == id {
			// 更新记录信息
			eRecordData[index].ExerciseType = sport
			eRecordData[index].Duration = data.Duration
			eRecordData[index].Calories = calculateCalories(sportKey, data.Duration)

			// 返回成功响应，包含更新后的Records
			c.JSON(http.StatusOK, gin.H{"message": "Data updated successfully"})
			return
		}
	}

	// 如果找不到对应的记录，返回错误响应
	c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
}
func DeleteERecord(c *gin.Context) {
	// 从请求中获取要删除的视力记录的 ID
	id := c.Param("id")

	// 遍历视力记录列表，查找对应的记录并删除
	for index, record := range eRecordData {
		if strconv.FormatInt(record.Id, 10) == id {
			// 从 visionRecords 中删除对应的记录
			eRecordData = append(eRecordData[:index], eRecordData[index+1:]...)

			// 返回成功响应
			c.JSON(http.StatusOK, gin.H{"message": "Record deleted successfully"})
			return
		}
	}

	// 如果找不到对应的记录，返回错误响应
	c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
}
