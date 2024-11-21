import { ElLoading } from 'element-plus'

interface LoadingConfig {
  // 加载文字
  text?: string
}

export function useLoading(config: LoadingConfig) {
  const loading = ElLoading.service({
    text: config.text
  })
  return {
    loading
  } as const
}
