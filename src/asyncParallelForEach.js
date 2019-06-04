const asyncParallelForEach = Symbol('asyncParallelForEach');

Array.prototype[asyncParallelForEach] = async function (callback, concurrentOps = this.length, thisArg) {

    if (this == null) {
        // this should be the array on which we perform the async iteration
        throw new TypeError('this array is null or undefined');
    }

    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }

    if (typeof concurrentOps !== 'number') {
        throw new TypeError(concurrentOps + ' is not a number');
    }

    if (concurrentOps === 0) {
        throw new RangeError(concurrentOps + 'is not a valid value');
    }

    const O = Object(this);
    const CA = chunkify(Array.from(O), concurrentOps);
    
    for(const C of CA) {
        await asyncParallelForEachFn.call(C, O, callback, thisArg)
    }

    // forEach returns undefined
    return;

}

function chunkify(array, chunkSize) {
        var R = [];
        for (var i = 0; i < array.length; i += chunkSize)
            R.push(array.slice(i, i + chunkSize).map((value,key) => ({ key:key+i, value })));
        return R;
}

async function asyncParallelForEachFn(source, callback, thisArg) {

    const O = Object(this);
    const len = O.length >>> 0;

    let T;
    if (typeof thisArg !== 'undefined') {
        T = thisArg;
    }

    let arrayOfReturnedPromises = [];
    let k = 0;
    
    while (k < len) {
        let kValue;
        
        if (O[k].value) {
            kValue = O[k].value;
            
            arrayOfReturnedPromises.push(callback.call(T, kValue, O[k].key, source));
        }
        
        k++;
    }

    return await Promise.all(arrayOfReturnedPromises);
    
};

export { asyncParallelForEach };
