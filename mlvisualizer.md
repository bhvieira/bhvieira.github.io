@def title = "ML Visualizer"
@def date = Date(2025, 11, 19)
@def rss = ""

<!--             <h1 class="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
                ML Model Performance Visualizer
            </h1>
            <p class="text-lg text-gray-600">
                Data is randomly generated to demonstrate various regression and classification metrics. **Try dragging the points!**
            </p> -->

# ML Model Performance Visualizer

Data is randomly generated to demonstrate various regression and classification metrics. **Try dragging the points!**

## Regression Metrics

- Mean Absolute Error (MAE): average lengths of the residual segments
- Mean Squared Error (MSE): average area of the squares formed by the residuals
- Concordance Index (C-index): the agreement in the ordering of predicted and actual values

## Classification Metrics (i.e., for binary outcomes 0/1)

- Brier Score: average squared difference between predicted probabilities and actual outcomes
- Expected Calibration Error (ECE): the difference between predicted probabilities and observed frequencies
- Area Under the ROC Curve (AUC): the agreement in the ordering of predicted probabilities for positive and negative classes


{{insert mlvisualizer.html }}
