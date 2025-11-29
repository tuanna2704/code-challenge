// Assumption: n is a positive interger
// Solition: use gauss formula to calculate
// Complexity: O(1) 
const sum_to_n_a = (n: number): number => {
  return (n * (n + 1)) / 2;
}

// Assumption: n is a positive interger or negative integer
// Solition: fore each number from 0 to n and accumulate the sum
// Complexity: O(n) 
const sum_to_n_b = (n: number): number => {
  let sum = 0;
  for (let i = 1; i <= Math.abs(n); i++) {
    if (n > 0) {
      sum += i;
    } else {
      sum -= i;
    }
  }

  return sum;
}

// const sum_to_n_c = (n: number): number => {

// }
