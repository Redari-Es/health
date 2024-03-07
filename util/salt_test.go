package util

import (
	"bytes"
	"testing"
)

func TestSaltHash(t *testing.T) {
	password := "password"

	// 生成盐值
	salt, err := GenerateSalt(16)
	if err != nil {
		t.Errorf("Error generating salt: %s", err)
		return
	}

	// 对密码进行加盐和哈希加密
	hashedPassword := HashPassword(password, salt)

	// 检查结果是否符合预期

	// 检查结果是否符合预期
	expectedHashedPassword := HashPassword(password, salt)

	if !bytes.Equal([]byte(hashedPassword), []byte(expectedHashedPassword)) {
		t.Errorf("Expected hashed password: %s, but got: %s", expectedHashedPassword, hashedPassword)
	}
}
