// ---------------------------------------------------------------------------
// Evidence Ledger — bilingual content source of truth.
//
// Every piece of visible copy lives here. Edit this file to change the site;
// page components only render what is defined below. To keep the site safe to
// publish, no real numbers, prompts, schemas, model names, or internal links
// are stored here — only abstract, sanitized descriptions and placeholders.
// ---------------------------------------------------------------------------

export type Lang = 'zh' | 'en';
export type Localized = { zh: string; en: string };
export type LocalizedList = { zh: string[]; en: string[] };

export const languages: { code: Lang; short: string; full: Localized }[] = [
  { code: 'zh', short: '中', full: { zh: '中文', en: 'Chinese' } },
  { code: 'en', short: 'EN', full: { zh: '英文', en: 'English' } },
];

export const identity = {
  name: 'XiaoFan',
  github: 'https://github.com/1llusion-ai',
  email: 'fanxiao790@gmail.com',
  githubProject4: 'https://github.com/1llusion-ai/ds-course-agent',
  role: { zh: '大模型算法 / Agent 工程师', en: 'LLM Algorithm / Agent Engineer' },
};

/** Global identity copy — kept verbatim from the brief. */
export const global = {
  eyebrow: 'LLM Systems · Agent Engineering · Retrieval',
  headline: {
    zh: '让 LLM 系统可迭代、可验证、可恢复。',
    en: 'Making LLM systems iterative, verifiable, and recoverable.',
  },
  intro: {
    zh: '我面向大模型算法与 Agent 岗位，设计并实现有状态的 Agent 工作流、领域检索与评测闭环，把复杂任务转化为可解释、可验证的系统能力。',
    en: 'I build stateful agent workflows, domain retrieval systems, and evaluation loops for LLM and agent roles—turning complex tasks into explainable and testable systems.',
  },
  availability: {
    zh: '正在寻找大模型算法 / Agent 相关机会。',
    en: 'Seeking opportunities in LLM algorithms and agent systems.',
  },
};

export const nav = {
  work: { zh: '工作', en: 'Work' },
  approach: { zh: '方法', en: 'Approach' },
  about: { zh: '关于', en: 'About' },
  contact: { zh: '联系', en: 'Contact' },
  menu: { zh: '菜单', en: 'Menu' },
  menuLabel: { zh: '打开导航菜单', en: 'Open navigation menu' },
  switchLabel: { zh: '切换到中文', en: 'Switch to English' },
  brand: 'EVIDENCE LEDGER',
};

export const sections = {
  work: {
    index: '01',
    zh: '工作',
    en: 'Work',
    eyebrow: { zh: 'Selected Work', en: 'Selected Work' },
    title: { zh: '精选工作', en: 'Selected work' },
    note: {
      zh: '四个案例，从多 Agent 工作流到领域检索与可靠性修复，每一项都配有证据与公开边界。',
      en: 'Four cases, from multi-agent workflows to domain retrieval and reliability fixes—each with evidence and a public boundary.',
    },
  },
  approach: {
    index: '02',
    zh: '方法',
    en: 'Approach',
    eyebrow: { zh: '原则', en: 'Principles' },
    title: { zh: '从机制到证据', en: 'From Mechanism to Evidence' },
    note: {
      zh: '每个案例都从问题、个人贡献、核心机制、验证方法与边界展开；只展示经过脱敏和公开许可的内容。',
      en: 'Each case explains the problem, my contribution, the mechanism, validation, and boundaries. Only sanitized and approved material is shown.',
    },
  },
  about: {
    index: '03',
    zh: '关于',
    en: 'About',
    eyebrow: { zh: 'About', en: 'About' },
    title: { zh: '关于我', en: 'About' },
  },
  contact: {
    index: '04',
    zh: '联系',
    en: 'Contact',
    eyebrow: { zh: 'Contact', en: 'Contact' },
    title: { zh: '保持联系', en: 'Get in touch' },
  },
};

