package main

import (
	"fmt"
	"studygin/routers"
)

func main() {
	r := routers.SetupRouter()
	if err := r.Run(":2020"); err != nil {
		fmt.Printf("startup service failed,err:%v\n", err)
	}
}
