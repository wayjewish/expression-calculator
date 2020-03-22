function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    expr = expr.replace(/\s+/g, '');

    if (expr.includes('/0')) throw new Error("TypeError: Division by zero.");
    if (expr.replace(/[(]/g).length != expr.replace(/[)]/g).length) throw new Error("ExpressionError: Brackets must be paired");

    


    //перебрать выражения в скобках посчитать и заменить в исходной строке
    if (expr.match(/\(/g) != null) {
        let countBrackets = expr.match(/\(/g).length;
        for (let i = 0; i < countBrackets; i++) {            
            let brackets = expr.match(/(\([0-9\+\/\*\-.]+\))/g)[0];
            let expression = brackets.slice(1, -1);
            expr = expr.replace(brackets, calc(expression));
        }
    }

    return calc(expr);

}



function calc(expression) {

    if (expression.match(/\+\-/g) != null) expression = expression.replace(/\+\-/g, "-");
    if (expression.match(/\-\+/g) != null) expression = expression.replace(/\-\+/g, "-");

    if (expression.match(/\+\+/g) != null) expression = expression.replace(/\+\+/g, "+");
    if (expression.match(/\-\-/g) != null) expression = expression.replace(/\-\-/g, "+");

    if (expression.match(/\*/g) != null) expression = expression.replace(/\*/g, " * ");
    if (expression.match(/\//g) != null) expression = expression.replace(/\//g, " / ");
    if (expression.match(/\+/g) != null) expression = expression.replace(/\+/g, " + ");
    if (expression.match(/\-/g) != null) expression = expression.replace(/\-/g, " - ");

    if (expression.match(/\s{2,}/g) != null) expression = expression.replace(/\s{2,}/g, " ");

    expression = expression.split(" ");
    
    for (let i = 0; i < expression.length; i++) {
        switch (expression[i]) {
            case "*":
                if(expression[i+1] == "+" || expression[i+1] == "-"){
                    expression.splice(i-1, 4, Number(expression[i-1]) * Number(expression[i+1] + expression[i+2]));
                }else{
                    expression.splice(i-1, 3, Number(expression[i-1]) * Number(expression[i+1])); 
                }

                i = 0;
                break;
            case "/": 
                if(expression[i+1] == "+" || expression[i+1] == "-"){
                    expression.splice(i-1, 4, Number(expression[i-1]) / Number(expression[i+1] + expression[i+2]));
                }else{
                    expression.splice(i-1, 3, Number(expression[i-1]) / Number(expression[i+1])); 
                }
                
                i = 0;
                break;
        }
    }

    for (let i = 0; i < expression.length; i++) {
        switch (expression[i]) {
            case "+":
                expression.splice(i-1, 3, Number(expression[i-1]) + Number(expression[i+1]));

                i = 0;
                break;
            case "-":
                expression.splice(i-1, 3, Number(expression[i-1]) - Number(expression[i+1]));
                
                i = 0;
                break;
        }
    }

    return Number(expression[0]);
} 

module.exports = {
    expressionCalculator
}