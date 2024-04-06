package users

import (
	"fmt"
	"health/model"
	"health/util"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"xorm.io/xorm"
)

// GetLoginForm
func Logins(c *gin.Context) {
	var form User
	// 使用 c.BindJSON 将 JSON 请求体绑定到结构体中
	if err := c.ShouldBindJSON(&form); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	// // 在后端进行一些处理，比如保存到数据库
	// session := db.NewSession()
	// defer session.Close()
	//
	// _, err := session.Insert(&form)
	// if err != nil {
	// 	session.Rollback()
	// 	c.JSON(500, gin.H{"error": "Failed to save form data"})
	// 	return
	// }
	// session.Commit()

	// 输出接收到的表单数据
	c.JSON(200, gin.H{
		"user_name": form.UserName,
		"email":     form.Email,
		"password":  form.Password,
	})
	println(form.UserName)
	println(form.Email)
	println(form.Password)
}

// 用于接收注册请求的结构体
type ReqForm struct {
	UserName string `json:"user_name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

// 处理用户注册的函数
func Registers(c *gin.Context) {
	var req ReqForm

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	// 创建保存用户到数据库
	// 创建保存用户到数据库
	if err := createUser(req.UserName, req.Password, req.Email); err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	// 返回成功的响应
	c.JSON(200, gin.H{"message": "User registered successfully!"})
}
func withTransaction(db *xorm.Engine, operations ...func(session *xorm.Session) error) error {
	session := db.NewSession()
	defer session.Close()

	err := session.Begin()
	if err != nil {
		return fmt.Errorf("could not begin transaction: %s", err)
	}

	for _, op := range operations {
		if err := op(session); err != nil {
			session.Rollback()
			return err
		}
	}

	err = session.Commit()
	if err != nil {
		return fmt.Errorf("could not commit transaction: %s", err)
	}

	return nil
}

func createUser(username, password, email string) error {
	db := model.GetDB()

	// 对密码进行加盐处理
	salt, err := util.GenerateSalt(16)
	if err != nil {
		return fmt.Errorf("error generating salt: %s", err)
	}

	// 对密码进行加盐和哈希加密
	hashedPassword := util.HashPassword(password, salt)

	// 生成 UUID
	uuid := util.GenerateUUID()

	// 获取当前时间并格式化为所需的时间格式
	now := time.Now()

	user := &User{
		UserName: username,
		State:    1, // 假设 1 表示有效用户
		Email:    email,
		UserIcon: "",
		Phone:    "",
		UUID:     uuid,
		Salt:     util.SaltToString(salt),
		Password: hashedPassword, // 使用哈希后的密码
		Created:  now,
		Updated:  now,
	}

	// 定义多个操作函数
	operations := []func(session *xorm.Session) error{
		func(session *xorm.Session) error {
			// 插入用户记录
			_, err := session.Insert(user)
			if err != nil {
				return fmt.Errorf("error inserting user: %s", err)
			}
			fmt.Println("插入用户成功")
			return nil
		},
		// 可以在此处添加其他操作函数
	}

	// 执行事务
	return withTransaction(db, operations...)
}

func Register(c *gin.Context) {
	// 绑定请求数据到 User 结构体
	var user User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	// 在后端进行一些处理，比如保存到数据库
	session := model.DB.NewSession()
	defer session.Close()

	_, err := session.Insert(&user)
	if err != nil {
		session.Rollback()
		c.JSON(500, gin.H{"error": "Failed to create user"})
		return
	}

	session.Commit()

	// 返回 JSON 响应给前端，表示用户创建成功
	c.JSON(200, gin.H{"message": "User created successfully!", "user": user})
}

// 生成 UUID
func generateUUID() string {
	u, err := uuid.NewRandom()
	if err != nil {
		// 错误处理
		return ""
	}
	return u.String()
}

// @Summary		获取用户信息
// @Description	根据用户ID获取用户信息
// @Tags			user
// @Accept			json
// @Produce		json
// @Param			id	path		int		true	"用户ID"
// @Success		200	{object}	User	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/users/user/{id} [get]
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

// @Summary		创建用户
// @Description	创建新用户
// @Tags			user
// @Accept			json
// @Produce		json
// @Param			user	body		User	true	"用户信息"
// @Success		200		{object}	User	"成功"
// @Failure		400		{object}	string	"请求错误"
// @Failure		500		{object}	string	"内部错误"
// @Router			/users/user [post]
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

// @Summary		更新用户信息
// @Description	根据用户ID更新用户信息
// @Tags			user
// @Accept			json
// @Produce		json
// @Param			id		path		int		true	"用户ID"
// @Param			user	body		User	true	"用户信息"
// @Success		200		{object}	User	"成功"
// @Failure		400		{object}	string	"请求错误"
// @Failure		500		{object}	string	"内部错误"
// @Router			/users/user/{id} [put]
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

// @Summary		删除用户
// @Description	根据用户ID删除用户
// @Tags			user
// @Accept			json
// @Produce		json
// @Param			id	path		int		true	"用户ID"
// @Success		200	{object}	User	"成功"
// @Failure		400	{object}	string	"请求错误"
// @Failure		500	{object}	string	"内部错误"
// @Router			/users/user/{id} [delete]
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
