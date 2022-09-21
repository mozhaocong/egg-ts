/*
 Navicat Premium Data Transfer

 Source Server         : 公司电脑本地
 Source Server Type    : MySQL
 Source Server Version : 80030 (8.0.30)
 Source Host           : localhost:3306
 Source Schema         : mzc_portal

 Target Server Type    : MySQL
 Target Server Version : 80030 (8.0.30)
 File Encoding         : 65001

 Date: 21/09/2022 17:50:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin-group
-- ----------------------------
DROP TABLE IF EXISTS `admin-group`;
CREATE TABLE `admin-group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pId` int DEFAULT '0' COMMENT '上级Id,最高级为0',
  `groupName` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '群组名称',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `groupName` (`groupName`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of admin-group
-- ----------------------------
BEGIN;
INSERT INTO `admin-group` (`id`, `pId`, `groupName`, `createdAt`, `updatedAt`) VALUES (1, 0, '公司', NULL, NULL);
INSERT INTO `admin-group` (`id`, `pId`, `groupName`, `createdAt`, `updatedAt`) VALUES (2, 1, '技术部', NULL, NULL);
INSERT INTO `admin-group` (`id`, `pId`, `groupName`, `createdAt`, `updatedAt`) VALUES (3, 1, '产品部', NULL, NULL);
INSERT INTO `admin-group` (`id`, `pId`, `groupName`, `createdAt`, `updatedAt`) VALUES (12, 2, '前端部', '2022-09-09 06:46:19', '2022-09-09 06:46:19');
INSERT INTO `admin-group` (`id`, `pId`, `groupName`, `createdAt`, `updatedAt`) VALUES (13, 2, '后端部', '2022-09-09 06:46:35', '2022-09-09 06:46:35');
INSERT INTO `admin-group` (`id`, `pId`, `groupName`, `createdAt`, `updatedAt`) VALUES (14, 2, '测试部', '2022-09-09 06:46:43', '2022-09-09 06:46:43');
COMMIT;

-- ----------------------------
-- Table structure for admin-role
-- ----------------------------
DROP TABLE IF EXISTS `admin-role`;
CREATE TABLE `admin-role` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `roleName` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '角色名称',
  `groupId` int DEFAULT NULL COMMENT '关联群组ID',
  `permissionId` int DEFAULT NULL COMMENT '关联权限ID',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `roleName` (`roleName`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of admin-role
-- ----------------------------
BEGIN;
INSERT INTO `admin-role` (`id`, `roleName`, `groupId`, `permissionId`, `createdAt`, `updatedAt`) VALUES (47, '1662023992012用户角色', 12, NULL, '2022-09-01 09:19:52', '2022-09-16 01:38:00');
INSERT INTO `admin-role` (`id`, `roleName`, `groupId`, `permissionId`, `createdAt`, `updatedAt`) VALUES (48, '1662024070149用户角色', 12, NULL, '2022-09-01 09:21:10', '2022-09-16 01:51:46');
INSERT INTO `admin-role` (`id`, `roleName`, `groupId`, `permissionId`, `createdAt`, `updatedAt`) VALUES (49, '张三', 12, NULL, '2022-09-21 06:49:48', '2022-09-21 06:49:48');
COMMIT;

-- ----------------------------
-- Table structure for admin-user
-- ----------------------------
DROP TABLE IF EXISTS `admin-user`;
CREATE TABLE `admin-user` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `name` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '用户账号',
  `email` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '邮箱',
  `age` int DEFAULT NULL,
  `password` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '123456' COMMENT '密码',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`,`name`,`email`) USING BTREE,
  UNIQUE KEY `name` (`name`) USING BTREE,
  UNIQUE KEY `email` (`email`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of admin-user
-- ----------------------------
BEGIN;
INSERT INTO `admin-user` (`id`, `name`, `email`, `age`, `password`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (44, '1662023992012用户角色', '1662023992012@163.com', 10, '123456', '2022-09-01 09:19:52', '2022-09-21 09:42:48', NULL);
INSERT INTO `admin-user` (`id`, `name`, `email`, `age`, `password`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (45, '1662024070149用户角色', '1662024070149@163.com', 10, '123456', '2022-09-01 09:21:10', '2022-09-01 09:21:10', NULL);
INSERT INTO `admin-user` (`id`, `name`, `email`, `age`, `password`, `createdAt`, `updatedAt`, `deletedAt`) VALUES (46, '李四', '13587545@163.com', 10, '123456', NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for admin-user_to_role
-- ----------------------------
DROP TABLE IF EXISTS `admin-user_to_role`;
CREATE TABLE `admin-user_to_role` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `userId` int NOT NULL COMMENT '用户Id',
  `roleId` int NOT NULL COMMENT '角色Id',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of admin-user_to_role
-- ----------------------------
BEGIN;
INSERT INTO `admin-user_to_role` (`id`, `userId`, `roleId`, `createdAt`, `updatedAt`) VALUES (57, 44, 47, '2022-09-21 09:41:17', '2022-09-21 09:41:17');
INSERT INTO `admin-user_to_role` (`id`, `userId`, `roleId`, `createdAt`, `updatedAt`) VALUES (58, 44, 48, '2022-09-21 09:42:48', '2022-09-21 09:42:48');
COMMIT;

-- ----------------------------
-- Table structure for sequelizemeta
-- ----------------------------
DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`) USING BTREE,
  UNIQUE KEY `name` (`name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of sequelizemeta
-- ----------------------------
BEGIN;
INSERT INTO `sequelizemeta` (`name`) VALUES ('20220628075356-init-users.js');
INSERT INTO `sequelizemeta` (`name`) VALUES ('20220810071650-init-group.js');
INSERT INTO `sequelizemeta` (`name`) VALUES ('20220824144807-init-permissions.js');
INSERT INTO `sequelizemeta` (`name`) VALUES ('20220824145229-init-useRole.js');
INSERT INTO `sequelizemeta` (`name`) VALUES ('20220825023825-init-user-role.js');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
