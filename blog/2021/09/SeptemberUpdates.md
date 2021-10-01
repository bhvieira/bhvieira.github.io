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

~~~
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Very happy to announce that our paper &quot;A deep learning based approach identifies regions more relevant than resting-state networks to the prediction of general intelligence from resting-state fMRI&quot; has been published at <a href="https://twitter.com/hashtag/HumanBrainMapping?src=hash&amp;ref_src=twsrc%5Etfw">#HumanBrainMapping</a>! <a href="https://twitter.com/InbrainL?ref_src=twsrc%5Etfw">@InbrainL</a><a href="https://t.co/CYP6wVEIia">https://t.co/CYP6wVEIia</a></p>&mdash; Bruno Hebling Vieira (@HeblingVieira) <a href="https://twitter.com/HeblingVieira/status/1443627437632466948?ref_src=twsrc%5Etfw">September 30, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
~~~

For this work I counted on the amazing collaboration of Professors Julien Dubois, Vince Calhoun and Carlos E.G. Salmon, my advisor, as well as resources from the Center for Translational Research in Neuroimaging and Data Science ([TReNDS Center](https://trendscenter.org)), in Atlanta, GA, where I spent the first semester of 2020 as a visiting scholar under Professor Vince Calhoun, before the pandemic struck.
This is also the first part of my Thesis to be published, with other two parts soon to come (stay tuned).

For this paper, we deviate from the current paradigm on the literature in performing prediction of general intelligence differences based on resting-state functional connectivity and most commonly linear models.
We instead circumvent feature extraction from RS-fMRI regional timeseries, and use an ensemble of recurrent neural networks (RNNs), to perform representation learning.

This model substantially surpasses the current best model in this task.
We also have the advantage of obtaining a model that is completely differentiable regarding raw training data.
Using this fact, we performed both saliency and ablation analyses, and also a combined approach.
We show that these, combined, consistently identify regions more important to the task than canonical resting-state networks (RSNs).

I believe deep learning is just getting started on brain-behavior relationships, and the next years will see increased application of this technique to help elucidate the neural correlates of the mind with more flexibility than traditional approaches.

Check it out in the link above and see you next.