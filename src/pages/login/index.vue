<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import type { FormInstance, FormRules, ELForm } from 'element-plus'
import Particles from 'particlesjs'
// import { ElMessage } from 'element-plus'
import to from '@/utils/awaitTo'
import { useUserStore } from '@/store/modules/user'
import { router } from 'vue-router'

type FormInstance = InstanceType<typeof FormInstance>
type FormRules = InstanceType<typeof ELForm>

const userStore = useUserStore()

onMounted(() => {
  Particles.init({
    // 选择canvas画布元素
    selector: '.background',
    // 设置最大粒子数
    maxParticles: 100,
    // 设置粒子的移动速度
    speed: 1,
    // 设置粒子颜色
    color: '#8ACAFF',
    // 开启点连线
    connectParticles: true,
    // 设置
    minDistance: 140,
    // 设置响应式配置项的调整
    responsive: [
      {
        // 当浏览器窗口宽小于768像素大小采用以下配置
        breakpoint: 768,
        options: {
          maxParticles: 200,
          color: '#9400D3',
          connectParticles: false
        }
      },
      {
        // 当浏览器窗口宽小于425像素大小采用以下配置
        breakpoint: 425,
        options: {
          maxParticles: 100,
          connectParticles: true
        }
      },
      {
        // 当浏览器窗口宽小于320像素大小采用以下配置
        breakpoint: 320,
        options: {
          maxParticles: 0
        }
      }
    ]
  })
})

const ruleFormRef = ref<FormInstance>()

interface LoginForm {
  loginName: string
  password: string
}

const ruleForm = reactive<LoginForm>({
  loginName: '',
  password: ''
})

const rules = reactive<FormRules>({
  loginName: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid: boolean) => {
    if (valid) {
      const [err] = await to(
        userStore.authLogin({
          password: ruleForm.password,
          loginName: ruleForm.loginName
        })
      )
      if (!err) {
        router.push('/')
      }
    } else {
      console.log('error submit!')
    }
  })
}
</script>

<template>
  <div class="full flex-center" id="login-box">
    <canvas class="background"></canvas>
    <el-card class="w-500px">
      <!-- <h3 class="text-center font-size-8 m-0 mb-10px">ikun-admin</h3> -->
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        size="large"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item prop="loginName">
          <el-input
            v-model="ruleForm.loginName"
            type="password"
            placeholder="admin"
            autocomplete="off"
            :prefix-icon="User"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            placeholder="123456"
            :prefix-icon="Lock"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            class="w-full"
            type="primary"
            @click="submitForm(ruleFormRef)"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped lang="less">
.background {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
