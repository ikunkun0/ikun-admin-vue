import axios, { CanceledError } from 'axios'
import qs from 'qs'
import type {
  AxiosResponse,
  AxiosRequestConfig,
  InternalAxiosRequestConfig
} from 'axios'
import { ResultEnum } from '@/enums/httpEnum'
import { ElMessage } from 'element-plus'
import { isString } from 'lodash-es'
import { ElLoading } from 'element-plus'

// import { encryptData } from './sea.ts'

export const baseApiUrl = import.meta.env.VITE_BASE_API_URL
const UNKNOWN_ERROR = '未知错误，请重试'
export interface RequestOptions extends AxiosRequestConfig {
  // 调用接口的时候是否需要loading
  isLoading?: boolean
  // 失败时 是否显示后端返回的失败信息
  showErrorMsg?: boolean
}

export interface BaseApi<T = any> {
  code: number
  data: T
  msg: string
}

const controller = new AbortController()
const service = axios.create({
  baseURL: baseApiUrl,
  timeout: 10000,
  signal: controller.signal, // 将signal传递给 用于取消请求 controller.abort()
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: 'brackets' }) // arrayFormat: 'brackets'}
  }
})
let loading: any = null
service.interceptors.request.use(
  (config) => {
    const customConfig = config as InternalAxiosRequestConfig & {
      isLoading?: boolean
    }
    if (customConfig.isLoading) {
      loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    }
    // todo 加解密未完成
    // config.data = encryptData(config.data)

    return customConfig
  },
  (error) => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse<BaseApi>) => {
    const res = response.data
    loading && loading.close()
    if (res.code !== ResultEnum.SUCCESS) {
      console.log(res.msg)
      ElMessage.error(res.msg || UNKNOWN_ERROR)
      const error = new Error(res.msg || UNKNOWN_ERROR) as Error & {
        code: any
      }
      error.code = res.code
      return Promise.reject(error)
    } else {
      return response
    }
  },
  (error) => {
    if (!(error instanceof CanceledError)) {
      // 处理 422 或者 500 的错误异常提示
      const errMsg = error?.response?.data?.message ?? UNKNOWN_ERROR
      ElMessage.error({ content: errMsg, key: errMsg })
      error.message = errMsg
    }
    return Promise.reject(error)
  }
)

export function request<T = any>(
  url: string,
  config: { isReturnResult: false } & RequestOptions
): Promise<BaseApi<T>>

export function request<T = any>(
  url: string,
  config: RequestOptions
): Promise<BaseApi<T>['data']>
export function request<T = any>(
  config: RequestOptions
): Promise<BaseApi<T>['data']>

export async function request(
  _url: string | RequestOptions,
  _config: RequestOptions = {}
) {
  const url = isString(_url) ? _url : (_url as RequestOptions).url
  const config = (isString(_url) ? _config : _url) as RequestOptions
  try {
    const response = (await service.request({
      url: url as string,
      ...config
    })) as AxiosResponse<BaseApi>
    const { data } = response
    const { code, msg } = data || {}
    const hasSuccess =
      data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS
    if (hasSuccess) {
      ElMessage.success(msg)
    } else {
      ElMessage.error(msg || UNKNOWN_ERROR)
    }
    return data
  } catch (error: any) {
    return Promise.reject(error)
  }
}
