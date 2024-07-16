//Seleção dos elementos:
const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")

//Logica da aplicação:
class Caculator {
    constructor(previousOperationText, currentOperationText){
        //Acessando as propriedades do meu objeto:
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        //valor vazio = pra diferenciar o que a pessoa estará digitando no momento, e não o que estará sendo impresso na tela:
        this.currentOperation = "";
    }

    //Adicionando os digitos da calculadora:
    addDigit(digit){
        //Checando que não vai ser possivel adicionar mais de um "."
        if(digit === "." && currentOperationText.innerText.includes(".")){
            return;
        }
        this.currentOperation = digit;
        this.updateScreen();
    }

    //Processo para calcular as operações:
    processoOperation(operation){
        //chacando se o valor de baixo(current) está vazio
        if(this.currentOperationText.innerText === "" && operation !== "C"){
            //mudança de operação
            if(previousOperationText.innerText !== ""){                
                this.changeOperation(operation);
            }
            return;
        }
        //Pegando os valores
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation){
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processoDelOperator();
                break;
            case "CE":
                this.processoClearCurrentOperation();
                break;
            case "C":
                this.processoClearAllOperation();
                break;
            case "=":
                this.processoEqualsperation();
                break;
            default:
                return;
        }
    }

    //Responsavel por atualizar a tela que vai ser solicitado mais de uma vez, por isso coloquei em outro método:
    updateScreen(operationValue = null, operation = null, current = null, previous = null)
    {
        if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation;
        } else{
            //checando se o valor é igual a zero e adicionando o valor de current
            if(previous === 0){
                operationValue = current;
            }
            //adicionando o valor de baixo(current) para cima (previous)
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
        
    }

    //conseguindo mudar de operador 
    changeOperation(operation){
        const mathOperation =["+", "-", "/", "*"];

        if(!mathOperation.includes(operation)){
            return;
        }
        this.previousOperationText.innerText =
        this.previousOperationText.innerText.slice(0, -1) + operation;
    }
    
    //deletando um digito baixo(current)
    processoDelOperator(){
        this.currentOperationText.innerText = 
        this.currentOperationText.innerText.slice(0, -1);
    }

    //deletando tudo da parte de baixo(current)
    processoClearCurrentOperation(){
        this.currentOperationText.innerText = "";
    }

    //limpando tudo da calculadora
    processoClearAllOperation(){
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    //processando as operações
    processoEqualsperation(){
        const operation = previousOperationText.innerText.split(" ")[1];
        this.processoOperation(operation);
    }
}

const calc = new Caculator(previousOperationText, currentOperationText);

//Eventos pra fazer a calculadora funcionar: 
buttons.forEach((btn) =>{
    btn.addEventListener("click", (e) =>{
        //Pegando o valor do botão/texto que foi digitado
        const value = e.target.innerText;

        if (+value >= 0 || value === "." ){
            calc.addDigit(value);
        } else {
            calc.processoOperation(value);
        }
    });
});