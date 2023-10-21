function pow(x, n) {
  if (n < 0) {
    return "Степень должна быть натуральным числом";
  }
  let result = 1;
  for (let i = 0; i < n; i++) {
    result *= x;
  }
  return result;
}

// Пример использования:
console.log(pow(2, 3)); // Вывод: 8 (2 в степени 3)
console.log(pow(5, 4)); // Вывод: 625 (5 в степени 4)
console.log(pow(3, -2)); // Вывод: "Степень должна быть натуральным числом"
