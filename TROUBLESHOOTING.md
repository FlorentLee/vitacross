# 阿里云ECS部署故障排查指南

## 问题分析

根据最近的部署尝试，当前遇到以下问题：

### 1. SSH连接问题
**症状**: sshpass命令执行失败，一直提示 "Permission denied"
**原因**:
   - 本地环境下的sshpass可能没有正确安装或配置
   - 远程服务器可能限制了SSH密钥认证方式
   - 密码认证可能被临时禁用

**解决方案**:
1. 使用支持密码认证的方式连接：
   ```bash
   ssh root@120.55.195.171
   # 输入密码: Vitacross260105
   ```

2. 使用VSCode Remote SSH插件或PuTTY

3. 如果以上都不行，可以在阿里云ECS控制台的"远程连接"功能中直接执行命令

### 2. HTTP 503错误

**错误信息**:
```
Error: Cannot find module '/dist/index.js'
```

**原因分析**:
- 应用容器内的node.js没有找到dist/index.js
- 可能是因为volume挂载路径问题，文件没有被正确挂载到容器内

**当前Dockerfile配置**:
```dockerfile
FROM node:18-alpine
...
COPY package.json ./package.json
COPY dist ./dist
COPY node_modules ./node_modules
...
```

**问题**:
- 本地构建的`dist/`目录应该有`index.html`文件
- 但容器找不到的是`dist/index.js`
- 需要调整文件结构，确保`index.js`在正确位置

### 3. HTTP 503和域名绑定问题

**当前状态**: HTTP 503错误
**说明**: 您尚未在阿里云绑定域名 `vitacross.cn` 到服务器

**解决方案**:
1. 在阿里云控制台，找到您的ECS实例
2. 点击"远程连接"或使用VNC/Web终端
3. 执行以下命令：
   ```bash
   cd /root/inbound-medical/app
   curl http://localhost:3000
   ```

4. 域名绑定：
   - 方法1：在阿里云DNS控制台添加A记录
   - 记录类型：A
   - 主机记录：`@` → `120.55.195.171`
   - TTL: 600
   - 优先级:5
   - 方法2：添加`www`记录
   - 记录类型：CNAME
   - 主机记录：`@` → `120.55.195.171`
   - TTL: 600
   - 优先级：5

5. 等待DNS生效后访问：
   ```bash
   curl http://120.55.195.171
   ```

### 4. 容应用启动问题

**当前状态**: 容器已创建但可能未正确运行

**排查命令**（在ECS上执行）：
```bash
cd /root/inbound-medical/app

# 查看容器日志
docker-compose logs -f app --tail=100

# 重启容器
docker-compose restart app

# 查看容器状态
docker-compose ps

# 进入容器检查
docker exec -it inbound-medical-app sh

# 检查文件是否存在
docker exec -it inbound-medical-app ls -la /app/

# 检查package.json
docker exec -it inbound-medical-app cat /app/package.json

# 检查dist目录
docker exec -it inbound-medical-app ls -la /app/dist/
```

### 5. 完整的部署修复方案

由于SSH命令执行有困难，建议您采用以下任一方案：

#### 方案A：使用阿里云ECS控制台操作（推荐）

1. 登录阿里云控制台: https://ecs.console.aliyun.com
2. 找到您的ECS实例
3. 点击"远程连接"进入终端
4. 执行以下命令：
   ```bash
   # 停止旧容器
   docker-compose down

   # 删除旧文件
   rm -f docker-compose.yml Dockerfile*

   # 创建新的docker-compose.yml
   cat > docker-compose.yml << 'EOF'
   version: 3.8
   services:
     app:
       image: node:18-alpine
       container_name: inbound-medical-app
       restart: unless-stopped
       command: node dist/index.js
       working_dir: /app
       volumes:
         - ./package.json:/app/package.json:ro
         - ./node_modules:/app/node_modules:ro
         - ./dist:/app/dist:ro
       ports:
           - "3000:3000"
       environment:
         - NODE_ENV=production
         - PORT=3000
         - DATABASE_URL=\${DATABASE_URL}
         - JWT_SECRET=\${JWT_SECRET}
   networks:
         - app-network

   nginx:
       image: nginx:alpine
       container_name: inbound-medical-nginx
       restart: unless-stopped
       ports:
         - "80:80"
         - "443:443"
       volumes:
         - ./nginx.conf:/etc/nginx/nginx.conf:ro
       - ./ssl:/etc/nginx/ssl:ro
       depends_on:
         - app
       networks:
         - app-network

   networks:
     app-network:
       driver: bridge
   EOF

   # 重启
   docker-compose up -d

   # 查看日志
   docker-compose logs -f app --tail=100

   # 创建.env文件
   cat > .env << 'EOF'
   DATABASE_URL=postgresql://Admin:Vitacross260105@pgm-bp128809g268sh3k2o.pg.rds.aliyuncs.com:5432/inbound_medical
   JWT_SECRET=vitacross-prod-jwt-secret-key-2024-change-in-production-random-key-abc123xyz
   NODE_ENV=production
   PORT=3000
   EOF
   ```

