export const LOGIN_NAME = 'Login'

export const REDIRECT_NAME = 'Redirect'

export const whiteNameList = [LOGIN_NAME, 'error', 'error-404'] as const

export type WhiteNameList = typeof whiteNameList

export type WhiteName = (typeof whiteNameList)[number]
