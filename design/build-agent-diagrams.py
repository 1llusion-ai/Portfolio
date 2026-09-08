"""Build the public, localized SVGs from the reviewed diagram source."""
from pathlib import Path
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
NS = 'http://www.w3.org/2000/svg'
ET.register_namespace('', NS)
source = ROOT / 'design/agent-iteration-overview.svg'
output = ROOT / 'public/images'
output.mkdir(parents=True, exist_ok=True)
english = [
    'PROJECT 01 / SYSTEM OVERVIEW',
    'Agent-driven iteration for IoT control models',
    'Connect diagnosis, training, evaluation and deployment with traceable state and reusable experience.',
    'WORKFLOW / 01',
    'A / TARGETED REPAIR',
    'Production errors / requirements',
    'Extract the request, device context and expected action',
    'Diagnose the error and choose a repair strategy',
    'B / BATCH EVALUATION',
    'Batch validation data',
    'Validate data → evaluate the current model baseline',
    'Eval only: report and finish. Improvement: diagnose failures.',
    'C / NEW CAPABILITIES',
    'New device categories / features',
    'Archive full specs and samples → baseline → diagnose each case',
    'Train model errors only; fix data or evaluation errors first',
    'Primary agent · Claude Code',
    'Route selection / decisions / monitoring / memory',
    'Delegate tasks; collect conclusions and artifacts',
    'Documents and rules · Data analysis · Samples | Keep decision context focused',
    'WHEN REPAIR IS NEEDED / EXECUTION FLOW',
    'Controlled scripts connect data and training platforms; workflows run serially',
    '01 / DIAGNOSE', 'Diagnosis & strategy', 'Check rules and failures', 'Output: repair conclusions',
    '02 / PREPARE', 'Prepare & validate', 'CSV → checks → JSONL', 'Output: validated data',
    '03 / FIX', 'Incremental training', 'Upload version → train', 'Output: candidate model',
    '04 / EVALUATE', 'Evaluate & compare', 'Repairs + regressions', 'Output: metrics and failures',
    '05 / DECIDE', 'Quality decision', 'Apply route-specific criteria', 'Pass / review / repair again',
    '06 / FULL', 'Full retraining & evaluation', 'Merge validated fixes with base data', 'Output: training artifacts and evaluation report',
    'PASS',
    'Below target: record the cause and next strategy; diagnose again',
    'Full eval: pass → deploy; fail → diagnose',
    'THROUGHOUT THE WORKFLOW / RULES, STATE AND EXPERIENCE',
    'Business rules · What is correct',
    'Human-maintained device specifications and product rules',
    'Read on demand during diagnosis and sample preparation',
    'Kept separate so repair experience cannot replace product rules',
    'Short-term memory · Run progress',
    'Versioned state, evaluation records and diagnostic logs',
    'Resume an existing execution after interruption',
    'Validation manifests + execution locks prevent stale data and duplicates',
    'Long-term memory · Reusable lessons',
    'Save after evaluation passes and corrected understanding is stable',
    'Load a compact index; expand matching entries on demand',
    'Reuse validated strategies and known pitfalls in future diagnoses',
    'Validated experience informs future tasks',
    'Architecture overview · Describes the mechanism, not measured performance or production deployment',
    'IOT SKILL LOOP',
    '07 / Model deployment',
    'Deployment Skill runs and returns the result',
    '08 / Feishu report and handoff',
    'Return evaluation and deployment results',
]

for lang in ('zh', 'en'):
    tree = ET.parse(source)
    root = tree.getroot()
    texts = root.findall(f'.//{{{NS}}}text')
    if lang == 'en':
        assert len(texts) == len(english)
        root.find(f'{{{NS}}}title').text = english[1]
        root.find(f'{{{NS}}}desc').text = 'Three task routes connect agent coordination, diagnosis, sample validation, incremental training, quality decisions, full retraining, model deployment and Feishu reporting. Failed full evaluations return to diagnosis. Rules, run state and reusable experience support the process.'
        for node, value in zip(texts, english):
            node.text = value
        style = root.find(f'.//{{{NS}}}style')
        style.text += '\n.heading{font-size:18px}.body{font-size:15px}.small{font-size:13px}.eyebrow{font-size:13px;letter-spacing:1.8px}'
        texts[16].set('style', 'fill:white;font-size:22px;font-weight:700')
        texts[17].set('style', 'fill:#e4e9f4;font-size:15px')
        texts[47].set('style', 'fill:#995a38;font-size:15px')
        for i in (23, 27, 31, 35):
            texts[i].set('style', 'font-size:15px;font-weight:700')
        for i in (24, 28, 32, 36):
            texts[i].set('style', 'font-size:14px;fill:#4a5047')
        texts[57].set('style', 'font-size:12px;fill:#6d7469')
        # Longer English retry annotation needs a wider interruption in the line.
        for rect in root.findall(f'{{{NS}}}rect'):
            if rect.get('x') == '340' and rect.get('y') == '666':
                rect.set('x', '310')
                rect.set('width', '560')
    else:
        texts[3].text = '系统流程 / 01'
        texts[63].text = '系统机制示意 · 展示任务执行与反馈关系，不代表实际运行指标或上线结果'
    # Each link needs its own arrowhead, not only the last subpath.
    for path in list(root.findall(f'{{{NS}}}path')):
        if path.get('d', '').startswith('M250 562'):
            root.remove(path)
            for start, end in [(250,278), (470,498), (690,718), (910,938), (1170,1218)]:
                ET.SubElement(root, f'{{{NS}}}path', {'d': f'M{start} 562H{end}', 'class': 'line'})
    tree.write(output / f'agent-iteration-overview-{lang}.svg', encoding='utf-8', xml_declaration=True)
print('Built Chinese and English SVGs')
