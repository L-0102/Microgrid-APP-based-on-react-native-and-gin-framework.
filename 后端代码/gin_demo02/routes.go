package main

import (
	"gin_demo02/controller"
	"gin_demo02/middleware"
	"github.com/gin-gonic/gin"
)

func CollectRoutes(r *gin.Engine) *gin.Engine {

	//注册
	r.POST("/register", controller.Register)
	//登录
	r.POST("/login", controller.Login)
	//返回用户信息
	r.GET("/info", middleware.AuthMiddleware(), controller.Info)
	//上传token
	r.POST("/posttoken", controller.Posttoken)
	//返回token
	r.GET("/gettoken", controller.Gettoken)

	r.POST("/form_post", func(c *gin.Context) {
		message := c.PostForm("message")
		//	nick := c.DefaultPostForm("nick", "anonymous") // 此方法可以设置默认值

		c.JSON(200, gin.H{
			"status":  "posted",
			"message": message,
			//	"nick":    nick,
		})
	})
	return r

}
