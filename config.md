<!--
Add here global page variables to use throughout your
website.
The website_* must be defined for the RSS to work
-->
@def website_title = "Bruno Hebling Vieira"
@def website_descr = "Bruno Hebling Vieira personal page"
@def website_url   = "https://bhvieira.github.io/"

@def author = "Bruno Hebling Vieira"

@def mintoclevel = 2

<!--
Add here files or directories that should be ignored by Franklin, otherwise
these files might be copied and, if markdown, processed by Franklin which
you might not want. Indicate directories by ending the name with a `/`.
-->
@def ignore = ["node_modules/", "franklin", "franklin.pub"]

<!--
Add here global latex commands to use throughout your
pages. It can be math commands but does not need to be.
For instance:
* \newcommand{\phrase}{This is a long phrase to copy.}
-->
\newcommand{\publidetails}[6]{
                ~~~
                <sup>
                <div class="publidetailscontainer">
                    <div class="publleft"> #6 </div>
                    <div class="publright"> #1, <i>#2</i>, #3 <br> #4#5 </div>
                </div>
                </sup>
                ~~~}

