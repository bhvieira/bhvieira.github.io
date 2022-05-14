@def rss_pubdate = Date(2022, 05, 12)
@def rss = """ On the prediction of human intelligence from neuroimaging: A systematic review of methods and reporting """
@def published = "31 May 2022"
@def title = "On the prediction of human intelligence from neuroimaging: A systematic review of methods and reporting"
@def authors = "B.H. Vieira, G.S.P. Pamplona, K. Fachinello, A.K. Silva, M.P. Foss, C.E.G. Salmon"
@def journal = "Intelligence"
@def doi = "10.1016/j.intell.2022.101654"
@def isopenaccess = true
@def tags = ["behavior", "fMRI", "resting-state", "deep learning", "intelligence", "prediction", "systematic review"]


{{publidetails .}}

This paper stems from my Doctoral thesis, which was completed in November 2021.
Human intelligence differences are a frequente object of study in neuroscience, particularly in neuroimaging studies.
Along the years, the application of machine learning to the prediction of traits, e.g., behavior, phenotypes and demographics, became a widespread methodology to the study of neural bases of interindividual differences.
From the earliest applications, the prediction of intelligence differences was already often included.
Today, there is a large corpus of studies that corroborate that this prediction is, in fact, possible, with moderate levels of accuracy.

In this work, we recapitulate all the literature on the prediction of human intelligence differences from brain imaging.
Specifically, we performed a preregistered systematic search with adaptations, retrieving 37 documents that fulfilled inclusion criteria.
Using TRIPOD, we assessed the reporting quality across studies.
Using PROBAST, we evaluated risk of bias and concerns regarding applicability in each set of results from each study.
Results with low risk of bias and low concerns regarding applicability were selected for meta-analytic synthesis.
Due to the number of studies, we performed meta-analysis only on papers using fMRI.
We show that, on average, results on general intelligence are significantly higher than results on the prediction of fluid intelligence, which hints towards the moderating effect of measurement quality, which has been reported in other instances[^1].
We follow the PRISMA reporting guidelines throughout the paper.

We describe several methodological aspects of the studies, starting from the earliest one, in 2008, such as datasets, sample sizes, machine learning models employed, evaluation of performance.
This application of machine learning to cognition demonstrates exponential growth.
For this reason, we believe that the time for this review is oportune, and we hope to foment better practices in the field, as well as foundations for future reviews and neurobiological theories of intelligence differences.


## Abstract
> Reviews and meta-analyses have proved to be fundamental to establish neuroscientific theories on intelligence.
> The prediction of intelligence using in-vivo neuroimaging data and machine learning has become a widely accepted and replicated result.
> We present a systematic review of this growing area of research, based on studies that employ structural, functional, and/or diffusion MRI to predict intelligence in cognitively normal subjects using machine learning.
> We systematically assessed methodological and reporting quality using the PROBAST and TRIPOD in 37 studies.
> We observed that fMRI is the most employed modality, resting-state functional connectivity is the most studied predictor.
> A meta-analysis revealed a significant difference between the performance obtained in the prediction of general and fluid intelligence from fMRI data, confirming that the quality of measurement moderates this association.
> Studies predicting general intelligence from Human Connectome Project fMRI averaged $r = 0.42 \ (\text{CI}_\text{95\%} = [0.35, 0.50])$ while studies predicting fluid intelligence averaged $r = 0.15 \ (\text{CI}_\text{95\%} = [0.13, 0.17])$.
> We identified virtues and pitfalls in the methods for the assessment of intelligence and machine learning.
> The lack of treatment of confounder variables and small sample sizes were two common occurrences in the literature which increased risk of bias.
> Reporting quality was fair across studies, although reporting of results and discussion could be vastly improved.
> We conclude that the current literature on the prediction of intelligence from neuroimaging data is reaching maturity.
> Performance has been reliably demonstrated, although extending findings to new populations is imperative.
> Current results could be used by future works to foment new theories on the biological basis of intelligence differences.

[^1]: [Gignac, G. E., & Bates, T. C. (2017). Brain volume and intelligence: The moderating role of intelligence measurement quality. Intelligence, 64(May), 18–29. https://doi.org/10.1016/j.intell.2017.06.004](https://doi.org/10.1016/j.intell.2017.06.004).