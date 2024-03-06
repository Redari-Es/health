package other

import (
	"time"

	"github.com/gin-gonic/gin"
)

type Article struct {
	ID            int64     `xorm:"primary_key" json:"id"`
	DeletedOn     uint32    `json:"deleted_on"`
	IsDel         uint8     `json:"is_del"`
	Title         string    `json:"title"`
	Desc          string    `json:"desc"`
	Content       string    `json:"content"`
	CoverImageUrl string    `json:"cover_image_url"`
	State         uint8     `json:"state"`
	CreatedBy     time.Time `xorm:"'created' created" json:"created"`
	ModifiedBy    time.Time `xorm:"'updated' updated" json:"updated"`
}

func NewArticle() Article {
	return Article{}
}

// @Summary		获取单个文章
// @Description	Get user by ID
// @Tags			article
// @Produce		json
// @Param			id	path		int		true	"文章ID"
// @Success		200	{object}	Article	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/api/v1/articles/{id} [get]
func (t Article) Get(c *gin.Context) {

}

// @Summary		获取多个文章
// @Description	Get user by ID
// @Tags			article
// @Produce		json
// @Param			name		query		string	false	"文章名称"
// @Param			tag_id		query		int		false	"标签ID"
// @Param			state		query		int		false	"状态"
// @Param			page		query		int		false	"页码"
// @Param			page_size	query		int		false	"每页数量"
// @Success		200			{object}	Article	"成功"
// @Failure		400			{object}	string	"请求错误"
// @Failure		500			{object}	string	"内部错误"
// @Router			/api/v1/articles [get]
func (t Article) List(c *gin.Context) {
	return
}

// @Summary		创建文章
// @Description	Get user by ID
// @Tags			article
// @Produce		json
// @Param			tag_id			body		string	true	"标签ID"
// @Param			title			body		string	true	"文章标题"
// @Param			desc			body		string	false	"文章简述"
// @Param			cover_image_url	body		string	true	"封面图片地址"
// @Param			content			body		string	true	"文章内容"
// @Param			created_by		body		int		true	"创建者"
// @Param			state			body		int		false	"状态"
// @Success		200				{object}	Article	"成功"
// @Failure		400				{object}	string	"请求错误"
// @Failure		500				{object}	string	"内部错误"
// @Router			/api/v1/articles [post]
func (t Article) Create(c *gin.Context) {

}

// @Summary		更新文章
// @Description	Get user by ID
// @Tags			article
// @Produce		json
// @Param			tag_id			body		string	false	"标签ID"
// @Param			title			body		string	false	"文章标题"
// @Param			desc			body		string	false	"文章简述"
// @Param			cover_image_url	body		string	false	"封面图片地址"
// @Param			content			body		string	false	"文章内容"
// @Param			modified_by		body		string	true	"修改者"
// @Success		200				{object}	Article	"成功"
// @Failure		400				{object}	string	"请求错误"
// @Failure		500				{object}	string	"内部错误"
// @Router			/api/v1/articles/{id} [put]
func (t Article) Update(c *gin.Context) {
	return
}

// @Summary		删除文章
// @Description	Get user by ID
// @Tags			Article
// @Produce		json
// @Param			id	path		int		true	"文章ID"
// @Success		200	{string}	string	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/api/v1/articles/{id} [delete]
func (t Article) Delete(c *gin.Context) {
	return
}
