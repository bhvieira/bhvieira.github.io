@def rss_pubdate = Date(2021, 11, 30)
@def rss = """ Uncertainty Reduction in Logistic Growth Regression Using Surrogate Systems Carrying Capacities: a COVID-19 Case Study """
@def published = "30 November 2021"
@def title = "Uncertainty Reduction in Logistic Growth Regression Using Surrogate Systems Carrying Capacities: a COVID-19 Case Study"
@def authors = "B.H. Vieira, N.H. Hiar, G.C. Cardoso"
@def journal = "Brazilian Journal of Physics"
@def doi = "10.1007/s13538-021-01010-6"
@def isopenaccess = true
@def tags = ["Decision-making", "Richard’s curve", "Logistic functions", "Epidemic peaks", "Uncertainties"]

{{publidetails .}}

This work was idealized by Professor George Cunha Cardoso, back in the first first wave of the Covid-19 pandemic, as an exercise for a course.
Nathalia, who was a student in the class, retrieved all the data used.
My contribution was to implement all the analysis using Professor Cardoso's ideas and Nathalia's data.
After preparing a preprint and releasing the code as open-source, I have to add that my participation in publishing the work became quite reduced due to several personal reasons.
Still, I really liked that this work presents a *better than naïve* and non-complicated way of estimating carrying capacity in logistic growths when surrogates are available.
The application to epidemiology is the most obvious one, but other processes could benefit from this.
There are several caveats, of course, and I also believe the paper addresses these fully.

## Abstract
> Logistic growth regressions present high uncertainties when data are not past their inflection points. In such conditions, the uncertainty in the estimated carrying capacity K, for example, can be of the order of K. Here, we present a method for uncertainty reduction in logistic growth regression using data from a surrogate logistic growth process. We illustrate the method using Richards’ growth function to predict the inflection points of COVID-19 first-wave accumulated causalities in Brazilian cities. First waves of epidemics are known to be reasonably well modeled a posteriori by Richard’s growth function. Yet, we make predictions using early data that end before or around the inflection point. For that goal, we estimate K by logistic growth regression using data from surrogate international cities where the epidemics are clearly past their inflection points. The constraint stabilizes the logistic growth regression for the Brazilian cities, reducing the uncertainty in the prediction parameters even when the surrogate K is a rough estimate. The predictions for COVID-19 first-wave peaks in Brazilian cities agree with official data. The method may be used for other logistic models and logistic processes, in areas such as economics and biology, when surrogate populations or systems are identified.