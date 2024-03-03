package model

import (
	"time"

	"github.com/gin-gonic/gin"
)

type Heart struct {
	Id      int
	UUID    int
	Rate    int
	Created time.Time `xorm:"created`
	Updated time.Time `xorm:"updated`
}

func NewHeart() Heart {
	return Heart{}
}

// @Summary		获取Heart
// @Description	Get user by ID
// @Tags			Heart
// @Produce		json
// @Param			id	path		int		true	"文章ID"
// @Success		200	{string}	string	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/api/v1/heart/{id} [get]
func (t Heart) Get(c *gin.Context) {

}

// @Summary		列出Heart
// @Description	Get user by ID
// @Tags			Heart
// @Produce		json
// @Param			id	path		int		true	"文章ID"
// @Success		200	{string}	string	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/api/v1/heart [get]
func (t Heart) List(c *gin.Context) {
	return
}

// @Summary		创建Heart
// @Description	Get user by ID
// @Tags			Heart
// @Produce		json
// @Param			id	path		int		true	"文章ID"
// @Success		200	{string}	string	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/api/v1/heart [post]
func (t Heart) Create(c *gin.Context) {

}

// @Summary		更新Heart
// @Description	Get user by ID
// @Tags			Heart
// @Produce		json
// @Param			id	path		int		true	"文章ID"
// @Success		200	{string}	string	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/api/v1/heart/{id} [post]
func (t Heart) Update(c *gin.Context) {
	return
}

// @Summary		删除Heart
// @Description	Get user by ID
// @Tags			Heart
// @Produce		json
// @Param			id	path		int		true	"文章ID"
// @Success		200	{string}	string	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/api/v1/heart/{id} [delete]
func (t Heart) Delete(c *gin.Context) {
	return
}
