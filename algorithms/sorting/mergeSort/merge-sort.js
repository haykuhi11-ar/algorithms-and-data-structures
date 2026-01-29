function mergeSort(array) {
    const size = array.length;

    if (size <= 1) return array;

    const mid = Math.floor(size / 2);

    const left = array.slice(0, mid);
    const right = array.slice(mid);
    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);

    return merge(sortedLeft, sortedRight);
}

const merge = function(arr1, arr2) {
    const size1 = arr1.length;
    const size2 = arr2.length;

    let i = 0;
    let j = 0;
    const result = [];

    while (i < size1 && j < size2) {
        if (arr1[i] <= arr2[j]) {
            result.push(arr1[i++]);
        } else {
            result.push(arr2[j++]);
        }
    }

    while (i < size1) {
        result.push(arr1[i++]);
    }

    while (j < size2) {
        result.push(arr2[j++]);
    }
    return result;
}