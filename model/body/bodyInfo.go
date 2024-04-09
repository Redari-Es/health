package body

import (
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

// 模拟记录数据
var bodyInfoData []BodyMeasurement

// 血型常量
const (
	A   = iota // A 型血
	B          // B 型血
	AB         // AB 型血
	O          // O 型血
	RH         // RH 血型
	MNS        // MNS 血型
	P          // P 血型
)

// 血型字符串对应数组
var bloodTypes = [...]string{
	A:   "A",
	B:   "B",
	AB:  "AB",
	O:   "O",
	RH:  "RH",
	MNS: "MNS",
	P:   "P",
}

// 当前用户ID的数据模拟
func GenerateBodyInfoData(userID int64, numRecords int) []BodyMeasurement {
	// 使用当前时间作为基准时间
	baseTime := time.Now()

	// 生成指定数量的血糖记录
	for i := 1; i <= numRecords; i++ {
		// 随机生成值
		height := rand.Intn(111) + 110
		weight := rand.Intn(200) + 30
		hip := rand.Intn(30) + 50
		chest := rand.Intn(30) + 50
		waist := rand.Intn(30) + 50
		bloodTypes := bloodTypes[rand.Intn(6)]

		// 随机选择状态
		// 在基准时间上加上随机的时间偏移量，模拟不同的记录时间
		recordedAt := baseTime.Add(time.Duration(rand.Intn(24*30*6)) * time.Hour) // 假设最大偏移为 6 个月
		// 格式化记录时间
		recordedAtFormatted := recordedAt.Format("2006-01-02 15:04:05")

		// 创建记录
		data := BodyMeasurement{
			Id:         int64(i),
			UserID:     userID,
			Height:     height,
			Weight:     weight,
			Waist:      waist,
			Hip:        hip,
			Chest:      chest,
			BloodType:  bloodTypes,
			RecordedAt: recordedAtFormatted,
		}

		// 将血糖记录添加到数据切片中
		bodyInfoData = append(bodyInfoData, data)
	}

	return bodyInfoData
}

// API
// @Summary	 获取用户数据
// @Description 获取用户数据
// @Tags			bodyInfo
// @Accept			json
// @Produce		json
// @Param			id	path		int		true	"用户ID"
// @Success		200	{object}	Vision	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/api/bodyInfo [get]

// @Summary	 接收用户数据
// @Description 接收用户数据
// @Tags			bodyInfo
// @Accept			json
// @Produce		json
// @Param			id	path		int		true	"用户ID"
// @Success		200	{object}	Vision	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/api/bodyInfo [post]

// @Summary	 更新用户数据
// @Description 更新用户数据
// @Tags			bodyInfo
// @Accept			json
// @Produce		json
// @Param			id	path		int		true	"用户ID"
// @Success		200	{object}	Vision	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/api/bodyInfo [update]

// @Summary	 删除用户数据
// @Description 删除用户数据
// @Tags			bodyInfo
// @Accept			json
// @Produce		json
// @Param			id	path		int		true	"用户ID"
// @Success		200	{object}	Vision	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/api/bodyInfo [delete]

func GetBodyInfo(c *gin.Context) {
	id := rand.Int63n(1000) + 1
	if len(bodyInfoData) == 0 {
		bodyInfoData = make([]BodyMeasurement, 0) // 使用 make 函数初始化一个空的切片
		GenerateBodyInfoData(id, 10)
	}
	c.JSON(http.StatusOK, bodyInfoData)
}

func PostBodyInfo(c *gin.Context) {
	// 解析 JSON 数据
	var data BodyMeasurement
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 设置记录ID和UserID和记录时间
	data.Id = int64(len(bodyInfoData) + 1)
	if data.UserID == 0 {
		data.UserID = rand.Int63n(1000) + 1
	}
	data.RecordedAt = GetTime()
	if len(data.BloodType) > 2 {
		data.BloodType = "A"
	}

	// 添加记录到全局数组
	bodyInfoData = append(bodyInfoData, data)
	// 在此处进行处理逻辑，例如保存数据到数据库等

	c.JSON(http.StatusOK, gin.H{"message": "数据成功接收"})
}

func UpdateBodyInfo(c *gin.Context) {
	// 从请求中获取要更新的记录的 ID
	id := c.Param("id")

	var data BodyMeasurement
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 遍历记录列表，查找对应的记录并更新
	for index, record := range bodyInfoData {
		if strconv.FormatInt(record.Id, 10) == id {
			// 更新记录信息
			bodyInfoData[index].Height = data.Height
			bodyInfoData[index].Weight = data.Weight
			bodyInfoData[index].Hip = data.Hip
			bodyInfoData[index].Waist = data.Hip
			bodyInfoData[index].Chest = data.Chest
			bodyInfoData[index].BloodType = data.BloodType
			bodyInfoData[index].RecordedAt = GetTime()

			// 返回成功响应，包含更新后的Records
			c.JSON(http.StatusOK, gin.H{"message": "Data updated successfully"})
			return
		}
	}

	// 如果找不到对应的记录，返回错误响应
	c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
}
func DeleteBodyInfo(c *gin.Context) {
	// 从请求中获取要删除的记录的 ID
	id := c.Param("id")
	// 遍历记录列表，查找对应的记录并删除
	for index, record := range bodyInfoData {
		if strconv.FormatInt(record.Id, 10) == id {
			// 从 Records 中删除对应的记录
			bodyInfoData = append(bodyInfoData[:index], bodyInfoData[index+1:]...)
			// 返回成功响应
			c.JSON(http.StatusOK, gin.H{"message": "Record deleted successfully"})
			return
		}
	}

	// 如果找不到对应的记录，返回错误响应
	c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
}
