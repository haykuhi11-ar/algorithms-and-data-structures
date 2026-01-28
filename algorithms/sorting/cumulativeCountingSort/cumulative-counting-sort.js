function cumulativeCountingSort(array) {
     const size = array.length;
    if (size === 1) return array;

    let maxElement = 0;
    let minElement = 0;

    for(let i = 0; i < size; i++) {
        if (maxElement < array[i]) {
            maxElement = array[i];
        }
        if (minElement > array[i]) {
            minElement = array[i];
        }
    }

    const countArr = new Array((maxElement - minElement) + 1).fill(0);
    
    for(let j = 0; j < size; j++) {
        countArr[array[j] - minElement]++;
    }
    console.log(countArr);

// cumulative count
    for(let i = 1; i < countArr.length; i++) {
        countArr[i] += countArr[i - 1];
    }
    console.log(countArr);

    const output = new Array(size);

    for(let n = size - 1; n >= 0; n--) {
        let value = array[n];
        let index = value - minElement;
        let pos = countArr[index] - 1;
        output[pos] = value;
        countArr[index]--;
    }
    return output;
}