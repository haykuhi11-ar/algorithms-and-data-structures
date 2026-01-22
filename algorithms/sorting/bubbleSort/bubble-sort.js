function bubbleSort(array) {
    for(let i = 0; i < array.length - 1; ++i) {
        let f = false;
        for(let j = 0; j < array.length - i - 1; ++j) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                f = true;
            }
        }
        if (!f) {
            break;
        }
    }
    return array;
}