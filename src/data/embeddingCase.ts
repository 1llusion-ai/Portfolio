// Based on the supplied evaluation report (revision 6), handover (revision 7)
// and resume. Historical V2 and full self-retrieval are separate experiments.
import type { Localized } from './site';

export const embeddingCase = {
  role: {
    zh: '在 IoT 检索优化目标下，我设计并实现训练样本构造、向量难负样本与意图感知 Hybrid 方案，完成微调实验、分口径评测和失败案例分析。',
    en: 'I designed and implemented training-data construction, vector-mined hard negatives and intent-aware Hybrid matching, then ran fine-tuning experiments, task-specific evaluation and failure analysis for IoT retrieval.',
  },
  status: { zh: '已完成离线实验与方案选型 · 交接时部署待推进', en: 'Offline experiments and strategy selection complete · Deployment pending at handover' },
  background: {
    title: { zh: '业务背景', en: 'Context' },
    body: { zh: 'IoT 语音控制的 RAG 链路先检索相关功能点，缩小大模型的决策范围，再注入相似历史示例，帮助模型理解输出格式和规则。通用 BGE 对新功能表达与长尾指令泛化不足，容易把相似但功能不同的候选排在前面；一旦正确功能被过滤，后续模型就失去了必要的上下文。', en: 'The IoT voice-control RAG pipeline retrieves relevant device functions to narrow the LLM’s decision space, then injects historical examples to explain output formats and rules. Generic BGE struggles with new feature phrasing and long-tail requests, sometimes ranking similar but functionally incorrect candidates first. Filtering out the correct function removes essential context from the downstream model.' },
    tasks: [
      { title: { zh: '功能点过滤', en: 'Function filtering' }, body: { zh: '找到相关的设备功能即可，不强制示例与请求具有相同意图。重点是控制候选范围和 Prompt 长度。', en: 'Retrieve the relevant device function without requiring the same intent. This reduces the candidate space and prompt length.' } },
      { title: { zh: 'Few-shot 示例注入', en: 'Few-shot example retrieval' }, body: { zh: '候选必须匹配查询或操作意图；操作还要匹配具体值。“问状态”和“改状态”需要不同的示例。', en: 'Match the query or operation intent; operations must also match the exact value. Asking about state and changing state require different examples.' } },
    ],
  },
  strategy: {
    title: { zh: '训练方案', en: 'Training strategy' },
    body: { zh: '先比较向量检索与 BM25 负采样，再固定向量挖掘，比较 pkey、function 和 Hybrid 三种标签策略。这里的“粒度”指功能点与具体值：function 标识功能点，pkey 在同一功能点下进一步区分取值。', en: 'I first compared vector mining with BM25 negative sampling, then fixed vector mining to compare pkey, function and Hybrid label policies. Granularity means device functions versus exact values: function identifies the capability, while pkey distinguishes values within it.' },
    negative: { zh: '保持查询与正样本一致，对比向量挖掘和 BM25 负采样。向量方案更擅长区分语义相似但功能不同的候选，在历史 V2 中达到 91.17% Full Hit@1，高于 BM25 的 87.67%，因此用于后续实验。', en: 'With queries and positives held fixed, I compared vector mining with BM25 sampling. Vector negatives help separate semantically similar but functionally different candidates. They achieved 91.17% Full Hit@1 in historical V2 versus 87.67% for BM25 and were selected for the next stage.' },
    positive: { zh: '第二阶段使用相同的 41,466 行训练数据与超参数，通过标签策略决定哪些候选是正样本、中性样本或难负样本。Hybrid 按意图区分匹配标准，避免把问状态的示例当成操作请求的正样本，也避免将所有同功能点的不同值混为一类。', en: 'The second stage used the same 41,466 training rows and hyperparameters. Label policies determine positives, neutral candidates and hard negatives. Hybrid separates matching criteria by intent, preventing state questions from becoming operation positives and preserving distinctions between values within the same function.' },
    diagramTitle: { zh: 'Hybrid 如何定义训练信号', en: 'How Hybrid defines the training signal' },
    branches: [
      { title: { zh: '查询状态 → 功能点匹配', en: 'State query → Match the function' }, example: { zh: '“空调现在多少度？”', en: '“What is the AC temperature?”' }, positive: { zh: '正样本：同功能点、同为查询，可跨值。', en: 'Positive: same function and query intent, across values.' }, neutral: { zh: '中性：同功能点的操作示例，排除出负采样。', en: 'Neutral: operation examples of the same function; excluded from negative mining.' }, negative: { zh: '负样本：不同功能点。', en: 'Negative: a different function.' } },
      { title: { zh: '执行操作 → 精确值匹配', en: 'Operation → Match the exact value' }, example: { zh: '“把空调调到 26 度。”', en: '“Set the AC to 26 degrees.”' }, positive: { zh: '正样本：同 pkey、同为操作，匹配具体值。', en: 'Positive: same pkey and operation intent, matching the value.' }, neutral: { zh: '中性：同功能点的查询示例，排除出负采样。', en: 'Neutral: state queries of the same function; excluded from negative mining.' }, negative: { zh: '难负样本：同功能点、不同值的操作，如调到 28 度。', en: 'Hard negative: same function but a different operation value, such as 28 degrees.' } },
    ],
    mining: { zh: '向量挖掘从 Top-100 近邻中选取难负样本，目标为每行 12 个，并限制单一负功能点的占比。Hybrid 排除了 39,846 个中性候选，同时选中 60,603 个同功能点、不同值的操作难负样本。', en: 'Vector mining selects hard negatives from the top 100 neighbors, targeting 12 per row while limiting concentration in any one negative function. Hybrid excluded 39,846 neutral candidates and selected 60,603 same-function, different-value operation hard negatives.' },
  },
  evaluation: {
    title: { zh: '评测设计', en: 'Evaluation design' },
    body: { zh: '同一检索排序分别按两套标准计分：功能点过滤只看 function；严格 few-shot 要求意图一致，查询按 function、操作按 pkey。各口径独立投射去重，避免用宽松的功能点命中率代替示例注入质量。', en: 'Each ranking is scored under two protocols: function filtering checks function identity, while strict few-shot requires matching intent and uses function for queries and pkey for operations. Rankings are projected and deduplicated independently for each protocol, so broad function matches cannot stand in for example-retrieval quality.' },
    checks: [
      { zh: '候选库 42,794 条；三个模型共用相同候选库与全量评测文件，文件指纹一致。', en: 'All three models use the same 42,794-candidate corpus and full evaluation files, verified by matching fingerprints.' },
      { zh: '全量自检索逐条屏蔽源文档与精确文本匹配；功能点口径可评分 42,100 条，严格口径可评分 41,443 条。', en: 'Full self-retrieval masks source documents and exact text matches. There are 42,100 scorable function-filter records and 41,443 scorable strict records.' },
      { zh: '同时检查 Hit@K、MRR、NDCG、Recall 与 Precision；区分排序错误、标签欠约束和候选缺失。', en: 'Hit@K, MRR, NDCG, Recall and Precision distinguish ranking errors from underspecified labels and missing candidates.' },
    ],
  },
  results: {
    title: { zh: '实验结果与方案选择', en: 'Results and strategy selection' },
    body: { zh: '三个模型的功能点过滤 Hit@1 均在 96% 左右，但严格 few-shot 差距明显。Hybrid 保留功能点检索能力，同时将意图与取值约束带入首位排序，因此被选为统一检索方案。', en: 'All three models achieve roughly 96% function-filter Hit@1, but differ sharply under strict few-shot scoring. Hybrid preserves function retrieval while incorporating intent and value constraints into the top-ranked result, making it the selected unified strategy.' },
    caption: { zh: '最新全量自检索实验 · 三种正样本策略 · Hit@1（%）', en: 'Latest full self-retrieval experiment · Three positive-label strategies · Hit@1 (%)' },
    interpretation: { zh: 'Hybrid 的严格 Hit@1 为 96.130%，比 pkey 高 31.422 个百分点；function 的功能点 Hit@1 最高（96.760%），但严格 Hit@1 仅 65.073%。这说明“找对功能点”不足以保证“选对注入示例”。', en: 'Hybrid achieves 96.130% strict Hit@1, 31.422 percentage points above pkey. Function leads function-filter Hit@1 at 96.760%, but reaches only 65.073% strict Hit@1. Finding the right function does not guarantee selecting the right example.' },
    historicalTitle: { zh: '历史 V2：负样本方案对比', en: 'Historical V2: Negative-sampling comparison' },
    historicalScope: { zh: '39,292 条候选，600 条评测，其中查询类 177 条。向量 / BM25 每行负样本数为 12 / 10，BM25 含回填样本；本轮独立于上方全量实验。', en: '39,292 candidates and 600 evaluation records, including 177 state queries. Vector / BM25 use 12 / 10 negatives per row; BM25 includes fallback samples. This experiment is separate from full self-retrieval above.' },
    historicalHeaders: [{ zh: '负样本方案', en: 'Configuration' }, { zh: 'Full Hit@1', en: 'Full Hit@1' }, { zh: '查询类 Hit@1', en: 'Query Hit@1' }],
    limitation: { zh: '离线检索结果；全量自检索屏蔽自身匹配，业务泛化与上线效果仍需单独验证。', en: 'Offline retrieval results. Self-matches are masked; business generalization and production impact require separate validation.' },
  },
  analysis: {
    title: { zh: '失败案例与后续工作', en: 'Failure analysis and next steps' },
    points: [
      { title: { zh: '查询标签的歧义', en: 'Ambiguous query labels' }, body: { zh: '“当前什么模式”没有给出具体值，若 gold 只认某个模式，就会把同功能点的合理召回判错。这类问题说明查询应按功能点评分，而非一律要求精确值匹配。', en: '“What mode is it in?” specifies no value. A gold label that accepts only one mode can reject a reasonable same-function result. This motivates function-level scoring for state queries rather than requiring an exact value for every request.' } },
      { title: { zh: '设备上下文的影响', en: 'The role of device context' }, body: { zh: '历史 V2 中，加湿器相关问题经功能点过滤后，两种微调方案的 Hit@1 均达 100%，但 Full 检索仍较差。说明部分问题来自设备上下文或候选范围，不能仅靠继续微调解决。', en: 'In historical V2, both fine-tuned configurations reached 100% Hit@1 on humidifier cases after function filtering, despite poor full-corpus retrieval. Some failures depend on device context or candidate scope and cannot be addressed through fine-tuning alone.' } },

    ],
    next: { zh: '最终选择向量难负样本 + Hybrid。交接时已完成离线实验，后续推进数据清洗、调参和 CloudML 部署，并通过业务评测与线上回放验证效果。', en: 'At handover, vector-mined hard negatives plus Hybrid had been selected. Remaining work included training-data cleaning, hyperparameter tuning and CloudML deployment. Production impact still requires business evaluation and replay after deployment.' },
  },
};

export const embeddingScores = [
  { name: 'pkey', functionHit: 96.097, strictHit: 64.708 },
  { name: 'function', functionHit: 96.760, strictHit: 65.073 },
  { name: 'Hybrid', functionHit: 96.599, strictHit: 96.130 },
];
export const historicalScores: { name: Localized; full: string; query: string }[] = [
  { name: { zh: '未微调基线', en: 'Untuned baseline' }, full: '77.67%', query: '53.67%' },
  { name: { zh: '向量难负样本', en: 'Vector hard negatives' }, full: '91.17%', query: '84.18%' },
  { name: { zh: 'BM25 负采样', en: 'BM25 negatives' }, full: '87.67%', query: '75.71%' },
];
