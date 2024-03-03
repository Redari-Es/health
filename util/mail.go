package util

import (
	"encoding/json"
	"fmt"
	"log"
	"net/smtp"
	"net/textproto"
	"os"
	"sync"
	"time"

	"github.com/jordan-wright/email"
)

// func main()
func mail() {
	emailConfJson()
	// 使用配置信息
	fmt.Printf("Email From: %s\n", emailFrom)
	fmt.Printf("SMTP Server: %s\n", smtps)
	fmt.Printf("SMTP PORT: %s\n", port)
	fmt.Printf("Server Auth: %s\n", serverAuth)
	fmt.Printf("Access Code: %s\n", accessCode)

	// 发送
	t := "shon@redaries.xyz"
	mailto(t)
	mailto2(t)
	mails(t)

}

// ConfigEmail 定义了 email 配置的结构
type ConfigEmail struct {
	EmailFrom  string `json:"emailFrom"`  //发件人
	Smtp       string `json:"smtp"`       //使用的smtp服务
	Port       string `json:"port"`       //smtp端口号
	ServerAuth string `json:"serverauth"` //使用的代发邮箱号
	AccessCode string `json:"accesscode"` //授权码
}

// Config 定义了整个配置的结构
type Config struct {
	Email ConfigEmail `json:"email"`
}

var (
	emailFrom  string
	smtps      string
	port       string
	serverAuth string
	accessCode string
	emailto    string //收件人
)

// 配置读取 JSON
func emailConfJson() {
	// 假设 JSON 数据存储在名为 "config.json" 的文件中
	configFile, err := os.Open("./conf/mail.json")
	if err != nil {
		fmt.Println("Error opening config file:", err)
		return
	}
	defer configFile.Close()

	var config Config
	err = json.NewDecoder(configFile).Decode(&config)
	if err != nil {
		fmt.Println("Error decoding config file:", err)
		return
	}
	emailFrom = config.Email.EmailFrom
	smtps = config.Email.Smtp
	port = config.Email.Port
	serverAuth = config.Email.ServerAuth
	accessCode = config.Email.AccessCode
}

// 配置读取 conf
// go get gopkg.in/ini.v1

// EmailConfig 定义了电子邮件配置的结构
type EmailConfig struct {
	EmailFrom  string
	SMTPS      string
	PORT       string
	ServerAuth string
	AccessCode string
}

func emailConfINI() {
	// 打开配置文件
	configFile, err := ini.Load("example.conf")
	if err != nil {
		fmt.Println("Error loading config file:", err)
		return
	}
	// 获取 [email] 节的配置
	emailSection := configFile.Section("email")
	emailConfig := EmailConfig{
		EmailFrom:  emailSection.Key("emailFrom").String(),
		SMTPS:      emailSection.Key("smtps").String(),
		PORT:       emailSection.Key("port").String(),
		ServerAuth: emailSection.Key("serverauth").String(),
		AccessCode: emailSection.Key("accesscode").String(),
	}
	// 使用配置信息
	fmt.Printf("Email From: %s\n", emailConfig.EmailFrom)
	fmt.Printf("SMTP Server: %s\n", emailConfig.SMTP)
	fmt.Printf("Server Auth: %s\n", emailConfig.ServerAuth)
	fmt.Printf("Access Code: %s\n", emailConfig.AccessCode)
}

// 方法
func mailto(to string) {
	//start
	e := email.NewEmail()
	//设置发送方的邮箱
	e.From = emailFrom
	// 设置接收方的邮箱
	e.To = []string{to}
	//设置抄送如果抄送多人逗号隔开
	// e.Cc = []string{"test_cc@example.com"}
	//设置秘密抄送
	// e.Bcc = []string{"test_bcc@example.com"}
	//设置主题
	e.Subject = "Welcome Health"
	// 内容发送
	//设置文件发送的内容
	// e.Text = []byte("Text Body is, of course, supported!")
	// 设置网页发送内容
	e.HTML = []byte("<h1>Health HTML is supported, too!</h1>")
	//这块是设置附件
	// e.AttachFile("./test.txt")
	//设置服务器相关的配置
	stmpp := fmt.Sprintf("%s:%s", smtps, port)
	err := e.Send(stmpp, smtp.PlainAuth("", serverAuth, accessCode, smtps))
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Send Success")

}

func mailto2(to string) {

	e := &email.Email{
		To:      []string{to},
		From:    emailFrom,
		Subject: "Awesome Subject",
		Text:    []byte("Text Body is, of course, supported!"),
		HTML:    []byte("<h1>Fancy HTML is supported, too!</h1>"),
		Headers: textproto.MIMEHeader{},
	}
	stmpp := fmt.Sprintf("%s:%s", smtps, port)
	err := e.Send(stmpp, smtp.PlainAuth("", serverAuth, accessCode, smtps))
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Send Success")
}

func mails(to string) {
	ch := make(chan *email.Email, 10)
	stmpp := fmt.Sprintf("%s:%s", smtps, port)
	p, err := email.NewPool(
		stmpp,
		4,
		smtp.PlainAuth("", serverAuth, accessCode, smtps),
	)

	if err != nil {
		log.Fatal("failed to create pool:", err)
	}

	var wg sync.WaitGroup
	wg.Add(4)
	for i := 0; i < 4; i++ {
		go func() {
			defer wg.Done()
			for e := range ch {
				err := p.Send(e, 10*time.Second)
				if err != nil {
					fmt.Fprintf(os.Stderr, "email:%v sent error:%v\n", e, err)
				}
			}
		}()
	}

	for i := 0; i < 10; i++ {
		e := email.NewEmail()
		e.From = emailFrom
		e.To = []string{to}
		e.Subject = "Welcome Health System"
		e.Text = []byte(fmt.Sprintf("Awesome Web Health Email Pools:%d", i+1))
		ch <- e
		fmt.Println("email:%d send success", i+1)
	}

	close(ch)
	wg.Wait()
}
