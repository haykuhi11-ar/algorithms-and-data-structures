function selectionSort(array) {
    const size = array.length;
    for(let i = 0; i < size - 1; ++i) {
        let minIndex = i;
        for(let j = i + 1; j < size; ++j) {
            if(array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (array[i] !== array[minIndex]) {
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
        }
    }
    return array;
}