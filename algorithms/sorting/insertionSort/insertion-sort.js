function insertionSort(array) {
    let size = array.length;
    for(let i = 1; i < size; ++i) {
        let j = i - 1;
        let value = array[i];
        while(j >= 0 && array[j] > value) {
            array[j + 1] = array[j];
            --j;
        }
        array[j + 1] = value; 
    }
    return array;
}