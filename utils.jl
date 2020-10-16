using Dates

function hfun_bar(vname)
  val = Meta.parse(vname[1])
  return round(sqrt(val), digits=2)
end

function hfun_m1fill(vname)
  var = vname[1]
  return pagevar("index", var)
end

function lx_baz(com, _)
  # keep this first line
  brace_content = Franklin.content(com.braces[1]) # input string
  # do whatever you want here
  return uppercase(brace_content)
end

"""
    {{blogposts}}

Plug in the list of blog posts contained in the `/posts/` folder.
Copied directly from https://github.com/JuliaLang/www.julialang.org, under the MIT license
"""
function hfun_blogposts()
    curyear = year(Dates.today())
    io = IOBuffer()
    for year in curyear:-1:2020
        ys = "$year"
        year < curyear && write(io, "\n**$year**\n")
        for month in 12:-1:1
            ms = "0"^(month < 10) * "$month"
            base = joinpath("blog", ys, ms)
            isdir(base) || continue
            posts = filter!(p -> endswith(p, ".md"), readdir(base))
            days  = zeros(Int, length(posts))
            lines = Vector{String}(undef, length(posts))
            for (i, post) in enumerate(posts)
                ps  = splitext(post)[1]
                url = "/blog/$ys/$ms/$ps/"
                surl = strip(url, '/')
                title = pagevar(surl, :title)
                date    = pagevar(surl, :rss_pubdate)
                if isnothing(date)
                    date    = "$ys-$ms-01"
                    days[i] = 1
                else
                    days[i] = day(date)
                end
                lines[i] = "\n[$title]($url) $date \n"
            end
            # sort by day
            foreach(line -> write(io, line), lines[sortperm(days, rev=true)])
        end
    end
    # markdown conversion adds `<p>` beginning and end but
    # we want to  avoid this to avoid an empty separator
    r = Franklin.fd2html(String(take!(io)), internal=true)
    return r
end

"""
    {{publications}}

Plug in the list of publications contained in the `/publications/` folder.
"""
function hfun_publications()
    curyear = year(Dates.today())
    io = IOBuffer()
    # year < curyear && write(io, "\n**$year**\n")
    posts = filter!(p -> endswith(p, ".md"), readdir("publications"))
    days  = Vector{Date}(undef, length(posts))
    lines = Vector{String}(undef, length(posts))
    for (i, post) in enumerate(posts)
        ps  = splitext(post)[1]
        url = "/publications/$ps/"
        surl = strip(url, '/')
        title = pagevar(surl, :title)
        doi = pagevar(surl, :doi)
        date    = pagevar(surl, :rss_pubdate)
        journal = pagevar(surl, :journal)
        authors = pagevar(surl, :authors)
        authors = replace(authors, "B.H. Vieira" => "**B.H. Vieira**")
        if isnothing(date)
            date    = ""
            days[i] = 1
        else
            days[i] = date
        end
        
        plumx_badge = retrieve_plumx_badge(doi, "medium")
        
        lines[i] = publiline(plumx_badge, title, url, authors, journal, date)
    end
    # sort by day
    foreach(line -> write(io, line), lines[sortperm(days, rev=true)])
    # markdown conversion adds `<p>` beginning and end but
    # we want to  avoid this to avoid an empty separator
    r = Franklin.fd2html(String(take!(io)), internal=true, nop = true)
    return r
end

publiline(plumx_badge, title, url, authors, journal, date) = """~~~<div class="container">
                <div class="header-0">$plumx_badge</div>
                <div class="header-1">~~~ [$title]($url) ~~~</div>
                <div class="right"><sub>~~~ $authors -- *$journal* - $date ~~~</sub></div></div>~~~"""

"""
    {{shortref rpath}}

Use elements in rpath to build a simple shortref to be reused.
"""
function hfun_shortref(rpath)
    path = rpath[1]
    surl = strip(path, '/')
    title = pagevar(surl, :title)
    journal = pagevar(surl, :journal)
    date = pagevar(surl, :rss_pubdate)
    Franklin.fd2html("""[$title](/$surl), $journal, $date""", internal = true, nop = true)
end

"""
    {{publidetails}}

Retrieve publication details and make it into text.
"""
function hfun_publidetails(rpath)
    authors = locvar(:authors)
    authors = replace(authors, "B.H. Vieira" => "**B.H. Vieira**")

    doi = locvar(:doi)
    isopenaccess = locvar(:isopenaccess)

    doi_line = """<span title="DOI"><i class="ai ai-fw ai-doi"></i><a href="https://dx.doi.org/$(doi)" rel="nofollow noopener noreferrer">$(doi)</a></span>"""
    if isopenaccess
        oa_status = """<span title="Open Access"><i class="ai ai-fw ai-open-access"></i>Open Access</a></span>"""
    else
        oa_status = """<span title="Closed Access"><i class="ai ai-fw ai-closed-access"></i>Closed Access</a></span>"""
    end
    plumx_badge = retrieve_plumx_badge(doi, "medium")
    Franklin.fd2html("""## {{title}}
    \\publidetails{$authors}{journal}{rss_pubdate}{$oa_status}{$doi_line}{$plumx_badge}
    """, internal = true, nop = true)
end

retrieve_plumx_badge(doi) = """<span style="inline;"><a href="https://plu.mx/plum/a/?doi=$(doi)" data-popup="bottom" data-size="small" data-badge="false" class="plumx-plum-print-popup plum-bigben-theme" data-site="plum" data-hide-when-empty="true"></a></span>"""
retrieve_plumx_badge(doi, size) = """<span style="inline;"><a href="https://plu.mx/plum/a/?doi=$(doi)" data-popup="bottom" data-size="$(size)" data-badge="false" class="plumx-plum-print-popup plum-bigben-theme" data-site="plum" data-hide-when-empty="true"></a></span>"""