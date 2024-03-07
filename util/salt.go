package util

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
)

// generateSalt 生成随机的盐值
func GenerateSalt(length int) ([]byte, error) {
	salt := make([]byte, length)
	_, err := rand.Read(salt)
	if err != nil {
		return nil, err
	}
	return salt, nil
}

// hashPassword 对密码进行加盐和哈希加密
func HashPassword(password string, salt []byte) string {
	combined := append([]byte(password), salt...)
	hashed := sha256.Sum256(combined)
	return hex.EncodeToString(hashed[:])
}

func SlatHash(password string) {
	// 用户密码

	// 生成盐值
	salt, err := GenerateSalt(16)
	if err != nil {
		fmt.Println("Error generating salt:", err)
		return
	}

	// 对密码进行加盐和哈希加密
	hashedPassword := HashPassword(password, salt)

	fmt.Println("Original password:", password)
	fmt.Println("Salt:", hex.EncodeToString(salt))
	fmt.Println("Hashed password:", hashedPassword)
}
