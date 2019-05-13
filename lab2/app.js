
function task_15 (arr, num){
    if(arr == null)
        return;

    if(num<0){
        var cut = arr.splice(0, -num);
        arr = arr.concat(cut);
    }else{
        var cut = arr.splice(arr.length-num, arr.length);
        arr = cut.concat(arr);
    }
    return arr;
}


function task_53 (arr){
    if(arr == null)
        return;

    var neg = arr.filter(function(number){return number < 0;})
    var pos = arr.filter(function(number){return number > 0;})

    console.log("Массив: " + arr);
    console.log("Сумма отрицательных элементов: " + neg.reduce(add));
    console.log("Количество отрицательных элементов: " + neg.length);
    console.log("Сумма положительных элементов: " + pos.reduce(add));

    function add(a, b){
        return a+b;
    }
}


function task_80 (arr){
    if(arr == null)
        return;
    
    console.log(arr.size());
}



function task_130 (matr){
    if(matr==null)
        return;
    
    var flattened = [];

    for(var i = 0; i < matr.length; i++)
        flattened = flattened.concat(matr[i]);


    var filtered = flattened.filter((element)=>{
        return (element % 2 != 0) & (element < 0);
    });
    var result = filtered.reduce(operation);

    return result;

    function operation(a, b){
        return Math.abs(a) + Math.abs(b);
    }
}

function task_165 (matr){

    var newMatr = matr.sort((a,b)=>{
        if (sum(a) > sum(b))
            return 1;
        else if (sum(a) < sum(b))
            return -1;
        else return 0;
    })

    return newMatr;

        
    function sum(arr){
        if (arr==null) return 0;

        var filtered = arr.filter(elem => {
            return (elem < 0) & (elem % 2 == 0);
        });


        if (!filtered.length) return 0;

        return filtered.reduce((a,b)=>{return a+b;});
    }
}

console.log("===== Задание № 1 (15) =====");
var arr = [1,2,3,4,5];
var shift = 2;
console.log("Исходный массив: " + arr);
console.log("Сдвиг: "+ shift);
console.log("Результат: "+task_15(arr, shift));
console.log("+--- Для отрицательных");
var arr = [1,2,3,4,5];
var shift = -2;
console.log("Исходный массив: " + arr);
console.log("Сдвиг: "+ shift);
console.log("Результат: "+task_15(arr, shift));

console.log("============================");

console.log("===== Задание № 2 (53) =====");
task_53([1, 4, 6,-3, 5,-2]);
console.log("============================");

console.log("===== Задание № 3 (80) =====");
//task_80();
console.log("============================");

console.log("===== Задание № 4 (130) =====");
var matr = [
    [ 1, 2,-3, 4, 7],
    [-4, 5, 9,-1, 2],
    [ 0, 4,-2,-3, 8],
    [ 1, 3, 5, 6,-4],
    [ 3, 2, 7, 4,-2]
];
console.log("Исходный массив: ");
for(var i = 0; i < matr.length; i++)
        console.log(matr[i]);

var result = task_130(matr);
console.log("Результат работы метода: " + result);
console.log("=============================");

console.log("===== Задание № 5 (165) =====");
var matr = [
    [ 1,-1, 5,-2],
    [-4,-2, 3, 5],
    [ 2, 0,-6, 1],
    [ 4, 3, 5,-8],
    [-8,-2, 0, 7]
];

console.log("Исходная матрица: ");
for(var i = 0; i < matr.length; i++)
        console.log(matr[i]);

var result = task_165(matr);

console.log("Отсортированная матрица: ");
for(var i = 0; i < result.length; i++)
        console.log(result[i]);
console.log("=============================");
