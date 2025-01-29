# UchatNode SDK

### 简介

UchatNode SDK 是一款为开发者提供方便与 UchatNode 智能合约交互的工具包，支持以下主要功能：

* 获取当前批次信息
* 查询节点销售配置
* 获取节点信息和钱包地址
* 支持节点购买与收益领取操作
* 内置 Oracle 服务调用，轻松完成参数签名校验

### 功能列表

1. 获取当前批次
2. 获取节点销售配置
3. 获取节点信息
4. 获取可领取的 Uchat
5. 购买节点
6. 领取收益

### 配置

#### 代币合约地址配置（usdt）

```
src/config/tokens.tsx
```

#### uchatNode节点销售合约地址配置(uchatNode)

```
src/config/contracts.tsx
```

#### oracle配置

```
.env.development
```

### 安装

```
npm i --force
```

### 运行

```
npm run dev
```

### 打包

```
npm run build
```
