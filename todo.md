# 医疗入境网站迁移 TODO

## Phase 1: 数据库 Schema 迁移
- [x] 分析现有项目结构
- [x] 迁移 users 表
- [x] 迁移 patientConsultations 表
- [x] 迁移 medicalFiles 表
- [x] 执行数据库迁移 (pnpm db:push)

## Phase 2: 后端业务逻辑
- [x] 迁移 server/db.ts 查询助手
- [x] 迁移 server/routers.ts tRPC 路由
- [x] 迁移 server 相关业务逻辑

## Phase 3: 前端页面与组件
- [x] 迁移 contexts (AuthContext, LanguageContext, ThemeContext)
- [x] 迁移 components (Layout, DashboardLayout, 自定义组件)
- [x] 迁移 pages/Home.tsx
- [x] 迁移 pages/OnlineConsultation.tsx
- [x] 迁移 pages/LabTests.tsx
- [x] 迁移 pages/MedicalTravel.tsx
- [x] 迁移 pages/HealingJourney.tsx
- [x] 迁移 pages/LegalSupport.tsx
- [x] 迁移 pages/Login.tsx
- [x] 迁移 pages/Register.tsx
- [x] 迁移 pages/MyAccount.tsx
- [x] 迁移 pages/Terms.tsx
- [x] 迁移 admin pages (Dashboard, Users, Services, Orders, Payments, Notifications, Settings)

## Phase 4: 静态资源与配置
- [x] 复制 public/images 图片资源
- [x] 迁移 index.css 全局样式
- [x] 迁移 App.tsx 路由配置
- [x] 迁移 main.tsx 入口文件

## Phase 5: 测试与验证
- [x] 验证路由系统正常工作
- [x] 验证认证系统正常工作
- [x] 验证多语言支持正常工作
- [x] 验证数据库连接正常
- [x] 测试核心页面加载

## Phase 6: 最终交付
- [ ] 创建项目检查点
- [ ] 生成项目链接
- [ ] 向用户交付完整项目


## Phase 7: 背景图生成与 OAuth 认证完善
- [x] 为 Specialist Consultation 页头生成背景图
- [x] 为 Legal Support 页头生成背景图
- [x] 扩展 users 表添加 OAuth 字段（googleId、microsoftId、appleId、avatar）
- [x] 实现 Google OAuth 认证流程
- [x] 实现 Microsoft OAuth 认证流程
- [x] 实现 Apple OAuth 认证流程
- [x] 实现邮箱验证功能（发送验证码）
- [x] 实现登录后页面跳转功能
- [x] 测试所有 OAuth 流程
- [x] 测试邮箱验证功能
- [x] 测试页面跳转功能
