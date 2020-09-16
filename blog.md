@def title = "The Weblog"
@def author = "Bruno Hebling Vieira"

I decided to add a Weblog[^1] to my site for a few reasons.

[^1]: Blog is a shortened form of web-log, see [Wiktionary](https://en.wiktionary.org/wiki/blog)
\\

~~~
<style>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 1rem;
}

.grid > h2, .grid > p {
  background: #f2f2f2;
  padding: 0.5rem 0.5rem 1rem 0.5rem;
  font-size: 0.9em;
  line-height: 1.1rem;
  border-radius: 5px;
  text-align:left;
}

.grid > p a {
  display: block;
  padding-bottom: 0.5em;
}

</style>
<div class="grid">
~~~

{{blogposts}}

~~~
</div>
~~~
