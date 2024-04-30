package users

import (
	"health/model"
	"health/model/body"
	"time"

	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/go-ozzo/ozzo-validation/v4/is"
)

var db = model.GetDB()

// 管理员用户
type AdminUser struct {
	Id        int64     `xorm:"'id' pk autoincr" json:"id"`
	AdminName string    `xorm:"'admin_name'" json:"admin_name"`
	State     int8      `xorm:"'state'" json:"state"`
	Salt      string    `xorm:"'salt' unique varchar(32) notnull" json:"-"`
	Password  string    `xorm:"'password' varchar(64)" json:"-"`
	Email     string    `xorm:"'email'" json:"email"`
	Phone     string    `xorm:"'phone' varchar(11) " json:"phone"`
	Created   time.Time `xorm:"'created' created" json:"created"`
	Updated   time.Time `xorm:"'updated' updated" json:"updated"`
}

type Account struct {
	Id       int64     `xorm:"'id' pk autoincr" json:"id"`
	UserID   int64     `xorm:"'user_id' index" json:"user_id"`
	OpenCode string    `xorm:"'open_code'" json:"open_code"`
	Category int8      `xorm:"'category'" json:"category"`
	Deleted  uint8     `xorm:"'deleted'" json:"deleted"`
	Created  time.Time `xorm:"'created'" json:"created"`
	Updated  time.Time `xorm:"'updated' updated" json:"updated"`
}

// 家族表
type Family struct {
	Id      int64    `xorm:"'id' pk autoincr" json:"id"`
	Name    string   `xorm:"'family_name'" json:"name"`
	Members []Member `xorm:"-" json:"members"`
	/*Members []struct {
		UserID int64  `xorm:"'user_id'" json:"user_id"`
		User   *User  `xorm:"-" json:"user"`
		Role   string `xorm:"'role'" json:"role"`
	} `xorm:"-" json:"members"`
	*/
}

// 家族成员表
type Member struct {
	UserID   int64 `xorm:"'user_id' pk" json:"user_id"`
	FamilyID int64 `xorm:"'family_id' pk" json:"family_id"` // FamilyID 作为复合主键的一部分
	Role     int   `xorm:"'role'" json:"role"`
	User     *User `xorm:"'-'" json:"user"`
}

// 用户表
type User struct {
	Id       int64     `xorm:"pk autoincr" json:"id"`
	UUID     string    `xorm:"'uuid' varchar(36) unique notnull" json:"uuid"`
	UserName string    `xorm:"'user_name'" json:"user_name"`
	UserIcon string    `xorm:"'user_icon'" json:"user_icon"`
	State    int8      `xorm:"'state'" json:"state"`
	Email    string    `xorm:"'email' varchar(20)" json:"email"`
	Phone    string    `xorm:"'phone' unique varchar(11) " json:"phone"`
	FamilyID int64     `xorm:"'family_id'" json:"family_id"`
	Salt     string    `xorm:"'salt' unique varchar(32) notnull" json:"-"`
	Password string    `xorm:"'password' varchar(64)" json:"-"`
	Created  time.Time `xorm:"'created'" json:"_"`
	Updated  time.Time `xorm:"'updated'" json:"_"`
	// 外键关联表
	UserInfo *UserInfo `xorm:"-" json:"user_info"`
	Account  *UserInfo `xorm:"-" json:"Account"`
}

// UserDetail 定义了用户详细信息的结构体
type UserDetail struct {
	Id            int64     `xorm:"'id' pk autoincr" json:"id"`
	UserID        int64     `xorm:"'user_id' index" json:"user_id"`
	FirstName     string    `xorm:"'first_name'" json:"first_name"`
	LastName      string    `xorm:"'last_name'" json:"last_name"`
	Address       string    `xorm:"'address'" json:"address"`
	Age           int       `xorm:"'age'" json:"age`
	Birthdate     string    `xorm:"'birthdate'" json:"birthdate"`
	Gender        int       `xorm:"default(0) 'gender'" json:"gender"`
	Avatar        string    `xorm:"'avatar'" json:"avatar"`
	IDCard        string    `xorm:" unique varchar(18)'id_card'" json:"id_card"`           // 身份证号码
	Nationality   string    `xorm:"default("China") 'nationality'" json:"nationality"`     // 国籍
	Ethnicity     string    `xorm:" default("汉") varchar(20)'ethnicity'" json:"ethnicity"` // 民族
	Occupation    string    `xorm:"'occupation'" json:"occupation"`                        // 职业
	Education     string    `xorm:"'education'" json:"education"`                          // 文化程度
	MaritalStatus string    `xorm:"'marital_status'" json:"marital_status"`                // 婚否
	Status        int       `xorm:"'status'" json:"status"`
	CreatedAt     time.Time `xorm:"created" json:"created_at"`
	UpdatedAt     time.Time `xorm:"updated" json:"updated_at"`
}

type UserInfo struct {
	Id         int64
	UserID     int            `xorm:"'user_id' index" json:"user_id"`
	UserDetail *UserDetail    `xorm:"-" json:"user_detail"`
	BodyInfo   *body.BodyInfo `xorm:"-" json:"body_info"`
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

// 数据验证
func (u User) Validate() error {
	return validation.ValidateStruct(&u,
		// validation.Field(&u.Id, validation.Required),
		// validation.Field(&u.UUID, validation.Required, validation.Length(36), is.UUID),
		validation.Field(&u.UserName, validation.Required, validation.Length(2, 10)),
		validation.Field(&u.Email, validation.Required, validation.Required, is.Email),
		// validation.Field(&u.Password, validation.Required, validation.Length(8, 9)),
		// validation.Field(&u.Phone, validation.Required, validation.Length(11)),
		// validation.Field(&u.Salt, validation.Required),
	)
}
