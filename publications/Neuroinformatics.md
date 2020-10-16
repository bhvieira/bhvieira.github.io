@def rss_pubdate = Date(2020, 3, 1)
@def rss = """ Personode: A Toolbox for ICA Map Classification and Individualized ROI Definition """
@def published = "3 January 2020"
@def title = "Personode: A Toolbox for ICA Map Classification and Individualized ROI Definition"
@def authors = "G.S.P. Pamplona, B.H. Vieira, F. Scharnowski, C.E.G. Salmon"
@def journal = "Neuroinformatics"
@def doi = "10.1007/s12021-019-09449-4"
@def isopenaccess = false
@def tags = ["collaboration", "ICA", "resting state", "RSNs", "networks", "fMRI", "open source"]

{{publidetails .}}

This paper is a spin off of Gustavo's PhD thesis.
Gustavo's thesis proposal focused primarily on network-based neurofeedback training of attention[^1].
The assignment of ICA spatial-components into Resting-State networks could be facilitated by an easy to use tool.
That's the gap Personode[^2] was created to fill.

Personode is written in MATLAB and basically helps you to match ICA components with resting-state networks templates.
The matching is supervised, meaning that you get a hint based on spatial similarity, but the final choice is user-informed.
After matching, Personode can be used to extract personalized ROI definitions, either as thresholded clusters or as spheres centered on maximal likelihood, at the group- or individual-level.
Personode removes some of the ambiguity in RSNs identification.
It can be a tool for reproducibility in neuroimaging.

Gustavo envisioned the project, developed the tool, wrote the paper and ran all experiments.
My role in the paper was solely rounding off some rough edges, documentation, distribution and reviewing.
Personode is open-source, and can be extended in the future depending on the community necessities.


## Abstract

> Canonical resting state networks (RSNs) can be obtained through independent component analysis (ICA). RSNs are reproducible across subjects but also present inter-individual differences, which can be used to individualize regions-of-interest (ROI) definition, thus making fMRI analyses more accurate. Unfortunately, no automatic tool for defining subject-specific ROIs exists, making the classification of ICAs as representatives of RSN time-consuming and largely dependent on visual inspection. Here, we present Personode, a user-friendly and open source MATLAB-based toolbox that semi-automatically performs the classification of RSN and allows for defining subject- and group-specific ROIs. To validate the applicability of our new approach and to assess potential improvements compared to previous approaches, we applied Personode to both task-related activation and resting-state data. Our analyses show that for task-related activation analyses, subject-specific spherical ROIs defined with Personode produced higher activity contrasts compared to ROIs derived from single-study and meta-analytic coordinates. We also show that subject-specific irregular ROIs defined with Personode improved ROI-to-ROI functional connectivity analyses.
> Hence, Personode might be a useful toolbox for ICA map classification into RSNs and group- as well as subject-specific ROI definitions, leading to improved analyses of task-related activation and functional connectivity.

[^1]: [G.S.P. Pamplona, et al., Network-based fMRI-neurofeedback training of sustained attention, NeuroImage, 2020, https://doi.org/10.1016/j.neuroimage.2020.117194](https://doi.org/10.1016/j.neuroimage.2020.117194).
[^2]: [https://github.com/gustavopamplona/Personode](https://github.com/gustavopamplona/Personode)