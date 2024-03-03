package util

import (
	"fmt"
	"strconv"
	"time"
)

func main() {
	idCard := "510104199001015678" // 身份证号码示例

	gender := getGender(idCard)
	birthDate := getBirthDate(idCard)
	age := getAge(birthDate)

	fmt.Printf("身份证号码：%s\n", idCard)
	fmt.Printf("性别：%s\n", gender)
	fmt.Printf("出生日期：%s\n", birthDate.Format("2006-01-02"))
	fmt.Printf("年龄：%d 岁\n", age)
}

func getGender(idCard string) string {
	genderNum, _ := strconv.Atoi(idCard[16:17])
	if genderNum%2 == 0 {
		return "女"
	}
	return "男"
}

func getBirthDate(idCard string) time.Time {
	birthDate, _ := time.Parse("20060102", idCard[6:14])
	return birthDate
}

func getAge(birthDate time.Time) int {
	currentTime := time.Now()
	years := currentTime.Year() - birthDate.Year()

	if (currentTime.Month() < birthDate.Month()) || (currentTime.Month() == birthDate.Month() && currentTime.Day() < birthDate.Day()) {
		years--
	}

	return years
}
