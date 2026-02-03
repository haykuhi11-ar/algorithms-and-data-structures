const partition = function(array, low, high) {
    const pivot = array[low];
    let i = low + 1;
    let j = high;

    while(i <= j) {
        while (array[i] <= pivot) {
            i++;
        }
        while (array[j] > pivot) {
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

const quickSort = function(array, low = 0, high = array.length - 1) {
    if (low >= high) return;

    const partIdx = partition(array, low, high);
    quickSort(array, low, partIdx - 1);
    quickSort(array, partIdx + 1, high);

    return array;
}