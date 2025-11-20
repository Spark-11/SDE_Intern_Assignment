# Second Largest Unique Number — JavaScript Solution

### **Problem**
Given an array of integers, return the **second largest unique number** in the array.  
If it doesn’t exist, return **-1**.

### **Example**

| Input | Output |
|-------|---------|
| `[3, 5, 2, 5, 6, 6, 1]` | `5` |
| `[7, 7, 7]` | `-1` |

## **Approach**

This solution runs in **O(n)** time and uses **O(1)** extra space.

### **Steps**
1. Traverse the array once.
2. Maintain two values:
   - `largest` — the maximum unique number found so far.
   - `secondLargest` — the second maximum unique number.
3. Skip duplicates using simple conditions.
4. After full traversal:
   - If `secondLargest` is still `-Infinity`, return `-1`.
   - Otherwise return `secondLargest`.

This approach avoids sorting (O(n log n)) and nested loops (O(n²)).

## **JavaScript Code**

```javascript
/**
 * APPROACH (O(n) time | O(1) extra space)
 * ---------------------------------------------------------
 * 1. Track largest and second largest unique values.
 * 2. Duplicates are skipped.
 * 3. Return -1 if second largest doesn't exist.
 */

function secondLargestUnique(nums) {
    let largest = -Infinity;
    let secondLargest = -Infinity;

    for (let num of nums) {
        if (num === largest || num === secondLargest) continue;

        if (num > largest) {
            secondLargest = largest;
            largest = num;
        } else if (num > secondLargest && num < largest) {
            secondLargest = num;
        }
    }

    return secondLargest === -Infinity ? -1 : secondLargest;
}

// Sample input/output
console.log(secondLargestUnique([3, 5, 2, 5, 6, 6, 1]));   // Output: 5
console.log(secondLargestUnique([7, 7, 7]));                // Output: -1
console.log(secondLargestUnique([10, 20, 20, 5, 6]));        // Output: 10
console.log(secondLargestUnique([1]));                       // Output: -1