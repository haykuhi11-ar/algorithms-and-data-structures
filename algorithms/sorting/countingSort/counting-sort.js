function countingSort(array) {
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

    const sorting = [];
    let j = 0;

    for(let i = 0; i < countArr.length; i++) {
    
        while(countArr[i] > 0) {
            sorting[j++] = i + minElement;
            countArr[i]--;
        }
    }
    return sorting;
}