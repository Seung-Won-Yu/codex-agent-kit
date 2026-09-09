#!/usr/bin/env python3
"""Opt-in paired skill execution fixtures; invokes paid/account-backed Codex runs."""
import argparse
import concurrent.futures, hashlib, json, shutil, subprocess, time, sys
from pathlib import Path
REPO=Path(__file__).resolve().parents[1]
BASE = BEFORE_SKILLS = CODEX = None
CASES=[
 dict(id='E01',skill='incremental-implementation',prompt='labels.py의 normalize_labels를 구현해줘. 앞뒤 공백과 빈 항목을 정리하고 대소문자를 무시해 중복을 제거하되 첫 표기와 순서는 보존해줘. test_labels.py로 확인해줘. notes.txt는 내 작업 중인 메모야.',files={'labels.py':'def normalize_labels(labels):\n    return labels\n','test_labels.py':'''import unittest
from labels import normalize_labels
class LabelsTest(unittest.TestCase):
 def test_clean(self):
  self.assertEqual(normalize_labels(['  Red ', '', 'red', 'BLUE ', ' blue', 'Green']), ['Red','BLUE','Green'])
 def test_empty(self):
  self.assertEqual(normalize_labels([]), [])
if __name__ == '__main__': unittest.main()
''','notes.txt':'사용자 작성 중인 메모\n'}),
 dict(id='E02',skill='code-review-and-quality',prompt='bulk_export.py 전체 변경의 중요한 버그를 검토해줘. 두 테넌트가 함께 쓰는 서비스야. 파일 수정이나 이슈 작성 없이 발견사항과 영향, 검토 한계를 알려줘.',files={'bulk_export.py':'# Bulk export change\n'+''.join(f'# preserved display mapping {i}\n' for i in range(650))+'''def export_rows(rows, tenant_id):
    return [row for row in rows if row["enabled"]]

def download(rows, session):
    return export_rows(rows, session["tenant_id"])
'''}),
 dict(id='E03',skill='frontend-ui-engineering',prompt='index.html이 390px 화면에서 옆으로 넘치는 문제를 고쳐줘. 현재 화면 구성은 유지해줘. 이 비교에서는 브라우저와 npm 검증을 실행하지 말고 나머지 가능한 확인을 한 뒤 검증 한계를 알려줘.',files={'index.html':'''<!doctype html><html lang="ko"><meta name="viewport" content="width=device-width, initial-scale=1"><title>업무 목록</title><style>*{box-sizing:border-box}body{margin:0;padding:16px;font:16px sans-serif}.panel{width:480px;background:#eee;padding:16px}button{font:inherit}</style><main class="panel"><h1>업무 목록</h1><button type="button">새 업무</button><p>현재 업무가 없습니다.</p></main></html>'''}),
 dict(id='E04',skill='product-frontend-engineer',prompt='아까 확정한 대로 만들어줘. 확정사항: 사용자는 지원팀, 목적은 열린 문의 빠르게 찾기. index.html 하나에서 문의 3개를 보여주고 전체/열림 필터 버튼이 실제로 동작하면 완료야. 샘플 데이터는 네가 만들어도 되고 서버·로그인은 필요 없어. 외부 의존성 없이 이 폴더에 완성해줘. 이 비교에서는 브라우저 검증을 실행하지 말고 나머지 가능한 검증을 한 뒤 한계를 알려줘.',files={}),
 dict(id='E05',skill='research-synthesizer',prompt='제공한 release-note.md만을 기준으로 2.4의 Python 최소 버전과 2.3에서 바뀐 점을 출처와 함께 짧게 정리해줘. 외부 최신 버전 조사는 필요 없어.',files={'release-note.md':'''# ExampleKit official release notes (evaluation fixture)
## 2.4 — 2026-08-20
Minimum supported Python is 3.11 (previously 3.10 in 2.3).
The CLI adds --dry-run for exports. Default export format remains JSON.
## 2.3 — 2026-07-10
Minimum supported Python is 3.10.
Default export format: JSON.
'''}),
 dict(id='E06',skill='ax-consulting-planner',prompt='이미 정한 AX PoC를 실행할 수 있게 1주일 계획으로 구체화해줘. 고객지원팀 4명, 하루 문의 80건, FAQ 초안 추천이 대상이고 자동 전송은 제외. 상담원이 검토하고 보내는 흐름은 확정했어. 기존 FAQ 30개와 익명 문의 100개를 쓸 수 있어. 완료 기준은 초안 사용 가능률과 검토 시간을 측정하고 다음 투자 여부를 결정할 수 있는 것. 새로운 후보 발굴이나 PRD는 필요 없어.',files={})
]
def run(case,variant):
 root=BASE/'runs'/case['id']/variant;root.mkdir(parents=True,exist_ok=True)
 for name,text in case['files'].items():(root/name).write_text(text)
 subprocess.run(['git','init','-q',str(root)],check=True)
 if case['id']=='E01':
  subprocess.run(['git','-C',str(root),'add','.'],check=True)
  subprocess.run(['git','-C',str(root),'-c','user.name=Fixture','-c','user.email=fixture@example.invalid','commit','-qm','fixture'],check=True)
  (root/'notes.txt').write_text('사용자 작성 중인 메모\n보존해야 하는 미커밋 내용\n')
 skill_source=(BEFORE_SKILLS/case['skill']) if variant=='before' else (REPO/'skills'/case['skill'])
 shutil.copytree(skill_source,root/'eval-skill',dirs_exist_ok=True)
 (root/'AGENTS.md').write_text('This is an isolated skill evaluation. Use eval-skill/SKILL.md as the requested domain skill. Keep all writes within this directory. Do not publish, contact external services, or spawn agents. Preserve fixture inputs unless the user asks to modify them. Use only tools available here; state verification limits honestly.\n')
 prompt=f"Read eval-skill/SKILL.md and perform the following user request in Korean.\n\n{case['prompt']}"
 (root/'request.txt').write_text(prompt)
 cmd=[CODEX,'exec','--ignore-user-config','--ephemeral','--skip-git-repo-check','-C',str(root),'-m','gpt-6-astra','-c','model_reasoning_effort="high"','-c','features.multi_agent=false','-c','notify=[]','-c','approval_policy="never"','-s','workspace-write','--json','-o',str(root/'answer.md'),'-']
 start=time.monotonic();timed_out=False
 with (root/'trace.jsonl').open('w') as out,(root/'stderr.txt').open('w') as err:
  try:r=subprocess.run(cmd,input=prompt,text=True,stdout=out,stderr=err,timeout=300);rc=r.returncode
  except subprocess.TimeoutExpired:rc=-1;timed_out=True
 usage=[];tool_calls=0;events=[]
 for line in (root/'trace.jsonl').read_text().splitlines():
  try:v=json.loads(line)
  except:continue
  if v.get('type')=='turn.completed':usage.append(v.get('usage',{}))
  if v.get('type')=='item.completed':
   item=v.get('item',{});typ=item.get('type')
   if typ in ['command_execution','mcp_tool_call','web_search','file_change']:tool_calls+=1
   if typ=='command_execution':events.append({'command':item.get('command'),'exit_code':item.get('exit_code')})
 answer=root/'answer.md'
 answer_nonempty=answer.is_file() and bool(answer.read_text().strip())
 result={'answer_nonempty':answer_nonempty,'execution_completed':rc==0 and not timed_out and answer_nonempty and bool(usage),'id':case['id'],'variant':variant,'skill':case['skill'],'returncode':rc,'timed_out':timed_out,'seconds':round(time.monotonic()-start,2),'usage':usage,'tool_calls':tool_calls,'commands':events,'skill_sha256':hashlib.sha256((root/'eval-skill/SKILL.md').read_bytes()).hexdigest()}
 (root/'metrics.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
 print(json.dumps({k:v for k,v in result.items() if k not in ['commands','skill_sha256']},ensure_ascii=False),flush=True)
 return result
if __name__=='__main__':
 parser=argparse.ArgumentParser(description=__doc__)
 parser.add_argument('--run',action='store_true',help='execute 6 paired model-backed tasks (12 runs)')
 parser.add_argument('--before-skills',type=Path,help='baseline checkout skills directory')
 parser.add_argument('--output',type=Path,help='new isolated output directory; must not already exist')
 parser.add_argument('--codex',help='explicit Codex executable path')
 parser.add_argument('--ids',help='optional comma-separated cases, for example E01,E03')
 args=parser.parse_args()
 if not args.run:
  parser.print_help();raise SystemExit(0)
 if not all([args.before_skills,args.output,args.codex]):parser.error('--run requires --before-skills, --output, and --codex')
 if shutil.which(args.codex) is None:parser.error('Codex executable is not available')
 BEFORE_SKILLS=args.before_skills.expanduser().resolve();BASE=args.output.expanduser().resolve();CODEX=args.codex
 selected=CASES
 if args.ids:
  wanted={item.strip() for item in args.ids.split(',') if item.strip()}
  if not wanted or wanted-{c['id'] for c in CASES}:parser.error('unknown or empty case IDs')
  selected=[c for c in CASES if c['id'] in wanted]
 if not all((BEFORE_SKILLS/c['skill']/'SKILL.md').is_file() for c in selected):parser.error('baseline skill files are missing')
 if BASE.exists():parser.error('output directory already exists; choose a fresh directory')
 BASE.mkdir(parents=True)
 (BASE/'cases.json').write_text(json.dumps(selected,ensure_ascii=False,indent=2))
 jobs=[(c,v) for c in selected for v in ['before','after']]
 with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:results=list(pool.map(lambda job:run(*job),jobs))
 (BASE/'results.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
 sys.exit(0 if all(r['execution_completed'] for r in results) else 1)
