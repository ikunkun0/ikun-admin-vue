// uno.config.ts
import { defineConfig } from 'unocss'

export default defineConfig({
  // 自定义规则和预设
  rules: [
    // 添加自定义规则，例如 text-red 自定义文本颜色
    ['text-red', { color: 'red' }],
    ['full', { width: '100vw', height: '100vh' }],
    [
      'flex-center',
      { display: 'flex', 'justify-content': 'center', 'align-items': 'center' }
    ]
  ],
  presets: [
    // 使用预设配置
    require('unocss/preset-attributify')(), // 属性模式
    require('unocss/preset-uno')(), // 默认预设
    require('unocss/preset-icons')() // 图标预设
  ]
})
