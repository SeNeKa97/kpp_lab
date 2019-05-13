
function task_15 (num){
    var result;

    switch(num){
        case 1:
            result = "Зима";
            break;
        case 2:
            result = "Весна";
            break;
        case 3:
            result = "Лето";
            break;
        case 4:
            result = "Осень";
            break;
        default:
            console.log("Invalid value");
            result = "";
    }

    return result;
}


function task_53 (str){
    var digits = str.match(/[0-9]/g);
    var sum = 0;

    if (digits == null)   return 0;

    for(var i = 0; i < digits.length; i++){
        sum = sum + digits[i] * 1;
    }

    return sum;
}


function task_80 (str){
    
    var chars = str.split('');
    var resultString = "";

    for(var i = 0; i < chars.length; i++){
        var randChar1 = getRandChar();
        var randChar2 = getRandChar();

        resultString = resultString + chars[i] + randChar1 + randChar2;
    }

    return resultString;

    function getRandChar(){
        var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        return alphabet[Math.trunc(Math.random()*62)];
    }
}



function task_130 (str){
    if (str.match(/Java/i) != null)
        return true;
    else
        return false;
}

function task_165 (){

    for (var leftNum = 10; leftNum < 100; leftNum++){
        for(var rigthNum = 10; rigthNum < 100; rigthNum++){
            concatNum = ("" + leftNum + rigthNum) * 1;
            if (concatNum % (leftNum*rigthNum) == 0)
                console.log("Найдены числа: " + leftNum +", "+ rigthNum);
        }
    }
}

console.log("===== Задание № 1 (15) =====");
for (var i = 1; i <= 4; i++)
    console.log(i + " " + task_15(i));
console.log("============================");

console.log("===== Задание № 2 (53) =====");
console.log("Входная строка: Н3котор4я стро7к4"); 
console.log("Результат: " + task_53("Н3котор4я стро7к4"))
console.log("============================");

console.log("===== Задание № 3 (80) =====");
console.log("Исходная строка: Текст пример");
console.log("Результат: " + task_80("Текст пример"));
console.log("============================");

console.log("===== Задание № 4 (130) =====");
console.log("Пример строки без слова \'Java\': Some string");
console.log("Результат: " + task_130("Some string"));
console.log("Пример строки с словом \'Java\': The javascript");
console.log("Результат: " + task_130("The javascript"));
console.log("=============================");

console.log("===== Задание № 5 (165) =====");
task_165();
console.log("=============================");

console.log(2/"1");
console.log("1"/2);
console.log(2/"1i");
console.log("1i"/2);