#include <stdio.h>

void insertionSort(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        int j = i - 1;
        int value = arr[i];
        
        while (j >= 0 && arr[j] > value) {
            arr[j + 1] = arr[j];
            --j;
        }
        arr[j + 1] = value;
    }
}

int main() {
    int arr[] = {5, 6, 2, 7, 6, 2, 1};
    int size = sizeof(arr) / sizeof(arr[0]);

    insertionSort(arr, size);

    for (int i = 0; i < size; i++) {
        printf("%d, ", arr[i]);
    }

    return 0;
}