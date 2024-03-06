package users

import "github.com/gin-gonic/gin"

func usersHandler(r *gin.Engine) {
	usersGroup := r.Group("/users")

	{
		// 绑定 admin 路由到 users 组
		adminGroup := usersGroup.Group("/admin")
		{
			// adminGroup.GET("/dashboard", AdminDashboard)
			// adminGroup.GET("/users", AdminListUsers)
			// ...
			/*
				获取单个管理员用户信息：/users/admin/:id：通过发送 GET 请求到这个路径，可以获取到指定 ID 的管理员用户的信息。
				创建管理员用户：/users/admin：通过发送 POST 请求到这个路径，可以创建一个新的管理员用户。
				更新管理员用户信息：/users/admin/:id：通过发送 PUT 请求到这个路径，可以更新指定 ID 的管理员用户的信息。
				删除管理员用户：/users/admin/:id：通过发送 DELETE 请求到这个路径，可以删除指定 ID 的管理员用户。
			*/
			adminGroup.GET("/:id", GetAdminUser)
			adminGroup.POST("", CreateAdminUser)
			adminGroup.PUT("/:id", UpdateAdminUser)
			adminGroup.DELETE("/:id", DeleteAdminUser)
		}

		// 绑定 user 路由到 users 组
		userGroup := usersGroup.Group("/user")
		{
			// userGroup.GET("/profile", UserProfile)
			// userGroup.PUT("/profile", UpdateUserProfile)
			// ...
			/*
				获取单个用户信息：/users/user/:id：通过发送 GET 请求到这个路径，可以获取指定 ID 的用户的信息。
				创建用户：/users/user：通过发送 POST 请求到这个路径，可以创建一个新的用户。
				更新用户信息：/users/user/:id：通过发送 PUT 请求到这个路径，可以更新指定 ID 的用户的信息。
				删除用户：/users/user/:id：通过发送 DELETE 请求到这个路径，可以删除指定 ID 的用户。
			*/
			userGroup.GET("/:id", GetUserByID)
			userGroup.POST("", CreateUser)
			userGroup.PUT("/:id", UpdateUser)
			userGroup.DELETE("/:id", DeleteUser)
		}
	}

}
