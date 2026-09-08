// ---------------------------------------------------------------------------
// Evidence Ledger — bilingual content source of truth.
//
// Shared bilingual copy. Detailed cases live in agentCase.ts and embeddingCase.ts.
// Results are drawn from the supplied resume and project documentation.
// ---------------------------------------------------------------------------

import { embeddingCase } from './embeddingCase';

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
  work: { zh: '项目', en: 'Projects' },
  notes: { zh: '工程笔记', en: 'Notes' },
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
    title: { zh: '精选项目', en: 'Selected projects' },
    note: {
      zh: '三个项目，分别探索模型自动迭代、IoT 语义检索与个性化教学。',
      en: 'Three projects exploring automated model iteration, IoT semantic retrieval and personalized teaching.',
    },
  },
  approach: {
    index: '02',
    zh: '方法',
    en: 'Approach',
    eyebrow: { zh: '原则', en: 'Principles' },
    title: { zh: '我如何推进一个系统', en: 'How I build systems' },
    note: {
      zh: '从拆解任务到验证结果，把每次实验转化为下一次迭代的依据。',
      en: 'Break down the task, validate the result, and use each experiment to guide the next iteration.',
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
    title: { zh: '用评测决定下一步', en: 'Let evaluation guide iteration' },
    body: {
      zh: '改动前明确基线与验收标准，改动后检查离线指标、回归样本和人工抽检结果。既看目标问题是否改善，也看已有能力是否退化。',
      en: 'Define the baseline and acceptance criteria before making changes. Then check offline metrics, regression cases and manual samples to verify improvements and catch losses in existing capabilities.',
    },
  },
  {
    index: '02',
    title: { zh: '按任务边界组织协作', en: 'Give each agent a clear scope' },
    body: {
      zh: '主代理负责决策与关键路径，子代理处理范围明确的资料和样本任务。用持久化状态记录进度，让长链路任务可以追踪和恢复。',
      en: 'The primary agent owns decisions and the critical path; subagents handle scoped document and sample tasks. Persisted progress makes long workflows traceable and recoverable.',
    },
  },
  {
    index: '03',
    title: { zh: '只复用经过验证的经验', en: 'Reuse validated experience' },
    body: {
      zh: '区分本轮任务状态与长期经验。经验经过评测和去重后再写入记忆，减少重复探索，也避免让未经验证的结论影响后续决策。',
      en: 'Separate current task state from long-term experience. Evaluate and deduplicate lessons before storing them, reducing repeated exploration and keeping unverified conclusions out of future decisions.',
    },
  },
];

export const about = {
  education: [
    { school: { zh: '厦门大学', en: 'Xiamen University' }, logo: 'images/organizations/xmu.png', degree: { zh: '人工智能 · 硕士', en: 'MSc in Artificial Intelligence' }, detail: { zh: '2024.09 — 2027.06', en: 'Sep 2024 — Jun 2027' } },
    { school: { zh: '华中农业大学', en: 'Huazhong Agricultural University' }, logo: 'images/organizations/hzau.ico', degree: { zh: '智慧农业 · 本科', en: 'BSc in Smart Agriculture' }, detail: { zh: '2020.09 — 2024.06', en: 'Sep 2020 — Jun 2024' } },
  ],
  internship: {
    team: { zh: '小爱 Plus-IoT 控制组', en: 'XiaoAI Plus-IoT control team' },
    period: { zh: '2026.05 — 2026.08', en: 'May — Aug 2026' },
    title: { zh: '小米科技 · 算法实习生', en: 'Xiaomi · Algorithm Intern' },
    meta: { zh: '小爱 Plus-IoT 控制组 · 2026.05 — 2026.08', en: 'XiaoAI Plus-IoT control team · May — Aug 2026' },
    description: { zh: '参与模型自动迭代、全品类能力迁移与 Embedding 检索优化。', en: 'Worked on automated model iteration, capability migration and embedding retrieval.' },
  },
  bio: {
    zh: '厦门大学人工智能硕士在读（2024.09—2027.06），GPA 3.78/4.0；本科毕业于华中农业大学智慧农业专业。研究与实践聚焦大语言模型、智能体系统及检索增强。',
    en: "MSc student in Artificial Intelligence at Xiamen University (Sep 2024–Jun 2027), GPA 3.78/4.0, with a bachelor's degree in Smart Agriculture from Huazhong Agricultural University. My work focuses on language models, agent systems and retrieval augmentation.",
  },
  experience: { zh: '2026.05—2026.08，小米科技小爱 Plus-IoT 控制组算法实习生，参与模型自动迭代、全品类能力迁移和 Embedding 检索优化。', en: 'Algorithm intern in Xiaomi’s XiaoAI Plus-IoT control team, May–Aug 2026, working on automated model iteration, capability migration and embedding retrieval.' },
  roleTags: {
    zh: ['大模型算法', 'Agent 工程', '检索与评测'],
    en: ['LLM Algorithms', 'Agent Engineering', 'Retrieval & Eval'],
  },
  publication: {
    zh: '相关研究收录于 ICCSE 2025 会议论文集。',
    en: 'Related research appears in the ICCSE 2025 conference proceedings.',
  },
  githubLabel: { zh: 'GitHub', en: 'GitHub' },
  emailLabel: { zh: '邮箱', en: 'Email' },
  emailCta: { zh: '发邮件给我', en: 'Email me' },
};

