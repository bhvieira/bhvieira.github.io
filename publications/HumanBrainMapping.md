@def rss_pubdate = Date(2021, 09, 29)
@def rss = """ A deep learning based approach identifies regions more relevant than resting-state networks to the prediction of general intelligence from resting-state fMRI """
@def published = "29 Sep 2021"
@def title = "A deep learning based approach identifies regions more relevant than resting-state networks to the prediction of general intelligence from resting-state fMRI"
@def authors = "B.H. Vieira, J. Dubois, V.D. Calhoun, C.E.G. Salmon"
@def journal = "Human Brain Mapping"
@def doi = "10.1002/hbm.25656"
@def isopenaccess = true
@def tags = ["brain-behavior", "deep learning", "fMRI", "intelligence", "resting-state"]


{{publidetails .}}

This paper stems from my Doctoral thesis, which should be completed by the end of 2021.

For this work I counted on the amazing collaboration of Professors Julien Dubois, Vince Calhoun and Carlos E.G. Salmon, my advisor, as well as resources from the Center for Translational Research in Neuroimaging and Data Science (TReNDS Center), in Atlanta, GA, where I spent the first semester of 2020 as a visiting scholar, before the pandemic struck.
This is also the first part of my Thesis to be published, with other two parts soon to come.

For this paper, we deviate from the current paradigm on the literature in performing prediction of general intelligence differences based on resting-state functional connectivity and most commonly linear models.
We instead circumvent feature extraction from RS-fMRI regional timeseries, and use an ensemble of recurrent neural networks (RNNs), to perform representation learning.

This model substantially surpasses the current best model in this task.
We also have the advantage of obtaining a model that is completely differentiable regarding raw training data.
Using this fact, we performed both saliency and ablation analyses, and also a combined approach.
We show that these, combined, consistently identify regions more important to the task than canonical resting-state networks (RSNs).

## Abstract
> Prediction of cognitive ability latent factors such as general intelligence from neuroimaging has elucidated questions pertaining to their neural origins. However, predicting general intelligence from functional connectivity limit hypotheses to that specific domain, being agnostic to time-distributed features and dynamics. We used an ensemble of recurrent neural networks to circumvent this limitation, bypassing feature extraction, to predict general intelligence from resting-state functional magnetic resonance imaging regional signals of a large sample (n = 873) of Human Connectome Project adult subjects. Ablating common resting-state networks (RSNs) and measuring degradation in performance, we show that model reliance can be mostly explained by network size. Using our approach based on the temporal variance of saliencies, that is, gradients of outputs with regards to inputs, we identify a candidate set of networks that more reliably affect performance in the prediction of general intelligence than similarly sized RSNs. Our approach allows us to further test the effect of local alterations on data and the expected changes in derived metrics such as functional connectivity and instantaneous innovations.