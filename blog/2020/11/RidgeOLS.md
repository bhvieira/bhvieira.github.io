@def rss_pubdate = Date(2020, 11, 01)
@def rss = """ Enter the Ridge: derivation and properties """
@def title = "Enter the Ridge: derivation and properties"
@def tags = ["linear regression", "statistics", "regularization", "ridge", "machine learning"]

{{blogdetails .}}

\toc

## Intro

Ridge regression is a linear (on parameters) regression technique.
It was popularized in machine learning circles by Friedman, Hastie, Tibshirani and company, with the introduction of the elastic-net, that generalizes the Ridge when the LASSO weighting is set to zero.
It's often taken as the benchmark that other algorithms are compared to, since it's a powerful yet simple technique that gives good results in practice.
But it's root lay on deeper grounds.
It's an estimation technique that trades reductions in variance for tolerable increases in bias.

One of it's main selling points is that it's a strictly convex optimization problem.
That means that it has a single optimum solution, the global one.
This solution can be found using the normal equations from ordinary least squares (OLS).
Let's start from there.

## The ordinary least squares (OLS)

Arguably, linear regression is the first learning algorithm.
It can also be shown to be at the basis of most statistical inference (sometimes quite out of sight).
The problem statement is simple: minimize the residual sum of squares in the model below.

$$y = \beta X + \epsilon$$

$y$, $\beta$ and $epsilon$ are row vectors, $X$ is a matrix with independent variables as rows and samples as columns.
Our objective function, the residual sum of squares then is simply $\epsilon\epsilon^T$.

$$\mathcal L_\text{OLS} = \|\epsilon\|_2^2 = \sum_i^N (y_i-\beta X_i)^2 = \epsilon\epsilon^T =\\ (y - \beta X)(y - \beta X)^T$$

The minimum can be found by taking the derivative regarding $\beta$:

$$\frac{\partial}{\partial \beta}\left(\epsilon\epsilon^T\right)=-2X(y-\beta X)^T$$

Setting this to zero we retrieve:

$$yX^T=\beta XX^T$$

Solving for $\beta$:

$$\beta = yX^T(XX^T)^{-1}$$

## The Ridge Regression problem statement

We obtained an estimator for the OLS coefficients.
As all estimators, it has associated variance (the precision, the spread of the estimate's distribution) and bias (the accuracy, or the difference between the estimate and the true parameter).
On bias, actually, the OLS estimator is unbiased.
On the other hand, depending on the problem it can have quite large variance.
For example, ill-posed ($ n < p $) problems  have unbounded variance.

What if we could trade some of that excess variance for some increase in bias?

That's one justification for Tikhonov regularization.
We add a term to the objective function that prioritizes low norm solutions.
$\Gamma$ is the Tikhonov matrix.

$$\mathcal L_\text{Tikhonov} = \|y - \beta X\|_2^2+\|\beta\Gamma\|_2^2\\
(y - \beta X)(y - \beta X)^T + \beta\Gamma\Gamma^T\beta^T
$$

Derivation is, again, quite straighforward:

$$\frac{\partial}{\partial \beta}\left(L_\text{Tikhonov}\right)=2\Gamma^T\Gamma\beta^T-2X(y-\beta X)^T$$

Setting this to zero:

$$\Gamma^T\Gamma\beta^T=X(y-\beta X)^T$$

Transposing:

$$\beta\Gamma^T\Gamma=(y-\beta X)X^T= y X^T - \beta X X^T$$

Solving for $\beta$:

$$\beta= y X^T\left(X X^T + \Gamma^T\Gamma\right)^{-1}$$

@@colbox-blue
The usual Ridge regression assumes the Tikhonov matrix to be a multiple of the identity: $\Gamma = \sqrt\lambda \mathbb I$.
@@

We can see that Tikhonov regularization amounts to the same solution as before, except that we augment the $X X^T$ with $\Gamma^T\Gamma$.

In fact, this augmentation is more than figurative ([see this answer][CVaug]).
Imagine we augmented samples with virtual samples hand-crafted so that their cross product $XX^T$ matches $\Gamma^T\Gamma$.

$$X = \left[\begin{matrix} X_\text{original} & X_\text{virtual} \end{matrix}\right]$$

If we do that:

$$X X^T =  X_\text{original} X_\text{original}^T + X_\text{virtual} X_\text{virtual}^T = X_\text{original} X_\text{original}^T + \Gamma^T\Gamma$$

Thus, it suffices to have $X_\text{virtual} = \Gamma ^T$.

The rest of the solution requires the product $yX^T$.
Since we augmented $X$, we must augment $y$ in a way to keep the product intact.
The correct augmentation is simply a row matrix of zeros (with $p$ elements, where $p$ is the number of variables), so that the product with $X$ is null.

$$y = \left[\begin{matrix} y_\text{original} & y_\text{virtual} \end{matrix}\right] =
\left[\begin{matrix} y_\text{original} & \mathbb 0 \end{matrix}\right]$$

Doing this augmentation

$$\beta=
y_\text{original} X_\text{original}^T\left(X_\text{original} X_\text{original}^T + \Gamma^T\Gamma\right)^{-1}\\=
y X^T\left(X X^T\right)^{-1}$$

## Properties

An interesting emergent property of Ridge regression is that, unlike the OLS solution, predictions and residuals are not uncorrelated, i.e.:

$$\hat y \epsilon^T = \left(\beta X \right) \left(y - \beta X \right) \neq 0$$

In fact, this very fact[^CVquestion] was the main motivation for me to write this post.


Due to the identification with the augmentation, however, we can see that's simply an artifact.
Or, rather, that orthogonality of predictions and residuals is maintained *if* you take into consideration the virtual samples we introduced.
After all, we've shown the OLS and the Ridge solutions to be obtained from the same equations.

Another interesting property, or rather interpretation, is the correspondence with Bayesianism.
In the Bayesian point of view probabilities encode a level of certainty.
In such a framework, linear regression parameters, for example, have each a distribution (and so do most constructs).
Using Bayes' theorem, the posterior probability is proportional to the product of the likelihood and the prior probability.
Taking the logarithm, that product becomes a sum.
The residual sum of squares corresponds to the Gaussian log-likelihood, with constant diagonal covariance.
The regularization term $\|\beta\Gamma\|_2^2$, in turn, [corresponds to a Gaussian log-prior on the parameters](https://stats.stackexchange.com/a/163450/60613), with covariance $\Sigma=\left(\Gamma\Gamma^T\right)^{-1}$ and zero expected value (other values are also possible, and the Tikhonov framework accommodates them).
Other regularization schemes may (or may not) correspond to other prior distributions.

I may talk a little more about them in future posts, specially the LASSO and the Total Variation regularizations.
I hope you enjoyed the read thus far!
Until the next one!


[CVaug]: https://stats.stackexchange.com/questions/69205/how-to-derive-the-ridge-regression-solution/164546#164546
[^CVquestion]: [Why does regularization wreck orthogonality of predictions and residuals in linear regression?](https://stats.stackexchange.com/questions/494274/why-does-regularization-wreck-orthogonality-of-predictions-and-residuals-in-line/494329#494329)