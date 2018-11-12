# React Redux Starter Tutorial

This project is trying to show how to include redux into an existing project, what steps will be needed, and what benefits you get from it. For each step there is a commit on the branch `redux` that you can use to refer you.

First however take a look at the existing parts. In our app is a simple counter that is split up over 3 components:

* **Counter**: Display the current count
* **Increment**: A styled button that can trigger an action
* **CounterLayout**: A layout component that puts everything together and manages the state

You can look at the result by running `npm start` (make sure to run `npm install` first).

When we look at those components, we can see the following shortcomings:

1. The CounterLayout has to know about the inner workings of the components - it has to know about the count, how to increase it and how to pass it to the inner components.
2. The Increment component actually does not really have any power over incrementing anything. It's just called like this.
3. The Counter is dependent to get passed in the right count from the outer components to display the correct count. Let's assume the requirement of a localized message, that would be wrapped in a *LocalizedCounterMessage* Component, which then holds the Counter. It would be required to get passed the current count from the outer component to pass it to the counter, even though it is not technically required to know about it. 

So how to remove those shortcomings? This is were redux will come to play.

## Step 1 - Install redux
[Commit](https://github.com/MatthiasKainer/react-redux-starter-tutorial/commit/d7e5323fd39790cb1d0e6dc3a1c23d8434c339ca)

The first thing to do is installing redux. To do so, execute the following command:

```sh
npm install --save redux react-redux
```

This will add the required dependencies to your project. 

## Step 2 - Add a redux provider, and create the redux machinery
[Commit](https://github.com/MatthiasKainer/react-redux-starter-tutorial/commit/3f94dcdbdf1c6978e1ca3dd77bdd339ef9e89164)

For Redux to work with your application, you will have to create some first bits and pieces. The very first thing is that you will have to maintain a store. You can think about the store as your application database. Create a file `store.js` and put the following bits in:

```js
import { createStore } from 'redux';

const initialState = {
    counter: 0
};

export default function configureStore() {
    return createStore(
        null,
        initialState
    );
}
```

This will create us a store with a `counter` of `0` as initial state. To be able to modify the state, we will need another thing, namely the reducer. You can image this to be like the controller in your MVC application, that takes in actions and modifies the model (which is in the state of your store).

Create another file called `reducer.js` and add the following bits:

```js
export default (state, action) => {
    return state;
}
```

To have the store know about the reducer, add the following pieces:

```diff
 import { createStore } from 'redux';
+import reducer from './reducer';
 
 const initialState = {
     counter: 0
 };
 
 export default function configureStore() {
     return createStore(
-        null,
+        reducer,
         initialState
     );
 }
```

There we are. Unfortunately our application does not know much about it yet, we will have to add the redux provider to the index.js to get it all wired up.

```diff
 import App from './App';
 import * as serviceWorker from './serviceWorker';

-ReactDOM.render(<App />, document.getElementById('root'));
+import { Provider } from 'react-redux';
+import configureStore from './store';

+ReactDOM.render(<Provider store={configureStore()}>
+    <App />
+</Provider>, document.getElementById('root'));
```

If you start the application up via `npm start` you will notice that nothing changed. Just adding redux to the application does not have any influence on your existing application, which makes the transition way easier. 

The next thing is to add the increment counter to the reducer. The way the reducer is called can be easiest be seen by looking at tests. Create a new file `reducer.test.js` and put the following content in:

```js
import reducer from './reducer';

describe("reducer", () => {
    const initialState = {counter : 0}

    describe("When triggering an increase", () => {
        let newState;

        beforeEach(() => {
            newState = reducer(initialState, {type: 'INCREASE'});
        })

        it("should have increased the count", () => {
            expect(newState.counter).toBe(initialState.counter + 1);
        });

        it("should not have modified the original state", () => {
            expect(initialState.counter).toBe(0);
        });
    });

    describe("When triggering an unknown action", () => {
        it("should return the original state", () => {
            expect(reducer(initialState, {type: 'UNKNOWN'})).toBe(initialState);
        });
    })
})
```

We are calling the reducer from the test just as redux would - which means calling it with two arguments, the current state (in our test the initial one) and the action that has to be called with a type which allows the reducer to identify which action that is. The action will also receive the payload. The action is entirely controlled by us, and we will later dispatch it directly. 

Now make the test green (you can verify this by running `npm test`) by implementing the reducer.

## Step 3 - Use redux in the components
[Commit](https://github.com/MatthiasKainer/react-redux-starter-tutorial/commit/46dfec5eee02421dad1ea51901894c8a2f336015)

We next want to replace the state handling done by the CounterLayout with the redux way. 

To connect a component we have to import the connect from redux, and export the connected component instead. For our App.js, this looks like the following:

```diff
 import React, { Component } from 'react';
+import { connect } from 'react-redux';

 ...

-export default App;
+export default connect()(App);
```

What happens is that instead of exporting the Component, we exporting the result of the call to connect with the component as argument. Behind the scene, a single prop called `store` will be passed to the component, and redux will know how to use it. 

Note that even though the App does not do much with it, without connecting it the children of App would not have access to redux. To connect one component, all components above this component have to be connected as well. Also, with connecting it, the tests will fail. As the App.js is tested by rendering the application, we will have to add the same provider as we added to the index.js and the new test will look like this:

```diff
 import React from 'react';
 import ReactDOM from 'react-dom';
 import App from './App';
+import { Provider } from 'react-redux';
+import configureStore from './store';
 
 it('renders without crashing', () => {
   const div = document.createElement('div');
-  ReactDOM.render(<App />, div);
+  ReactDOM.render(<Provider store={configureStore()}><App /></Provider>, div);
   ReactDOM.unmountComponentAtNode(div);
 });
```

Let's connect the CounterLayout component to see how we can use it:

```diff
 import React, { Component } from 'react';
+import { connect } from 'react-redux';

 import Counter from './Counter';
 import Increment from './Increment';

-class CounterLayout extends Component {
-    constructor(props) {
-        super(props);
-        this.state = {
-            count : this.props.count || 0
-        }
-    }
-
-    onIncrement() {
-        this.setState({
-            count : this.state.count + 1
-        });
-    }
-
+export class CounterLayout extends Component {
     render() {
-        const {count} = this.state;
+        const {count, onIncrement} = this.props;
         return <div>
             <p>You clicked <Counter count={count} /> times!</p>
-            <Increment onIncrement={() => this.onIncrement()} />
+            <Increment onIncrement={() => onIncrement()} />
         </div>;
     }
 }

-export default CounterLayout;
+const mapStateToProps = state => ({
+    count : state.counter
+});
+
+const mapDispatchToProps = dispatch => ({
+    onIncrement: () => dispatch({type : 'INCREASE'})
+});
+
+export default connect(mapStateToProps, mapDispatchToProps)(CounterLayout);
```

A lot more things are changing here. Firstly, we no longer have to hold the `onIncrement` method in the component itself. But why so? 

There is a major difference on how we call connect now - namely by passing two methods, `mapStateToProps` and `mapDispatchToProps`. Those are helper methods which will be used to map the application state to specific properties in our component (in our case, `state.counter` to `count`), and the latter will dispatch certain actions to the reducer, and add the function that invokes this as property to our Component. 

Another thing you might have noticed is that we are also exporting the class directly. This is so that we can change the test to use the disconnected component. Also, we can simplify our tests to only test that the component renders correctly if the right properties are passed, instead of testing that the component changes if an action occurs. We already test the result of the function the reducer, and we don't have to test redux on our own as it is already sufficiently tested as we had to in App.js. The change in this test is therefore (except for deleting a lot of tests) mainly:

```diff
-import CounterLayout from './CounterLayout';
+import {CounterLayout} from './CounterLayout';
```

### What we gained

The CounterLayout component is much simpler, but it still has to know a lot about it's children. Consider this is more of an migration scenario than a scenario you would want to achieve in a complex application. 

## Step 4 - Make the components independent
[Commit](https://github.com/MatthiasKainer/react-redux-starter-tutorial/commit/65b15cc1a0c6d499469a4e403e9e6607c269fa75)

The next bit is to remove the knowledge of the state from the CounterLayout, and move it to the respective components instead. 

So let's first take the `Counter` component take ownership over their state. Just like before, we want to connect the component via importing the `connect`, and then map the global state to ours. The result would look like this:

```diff
 import React, { Component } from 'react';
+import { connect } from 'react-redux';
 
-class Counter extends Component {
+export class Counter extends Component {
     render() {
         const {count} = this.props;
         return <span>{count}</span>
     }
 }
 
-export default Counter;
+const mapStateToProps = state => ({ count : state.counter });
+export default connect(mapStateToProps)(Counter);
```

Also we can clean up the CounterLayout, especially removing the mapStateToProps and passing of properties.

```diff
 export class CounterLayout extends Component {
     render() {
-        const {count, onIncrement} = this.props;
+        const {onIncrement} = this.props;
         return <div>
-            <p>You clicked <Counter count={count} /> times!</p>
+            <p>You clicked <Counter/> times!</p>
             <Increment onIncrement={() => onIncrement()} />
         </div>;
     }
 }
 
-const mapStateToProps = state => ({
-    count : state.counter
-});
-
 const mapDispatchToProps = dispatch => ({
     onIncrement: () => dispatch({type : 'INCREASE'})
 });
   
-export default connect(mapStateToProps, mapDispatchToProps)(CounterLayout);
+export default connect(() => ({}), mapDispatchToProps)(CounterLayout);
```

If we open the application in the browser we can see the application is still working fine. Let's move the mapDispatchToProps to the Increment Component next.

```diff
 import React, { Component } from 'react';
+import { connect } from 'react-redux';
 import './Increment.css';
 
-class Increment extends Component {
+export class Increment extends Component {
     render() {
         const {onIncrement} = this.props;
         return <button onClick={onIncrement}>Increment</button>
     }
 }
 
-export default Increment;
+const mapDispatchToProps = dispatch => ({
+    onIncrement: () => dispatch({type : 'INCREASE'})
+});
+export default connect(() => ({}), mapDispatchToProps)(Increment);
```

Cleaning up the CounterLayout leaves us with pure layouting, that can easily be used as a pure component.

### What we gained

The business logic has been moved to the reducer, and the component tree has been decoupled in such a way that we can easily move the Counter component to a different place without breaking anything, or without the need to pass the properties to another component. 

However, we have some data knowledge hidden in the mapStateToProps function. Having this unittested can help, but as what you have is a contract make sure you test the right part of the code - the state and not your mapper. A more strongly typed language like TypeScript or Flow can help to keep that stable.
