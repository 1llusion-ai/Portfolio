# Embedding 项目内容依据

- [IoT Embedding 模型微调评测报告](https://qcnqpruzxjzr.feishu.cn/docx/FcmgdpvrSoGXu1xjHVgc0mEendd)：读取版本 6。
- [肖凡交接文档](https://qcnqpruzxjzr.feishu.cn/docx/XBACdm2KLoEczXxbj7bcEKkwnxd)：读取版本 7，仅采用 Embedding 相关信息。
- 个人职责结合用户提供的简历。内部仓库地址、部署入口和业务标识未复制到页面。

## 口径

1. 最新正样本策略实验：41,466 行训练数据；42,794 条候选及全量自检索请求。功能点口径可评分 42,100 条，严格 few-shot 可评分 41,443 条。
2. pkey / function / Hybrid 的功能点 Hit@1 分别为 96.097 / 96.760 / 96.599%；严格 Hit@1 分别为 64.708 / 65.073 / 96.130%。
3. 历史 V2：39,292 条候选、600 条有效评测（查询类 177 条）。查询类 53.67% → 84.18% 属于该历史实验，不能标注为最新严格 few-shot 结果。
4. 第一阶段负采样方案同时存在负样本数量与回填方式差异，不描述为仅改变检索算法的单变量实验。
5. 全量自检索屏蔽源文档与精确文本，不代表已完成独立未见业务测试。
6. 交接时模型部署列为后续工作，不写作已上线。

文案：src/data/embeddingCase.ts；图表复用同文件的 embeddingScores；页面：src/components/EmbeddingCaseBody.astro。
