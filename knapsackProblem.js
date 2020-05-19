// //Dynamic Programming
// //Bottom-up Approach

const items = [{p:2, w: 3}, {p:3, w: 4}, {p: 1, w: 6}, {p:4, w: 5}]

const mergeSort = array => {
  if (array.length < 2) return array

  const middle = Math.floor(array.length/2)
  const leftSubArray = array.slice(0,middle)
  const rightSubArray = array.slice(middle, array.length)
  return merge(mergeSort(leftSubArray), mergeSort(rightSubArray))
}

const merge = (left, right) => {
  const mergedSortedArray = []

//can optimize by check if the left array's last item is less than the first item in the right array
//I could just merged the two arrays
console.log("ARRAYS", left, right)
  while(left.length && right.length) {
    if (left[0].w <= right[0].w){
      mergedSortedArray.push(left.shift())
    } else {
      mergedSortedArray.push(right.shift())
    }
  }

  while(left.length) mergedSortedArray.push(left.shift())
  while(right.length) mergedSortedArray.push(right.shift())
  return mergedSortedArray
}

const bestShoppingCart = (capacity, items) => {
  const numberOfItems = items.length
  const knapSack = []
  const sortedItems = mergeSort(items)
  //N-by-M Grid where N is number of items and M is maximum capacity
  //i is the currentRow that I am on, which represents the current Item
  //j is the currentColumn that I am on, which represents the max Capacity Weight of that particular column
  //items[i].w is the weight of the current Item
  //items[i].p is the price of the current Item
  // knapSack[i][j] is the maximum price value that we can get given a particular capacity and a particular item
  for(let i=0; i<numberOfItems+1; i++){
    knapSack[i] = []
    for(let j=0; j<capacity+1; j++) {
      if (i == 0 || j == 0) {
        knapSack[i][j] = 0
      } else {
        const bestPossibleValue = knapSack[i-1][j]
        //check the weight of the item to see if it exceeds the current maximum capacity
        if (sortedItems[i-1].w > j) {
          knapSack[i][j] = bestPossibleValue
        } else {
          const currentBestPossibleValue = sortedItems[i-1].p + knapSack[i-1][j-sortedItems[i-1].w]
          knapSack[i][j] = max(currentBestPossibleValue, bestPossibleValue)
        }
      }
    }
  }

  let newCapacity = capacity
  let maxValue = knapSack[numberOfItems][capacity]
  let itemToBeAddedToKnapSack = numberOfItems
  const itemsInKnapSack = []
  while(newCapacity != 0){
    while(knapSack[itemToBeAddedToKnapSack][newCapacity] == maxValue){
      itemToBeAddedToKnapSack--
    }
    itemsInKnapSack.push(sortedItems[itemToBeAddedToKnapSack])
    newCapacity = newCapacity - sortedItems[itemToBeAddedToKnapSack].w
    if (itemToBeAddedToKnapSack > 0){
      itemToBeAddedToKnapSack--
    maxValue = knapSack[itemToBeAddedToKnapSack][newCapacity]
    }  
  }
  return itemsInKnapSack
}



const max = (currentMax, previousMax) => {
  return currentMax > previousMax ? currentMax : previousMax
}

console.log(bestShoppingCart(8, items))