export const cta = {
  viewWork: { zh: '查看项目', en: 'View projects' },
  github: { zh: 'GitHub', en: 'GitHub' },
  readCase: { zh: '阅读案例', en: 'Read the case' },
  source: { zh: '查看源码', en: 'View source' },
  backToTop: { zh: '回到顶部', en: 'Back to top' },
  backToWork: { zh: '返回项目列表', en: 'Back to projects' },
  nextCase: { zh: '下一个案例', en: 'Next case' },
};

/** Shared legal / safety copy. */
export const safety = {
  disclosure: {
    zh: '为保护业务与数据安全，项目细节已脱敏；示例与图示均为合成或公开许可材料。',
    en: 'To protect business and data security, project details have been sanitized; examples and visuals are synthetic or publicly approved.',
  },
  stampVerified: 'VERIFIED',
  stampSanitized: 'SANITIZED',
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
  /** Optional public source link. */
  source?: string;
  outcome?: Localized;
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
    outcome: { zh: '4 个可复用 Skills · IoT 每周人均交付量 0.9 → 1.3', en: '4 reusable Skills · Weekly IoT deliveries/person 0.9 → 1.3' },
    index: '01',
    domain: { zh: 'Agent 工作流', en: 'Agent Workflow' },
    title: {
      zh: 'IoT 模型自动迭代 Agent',
      en: 'Agent-driven IoT model iteration',
    },
    oneLiner: {
      zh: '将 IoT 模型修复中分散的诊断、数据构造、训练与部署串成可恢复的 Agent 工作流，以评测决定是否进入下一阶段。',
      en: 'A recoverable agent workflow connects IoT model diagnosis, data preparation, training and deployment. Evaluation gates determine when each iteration can advance.',
    },
    tags: { zh: ['Agent 编排', '模型迭代', '状态与记忆'], en: ['Agent Orchestration', 'Model Iteration', 'State & Memory'] },
    steps: {
      zh: ['诊断与策略', '样本构造与验证', '增量修复训练', '评测与基线对比', '质量决策', '全量重训与评测', '模型部署上线', '飞书结果报告'],
      en: ['Diagnosis', 'Sample validation', 'Incremental repair', 'Baseline comparison', 'Quality decision', 'Full retraining', 'Model deployment', 'Feishu report'],
    },
    motif: 'flow',
    diagram: 'workflow',
    memory: {
      shortTitle: { zh: '短期记忆', en: 'Short-term' },
      shortDesc: { zh: '版本级日志、评测与步骤状态 · 持久化', en: 'Versioned logs, evaluations and step state · persisted' },
      longTitle: { zh: '长期记忆', en: 'Long-term' },
      longDesc: { zh: '已验证事实 · 持久', en: 'Verified facts · persistent' },
      gate: { zh: '评测门控', en: 'Evaluation gate' },
      write: { zh: '写入', en: 'write' },
      expire: { zh: '过期移除', en: 'expire' },
    },
    detail: {
      problem: {
        zh: 'IoT 设备控制模型将自然语言与设备上下文转成结构化动作。修复错误和接入新品涉及分散的业务知识、数据处理与训练评测，需要保留迭代状态并复用历史经验。',
        en: 'IoT control models translate natural language and device context into structured actions. Fixes and new capabilities require scattered domain knowledge, data preparation, training and evaluation, with persistent progress and reusable experience.',
      },
      role: {
        zh: '团队定义了 AI 提效目标；核心架构与导师讨论确认；XiaoFan 主导方案落地并独立实现。他提出以子代理委派管理主代理上下文，以及短期 / 长期记忆机制。',
        en: 'The team defined the AI-efficiency objective; core architecture was discussed with a mentor; XiaoFan led the solution landing and independently implemented it. He proposed subagent delegation to manage primary-agent context and the short-/long-term memory mechanism.',
      },
      mechanism: {
        zh: '三类任务由主 Agent 选路、子 Agent 处理资料与样本。需要修复时，依次完成诊断、样本验证、增量训练和评测；质量决策达标后进入全量重训与评测，通过后部署上线并回传飞书报告。状态落盘支持恢复，经过验证且理解稳定的经验用于后续任务。',
        en: 'The primary agent routes three task types while subagents handle documents and samples. Repairs proceed through diagnosis, sample validation, incremental training and evaluation. A passing quality decision enables full retraining and evaluation; a passing full evaluation leads to deployment and a Feishu report. Persisted state supports recovery, and validated experience guides future tasks.',
      },
      validation: {
        zh: '核心能力封装为 4 个 Skills，接入 Multica 协作流程，推动 IoT 每周人均交付量由 0.9 提升至 1.3。评测同时检查修复效果与既有能力回归。',
        en: 'Four reusable Skills and Multica integration contributed to weekly IoT deliveries per person increasing from 0.9 to 1.3. Evaluation checks both repair quality and regressions.',
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
    outcome: { zh: 'Hybrid 严格 few-shot Hit@1 96.13% · 42,794 条候选', en: 'Hybrid strict few-shot Hit@1 96.13% · 42,794 candidates' },
    index: '02',
    domain: { zh: '领域检索', en: 'Domain Retrieval' },
    title: {
      zh: 'IoT 语义检索优化',
      en: 'IoT Semantic Retrieval',
    },
    oneLiner: {
      zh: '面向 IoT 功能点过滤与 few-shot 示例注入，用向量难负样本和意图感知 Hybrid 匹配，优化检索首位结果。',
      en: 'Vector-mined hard negatives and intent-aware Hybrid matching improve top-ranked retrieval for IoT function filtering and few-shot examples.',
    },
    tags: { zh: ['Embedding', '困难负样本', '评测闭环'], en: ['Embedding', 'Hard negatives', 'Eval loop'] },
    steps: {
      zh: ['比较负采样方案', '按意图定义样本', '双口径检索评测', '误差分析与选型'],
      en: ['Compare negative sampling', 'Intent-aware labels', 'Dual-protocol evaluation', 'Error analysis and selection'],
    },
    motif: 'bars',
    diagram: 'comparison',
    detail: {
      problem: embeddingCase.background.body,
      role: embeddingCase.role,
      mechanism: embeddingCase.strategy.body,
      validation: embeddingCase.results.interpretation,
      tradeoffs: embeddingCase.analysis.next,
      boundary: embeddingCase.results.limitation,
    },
  },
  {
    slug: 'evidence-grounded-learning-agent',
    outcome: { zh: '路由合约评测 119/119 · 端到端 p95 125.8 s → 5.9 s', en: 'Routing contracts 119/119 · End-to-end p95 125.8 s → 5.9 s' },
    index: '03',
    domain: { zh: '有状态教学系统', en: 'Stateful Learning System' },
    title: {
      zh: '数据科学课程教学 Agent',
      en: 'Data Science Teaching Agent',
    },
    oneLiner: {
      zh: '面向数据科学课程，将教材问答、学习画像和受控工具调用整合为可追溯、可持续对话的个性化助教。',
      en: 'A personalized data science course assistant connecting textbook-grounded answers, learner profiles and controlled tools across conversations.',
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
        zh: '独立设计并实现教学 Agent（2025.08—2026.08），覆盖教材 RAG、学习者记忆、工具治理、前后端集成与工程化评测。源码见公开仓库。',
        en: 'Independently designed and built the teaching agent (Aug 2025–Aug 2026), including textbook RAG, learner memory, tool governance, frontend/backend integration and evaluation. Source code is public.',
      },
      mechanism: {
        zh: '基于 LangGraph 编排意图路由、上下文构建、工具调用与回答生成，结合 FastAPI、Vue 3 和 SSE 提供交互。教材经结构化分块入库 ChromaDB，以 BM25、向量检索和 RRF 融合召回；事件驱动的 StudentProfile 聚合学习信号，结合画像感知 Query Rewrite 构建教学上下文。工具白名单和受限 Python 沙箱约束执行，Embedding 超时则回退 BM25。',
        en: 'LangGraph orchestrates intent routing, context construction, tool calls and response generation, with FastAPI, Vue 3 and SSE for interaction. Structured textbook chunks are stored in ChromaDB and retrieved using BM25, vectors and RRF fusion. An event-driven StudentProfile aggregates learning signals for profile-aware query rewriting. Tool allowlists and a restricted Python sandbox constrain execution; embedding timeouts fall back to BM25.',
      },
      validation: {
        zh: '处理 248 页教材，构建 566 个有效语义切片，页面覆盖率 99.6%。离线路由合约评测 119/119 通过；通过类型化 QueryPipeline、惰性上下文富化及超时降级，端到端 p95 延迟从 125.8 秒降至 5.9 秒。',
        en: 'Processed 248 textbook pages into 566 semantic chunks with 99.6% page coverage. Offline routing contract evaluation passed 119/119 cases. Typed QueryPipeline, lazy context enrichment and timeout fallback reduced end-to-end p95 latency from 125.8 to 5.9 seconds.',
      },
      tradeoffs: {
        zh: '证据约束提高了可信度，代价是回答灵活性下降；状态跟踪带来个性化，也增加了上下文与复杂度。',
        en: 'Evidence constraints improve trustworthiness at the cost of answer flexibility; state tracking enables personalization but adds context and complexity.',
      },
      boundary: {
        zh: '系统设计与源码见公开仓库；相关研究收录于 ICCSE 2025 会议论文集。',
        en: 'System design and source code are available in the public repository. Related research appears in the ICCSE 2025 conference proceedings.',
      },
    },
  },
];

/** Detail-page "sanitized material" disclosure box. */
export const sanitizedNote = {
  zh: '成果数据来自简历与项目记录；流程图用于解释系统机制，业务样本与内部实现细节已脱敏。',
  en: 'Results come from the resume and project records. Diagrams explain system mechanisms; business samples and internal implementation details are sanitized.',
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
    axis: { zh: '查询类 Hit@1', en: 'Query-category Hit@1' },
    baseline: { zh: '基线', en: 'Baseline' },
    tuned: { zh: '任务感知微调', en: 'Task-aware fine-tune' },
    note: {
      zh: '严格 few-shot 评测口径',
      en: 'Strict few-shot evaluation protocol',
    },
  },
  loop: {
    center: { zh: '有状态闭环', en: 'Stateful loop' },
    sub: { zh: '证据门控 · 回写状态', en: 'Evidence-gated · state written back' },
  },
  ledger: {
    title: { zh: '证据台账', en: 'Evidence Ledger' },
    stamp: { zh: '评测记录', en: 'Evaluation record' },
  },
} as const;
