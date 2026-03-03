@def rss_pubdate = Date(2026, 02, 23)
@def rss = """ The influence of sample size and covariate distributions on neuroanatomical normative modeling """
@def published = "23 Feb 2026"
@def title = "The influence of sample size and covariate distributions on neuroanatomical normative modeling"
@def authors = "C. Elleaume, B.H. Vieira, D.L. Floris, N. Langer"
@def journal = "eLife"
@def doi = "10.7554/eLife.108952.3.sa0 "
@def isopenaccess = true
@def tags = [""]


{{publidetails .}}

## Abstract

> Normative models are increasingly used to characterize individual-level brain deviations in neuroimaging studies, but their performance depends heavily on the reference sample used for training or adaptation. In this study, we systematically investigated how sample size and covariate composition of the reference cohort influence model fit, deviation estimates, and clinical readouts in Alzheimer's disease (AD). Using a discovery dataset (OASIS-3, n = 1032), we trained models on healthy control (HC), subsamples ranging from 5 to 600 individuals, while varying age and sex distributions to simulate biases in reference populations. We further assessed the use of adaptive transfer learning by pre-training models on the UK Biobank (n = 42,747) and adapting them to the clinical dataset applying the same subsampling strategies. We evaluated model performance on a fixed HC test set and quantified deviation score errors, outlier detection, and classification accuracy in both the HC test set and the AD cohort. The findings were replicated in an external validation sample (AIBL, n = 463). Across all settings, model performance improved with increasing sample size, but demographic alignment of the covariates, particularly in age, was essential for reliable deviation estimates. Models trained directly within the dataset achieved stable fit with approximately 200 HCs, while adapted models reached comparable performance with as few as 50 individuals when pre-trained on large-scale data. These results show that robust individual-level modeling can be achieved using moderately sized but demographically matched cohorts, supporting broader application of normative modeling in aging and neurodegeneration research.
