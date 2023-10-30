function cesar(str, shift, action) {
  const alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
  const alphabetLength = alphabet.length;
  const shiftAmount = shift % alphabetLength;

  if (action === "encode" || action === "decode") {
    const result = [];

    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      const isUpperCase = char === char.toUpperCase();

      if (alphabet.includes(char.toLowerCase())) {
        const index = alphabet.indexOf(char.toLowerCase());

        let shiftedIndex;
        if (action === "encode") {
          shiftedIndex = (index + shiftAmount) % alphabetLength;
        } else {
          shiftedIndex = (index - shiftAmount + alphabetLength) %
            alphabetLength;
        }

        const shiftedChar = alphabet[shiftedIndex];

        if (isUpperCase) {
          result.push(shiftedChar.toUpperCase());
        } else {
          result.push(shiftedChar);
        }
      } else {
        result.push(char);
      }
    }

    return result.join("");
  } else {
    return 'Invalid action. Use "encode" or "decode".';
  }
}

// Пример работы функции.
let encodedMessage = cesar("эзтыхз фзъзъз", 8, "decode"); // Дешифровка
console.log(encodedMessage);

encodedMessage = cesar("хакуна матата", 8, "encode"); // Шифровка
console.log(encodedMessage);

// Ответ: "хакуна матата"
