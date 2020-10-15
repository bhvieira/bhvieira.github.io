@def title = "Publications"
@def date = Date(2020, 9, 16)
@def rss = ""


~~~
<style>
.grid {
  display: grid;
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-gap: 0.3rem;
}

.grid > h2, .grid > p {
  background: #f2f2f2;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  font-size: 0.9em;
  line-height: 1.1rem;
  border-radius: 5px;
  text-align:left;
}

.grid > p a {
  display: block;
  padding-bottom: 0.5em;
}


.container {
  background: #f2f2f2;
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-areas: "header-0 header-1"
  "right right";
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  font-size: 0.9em;
  line-height: 1.1rem;
  border-radius: 5px;
  text-align:left;
  grid-template-columns: 1fr 15fr;
  grid-template-rows: repeat(auto-fill, 1fr);
  padding-bottom: 0.5em;
  grid-gap: 0.3rem;
}

.header-0 {
  grid-area: header-0;
  align-self: center;
}
.header-1 {
  grid-area: header-1;
}
.right {
  grid-area: right;
  padding-bottom: 0.5em;
}

</style>
<div class="grid">
~~~

{{publications}}

~~~
</div>
~~~
