@def rss_pubdate = Date(2024, 11, 28)
@def rss = """ A deep learning approach for automated scoring of the Rey-Osterrieth complex figure """
@def published = "11 Mar 2024"
@def title = "A deep learning approach for automated scoring of the Rey-Osterrieth complex figure"
@def authors = "N. Langer, M. Weber, B.H. Vieira, et al."
@def journal = "eLife"
@def doi = "10.7554/eLife.96017.3"
@def isopenaccess = true
@def tags = [""]


{{publidetails .}}

## Abstract

> Memory deficits are a hallmark of many different neurological and psychiatric conditions. The Rey-Osterrieth complex figure (ROCF) is the state-of-the-art assessment tool for neuropsychologists across the globe to assess the degree of non-verbal visual memory deterioration. To obtain a score, a trained clinician inspects a patient's ROCF drawing and quantifies deviations from the original figure. This manual procedure is time-consuming, slow and scores vary depending on the clinician's experience, motivation, and tiredness. Here, we leverage novel deep learning architectures to automatize the rating of memory deficits. For this, we collected more than 20k hand-drawn ROCF drawings from patients with various neurological and psychiatric disorders as well as healthy participants. Unbiased ground truth ROCF scores were obtained from crowdsourced human intelligence. This dataset was used to train and evaluate a multihead convolutional neural network. The model performs highly unbiased as it yielded predictions very close to the ground truth and the error was similarly distributed around zero. The neural network outperforms both online raters and clinicians. The scoring system can reliably identify and accurately score individual figure elements in previously unseen ROCF drawings, which facilitates explainability of the AI-scoring system. To ensure generalizability and clinical utility, the model performance was successfully replicated in a large independent prospective validation study that was pre-registered prior to data collection. Our AI-powered scoring system provides healthcare institutions worldwide with a digital tool to assess objectively, reliably, and time-efficiently the performance in the ROCF test from hand-drawn images.