export const approach = [
  {
    index: '01',
    title: { zh: '证据门禁式迭代', en: 'Evidence-gated iteration' },
    body: {
      zh: '每一次改动都以可复现的证据为前提：离线指标、回归样本、人工抽检。证据达标才进入下一轮，让迭代跟随测量而不是感觉。',
      en: 'Every change is gated on reproducible evidence—offline metrics, regression samples, manual spot checks. Only evidence that clears the bar moves the work forward, so iteration follows measurement, not intuition.',
    },
  },
  {
    index: '02',
    title: { zh: '面向上下文的分工', en: 'Context-aware delegation' },
    body: {
      zh: '把复杂任务按上下文拆给子代理，主代理保留判断与关键路径。控制上下文膨胀，让系统既扩展得开，也追得回。',
      en: 'Complex tasks are delegated by context to subagents while the primary agent keeps judgment and the critical path. Bounding context growth keeps the system scalable and traceable.',
    },
  },
  {
    index: '03',
    title: { zh: '先评测，再沉淀记忆', en: 'Evaluation before memory' },
    body: {
      zh: '记忆不是任意写入，而是经过评测、去重之后的产出。只有验证过的事实才进入长期记忆，记忆因此可以依赖。',
      en: 'Memory is a verified artifact, not arbitrary writes. Only evaluated, deduplicated facts enter long-term memory, which is what makes it trustworthy.',
    },
  },
];

export const about = {
  bio: {
    zh: '人工智能方向硕士生，关注 Agent 工作流、检索增强、模型迭代可靠性与面向真实任务的评测。',
    en: "A master's student in artificial intelligence, interested in agent workflows, retrieval-augmented systems, reliable model iteration, and task-grounded evaluation.",
  },
  roleTags: {
    zh: ['大模型算法', 'Agent 工程', '检索与评测'],
    en: ['LLM Algorithms', 'Agent Engineering', 'Retrieval & Eval'],
  },
  publication: {
    zh: '发表：EI 收录会议论文一篇（标题与链接暂略）。',
    en: 'Publication: an EI-indexed conference paper (title and link withheld).',
  },
  githubLabel: { zh: 'GitHub', en: 'GitHub' },
  emailLabel: { zh: '邮箱', en: 'Email' },
  emailCta: { zh: '发邮件给我', en: 'Email me' },
};

export const cta = {
  viewWork: { zh: '查看工作', en: 'View work' },
  github: { zh: 'GitHub', en: 'GitHub' },
  readCase: { zh: '阅读案例', en: 'Read the case' },
  source: { zh: '查看源码', en: 'View source' },
  backToTop: { zh: '回到顶部', en: 'Back to top' },
  backToWork: { zh: '返回工作列表', en: 'Back to work list' },
  nextCase: { zh: '下一个案例', en: 'Next case' },
};

/** Shared legal / safety copy. */
export const safety = {
  disclosure: {
    zh: '为保护业务与数据安全，项目细节已脱敏；示例与图示均为合成或公开许可材料。',
    en: 'To protect business and data security, project details have been sanitized; examples and visuals are synthetic or publicly approved.',
  },
  metricsPending: {
    zh: '指标待公开评审 · 占位展示',
    en: 'Metric pending public review · placeholder',
  },
  placeholder: {
    zh: '占位示例',
    en: 'Placeholder',
  },
  stampVerified: 'VERIFIED',
  stampSanitized: 'SANITIZED',
  stampPending: 'PENDING REVIEW',
};

/** Detail-template section labels. */
export const detailLabels = {
  case: { zh: '案例', en: 'Case' },
  problem: { zh: '问题', en: 'Problem' },
  role: { zh: '角色与归属', en: 'Role & attribution' },
  mechanism: { zh: '机制', en: 'Mechanism' },
  validation: { zh: '验证', en: 'Validation' },
  tradeoffs: { zh: '权衡', en: 'Trade-offs' },
  boundary: { zh: '公开边界', en: 'Public boundary' },
  diagramCaption: { zh: '图为机制示意，非系统截图。', en: 'Diagram is a mechanism sketch, not a system screenshot.' },
};

