# electron + react 实现 markdown 编辑器


## 主要依赖
- electron
- react 
- react-redux
- ~~marked~~
- markdown-it
- codemirror

## 使用

```bash
# 安装依赖
npm i 

# 运行开发服务器
npm run server

# 开启应用
npm run dev
```

## todo

- 保存用户调整界面大小
- 实现多标签页功能
- html 代码块显示行号
- 设置主题
- 导出 pdf 文档
- 优化 reducer 和 container

## 问题
- vim 模式无法正常复制文本
- 编辑区没有右键
- 保存文件依赖预览区的 h1 标签