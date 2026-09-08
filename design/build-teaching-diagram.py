from pathlib import Path
from html import escape
for lang in ('zh','en'):
 zh=lang=='zh'
 def t(a,b): return a if zh else b
 out=['''<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1050" viewBox="0 0 1600 1050" role="img" aria-labelledby="title desc"><title id="title">Course Agent architecture</title><desc id="desc">Question routing, evidence retrieval, controlled teaching tools, answer generation and learner-memory feedback. Dashed amber panel describes the in-progress routing refactor.</desc><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10Z" fill="#4c5c6d"/></marker></defs><style>text{font-family:'IBM Plex Sans','Noto Sans SC','Microsoft YaHei',sans-serif;fill:#253343}.title{font-size:30px;font-weight:600}.heading{font-size:21px;font-weight:600}.body{font-size:17px}.small{font-size:15px;fill:#617184}.panel{fill:#fafbfd;stroke:#ced6df;stroke-width:1.5}.edge{fill:none;stroke:#4c5c6d;stroke-width:1.8;marker-end:url(#arrow)}.feedback{fill:none;stroke:#4c5c6d;stroke-width:1.8;stroke-dasharray:7 5;marker-end:url(#arrow)}</style><rect width="1600" height="1050" fill="white"/>''']
 def text(x,y,s,cls='body',anchor='start'):out.append(f'<text x="{x}" y="{y}" class="{cls}" text-anchor="{anchor}">{escape(s)}</text>')
 def box(x,y,w,h,title,lines,fill='#fff',stroke='#b8c6d4'):
  out.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="7" fill="{fill}" stroke="{stroke}" stroke-width="1.6"/>');text(x+20,y+33,title,'heading')
  for i,line in enumerate(lines):text(x+20,y+64+26*i,line)
 def edge(d,cl='edge'):out.append(f'<path d="{d}" class="{cl}"/>')
 text(48,53,t('课程教学 Agent：证据与学习状态驱动的回答','Course Agent: evidence-grounded, learner-aware answers'),'title')
 text(48,83,t('系统结构  /  实线：请求与数据流  ·  虚线：学习状态反馈  ·  琥珀色：重构分支','System architecture  /  Solid: request & data flow  ·  Dashed: state feedback  ·  Amber: refactor branch'),'small')
 for x,y,w,h in [(40,120,350,600),(430,120,600,600),(1070,120,490,600)]:out.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="10" class="panel"/>')
 text(62,157,t('(a) 请求与执行策略','(a) Request & execution policy'),'heading')
 text(452,157,t('(b) 上下文与受控能力','(b) Context & controlled capabilities'),'heading')
 text(1092,157,t('(c) 回答与交互','(c) Response & interaction'),'heading')
 box(65,185,300,105,t('学生提问','Student question'),[t('课程概念 / 代码 / 学习计划','Concepts / code / learning plans')], '#edf3fa')
 box(65,330,300,130,'QueryPipeline',[t('预处理、保守重写、课程边界','Preprocess, rewrite & scope'),t('规则路由 + 语义分类兜底','Rules + semantic fallback')])
 box(65,505,300,165,t('确定性执行策略','Deterministic policy'),[t('选择检索要求与执行路径','Retrieval & execution mode'),t('约束工具访问与调用权限','Bound tool access'),t('按需加载教学上下文','Load context on demand')], '#edf3fa')
 edge('M215 290V330');edge('M215 460V505')
 box(465,185,530,130,t('教材检索','Textbook retrieval'),['BM25 + ChromaDB → RRF',t('保留页码与来源；向量超时回退 BM25','Page-level sources; BM25 fallback on timeout')], '#edf4f9')
 box(465,355,530,145,t('教学技能','Teaching skills'),[t('学习路径 · 个性化讲解 · 误解纠正','Learning plans · Explanations · Misconceptions'),t('代码审查：静态分析，不执行代码','Code review: static analysis without execution')], '#eef5f0')
 box(465,540,530,130,t('受控工具','Controlled tools'),[t('课程表 / 显式联网 / Docker 代码沙箱','Schedule / opt-in web / Docker sandbox'),t('运行代码需明确请求，沙箱不可用则停止','Explicit execution request; no host fallback')])
 edge('M365 582H410V250H465');edge('M410 427H465');edge('M410 582V605H465')
 box(1100,245,430,140,t('回答生成与依据检查','Generation & grounding'),[t('按任务组合证据、画像与工具结果','Combine evidence, profile & tool results'),t('必要检索缺失时由 Guard 补齐','Guard enforces required retrieval')], '#edf4f9')
 edge('M995 250H1048V300H1100');edge('M995 427H1048V330H1100');edge('M995 605H1048V360H1100')
 box(1100,465,430,140,t('可追溯的流式回答','Traceable streaming response'),[t('回答正文 + 引用来源 + 执行轨迹','Answer + citations + execution trace'),t('Vue 3 / SSE · 停止生成与断线恢复','Vue 3 / SSE · Stop & reconnect')], '#edf3fa');edge('M1315 385V465')
 text(1100,700,t('FastAPI 会话桥接','FastAPI session bridge'),'small')
 box(430,780,600,135,t('(d) 学习事件 → 学习画像','(d) Learning events → Learner profile'),[t('概念提及 / 澄清 / 误解 / 掌握 → 可回放事件流','Concepts / clarification / misconceptions / mastery'),t('StudentProfile：近期关注、薄弱点与章节进度','Replayable events → focus, weak points & progress')], '#eef5f0')
 edge('M1315 605V847H1030','feedback');edge('M430 847H215V670','feedback')
 text(1130,823,t('对话中的学习信号','Learning signals'),'small');text(240,821,t('后续轮次按需注入','Context for later turns'),'small')
 out.append('<rect x="40" y="953" width="1520" height="68" rx="7" fill="#fdf7eb" stroke="#bc9551" stroke-width="1.5" stroke-dasharray="7 5"/>')
 text(60,981,t('重构中  /  LEARNING_ANSWER','IN PROGRESS  /  LEARNING_ANSWER'),'heading')
 text(60,1007,t('统一学习问答路径，移除额外语义分类调用；执行权限仍由策略决定。真实模型 A/B 尚待验证。','Unify learning answers and remove the extra classifier call; policy retains authority. Real-model A/B remains pending.'),'small')
 out.append('</svg>');Path(f'public/images/teaching-architecture-{lang}.svg').write_text('\n'.join(out),encoding='utf-8')