export type DiagramKey = 'workflow' | 'memory' | 'comparison' | 'tree' | 'loop';

export interface MemoryLayers {
  shortTitle: Localized;
  shortDesc: Localized;
  longTitle: Localized;
  longDesc: Localized;
  gate: Localized;
  write: Localized;
  expire: Localized;
}

export interface Project {
  slug: string;
  index: string;
  domain: Localized;
  title: Localized;
  oneLiner: Localized;
  tags: LocalizedList;
  /** Optional public source link (project 4). */
  source?: string;
  /** Mechanism steps / diagram labels. */
  steps: LocalizedList;
  /** Small decorative motif key shown on the work card. */
  motif: 'flow' | 'bars' | 'tree' | 'loop';
  /** Diagram key used on the detail page. */
  diagram: DiagramKey;
  /** Optional second diagram (e.g. two-layer memory under the workflow). */
  diagram2?: DiagramKey;
  /** Labels for the two-layer memory schematic (project 1 only). */
  memory?: MemoryLayers;
  /** Labels for the generic fault-tree diagram (project 3 only). */
  tree?: {
    symptom: Localized;
    hypotheses: LocalizedList;
    verify: Localized;
    repair: Localized;
    regression: Localized;
  };
  detail: {
    problem: Localized;
    role: Localized;
    mechanism: Localized;
    validation: Localized;
    tradeoffs: Localized;
    boundary: Localized;
  };
}

