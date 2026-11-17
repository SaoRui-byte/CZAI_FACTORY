/**
 * 前端演示用的认证层。
 *
 * ⚠️ 安全边界 —— 这里的所有实现都**不能用于生产**：
 *  1. 验证码是固定值 DEMO_CODE，没有短信网关。
 *  2. session 明文存在 localStorage，可被任意脚本读取、篡改。
 *  3. 没有任何服务端校验，前端说登录了就登录了。
 *
 * 真实实现必须：验证码由服务端下发并校验、会话用 HttpOnly Cookie 或
 * 服务端签发 JWT、所有权限判断在服务端完成、localStorage 只放非敏感信息。
 */

const SESSION_KEY = 'czai.session'
const KEYS_KEY = 'czai.apikeys'

export const DEMO_CODE = '123456'
export const CODE_TTL_SECONDS = 60

/** 演示账号：登录页一键进入，跳过输入 */
export const DEMO_ACCOUNT = {
  phone: '13800138000',
  name: '演示用户',
} as const

export interface Session {
  phone: string
  name: string
  createdAt: string
}

export interface ApiKey {
  id: string
  name: string
  /** 完整 Key 仅在创建时返回一次，列表里只留前缀与后缀 */
  prefix: string
  suffix: string
  createdAt: string
  lastUsedAt: string | null
  revoked: boolean
}

/* ---------------- 校验 ---------------- */

export function isValidPhone(phone: string): boolean {
  return /^1[3-9]\d{9}$/.test(phone)
}

/** 138****8000 */
export function maskPhone(phone: string): string {
  if (phone.length !== 11) return phone
  return `${phone.slice(0, 3)}****${phone.slice(7)}`
}

/* ---------------- session ---------------- */

export function readSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Session
    if (!parsed?.phone) return null
    return parsed
  } catch {
    return null
  }
}

export function writeSession(phone: string, name?: string): Session {
  const session: Session = {
    phone,
    name: name ?? `开发者 ${phone.slice(-4)}`,
    createdAt: new Date().toISOString(),
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY)
}

/* ---------------- API Key ---------------- */

function randomToken(len: number): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789'
  const bytes = new Uint8Array(len)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('')
}

export function listKeys(): ApiKey[] {
  try {
    const raw = localStorage.getItem(KEYS_KEY)
    return raw ? (JSON.parse(raw) as ApiKey[]) : []
  } catch {
    return []
  }
}

function saveKeys(keys: ApiKey[]): void {
  localStorage.setItem(KEYS_KEY, JSON.stringify(keys))
}

/** 生成一个新 Key，返回完整值（调用方必须只展示一次） */
export function createKey(name: string): { key: ApiKey; secret: string } {
  const body = randomToken(32)
  const secret = `sk-czai-${body}`
  const key: ApiKey = {
    id: crypto.randomUUID(),
    name: name.trim() || '未命名密钥',
    prefix: 'sk-czai-',
    suffix: body.slice(-4),
    createdAt: new Date().toISOString(),
    lastUsedAt: null,
    revoked: false,
  }
  saveKeys([key, ...listKeys()])
  return { key, secret }
}

export function revokeKey(id: string): void {
  saveKeys(listKeys().map((k) => (k.id === id ? { ...k, revoked: true } : k)))
}

export function deleteKey(id: string): void {
  saveKeys(listKeys().filter((k) => k.id !== id))
}

/** 列表展示用：sk-czai-••••••••3f2a */
export function displayKey(key: ApiKey): string {
  return `${key.prefix}••••••••${key.suffix}`
}

/**
 * 首次登录时预置演示数据。只在没有任何密钥时执行一次，
 * 这样用户自己删光后不会又被塞回来。
 */
export function seedDemoData(): void {
  if (localStorage.getItem(KEYS_KEY) !== null) return

  const seed: ApiKey[] = [
    {
      id: 'demo-key-prod',
      name: '生产环境',
      prefix: 'sk-czai-',
      suffix: '3f2a',
      createdAt: '2026-10-08T01:14:00.000Z',
      lastUsedAt: '2026-11-17T06:32:00.000Z',
      revoked: false,
    },
    {
      id: 'demo-key-test',
      name: '测试环境',
      prefix: 'sk-czai-',
      suffix: 'b7c1',
      createdAt: '2026-10-21T19:40:00.000Z',
      lastUsedAt: '2026-11-16T10:05:00.000Z',
      revoked: false,
    },
    {
      id: 'demo-key-old',
      name: '旧版集成（已停用）',
      prefix: 'sk-czai-',
      suffix: 'd94e',
      createdAt: '2026-08-03T03:22:00.000Z',
      lastUsedAt: '2026-09-29T23:18:00.000Z',
      revoked: true,
    },
  ]
  saveKeys(seed)
}
