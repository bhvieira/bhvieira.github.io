@def rss_pubdate = Date(2023, 01, 20)
@def rss = """ fMRI functional connectivity is a better predictor of general intelligence than cortical morphometric features and ICA parcellation order affects predictive performance """
@def published = "20 Jan 2023"
@def title = "fMRI functional connectivity is a better predictor of general intelligence than cortical morphometric features and ICA parcellation order affects predictive performance"
@def authors = "E.A. de Souza, S.A. Silva, B.H. Vieira, C.E.G. Salmon"
@def journal = "Intelligence"
@def doi = "10.1016/j.intell.2023.101727"
@def isopenaccess = false
@def tags = ["intelligence", "fMRI", "machine learning", "resting-state", "brain-behavior"]

{{publidetails .}}

## Abstract

> Intelligence, as a general cognitive ability, shows a substantial inter-subject variation. Because of its impact on our lives, there is great interest in explaining the neural substrates of these differences. We used a large set of neuroimaging and behavioral data from 805 subjects, provided by the Human Connectome Project, and applied predictive models based on elastic-net regression using functional connectivity and brain morphometric data to predict general intelligence values. Additionally, we explored the impact of brain spatial distribution of the input connectivity data in the regression model using two strategies: brain parcellation and individual components. Features derived from functional connectivity were considerably more correlated with general intelligence than cortical thickness and surface area. Considering the regularization terms in this particular prediction problem, the best performances were obtained when the impact of all the independent variables was considered in the regresion, i.e. null LASSO sparsity term. Using different parcellation schemes affected predictive performances, which indicates spatial heterogeneity in the regression. We were able to explain 17,5% of the general intelligence variance, in the best performance reached, with a brain parcellation of 25 independent components; by other hand, using only cortical morphometric features the performance reduced to 1,6% for both cortical thickness and surface area. While no component, in particular, was responsible for predicting a large portion of the variance, the spatial components with the best results comprehend parietal, frontal and occipital regions, in agreement with the Parieto-Frontal Integration Theory (P-FIT).