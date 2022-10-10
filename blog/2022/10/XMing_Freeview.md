@def rss_pubdate = Date(2022, 10, 10)
@def rss = """ Troubleshooting: Freesurfer surfaces with Freeview through XMing """
@def title = "Troubleshooting: Freesurfer surfaces with Freeview through XMing"
@def tags = ["mri", "freesurfer", "processing", "howto"]

{{blogdetails .}}

\toc

## TLDR

@@colbox-blue
If you are having trouble with rendering surfaces in Freeview through Xming 6.9.0.31, try the following, try it with Xming-mesa 6.9.0.31.
@@

## Problem

In my workflow, I use Freeview to visualize surfaces in Freesurfer.
Freesurfer is in a remote server, and I use XMing to display the GUI in my local machine.
I use the last free version of XMing, which is 6.9.0.31.

This resulted in the following renders:

![](/blog/2022/10/XMing_Freeview_0.png)

The surface renders are not correct, with lots of missing triangles.

Using Xming in another machine, I was not able to reproduce the problem, thus discarding the possibility of a problem with the server.

## Solution

Xming used to have a version called Xming-mesa, which provides support for OpenGL.
Version 6.9.0.31 was released back in 2007, and it is the last release not to require a license (``Donor Password``) to use[^1].
I was using the OpenGL version previously.
Using Xming-mesa the problem was solved:

![](/blog/2022/10/XMing_Freeview_1.png)

The Xming (non-mesa) version supports application that rely on X calls, but not OpenGL.

## References

[^1]: http://www.straightrunning.com/xmingnotes/