# 项目长期约定（mojianhua01.github.io）

## _data/publications.yml 论文编号规则（2026-09-21 起）
- 字段名 `number`，写在每条条目的 `category:` 行之后。
- 期刊论文 `J1, J2, ...`；会议论文 `C1, C2, ...`；**年份越早编号越小**。
- **不编号**：`category` 为 `preprint`、`manuscript`、`book`（以及未出现过的 dataset）的条目。
- 同一年内的排序口径：按 **IEEE Xplore document id 升序**（yml 无月份，文献号与上线时间单调相关）。
- 数据层存 `J1` / `C1`（不带方括号），显示时再加 `[ ]`。

## 页面与模板
- 论文列表由 `_includes/publications-list.html` 渲染，`_pages/publications.html`（en）与 `_pages/zh-publications.html`（zh）共用同一个 include；改一处即中英文同步。
- 该 include 按 `category` 分节（preprints / journals / conferences / books），节内按年份倒序分组；`other_pubs` 一段（manuscript+dataset）目前被注释隐藏。
- 列表条目已带 `number` 前缀：`<strong>{% if pub.number %}[{{ pub.number }}] {% endif %}{{ pub.title }}</strong>`（`{% if %}` 保证无编号条目不留空方括号）。
- ⚠️ **渲染顺序的坑**：`{% assign x = site.data.publications | where: ... | sort: "year" | reverse %}` 在 Liquid 里会**连同年内顺序一起倒过来**（Ruby 排序稳定 + reverse），即**页面同年内的先后 = yml 文件顺序的倒序**。想让页面按某个顺序显示，就要把 yml 里该年份的条目按**相反顺序**摆。
  - **已按此把 yml 规范化**：每个年份组在文件里都按**编号降序**摆放（2026-09-21 起的约定），于是页面同年内显示为编号**递增**（J21→J24、C17→C19）。
  - 新增论文时**同一年要插在正确的位置**（保持该组编号降序），否则页面又会乱序；改完用技能里的 `check_publication_order.py` 校验。
- 本机**没有 Ruby/Jekyll**，改模板后无法本地构建预览；可用线上页面反推渲染行为，或用技能 `jekyll-publications-maintenance` 里的 `gen_preview.py` 生成静态预览。
- 论文列表相关的整套做法已沉淀为技能：**`jekyll-publications-maintenance`**（`C:\Users\mojia\.workbuddy\skills\`），含编号规则、顺序坑、备份校验纪律、推送参数、线上核对与汇报风格。

## 本机操作备忘
- 改数据/模板前先备份到 `C:\Users\mojia\.workbuddy\backups\`，并在副本上做改动、用 git diff 核对“只增不改”。
- 校验 yml：用 `C:\Users\mojia\.workbuddy\binaries\python\envs\default\Scripts\python.exe`（已装 PyYAML）。