export const projects: Project[] = [
  {
    slug: 'agentic-model-iteration',
    index: '01',
    domain: { zh: 'Agent 工作流', en: 'Agent Workflow' },
    title: {
      zh: '面向模型迭代的多 Agent 工作流',
      en: 'Agentic Model Iteration Workflow',
    },
    oneLiner: {
      zh: '将既有人工协作方式抽象为可执行的 Agent 工作流，以分工、记忆和状态管理支持更稳定的模型迭代。',
      en: 'An executable agent workflow that translates an established human operating model into coordinated delegation, memory, and state management for more reliable model iteration.',
    },
    tags: { zh: ['多 Agent', '有状态', '双层记忆'], en: ['Multi-agent', 'Stateful', 'Two-layer memory'] },
    steps: {
      zh: ['任务受理', '委派', '状态与证据门控', '评测', '恢复', '验证记忆'],
      en: ['Intake', 'Delegation', 'State & evidence gate', 'Evaluation', 'Recovery', 'Validated memory'],
    },
    motif: 'flow',
    diagram: 'workflow',
    diagram2: 'memory',
    memory: {
      shortTitle: { zh: '短期记忆', en: 'Short-term' },
      shortDesc: { zh: '会话上下文 · 易失', en: 'Session context · volatile' },
      longTitle: { zh: '长期记忆', en: 'Long-term' },
      longDesc: { zh: '已验证事实 · 持久', en: 'Verified facts · persistent' },
      gate: { zh: '评测门控', en: 'Evaluation gate' },
      write: { zh: '写入', en: 'write' },
      expire: { zh: '过期移除', en: 'expire' },
    },
    detail: {
      problem: {
        zh: '模型迭代依赖人工反复协作：任务拆解、上下文传递、结果核对都在即时消息里完成，过程难以复现、状态容易丢失，规模一大就失控。',
        en: 'Model iteration relied on repeated manual coordination: task breakdown, context handoff, and result checks all lived in instant messages—hard to reproduce, easy to lose state, and impossible to scale.',
      },
      role: {
        zh: '团队定义了 AI 提效目标；核心架构与导师讨论确认；XiaoFan 主导方案落地并独立实现。他提出以子代理委派管理主代理上下文，以及短期 / 长期记忆机制。',
        en: 'The team defined the AI-efficiency objective; core architecture was discussed with a mentor; XiaoFan led the solution landing and independently implemented it. He proposed subagent delegation to manage primary-agent context and the short-/long-term memory mechanism.',
      },
      mechanism: {
        zh: '把一次模型迭代组织成有状态的工作流：任务受理 → 委派 → 状态与证据门控 → 评测 → 恢复 → 验证记忆。主代理保留判断与关键路径，子代理承担具体执行；短期记忆承载会话上下文，长期记忆只写入通过评测的事实。',
        en: 'A model iteration is organized as a stateful workflow: intake → delegation → state and evidence gate → evaluation → recovery → validated memory. The primary agent keeps judgment and the critical path while subagents execute; short-term memory carries session context and long-term memory only stores facts that passed evaluation.',
      },
      validation: {
        zh: '通过多轮可复现运行验证流程的稳定性与恢复能力。具体指标已脱敏，待公开评审后补充。',
        en: 'Iterations of reproducible runs validated the workflow’s stability and recovery. Specific metrics are sanitized and pending public review.',
      },
      tradeoffs: {
        zh: '委派与记忆带来可扩展性，代价是更多的调用与更长的链路；证据门控提高了可靠性，也增加了单轮耗时。需要在吞吐与稳健之间取平衡。',
        en: 'Delegation and memory buy scalability at the cost of more calls and longer chains; the evidence gate improves reliability but adds per-round latency. The balance between throughput and robustness is a standing trade-off.',
      },
      boundary: {
        zh: '不公开内部提示词、数据规模、模型名称与业务结果；机制以合成示意图说明。',
        en: 'Internal prompts, data scales, model names, and business results are not disclosed; the mechanism is illustrated with a synthetic diagram.',
      },
    },
  },
  {
    slug: 'task-aware-embedding-finetuning',
    index: '02',
    domain: { zh: '领域检索', en: 'Domain Retrieval' },
    title: {
      zh: '面向任务的领域检索微调',
      en: 'Task-Aware Embedding Fine-tuning',
    },
    oneLiner: {
      zh: '围绕领域检索的召回质量，完成 Embedding 模型的训练策略、离线评测与误差分析闭环。',
      en: 'A task-aware embedding fine-tuning and evaluation loop for improving domain retrieval quality.',
    },
    tags: { zh: ['Embedding', '困难负样本', '评测闭环'], en: ['Embedding', 'Hard negatives', 'Eval loop'] },
    steps: {
      zh: ['构造困难负样本', '任务感知匹配粒度', '训练 / 评测同视图', '误差分析循环'],
      en: ['Hard-negative construction', 'Task-aware matching granularity', 'Shared train/eval view', 'Error-analysis loop'],
    },
    motif: 'bars',
    diagram: 'comparison',
    detail: {
      problem: {
        zh: '通用 Embedding 模型在领域检索上召回不足：领域表达与任务目标错位，离线表现与线上表现不一致。',
        en: 'Generic embedding models under-recall on domain retrieval: domain phrasing and task goals are misaligned, and offline results diverge from online performance.',
      },
      role: {
        zh: '在团队目标下，由 XiaoFan 设计并实现训练策略、评测定义与误差分析闭环。',
        en: 'Under a team goal, XiaoFan designed and implemented the training strategies, evaluation definitions, and error-analysis loop.',
      },
      mechanism: {
        zh: '以困难负样本构造更强的对比信号；按任务目标选择匹配粒度（段落 / 句子 / 短语层）；训练与评测共用同一评测视图，保证优化方向一致。',
        en: 'Hard negatives build stronger contrastive signals; matching granularity (passage / sentence / phrase) is chosen per task; training and evaluation share one evaluation view so the optimization direction stays aligned.',
      },
      validation: {
        zh: '两套评测视图：离线指标视图与误差样本视图，配合误差分析循环定位失败模式。具体数值为占位，待公开评审。',
        en: 'Two evaluation views—an offline metrics view and an error-sample view—feed an error-analysis loop that localizes failure modes. Specific values are placeholders pending public review.',
      },
      tradeoffs: {
        zh: '任务感知的粒度更精准，但牺牲通用性、增加标注成本；困难负样本提升判别力，也引入训练不稳定性，需要约束与回退策略。',
        en: 'Task-aware granularity is more precise but costs generality and annotation effort; hard negatives sharpen discrimination but add training instability, requiring constraints and rollback.',
      },
      boundary: {
        zh: '不公开领域数据、具体样本与评测数值；对比图为占位示意。',
        en: 'Domain data, sample utterances, and evaluation numbers are not disclosed; the comparison chart is a placeholder illustration.',
      },
    },
  },
  {
    slug: 'reliable-model-artifact-delivery',
    index: '03',
    domain: { zh: '可靠性工程', en: 'Reliability Engineering' },
    title: {
      zh: '模型交付可靠性：一次训练产物异常的定位与修复',
      en: 'Reliable Model Artifact Delivery',
    },
    oneLiner: {
      zh: '将训练产物在交付阶段出现的异常，拆解为可复现诊断、保护式修复与回归验证的工程闭环。',
      en: 'A reliability case study that turns a model-artifact delivery failure into a reproducible diagnosis, guarded fix, and regression-validation loop.',
    },
    tags: { zh: ['故障诊断', '保护式修复', '回归验证'], en: ['Diagnosis', 'Guarded fix', 'Regression'] },
    steps: {
      zh: ['现象', '多假设', '逐一验证', '根因', '保护式修复', '回归验证'],
      en: ['Symptom', 'Hypotheses', 'Verification', 'Root cause', 'Guarded fix', 'Regression'],
    },
    motif: 'tree',
    diagram: 'tree',
    tree: {
      symptom: { zh: '训练产物交付异常', en: 'Artifact delivery failure' },
      hypotheses: {
        zh: ['输入 / 配置假设', '产物链路假设', '环境依赖假设'],
        en: ['Input / config hypothesis', 'Artifact pipeline hypothesis', 'Environment dependency hypothesis'],
      },
      verify: { zh: '可复现验证', en: 'Reproducible check' },
      repair: { zh: '保护式修复', en: 'Guarded fix' },
      regression: { zh: '回归验证', en: 'Regression validation' },
    },
    detail: {
      problem: {
        zh: '训练产物在交付阶段出现异常，影响下游使用；现象偶发、原因不明。',
        en: 'A model-artifact delivery failure disrupted downstream use; the symptom was intermittent and the cause unknown.',
      },
      role: {
        zh: 'XiaoFan 独立完成复现、诊断、保护式修复设计与修复验证。',
        en: 'XiaoFan independently reproduced the issue, diagnosed it, designed a guarded fix, and validated the repair.',
      },
      mechanism: {
        zh: '以故障树组织诊断：现象 → 多假设 → 逐一验证 → 定位根因 → 设计带约束的保护式修复 → 回归验证。',
        en: 'A fault tree structures the diagnosis: symptom → hypotheses → verification → root cause → guarded fix → regression validation.',
      },
      validation: {
        zh: '以可复现用例确认现象；修复后以回归集验证未回退。具体数据已脱敏。',
        en: 'A reproducible case confirmed the symptom; a regression set confirmed no rollback after the fix. Specifics are sanitized.',
      },
      tradeoffs: {
        zh: '保护式修复优先保证交付稳定，可能牺牲部分性能优化空间；根因判断依赖可复现性，偶发现象需要更长时间的观测。',
        en: 'The guarded fix prioritizes delivery stability, possibly leaving performance headroom on the table; root-causing depends on reproducibility, so intermittent issues need longer observation.',
      },
      boundary: {
        zh: '不公开模型 / 框架 / 仓库 / 代码与内部结果名称；故障树为合成示意。',
        en: 'No model, framework, repo, code, or internal result names are disclosed; the fault tree is a synthetic illustration.',
      },
    },
  },
  {
    slug: 'evidence-grounded-learning-agent',
    index: '04',
    domain: { zh: '有状态教学系统', en: 'Stateful Learning System' },
    title: {
      zh: '证据驱动的个性化教学 Agent',
      en: 'Evidence-Grounded Learning Agent',
    },
    oneLiner: {
      zh: '将课程检索、学习者状态、工具调用与回答评测组织为闭环的有状态教学系统。',
      en: 'A stateful learning agent connecting course retrieval, learner state, tool use, and response evaluation into an evidence-grounded loop.',
    },
    tags: { zh: ['有状态', '工具调用', '检索增强'], en: ['Stateful', 'Tool use', 'Retrieval-augmented'] },
    source: identity.githubProject4,
    steps: {
      zh: ['课程检索', '学习者状态', '工具调用', '回答评测'],
      en: ['Course retrieval', 'Learner state', 'Tool use', 'Response evaluation'],
    },
    motif: 'loop',
    diagram: 'loop',
    detail: {
      problem: {
        zh: '通用教学助手缺乏证据与状态：回答不引用来源、不跟踪学习者进度，难以评测与迭代。',
        en: 'Generic tutoring assistants lack evidence and state: answers cite no sources, learner progress is not tracked, and evaluation is hard.',
      },
      role: {
        zh: '作为公开系统工程项目；XiaoFan 主导系统设计中的检索—评测闭环，公开仓库见 GitHub。',
        en: 'A public systems-engineering project; XiaoFan led the retrieval–evaluation loop within the system design. The public repository is on GitHub.',
      },
      mechanism: {
        zh: '课程检索为回答提供证据来源；学习者状态模块跟踪进度与薄弱点；工具调用执行检索与计算；回答评测闭环评估质量并回写状态。',
        en: 'Course retrieval supplies evidence; a learner-state module tracks progress and weak points; tool calls execute retrieval and computation; a response-evaluation loop scores quality and writes state back.',
      },
      validation: {
        zh: '以端到端链路与评测指标验证闭环；未公开的运行指标按占位处理。',
        en: 'The loop is validated end-to-end with evaluation metrics; unpublished runtime metrics are kept as placeholders.',
      },
      tradeoffs: {
        zh: '证据约束提高了可信度，代价是回答灵活性下降；状态跟踪带来个性化，也增加了上下文与复杂度。',
        en: 'Evidence constraints improve trustworthiness at the cost of answer flexibility; state tracking enables personalization but adds context and complexity.',
      },
      boundary: {
        zh: '公开仓库与系统设计可查看；未发表指标不公开。发表情况：EI 收录会议论文一篇（信息暂略）。',
        en: 'The public repository and system design are visible; unpublished metrics are not. Publication: an EI-indexed conference paper (details withheld).',
      },
    },
  },
];

