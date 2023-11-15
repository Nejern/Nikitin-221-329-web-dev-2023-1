function fibb(n) {
    if (n < 0 || n > 1000) {
        return 'Некорректный ввод';
    }

    const fib = new Array(n + 1);
    fib[0] = 0;
    fib[1] = 1;

    for (let i = 2; i <= n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }

    return fib[n];
}

// Пример использования:
console.log(fibb(0)); // Вывод: 0
console.log(fibb(1)); // Вывод: 1
console.log(fibb(10)); // Вывод: 55
console.log(fibb(20)); // Вывод: 6765
console.log(fibb(1000)); // Вывод: очень большое число
