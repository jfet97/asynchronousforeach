const asyncParallelForEach = Symbol('asyncParallelForEach');
Array.prototype[asyncParallelForEach] = async function (callback, thisArg) {

    if (this == null) {
        // this should be the array on which we perform the async iteration
        throw new TypeError('this is null or not defined');
    }

    const O = Object(this);

    const len = O.length >>> 0;

    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }

    let T;
    if (typeof thisArg !== 'undefined') {
        T = thisArg;
    }

    let k = 0;
    let arrayOfReturnedPromises = [];
    while (k < len) {
        let kValue;
        if (k in O) {
            kValue = O[k];
            arrayOfReturnedPromises.push(callback.call(T, kValue, k, O));
        }
        k++;
    }

    await Promise.all(arrayOfReturnedPromises);
    // forEach does return undefined
};

export { asyncParallelForEach };