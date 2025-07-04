# better-sqlite3 构建常见问题

### 一、构建后会导致打开 报错 cannot find module

1. 检查 asarUnpack 是否单独配置

2. better-sqlite3 必须要在 dependencies 否则 asarUnpack 无法生效

3. 如果遇到 NODE_Modeules 不一致 可以执行命令

`npm rebuild --runtime=electron --disturl=https://atom.io/download/atom-shell --target=37.2.0 --abi=131`

4. [查看 node 版本对应的 NODE_MODULES](https://nodejs.org/en/about/previous-releases)
