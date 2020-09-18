@def rss_pubdate = Date(2018, 2, 22)
@def rss = """ Brain functional connectivity in regions with cortical thinning linked to healthy aging """
@def published = "22 February 2017"
@def title = "Brain functional connectivity in regions with cortical thinning linked to healthy aging (Dissertation)"
@def journal = "University of São Paulo"

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







