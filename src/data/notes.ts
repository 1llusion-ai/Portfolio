import type { Localized } from './site';
export interface EngineeringNote { slug: string; index: string; domain: Localized; title: Localized; oneLiner: Localized; sections: { title: Localized; body: Localized }[] }
export const notes: EngineeringNote[] = [
  {
    "slug": "reliable-model-artifact-delivery",
    "index": "01",
    "domain": {
      "zh": "模型交付",
      "en": "Model delivery"
    },
    "title": {
      "zh": "FP8 模型为什么突然多了 1 GB？",
      "en": "Why an FP8 export grew by 1 GB"
    },
    "oneLiner": {
      "zh": "两条训练流程使用相同的基础模型和量化脚本，导出文件却差了约 1 GB。这次排查的关键，是把“为什么分片”和“为什么变大”分开看。",
      "en": "The same parameter count and quantization script produced 4.11G versus 5.2G exports. Investigating sharding revealed duplicated tied weights."
    },
    "sections": [
      {
        "title": {
          "zh": "先看到的是两个文件，而不是一个",
          "en": "Symptom"
        },
        "body": {
          "zh": "问题出在模型导出环节：一条流程生成一个 4.11G 的文件，另一条生成两个分片，合计 5.2G。两份产物都能部署，差异集中在保存结果上。\n既然基础模型和 FP8 量化脚本相同，就需要解释两个问题：为什么文件被拆开，以及多出的数据来自哪里。",
          "en": "Two training workflows used the same base model and FP8 export script. One produced a single 4.11G file; the other produced two shards totaling 5.2G. Both deployed, but their artifact sizes differed."
        }
      },
      {
        "title": {
          "zh": "分片阈值只解释了文件数量",
          "en": "Separate sharding from excess size"
        },
        "body": {
          "zh": "保存调用没有显式设置 max_shard_size。在当时的环境里，产物超过默认 5GB 阈值就会分片，因此 5.2G 被拆成两个文件并不意外。\n把阈值调高可以合并文件，却不会让数据变少。排查接下来转向 checkpoint 本身：两条流程到底保存了哪些权重？",
          "en": "The original save call omitted max_shard_size, so exports exceeding the environment’s 5GB default were sharded. Raising that threshold changes file count, not excess data. The investigation therefore compared checkpoint keys and tensor relationships."
        }
      },
      {
        "title": {
          "zh": "同一份数值，被保存了两次",
          "en": "Root cause: equal values, separate storage"
        },
        "body": {
          "zh": "异常产物同时包含 embed_tokens.weight 和 lm_head.weight。用 torch.equal 比较后，两者数值完全相同，但实际是两个独立张量。\n另一条流程省略了冗余的 lm_head.weight，加载时根据 tie_word_embeddings 配置恢复权重绑定。差别由此明确：配置里声明共享权重，并不代表导出文件已经去掉了重复数据。",
          "en": "The affected checkpoint contained both embed_tokens.weight and lm_head.weight. torch.equal confirmed identical values, but they were separate tensors. The other workflow omitted the redundant lm_head.weight and restored the tie at load time. Declaring tied weights in configuration did not by itself remove duplication in this export path."
        }
      },
      {
        "title": {
          "zh": "去重之前，先把条件写清楚",
          "en": "Fix: verify before deduplication"
        },
        "body": {
          "zh": "修复分成两步：保存时显式设置 max_shard_size=\"10GB\"，控制分片；随后检查产物，在满足条件时去掉冗余权重。\n删除 lm_head.weight 必须同时满足三个条件：tie_word_embeddings 为真、两个权重键都存在、torch.equal 确认数值完全一致。任何一个条件不满足，都保留原权重，避免把以后训练得到的独立输出层误删。",
          "en": "Export with max_shard_size=\"10GB\", then post-process the artifact. Remove lm_head.weight only when tied embeddings are configured, both keys exist and their values are exactly equal. Preserve weights when values differ or keys are absent, protecting against future training changes."
        }
      },
      {
        "title": {
          "zh": "结果，以及以后要检查的地方",
          "en": "Validation and takeaway"
        },
        "body": {
          "zh": "处理后，产物由两个分片变成一个 model.safetensors，体积从 5.2G 回到 4.11G，推理正常。这里验证的是文件体积和推理可用性，没有进一步的数值精度对比。\n这次值得记住的是三个层次：配置如何声明共享、张量实际上是否共享存储、最终文件保存了什么。遇到产物体积异常，不能只检查其中一层。",
          "en": "The record reports a single model.safetensors file, size reduced from 5.2G to 4.11G, and normal inference after the fix. It provides no separate numerical-accuracy report, so this is not a claim of measured numerical equivalence. Artifact debugging requires checking configuration semantics, tensor sharing and serialized content."
        }
      }
    ]
  },
  {
    "slug": "action-input-phantom-default",
    "index": "02",
    "domain": {
      "zh": "数据流水线",
      "en": "Data pipeline"
    },
    "title": {
      "zh": "标签是对的，错误默认值是从哪里来的？",
      "en": "Correct labels, misleading defaults in the prompt"
    },
    "oneLiner": {
      "zh": "新品数据里的烹饪模式标注正确，模型输入却多出了 Quick Cook。沿着上下文生成过程追下去，才发现标签和输入走了不同的数据路径。",
      "en": "Automatic action-parameter completion polluted the device context through a side path. A route-specific fix preserved legacy behavior."
    },
    "sections": [
      {
        "title": {
          "zh": "同一条样本里，输入与标签对不上",
          "en": "Symptom"
        },
        "body": {
          "zh": "电饭煲新品数据中，标签已经给出了实际烹饪模式，但输入上下文的“开始烹饪”动作仍带着固定的 Quick Cook 默认值。25 条单轮记录中有 21 条受影响，另有 1 条多轮记录命中。\n这意味着只检查标签还不够：监督目标没有被改错，错误信息却已经进入模型要阅读的设备上下文。",
          "en": "Labels specified the intended cooking mode, but the start-cooking action in the input context carried a fixed Quick Cook default. It appeared in 21 of 25 single-turn records and the sole multi-turn record. Labels were intact; the model input was polluted."
        }
      },
      {
        "title": {
          "zh": "默认值绕过了标签，进入渲染映射",
          "en": "Trace the default through rendering"
        },
        "body": {
          "zh": "调用方没有传入 should_check_action_input_param，Step B 因而使用默认值 true，并根据动作入参定义生成默认烹饪模式。\n标签已有实际模式，所以默认值没有被追加到标签里。但它仍然写入 did_to_action_in_params，随后经过 ActionParam 对象构造和 YAML 序列化，出现在设备上下文中。\n问题就藏在这里：不修改标签，并不等于不影响输入。",
          "en": "The caller omitted should_check_action_input_param, leaving Step B’s default true. It generated a default mode from action-input definitions. An explicit mode in the label prevented insertion there, but the generated value still entered did_to_action_in_params. ActionParam construction and YAML serialization then exposed it in the device context."
        }
      },
      {
        "title": {
          "zh": "修复应该落在哪一层？",
          "en": "Why changing the spec or template was insufficient"
        },
        "body": {
          "zh": "修改规格或模板都没有对准这条路径：移除动作会导致规格校验失败；修改属性当前值影响不到渲染映射；到了模板填充阶段，参数段已经构造好了。\n直接删除上游默认值配置也不合适，其他数据路线仍依赖自动补参。因此这次先在调用层区分新品接入与历史流程。",
          "en": "Removing the action fails specification validation. Changing the property’s current value does not control the side-path object, and replacing the template is too late because the parameter section already exists. Removing the upstream default configuration could disrupt other routes."
        }
      },
      {
        "title": {
          "zh": "让新品接入显式关闭自动补参",
          "en": "Fix: make the route policy explicit"
        },
        "body": {
          "zh": "传入 access_spec 的新品接入路线，显式设置 should_check_action_input_param=false；普通修复和批量评测路线显式保持 true。\n这个改动有一个前提：新品标签本身已经包含完整动作输入。关闭的是自动检查和补参，标签里明确给出的烹饪模式、开始动作仍然保留。",
          "en": "Set should_check_action_input_param=false when access_spec identifies new-device access; explicitly retain true for ordinary repair and batch-evaluation routes. The switch disables automatic checking and completion without deleting explicit mode or start-action labels. New-device labels must already supply complete action inputs."
        }
      },
      {
        "title": {
          "zh": "测试通过后，还要看最终样本",
          "en": "Validation scope"
        },
        "body": {
          "zh": "当时有 28 项测试通过，覆盖调用分支、样本清单、RAG 产物与接入预检，语法和差异检查也通过。重新生成单轮、多轮 enriched 和 JSONL，确认默认值消失且标签不变，仍是待完成的上线后检查。\n长期看，更精确的修复应落在渲染映射写入处：只有真正补上缺失参数时才写入。此次排查也留下一个固定检查点——数据处理改动后，要同时对照标签与最终模型输入。",
          "en": "The document reports 28 passing tests covering route arguments, manifests, RAG artifacts and access preflight, plus syntax and diff checks. Regenerating single- and multi-turn enriched/JSONL outputs and confirming unchanged labels remained on the post-release checklist. A narrower upstream fix would populate the rendering map only when a missing parameter is actually added."
        }
      }
    ]
  },
  {
    "slug": "stale-local-index-offline-evaluation",
    "index": "03",
    "domain": {
      "zh": "评测与数据依赖",
      "en": "Evaluation dependencies"
    },
    "title": {
      "zh": "训练没改善，先看看模型到底读到了什么",
      "en": "Still failing after training: a stale offline index"
    },
    "oneLiner": {
      "zh": "新增模式后，七条炖煮请求一直失败。问题最终落在离线评测使用的本地检索文件：规格更新了，派生索引却还停在旧版本。",
      "en": "All seven stewing cases failed. Inspecting actual model inputs revealed that updated specifications had not reached the local retrieval file."
    },
    "sections": [
      {
        "title": {
          "zh": "训练前后，失败的还是同一批样本",
          "en": "Symptom"
        },
        "body": {
          "zh": "新增烹饪模式后，基线评测通过 19/26 条，fix_acc 为 73.08%。修复训练后仍是 73.08%，七条炖煮请求全部失败。\n失败分布没有变化，因此排查转向另一个问题：评测时，模型实际拿到了哪些设备能力描述？",
          "en": "After adding cooking modes, the baseline passed 19/26 cases (73.08%). Repair training left the score unchanged, with all seven stewing requests failing. The unchanged failure pattern prompted investigation of evaluation-input construction."
        }
      },
      {
        "title": {
          "zh": "先确认这次评测用的是哪条检索链路",
          "en": "Correct the initial hypothesis"
        },
        "body": {
          "zh": "起初怀疑线上 RAG 缺少新模式，但离线评测使用的是预构建 instruction，不会查询线上 RAG。\n顺着 Step B 的 local_rag_doc_platform_file 参数往回查，找到真正的依赖：本地 CSV。BM25 从这个文件检索规格文本，再把结果放进 YAML 上下文。线上索引是否更新，不能回答这条链路是否完整。",
          "en": "The initial hypothesis was a missing online RAG entry. Offline evaluation, however, uses prebuilt instructions rather than querying online RAG. Tracing Step B’s local_rag_doc_platform_file argument identified a local CSV: BM25 retrieves specification text from it and injects that text into the YAML context."
        }
      },
      {
        "title": {
          "zh": "规格里有，模型输入里却没有",
          "en": "Root cause: an outdated derived artifact"
        },
        "body": {
          "zh": "本地规格和 merged_spec 已经包含新模式，但从 merged_spec 生成 iot_skill_rag_data.csv 的步骤漏跑了。于是炖煮请求的输入里只有 Soup、Keep Warm，没有 Stewing。\n还有一个容易误导判断的细节：焖饭样本虽然评测通过，输入中也没有对应模式。单条回答正确，不能证明所需信息已经进入上下文。",
          "en": "Local specifications and merged_spec contained the new modes, but the step regenerating iot_skill_rag_data.csv had been skipped. Stewing prompts contained Soup and Keep Warm rather than Stewing. Simmered-rice cases passed despite also lacking the intended mode in context, showing that isolated correct answers do not establish pipeline integrity."
        }
      },
      {
        "title": {
          "zh": "把遗漏的派生步骤补回去",
          "en": "Fix: rebuild the offline dependency"
        },
        "body": {
          "zh": "修复是重新生成本地检索 CSV。离线评测依赖的顺序应当完整走通：本地规格描述 → 合并规格 → 本地检索 CSV → Step B 构建 instruction → 离线评测。\n上传线上 RAG 是另一条流程，不能替代本地文件生成。后续流程应将这一步纳入新品接入 Phase 2，避免规格更新后仍沿用旧文件。",
          "en": "Regenerate the local index from merged specifications. The required chain is local descriptions → merged specifications → local retrieval CSV → Step B instructions → offline evaluation. Online RAG upload is a separate path and cannot replace this dependency. The document recommends making regeneration mandatory in new-device Phase 2."
        }
      },
      {
        "title": {
          "zh": "索引修好了，评测结论还要单独确认",
          "en": "Validation and takeaway"
        },
        "body": {
          "zh": "重建后，三种新增模式都能在本地索引中检出，各 1 条。记录到这里确认了索引内容更新，但还没有重建后的完整评测分数，不能据此判断七条失败样本已经全部修好。\n下次再遇到“训练没有效果”，先抽查失败样本的最终 instruction：需要的信息是否存在、来自哪个文件、这个文件是否由最新规格生成。上游内容正确，只是依赖链检查的起点。",
          "en": "After regeneration, all three added modes were found in the local index, one entry each. The document does not report a complete post-rebuild evaluation score, so the confirmed result is index validation. When training appears ineffective, inspect the final instruction and verify freshness across the dependency chain, not just upstream specifications."
        }
      }
    ]
  }
];
