@def rss_pubdate = Date(2019, 1, 1)
@def rss = """ A principled multivariate intersubject analysis of Generalized Partial Directed Coherence with Dirichlet Regression: application to healthy aging in areas exhibiting cortical thinning """
@def published = "1 January 2019"
@def title = "A principled multivariate intersubject analysis of Generalized Partial Directed Coherence with Dirichlet Regression: application to healthy aging in areas exhibiting cortical thinning"
@def authors_post = "C.E.G. Salmon"
@def journal = "Journal of Neuroscience Methods"

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






