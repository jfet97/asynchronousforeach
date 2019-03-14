# Asynchronous forEach

A Symbol based _Array.prototype_ extension that enable asynchronous declarative iteration on arrays and array-like objects.
The following two extension adhere to the _Array.prototype.forEach_ ![syntax].(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

## Asynchronous Serial forEach

This function invokes the __callback__ passed to it on each array's value, but one by one, waiting the completion of all the async operations contanined into the callback before passing to the next value.
When the callback returns on the last call, the promise returned by the async forEach will complete with the `undefined` value.

```js
const {
    asyncSerialForEach,
} = require('asynchronousforeach');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const array = [1, 2, 3, 4, 5];

(async() => {
    await array[asyncSerialForEach](async v => (await delay(1000), console.log(v)));
    console.log('done');
})();
```

In the previous example we can see that each value contained into the array will be printed with a time span of one second from each other.
Then we will see `done` printed on the console.

## Asynchronous Parallel forEach

This function invokes the __callback__ passed to it on each array's value, in parallel (from an async perspective). The async operations contained into the callback won't be waited before passing to the next value. When each promise returned by each call will fulfill, the promise returned by the async forEach will complete with the `undefined` value.

```js
const {
    asyncParallelForEach,
} = require('asynchronousforeach');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const array = [1, 2, 3, 4, 5];

(async() => {
    await array[asyncParallelForEach](async v => (await delay(1000), console.log(v)));
    console.log('done');
})();
```

In the previous example we can see that all the values will be printed, in order, after 1 second.
Then we will see `done` printed on the console.

