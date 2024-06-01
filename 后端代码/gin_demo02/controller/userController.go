package controller

import (
	"fmt"
	"gin_demo02/common"
	"gin_demo02/model"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"log"
	"net/http"
)

func Register(ctx *gin.Context) {

	db := common.GetDB()

	//获取参数
	//此处使用Bind()函数，可以处理不同格式的前端数据
	var requestUser model.User
	//ctx.Bind(&requestUser)
	ctx.ShouldBindJSON(&requestUser)
	name := requestUser.Name
	telephone := requestUser.Telephone
	password := requestUser.Password
	username := requestUser.Username
	department := requestUser.Department
	mail := requestUser.Mail
	gender := requestUser.Gender
	position := requestUser.Position
	age := requestUser.Age
	wordid := requestUser.Wordid
	//数据验证
	if len(name) == 0 {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{
			"code":    422,
			"message": "用户名不能为空",
		})
		return
	}
	if len(telephone) != 11 {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{
			"code":    422,
			"message": "手机号必须为11位",
		})
		return
	}
	if len(password) < 8 {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{
			"code":    422,
			"message": "密码不能少于8位",
		})
		return
	}

	//判断手机号是否存在
	var user model.User
	db.Where("username = ?", username).First(&user)
	if user.ID != 0 {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{
			"code":    422,
			"message": "用户已存在",
		})
		return
	}

	//创建用户
	hasedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{
			"code":    500,
			"message": "密码加密错误",
		})
		return
	}
	newUser := model.User{
		Name:       name,
		Telephone:  telephone,
		Password:   string(hasedPassword),
		Username:   username,
		Department: department,
		Mail:       mail,
		Gender:     gender,
		Position:   position,
		Age:        age,
		Wordid:     wordid,
	}
	db.Create(&newUser)

	//返回结果
	ctx.JSON(http.StatusOK, gin.H{
		"code":    200,
		"message": "注册成功",
	})
}

// 登录
func Login(ctx *gin.Context) {

	db := common.GetDB()

	//获取参数
	//此处使用Bind()函数，可以处理不同格式的前端数据
	var requestUser model.User
	//ctx.Bind(&requestUser)
	ctx.ShouldBindJSON(&requestUser)
	//telephone := requestUser.Telephone
	password := requestUser.Password
	username := requestUser.Username
	//数据验证
	/*if len(telephone) != 11 {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{
			"code":    422,
			"message": "手机号必须为11位",
		})
		return
	}*/
	/*if len(password) < 8 {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{
			"code":    422,
			"message": "密码不能少于8位",
		})
		return
	}*/

	//判断用户名是否存在
	var user model.User
	//db.Where("telephone = ?", telephone).First(&user)
	db.Where("username = ?", username).First(&user)
	if user.ID == 0 {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{
			"code":    422,
			"message": "用户不存在",
		})
		return
	}

	//判断密码是否正确
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{
			"code":    422,
			"message": "密码错误",
		})
		return
	}

	//发放token
	token, err := common.ReleaseToken(user)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"code":    500,
			"message": "系统异常",
		})
		//记录下错误
		log.Printf("token generate error: %v", err)
		return
	}

	//返回结果
	ctx.JSON(http.StatusOK, gin.H{
		"code":    200,
		"data":    gin.H{"token": token},
		"message": "登录成功",
	})
}

func Info(ctx *gin.Context) {

	user, _ := ctx.Get("user")
	//将用户信息返回
	ctx.JSON(http.StatusOK, gin.H{
		"data": gin.H{"user": user},
	})

}

func Posttoken(ctx *gin.Context) {
	//获取参数
	//此处使用Bind()函数，可以处理不同格式的前端数据
	var requestToken model.Token
	//ctx.Bind(&requestUser)
	ctx.ShouldBindJSON(&requestToken)
	token := requestToken.Token
	fmt.Printf("token=%v \n", token)
	//token = json.Marshal(token) //将数据转换为json
	ctx.JSON(http.StatusOK, gin.H{
		"code":  200,
		"token": token,
	})
}
func Gettoken(ctx *gin.Context) {

	token, _ := ctx.Get("token")

	ctx.JSON(http.StatusOK, gin.H{
		"token": token,
	})

}
