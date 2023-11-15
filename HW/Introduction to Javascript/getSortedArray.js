function getSortedArray(array, key) {
    return array.slice().sort((a, b) => {
        if (a[key] < b[key]) {
            return -1;
        } else if (a[key] > b[key]) {
            return 1;
        } else {
            return 0;
        }
    });
}

// Пример работы функции.
let array = [
    { name: 'Макар', age: 20 },
    { name: 'Роберт', age: 32 },
    { name: 'Екатерина', age: 50 },
    { name: 'Оксана', age: 24 },
    { name: 'Святослав', age: 43 },
];

array = getSortedArray(array, 'age');
console.log(array);
// [{name: 'Макар', age: 20},
// {name: 'Оксана', age: 24},
// {name: 'Роберт', age: 32},
// {name: 'Святослав', age: 43},
// {name: 'Екатерина', age: 50}];

array = getSortedArray(array, 'name');
console.log(array);
// [{name: 'Екатерина', age: 50},
// {name: 'Макар', age: 20},
// {name: 'Оксана', age: 24},
// {name: 'Роберт', age: 32},
// {name: 'Святослав', age: 43}];
