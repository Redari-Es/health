package model

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"xorm.io/xorm"
)

type User struct {
	Id      int64     `xorm:"'id' pk autoincr" json:"id"`
	Name    string    `xorm:"'name'" json:"name"`
	Age     int       `xorm:"'age'" json:"age"`
	Gender  int       `xorm:"'gender'" json:"gender"`
	Avatar  string    `xorm:"'avatar'" json:"avatar"`
	Passwd  string    `xorm:"'passwd' varchar(200)" json:"password"`
	Created time.Time `xorm:"'created' created" json:"created"`
	Updated time.Time `xorm:"'updated' updated" json:"updated"`
}

func NewUser() User {
	return User{}
}

// GetUserByID
// @Summary	通过 ID 获取用户
// @Produce	json
// @Param		id		query		string	false	"用户ID"
// @Param		name		query		int		false	"用户姓名"
// @Param		age		query		int		false	"用户年龄"
// @Param		gender		query		int		false	"用户性别"
// @Param		avatar	query		int		false	"用户头像"
// @Param		passwd		query		string	false	"用户密码"
// @Param		created		query		string	false	"创建时间"
// @Param		updated		query		string	false	"更新时间"
// @Success	200			{object}	Article	"成功"
// @Failure	400			{object}	string	"请求错误"
// @Failure	500			{object}	string	"内部错误"
// @Router		/api/v1/User [get]
var db *xorm.Engine

func (u *User) GetUserByID(c *gin.Context) {
	db = engine
	id := c.Param("id")
	var user User
	has, err := db.ID(id).Get(&user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user"})
		return
	}
	if !has {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}
	c.JSON(http.StatusOK, user)
}

// CreateUser 创建新用户
func (u *User) CreateUser(c *gin.Context) {
	var newUser User
	if err := c.ShouldBindJSON(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}
	affected, err := engine.Insert(&newUser)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}
	if affected == 0 {
		c.JSON(http.StatusCreated, gin.H{"message": "User created"})
	} else {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "User creation failed"})
	}
}

// @Summary	获取单个文章
// @Produce	json
// @Param		id	path		int		true	"文章ID"
// @Success	200	{object}	Article	"成功"
// @Failure	400	{object}	string	"请求错误"
// @Failure	500	{object}	string	"内部错误"
// @Router		/api/v1/articles/{id} [get]
func (t User) Get(c *gin.Context) {

}

// @Summary	获取多个文章
// @Produce	json
// @Param		name		query		string	false	"文章名称"
// @Param		tag_id		query		int		false	"标签ID"
// @Param		state		query		int		false	"状态"
// @Param		page		query		int		false	"页码"
// @Param		page_size	query		int		false	"每页数量"
// @Success	200			{object}	Article	"成功"
// @Failure	400			{object}	string	"请求错误"
// @Failure	500			{object}	string	"内部错误"
// @Router		/api/v1/articles [get]
func (t User) List(c *gin.Context) {
	return
}

// @Summary	创建文章
// @Produce	json
// @Param		tag_id			body		string	true	"标签ID"
// @Param		title			body		string	true	"文章标题"
// @Param		desc			body		string	false	"文章简述"
// @Param		cover_image_url	body		string	true	"封面图片地址"
// @Param		content			body		string	true	"文章内容"
// @Param		created_by		body		int		true	"创建者"
// @Param		state			body		int		false	"状态"
// @Success	200				{object}	Article	"成功"
// @Failure	400				{object}	string	"请求错误"
// @Failure	500				{object}	string	"内部错误"
// @Router		/api/v1/articles [post]
func (t User) Create(c *gin.Context) {

}

// @Summary	更新文章
// @Produce	json
// @Param		tag_id			body		string	false	"标签ID"
// @Param		title			body		string	false	"文章标题"
// @Param		desc			body		string	false	"文章简述"
// @Param		cover_image_url	body		string	false	"封面图片地址"
// @Param		content			body		string	false	"文章内容"
// @Param		modified_by		body		string	true	"修改者"
// @Success	200				{object}	Article	"成功"
// @Failure	400				{object}	string	"请求错误"
// @Failure	500				{object}	string	"内部错误"
// @Router		/api/v1/articles/{id} [put]
func (t User) Update(c *gin.Context) {
	return
}

// @Summary	删除文章
// @Produce	json
// @Param		id	path		int		true	"文章ID"
// @Success	200	{string}	string	"成功"
// @Failure	400	{object}	string	"请求错误"
// @Failure	500	{object}	string	"内部错误"
// @Router		/api/v1/articles/{id} [delete]
func (t User) Delete(c *gin.Context) {
	return
}
