@def rss_pubdate = Date(2020, 12, 9)
@def rss = """ What is (not) a Generalized Linear Model? """
@def title = "What is (not) a Generalized Linear Model?"
@def tags = ["linear-regression", "statistics", "glm"]

{{blogdetails .}}

\toc

## Intro

As most of my posts, this one was, too, motivated by [a post of mine in Cross-Validated](https://stats.stackexchange.com/q/304538/60613).
This one in particular, a question, kind of bugged me.
We all know (we kinda do, not gonna lie) what are, properly, generalized linear models (GLM).
But when we find something that looks like a GLM and find out it isn't, it makes me wonder:
how to define what actually *is* a GLM?

So I'll break down this post into what is a GLM, then I'll give an example that left me scratching my head and then I'll close with an authoritative reference.

## The Generalized Linear Model

The names kind of gives away what to expect here, but doesn't tell the whole story.
It's a model, huh?
And it's linear.
Fine, it's a linear model then!
And then it can be generalized.
I mean, that doesn't give away much.
In what way is it generalized?

First, we must understand that the linear regression we all love (and that is surreptitiously everywhere) corresponds to a specific probabilistic assumption.

Let's state a problem:
$y$ is our dependent variable, $X$ are our independent variables.
We define that the distribution of $y$ conditional on $X$ is Gaussian.
We assume that the expected value for an datum $y_i$ is given by $\beta X_i$, while their variance are constant, set at $\sigma^2$.

$$y_i \sim \mathcal N(\beta X_i, \sigma^2) $$

@@colbox-blue
The fact that $y$ is conditionally Gaussian does not mean that, taken together, the individual $y$'s are Gaussian-distributed!
This is the distinction between conditional and marginal distribution.
$y$ still accommodates arbitrary marginal distribution.
@@

We then define the log-likelihood:

$$\ell_i = \log p(y_i; \mu, \sigma^2)
=\log \left(\frac{1}{\sigma \sqrt{2\pi}}e^{-\frac{1}{2}\left(\frac{y_i-\beta X_i}{\sigma}\right)^2}\right)\\
=-\frac{1}{2}\log 2\pi -\frac{1}{2}\log \sigma^2 -\frac{1}{2}\left(\frac{y_i-\beta X_i}{\sigma}\right)^2$$

We then maximize the log-likelihood, with regards to the parameters $\beta$.
Since $\sigma^2$ is constant, it vanishes from the problem (it can still be estimated, however).

$$\hat\beta = \argmax_\beta \sum_i \ell_i=\argmin_\beta \sum_i\left(y_i-\beta X_i\right)^2$$

That last term is simply the mean-squared error (MSE).
So, we've shown that the ordinary least squares problem corresponds to maximizing a Gaussian likelihood on data.
Neat.
But there's a problem still: what if we kinda know that $y_i$ is not Gaussian?

Common distributions we will find in data are Poisson (*e.g.* count data), Binomial (*e.g.* proportion of successes), Bernoulli (*e.g.* binary trial), Gamma (*e.g.* continuous strictly positive data, intervals).
What do all these distributions have in common?
**They are family!**
More specifically, they are part of the exponential family.

The requirement to be accepted in the family is simple:
if your probability density function can be written like below, you are in.

Given the base measure $h$, log-partition $A$, natural parameter $\eta$ and sufficient statistic $T$:

$$f(x; \theta) = h(x) \exp \left( \eta(\theta) \cdot T(x) - A(\theta) \right)$$

$h$ and $A$ are scalar, while $x$ and $T$, and $\theta$ and $\eta$ can accommodate vectors in multivariate/multiparameters distributions.

A simple example, with scalar parameter and scalar $x$ would be a Gaussian with known variance $\sigma^2$.
In this case, the only parameter is $\theta = \mu$.

$$f(x; \mu, \sigma) = \frac{1}{\sqrt{2\pi\sigma^2}}\exp{\left(-\frac{1}{2}\frac{\left(x-\mu\right)^2}{\sigma^2}\right)}=\\
{\color{LimeGreen}\frac{1}{\sqrt{2\pi\sigma^2}}
\exp{\left(-\frac{1}{2}\frac{x^2}{\sigma^2}\right)}}
\exp{\left({\color{RoyalBlue}\frac{\mu}{\sigma}}{\color{Purple}\frac{x}{\sigma}}-{\color{Orange}\frac{1}{2}\frac{\mu^2}{\sigma^2}}\right)}=\\
{\color{LimeGreen}h(x)} \exp \left( {\color{RoyalBlue}\eta(\theta)} \cdot {\color{Purple}T(x)} - {\color{Orange}A(\theta)} \right)$$

Wikipedia supplies [a comprehensive list of distributions](https://en.wikipedia.org/wiki/Exponential_family#Table_of_distributions).

You'll find, in that list, that Beta and Dirichlet distributions are included in the family.
Which is great.
Right?
It allows us to design a GLM that uses these distributions to solve problems involving ratios.

The Beta distribution arises naturally as the ratio of independent Gamma distributions and can be used to model ratios of positive variables.

$$\frac{X}{X+Y} \sim \operatorname{Beta}(\alpha, \beta), \qquad X \sim \operatorname{Gamma}(\alpha, \theta), \qquad Y \sim \operatorname{Gamma}(\beta, \theta)$$

The Dirichlet distribution generalizes the Beta distribution to a multivariate ratio.

So... what's the problem?

When you fit a GLM in any language you will notice that the Beta and Dirichlet distributions are missing.
You'll probably also notice that they have packages dedicated to them[^1].
They operate just like GLMs would, their distributions are in the exponential family, and yet they are not GLMs!

## What is missing?

McCullagh and Nelder's GLM is essentially composed of three components:
1. A distribution in the exponential family
2. A linear predictor
3. A link function

We went through point one in the exposition of the exponential family.
The linear predictor is usually denoted by $\eta = X\beta$.
It's a linear combination of independente variables in $X$.
The link function $g$ simply relates the expectancy with the linear predictor: $\mathbb E(y|X)= \mu = g^{-1}(\eta)$.

If you follow the exposition of the Beta Regression in Ferrari & Cribari-Neto, 2004[^2] you'll notice the authors follow many steps in common with our expectation regarding M&N's GLM.

When they derive the log-likelihood, however, to obtain update equations for the parameters in their model, they note that the parameters of the model (the precision $\phi$ and regression parameters $\beta$) are not orthogonal.
In M&N's GLM, however, the opposite was true and these parameters always end up orthogonal.

This is not so easy to see, and I might try to expose it in a better way in a later post.
But I refer you to the original work.

In any case, this means that we cannot decouple $\beta$ and $\phi$, and this is the utmost distinction that separates M&N's GLMs from other regression models.

As [Achim Zeileis (author of R's `betareg`) put it](https://stats.stackexchange.com/questions/304538/why-beta-dirichlet-regression-are-not-considered-generalized-linear-models#comment578958_304545):

> The orthogonality requirement in GLMs is important: It means that you can estimate the equation $g(μ)=x^⊤β$ without worrying about misspecifying the rest of the likelihood. Parameter estimates are consistent if the mean equation above is correctly specified. Inference is valid if additionally the variance is correctly specified. However, in beta regression you cannot separate the two model equations in this way, even if ϕ is just a constant. For consistent results everything has to be specified correctly.
> [CC SA-BY 3.0](https://creativecommons.org/licenses/by-sa/3.0/)

Surely, the distinction is important, but it alludes to the history of GLMs.
This class of models was, in a way, "reverse engineered" as the models that were solvable by approximate or exact Newton-Raphson class algorithms (including Iteratively Reweighted Least Squares, or Fisher Scoring).
After all, as I alluded in other posts, linear regression is surreptitiously everywhere.

From a practical point of view, given professor Zeileis warning, not much changes.
I still treat Beta Regression as a quasi-GLM, in the applied side of things the difference is mostly history/semantics.
[Or, as Tim said it](https://stats.stackexchange.com/a/304545/60613):

> So while the model looks like a GLM and quacks like a GLM, it does not perfectly fit the framework. 
> [CC SA-BY 3.0](https://creativecommons.org/licenses/by-sa/3.0/)

This post got a bit longer than I envisioned and it is missing some context (left as an exercise to the reader?).
I'm considering adding some other posts on this (including the derivation of Beta Regression), so if you are interested, consider sending me an email!
See you in the next one!


[^1]: see [betareg](https://cran.r-project.org/web/packages/betareg/index.html) and [DirichletReg](https://cran.r-project.org/web/packages/DirichletReg/index.html) for R, for example.
[^2]: Ferrari, S., & Cribari-Neto, F. (2004). Beta regression for modelling rates and proportions. Journal of Applied Statistics, 31(7), 799-815.
