@def rss_pubdate = Date(2019, 1, 1)
@def rss = """ A principled multivariate intersubject analysis of Generalized Partial Directed Coherence with Dirichlet Regression: application to healthy aging in areas exhibiting cortical thinning """
@def published = "1 January 2019"
@def title = "A principled multivariate intersubject analysis of Generalized Partial Directed Coherence with Dirichlet Regression: application to healthy aging in areas exhibiting cortical thinning"
@def authors_post = ", C.E.G. Salmon"
@def authors_pre = ""

@def journal = "Journal of Neuroscience Methods"

## {{title}}
~~~<sup>~~~
{{authors_pre}}
**B.H. Vieira**
{{authors_post}}
, _{{journal}}_, {{rss_pubdate}}
~~~</sup>~~~

This is the first paper derived from my Master's dissertation[^1].
It is a methodological paper that was created out of the necessity of a principled method to study the Generalized Partial Directed Coherence (GPDC) between subjects.

The GPDC is a multivariate measure of directed connectivity in the frequency domain.
It has parallels to Multivariate Granger Causality and the Directed Transfer Function.
One of it's most interesting properties is that, for a given frequency, the GPDC from a node (source) to all other nodes (sinks) sums to one, _i.e._ the GPDC measures the proportion of information being sent.

That interesting property, however, makes its study more complex and prone to bias, specially due to the appearance of these ratios.
We make an identification between the squared GPDC from each node with the Dirichlet distribution, which is a multivariate generalization of the Beta distribution.
This opens the possibility of employing the Dirichlet Regression to the problem, taking into account the multivariate character of the dependent variable.

As an application, we study the inter-individual differences of squared GPDC during aging in regions that display cortical thinning.
A few approaches can be used to study positive ratios and we compare ours with other two, showing promising results.

## Abstract

> ### Background:
> Generalized Partial Directed Coherence (GPDC) is a multivariate measure of predictability between functional timeseries defined in the frequency domain. However, analysis has often been constrained by its compositional nature. Specifically, the squared GPDC from a node region to all nodes in any given frequency must sum to one.
> ### New method
> When analyzing GPDC spectra, it is imperative to consider that squared GPDC from a source timeseries sums to one over its target timeseries. Dirichlet Regression allows the modeling of compositional data and, therefore, becomes a principled choice for the multivariate analysis of GPDC on arbitrary subject-level variables.
> ### Results
> Eleven resting-state fMRI connections underwent age-related alterations, with two decreases in squared GPDC from a region to itself in two frequencies, signaling increased integration with the rest, and nine increases in squared GPDC, one involving different regions. All frequencies had at least one alteration due to age.
> ### Comparison with existing method(s)
> Our methodology identifies alterations in GPDC in more connections than a naïve approach based on linear regression and centered log-ratio analysis. We also studied alternative connectivity indices between the same ROIs, uncovering no effect of age on the time-domain predictive-causality metrics for any connection, while for Pearson correlation five connections displayed significant effects of age, with parallels to the results pertaining to GPDC.
> ### Conclusions
> Dirichlet Regression allows the study of continuous or discrete variables as predictors for the analysis of GPDC, enabling a wider adoption of this measure of connectivity.

[^1]: {{shortref publications/2018/02/Dissertation}}





