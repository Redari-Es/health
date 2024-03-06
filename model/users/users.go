package users

import (
	"health/model"
	"time"
)

var db = model.DB

// 管理员用户
type AdminUser struct {
	ID        int64     `xorm:"'id' pk autoincr" json:"id"`
	AdminName string    `xorm:"'username'" json:"username"`
	AdminPass string    `xorm:"'password'" json:"password"`
	Email     string    `xorm:"'email'" json:"email"`
	Created   time.Time `xorm:"'created' created" json:"created"`
	Updated   time.Time `xorm:"'updated' updated" json:"updated"`
}

type Account struct {
	ID       int64     `xorm:"'id' pk autoincr" json:"id"`
	UserID   int64     `xorm:"'user_id' index" json:"user_id"`
	OpenCode string    `xorm:"'open_code'" json:"open_code"`
	Category int8      `xorm:"'category'" json:"category"`
	Deleted  uint8     `xorm:"'deleted'" json:"deleted"`
	Created  time.Time `xorm:"'created'" json:"created"`
	Updated  time.Time `xorm:"'updated' updated" json:"updated"`
}

// 家族表
type Family struct {
	ID      int64    `xorm:"'id' pk autoincr" json:"id"`
	Name    string   `xorm:"'name'" json:"name"`
	Members []Member `xorm:"-" json:"members"`
}

// 家族成员表
type Member struct {
	User *User  `xorm:"'user'" json:"user"`
	Role string `xorm:"'role'" json:"role"`
}

// 用户表
type User struct {
	ID       int64     `xorm:"'id' pk autoincr" json:"id"`
	UUID     string    `xorm:"'uuid'" json:"uuid"`
	State    int8      `xorm:"'state'" json:"state"`
	Username string    `xorm:"'name'" json:"name"`
	Avatar   string    `xorm:"'avatar'" json:"avatar"`
	Salt     string    `xorm:"'salt'" json:"salt"`
	Password string    `xorm:"'password'" json:"-"`
	Email    string    `xorm:"'email' varchar(20)" json:"email"`
	Mobile   string    `xorm:"'mobile'" json:"mobile"`
	Deleted  int8      `xorm:"'deleted'" json:"deleted"`
	FamilyID int64     `xorm:"'family_id'" json:"family_id"`
	Created  time.Time `xorm:"'created'" json:"created"`
	Updated  time.Time `xorm:"'updated' updated" json:"updated"`
}

// 下面是权限表 暂不使用
/*
type Permission struct {
	ID       int64     `xorm:"'id' pk autoincr" json:"id"`
	ParentID int64     `xorm:"'parent_id'" json:"parent_id"`
	Code     string    `xorm:"'code'" json:"code"`
	Name     string    `xorm:"'name'" json:"name"`
	Intro    string    `xorm:"'intro'" json:"intro"`
	Category int       `xorm:"'category'" json:"category"`
	URI      int64     `xorm:"'uri'" json:"uri"`
	Creator  string    `xorm:"'creator'" json:"creator"`
	Editor   string    `xorm:"'editor'" json:"editor"`
	Deleted  int       `xorm:"'deleted' UNSIGNED ZEROFILL" json:"deleted"`
	Created  time.Time `xorm:"'created'" json:"created"`
	Updated  time.Time `xorm:"'updated' updated" json:"updated"`
}
type Role struct {
	ID       int64     `xorm:"'id' pk autoincr" json:"id"`
	ParentID int64     `xorm:"'parent_id'" json:"parent_id"`
	Code     string    `xorm:"'code'" json:"code"`
	Name     string    `xorm:"'name'" json:"name"`
	Intro    string    `xorm:"'intro'" json:"intro"`
	Creator  string    `xorm:"'creator'" json:"creator"`
	Editor   string    `xorm:"'editor'" json:"editor"`
	Deleted  int       `xorm:"'deleted' UNSIGNED ZEROFILL" json:"deleted"`
	Created  time.Time `xorm:"'created'" json:"created"`
	Updated  time.Time `xorm:"'updated' updated" json:"updated"`
}
*/
