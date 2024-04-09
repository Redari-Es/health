package body

import (
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

// 模拟视力记录数据
var sleepData []Sleep

func TimeFormat(t time.Time) string {
	return t.Format("2006-01-02 15:04:05")
}
func parseTimeString(timeString string) (time.Time, error) {
	// 解析字符串为时间类型
	parsedTime, err := time.Parse(time.RFC3339, timeString)
	if err != nil {
		return time.Time{}, err
	}
	return parsedTime, nil
}
func calcDuration(start, end string) int {
	endTime, _ := parseTimeString(end)
	startTime, _ := parseTimeString(start)
	last := endTime.Sub(startTime)
	duration := int(last.Minutes())
	return duration
}

// 当前用户ID的数据模拟
func GenerateSleepData(userID int64, numRecords int) []Sleep {
	// 使用当前时间作为基准时间
	baseTime := time.Now()

	// 生成指定数量的血糖记录
	for i := 1; i <= numRecords; i++ {
		// 在基准时间上加上随机的时间偏移量，模拟不同的记录时间
		recordedAt := baseTime.Add(time.Duration(rand.Intn(24*30*6)) * time.Hour) // 假设最大偏移为 6 个月
		startTime := baseTime.Add(time.Duration(rand.Intn(16)) * time.Hour)
		endTime := startTime.Add(time.Duration(rand.Intn(16)) * time.Hour)
		duration := endTime.Sub(startTime)
		minute := int(duration.Minutes())
		quality := SleepQuality(rand.Intn(4))
		des := GetSleepQualityDescription(quality)
		// 格式化记录时间

		// 创建记录
		data := Sleep{
			Id:         int64(i),
			UserID:     userID,
			StartTime:  TimeFormat(startTime),
			EndTime:    TimeFormat(endTime),
			Duration:   minute,
			Quality:    quality,
			QualityDes: des,
			RecordedAt: TimeFormat(recordedAt),
		}

		// 将血糖记录添加到数据切片中
		sleepData = append(sleepData, data)
	}

	return sleepData
}

// @Summary		获取用户数据
// @Description	获取用户数据
// @Tags			sleep
// @Accept			json
// @Produce		json
// @Param			id	path		int		true	"用户ID"
// @Success		200	{object}	Vision	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/api/sleep [get]
func GetSleep(c *gin.Context) {
	// 模拟记录数据
	id := rand.Int63n(1000) + 1
	if len(sleepData) == 0 {
		sleepData = make([]Sleep, 0) // 使用 make 函数初始化一个空的切片
		GenerateSleepData(id, 10)
	}

	// 定义一个处理器函数，用于处理获取视力记录的请求
	// 将视力记录数据转换为 JSON 格式
	c.JSON(http.StatusOK, sleepData)
}

// @Summary	 接收用户数据
// @Description	接收用户前端数据
// @Tags			sleep
// @Accept			json
// @Produce		json
// @Param			id	path		int		true	"用户ID"
// @Success		200	{object}	Vision	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/api/sleep [post]
func PostSleep(c *gin.Context) {
	// 解析 JSON 数据
	var data Sleep
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 设置记录ID和UserID和记录时间
	data.Id = int64(len(sleepData) + 1)
	if data.UserID == 0 {
		data.UserID = int64(rand.Intn(1000) + 1)
	}
	data.Duration = calcDuration(data.StartTime, data.EndTime)
	data.QualityDes = GetSleepQualityDescription(data.Quality)
	SetTime(&data)

	// 添加记录到全局数组
	sleepData = append(sleepData, data)
	// 在此处进行处理逻辑，例如保存数据到数据库等

	// 返回成功响应，包含添加的新记录
	c.JSON(http.StatusOK, gin.H{"message": "数据成功接收", "Data": sleepData})
}

// @Summary	 更新用户数据
// @Description	更新用户数据
// @Tags			sleep
// @Accept			json
// @Produce		json
// @Param			id	path		int		true	"用户ID"
// @Success		200	{object}	Vision	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/api/sleep [update]
func UpdateSleep(c *gin.Context) {
	// 从请求中获取要更新的记录的 ID
	id := c.Param("id")

	// 解析 JSON 数据
	var data Sleep
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// 遍历记录列表，查找对应的记录并更新
	for index, record := range sleepData {
		if strconv.FormatInt(record.Id, 10) == id {
			// 更新记录信息
			sleepData[index].StartTime = data.StartTime
			sleepData[index].EndTime = data.EndTime
			sleepData[index].Duration = calcDuration(data.StartTime, data.EndTime)
			sleepData[index].RecordedAt = GetTime()
			sleepData[index].QualityDes = GetSleepQualityDescription(data.Quality)

			// 返回成功响应，包含更新
			c.JSON(http.StatusOK, gin.H{"message": "Data updated successfully", "Data": sleepData})
			return
		}
	}

	// 如果找不到对应的记录，返回错误响应
	c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
}

// @Summary	 更新用户数据
// @Description	更新用户数据
// @Tags			sleep
// @Accept			json
// @Produce		json
// @Param			id	path		int		true	"用户ID"
// @Success		200	{object}	Vision	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/api/sleep [delete]
func DeleteSleep(c *gin.Context) {
	// 从请求中获取要删除的记录的 ID
	id := c.Param("id")

	// 遍历记录列表，查找对应的记录并删除
	for index, record := range sleepData {
		if strconv.FormatInt(record.Id, 10) == id {
			// 从 Records 中删除对应的记录
			sleepData = append(sleepData[:index], sleepData[index+1:]...)

			// 返回成功响应
			c.JSON(http.StatusOK, gin.H{"message": "Record deleted successfully"})
			return
		}
	}

	// 如果找不到对应的记录，返回错误响应
	c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
}
