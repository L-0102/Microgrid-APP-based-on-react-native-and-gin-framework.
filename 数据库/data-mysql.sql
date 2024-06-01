/*
 Navicat Premium Data Transfer

 Source Server         : go-crud-demo
 Source Server Type    : MySQL
 Source Server Version : 80032
 Source Host           : localhost:3306
 Source Schema         : data-mysql

 Target Server Type    : MySQL
 Target Server Version : 80032
 File Encoding         : 65001

 Date: 01/06/2024 22:01:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for alarm
-- ----------------------------
DROP TABLE IF EXISTS `alarm`;
CREATE TABLE `alarm`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` datetime(3) NULL DEFAULT NULL,
  `updated_at` datetime(3) NULL DEFAULT NULL,
  `deleted_at` datetime(3) NULL DEFAULT NULL,
  `device` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `alarmplace` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `alarmtype` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `alarmlevel` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_alarm_deleted_at`(`deleted_at` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of alarm
-- ----------------------------
INSERT INTO `alarm` VALUES (1, '2023-05-10 14:44:58.279', '2023-05-10 14:44:58.279', NULL, '光伏板1', 'place', '设备故障', '二级告警');
INSERT INTO `alarm` VALUES (2, '2023-05-10 14:45:10.687', '2023-05-10 14:45:10.687', NULL, '光伏板2', 'place2', '设备故障', '一级告警');
INSERT INTO `alarm` VALUES (3, '2023-05-10 16:39:23.345', '2023-05-10 16:39:23.345', NULL, '风力发电机1', 'place3', '设备故障', '一级告警');
INSERT INTO `alarm` VALUES (4, '2023-05-10 16:39:35.416', '2023-05-10 16:39:35.416', NULL, '风力发电机2', 'place4', '设备故障', '二级告警');
INSERT INTO `alarm` VALUES (5, '2023-05-10 16:44:31.644', '2023-05-10 16:44:31.644', NULL, '风力发电机3', 'place5', '设备故障', '二级告警');
INSERT INTO `alarm` VALUES (7, '2023-06-05 22:55:59.373', '2023-06-05 22:55:59.373', NULL, '柴油发电机3', 'place6', '设备故障', '二级告警');
INSERT INTO `alarm` VALUES (8, '2024-06-01 21:36:50.577', '2024-06-01 21:36:50.577', NULL, '柴油发电机3', 'place6', '设备故障', '二级告警');

-- ----------------------------
-- Table structure for daydata
-- ----------------------------
DROP TABLE IF EXISTS `daydata`;
CREATE TABLE `daydata`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` datetime(3) NULL DEFAULT NULL,
  `updated_at` datetime(3) NULL DEFAULT NULL,
  `deleted_at` datetime(3) NULL DEFAULT NULL,
  `eleconsum` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `elegenerate` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `adjustload` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `poweroff` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `alarm` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `elaluate` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `elepurchase` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `elesale` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `storagecharge` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `storagedischarge` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_daydata_deleted_at`(`deleted_at` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of daydata
-- ----------------------------
INSERT INTO `daydata` VALUES (1, '2023-05-06 11:25:49.254', '2023-05-28 17:41:56.488', NULL, '180', '200', '90', '2', '2', '90', '100', '50', '150', '75');
INSERT INTO `daydata` VALUES (2, '2023-05-06 11:27:08.983', '2023-05-06 11:27:08.983', NULL, '980', '600', '900', '2', '2', '90', '100', '50', '150', '75');
INSERT INTO `daydata` VALUES (3, '2023-05-15 17:58:05.134', '2023-05-15 17:58:05.134', NULL, '980', '600', '900', '2', '2', '90', '100', '50', '150', '75');
INSERT INTO `daydata` VALUES (4, '2023-05-15 21:51:49.165', '2023-05-15 21:51:49.165', NULL, '9800', '600', '900', '2', '2', '90', '100', '50', '150', '75');

-- ----------------------------
-- Table structure for dispatch
-- ----------------------------
DROP TABLE IF EXISTS `dispatch`;
CREATE TABLE `dispatch`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` datetime(3) NULL DEFAULT NULL,
  `updated_at` datetime(3) NULL DEFAULT NULL,
  `deleted_at` datetime(3) NULL DEFAULT NULL,
  `windpowerforecast` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `photovoltaicpowerforecast` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ppgf1` bigint NOT NULL,
  `ppgf3` bigint NOT NULL,
  `ppgf5` bigint NOT NULL,
  `ppgf7` bigint NOT NULL,
  `ppgf9` bigint NOT NULL,
  `ppgf11` bigint NOT NULL,
  `ppgf13` bigint NOT NULL,
  `ppgf15` bigint NOT NULL,
  `ppgf17` bigint NOT NULL,
  `ppgf19` bigint NOT NULL,
  `ppgf21` bigint NOT NULL,
  `ppgf23` bigint NOT NULL,
  `wpgf1` bigint NOT NULL,
  `wpgf3` bigint NOT NULL,
  `wpgf5` bigint NOT NULL,
  `wpgf7` bigint NOT NULL,
  `wpgf9` bigint NOT NULL,
  `wpgf11` bigint NOT NULL,
  `wpgf13` bigint NOT NULL,
  `wpgf15` bigint NOT NULL,
  `wpgf17` bigint NOT NULL,
  `wpgf19` bigint NOT NULL,
  `wpgf21` bigint NOT NULL,
  `wpgf23` bigint NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_dispatch_deleted_at`(`deleted_at` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dispatch
-- ----------------------------
INSERT INTO `dispatch` VALUES (1, '2023-05-08 17:41:54.655', '2023-05-28 10:24:20.378', NULL, '200', '3000', 2, 3, 10, 50, 85, 90, 90, 70, 30, 10, 2, 1, 50, 80, 70, 40, 30, 60, 40, 50, 40, 70, 80, 70);
INSERT INTO `dispatch` VALUES (2, '2023-05-09 14:55:14.794', '2023-05-09 14:55:14.794', NULL, '2000', '3000', 20, 30, 40, 50, 60, 70, 80, 70, 60, 50, 40, 30, 10, 20, 30, 40, 50, 60, 60, 50, 40, 30, 20, 10);

-- ----------------------------
-- Table structure for greenuse
-- ----------------------------
DROP TABLE IF EXISTS `greenuse`;
CREATE TABLE `greenuse`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` datetime(3) NULL DEFAULT NULL,
  `updated_at` datetime(3) NULL DEFAULT NULL,
  `deleted_at` datetime(3) NULL DEFAULT NULL,
  `peakconsumption` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `peakprice` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `normalconsumption` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `normalprice` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `valleyconsumption` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `valleyprice` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `dailyconsumption` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `dailycost` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `deccplan0` bigint NOT NULL,
  `deccplan4` bigint NOT NULL,
  `deccplan8` bigint NOT NULL,
  `deccplan12` bigint NOT NULL,
  `deccplan16` bigint NOT NULL,
  `deccplan20` bigint NOT NULL,
  `deccplan24` bigint NOT NULL,
  `deccactual0` bigint NOT NULL,
  `deccactual4` bigint NOT NULL,
  `deccactual8` bigint NOT NULL,
  `deccactual12` bigint NOT NULL,
  `deccactual16` bigint NOT NULL,
  `deccactual20` bigint NOT NULL,
  `deccactual24` bigint NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_greenuse_deleted_at`(`deleted_at` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of greenuse
-- ----------------------------
INSERT INTO `greenuse` VALUES (1, '2023-05-09 14:57:29.478', '2023-05-18 11:39:20.191', NULL, '1000', '15', '550', '10', '3000', '8', '5000', '500', 300, 400, 500, 1000, 800, 500, 400, 200, 250, 350, 600, 800, 1000, 600);

-- ----------------------------
-- Table structure for loadmanage
-- ----------------------------
DROP TABLE IF EXISTS `loadmanage`;
CREATE TABLE `loadmanage`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` datetime(3) NULL DEFAULT NULL,
  `updated_at` datetime(3) NULL DEFAULT NULL,
  `deleted_at` datetime(3) NULL DEFAULT NULL,
  `deviationvaluemax` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `deviationratemax` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `rmsd` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `peakaccuracyyesterday` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `lowestaccuracyyesterday` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `peakaccuracylastmonth` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `lowestaccuracylastmonth` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `averageaccuracylastmonth` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sstloadforecast0` bigint NOT NULL,
  `sstloadforecast4` bigint NOT NULL,
  `sstloadforecast8` bigint NOT NULL,
  `sstloadforecast12` bigint NOT NULL,
  `sstloadforecast16` bigint NOT NULL,
  `sstloadforecast20` bigint NOT NULL,
  `sstloadforecast24` bigint NOT NULL,
  `sstloadactual0` bigint NOT NULL,
  `sstloadactual4` bigint NOT NULL,
  `sstloadactual8` bigint NOT NULL,
  `sstloadactual12` bigint NOT NULL,
  `sstloadactual16` bigint NOT NULL,
  `sstloadactual20` bigint NOT NULL,
  `sstloadactual24` bigint NOT NULL,
  `mecf1` bigint NOT NULL,
  `mecf3` bigint NOT NULL,
  `mecf5` bigint NOT NULL,
  `mecf7` bigint NOT NULL,
  `mecf9` bigint NOT NULL,
  `mecf11` bigint NOT NULL,
  `stlf0` bigint NOT NULL,
  `stlf4` bigint NOT NULL,
  `stlf8` bigint NOT NULL,
  `stlf12` bigint NOT NULL,
  `stlf16` bigint NOT NULL,
  `stlf20` bigint NOT NULL,
  `stlf24` bigint NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_loadmanage_deleted_at`(`deleted_at` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of loadmanage
-- ----------------------------
INSERT INTO `loadmanage` VALUES (1, '2023-05-08 16:56:29.215', '2023-05-08 17:18:56.331', NULL, '8.888', '6.65%', '0.00055', '91%', '83%', '62%', '68%', '3.55%', 50, 50, 700, 750, 800, 100, 60, 40, 60, 600, 400, 900, 200, 100, 200, 50, 30, 70, 90, 50, 50, 60, 500, 600, 300, 100, 50);

-- ----------------------------
-- Table structure for mainhome
-- ----------------------------
DROP TABLE IF EXISTS `mainhome`;
CREATE TABLE `mainhome`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` datetime(3) NULL DEFAULT NULL,
  `updated_at` datetime(3) NULL DEFAULT NULL,
  `deleted_at` datetime(3) NULL DEFAULT NULL,
  `loadpower` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `newenergygeneration` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `storagepower` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pccexchange` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pccreactivepower` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `micropower` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pccplan` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pccactual` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pccstate` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pvplan` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pvactual` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pvstate` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `windplan` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `windactual` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `windstate` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `storageplan` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `storageactual` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `storagestate` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `dieselplan` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `dieselactual` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `dieselstate` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `gasturbineplan` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `gasturbineactual` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `gasturbinestate` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `totalloadplan` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `totalloadactual` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `firstloadplan` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `firstloadactual` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `secondloadplan` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `secondloadactual` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `thirdloadplan` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `thirdloadactual` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `fourthloadplan` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `fourthloadactual` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `chargingpileplan` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `chargingpileactual` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pccplan0` smallint NOT NULL,
  `pccplan3` smallint NOT NULL,
  `pccplan6` smallint NOT NULL,
  `pccplan9` smallint NOT NULL,
  `pccplan12` smallint NOT NULL,
  `pccplan15` smallint NOT NULL,
  `pccplan18` smallint NOT NULL,
  `pccplan21` smallint NOT NULL,
  `pccplan24` smallint NOT NULL,
  `pccactual0` bigint NOT NULL,
  `pccactual3` bigint NOT NULL,
  `pccactual6` bigint NOT NULL,
  `pccactual9` bigint NOT NULL,
  `pccactual12` bigint NOT NULL,
  `pccactual15` bigint NOT NULL,
  `pccactual18` bigint NOT NULL,
  `pccactual21` bigint NOT NULL,
  `pccactual24` bigint NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_mainhome_deleted_at`(`deleted_at` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mainhome
-- ----------------------------
INSERT INTO `mainhome` VALUES (1, '2023-05-08 11:59:40.915', '2023-05-28 10:15:00.608', NULL, '300', '500', '200', '1000', '50', '300', '400', '400', '接入', '200', '200', '运行', '100', '100', '运行', '100', '100', '停止', '0', '0', '停止', '0', '0', '停止', '300', '300', '100', '100', '50', '50', '50', '50', '50', '50', '+100', '+70', 10, 20, 30, 20, 50, 40, 20, 44, 40, 8, 16, 25, 35, 50, 45, 60, 40, 20);

-- ----------------------------
-- Table structure for micropower
-- ----------------------------
DROP TABLE IF EXISTS `micropower`;
CREATE TABLE `micropower`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` datetime(3) NULL DEFAULT NULL,
  `updated_at` datetime(3) NULL DEFAULT NULL,
  `deleted_at` datetime(3) NULL DEFAULT NULL,
  `winddaily` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `photovoltaicdaily` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `windturbinenumber` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `photovoltaicpanelnumber` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `photovoltaic0` bigint NOT NULL,
  `photovoltaic3` bigint NOT NULL,
  `photovoltaic6` bigint NOT NULL,
  `photovoltaic9` bigint NOT NULL,
  `photovoltaic12` bigint NOT NULL,
  `photovoltaic15` bigint NOT NULL,
  `photovoltaic18` bigint NOT NULL,
  `photovoltaic21` bigint NOT NULL,
  `photovoltaic24` bigint NOT NULL,
  `wind0` bigint NOT NULL,
  `wind3` bigint NOT NULL,
  `wind6` bigint NOT NULL,
  `wind9` bigint NOT NULL,
  `wind12` bigint NOT NULL,
  `wind15` bigint NOT NULL,
  `wind18` bigint NOT NULL,
  `wind21` bigint NOT NULL,
  `wind24` bigint NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_micropower_deleted_at`(`deleted_at` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of micropower
-- ----------------------------
INSERT INTO `micropower` VALUES (1, '2023-05-08 14:45:10.685', '2023-05-28 10:18:42.600', NULL, '100', '200', '100', '120', 1, 1, 10, 80, 90, 90, 20, 10, 1, 30, 20, 35, 45, 60, 45, 20, 20, 50);

-- ----------------------------
-- Table structure for storagemanage
-- ----------------------------
DROP TABLE IF EXISTS `storagemanage`;
CREATE TABLE `storagemanage`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` datetime(3) NULL DEFAULT NULL,
  `updated_at` datetime(3) NULL DEFAULT NULL,
  `deleted_at` datetime(3) NULL DEFAULT NULL,
  `peslastmonth` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `weslastmonth` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pesthismonth` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `westhismonth` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pesyesterday` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `wesyesterday` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mtes` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `stwes0` bigint NOT NULL,
  `stwes4` bigint NOT NULL,
  `stwes8` bigint NOT NULL,
  `stwes12` bigint NOT NULL,
  `stwes16` bigint NOT NULL,
  `stwes20` bigint NOT NULL,
  `stwes24` bigint NOT NULL,
  `stpes0` bigint NOT NULL,
  `stpes4` bigint NOT NULL,
  `stpes8` bigint NOT NULL,
  `stpes12` bigint NOT NULL,
  `stpes16` bigint NOT NULL,
  `stpes20` bigint NOT NULL,
  `stpes24` bigint NOT NULL,
  `mesd1` bigint NOT NULL,
  `mesd3` bigint NOT NULL,
  `mesd5` bigint NOT NULL,
  `mesd7` bigint NOT NULL,
  `mesd9` bigint NOT NULL,
  `mesd11` bigint NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_storagemanage_deleted_at`(`deleted_at` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of storagemanage
-- ----------------------------
INSERT INTO `storagemanage` VALUES (1, '2023-05-09 16:44:51.175', '2023-05-28 10:21:27.918', NULL, '2500', '3000', '1600', '2000', '200', '160', '3800', 50, 70, 100, 40, 60, 80, 120, 1, 10, 90, 100, 90, 10, 10, 2000, 2500, 3000, 2800, 1600, 1200);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  `deleted_at` datetime NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `telephone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `department` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `gender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `position` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `age` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `wordid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE,
  UNIQUE INDEX `telephone`(`telephone` ASC) USING BTREE,
  INDEX `idx_users_deleted_at`(`deleted_at` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, '2023-05-28 08:08:54', '2023-05-28 08:08:54', NULL, '张三', '123456', '13484845555', '$2a$10$5ua9o7vBlfcjSChZLx2zn.moGqsO.gqZ1wjqs0kTSlNW/AGVH32Ua', '电力部', '123456@qq.com', '男', '经理', '30', '85555');

SET FOREIGN_KEY_CHECKS = 1;
