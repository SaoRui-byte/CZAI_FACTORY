/** Playground 预设回复（演示用，未接入真实模型）。 */

const generic = `这是一段演示回复。当前对话测试台未接入真实模型，所有内容均为预设文本，仅用于展示交互与排版效果。

接入真实模型后，这里会显示目标模型的流式输出：
· 支持 SSE 流式返回，逐字呈现
· 自动继承上下文窗口与温度参数
· 每次调用的输入输出 token 均会计量与留痕

如需联调，请在控制台创建 API Key 后，使用 OpenAI 兼容端点发起请求。`

const codeAnswer = `下面是一个使用 OpenAI 兼容接口调用本平台模型的示例：

\`\`\`python
from openai import OpenAI

client = OpenAI(
    api_key="sk-czai-your-key",
    base_url="https://api.czai.example.com/v1",
)

resp = client.chat.completions.create(
    model="deepseek-v3-2",
    messages=[{"role": "user", "content": "你好"}],
    stream=True,
)

for chunk in resp:
    delta = chunk.choices[0].delta.content
    if delta:
        print(delta, end="")
\`\`\`

注意：以上为演示内容，接口地址与密钥需替换为你自己的。`

const explainAnswer = `这个问题可以从三个层面理解。

一、接口层面
平台对外暴露标准的 OpenAI 兼容端点，更换模型只需改 model 参数，业务代码无需改动。这对已经有 OpenAI 接入经验的团队最省事。

二、算力层面
推理集群按需伸缩，峰值自动扩容。你不需要提前承诺用量，也不用自建机房。

三、计费层面
每次调用的输入与输出 token 分开计量，账单可以追溯到单条请求。企业用户可申请月结。

以上均为演示文本，用于展示排版与流式交互效果。`

export function demoReplies(prompt: string): string {
  const p = prompt.toLowerCase()
  if (/代码|code|python|示例|sdk|调用/.test(p)) return codeAnswer
  if (/为什么|如何|怎么|原理|解释|区别/.test(p)) return explainAnswer
  return generic
}
