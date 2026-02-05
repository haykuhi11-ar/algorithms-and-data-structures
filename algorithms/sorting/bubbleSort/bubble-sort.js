export function bubbleSort(array, compareFn = (a, b) => a - b) {
    const size = array.length;
    for(let i = 0; i < size - 1; ++i) {
        let f = false;

        for(let j = 0; j < size - i - 1; ++j) {
            if (compareFn(array[j], array[j + 1]) > 0) {
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