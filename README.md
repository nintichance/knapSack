# Knapsack Problem 

 This repo includes my solution for the 0-1 Knapsack Problem and an HTML file, which can be used to run the JavaScript in the browser to step through function calls.

 The solution sorts the items by weight, ascending, using the merge sort algorithm to achieve this sort.

 The above solution was formulated with help from [Back to Back SWE](https://www.youtube.com/watch?v=xCbYmUPvc2Q), [Tushar Roy](https://www.youtube.com/watch?v=8LusJS5-AGo) & [Jenny's Lectures](https://www.youtube.com/watch?v=PfkBS9qIMRE).

 The solution for Mergesort was formulated with help from [Princeton's Algorithms Part 1](https://www.coursera.org/learn/algorithms-part1/lecture/pvvLZ/stability) and [Bernard Johnson](https://www.youtube.com/watch?v=ppNZ4bmrmGs).

 ## Mergesort

 The concept of Mergesort is to take an array of items N, split it into a subarray, sort the subarrays, and merge the subarrays into one sorted array.

 The way that this is achieved is by splitting the subarrays by until there are only 2 elements in the subarrays. With the two elements, we can perform a sort and merge at the same time by checking the first element in both subarrays, i and j. 

 If the first element of subarray i is lesser, then push it to the sorted array. And so on. 

 In this recursive solution, it currently splits the arrays down to one element in the array, merges the two small arrays, while considering its sorted order.

 Once the subarrays are sorted, we can merge them by powers of 2. 2 sorted subarrays of 2 become 1 sorted subarray of 4. 2 sorted subarrays of 4 become 1 sorted subarray of 8... and so on until we've sorted up until the nth item in the original array.

 ## Knapsack

 My solution uses the bottom-up approach, determining the items we can add to our knapSack as the maxCapacity increases and as the number of items available to add to our knapSack increases.

 Starting with 0 items and a weight capacity of 0 and ending with n items (which is 4 items in my example) and n weight capacity (which is 8 pounds in my example), we need to determine what combination of items will give us the highest value without exceeding the max capacity.

 The data structure used to solve this problem is a N-by-M 2 dimensional array, which our rows (N) represent the items and our columns (M) represent the weight capacities. As we traverse the array from left to right, our weight capacity increases from 0 to M. As we traverse the array from top to bottom, the items we have available to use increases from 0 to N. 

 For example, our knapSack grid (we will call it knapSack), allows us to add 0 items to our knapSack when the weight capacity is 0 because our items cannot exceed weight capacity 0; however, when our weight capacity is 8 and we have items which weigh 2,3,4, and 5 pounds, we can add up to 8 pounds of items, which means we can add 2 & 3, 3&4, 5&2. However, we want to determine the highest value each item brings to the knapSack without exceeding the weight capacity.

 This function is calculated by comparing the price of the current item plus the price of the previous item at the left over weight capacity to the price of the previous item at the current weight capacity. Left over weight capacity is the current weight capacity minus the weight of the item added to the knapsack. It chooses the item/item(s) with the highest value.

 max(priceOfCurrentItem + knapSack[previousItem][leftOverWeightCap], knapSack[previousItem][currentWeightCapacity])

After the grid is completely filled out, we have the max Value and the max Number of items that we can add to the knapSack. We can use this max number of items to work our way backwards through the grid to reveal which item(s) we added to the knapSack to achieve the highest value without exceeding the max capacity.

When writing this solution, I assumed items were passed in as an array of objects; however, items need to be passed in as two separate arrays--one containing the item value and the other array containing it's corresponding item weight.

## Variations & Applications

The following variations and applications were plucked from [Jan-Willem Buurlage's Slides](https://homepages.cwi.nl/~buurlage/lcsc/slides_week15.pdf).

### Possible Applications

1. "Task Allocation"
  * If we have a computer with a limited amount *M* of RAM space...
  * And are given *N* applications which need *w* amount of RAM space to run, how do we best allocate RAM space *M* to obtain the maximum number of programs to run together.
2. "Report Assignment Optimization"
  * If we have *W* hours left to complete as many assignments as possible.
  * And a particular report is graded considering *m* criteria and the particular report (*i*th) counts from *v* percent of the grade.
  * Given each report takes *w* hours to complete, choose to complete the reports with the highest *v* percent of the grade that can be completed within *W* hours.

### Variations on the knapSack Problem

1. Subset Sum Problem
  * If you remove the profits from the 0-1 KnapSack problem, it becomes equivalent the to subset sum problem.
  * Given an array of integers *N*, find a subset of said integers which has the sum of 0.
  * Also, we can search for a subset that adds up to any integer *n*.
  * "An interesting special case is the partition problem, where *s* is half of the total sum: *Can we divide this collection equally among two persons?*

2. (Un)bouded KnapSack Problem
  * The **unbounded** knapSack problem allows us to add the current item to the knapSack multiple times.
  * The **bounded** knapSack problem only allows us to add each item to a specified limit. The solution in this repo for the **bounded** knapSack problem is in knapSackProblem.js and considers only 1 of each item can be added.

3. Multiple KnapSack Problem
  * We can consider having multiple knapSacks.
  * knapSack *i* has the capacity *M*
  * Choose *N* (mutally exclusive) subsets *S* with *S* less total weight than *M*
  * Maximize the combine value of the subsets
