/*
 Navicat Premium Data Transfer

 Source Server         : 本地
 Source Server Type    : MySQL
 Source Server Version : 80029
 Source Host           : localhost:3306
 Source Schema         : mzc_portal

 Target Server Type    : MySQL
 Target Server Version : 80029
 File Encoding         : 65001

 Date: 29/08/2022 14:56:54
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin-group
-- ----------------------------
DROP TABLE IF EXISTS `admin-group`;
CREATE TABLE `admin-group`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `pId` int(0) NULL DEFAULT 0 COMMENT '上级Id,最高级为0',
  `groupName` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '群组名称',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `groupName`(`groupName`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin-group
-- ----------------------------
INSERT INTO `admin-group` VALUES (1, 0, 'testGroup', '2022-08-25 06:45:52', '2022-08-25 06:45:52');

-- ----------------------------
-- Table structure for admin-role
-- ----------------------------
DROP TABLE IF EXISTS `admin-role`;
CREATE TABLE `admin-role`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `roleName` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '角色名称',
  `groupId` int(0) NULL DEFAULT NULL COMMENT '关联群组ID',
  `permissionId` int(0) NULL DEFAULT NULL COMMENT '关联权限ID',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `roleName`(`roleName`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin-role
-- ----------------------------
INSERT INTO `admin-role` VALUES (1, '测试角色3', 1, NULL, '2022-08-25 06:45:44', '2022-08-25 07:48:42');
INSERT INTO `admin-role` VALUES (4, '测试角色1', 1, NULL, '2022-08-25 06:46:10', '2022-08-25 06:46:10');
INSERT INTO `admin-role` VALUES (15, '测试角色2', 1, NULL, '2022-08-25 06:46:46', '2022-08-25 06:46:46');
INSERT INTO `admin-role` VALUES (16, '测试角色4', 1, NULL, '2022-08-25 09:54:33', '2022-08-25 09:54:33');
INSERT INTO `admin-role` VALUES (22, '12616', NULL, NULL, '2022-08-26 05:41:10', '2022-08-26 05:41:10');

-- ----------------------------
-- Table structure for admin-user
-- ----------------------------
DROP TABLE IF EXISTS `admin-user`;
CREATE TABLE `admin-user`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户账号',
  `email` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '邮箱',
  `age` int(0) NULL DEFAULT NULL,
  `password` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '123456' COMMENT '密码',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  `deletedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `name`, `email`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE,
  UNIQUE INDEX `email`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin-user
-- ----------------------------
INSERT INTO `admin-user` VALUES (1, '8291033', 'ahah@163.com', 10, '123456', '2022-08-25 06:45:51', '2022-08-29 02:38:18', NULL);
INSERT INTO `admin-user` VALUES (2, '用户角色添加', '1234561@163.com', 10, '123456', '2022-08-25 09:54:33', '2022-08-25 09:54:33', NULL);
INSERT INTO `admin-user` VALUES (4, '用户角色添加1', '12345631@163.com', 10, '123456', '2022-08-25 09:55:46', '2022-08-25 09:55:46', NULL);
INSERT INTO `admin-user` VALUES (5, '用户角色添加11', '123452631@163.com', 10, '123456', '2022-08-25 09:56:05', '2022-08-25 09:56:05', NULL);
INSERT INTO `admin-user` VALUES (22, '用户角色添加112', '123452632311@163.com', 10, '123456', '2022-08-26 01:57:53', '2022-08-26 01:57:53', NULL);

-- ----------------------------
-- Table structure for admin-user_to_role
-- ----------------------------
DROP TABLE IF EXISTS `admin-user_to_role`;
CREATE TABLE `admin-user_to_role`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `userId` int(0) NOT NULL COMMENT '用户Id',
  `roleId` int(0) NOT NULL COMMENT '角色Id',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin-user_to_role
-- ----------------------------
INSERT INTO `admin-user_to_role` VALUES (2, 2, 16, '2022-08-25 09:54:33', '2022-08-25 09:54:33');
INSERT INTO `admin-user_to_role` VALUES (29, 1, 4, '2022-08-29 02:38:18', '2022-08-29 02:38:18');
INSERT INTO `admin-user_to_role` VALUES (30, 1, 1, '2022-08-29 02:38:18', '2022-08-29 02:38:18');

-- ----------------------------
-- Table structure for sequelizemeta
-- ----------------------------
DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE `sequelizemeta`  (
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sequelizemeta
-- ----------------------------
INSERT INTO `sequelizemeta` VALUES ('20220628075356-init-users.js');
INSERT INTO `sequelizemeta` VALUES ('20220810071650-init-group.js');
INSERT INTO `sequelizemeta` VALUES ('20220824144807-init-permissions.js');
INSERT INTO `sequelizemeta` VALUES ('20220824145229-init-useRole.js');
INSERT INTO `sequelizemeta` VALUES ('20220825023825-init-user-role.js');

SET FOREIGN_KEY_CHECKS = 1;
