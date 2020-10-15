@def title = "Publications"
@def date = Date(2020, 9, 16)
@def rss = ""

\\

~~~
<style>
.grid {
  display: grid;
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-gap: 1rem;
}

.container {
  background: #f2f2f2;
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-areas: "header-0 header-1"
  "right right";
  font-size: 0.9em;
  line-height: 1.1rem;
  border-radius: 5px;
  text-align:left;
  grid-template-columns: 1fr 15fr;
  grid-template-rows: repeat(auto-fill, 1fr);
}

.header-0 {
  grid-area: header-0;
  align-self: center;
  padding: 0.5rem 0.5rem 0rem 1rem;
}
.header-1 {
  grid-area: header-1;
  padding: 0.5rem 0.5rem 0rem 1rem;
}
.right {
  grid-area: right;
  padding: 0.5rem 0.5rem 1rem 1rem;
}

</style>
<div class="grid">
~~~

{{publications}}

~~~
</div>
~~~
