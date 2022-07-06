@def rss_pubdate = Date(2022, 7, 31)
@def rss = """ Predicting future cognitive decline from non-brain and multimodal brain imaging data in healthy and pathological aging """
@def published = "31 July 2022"
@def title = "Predicting future cognitive decline from non-brain and multimodal brain imaging data in healthy and pathological aging"
@def authors = "B.H. Vieira, F. Liem, K. Dadi, D.A. Engemann, A. Gramfort, P. Bellec, R.C. Craddock, J.S. Damoiseaux, C.J. Steele, T. Yarkoni, N. Langer, D.S. Margulies, G. Varoquaux"
@def journal = "Neurobiology of Aging"
@def doi = "10.1016/j.neurobiolaging.2022.06.008"
@def isopenaccess = true
@def tags = ["biomarker", "machine learning", "predictive modeling", "cross-validation", "open science"]


{{publidetails .}}

This publication is the first result under the Swiss National Science Foundation (SNSF) project "Predicting future cognitive decline from non-brain risk factors and multimodal brain imaging data" that I take part in.
Most of the original work is due to Dr. Franziskus Liem (check the preprint[^1]).
I was in charge of revising the paper during peer review to fully address reviewers' comments.
We share first-authorship, with the order chosen alphabetically.
I learned a lot from co-authors through this one, including making the life of reviewers easier and making your research code actually reusable.

## Abstract
> Previous literature has focused on predicting a diagnostic label from structural brain imaging. Since subtle changes in the brain precede cognitive decline in healthy and pathological aging, our study predicts future decline as a continuous trajectory instead. Here, we tested whether baseline multimodal neuroimaging data improve the prediction of future cognitive decline in healthy and pathological aging. Non-brain data (demographics, clinical and neuropsychological scores), structural MRI and functional connectivity data from OASIS-3 (N=662; age=46–96y) were entered into cross-validated multi-target random forest models to predict future cognitive decline (measured by CDR and MMSE), on average 5.8y into the future. The analysis was preregistered, and all analysis code is publicly available. Combining non-brain with structural data improved the continuous prediction of future cognitive decline (best test-set performance: R2=0.42). Cognitive performance, daily functioning, and subcortical volume drove the performance of our model. Including functional connectivity did not improve predictive accuracy. In the future, the prognosis of age-related cognitive decline may enable earlier and more effective individualized cognitive, pharmacological, and behavioral interventions.

[^1]: [Franziskus Liem, Kamalaker Dadi, Denis A. Engemann, Alexandre Gramfort, Pierre Bellec, R. Cameron Craddock, Jessica S. Damoiseaux, Christopher J. Steele, Tal Yarkoni, Daniel S. Margulies, Gaël Varoquaux, bioRxiv 2020.06.10.142174, Predicting future cognitive decline from non-brain and multimodal brain imaging data in healthy and pathological aging. 10.1101/2020.06.10.142174 ](https://doi.org/10.1101/2020.06.10.142174).