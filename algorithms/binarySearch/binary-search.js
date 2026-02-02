const binarySearch = function(nums, target) {
    let start = 0;
    let end = nums.length - 1;

    while (start <= end) {
        const mid = Math.floor(start + (end - start) / 2);

        if (target === nums[mid]) {
            return mid;
        }
        if (target > nums[mid]) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return -1;
}