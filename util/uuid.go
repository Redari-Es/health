package util

import (
	"github.com/google/uuid"
)

// GenerateUUID 生成一个新的 UUID
func GenerateUUID() string {
	newUUID := uuid.New()
	return newUUID.String()
}
