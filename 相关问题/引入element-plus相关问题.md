### 引入ts类型的时候会出现相关问题

```
import type { FormInstance, FormRules } from 'element-plus'
// 引入的时候会报错 模块“"element-plus"”没有导出的成员“FormRules”
// 解决办法是在env.d.ts里面添加“element-plus”声明
```

然后解决了上面的报错会出现新的报错

```
const ruleFormRef = ref<FormInstance>() // 不能将命名空间“FormInstance”用作类型。

解决方案
type FormInstance = InstanceType<typeof FormInstance>
const ruleFormRef = ref<FormInstance>()
```
