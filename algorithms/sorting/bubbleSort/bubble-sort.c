#include <stdio.h>

void bubbleSort(int array[], int size) {
    for (int i = 0; i < size - 1; i++) {
        int f = 0;
        for (int j = 0; j < size - i - 1; j++) {
            if (array[j] < array[j + 1]) {
                int tmp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = tmp;
                f = 1; 
            }
        }
        if (!f) break;
    }
}

void printArr(int array[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d, ", array[i]);
    }
    printf("\n");
}

int main() {
    int arr[] = {64, 54, 25, 64, 22, 88, 88};
    int size = sizeof(arr) / sizeof(arr[0]);

    bubbleSort(arr, size);
    printArr(arr, size);

    return 0;
}