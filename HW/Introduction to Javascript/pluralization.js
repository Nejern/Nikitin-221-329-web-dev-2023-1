function pluralizeRecords(n) {
    // Функция возвращает правильную форму мн. ч. для слова "запись"
    function pluralizeWord(word, count) {
        if (count % 10 === 1 && count % 100 !== 11) {
            return word + 'ь'; // Для чисел, оканчивающихся на 1 (кроме 11)
        } else if (
            (count % 10 >= 2 && count % 10 <= 4) &&
            (count % 100 < 10 || count % 100 >= 20)
        ) {
            return word + 'и'; // Для чисел, оканчивающихся на 2-4 (кроме 12-14)
        } else {
            return word + 'ей'; // Для остальных случаев
        }
    }

    return `В результате выполнения запроса было найдено ${n} ${
        pluralizeWord('запис', n)
    }`;
}

// Пример использования:
console.log(pluralizeRecords(1));
// Вывод: "В результате выполнения запроса было найдено 1 запись"
console.log(pluralizeRecords(2));
// Вывод: "В результате выполнения запроса было найдено 2 записи"
console.log(pluralizeRecords(5));
// Вывод: "В результате выполнения запроса было найдено 5 записей"
