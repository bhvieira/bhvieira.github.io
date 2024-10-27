@def rss_pubdate = Date(2024, 10, 23)
@def rss = """ Individual cognitive traits can be predicted from task-based dynamic functional connectivity with a deep convolutional-recurrent model """
@def published = "23 Oct 2024"
@def title = "Individual cognitive traits can be predicted from task-based dynamic functional connectivity with a deep convolutional-recurrent model"
@def authors = "E.A. de Souza, B.H. Vieira, C.E.G. Salmon"
@def journal = "Cerebral Cortex"
@def doi = "10.1093/cercor/bhae412"
@def isopenaccess = false
@def tags = ["deep learning", "dynamic functional connectivity", "intelligence", "task-fmri"]

{{publidetails .}}

## Abstract

> There has been increased interest in understanding the neural substrates of intelligence and several human traits from neuroimaging data. Deep learning can be used to predict different cognitive measures, such as general and fluid intelligence, from different functional magnetic resonance imaging experiments providing information about the main brain areas involved in these predictions. Using neuroimaging and behavioral data from 874 subjects provided by the Human Connectome Project, we predicted various cognitive scores using dynamic functional connectivity derived from language and working memory functional magnetic resonance imaging task states, using a 360-region multimodal atlas. The deep model joins multiscale convolutional and long short-term memory layers and was trained under a 10-fold stratified cross-validation. We removed the confounding effects of gender, age, total brain volume, motion and the multiband reconstruction algorithm using multiple linear regression. We can explain 17.1% and 16% of general intelligence variance for working memory and language tasks, respectively. We showed that task-based dynamic functional connectivity has more predictive power than resting-state dynamic functional connectivity when compared to the literature and that removing confounders significantly reduces the prediction performance. No specific cortical network showed significant relevance in the prediction of general and fluid intelligence, suggesting a spatial homogeneous distribution of the intelligence construct in the brain.