@def rss_pubdate = Date(2020, 10, 23)
@def rss = """ The F-test and R²: an introduction from the ground up"""
@def title = "The F-test and R²: an introduction from the ground up"
@def tags = ["linear regression", "statistics"]

{{blogdetails .}}

\toc

## Intro

This is, in part, a repost of [an answer of mine in Cross Validated](https://stats.stackexchange.com/a/491084/60613).
I also take the opportunity to introduce the concepts and explain (mostly informally) why they are the way they are.
It's a very interesting question, that I'll reproduce below:

>  [**What does it mean if I have a high F-stat but low $R^2$?**](https://stats.stackexchange.com/q/491069/60613), *a question by [pythonuser](https://stats.stackexchange.com/users/275786/pythonuser)* distributed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)~~~<br>~~~
>  As far as I understand, a high F-stat leads to a high $R^2$, though the converse is not true. What does it mean if I have a high F-stat and a low $R^2$?

For context though, what is $R^2$ and where does this F-statistic appears?

## The coefficient of determination, $R^2$

Consider a linear model:

$$Y_i = \beta X_i + \epsilon_i, \qquad \epsilon_i \sim \mathcal N(0, \sigma^2)$$

$R^2$, the coefficient of determination, is a useful metric of the fitting.
It can be defined from various contexts, but informally its supposed to represent the amount of variance of the true $\mathbf Y$ (a vector containing the values of $Y_i$) your model captures.
Another way of looking at it is to treat it as the variance of squared residuals in relation to the variance of data: if your residuals have, proportionally small variance, that may be good news for your intended application.
Formally, it's the comparison between two models actually: yours and an alternative one, usually a null model.

Let's define the Mean Squared Error (MSE) as a function acting on two vectors: $\mathbf Y$ (the true values) and $\hat \mathbf{Y}$ (estimates from a model):

$$\operatorname{MSE}(\mathbf{Y}, \hat \mathbf{Y}) = \frac{\sum_i^N (Y_i - \hat Y_i)^2}{N}$$

Now let's denote the MSE pertaining to different models with $\operatorname{MSE}_\text{model}$.
Then, we can compare the "performance" of two models by comparing their MSEs!
What if we define a baseline model, one that all other models should beat before we even consider their worthy?

A good candidate is a model with only an intercept: $Y_i = \beta_0 + \epsilon_i$.
Optimizing it for MSE is the same as setting $\beta_0 = \mu = \operatorname{E}(\mathbf Y)$.
Let's compare our model and this new one by the ratio of their MSEs, and call this value the MSE-ratio (MSER).

$$\operatorname{MSER} = \frac{\operatorname{MSE}_{model}}{\operatorname{MSE}_{null}}$$

If $\operatorname{MSER} \approx 0$ (unless for some very specific edge cases) our model is great™ and residuals are very small.
If, however, $\operatorname{MSER} \approx 1$, then our model is actually not that much better than the boring arithmetic average: its residuals are actually of the same magnitude!
Mind you, depending on model specification and on which data we are measuring it, we can even witness $\operatorname{MSER} > 1$, meaning that our model is even worse than simply taking the mean!

If you've seen the formula for $R^2$ then you know where this is going.
$R^2$ is simply one minus MSER:

$$R^2 = 1 - \operatorname{MSER} = 1 - \frac{\operatorname{MSE}_{model}}{\operatorname{MSE}_{null}}$$

Thus, the interpretation of $R^2$ follows the same lines of the one we derived for MSER, but inverted:
 - Low $R^2$ (high $\operatorname{MSER}$): low explanatory power, not that much better than the mean, i.e. the null model of choice
 - High $R^2$ (low $\operatorname{MSER}$): high explanatory power, much better than the mean
 - Negative $R^2$ ($\operatorname{MSER}$ greater than one): we'd be better using the mean as our model

[A neat interpretation of $R^2$ can be derived from deviance](https://stats.stackexchange.com/a/359997/60613), linking it to distributions other than Gaussian.
These definitions of $R^2$ and MSER are valid for basically most models (including non-linear ones).
Other derivations that will follow, however, only apply to linear regression.
In the case of linear regression optimized by ordinary least squares, it is possible to show that:

$$R^2 = \operatorname{Cor}^2(\mathbf{Y}, \hat \mathbf{Y})$$

**Word of caution**: if your model does not include an intercept, that means that the intercept-only null model is not nested within it, i.e. it doesn't correspond to a subset of it.
Therefore, it's very possible that $R^2$ is negative in this scenario if the data does not conform to that model.
[Statistical packages will often quietly change the null model without telling you](https://stats.stackexchange.com/a/26205/60613), changing it for a model where everything is zero!

So, what if we wanted to attach a test-statistic to $R^2$?
Enter the F-test.

## Comparing linear models, enter the F-test

Let's state our hypotheses:

$$\begin{cases}
H_0: \operatorname{MSE}_{model}-\operatorname{MSE}_{null}=0\\
H_A: \operatorname{MSE}_{model}-\operatorname{MSE}_{null}\neq0
\end{cases}
$$

Under the null hypothesis, the MSE is a sum of squared standard normal variables, divided by the number of variables.
This again entails the assumption that our dependent variable, $\mathbf Y$ is normally distributed.
A sum of $k$ squared standard normals is Chi-squared distributed, with $k$ degrees of freedom (see [Wiki](https://en.wikipedia.org/wiki/Chi-square_distribution#Definitions)).

Thus we define the sum of squared residuals (SSR) :

$$\operatorname{SSR} = k \operatorname{MSE} = \sum_i^k (Y_i-\hat Y_i)^2 \sim \chi^2_k$$

The ratio of two independent Chi-squared variables is F-distributed:

$$X = \left(\frac{Z_1}{Z_2}\right)/\left(\frac{d_1}{d_2}\right) \sim F(d_1, d_2)$$

With all that information, we can see that the RSS of our alternative and our null models are Chi-squared distributed under the null.
In fact, the ratio of variances (which is proportional to the sum of squared normal variables) is F-distributed.
If we can arrange our RSSs into variances, we can derive the F-statistics.

So let's define the explained and unexplained variances.
The unexplained variance is the variance we couldn't account for in our model, it makes sense then to define it as proportional to the RSS of our model.
The explained variance, on the other hand, is the difference between the total variance and the unexplained variance (this is particular to linear regression, and might not hold for other models due to a covariance term).
The total variance is proportional to the RSS of the null model, since the null model assumes the mean value.

$$
\begin{cases}
    \text{Explained Variance} = RSS_\text{null}-RSS_\text{model}\\
    \text{Unexplained Variance} = RSS_\text{model}
\end{cases}
$$

With that definition, we can derive the F-statistic and perform our test:

$$F = 
\left(
\frac{RSS_\text{null}-RSS_\text{model}}{RSS_\text{model}}
\right)/
\left(
\frac{p_\text{model}-p_\text{null}}{n-p_\text{model}}
\right)$$

## What's the relationship between the F-statistic and $R^2$?

$R^2$ can be defined in terms of RSS as well.

$$\begin{aligned}
R^2 &=  1 - \frac{\operatorname{MSE}_{model}}{\operatorname{MSE}_{null}}\\
&=  1 - {\color{red}{\frac{n}{n}}}\frac{\operatorname{RSS}_{model}}{\operatorname{RSS}_{null}}=  1 - \frac{\operatorname{RSS}_{model}}{\operatorname{RSS}_{null}}
\end{aligned}$$

Thus, with some rearranging, we can show that:

$$F = 
\left(
\frac{R^2}{1-R^2}
\right)/
\left(
\frac{p_\text{model}-p_\text{null}}{n-p_\text{model}}
\right)$$

A few interesting conclusions can be extracted from this:
1. The F-test comparing an intercept-only null model with an alternative model tests for the difference in residual sum of squares, ergo tests for $R^2 = 0$
2. Increasing $n$, the number of samples, inflates $F$ (we kind of expect this, it becomes easier to reject point-nulls with larger sample sizes)
3. Following from the previous point, huge, significant, values of $F$ can be attained with the tiniest, non-zero, $R^2$s.

An unanswered question, that I might answer in a later post, is:
if we know the distribution, $RSS_\text{null}-RSS_\text{model} \sim \chi^2_{p_\text{model}-p_\text{null}}$, why don't we test it directly using that information?
But a simple answer is that we do, under specific conditions.

This was an interesting topic to talk about and one that time and time again pops up.
If you spot any inaccuracies, I would be extremely grateful if you let me know and I'll credit you on corrections.
Until the next one!