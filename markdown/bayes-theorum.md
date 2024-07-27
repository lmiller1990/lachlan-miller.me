# Bayes Theorum

I am going through the textbook [Biological Sequence Analysis
Probabilistic Models of Proteins and Nucleic Acids](https://www.cambridge.org/core/books/biological-sequence-analysis/921BB7B78B745198829EF96BC7E0F29D). Chapter 1 is about Bayes Theorum and probabilistic models. 

There is a lot of content that is new to me. I'll explain it all in my own simple terms.

## Conditional, Joint, and Marginal Probabilities

Three types of probability! What's the difference? 

**Joint probability**: this is referring to the probability of two events happening **at the same time**. If you have a deck of cards, asking the question "what is the probability of drawing a queen of hearts" is a joint probability question - a queen **and** a heart.

```math
P(\text{Queen and Heart}) = \frac{1}{52}
```

**Marginal probability**: the probability of a event happening, regardless of the outcomes of the other events. What is the probability of drawing a heart?

```math
P(\text{Heart}) = \frac{13}{52} = \frac{1}{4}
```

**Conditional probability**: the probability of an event occurring, *given another event already occurred*. If you draw a card, and it is a queen, what's the probability of getting another? That is to say, the probability of drawing two queens in a row? 51 cards remaining, only 3 queens. So:

```math
P(\text{Draw another queen | Draw a queen}) = \frac{3}{51} \approx 5.8\%
```

## Formulas

There are concise and clear formulas for each of these. To illustrate, let's use dice. Let's say there are two dices, `$D_1$` and `$D_2$`. We deliberately choose `$D_1$`. The **conditional probabilty** of rolling `$i$` with `$D_1$` is:

```math
P(i|D_1)
```

It's the conditional probability - given an event (picking `$D_1$` out of two dice).

If, instead of deliberately choosing `$D_1$`, we choose a dice at random (out of two dices). Let's represent the selected dice as `$D_j$`, where `j` is 1 or 2. The probability of selecting dice is `$P(D_j)$`. So **joint** probability of selecting a specific dice `$j$` **and** rolling a specific number `$i$` is the product of the probabilities, `$P(i,D_j)$`.

```math
P(i,D_j) = P(D_j) * P(i|D_j)
```

Let's work it out.

Probability of a dice, `$j$`, out of two candidates:

```math
P(D_j) = 0.5
```

And of getting `$i$`, given `$D_j$`:

```math
P(i,D_j) = \frac{1}{6}
```

So simply 
```math
0.5 * \frac{1}{6} = \frac{1}{12}
```

Intuitively, this makes sense - two dice times 6 sides gives us 12 outcomes.

## Generalizing

From this example, we can generalize. Let's look at this formula:

```math
P(X, Y) = P(X|Y) * P(Y)
```

To be ultra specific:

- `$P(X,Y)$` is the **joint probability** of event `$X$` and event `$Y$` happening together. The comma means "together".
- `$P(X|Y)$` is the **conditional probability**. The probability `$X$` will occur, given observation `$Y$`. The pipe symbol means **conditional**.
- `$P(Y)$` is the **marginal probability**. It is the probability of `$Y$` happening on its own.

See the parallel between the formula we developed by intuition for the dice example?

Dice example:

```math
P(i,D_j) = P(D_j) * P(i|D_j)
```

Formal formula:

```math
P(X, Y) = P(X|Y) * P(Y)
```

## Example

Here is an applied example!

> Consider an occasionally dishonest casino that uses two kinds of dice. Of the dice 99% are fair but 1% are loaded so that a six comes up 50% of the time. We pick up a die from a table at random. 
>
> What are `$P(six|D_{loaded})$` and `$P(six|D_{fair})$`?
>
> What are `$P(six, D_{loaded})$` and `$P(six, D_{fair})$`? 
>
> What is the probability of rolling a six from the die we picked up?

Let's start with the first one:

> What are `$P(six|D_{loaded})$` and `$P(six|D_{fair})$`?

Note the `$|$`. This is a **conditional** probability question. `$P(six|D_{loaded})$` - in English "Given a loaded dice, what is the probability of rolling a 6?" We are told - it's 50%, or 0.5.

`$P(six|D_{fair})$` is, of course, `$\frac{1}{6}$`

The next two are subtly different:

> What are `$P(six, D_{loaded})$` and `$P(six, D_{fair})$`? 

There is no `$|$` - this is a **joint probability** question. It is asking the chance of these two things happening together. 

Let's start with `$P(six, D_{loaded})$`. We need to know:

- chance of getting a loaded dice
- chance of getting a 6

Intuitively, this should be a low number - it's unlikely to get a loaded die, and even if you do, there is still only a 50% chance to throw a 6.

We can use the formula from earlier:

```math
P(X, Y) = P(X|Y) * P(Y)
```

We know the 99% of dice are fair but 1% are loaded. Of those, they come up 6 50% of the time.

```math
P(six, D_{loaded}) = P(six|D_{loaded}) * P(D_{loaded}) 
```

```math
P(six, D_{loaded}) = \frac{1}{2} * \frac{1}{100} 
```

```math
= 0.5 * 0.01 
= 0.005 
= 0.5\%
```

Less than 1% chance.

> What is the probability of rolling a six from the die we picked up?

This is asking about **marginal probability**. It is asking for the outcome considering all possibilities. For this, we use the law of total probability. It's the sum of all probabilities or all "paths".

```math
P(X) = \sum_{i=1}^n P(X|Y) P(Y)
```

It's the formula from before `$P(X|Y) P(Y)$`, just with a `$\sum_{i=1}^n$` in front!

We need to know:

- chance to get 6 on a loaded dice
- chance to get 6 on a fair dice

```math
P(X) = P(6|D_{loaded}) * P(D_{loaded}) + P(6|D_{fair}) * P(D_{fair})
```

This is:

```math
\begin{aligned}
P(X) & = 0.5 * 0.01 + \frac{1}{6} * 0.99 \\
& = 0.005 + 0.166 \\
& = 0.17
\end{aligned}
```

Odds are about 17%.

## Bayes' Theorum

In the above example we are told the dice are sometimes loaded. We grab a die at random and throw three consecutive sixes. Are we using a loaded dice? This question, expressed mathematically:

```math
P(3 sixes|P_{loaded}) = \space ?
```
