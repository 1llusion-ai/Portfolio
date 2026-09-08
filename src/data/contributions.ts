import type { Localized } from './site';

type Decision = { title: Localized; reason: Localized; tradeoff: Localized };
export const contributions: Record<string, { summary: Localized; decisions: Decision[] }> = {
  'agentic-model-iteration': {
    summary: { zh: '主导方案落地并独立实现；核心架构与导师讨论确认。重点负责子代理分工、任务状态持久化与经验复用机制。', en: 'Led implementation after discussing the core architecture with my mentor, focusing on subagent delegation, persisted task state and reusable experience.' },
    decisions: [
      { title: { zh: '让主代理保留决策，把资料处理交给子代理', en: 'Keep decisions in the primary agent' }, reason: { zh: '诊断、规格资料与样本处理会不断扩大上下文。我提出按任务委派子代理，让主代理集中处理选路与关键判断。', en: 'Diagnostics, specifications and samples expand context. I proposed scoped delegation so the primary agent can focus on routing and key decisions.' }, tradeoff: { zh: '委派增加调用与交接成本，需要明确任务边界和返回结果。', en: 'Delegation adds calls and handoffs, requiring explicit task scopes and outputs.' } },
      { title: { zh: '状态落盘，训练与评测先保持串行', en: 'Persist state and keep training sequential' }, reason: { zh: '长链路任务需要恢复和追溯；我把日志、步骤状态与评测按版本保存，并将本轮状态与长期经验分开。', en: 'Long workflows need recovery and traceability. I versioned logs, step state and evaluations, separating current progress from long-term experience.' }, tradeoff: { zh: '文件化状态适合当前单机流程；共享中间路径限制并发，扩展前需消除覆盖风险。', en: 'File state fits the current single-machine workflow. Shared intermediate paths must be isolated before adding concurrency.' } },
    ],
  },
  'task-aware-embedding-finetuning': {
    summary: { zh: '设计并实现训练样本构造、向量难负样本与 Hybrid 匹配，完成微调实验、分口径评测和失败分析。交接时完成离线选型，部署仍待推进。', en: 'Designed data construction, vector hard negatives and Hybrid matching; ran fine-tuning, task-specific evaluation and failure analysis. Offline selection was complete at handover; deployment remained pending.' },
    decisions: [
      { title: { zh: '按意图区分正样本标准', en: 'Define positive matches by intent' }, reason: { zh: '查询状态与执行操作需要不同的示例。我设计 Hybrid 策略：查询按功能点匹配，操作保留具体取值约束，避免相似表达产生错误训练信号。', en: 'State queries and operations need different examples. I designed Hybrid labels: function matches for queries and exact-value constraints for operations.' }, tradeoff: { zh: '更精细的标签依赖意图与取值标注质量，需要处理歧义和中性候选。', en: 'Finer labels depend on intent and value annotation quality and require handling ambiguity and neutral candidates.' } },
      { title: { zh: '把功能点命中与示例质量分开评测', en: 'Evaluate function and example retrieval separately' }, reason: { zh: '只看功能点命中率会掩盖错误示例。我在同一候选库上分别计算功能点过滤和严格 few-shot 指标，用失败案例解释方案差异。', en: 'Function hit rates can hide incorrect examples. I evaluated function filtering and strict few-shot retrieval on the same corpus and analyzed failures to explain the differences.' }, tradeoff: { zh: '全量自检索屏蔽自身与精确匹配，但这些离线结果仍不能替代独立业务泛化验证。', en: 'Self-retrieval masks source and exact matches, but offline scores do not replace independent business-generalization evaluation.' } },
    ],
  },
  'evidence-grounded-learning-agent': {
    summary: { zh: '独立设计并实现前后端、教材 RAG、学习者画像、工具调用与评测链路，并持续重构路由和上下文管理。', en: 'Independently designed and built the frontend, backend, textbook RAG, learner profiles, tools and evaluation pipeline, with ongoing routing and context refactoring.' },
    decisions: [
      { title: { zh: '将意图识别与执行权限分开', en: 'Separate intent from execution permissions' }, reason: { zh: '“检查代码”和“运行代码”不应走相同路径。我用类型化 QueryPipeline 与确定性策略限定检索和工具范围，明确运行请求才进入受限沙箱。', en: 'Code review and execution need different paths. I used a typed QueryPipeline and deterministic policies to scope retrieval and tools, reserving sandbox execution for explicit run requests.' }, tradeoff: { zh: '显式策略增加路由维护成本，需要合约测试持续检查边界。', en: 'Explicit policies add maintenance work and require contract tests to preserve routing boundaries.' } },
      { title: { zh: '按需构建上下文，为检索设置降级路径', en: 'Build context on demand with retrieval fallback' }, reason: { zh: '为减少等待，我引入惰性上下文富化与超时降级；向量服务超时后回退 BM25，同时保留教材引用。', en: 'To reduce waiting, I introduced lazy context enrichment and timeout fallback, using BM25 when vector retrieval times out while retaining textbook references.' }, tradeoff: { zh: '降级保证服务继续运行，但可能影响召回质量；历史延迟结果与当前重构验证分别记录。', en: 'Fallback keeps the service running but may reduce retrieval quality. Historical latency results are kept separate from current refactor validation.' } },
    ],
  },
};