#### 方案B：手动上传必要文件

由于SSH命令有困难，您可以：

1. 使用阿里云OSS对象存储上传以下文件：
   - `dist/` 目录（包含前端构建文件）
   - `node_modules/` 目录（包含所有依赖）

2. 使用SCP或阿里云OSS客户端工具上传这两个目录到 `/root/inbound-medical/app/`

3. 然后在ECS上执行：
   ```bash
   cd /root/inbound-medical/app
   rm -rf *.* .DS_Store
   rm -f docker-compose.yml Dockerfile

   # 上传dist和node_modules后，使用这个docker-compose.yml：
   cat > docker-compose.yml << 'EOF'
   version: 3.8
   services:
     app:
       image: node:18-alpine
       container_name: inbound-medical-app
       restart: unless-stopped
       working_dir: /app
       command: node dist/index.js
       volumes:
         - ./package.json:/app/package.json:ro
         - ./node_modules:/app/node_modules:ro
         - ./dist:/app/dist:ro
       ports:
           - "3000:3000"
       environment:
         - NODE_ENV=production
         - PORT=3000
         - DATABASE_URL=\${DATABASE_URL}
         - JWT_SECRET=\${JWT_SECRET}
   networks:
         - app-network

   nginx:
       image: nginx: alpine
       container_name: inbound-medical-nginx
       restart: unless-stopped
       ports:
         - "80:80"
         - "443:443"
       volumes:
         - ./nginx.conf:/etc/nginx/nginx/nginx.conf:ro
         - ./ssl:/etc/nginx/ssl:ro
       depends_on:
         - app
       networks:
         - app-network

   networks:
     app-network:
       driver: bridge
   EOF
   ```

### 重要提醒

1. **域名绑定**:
   - HTTP 503错误表明需要SSL证书
   - 在阿里云DNS添加A记录指向 `120.55.195.171` -> `vitacross.cn`
   - HTTPS (443端口)需要配置证书文件

2. **文件路径问题**:
   - 确保 `dist/` 目录包含 `index.html` 而不是 `index.js`
   - 如果问题，需要调整本地构建脚本

3. **Node.js问题**:
   - `dist/index.js` 不存在说明可能是前端打包输出有问题
   - 检查本地 `dist/` 目录的内容

### 快速修复步骤

#### 本地检查（在您的本地执行）

```bash
# 1. 检查dist目录结构
ls -la dist/

# 2. 如果只有index.html，重新构建
# 确保有index.html存在
```

#### 在ECS上修复（选择方案A或B）

由于SSH连接持续失败，建议您：

**立即行动**：使用阿里云ECS控制台的"远程连接"功能
1. 登录 https://ecs.console.aliyun.com
2. 找到ECS实例 `120.55.195.171`
3. 点击"远程连接"
4. 在终端中执行上面的"完整修复方案"中的docker-compose.yml创建命令

**或使用阿里云Workbench**（如果可用）：
1. 登录 Workbench
2. 找到您的ECS实例
3. 执行命令

这样可以直接复制粘贴部署命令，避免SSH命令执行的问题。

### 预期结果

完成修复后，您将可以：
- 访问 `http://120.55.195.171` - 主站（HTTP）
- 或访问 `http://vitacross.cn` - 如果绑定了域名
- 所有应用功能应该正常工作
