@def rss_pubdate = Date(2021, 09, 29)
@def rss = """ New publication in Human Brain Mapping and personal updates """
@def title = "New publication in Human Brain Mapping and personal updates"
@def tags = ["academia", "publications"]

{{blogdetails .}}

I have been away from the site for some time now due to the turbulence near the end of graduate student life.
For the last two months, however, family came in first, given the recent passing of my father in August 3rd, 2021.
Things are settling down now.

Having said this, I am pleased to announce the publication of:

- {{shortref publications/HumanBrainMapping}}

For this work I counted on the amazing collaboration of Professors Julien Dubois, Vince Calhoun and Carlos E.G. Salmon, my advisor, as well as resources from the Center for Translational Research in Neuroimaging and Data Science (TReNDS Center), in Atlanta, GA, where I spent the first semester of 2020 as a visiting scholar, before the pandemic struck.
This is also the first part of my Thesis to be published, with other two parts soon to come (stay tuned).

For this paper, we deviate from the current paradigm on the literature in performing prediction of general intelligence differences based on resting-state functional connectivity and most commonly linear models.
We instead circumvent feature extraction from RS-fMRI regional timeseries, and use an ensemble of recurrent neural networks (RNNs), to perform representation learning.

This model substantially surpasses the current best model in this task.
We also have the advantage of obtaining a model that is completely differentiable regarding raw training data.
Using this fact, we performed both saliency and ablation analyses, and also a combined approach.
We show that these, combined, consistently identify regions more important to the task than canonical resting-state networks (RSNs).

I believe deep learning is just getting started on brain-behavior relationships, and the next years will see increased application of this technique to help elucidate the neural correlates of the mind with more flexibility than traditional approaches.

Check it out in the link above and see you next.