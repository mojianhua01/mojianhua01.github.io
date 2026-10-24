---
layout: archive
title: "Errata"
description: "Corrections to published papers by Jianhua Mo, with the corrected expressions typeset for reading and the original plain-text notices kept for download."
permalink: /errata/
author_profile: true
lang: en
math: true
---

Corrections to published papers, listed newest first. Expressions are typeset here for readability; the original plain-text notices are kept beside each entry (also reachable from the [publications](/publications/) page) for journal correspondence and long-term archival.

## [J22] Hybrid Near/Far-Field Frequency-Dependent Beamforming via Phase-Time Arrays {: #J22}

*IEEE Transactions on Wireless Communications, Mar. 2026* · [plain text (TXT)](/files/publications/2025-hybrid-near-far-field-errata.txt)

**Table V.** The array gain 1 of the FD architecture should be 63.99 instead of 53.99.

## [J19] Extending Uplink Coverage of mmWave and Terahertz Systems Through Joint Phase-Time Arrays {: #J19}

*IEEE Access, Aug. 2022* · [plain text (TXT)](/files/publications/2022-extending-uplink-coverage-errata.txt)

**Item 1 · p. 88877, left column, 3rd last line of the 1st paragraph** — "proportional to the BS" should read "proportional to the BW".

**Item 2 · Fig. 10 caption** — "bright blue region" should read "bright yellow region".

**Item 3 · p. 88879, right column, 2nd last line of the 2nd paragraph** — the subscript is NT in the paper, but should be TR:

<div class="errata-eq">\[ N_{\mathrm{NT}} = 2 \quad\longrightarrow\quad N_{\mathrm{TR}} = 2 \]</div>

## [J17] Joint Phase-Time Arrays: A Paradigm for Frequency-Dependent Analog Beamforming in 6G {: #J17}

*IEEE Access, Jul. 2022* · [plain text (TXT)](/files/publications/2022-joint-phase-time-arrays-errata.txt)

**Item 1 · Algorithm 3, p. 73369, right column** — both terms inside the brackets use the angle θ₂; the first one should use θ₁:

<div class="errata-eq">\[ [\tilde{\mathbf{b}}]_m = \frac{e^{j\pi m\sin\theta_1} + e^{j\pi m\sin\theta_2}}{\sqrt{2M}} \]</div>

**Item 2 · p. 73370, right column, paragraph discussing Fig. 6** — the value of κ at which F<sub>obj</sub> saturates for beam behavior 1 is stated as M sin(Δθ), but should be M sin(Δθ/2), in agreement with the maximum delay M|sin(Δθ/2)|/W given in Remark 2:

<div class="errata-eq">\[ \kappa = M\sin\left(\frac{\Delta\theta}{2}\right) \approx 22 \qquad (\theta_0 = \pi/6,\ \Delta\theta = \pi/4,\ M = 64) \]</div>

## [J8] Capacity Analysis of One-Bit Quantized MIMO Systems with Transmitter CSI {: #J8}

*IEEE Transactions on Signal Processing, Oct. 2015* · [plain text (TXT)](/files/publications/2015-one-bit-mimo-capacity-errata.txt)

**Eqs. (6) and (9)** — the phase term kπ should be kπ/2:

<div class="errata-eq">\[ k\pi \quad\longrightarrow\quad \frac{k\pi}{2} \]</div>

## [C7] Channel Estimation in Millimeter Wave MIMO Systems with One-Bit Quantization {: #C7}

*Asilomar Conference on Signals, Systems and Computers, Nov. 2014* · [plain text (TXT)](/files/publications/2014-one-bit-channel-estimation-errata.txt)

**Throughout** — strictly speaking, the algorithm in this paper is not an EM algorithm. It is a heuristic algorithm which alternately optimizes the hidden variable y and the estimator h, following the principle of alternating optimization (also called alternating minimization). The journal version of this paper turned to the GAMP algorithm instead. Thanks to the readers who cited this paper and pointed out the mistake.

## [J3] Relay Placement for Physical Layer Security: A Secure Connection Perspective {: #J3}

*IEEE Communications Letters, Jun. 2012* · [plain text (TXT)](/files/publications/2012-relay-placement-errata.txt)

**Equation preceding Proposition 1** — the condition R<sub>s</sub> < 0 should be R<sub>s</sub> = 0, since R<sub>s</sub> is guaranteed to be nonnegative by Eq. (3):

<div class="errata-eq">\[ R_s < 0 \quad\longrightarrow\quad R_s = 0 \]</div>
