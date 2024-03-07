package users

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

// @Summary		创建管理员用户
// @Description	创建管理员用户
// @Tags			admin
// @Accept			json
// @Produce		json
// @Param			adminUser	body		AdminUser	true	"管理员用户信息"
// @Success		200			{object}	AdminUser
// @Failure		400			{object}	map[string]interface{}
// @Router			/users/admin [post]
func CreateAdminUser(c *gin.Context) {
	var adminUser AdminUser
	if err := c.ShouldBindJSON(&adminUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	adminUser.Created = time.Now()
	adminUser.Updated = time.Now()

	_, err := db.Insert(&adminUser)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create admin user"})
		return
	}

	c.JSON(http.StatusOK, adminUser)
}

// @Summary		获取管理员用户
// @Description	获取管理员用户
// @Tags			admin
// @Produce		json
// @Param			id	path		int	true	"管理员用户ID"
// @Success		200	{object}	AdminUser
// @Failure		404	{object}	map[string]interface{}
// @Router			/users/admin/{id} [get]
func GetAdminUser(c *gin.Context) {
	id := c.Param("id")

	var adminUser AdminUser
	has, err := db.ID(id).Get(&adminUser)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get admin user"})
		return
	}
	if !has {
		c.JSON(http.StatusNotFound, gin.H{"error": "Admin user not found"})
		return
	}

	c.JSON(http.StatusOK, adminUser)
}

// @Summary		更新管理员用户
// @Description	更新管理员用户
// @Tags			admin
// @Accept			json
// @Produce		json
// @Param			id			path		int			true	"管理员用户ID"
// @Param			adminUser	body		AdminUser	true	"管理员用户信息"
// @Success		200			{object}	AdminUser
// @Failure		400			{object}	map[string]interface{}
// @Failure		404			{object}	map[string]interface{}
// @Router			/users/admin/{id} [put]
func UpdateAdminUser(c *gin.Context) {
	id := c.Param("id")

	var adminUser AdminUser
	if err := c.ShouldBindJSON(&adminUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	adminUser.Updated = time.Now()

	affected, err := db.ID(id).Update(&adminUser)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update admin user"})
		return
	}
	if affected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Admin user not found"})
		return
	}

	c.JSON(http.StatusOK, adminUser)
}

// @Summary		删除管理员用户
// @Description	删除管理员用户
// @Tags			admin
// @Produce		json
// @Param			id	path		int		true	"管理员用户ID"
// @Success		204	{string}	string	"No Content"
// @Failure		404	{object}	map[string]interface{}
// @Router			/users/admin/{id} [delete]
func DeleteAdminUser(c *gin.Context) {
	id := c.Param("id")

	affected, err := db.ID(id).Delete(&AdminUser{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete admin user"})
		return
	}
	if affected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Admin user not found"})
		return
	}

	c.JSON(http.StatusNoContent, "")
}
