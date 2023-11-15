function minDigit(x) {
    if (x < 0 || isNaN(x)) {
        return 'Некорректный ввод';
    }

    if (x === 0) {
        return 0;
    }

    x = x.toString();

    let min = parseInt(x[0]);

    for (let i = 1; i < x.length; i++) {
        const digit = parseInt(x[i]);
        if (digit < min) {
            min = digit;
        }
    }

    return min;
}

// Пример использования:
console.log(minDigit(1938));
// Вывод: 1 (Наименьшая цифра в числе 1938)
console.log(minDigit(5024));
// Вывод: 0 (Наименьшая цифра в числе 5024)
console.log(minDigit(777));
// Вывод: 7 (Если все цифры одинаковые, вернется одна из них)
console.log(minDigit(-42));
// Вывод: "Некорректный ввод" (Отрицательное число считается некорректным)
