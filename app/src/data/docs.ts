export interface DocBlock {
  type: 'p' | 'h2' | 'code' | 'list' | 'note'
  text?: string
  lang?: string
  items?: string[]
}

export interface DocSection {
  heading: string
  blocks: DocBlock[]
}

export interface DocPage {
  slug: string
  title: string
  summary: string
  sections: DocSection[]
}

export const docs: DocPage[] = [
  {
    slug: 'quickstart',
    title: '快速开始',
    summary: '五分钟内完成第一次模型调用。',
    sections: [
      {
        heading: '1. 获取 API Key',
        blocks: [
          {
            type: 'p',
            text: '登录控制台，进入「API Key」页面，点击「新建 API Key」。密钥在创建后仅完整显示一次，请立即复制保存。',
          },
          {
            type: 'note',
            text: '演示环境下密钥保存在浏览器本地。生产环境由服务端签发并存储哈希值。',
          },
        ],
      },
      {
        heading: '2. 发起第一次请求',
        blocks: [
          {
            type: 'p',
            text: '平台提供 OpenAI 兼容端点。若你已使用过 OpenAI SDK，只需替换 base_url 与 api_key。',
          },
          {
            type: 'code',
            lang: 'python',
            text: `from openai import OpenAI

client = OpenAI(
    api_key="sk-czai-your-key",
    base_url="https://api.czai.example.com/v1",
)

resp = client.chat.completions.create(
    model="deepseek-v3-2",
    messages=[
        {"role": "user", "content": "用一句话解释什么是 token"}
    ],
)

print(resp.choices[0].message.content)`,
          },
        ],
      },
      {
        heading: '3. 流式输出',
        blocks: [
          { type: 'p', text: '设置 stream=True 即可逐字接收响应。' },
          {
            type: 'code',
            lang: 'python',
            text: `resp = client.chat.completions.create(
    model="deepseek-v3-2",
    messages=[{"role": "user", "content": "写一段介绍"}],
    stream=True,
)

for chunk in resp:
    delta = chunk.choices[0].delta.content
    if delta:
        print(delta, end="", flush=True)`,
          },
        ],
      },
    ],
  },
  {
    slug: 'api-reference',
    title: 'API 参考',
    summary: '对话补全接口的参数与返回结构。',
    sections: [
      {
        heading: 'POST /v1/chat/completions',
        blocks: [
          { type: 'p', text: '创建一次对话补全。请求与响应格式遵循 OpenAI Chat Completions 规范。' },
          {
            type: 'code',
            lang: 'json',
            text: `{
  "model": "deepseek-v3-2",
  "messages": [
    { "role": "system", "content": "你是有用的助手" },
    { "role": "user", "content": "你好" }
  ],
  "temperature": 0.7,
  "max_tokens": 2048,
  "stream": false
}`,
          },
        ],
      },
      {
        heading: '请求参数',
        blocks: [
          {
            type: 'list',
            items: [
              'model — 模型 ID，见模型广场',
              'messages — 消息数组，支持 system / user / assistant',
              'temperature — 0～2，默认 0.7，越低越确定',
              'max_tokens — 最大输出 token 数',
              'stream — 是否流式返回，默认 false',
              'top_p — 核采样，默认 1.0',
            ],
          },
        ],
      },
      {
        heading: '响应结构',
        blocks: [
          {
            type: 'code',
            lang: 'json',
            text: `{
  "id": "chatcmpl-8f2a1c",
  "object": "chat.completion",
  "created": 1732000000,
  "model": "deepseek-v3-2",
  "choices": [{
    "index": 0,
    "message": { "role": "assistant", "content": "你好！" },
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 24,
    "completion_tokens": 8,
    "total_tokens": 32
  }
}`,
          },
        ],
      },
      {
        heading: '错误码',
        blocks: [
          {
            type: 'list',
            items: [
              '400 — 请求参数错误',
              '401 — 密钥无效或已撤销',
              '429 — 超出速率限制',
              '500 — 服务端错误，不计费',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'sdk',
    title: 'SDK 与示例',
    summary: 'Node.js 与 cURL 调用示例。',
    sections: [
      {
        heading: 'Node.js',
        blocks: [
          {
            type: 'code',
            lang: 'javascript',
            text: `import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.CZAI_API_KEY,
  baseURL: 'https://api.czai.example.com/v1',
})

const resp = await client.chat.completions.create({
  model: 'deepseek-v3-2',
  messages: [{ role: 'user', content: '你好' }],
})

console.log(resp.choices[0].message.content)`,
          },
        ],
      },
      {
        heading: 'cURL',
        blocks: [
          {
            type: 'code',
            lang: 'bash',
            text: `curl https://api.czai.example.com/v1/chat/completions \\
  -H "Authorization: Bearer $CZAI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "deepseek-v3-2",
    "messages": [{"role": "user", "content": "你好"}]
  }'`,
          },
        ],
      },
      {
        heading: '最佳实践',
        blocks: [
          {
            type: 'list',
            items: [
              '将密钥放在环境变量中，不要提交到代码仓库',
              '对 429 响应实现指数退避重试',
              '流式场景下及时消费响应，避免连接超时',
              '生产环境按用途拆分多个密钥，便于审计与撤销',
            ],
          },
        ],
      },
    ],
  },
]

export function findDoc(slug: string): DocPage | undefined {
  return docs.find((d) => d.slug === slug)
}
