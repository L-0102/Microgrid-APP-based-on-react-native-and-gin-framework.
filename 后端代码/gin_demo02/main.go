package main

import (
	"fmt"
	"gin_demo02/common"
	"gin_demo02/core"
	"github.com/gin-gonic/gin"
	"github.com/goccy/go-json"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/schema"
	"time"
)

func main() {

	dsn := "root:123456@tcp(127.0.0.1:3306)/data-mysql?charset=utf8mb4&parseTime=True&loc=Local"
	db1, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		NamingStrategy: schema.NamingStrategy{
			SingularTable: true,
		},
	})

	//获取初始化的数据库
	db := common.InitDB()
	//延迟关闭数据库
	defer db.Close()

	fmt.Println(db1)
	fmt.Println(err)

	sqlDB, err := db1.DB()

	// SetMaxIdleConns sets the maximum number of connections in the idle connection pool.
	sqlDB.SetMaxIdleConns(10)
	// SetMaxOpenConns sets the maximum number of open connections to the database.
	sqlDB.SetMaxOpenConns(100)
	// SetConnMaxLifetime sets the maximum amount of time a connection may be reused.
	sqlDB.SetConnMaxLifetime(10 * time.Second)

	aesKey := []byte("aaaabbbbccccdddd") //Aes加密密钥，长度为16的倍数，16、32、48...

	//结构体
	type Daydata struct {
		gorm.Model
		Eleconsum        string `gorm:"type:varchar(20);not null"json:"eleconsum"binding:"required"`
		Elegenerate      string `gorm:"type:varchar(20);not null"json:"elegenerate"binding:"required"`
		Adjustload       string `gorm:"type:varchar(20);not null"json:"adjustload"binding:"required"`
		Poweroff         string `gorm:"type:varchar(40);not null"json:"poweroff"binding:"required"`
		Alarm            string `gorm:"type:varchar(20);not null"json:"alarm"binding:"required"`
		Elaluate         string `gorm:"type:varchar(20);not null"json:"elaluate"binding:"required"`
		Elepurchase      string `gorm:"type:varchar(20);not null"json:"elepurchase"binding:"required"`
		Elesale          string `gorm:"type:varchar(20);not null"json:"elesale"binding:"required"`
		Storagecharge    string `gorm:"type:varchar(20);not null"json:"storagecharge"binding:"required"`
		Storagedischarge string `gorm:"type:varchar(20);not null"json:"storagedischarge"binding:"required"`
	}
	type Mainhome struct {
		gorm.Model
		Loadpower           string `gorm:"type:varchar(20);not null"json:"loadpower"binding:"required"`
		Newenergygeneration string `gorm:"type:varchar(20);not null"json:"new_energy_generation"binding:"required"`
		Storagepower        string `gorm:"type:varchar(20);not null"json:"storagepower"binding:"required"`
		Pccexchange         string `gorm:"type:varchar(40);not null"json:"pccexchange"binding:"required"`
		Pccreactivepower    string `gorm:"type:varchar(20);not null"json:"pcc_reactive_power"binding:"required"`
		Micropower          string `gorm:"type:varchar(20);not null"json:"micropower"binding:"required"`

		Pccplan            string `gorm:"type:varchar(20);not null"json:"pccplan"binding:"required"`
		Pccactual          string `gorm:"type:varchar(20);not null"json:"pccactual"binding:"required"`
		Pccstate           string `gorm:"type:varchar(20);not null"json:"pccstate"binding:"required"`
		Pvplan             string `gorm:"type:varchar(20);not null"json:"pvplan"binding:"required"`
		Pvactual           string `gorm:"type:varchar(20);not null"json:"pvactual"binding:"required"`
		Pvstate            string `gorm:"type:varchar(20);not null"json:"pvstate"binding:"required"`
		Windplan           string `gorm:"type:varchar(20);not null"json:"windplan"binding:"required"`
		Windactual         string `gorm:"type:varchar(20);not null"json:"windactual"binding:"required"`
		Windstate          string `gorm:"type:varchar(20);not null"json:"windstate"binding:"required"`
		Storageplan        string `gorm:"type:varchar(20);not null"json:"storageplan"binding:"required"`
		Storageactual      string `gorm:"type:varchar(20);not null"json:"storageactual"binding:"required"`
		Storagestate       string `gorm:"type:varchar(20);not null"json:"storagestate"binding:"required"`
		Dieselplan         string `gorm:"type:varchar(20);not null"json:"dieselplan"binding:"required"`
		Dieselactual       string `gorm:"type:varchar(20);not null"json:"dieselactual"binding:"required"`
		Dieselstate        string `gorm:"type:varchar(20);not null"json:"dieselstate"binding:"required"`
		Gasturbineplan     string `gorm:"type:varchar(20);not null"json:"gas_turbine_plan"binding:"required"`
		Gasturbineactual   string `gorm:"type:varchar(20);not null"json:"gas_turbine_actual"binding:"required"`
		Gasturbinestate    string `gorm:"type:varchar(20);not null"json:"gas_turbine_state"binding:"required"`
		Totalloadplan      string `gorm:"type:varchar(20);not null"json:"totalloadplan"binding:"required"`
		Totalloadactual    string `gorm:"type:varchar(20);not null"json:"totalloadactual"binding:"required"`
		Firstloadplan      string `gorm:"type:varchar(20);not null"json:"firstloadplan"binding:"required"`
		Firstloadactual    string `gorm:"type:varchar(20);not null"json:"firstloadactual"binding:"required"`
		Secondloadplan     string `gorm:"type:varchar(20);not null"json:"secondloadplan"binding:"required"`
		Secondloadactual   string `gorm:"type:varchar(20);not null"json:"secondloadactual"binding:"required"`
		Thirdloadplan      string `gorm:"type:varchar(20);not null"json:"thirdloadplan"binding:"required"`
		Thirdloadactual    string `gorm:"type:varchar(20);not null"json:"thirdloadactual"binding:"required"`
		Fourthloadplan     string `gorm:"type:varchar(20);not null"json:"fourthloadplan"binding:"required"`
		Fourthloadactual   string `gorm:"type:varchar(20);not null"json:"fourthloadactual"binding:"required"`
		Chargingpileplan   string `gorm:"type:varchar(20);not null"json:"chargingpileplan"binding:"required"`
		Chargingpileactual string `gorm:"type:varchar(20);not null"json:"chargingpileactual"binding:"required"`

		Pccplan0  int16 `gorm:"type:int;not null"json:"pccplan_0"binding:"required"`
		Pccplan3  int16 `gorm:"type:int;not null"json:"pccplan_3"binding:"required"`
		Pccplan6  int16 `gorm:"type:int;not null"json:"pccplan_6"binding:"required"`
		Pccplan9  int16 `gorm:"type:int;not null"json:"pccplan_9"binding:"required"`
		Pccplan12 int16 `gorm:"type:int;not null"json:"pccplan_12"binding:"required"`
		Pccplan15 int16 `gorm:"type:int;not null"json:"pccplan_15"binding:"required"`
		Pccplan18 int16 `gorm:"type:int;not null"json:"pccplan_18"binding:"required"`
		Pccplan21 int16 `gorm:"type:int;not null"json:"pccplan_21"binding:"required"`
		Pccplan24 int16 `gorm:"type:int;not null"json:"pccplan_24"binding:"required"`

		Pccactual0  int `gorm:"type:int;not null"json:"pccactual_0"binding:"required"`
		Pccactual3  int `gorm:"type:int;not null"json:"pccactual_3"binding:"required"`
		Pccactual6  int `gorm:"type:int;not null"json:"pccactual_6"binding:"required"`
		Pccactual9  int `gorm:"type:int;not null"json:"pccactual_9"binding:"required"`
		Pccactual12 int `gorm:"type:int;not null"json:"pccactual_12"binding:"required"`
		Pccactual15 int `gorm:"type:int;not null"json:"pccactual_15"binding:"required"`
		Pccactual18 int `gorm:"type:int;not null"json:"pccactual_18"binding:"required"`
		Pccactual21 int `gorm:"type:int;not null"json:"pccactual_21"binding:"required"`
		Pccactual24 int `gorm:"type:int;not null"json:"pccactual_24"binding:"required"`

		//Storagedischarge string `gorm:"type:varchar(20);not null"json:"storagedischarge"binding:"required"`
		//Arrayo Tag `gorm:"type:varchar(255)[]"json:"arrayo"binding:"required"`
	}
	type Micropower struct {
		gorm.Model
		Winddaily               string `gorm:"type:varchar(20);not null"json:"wind_daily"binding:"required"`
		Photovoltaicdaily       string `gorm:"type:varchar(20);not null"json:"photovoltaic_daily"binding:"required"`
		Windturbinenumber       string `gorm:"type:varchar(20);not null"json:"wind_turbine_number"binding:"required"`
		Photovoltaicpanelnumber string `gorm:"type:varchar(40);not null"json:"photovoltaic_panel_number"binding:"required"`

		Photovoltaic0  int `gorm:"type:int;not null"json:"photovoltaic_0"binding:"required"`
		Photovoltaic3  int `gorm:"type:int;not null"json:"photovoltaic_3"binding:"required"`
		Photovoltaic6  int `gorm:"type:int;not null"json:"photovoltaic_6"binding:"required"`
		Photovoltaic9  int `gorm:"type:int;not null"json:"photovoltaic_9"binding:"required"`
		Photovoltaic12 int `gorm:"type:int;not null"json:"photovoltaic_12"binding:"required"`
		Photovoltaic15 int `gorm:"type:int;not null"json:"photovoltaic_15"binding:"required"`
		Photovoltaic18 int `gorm:"type:int;not null"json:"photovoltaic_18"binding:"required"`
		Photovoltaic21 int `gorm:"type:int;not null"json:"photovoltaic_21"binding:"required"`
		Photovoltaic24 int `gorm:"type:int;not null"json:"photovoltaic_24"binding:"required"`

		Wind0  int `gorm:"type:int;not null"json:"wind_0"binding:"required"`
		Wind3  int `gorm:"type:int;not null"json:"wind_3"binding:"required"`
		Wind6  int `gorm:"type:int;not null"json:"wind_6"binding:"required"`
		Wind9  int `gorm:"type:int;not null"json:"wind_9"binding:"required"`
		Wind12 int `gorm:"type:int;not null"json:"wind_12"binding:"required"`
		Wind15 int `gorm:"type:int;not null"json:"wind_15"binding:"required"`
		Wind18 int `gorm:"type:int;not null"json:"wind_18"binding:"required"`
		Wind21 int `gorm:"type:int;not null"json:"wind_21"binding:"required"`
		Wind24 int `gorm:"type:int;not null"json:"wind_24"binding:"required"`
	}
	type Loadmanage struct {
		gorm.Model
		Deviationvaluemax string `gorm:"type:varchar(20);not null"json:"deviation_value_max"binding:"required"`
		Deviationratemax  string `gorm:"type:varchar(20);not null"json:"deviation_rate_max"binding:"required"`
		RMSD              string `gorm:"type:varchar(20);not null"json:"rmsd"binding:"required"`

		Peakaccuracyyesterday    string `gorm:"type:varchar(20);not null"json:"peak_accuracy_yesterday"binding:"required"`
		Lowestaccuracyyesterday  string `gorm:"type:varchar(20);not null"json:"lowest_accuracy_yesterday"binding:"required"`
		Peakaccuracylastmonth    string `gorm:"type:varchar(20);not null"json:"peak_accuracy_lastmonth"binding:"required"`
		Lowestaccuracylastmonth  string `gorm:"type:varchar(20);not null"json:"lowest_accuracy_lastmonth"binding:"required"`
		Averageaccuracylastmonth string `gorm:"type:varchar(20);not null"json:"average_accuracy_lastmonth"binding:"require`

		//sst----super short time
		Sstloadforecast0  int `gorm:"type:int;not null"json:"sst_load_forecast_0"binding:"required"`
		Sstloadforecast4  int `gorm:"type:int;not null"json:"sst_load_forecast_4"binding:"required"`
		Sstloadforecast8  int `gorm:"type:int;not null"json:"sst_load_forecast_8"binding:"required"`
		Sstloadforecast12 int `gorm:"type:int;not null"json:"sst_load_forecast_12"binding:"required"`
		Sstloadforecast16 int `gorm:"type:int;not null"json:"sst_load_forecast_16"binding:"required"`
		Sstloadforecast20 int `gorm:"type:int;not null"json:"sst_load_forecast_20"binding:"required"`
		Sstloadforecast24 int `gorm:"type:int;not null"json:"sst_load_forecast_24"binding:"required"`
		Sstloadactual0    int `gorm:"type:int;not null"json:"sst_load_actual_0"binding:"required"`
		Sstloadactual4    int `gorm:"type:int;not null"json:"sst_load_actual_4"binding:"required"`
		Sstloadactual8    int `gorm:"type:int;not null"json:"sst_load_actual_8"binding:"required"`
		Sstloadactual12   int `gorm:"type:int;not null"json:"sst_load_actual_12"binding:"required"`
		Sstloadactual16   int `gorm:"type:int;not null"json:"sst_load_actual_16"binding:"required"`
		Sstloadactual20   int `gorm:"type:int;not null"json:"sst_load_actual_20"binding:"required"`
		Sstloadactual24   int `gorm:"type:int;not null"json:"sst_load_actual_24"binding:"required"`
		//mecf----Monthly energy consumption forecast
		Mecf1  int `gorm:"type:int;not null"json:"mecf_1"binding:"required"`
		Mecf3  int `gorm:"type:int;not null"json:"mecf_3"binding:"required"`
		Mecf5  int `gorm:"type:int;not null"json:"mecf_5"binding:"required"`
		Mecf7  int `gorm:"type:int;not null"json:"mecf_7"binding:"required"`
		Mecf9  int `gorm:"type:int;not null"json:"mecf_9"binding:"required"`
		Mecf11 int `gorm:"type:int;not null"json:"mecf_11"binding:"required"`
		//slf----short-term load forecast
		Stlf0  int `gorm:"type:int;not null"json:"stlf_0"binding:"required"`
		Stlf4  int `gorm:"type:int;not null"json:"stlf_4"binding:"required"`
		Stlf8  int `gorm:"type:int;not null"json:"stlf_8"binding:"required"`
		Stlf12 int `gorm:"type:int;not null"json:"stlf_12"binding:"required"`
		Stlf16 int `gorm:"type:int;not null"json:"stlf_16"binding:"required"`
		Stlf20 int `gorm:"type:int;not null"json:"stlf_20"binding:"required"`
		Stlf24 int `gorm:"type:int;not null"json:"stlf_24"binding:"required"`
	}
	type Dispatch struct {
		gorm.Model
		Windpowerforecast         string `gorm:"type:varchar(20);not null"json:"wind_power_forecast"binding:"required"`
		Photovoltaicpowerforecast string `gorm:"type:varchar(20);not null"json:"photovoltaic_power_forecast"binding:"required"`

		//ppgf----Photovoltaic power generation forecast
		Ppgf1  int `gorm:"type:int;not null"json:"ppgf_1"binding:"required"`
		Ppgf3  int `gorm:"type:int;not null"json:"ppgf_3"binding:"required"`
		Ppgf5  int `gorm:"type:int;not null"json:"ppgf_5"binding:"required"`
		Ppgf7  int `gorm:"type:int;not null"json:"ppgf_7"binding:"required"`
		Ppgf9  int `gorm:"type:int;not null"json:"ppgf_9"binding:"required"`
		Ppgf11 int `gorm:"type:int;not null"json:"ppgf_11"binding:"required"`
		Ppgf13 int `gorm:"type:int;not null"json:"ppgf_13"binding:"required"`
		Ppgf15 int `gorm:"type:int;not null"json:"ppgf_15"binding:"required"`
		Ppgf17 int `gorm:"type:int;not null"json:"ppgf_17"binding:"required"`
		Ppgf19 int `gorm:"type:int;not null"json:"ppgf_19"binding:"required"`
		Ppgf21 int `gorm:"type:int;not null"json:"ppgf_21"binding:"required"`
		Ppgf23 int `gorm:"type:int;not null"json:"ppgf_23"binding:"required"`

		//wpgf----Wind power generation forecast
		Wpgf1  int `gorm:"type:int;not null"json:"wpgf_1"binding:"required"`
		Wpgf3  int `gorm:"type:int;not null"json:"wpgf_3"binding:"required"`
		Wpgf5  int `gorm:"type:int;not null"json:"wpgf_5"binding:"required"`
		Wpgf7  int `gorm:"type:int;not null"json:"wpgf_7"binding:"required"`
		Wpgf9  int `gorm:"type:int;not null"json:"wpgf_9"binding:"required"`
		Wpgf11 int `gorm:"type:int;not null"json:"wpgf_11"binding:"required"`
		Wpgf13 int `gorm:"type:int;not null"json:"wpgf_13"binding:"required"`
		Wpgf15 int `gorm:"type:int;not null"json:"wpgf_15"binding:"required"`
		Wpgf17 int `gorm:"type:int;not null"json:"wpgf_17"binding:"required"`
		Wpgf19 int `gorm:"type:int;not null"json:"wpgf_19"binding:"required"`
		Wpgf21 int `gorm:"type:int;not null"json:"wpgf_21"binding:"required"`
		Wpgf23 int `gorm:"type:int;not null"json:"wpgf_23"binding:"required"`
	}
	type Greenuse struct {
		gorm.Model
		Peakconsumption   string `gorm:"type:varchar(20);not null"json:"peak_consumption"binding:"required"`
		Peakprice         string `gorm:"type:varchar(20);not null"json:"peak_price"binding:"required"`
		Normalconsumption string `gorm:"type:varchar(20);not null"json:"normal_consumption"binding:"required"`
		Normalprice       string `gorm:"type:varchar(20);not null"json:"normal_price"binding:"required"`
		Valleyconsumption string `gorm:"type:varchar(20);not null"json:"valley_consumption"binding:"required"`
		Valleyprice       string `gorm:"type:varchar(20);not null"json:"valley_price"binding:"required"`
		Dailyconsumption  string `gorm:"type:varchar(20);not null"json:"daily_consumption"binding:"required"`
		Dailycost         string `gorm:"type:varchar(20);not null"json:"daily_cost"binding:"required"`

		//decc----Daily electricity consumption curve
		Deccplan0  int `gorm:"type:int;not null"json:"deccplan_0"binding:"required"`
		Deccplan4  int `gorm:"type:int;not null"json:"deccplan_4"binding:"required"`
		Deccplan8  int `gorm:"type:int;not null"json:"deccplan_8"binding:"required"`
		Deccplan12 int `gorm:"type:int;not null"json:"deccplan_12"binding:"required"`
		Deccplan16 int `gorm:"type:int;not null"json:"deccplan_16"binding:"required"`
		Deccplan20 int `gorm:"type:int;not null"json:"deccplan_20"binding:"required"`
		Deccplan24 int `gorm:"type:int;not null"json:"deccplan_24"binding:"required"`

		Deccactual0  int `gorm:"type:int;not null"json:"deccactual_0"binding:"required"`
		Deccactual4  int `gorm:"type:int;not null"json:"deccactual_4"binding:"required"`
		Deccactual8  int `gorm:"type:int;not null"json:"deccactual_8"binding:"required"`
		Deccactual12 int `gorm:"type:int;not null"json:"deccactual_12"binding:"required"`
		Deccactual16 int `gorm:"type:int;not null"json:"deccactual_16"binding:"required"`
		Deccactual20 int `gorm:"type:int;not null"json:"deccactual_20"binding:"required"`
		Deccactual24 int `gorm:"type:int;not null"json:"deccactual_24"binding:"required"`
	}
	type Storagemanage struct {
		gorm.Model
		//pes----Photovoltaic energy storage
		//wes----Wind energy storage
		//mtes----Monthly total energy storage
		Peslastmonth string `gorm:"type:varchar(20);not null"json:"pes_last_month"binding:"required"`
		Weslastmonth string `gorm:"type:varchar(20);not null"json:"wes_last_month"binding:"required"`
		Pesthismonth string `gorm:"type:varchar(20);not null"json:"pes_this_month"binding:"required"`
		Westhismonth string `gorm:"type:varchar(20);not null"json:"wes_this_month"binding:"required"`
		Pesyesterday string `gorm:"type:varchar(20);not null"json:"pes_yesterday"binding:"required"`
		Wesyesterday string `gorm:"type:varchar(20);not null"json:"wes_yesterday"binding:"required"`
		Mtes         string `gorm:"type:varchar(20);not null"json:"mtes"binding:"required"`

		//stwes----Short-term wind energy storage
		Stwes0  int `gorm:"type:int;not null"json:"stwes_0"binding:"required"`
		Stwes4  int `gorm:"type:int;not null"json:"stwes_4"binding:"required"`
		Stwes8  int `gorm:"type:int;not null"json:"stwes_8"binding:"required"`
		Stwes12 int `gorm:"type:int;not null"json:"stwes_12"binding:"required"`
		Stwes16 int `gorm:"type:int;not null"json:"stwes_16"binding:"required"`
		Stwes20 int `gorm:"type:int;not null"json:"stwes_20"binding:"required"`
		Stwes24 int `gorm:"type:int;not null"json:"stwes_24"binding:"required"`
		//stpes----Short-term photovoltaic energy storage
		Stpes0  int `gorm:"type:int;not null"json:"stpes_0"binding:"required"`
		Stpes4  int `gorm:"type:int;not null"json:"stpes_4"binding:"required"`
		Stpes8  int `gorm:"type:int;not null"json:"stpes_8"binding:"required"`
		Stpes12 int `gorm:"type:int;not null"json:"stpes_12"binding:"required"`
		Stpes16 int `gorm:"type:int;not null"json:"stpes_16"binding:"required"`
		Stpes20 int `gorm:"type:int;not null"json:"stpes_20"binding:"required"`
		Stpes24 int `gorm:"type:int;not null"json:"stpes_24"binding:"required"`

		//mesd----Monthly energy storage data
		Mesd1  int `gorm:"type:int;not null"json:"mesd_1"binding:"required"`
		Mesd3  int `gorm:"type:int;not null"json:"mesd_3"binding:"required"`
		Mesd5  int `gorm:"type:int;not null"json:"mesd_5"binding:"required"`
		Mesd7  int `gorm:"type:int;not null"json:"mesd_7"binding:"required"`
		Mesd9  int `gorm:"type:int;not null"json:"mesd_9"binding:"required"`
		Mesd11 int `gorm:"type:int;not null"json:"mesd_11"binding:"required"`
	}
	type Alarm struct {
		gorm.Model
		Device     string `gorm:"type:varchar(20);not null"json:"device"binding:"required"`
		Alarmplace string `gorm:"type:varchar(20);not null"json:"alarm_place"binding:"required"`
		Alarmtype  string `gorm:"type:varchar(20);not null"json:"alarm_type"binding:"required"`
		Alarmlevel string `gorm:"type:varchar(20);not null"json:"alarm_level"binding:"required"`
	}
	//接口
	r := gin.Default()
	db1.AutoMigrate(&Daydata{})
	db1.AutoMigrate(&Mainhome{})
	db1.AutoMigrate(&Micropower{})
	db1.AutoMigrate(&Loadmanage{})
	db1.AutoMigrate(&Dispatch{})
	db1.AutoMigrate(&Greenuse{})
	db1.AutoMigrate(&Storagemanage{})
	db1.AutoMigrate(&Alarm{})
	////首页
	//增
	r.POST("/home", func(c *gin.Context) {
		var data Daydata

		err := c.ShouldBindJSON(&data)
		//判断绑定是否有误
		if err != nil {
			c.JSON(200, gin.H{
				"msg":  "添加失败",
				"data": gin.H{},
				"code": 400,
			})
		} else {
			//数据库操作
			db1.Create(&data)

			c.JSON(200, gin.H{
				"msg":  "添加成功",
				"data": data,
				"code": 200,
			})
		}
	})
	//改
	r.PUT("/home/:id", func(c *gin.Context) {
		var data Daydata
		//接受id
		id := c.Param("id")
		//判断id是否存在
		db1.Select("id").Where("id=?", id).Find(&data)

		//判断id是否存在
		if data.ID == 0 {
			c.JSON(200, gin.H{
				"msg":  "id没有找到",
				"code": 400,
			})
		} else {
			err := c.ShouldBindJSON(&data)
			if err != nil {
				c.JSON(200, gin.H{
					"msg": "修改失败",
				})
			} else {
				db1.Where("id = ?", id).Updates(&data)
				c.JSON(200, gin.H{
					"msg":  "修改成功",
					"code": 200,
				})
			}
		}
	})
	//查
	r.GET("/home/:id", func(c *gin.Context) {
		id := c.Param("id")
		var datalist []Daydata

		//查询数据库
		db1.Where("id=?", id).Find(&datalist)

		result, _ := json.Marshal(datalist) //将数据转换为json

		//判断是否查询到数据
		if len(datalist) == 0 {
			c.JSON(200, gin.H{
				"msg":  "没有查询到数据",
				"code": 400,
				"data": gin.H{},
			})
		} else {
			c.JSON(200, gin.H{
				"msg":  "查询成功",
				"code": 200,
				//"data": datalist,
				"data": core.AesEncrypt(result, aesKey), //调用加密方法
			})
		}
	})

	////主界面
	//增
	r.POST("/mainhome", func(c *gin.Context) {
		var data Mainhome

		err := c.ShouldBindJSON(&data)
		//判断绑定是否有误
		if err != nil {
			c.JSON(200, gin.H{
				"msg":  "添加失败",
				"data": gin.H{},
				"code": 400,
			})
		} else {
			//数据库操作
			db1.Create(&data)

			c.JSON(200, gin.H{
				"msg":  "添加成功",
				"data": data,
				"code": 200,
			})
		}
	})
	//改
	r.PUT("/mainhome/:id", func(c *gin.Context) {
		var data Mainhome
		//接受id
		id := c.Param("id")
		//判断id是否存在
		db1.Select("id").Where("id=?", id).Find(&data)

		//判断id是否存在
		if data.ID == 0 {
			c.JSON(200, gin.H{
				"msg":  "id没有找到",
				"code": 400,
			})
		} else {
			err := c.ShouldBindJSON(&data)
			if err != nil {
				c.JSON(200, gin.H{
					"msg": "修改失败",
				})
			} else {
				db1.Where("id = ?", id).Updates(&data)
				c.JSON(200, gin.H{
					"msg":  "修改成功",
					"code": 200,
				})
			}
		}
	})
	//查
	r.GET("/mainhome/:id", func(c *gin.Context) {
		id := c.Param("id")
		var datalist []Mainhome

		//查询数据库
		db1.Where("id=?", id).Find(&datalist)

		result, _ := json.Marshal(datalist) //将数据转换为json

		//判断是否查询到数据
		if len(datalist) == 0 {
			c.JSON(200, gin.H{
				"msg":  "没有查询到数据",
				"code": 400,
				"data": gin.H{},
			})
		} else {
			c.JSON(200, gin.H{
				"msg":  "查询成功",
				"code": 200,
				//"data": datalist,
				"data": core.AesEncrypt(result, aesKey), //调用加密方法
			})
		}
	})

	////微电源管理
	//增
	r.POST("/micropower", func(c *gin.Context) {
		var data Micropower

		err := c.ShouldBindJSON(&data)
		//判断绑定是否有误
		if err != nil {
			c.JSON(200, gin.H{
				"msg":  "添加失败",
				"data": gin.H{},
				"code": 400,
			})
		} else {
			//数据库操作
			db1.Create(&data)
			c.JSON(200, gin.H{
				"msg":  "添加成功",
				"data": data,
				"code": 200,
			})
		}
	})
	//改
	r.PUT("/micropower/:id", func(c *gin.Context) {
		var data Micropower
		//接受id
		id := c.Param("id")
		//判断id是否存在
		db1.Select("id").Where("id=?", id).Find(&data)

		//判断id是否存在
		if data.ID == 0 {
			c.JSON(200, gin.H{
				"msg":  "id没有找到",
				"code": 400,
			})
		} else {
			err := c.ShouldBindJSON(&data)
			if err != nil {
				c.JSON(200, gin.H{
					"msg": "修改失败",
				})
			} else {
				db1.Where("id = ?", id).Updates(&data)
				c.JSON(200, gin.H{
					"msg":  "修改成功",
					"code": 200,
				})
			}
		}
	})
	//查
	r.GET("/micropower/:id", func(c *gin.Context) {
		id := c.Param("id")
		var datalist []Micropower

		//查询数据库
		db1.Where("id=?", id).Find(&datalist)

		result, _ := json.Marshal(datalist) //将数据转换为json

		//判断是否查询到数据
		if len(datalist) == 0 {
			c.JSON(200, gin.H{
				"msg":  "没有查询到数据",
				"code": 400,
				"data": gin.H{},
			})
		} else {
			c.JSON(200, gin.H{
				"msg":  "查询成功",
				"code": 200,
				//"data": datalist,
				"data": core.AesEncrypt(result, aesKey), //调用加密方法
			})
		}
	})

	////负荷管理
	//增
	r.POST("/loadmanage", func(c *gin.Context) {
		var data Loadmanage

		err := c.ShouldBindJSON(&data)
		//判断绑定是否有误
		if err != nil {
			c.JSON(200, gin.H{
				"msg":  "添加失败",
				"data": gin.H{},
				"code": 400,
			})
		} else {
			//数据库操作
			db1.Create(&data)
			c.JSON(200, gin.H{
				"msg":  "添加成功",
				"data": data,
				"code": 200,
			})
		}
	})
	//改
	r.PUT("/loadmanage/:id", func(c *gin.Context) {
		var data Loadmanage
		//接受id
		id := c.Param("id")
		//判断id是否存在
		db1.Select("id").Where("id=?", id).Find(&data)

		//判断id是否存在
		if data.ID == 0 {
			c.JSON(200, gin.H{
				"msg":  "id没有找到",
				"code": 400,
			})
		} else {
			err := c.ShouldBindJSON(&data)
			if err != nil {
				c.JSON(200, gin.H{
					"msg": "修改失败",
				})
			} else {
				db1.Where("id = ?", id).Updates(&data)
				c.JSON(200, gin.H{
					"msg":  "修改成功",
					"code": 200,
				})
			}
		}
	})
	//查
	r.GET("/loadmanage/:id", func(c *gin.Context) {
		id := c.Param("id")
		var datalist []Loadmanage

		//查询数据库
		db1.Where("id=?", id).Find(&datalist)

		result, _ := json.Marshal(datalist) //将数据转换为json

		//判断是否查询到数据
		if len(datalist) == 0 {
			c.JSON(200, gin.H{
				"msg":  "没有查询到数据",
				"code": 400,
				"data": gin.H{},
			})
		} else {
			c.JSON(200, gin.H{
				"msg":  "查询成功",
				"code": 200,
				//"data": datalist,
				"data": core.AesEncrypt(result, aesKey), //调用加密方法
			})
		}
	})

	////调度与分析
	//增
	r.POST("/dispatch", func(c *gin.Context) {
		var data Dispatch

		err := c.ShouldBindJSON(&data)
		//判断绑定是否有误
		if err != nil {
			c.JSON(200, gin.H{
				"msg":  "添加失败",
				"data": gin.H{},
				"code": 400,
			})
		} else {
			//数据库操作
			db1.Create(&data)
			c.JSON(200, gin.H{
				"msg":  "添加成功",
				"data": data,
				"code": 200,
			})
		}
	})
	//改
	r.PUT("/dispatch/:id", func(c *gin.Context) {
		var data Dispatch
		//接受id
		id := c.Param("id")
		//判断id是否存在
		db1.Select("id").Where("id=?", id).Find(&data)

		//判断id是否存在
		if data.ID == 0 {
			c.JSON(200, gin.H{
				"msg":  "id没有找到",
				"code": 400,
			})
		} else {
			err := c.ShouldBindJSON(&data)
			if err != nil {
				c.JSON(200, gin.H{
					"msg": "修改失败",
				})
			} else {
				db1.Where("id = ?", id).Updates(&data)
				c.JSON(200, gin.H{
					"msg":  "修改成功",
					"code": 200,
				})
			}
		}
	})
	//查
	r.GET("/dispatch/:id", func(c *gin.Context) {
		id := c.Param("id")
		var datalist []Dispatch

		//查询数据库
		db1.Where("id=?", id).Find(&datalist)

		result, _ := json.Marshal(datalist) //将数据转换为json

		//判断是否查询到数据
		if len(datalist) == 0 {
			c.JSON(200, gin.H{
				"msg":  "没有查询到数据",
				"code": 400,
				"data": gin.H{},
			})
		} else {
			c.JSON(200, gin.H{
				"msg":  "查询成功",
				"code": 200,
				//"data": datalist,
				"data": core.AesEncrypt(result, aesKey), //调用加密方法
			})
		}
	})

	////绿色用电
	//增
	r.POST("/greenuse", func(c *gin.Context) {
		var data Greenuse

		err := c.ShouldBindJSON(&data)
		//判断绑定是否有误
		if err != nil {
			c.JSON(200, gin.H{
				"msg":  "添加失败",
				"data": gin.H{},
				"code": 400,
			})
		} else {
			//数据库操作
			db1.Create(&data)
			c.JSON(200, gin.H{
				"msg":  "添加成功",
				"data": data,
				"code": 200,
			})
		}
	})
	//改
	r.PUT("/greenuse/:id", func(c *gin.Context) {
		var data Greenuse
		//接受id
		id := c.Param("id")
		//判断id是否存在
		db1.Select("id").Where("id=?", id).Find(&data)

		//判断id是否存在
		if data.ID == 0 {
			c.JSON(200, gin.H{
				"msg":  "id没有找到",
				"code": 400,
			})
		} else {
			err := c.ShouldBindJSON(&data)
			if err != nil {
				c.JSON(200, gin.H{
					"msg": "修改失败",
				})
			} else {
				db1.Where("id = ?", id).Updates(&data)
				c.JSON(200, gin.H{
					"msg":  "修改成功",
					"code": 200,
				})
			}
		}
	})
	//查
	r.GET("/greenuse/:id", func(c *gin.Context) {
		id := c.Param("id")
		var datalist []Greenuse

		//查询数据库
		db1.Where("id=?", id).Find(&datalist)

		result, _ := json.Marshal(datalist) //将数据转换为json

		//判断是否查询到数据
		if len(datalist) == 0 {
			c.JSON(200, gin.H{
				"msg":  "没有查询到数据",
				"code": 400,
				"data": gin.H{},
			})
		} else {
			c.JSON(200, gin.H{
				"msg":  "查询成功",
				"code": 200,
				//"data": datalist,
				"data": core.AesEncrypt(result, aesKey), //调用加密方法
			})
		}
	})

	////储能系统管理
	//增
	r.POST("/storagemanage", func(c *gin.Context) {
		var data Storagemanage

		err := c.ShouldBindJSON(&data)
		//判断绑定是否有误
		if err != nil {
			c.JSON(200, gin.H{
				"msg":  "添加失败",
				"data": gin.H{},
				"code": 400,
			})
		} else {
			//数据库操作
			db1.Create(&data)
			c.JSON(200, gin.H{
				"msg":  "添加成功",
				"data": data,
				"code": 200,
			})
		}
	})
	//改
	r.PUT("/storagemanage/:id", func(c *gin.Context) {
		var data Storagemanage
		//接受id
		id := c.Param("id")
		//判断id是否存在
		db1.Select("id").Where("id=?", id).Find(&data)

		//判断id是否存在
		if data.ID == 0 {
			c.JSON(200, gin.H{
				"msg":  "id没有找到",
				"code": 400,
			})
		} else {
			err := c.ShouldBindJSON(&data)
			if err != nil {
				c.JSON(200, gin.H{
					"msg": "修改失败",
				})
			} else {
				db1.Where("id = ?", id).Updates(&data)
				c.JSON(200, gin.H{
					"msg":  "修改成功",
					"code": 200,
				})
			}
		}
	})
	//查
	r.GET("/storagemanage/:id", func(c *gin.Context) {
		id := c.Param("id")
		var datalist []Storagemanage

		//查询数据库
		db1.Where("id=?", id).Find(&datalist)

		result, _ := json.Marshal(datalist) //将数据转换为json

		//判断是否查询到数据
		if len(datalist) == 0 {
			c.JSON(200, gin.H{
				"msg":  "没有查询到数据",
				"code": 400,
				"data": gin.H{},
			})
		} else {
			c.JSON(200, gin.H{
				"msg":  "查询成功",
				"code": 200,
				//"data": datalist,
				"data": core.AesEncrypt(result, aesKey), //调用加密方法
			})
		}
	})

	////告警
	//增
	r.POST("/alarm", func(c *gin.Context) {
		var data Alarm

		err := c.ShouldBindJSON(&data)
		//判断绑定是否有误
		if err != nil {
			c.JSON(200, gin.H{
				"msg":  "添加失败",
				"data": gin.H{},
				"code": 400,
			})
		} else {
			//数据库操作
			db1.Create(&data)
			c.JSON(200, gin.H{
				"msg":  "添加成功",
				"data": data,
				"code": 200,
			})
		}
	})
	//改
	r.PUT("/alarm/:id", func(c *gin.Context) {
		var data Alarm
		//接受id
		id := c.Param("id")
		//判断id是否存在
		db1.Select("id").Where("id=?", id).Find(&data)

		//判断id是否存在
		if data.ID == 0 {
			c.JSON(200, gin.H{
				"msg":  "id没有找到",
				"code": 400,
			})
		} else {
			err := c.ShouldBindJSON(&data)
			if err != nil {
				c.JSON(200, gin.H{
					"msg": "修改失败",
				})
			} else {
				db1.Where("id = ?", id).Updates(&data)
				c.JSON(200, gin.H{
					"msg":  "修改成功",
					"code": 200,
				})
			}
		}
	})
	//条件查询
	r.GET("/alarm/:id", func(c *gin.Context) {
		id := c.Param("id")
		var datalist []Alarm

		//查询数据库
		db1.Where("id=?", id).Find(&datalist)

		//判断是否查询到数据
		if len(datalist) == 0 {
			c.JSON(200, gin.H{
				"msg":  "没有查询到数据",
				"code": 400,
				"data": gin.H{},
			})
		} else {
			c.JSON(200, gin.H{
				"msg":  "查询成功",
				"code": 200,
				"data": datalist,
			})
		}
	})
	//全部查询
	r.GET("/alarm", func(c *gin.Context) {
		var dataList []Alarm

		/*pageSize, _ := strconv.Atoi(c.Query("pageSize"))
		pageNum, _ := strconv.Atoi(c.Query("pageNum"))

		fmt.Println(pageSize)
		fmt.Println(pageNum)*/
		var total int64
		//查询数据库
		db1.Model(dataList).Count(&total).Limit(-1).Offset(-1).Find(&dataList)

		if len(dataList) == 0 {
			c.JSON(200, gin.H{
				"msg":  "没有查询到数据",
				"code": 400,
				"data": gin.H{},
			})
		} else {
			c.JSON(200, gin.H{
				"msg":  "查询成功",
				"code": 200,
				"data": gin.H{
					"list":  dataList,
					"total": total,
					/*"pageNum":  pageNum,
					"pageSize": pageSize,*/
				},
			})
		}
	})

	//启动路由
	CollectRoutes(r)

	///端口号
	PORT := "3002"
	r.Run(":" + PORT)
}
