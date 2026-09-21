# 项目长期约定（mojianhua01.github.io）

## _data/publications.yml 论文编号规则（2026-09-21 起）
- 字段名 `number`，写在每条条目的 `category:` 行之后。
- 期刊论文 `J1, J2, ...`；会议论文 `C1, C2, ...`；**年份越早编号越小**。
- **不编号**：`category` 为 `preprint`、`manuscript`、`book`（以及未出现过的 dataset）的条目。
- 同一年内的排序口径：**按月份升序 —— 月份越小编号越小**（2026-09-21 莫老师改口径，取代早期的"按 Xplore 文献号"）；同月并列时用 **IEEE Xplore document id 升序**定序。
- 数据层存 `J1` / `C1`（不带方括号），显示时再加 `[ ]`。
- 本次调整只动了 6 条（3 组同年内互换）：J17↔J18（2022，7月/8月）、C12↔C13（2021，10月/12月）、C18↔C19（2025，10月/11月）。对照表：`C:\Users\mojia\.workbuddy\preview\publication-numbers-review.md`。

## _data/publications.yml 月份字段（2026-09-21 起）
- 字段名 `month`，**整数 1–12**，写在每条条目的 `year:` 行之后。
- **口径（莫老师定义）**：期刊 = **期号月份**；会议 = **会议召开月份**；**预印本 = arXiv v1 提交月份**（2026-09-21 晚追加确认）。仅 journal / conference / preprint 有；`book` / `manuscript` **不加**（保持只显示年份）。
- 预印本的月份来源：**arXiv 官方 API** `export.arxiv.org/api/query?id_list=<id>`（**禁代理**）取 `published`（v1 提交日）。注意 **arXiv 编号的 `YYMM` 段可能与 v1 实际提交月差一个月**（AirFM-DDA 编号 `2605.*` 但 v1 提交在 4 月）→ 一律以 API 返回的 `published` 为准。
- 权威来源优先级：**本机 Zotero 库**（`E:\Zotero\zotero.sqlite`，只读 `mode=ro&immutable=1`；按作者 `Jianhua Mo` 检索，不是按 collection）→ CrossRef `published-print` → **Google Scholar 详情页**的 `Publication date`（`scholar.google.com/citations?user=OW4_YiwAAAAJ`）。
  - ⚠️ IEEE Access 与尚未定期号的 2026 新论文**没有期号月**，只能用**上线月份**（GS 的 Date of Publication）——这一点要在报告里注明。
  - ⚠️ OpenAlex 给的是**上线日期**、且无月份时会补 `YYYY-01-01` 占位，不可直接当期号月份用。
- 展示：`{% if pub.month %}` 时中文页 `2026年7月`、英文页 `Jul. 2026`（`months_en` 数组在 include 顶部定义）；无 month 自动退回只显示年份。

## 页面与模板
- 论文列表由 `_includes/publications-list.html` 渲染，`_pages/publications.html`（en）与 `_pages/zh-publications.html`（zh）共用同一个 include；改一处即中英文同步。
- 该 include 按 `category` 分节（preprints / journals / conferences / books），节内按年份倒序分组；`other_pubs` 一段（manuscript+dataset）目前被注释隐藏。
- 列表条目已带 `number` 前缀：`<strong>{% if pub.number %}[{{ pub.number }}] {% endif %}{{ pub.title }}</strong>`（`{% if %}` 保证无编号条目不留空方括号）。
- ⚠️ **渲染顺序的坑**：`{% assign x = site.data.publications | where: ... | sort: "year" | reverse %}` 在 Liquid 里会**连同年内顺序一起倒过来**（Ruby 排序稳定 + reverse），即**页面同年内的先后 = yml 文件顺序的倒序**。想让页面按某个顺序显示，就要把 yml 里该年份的条目按**相反顺序**摆。
  - **现行摆放规则（2026-09-21 起）**：yml 里每个年份组按**月份升序**摆放（等价于按编号升序）→ 页面同年内显示为**月份降序**（月份大的在上、小的在下，同月按编号大的在上）。
  - 历史口径（已废弃）：曾要求页面同年内编号递增，那时 yml 要按编号**降序**摆。
  - 新增论文时**同一年要插在该组的正确位置**（保持组内月份升序），否则页面又会乱序；改完用技能里的 `check_publication_order.py` 校验（它同时校验编号与 (年,月,文献号) 排名是否一致）。
- 本机**没有 Ruby/Jekyll**，改模板后无法本地构建预览；可用线上页面反推渲染行为，或用技能 `jekyll-publications-maintenance` 里的 `gen_preview.py` 生成静态预览。
- 论文列表相关的整套做法已沉淀为技能：**`jekyll-publications-maintenance`**（`C:\Users\mojia\.workbuddy\skills\`），含编号规则、顺序坑、备份校验纪律、推送参数、线上核对与汇报风格。

## 本机操作备忘
- 改数据/模板前先备份到 `C:\Users\mojia\.workbuddy\backups\`，并在副本上做改动、用 git diff 核对“只增不改”。
- 校验 yml：用 `C:\Users\mojia\.workbuddy\binaries\python\envs\default\Scripts\python.exe`（已装 PyYAML）。
- ⚠️ **`.workbuddy/memory/` 两个 md 已被莫老师提交进公开仓库**（提交 `fcf08cd upload Workbuddy memory files`），不再是 untracked。所以它们会出现在 `git status` 里 —— 提交站点改动时**只 `git add` 明确列出的站点文件，别用 `git add .`**。
