# Design-and-implementation-of-mobile-APP-of-microgrid-integrated-energy-control-system
基于微电网综合能源管控系统的移动端监控App的实现。该代码使用React Native与Gin框架分别作为前后端实现了一个APP的实现。

  
运行：  
前端代码  
1.搭建react native相关环境，参考官方文档、B站。  
2.进入AwesomeProject1目录下， yarn android  

  
后端代码  
1搭建GOLAND /gin框架、mysql、navicat、apipost相关环境，参考官方文档以及B站。  
2.连接数据库，database.go、main.go中进行连接。  
3. 进入终端，执行go run main.go routes.go。  

  
接口：  
需将前端代码src_project29中screens/Login、Register、Set以及api中的接口部分做出改变。  
1.改为10.0.2.2，可在模拟器中运行。  
2.改为本地ipv4地址，真机、模拟器均可运行。（真机运行手机电脑连接同一个网络）  
  
  
代码框架  
- 前端（主要在src_29_project）：  
  - image：图片  
  - redux：状态管理，用于实现登录  
  - routes（界面路由）：  
    - Homestack：首页  
    - Index：底部导航  
    - NewsStack：告警  
    - UserStack：我的  
  - Screens（各界面屏幕）：  
      - Home：  
        - Dispatch：调度与分析  
        - EleUse：微电源管理  
        - GreenUse：绿色用电  
        - Index：首页  
        - LoadManage：负荷管理  
        - MainHome：主界面  
        - StorageManage：储能系统管理  
     -  News：告警  
     - NoAuth：  
        - Login：登录  
        - Register：注册  
     -  User（我的）：  
        - About：关于  
        - Set：账户  
        - Index：我的界面  
   - aesDecrpt：aes加密  
   - api：各接口  
   - index：登录、注册初始页设置  
   - storage：本地存储  
  
- 后端：  
   - Common：  
     -  database：连接数据库  
     -  jwt：JSON WEB TOKEN  
   - controller：  
     -  userController：登录、注册相关实现  
   - core：   
     -  aes：后端加密  
   - middleware：  
     -  authMiddleware：中间件，配合token登录验证  
   - model：  
     -  user：用户信息数据库设置  
   - main：主函数，连接数据库，设置各种数据接口，启动路由  
   - routes：登录、注册接口
  
APP演示demo见：https://youtu.be/OAQPKJmeMfc  
  
******************************************************************************  
创作不易，走过路过的brother给个star吧！！！❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤  
******************************************************************************
