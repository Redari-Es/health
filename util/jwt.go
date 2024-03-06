package util

import (
	"errors"
	"net/http"
	"time"

	"github.com/form3tech-oss/jwt-go"
	"github.com/gin-gonic/gin"
)

const (
	APP_KEY = "www.redaries.xyz"
)

// 创建一个结构体来定义JWT声明（Claims）
type CustomClaims struct {
	jwt.StandardClaims
	UserID int64 `json:"user_id"`
}

// 创建一个函数来生成JWT。
func GenerateToken(userID int) (string, error) {
	// 将int类型的userID转换为int64
	userIDInt64 := int64(userID)
	claims := &CustomClaims{
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 24).Unix(), // 设置JWT过期时间为24小时后
			Issuer:    "your_issuer",                         // 设置签发者
		},
		UserID: userIDInt64, // 设置用户ID
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signingKey := []byte(APP_KEY) // 你的密钥
	tokenString, err := token.SignedString(signingKey)
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

// 创建一个中间件来验证JWT。
func JWTMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.Request.Header.Get("Authorization")
		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "token is missing"})
			c.Abort()
			return
		}

		token, err := jwt.ParseWithClaims(tokenString, &CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
			return []byte(APP_KEY), nil
		})
		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
			c.Abort()
			return
		}

		c.Set("claims", token.Claims)
		c.Next()
	}
}

// AuthenticateUser 模拟用户验证逻辑
func AuthenticateUser(username, password string) (int64, error) {
	// 硬编码的用户凭据，仅用于示例
	validUser := map[string]string{
		"admin": "admin",
		"user":  "admin",
	}

	// 检查用户名和密码是否匹配
	if repassword, ok := validUser[username]; ok {
		if repassword == password {
			// 如果用户存在且密码正确，返回用户ID
			return int64(1), nil // 假设所有有效用户的ID都是1
		} else {
			// 如果密码错误，返回错误
			return 0, errors.New("invalid username or password")
		}
	} else {
		// 如果用户不存在，返回错误
		return 0, errors.New("invalid username or password 2")
	}
}

/*
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 从请求头或请求参数中获取 token
		tokenString := // 从请求中获取 token

		// 解析 JWT token
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			// 返回用于验证签名的密钥
			return []byte("your-secret-key"), nil
		})

		// 验证和处理 token 错误
		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		// 将用户信息传递到上下文中
		claims, _ := token.Claims.(jwt.MapClaims)
		userID := claims["user_id"].(string)
		c.Set("user_id", userID)

		c.Next()
	}
}
*/

func LoginHandler(c *gin.Context) {
	// 从请求中获取用户名和密码
	username := c.Query("username")
	password := c.Query("password")
	// 从表单中获取
	// username := c.PostForm("username")
	// password := c.PostForm("password")
	// fmt.Println(username, password)

	// 调用用户验证函数
	userID, err := AuthenticateUser(username, password)
	if err != nil {
		// 如果验证失败，返回错误信息
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	// 如果验证成功，生成JWT
	token, err := GenerateToken(int(userID))
	if err != nil {
		// 如果生成JWT失败，返回错误信息
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to generate token"})
		return
	}

	// 返回JWT
	c.JSON(http.StatusOK, gin.H{"token": token})
}
