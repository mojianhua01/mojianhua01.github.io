---
layout: archive
title: "勘误"
description: "莫建华已发表论文的勘误汇总：更正后的公式在此排版以便阅读，原始纯文本勘误保留供下载。"
permalink: /zh/errata/
author_profile: true
lang: zh
translation_url: /errata/
math: true
---

已发表论文的勘误，按发表时间倒序排列。公式在此排版以便阅读；每条勘误旁保留原始纯文本勘误（也可从[论文发表](/zh/publications/)页面进入），供与期刊编辑部通信及长期归档使用。

<h2 id="J22">[J22] Hybrid Near/Far-Field Frequency-Dependent Beamforming via Phase-Time Arrays</h2>

*IEEE Transactions on Wireless Communications，2026年3月* · [纯文本（TXT）](/files/publications/2025-hybrid-near-far-field-errata.txt)

**表V** —— FD架构的阵列增益应为63.99，原文误作53.99。

<h2 id="C16">[C16] 3D Beamforming Through Joint Phase-Time Arrays</h2>

*IEEE第100届车载技术会议（VTC2024-Fall），2024年10月* · [纯文本（TXT）](/files/publications/2024-3d-beamforming-jpta-errata.txt)

**式(12)** —— 时延表达式漏掉了归一化因子12/[M(M+1)(M+2)]，即(A<sup>T</sup>A)<sup>−1</sup>的第二个对角元。缺少该因子时，时延既没有时间量纲，数值上也放大了M(M+1)(M+2)/12倍。正确形式为

<div class="errata-eq">\[ \tau_{y,z} = \frac{12}{M(M+1)(M+2)}\,\frac{1}{2\pi\Delta f}\sum_{i=1}^{N_u}\left(\nu(y,z,i)+2\pi k(y,z,i)\right)M_{\mathrm{sum}}(i,\boldsymbol{\alpha}) \]</div>

其中M<sub>sum</sub>(i, **α**)为子载波下标之累加，量级为M<sup>2</sup>，故该系数不可省略。以BW = (M+1)Δf代入，它等同于12/[M(M+2)]·1/(2πBW)，即Jain等“mmFlexible”（INFOCOM 2023）式(49)的形式。式(13)无误。arXiv版（arXiv:2401.00819v3）存在同样的遗漏。

<h2 id="J19">[J19] Extending Uplink Coverage of mmWave and Terahertz Systems Through Joint Phase-Time Arrays</h2>

*IEEE Access，2022年8月* · [纯文本（TXT）](/files/publications/2022-extending-uplink-coverage-errata.txt)

**第1处 · 第88877页左栏第1段倒数第3行** —— 原文“proportional to the BS”应为“proportional to the BW”。

**第2处 · 图10图注** —— 原文“bright blue region”应为“bright yellow region”。

**第3处 · 第88879页右栏第2段倒数第2行** —— 下标原文为NT，应为TR：

<div class="errata-eq">\[ N_{\mathrm{NT}} = 2 \quad\longrightarrow\quad N_{\mathrm{TR}} = 2 \]</div>

<h2 id="J17">[J17] Joint Phase-Time Arrays: A Paradigm for Frequency-Dependent Analog Beamforming in 6G</h2>

*IEEE Access，2022年7月* · [纯文本（TXT）](/files/publications/2022-joint-phase-time-arrays-errata.txt)

**第1处 · 算法3，第73369页右栏** —— 方括号内两项均使用了角度θ₂，第一项应为θ₁：

<div class="errata-eq">\[ [\tilde{\mathbf{b}}]_m = \frac{e^{j\pi m\sin\theta_1} + e^{j\pi m\sin\theta_2}}{\sqrt{2M}} \]</div>

**第2处 · 第73370页右栏讨论图6的段落** —— 波束行为1下F<sub>obj</sub>达到饱和时的κ值，原文写作M sin(Δθ)，应为M sin(Δθ/2)，与注2（Remark 2）给出的最大时延M&#124;sin(Δθ/2)&#124;/W一致：

<div class="errata-eq">\[ \kappa = M\sin\left(\frac{\Delta\theta}{2}\right) \approx 22 \qquad (\theta_0 = \pi/6,\ \Delta\theta = \pi/4,\ M = 64) \]</div>

<h2 id="J8">[J8] Capacity Analysis of One-Bit Quantized MIMO Systems with Transmitter CSI</h2>

*IEEE Transactions on Signal Processing，2015年10月* · [纯文本（TXT）](/files/publications/2015-one-bit-mimo-capacity-errata.txt)

**式(6)、(9)** —— 相位项kπ应为kπ/2：

<div class="errata-eq">\[ k\pi \quad\longrightarrow\quad \frac{k\pi}{2} \]</div>

<h2 id="C7">[C7] Channel Estimation in Millimeter Wave MIMO Systems with One-Bit Quantization</h2>

*Asilomar Conference on Signals, Systems and Computers，2014年11月* · [纯文本（TXT）](/files/publications/2014-one-bit-channel-estimation-errata.txt)

**全文** —— 严格来说，本文算法并非EM算法，而是一种启发式算法：交替优化隐变量y与估计量h，遵循交替优化（alternating optimization，亦称交替最小化）的思想。本文的期刊版已改用GAMP算法。感谢引用本文并指出该错误的读者。

<h2 id="J3">[J3] Relay Placement for Physical Layer Security: A Secure Connection Perspective</h2>

*IEEE Communications Letters，2012年6月* · [纯文本（TXT）](/files/publications/2012-relay-placement-errata.txt)

**命题1之前的式子** —— 条件R<sub>s</sub> &lt; 0应为R<sub>s</sub> = 0，因为由式(3)可知R<sub>s</sub>必然非负：

<div class="errata-eq">\[ R_s < 0 \quad\longrightarrow\quad R_s = 0 \]</div>
