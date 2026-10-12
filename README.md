# OneNetshop

OneNetshop 是一个基于 Node.js + Express + MongoDB 的 H5 礼品网前后端整站，适合做礼品卡、生日礼物、纪念日礼品、照片定制类电商展示和简单购物功能。

## 功能特性

- H5 响应式首页
- 商品列表与详情页
- 购物车功能
- 结算占位页
- 后台新增/删除商品
- 图片上传
- MongoDB 数据存储
- 示例商品数据（可通过 `npm run seed` 自动填充）

## 目录结构

- `server.js`：服务入口
- `routes/`：页面与后台路由
- `models/`：MongoDB 模型
- `views/`：EJS 页面模板
- `public/`：静态资源、图片、CSS
- `seed.js`：初始化示例商品数据

## 快速开始

1. 安装依赖

```bash
npm install
```

2. 复制环境变量文件

```bash
cp .env.example .env
```

3. 启动 MongoDB

确保本地 MongoDB 已经启动，默认地址为：

```bash
mongodb://127.0.0.1:27017/onenetshop
```

4. 填充示例数据（可选）

```bash
npm run seed
```

5. 启动项目

```bash
npm start
```

访问：

```bash
http://localhost:3000
```

后台地址：

```bash
http://localhost:3000/admin
```

## 常用脚本

```bash
npm run dev    # 开发模式（nodemon）
npm run seed    # 初始化示例商品
npm start       # 生产模式
```

## 部署到服务器

推荐使用 PM2 运行：

```bash
npm install -g pm2
pm2 start server.js --name onenetshop
```

如果需要绑定域名和 Nginx 反向代理，可以将 3000 端口转发到 80/443。数据库建议使用 MongoDB Atlas 或自己部署 MongoDB。

## 说明

这是一个简洁版成品，适合直接在服务器上部署和二次开发。如果你需要以下能力，我可以继续为你扩展：

- 用户注册登录
- 微信/支付宝支付
- 订单管理后台
- 商品分类和搜索
- 会员折扣和优惠券
- 图片压缩和 CDN
