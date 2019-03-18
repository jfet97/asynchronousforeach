const asyncParallelForEach = Symbol('asyncParallelForEach');

Array.prototype[asyncParallelForEach] = async function (callback, thisArg) {
    if (this == null) {
        // This should be the array on which we perform the async iteration
        throw new TypeError('This array is null or undefined');
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

    let arrayOfReturnedPromises = [];
    let k = 0;
    
    while (k < len) {
        let kValue;
        
        if (k in O) {
            kValue = O[k];
            
            arrayOfReturnedPromises.push(callback.call(T, kValue, k, O));
        }
        
        k++;
    }

    await Promise.all(arrayOfReturnedPromises);
    
    // forEach returns undefined
    return;
};

export { asyncParallelForEach };
