// 可选自定义环境变量类型
interface ImportMetaEnv {
  readonly VITE_MODE: string;
  // 这里可以添加其他自定义变量
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
