@def rss_pubdate = Date(2020, 5, 1)
@def rss = """ Evidence of regional associations between age-related inter-individual differences in resting-state functional connectivity and cortical thinning revealed through a multi-level analysis """
@def published = "1 May 2020"
@def title = "Evidence of regional associations between age-related inter-individual differences in resting-state functional connectivity and cortical thinning revealed through a multi-level analysis"
@def authors_post = "C. Rondinoni, C.E.G. Salmon"
@def journal = "NeuroImage"

## {{title}}
~~~<sup>~~~
{{if {{isdef authors_pre}}}}
{{if {{isdef authors_post}}}}
    {{authors_pre}}, **B.H. Vieira**, {{authors_post}}
{{else}}
    {{authors_pre}}, **B.H. Vieira**
{{end}}
{{else}}
{{if {{isdef authors_post}}}}
    **B.H. Vieira**, {{authors_post}}
{{else}}
    **B.H. Vieira**
{{end}}
{{end}}
, _{{journal}}_, {{rss_pubdate}}
~~~</sup>~~~



