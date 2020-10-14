@def rss_pubdate = Date(2017, 8, 17)
@def rss = """ Pattern recognition of abscesses and brain tumors through MR spectroscopy: Comparison of experimental conditions and radiological findings """
@def published = "17 August 2017"
@def title = "Pattern recognition of abscesses and brain tumors through MR spectroscopy: Comparison of experimental conditions and radiological findings"
@def authors = "B.H. Vieira, A.C. dos Santos, C.E.G. Salmon"
@def journal = "Research on Biomedical Engineering"

{{publidetails .}}

This was my first paper, based on research I performed while an undergrad in Medical Physics.
One of the major subjects in Medical Physics is the diagnosis and treatment of tumors.
Brain tumors, specifically, require special care due to their characteristics.

<!-- 
Brain tumors are either primary (originating within the brain) or secondary (originating outside the brain).
Primary tumors may originate from different cells.
The most common, however, originate in glial, _i.e._ support cells, and are therefore called gliomas.
Gliomas can be further subdivided depending on their specific tissue of origin.
Glioma grading is based on cell appearance and clinical evaluation, where severe cases are graded III-IV (for example, anaplastic astrocytomas or glioblastomas multiformes), and less severe ones are graded I-II. -->

The golden-standard diagnosis is given by an invasive biopsy.
To decrease delays in diagnosis (due to the laboratorial nature of biopsies) and invasiveness (biopsies may need to be performed multiple times), alternative techniques can be used to support diagnosis.

Using magnetic resonance spectroscopy to infer metabolite profiles in a cohort of brain tumors, we employed machine learning to help in the classification between meningiomas, grade I-III gliomas, grade IV gliomas, metastases and also brain abscesses.
We study data acquired at short and long TE and at 1.5T and 3.0T.

With a few exceptions, we've shown that high AUC can be achieved for many classifications in differential fashion based solely on subjects MRS data.
Imaging and clinical data could further enhance diagnostic value of MRS.

## Abstract
> ### Introduction
> The interpretation of brain tumors and abscesses MR spectra is complex and subjective. In clinical practice, different experimental conditions such as field strength or echo time (TE) reveal different metabolite information. Our study aims to show in which scenarios magnetic resonance spectroscopy can differentiate among brain tumors, normal tissue and abscesses using classification algorithms.
> ### Methods
> Pairwise classification between abscesses, brain tumor classes, and healthy subjects tissue spectra was performed, also the multiclass classification between meningiomas, grade I-II-III gliomas, and glioblastomas and metastases, in 1.5T short TE (n = 195), 1.5T long TE (n = 231) and 3.0T long TE (n = 59) point resolved spectroscopy setups, using LCModel metabolite concentration as input to classifiers.
> ### Results
> Areas under the curve of the Receiver Operating Characteristic above 0.9 were obtained for the classification between abscesses and all classes except glioblastomas, reaching 0.947 when classifying against metastases, grade I-II gliomas and glioblastomas (0.980), meningiomas and glioblastomas (0.956), grade I-II gliomas and metastases (0.989), meningiomas and metastases (0.990), and between healthy tissue and all other classes in both conditions except for anaplastic astrocytomas in short TE 1.5T setup. When the multiclass classification agrees with radiological diagnosis the accuracy reaches 96.8% for short TE and 98.9% for long TE.
> ### Conclusions
> The results in the three conditions were similar, highlighting comparable quality, robust quantification and good regularization and flexibility in either algorithm. Multiclass classification provides useful information to the radiologist. These findings show the potential of the development of decision support systems as well as tools for the accompaniment of treatments.




