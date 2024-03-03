package model

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
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

// @Summary		Get user by ID
// @Description	Get user by ID
// @Tags			User
// @Produce		json
// @Param			id	path		int64	true	"User ID"
// @Success		200	{object}	User
// @Failure		404	{string}	string	"User not found"
// @Failure		500	{string}	string	"Internal Server Error"
// @Router			/api/v1/users/{id} [get]
func (u *User) GetUserByID(c *gin.Context) {
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

// @Summary		Create a new user
// @Description	Create a new user
// @Tags			User
// @Accept			json
// @Produce		json
// @Param			user	body		User	true	"User to create"
// @Success		201		{object}	User
// @Failure		400		{string}	string	"Invalid input"
// @Failure		500		{string}	string	"Internal Server Error"
// @Router			/api/v1/users [post]
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

// @Summary		Update user by ID
// @Description	Update user by ID
// @Tags			User
// @Accept			json
// @Produce		json
// @Param			id		path		int64	true	"User ID"
// @Param			user	body		User	true	"User to update"
// @Success		200		{object}	User
// @Failure		400		{string}	string	"Invalid input"
// @Failure		404		{string}	string	"User not found"
// @Failure		500		{string}	string	"Internal Server Error"
// @Router			/api/v1/users/{id} [put]
func (u *User) UpdateUser(c *gin.Context) {
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
		c.JSON(http.StatusOK, gin.H{"message": "User updated"})
	} else {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "User update failed"})
	}
}

// @Summary		Delete user by ID
// @Description	Delete user by ID
// @Tags			User
// @Produce		json
// @Param			id	path		int64	true	"User ID"
// @Success		204	{string}	string	"User deleted"
// @Failure		404	{string}	string	"User not found"
// @Failure		500	{string}	string	"Internal Server Error"
// @Router			/api/v1/users/{id} [delete]
func (u *User) DeleteUser(c *gin.Context) {
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
