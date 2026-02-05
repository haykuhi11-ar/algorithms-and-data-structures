const partition = function(array, low, high, compareFn) {
    const pivot = array[low];
    let i = low + 1;
    let j = high;

    while(i <= j) {
        while (i <= high && compareFn(array[i], pivot) <= 0) {
            i++;
        }
        while (compareFn(array[j], pivot) > 0) {
            j--;
        }

        if (i < j) {
            [array[i], array[j]] = [array[j], array[i]];
            i++;
            j--;
        }
    }
    [array[low], array[j]] = [array[j], array[low]];
    
    return j;
}

export const quickSort = function(
    array, 
    low = 0, 
    high = array.length - 1,
    compareFn = (a, b) => a - b 
) {
    if (low >= high) return;

    const partIdx = partition(array, low, high, compareFn);
    quickSort(array, low, partIdx - 1, compareFn);
    quickSort(array, partIdx + 1, high, compareFn);

    return array;
}