@def rss_pubdate = Date(2021, 03, 05)
@def rss = """ Hat tip: why and how the hat matrix makes things easier """
@def title = "Hat tip: why and how the hat matrix makes things easier"
@def tags = ["linear-regression", "statistics", "glm"]

{{blogdetails .}}

\toc

## Intro

As most of my posts, this one is about linear modeling.
I really believe that linear modeling is an under-appreciated discipline in today's machine learning mainstream.
Also, as most of my posts, this one starts with [a question in Cross Validated](https://stats.stackexchange.com/questions/510171/proof-that-regression-sum-of-squares-and-residual-sum-of-squares-are-independent/510245#510245).
I also believe that Cross Validated is under-appreciated, but I digress.

So, the question is simple: how to show that the residual sum of squares (RSS) and the explained sum of squares (ESS) are independent random variables?
I really wanted to answer this one, because it is fundamental, but from the start, it seemed quite clear that only an algebraic treatment would be feasible.
This is due to quadratic forms that arise naturally in the problem, as you will see below.

@@colbox-blue
This was an important assumption in ["The F-test and R²: an introduction from the ground up"](/blog/2020/10/FstatisticVsR2).
I'll say it again to make the connection obvious here: the ratio of two *independent* Chi-square random variables is F-distributed.
@@

Let's state then what we have, shall we?

$$
y \sim \operatorname{Normal}(\beta X, \Sigma = \sigma^2 \mathbb I)\\
$$

This is our model, a plain, old, linear regression.
Notice that we state it as a conditional distribution, where the expectation of the outcome is given by the linear combination of predictors $\beta X$ and there is zero covariance between outcomes, which have a constant $\sigma^2$ variance attached.
We could augment it, of course.
But, from the treatment I'll expose below it'll become more obvious how it's actually a simple procedure.

So, regarding the problem statement, here are RSS and ESS:

$$
\begin{cases}
\text{RSS} = \sum_{i=1}^n (y_i - \hat y_i)^2\\
\text{ESS} = \sum_{i=1}^n (y_i - \bar y)^2\\
\end{cases}
$$

Where $\hat y_i = \beta X_i$ and $\bar y = E(y) = \frac{1}{n}\sum_{i=1}^n y_i$.

So, how one goes on to show that RSS and ESS are uncorrelated?

## The hat treatment

Even though the description of RSS and ESS are intuitive from their mathematical descriptions, let's take one step back (and add Algebra to the mix, making everything harder to read, though easier to solve).

So, what's $\beta$ again?
It's the solution to the problem, and it can be obtained in analytical form (I showed you how in: ["Enter the Ridge: derivation and properties"](/blog/2020/11/RidgeOLS/)) :

$$\beta = yX^T(XX^T)^{-1}$$

With that we can retrieve the expected, or "fitted", values:

$$\hat y = \beta X = yX^T(XX^T)^{-1}X$$

Notice something peculiar?
The fitted values $\hat y$ can be written explicitly as a linear combination of the original values $y$.
In fact, if we define $H = X^T(XX^T)^{-1}X$, then $\hat y = yH$.

We call this matrix $H$ the hat matrix.
It's a square matrix.
It's very useful to demonstrate Gaussian linear regression properties.
It also measure something called leverage: literally the leverage each original value in $y$ has on the prediction of itself.
Technically, it's simply the partial derivative $\partial \hat y_i/\partial y_i $.

Some neat properties can be attested outright:

$$H^2 = (X^T(XX^T)^{-1}X)(X^T(XX^T)^{-1}X)\\= X^T(XX^T)^{-1}(XX^T)(XX^T)^{-1}X\\=X^T(XX^T)^{-1}X=H$$

The hat matrix is idempotent!

$$H^T = (X^T(XX^T)^{-1}X)^T = X^T(XX^T)^{-T}X = X^T(XX^T)^{-1}X = H$$

The hat matrix is symmetric!

So, as I promised you, using this makes things easier.
Let's rewrite RSS and ESS.
But first we must state them algebraically.

$$
\text{RSS} = \epsilon\epsilon^T = (y - \hat y)(y - \hat y)^T = (y - yH)(y - yH)^T \\= y(I - H)^2y^T = y(I - H)y^T
$$

Because  $(I - H)^2 = I^2 + 2H - H^2 = I - 2H + H = I - H$.

$$
\text{ESS} = (\hat y - 1\mu)(\hat y - 1\mu)^T= \hat y\hat y^T - \mu 1^T \hat y - \mu \hat y 1^T + \mu^2 11^T\\
yHH^Ty^T - n \mu^2  - n \mu^2 + n \mu^2 = yHy^T - n \mu^2
$$

So there we have it, $\text{RSS} = y(I - H)y^T$ and $\text{ESS} = yHy^T - n \mu^2$.
That $I-H$ term in the RSS might give you a hint they are uncorrelated, since ESS has simply a $H$.
Now, how to prove they are uncorrelated?

## Computing the covariance

The covariance is "simply" (haha) given by

$$\operatorname{Cov}(\text{RSS},\text{ESS})=\operatorname{Cov}(y(I - H)y^T,yHy^T - n \mu^2)\\=\operatorname{Cov}(y(I - H)y^T,yHy^T)$$

Note that for symmetric matrices $A,B$:

The covariance between quadratic forms[^1] is given by:

$$\operatorname{Cov}(xAx^T,xBx^T) = 2\operatorname{tr}(A \Sigma B \Sigma) + 4 \mu A \Sigma B \mu^T$$

Plugging $A = (I - H)$ and $B = H$ we retrieve:

$$\operatorname{Cov}(y(I - H)y^T,yHy^T) = 2\operatorname{tr}((I - H) \Sigma H \Sigma) + 4 \mu (I - H) \Sigma H \mu^T$$

Using the fact that $\Sigma = \sigma^2 I$

$$\operatorname{Cov}(y(I - H)y^T,yHy^T) = 2\sigma^4\operatorname{tr}((I - H) H) + 4 \sigma^2 \mu (I - H) H \mu^T\\
=2\sigma^4\operatorname{tr}(H - H^2) + 4 \sigma^2 \mu (H - H^2) \mu^T$$

But $H - H^2 = 0$, so:
$$\operatorname{Cov}(y(I - H)y^T,yHy^T) = 0$$

## Conclusions

To be frank, I am not even sure if a similar proof can be easily obtained without using the hat matrix.
I hope that this post convinces you that the hat matrix helps a lot on the statistical treatment of linear regression.
It also makes clear where different assumptions could be plugged in, *e.g.* $\Sigma \neq \sigma^2 I$.

[^1]: This proof is a bit longer, might be subject for another post in the future. See *"Graybill, Franklin A. Matrices with applications in statistics. 1983"*.