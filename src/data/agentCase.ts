// Project 01 copy, based on the project overview, operating guide, memory design and handover.
export const agentCase = {
  roleLabel: { zh: '我的职责', en: 'My role' },
  role: {
    zh: '团队提出 AI 提效目标，核心架构与导师讨论确认；我主导方案落地并独立实现，提出通过子代理委派控制主上下文，并设计短期状态与长期经验的记忆机制。',
    en: 'The team set the efficiency objective, and I discussed the core architecture with my mentor. I led implementation, proposed subagent delegation to manage the primary context, and designed the separation of task state and reusable experience.',
  },
  background: {
    title: { zh: '背景与挑战', en: 'Context and challenges' },
    body: {
      zh: 'IoT 设备控制模型需要把用户指令和家庭设备上下文转换成结构化动作。例如，“把客厅灯调暗一点”不仅要识别设备，还要选对属性与取值。遇到线上错误或新功能时，迭代涉及查规则、定位问题、构造数据、训练和评测，多个环节需要反复衔接。',
      en: 'An IoT control model translates a user request and household device context into structured actions. “Dim the living-room light” requires the correct device, property and value. Fixing errors or adding capabilities involves consulting specifications, diagnosing failures, preparing data, training and evaluation.',
    },
    points: [
      { zh: '流程衔接：跨环节传递数据和结果，容易丢失进度与诊断依据。', en: 'Coordination: data and results move across stages, making progress and diagnostic evidence difficult to retain.' },
      { zh: '知识分散：设备规范、产品规则和历史数据需要按问题组合读取。', en: 'Scattered knowledge: device specifications, product rules and historical data must be consulted for each problem.' },
      { zh: '经验复用：单次修复结论需要经过验证和提炼，才能帮助后续任务。', en: 'Experience reuse: a local fix needs validation and abstraction before it can guide future tasks.' },
    ],
  },
  workflow: {
    title: { zh: '系统如何完成一次迭代', en: 'How an iteration works' },
    body: {
      zh: '系统以 Claude Code 为决策中枢，接收线上错误案例、批量评测数据和新品接入任务。主 Agent 负责选路与关键判断，子 Agent 处理资料、分析和样本任务；受控脚本连接既有数据流水线与训练平台，执行校验、版本管理、训练提交和结果回收。全量重训与评测通过后，由模型部署 Skill 完成自动部署，并通过飞书报告返回结果。',
      en: 'Claude Code coordinates three entry routes: production errors, batch evaluation and new device capabilities. The primary agent selects the route and makes key decisions; subagents handle documents, analysis and samples. Controlled scripts connect the data pipeline and training platform. After full retraining and evaluation pass, a deployment Skill deploys the model automatically and results are returned through Feishu reports.',
    },
    routes: [
      { zh: '线上修复：诊断错误、构造并验证样本，进入增量训练与评测。', en: 'Production fixes: diagnose the error, prepare and validate samples, then run incremental training and evaluation.' },
      { zh: '批量评测：先建立基线。仅评测时生成报告后结束；有改进目标时，根据失败项构造训练数据。', en: 'Batch evaluation: establish a baseline. Evaluation-only tasks end with a report; improvement tasks use the failures to prepare training data.' },
      { zh: '新品接入：从产品需求文档（PRD）和验证用例（BVT）提取规格约束，保存完整规格和样本，完成完整基线与逐条归因。数据或评测错误先修正重评，只有模型错误进入训练。', en: 'New capabilities: extract specification constraints from product requirements (PRD) and validation cases (BVT), archive full specifications and samples, then evaluate the complete baseline and diagnose each failure. Correct data or evaluation errors first; only model errors enter training.' },
    ],
    delivery: { zh: '交付时，核心流程已封装为团队协作平台中的 IoT-Skill-Loop 智能体，统一承接三类任务，以自然语言描述和相关资料发起执行，并通过飞书报告返回结果。', en: 'At handover, the core workflow had been packaged as an IoT-Skill-Loop agent in the team collaboration platform. It accepts all three task types through natural-language requests and supporting materials, and returns results through Feishu reports.' },
    alt: { zh: 'IoT 模型迭代流程：三类输入经 Agent 协调，进入诊断、样本校验、增量训练、评测与质量决策，达标后全量重训、评测与模型自动部署；失败返回诊断，状态和经验贯穿全程。', en: 'IoT iteration workflow: three input routes, agent coordination, diagnosis, sample validation, incremental training, evaluation, quality decisions, full retraining and automated model deployment, supported by persistent state and reusable experience.' },
  },
  designTitle: { zh: '三个关键设计', en: 'Three key design decisions' },
  designs: [
    {
      title: { zh: '把主上下文留给决策', en: 'Reserve the primary context for decisions' },
      body: { zh: '文档读取、数据比对和样本构造容易产生大量中间信息。我将这些任务委派给子 Agent，只回传结论与产物；主 Agent 保留选路、执行监控、评测后的推进判断和记忆写入，降低长流程中的上下文负担。', en: 'Document reading, data comparison and sample preparation produce substantial intermediate context. I delegate these tasks to subagents that return conclusions and artifacts. The primary agent retains route selection, execution monitoring, post-evaluation decisions and memory updates.' },
    },
    {
      title: { zh: '校验与断点恢复', en: 'Validation and recovery' },
      body: { zh: 'CSV 源数据经校验转换为 JSONL，保留溯源和重建能力。训练前校验数据一致性，评测后结合修复效果与能力回归决定下一步。任务中断时读取已保存的 execution 继续执行；未达标则带着失败原因进入下一轮。', en: 'CSV remains the source of truth and is validated and converted into JSONL by a shared pipeline, allowing samples to be traced, regenerated and merged into the base dataset. Consistency checks gate training, and repair quality and regressions determine the evaluation decision. Queued or interrupted jobs resume through saved execution records rather than being resubmitted. Failed attempts retain their diagnosis and next strategy.' },
    },
    {
      title: { zh: '分层管理规则、状态与经验', en: 'Separate rules, state and experience' },
      body: { zh: '业务规则由人维护，说明什么是正确的；短期记忆按版本保存日志、评测和步骤状态，说明本轮进行到哪里；长期记忆只保存跨任务可复用的经验。会话先加载精简索引，命中后按需读取正文。经验在评测通过且最后一次纠正后的理解稳定时写入，避免把未经验证的判断带入下一轮。', en: 'Human-maintained rules define correctness. Versioned short-term memory stores logs, evaluations and step state. Long-term memory holds reusable experience across tasks. Sessions load a compact index and read details on demand. Experience is saved only after evaluation passes and the understanding is stable after the last correction.' },
    },
  ],
  validation: {
    title: { zh: '交付成果与验证', en: 'Results and validation' },
    body: { zh: '验证同时关注“当前问题是否解决”和“原有能力是否受损”。增量修复先提供快速反馈，质量决策通过后，再合并修复数据与基座数据进行全量重训和评测。', en: 'Evaluation asks both whether the current problem is fixed and whether existing capabilities regress. Incremental repair provides early feedback. Only after the quality decision passes are the repair and base datasets merged for full retraining and evaluation.' },
    points: [
      { zh: '修复效果：检查当前错误案例；批量改进与基线对比，新品接入检查基线失败集的修复情况。', en: 'Repair quality: check targeted errors, compare batch improvements with the baseline and verify baseline failures for new capabilities.' },
      { zh: '能力回归：同时检查重点指标；新品接入保留完整验证集，避免只看修复子集。', en: 'Regression: check key metrics alongside repair quality; retain the complete validation set for new capabilities.' },
      { zh: '过程追溯：关联数据版本、训练 execution、评测产物与每轮诊断，保留重试和恢复依据。', en: 'Traceability: link data versions, training executions, evaluation artifacts and diagnoses for each attempt.' },
    ],
    operational: { zh: '交接时流程仍在持续加固，进入训练与评测前保留对生成数据的人工检查，尤其核对新品规格选择和“暂不支持”等需求约束。Agent 反复遗漏的步骤，逐步固化为脚本并加入校验。', en: 'At handover, the workflow still needed hardening. Generated data was recommended for human inspection before training and evaluation, especially specification choices and unsupported features in new-device requirements. Steps repeatedly missed by the agent are candidates for deterministic scripts with explicit checks.' },
    results: [
      { value: '91.62% → 93.21%', label: { zh: '迁移模型准确率', en: 'Migration model accuracy' }, context: { zh: '全品类迁移工作：覆盖 49 个长尾品类、113 个新增功能点。', en: 'Broader migration effort: 49 long-tail categories and 113 new function points.' } },
      { value: '487 → 776', label: { zh: '迁移数据集规模', en: 'Migration dataset size' }, context: { zh: '通过日志挖掘、失败项分析与训练数据生成扩充数据集。', en: 'Expanded through log mining, failure analysis and training data generation.' } },
      { value: '4', label: { zh: '可复用 Skills', en: 'Reusable Skills' }, context: { zh: '覆盖诊断与数据生成、飞书协作、RAG 更新和模型部署。', en: 'Diagnosis and data generation, Feishu collaboration, RAG updates and model deployment.' } },
      { value: '0.9 → 1.3', label: { zh: 'IoT 每周人均交付量', en: 'Weekly IoT deliveries per person' }, context: { zh: '封装为 Multica 智能体，串联产品、研发、测试的 Agent 协作，推动团队交付效率提升。', en: 'Packaged in Multica to connect product, engineering and testing agents and contribute to team delivery gains.' } },
    ],
    migration: { zh: '在接入该闭环的全品类迁移工作中，参与完成 49 个长尾品类、113 个新增功能点的迁移，数据集从 487 扩充至 776，模型准确率从 91.62% 提升至 93.21%。系统同时支撑洗衣机、电饭煲等品类的新功能上线与线上错误修复。', en: 'In the broader migration effort using this loop, I contributed to migrating 49 long-tail categories and 113 new function points. The dataset grew from 487 to 776, and model accuracy rose from 91.62% to 93.21%. The system also supported feature releases and production fixes for categories including washing machines and rice cookers.' },
  },
  tradeoffs: {
    title: { zh: '工程取舍与后续方向', en: 'Trade-offs and next steps' },
    body: { zh: '文件化状态便于单机恢复和版本追溯。训练与评测保持串行，避免共享中间路径造成覆盖；扩展并发前需要先消除这类依赖。增量训练提供快速反馈，全量重训验证整体效果。', en: 'File-based state suits the current single-machine workflow and version tracking. Training and evaluation run serially because some nodes share intermediate paths and overwrite files, creating a risk of data collisions. Those dependencies must be removed before enabling concurrency. Incremental repair provides fast feedback, full retraining adds validation, and long-term lessons are saved only after evaluation passes and understanding stabilizes.' },
    next: { zh: '后续工作聚焦 RAG 功能点索引适配、新品接入多轮任务的触发稳定性、业务规则覆盖，以及记忆读取时机与上下文注入方式。同时规范日志路径，并在保留溯源能力的前提下精简中间产物。', en: 'Follow-up work focuses on adapting the RAG function-point index, reliable triggering of multi-turn tasks for new capabilities, broader business-rule coverage, and better timing and context injection for memory retrieval. Log paths and intermediate artifacts also need streamlining while preserving traceability.' },
  },
} satisfies Record<string, unknown>;
