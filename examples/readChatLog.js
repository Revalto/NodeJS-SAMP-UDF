const UDF = require('../index');
const udf = new UDF();

udf.updates.on('message_new', str => {
    console.log(str); // Вывод в консоль

    // Обрабатываем сообщение
});

udf.Chat.startPolling(); // Запуск чтения