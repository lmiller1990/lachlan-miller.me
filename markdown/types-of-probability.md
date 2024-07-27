## Joint Probability

This is the probability of two or more events happen together. They are dependent.
Example: the probability of finding nucleotide A followed by C. This is the joint probability.

Mathematically, the probability of two events `$A$` and `$B$` is denoted as follows...

**Independent events**

```math
P(A \cap B) = P(A) \times P(B)
``` 

An example might be someone who decides if they are going to take an umbrella to work without checking the weather. Their decision and whether it rains are **independent**.

**Dependent events**

```math
P(A \cap B) = P(A) \times P(B | A)
``` 

Where `$P(B|A)$` is the probability of `$B$` given `$A$` already occurred.

An example is the probability of drawing an ace then a king from a desk of cards. If an ace has been drawn, the probability of a king changes.

The probability of drawing a king:

```math
P(Ace) = \frac{4}{52}
```

Now a king, considering an Ace has been drawn:

```math
\begin{aligned}
P(King \cap Ace) & = P(King) * Prob(King| Ace) \\
& = \frac{4}{52} * \frac{4}{51} \\
& = 0.6\%
\end{aligned}
```

Not very likely!

## Conditional Probability

This is the probability of an event given another has occurred. We use this in the previous example.
