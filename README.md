# React Redux Starter Tutorial

This project is trying to show how to include redux into an existing project, what steps will be needed, and what benefits you get from it. For each step there is a commit on the branch `redux` that you can use to refer you.

First however take a look at the existing parts. In our app is a simple counter that is split up over 3 components:

* **Counter**: Display the current count
* **Increment**: A styled button that can trigger an action
* **CounterLayout**: A layout component that puts everything together and manages the state

When we look at those components, we can see the following shortcomings:

1. The CounterLayout has to know about the inner workings of the components - it has to know about the count, how to increase it and how to pass it to the inner components.
2. The Increment component actually does not really have any power over incrementing anything. It's just called like this.
3. The Counter is dependent to get passed in the right count from the outer components to display the correct count. Let's assume the requirement of a localized message, that would be wrapped in a *LocalizedCounterMessage* Component, which then holds the Counter. It would be required to get passed the current count from the outer component to pass it to the counter, even though it is not technically required to know about it. 

So how to remove those shortcomings? This is were redux will come to play.

## Step 1 - Install redux

The first thing to do is installing redux. To do so, execute the following command:

```
npm install --save redux react-redux
```

This will add the required dependencies to your project. 