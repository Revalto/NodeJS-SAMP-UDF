const UDF = require('./lib');
const myUDF = new UDF();

console.log(
    myUDF.SendChat(`hello my друг`),
)