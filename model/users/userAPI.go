package users

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// 生成 UUID
func generateUUID() string {
	u, err := uuid.NewRandom()
	if err != nil {
		// 错误处理
		return ""
	}
	return u.String()
}

// @Summary 获取用户信息
// @Description 根据用户ID获取用户信息
// @Tags user
// @Accept json
// @Produce json
// @Param id path int true "用户ID"
// @Success 200 {object} User
// @Failure 400 {object} ErrorResponse
// @Failure 404 {object} ErrorResponse
// @Router /users/user/{id} [get]
func GetUserByID(c *gin.Context) {
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

// @Summary 创建用户
// @Description 创建新用户
// @Tags user
// @Accept json
// @Produce json
// @Param user body User true "用户信息"
// @Success 201 {object} User
// @Failure 400 {object} ErrorResponse
// @Router /users/user [post]
func CreateUser(c *gin.Context) {
	var newUser User
	if err := c.ShouldBindJSON(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}
	affected, err := db.Insert(&newUser)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}
	if affected == 0 {
		c.JSON(http.StatusCreated, newUser)
	} else {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "User creation failed"})
	}
}

// @Summary 更新用户信息
// @Description 根据用户ID更新用户信息
// @Tags user
// @Accept json
// @Produce json
// @Param id path int true "用户ID"
// @Param user body User true "用户信息"
// @Success 200 {object} User
// @Failure 400 {object} ErrorResponse
// @Failure 404 {object} ErrorResponse
// @Router /users/user/{id} [put]
func UpdateUser(c *gin.Context) {
	id := c.Param("id")
	var user User
	if _, err := db.ID(id).Get(&user); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}
	affected, err := db.ID(id).AllCols().Update(&user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
		return
	}
	if affected == 0 {
		c.JSON(http.StatusOK, user)
	} else {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "User update failed"})
	}
}

// @Summary 删除用户
// @Description 根据用户ID删除用户
// @Tags user
// @Accept json
// @Produce json
// @Param id path int true "用户ID"
// @Success 204 {object} EmptyResponse
// @Failure 400 {object} ErrorResponse
// @Router /users/user/{id} [delete]
func DeleteUser(c *gin.Context) {
	id := c.Param("id")
	affected, err := db.ID(id).Delete(&User{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user"})
		return
	}
	if affected == 0 {
		c.JSON(http.StatusNoContent, gin.H{"message": "User deleted"})
	} else {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "User deletion failed"})
	}
}
