package util

import (
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
)

func getIpHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	resp, _ := json.Marshal(map[string]string{
		"ip": GetIP(r),
	})
	w.Write(resp)
}

// GetIPHandler 是处理获取IP地址的HTTP处理函数
func GetIPHandler(c *gin.Context) {
	ip := GetIP(c.Request)
	c.JSON(http.StatusOK, gin.H{"ip": ip})
}

// GetIP gets a requests IP address by reading off the forwarded-for
// header (for proxies) and falls back to use the remote address.
func GetIP2(r *http.Request) string {
	forwarded := r.Header.Get("X-FORWARDED-FOR")
	if forwarded != "" {
		return forwarded
	}
	return r.RemoteAddr
}

// GetIP 获取请求的IP地址，首先检查X-Forwarded-For头，如果不存在则使用RemoteAddr
func GetIP(r *http.Request) string {
	forwarded := r.Header.Get("X-Forwarded-For")
	if forwarded != "" {
		return forwarded
	}
	return r.RemoteAddr
}