/** Detail-page "sanitized material" disclosure box. */
export const sanitizedNote = {
  zh: '本页所有描述均为脱敏后的抽象说明；示例与图示为合成材料，不代表真实数据。',
  en: 'All descriptions on this page are sanitized abstractions; examples and visuals are synthetic and do not represent real data.',
};

/** Small centralized copy for standalone pages and diagram annotations. */
export const misc = {
  notFound: {
    title: { zh: '未找到此页', en: 'Page not found' },
    body: {
      zh: '这条记录不在台账里。链接可能已移动，或者地址有误。',
      en: "This entry isn't in the ledger. The link may have moved, or the address is wrong.",
    },
    home: { zh: '返回首页', en: 'Back to home' },
    switchToOther: { zh: 'View in English', en: '查看中文版' },
  },
  workflowNote: {
    zh: '评测未通过时回退到门控重试；恢复后重新进入评测。',
    en: 'On evaluation failure the run rolls back to the gate; after recovery it re-enters evaluation.',
  },
  chart: {
    axis: { zh: '召回质量 · 占位', en: 'Retrieval quality · placeholder' },
    baseline: { zh: '基线', en: 'Baseline' },
    tuned: { zh: '任务感知微调', en: 'Task-aware fine-tune' },
    note: {
      zh: '占位数据 · 数值待公开评审',
      en: 'Placeholder · values pending public review',
    },
  },
  loop: {
    center: { zh: '有状态闭环', en: 'Stateful loop' },
    sub: { zh: '证据门控 · 回写状态', en: 'Evidence-gated · state written back' },
  },
  ledger: {
    title: { zh: '证据台账', en: 'Evidence Ledger' },
    stamp: { zh: '证据示例 · 占位', en: 'Evidence sample · placeholder' },
  },
} as const;
