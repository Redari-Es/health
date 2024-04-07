package body

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func GetVision(c *gin.Context) {
	t := time.Now().Format("2006-01-02 15:04:05")

	// 模拟视力记录数据
	eyesightRecords := []Vision{
		{Id: 1, UserID: 1, LeftEye: 5.0, RightEye: 4.9, RecordedAt: t},
		{Id: 2, UserID: 2, LeftEye: 4.5, RightEye: 4.3, RecordedAt: t},
		{Id: 3, UserID: 3, LeftEye: 4.0, RightEye: 3.8, RecordedAt: t},
		// 添加更多的记录...
	}

	// 定义一个处理器函数，用于处理获取视力记录的请求
	// 将视力记录数据转换为 JSON 格式
	c.JSON(http.StatusOK, eyesightRecords)

}
