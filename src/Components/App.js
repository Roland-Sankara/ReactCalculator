import React, { Component } from 'react';
import Button from './Button';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttons: [
                { key: 1, id: 'clear', value: 'Clear', class: 'span-two' },
                { key: 2, id: 'delete', value: 'DEL', class: '' },
                { key: 3, id: 'add', value: '÷', class: 'operation' },
                { key: 4, id: 'one', value: '1', class: 'number' },
                { key: 5, id: 'two', value: '2', class: 'number' },
                { key: 6, id: 'three', value: '3', class: 'number' },
                { key: 7, id: 'multiply', value: '*', class: 'operation' },
                { key: 8, id: 'four', value: '4', class: 'number' },
                { key: 9, id: 'five', value: '5', class: 'number' },
                { key: 10, id: 'six', value: '6', class: 'number' },
                { key: 11, id: 'divide', value: '+', class: 'operation' },
                { key: 12, id: 'seven', value: '7', class: 'number' },
                { key: 13, id: 'eight', value: '8', class: 'number' },
                { key: 14, id: 'nine', value: '9', class: 'number' },
                { key: 15, id: 'subtract', value: '-', class: 'operation' },
                { key: 16, id: 'zero', value: '0', class: 'number' },
                { key: 17, id: 'decimal', value: '.', class: 'number' },
                { key: 18, id: 'equals', value: '=', class: 'span-two' }
                
            ],
            previousOperand: '',
            currentOperand: '',
            operation: null,
            computation:null
        }

        this.clear = ()=> {
            this.setState({currentOperand:''});
            this.setState({previousOperand:''});
            this.setState({operation: null});
        }
    
        this.deleteNumber = ()=> {
            this.setState({currentOperand:this.state.currentOperand.toString().slice(0,-1)});
        }
    
        this.appendNumber = (number)=>{
            if(number === "." && this.state.currentOperand.toString().includes('.')) return;
            this.setState({currentOperand:this.state.currentOperand.toString() + number.toString()});
        }
    
        this.chooseOperation = (operation)=>{
            if(this.state.currentOperand === '') return;
            if(this.state.previousOperand !== ''){
                this.compute();
            }
            this.setState({operation:operation});
            this.setState({previousOperand:parseFloat(this.state.currentOperand).toString()});
            this.setState({currentOperand:''});
    
        }
    
        this.compute = ()=> {
            const prev = parseFloat(this.state.previousOperand);
            const current = parseFloat(this.state.currentOperand);
            // console.log(prev,current);
            if(isNaN(prev) || isNaN(current)) return;
    
            switch (this.state.operation){
                case '+':
                    this.setState({computation: prev + current});
                    break;
                case '÷':
                    this.setState({computation: prev / current});
                    break;
                case '-':
                    this.setState({computation: prev - current});
                    break;
                case '*':
                    this.setState({computation: prev * current});
                    break;
                default:
                    return 
            }
    
            this.setState({currentOperand: this.state.computation});
            this.setState({operation: null});
            this.setState({previousOperand:''});
        }
    
        // this.getDisplayNumber = (number)=> {
        //     const stringNumber = number.toString();
        //     const integerDigits = parseFloat(stringNumber.split('.')[0]);
        //     const decimalDigits = stringNumber.split('.')[1];
        //     let integerDisplay;
    
        //     if(isNaN(integerDigits)){
        //         integerDisplay = '';
        //     }
        //     else{
        //         integerDisplay = integerDigits.toLocaleString('en',{
        //             maximumFractionDigits:0
        //         })
        //     }
    
        //     if(decimalDigits != null){
        //         return parseFloat(`${integerDisplay}.${decimalDigits}`);
        //     } 
        //     else{
        //         return integerDisplay;
        //     }
        // }
    
        this.updateDisplay = ()=> {
            // this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
            console.log(this.state.operation, this.state.currentOperand, this.state.previousOperand);
            if(this.state.operation !== null){
                this.setState({previousOperand: `${this.state.previousOperand} ${this.state.operation}`});
            }
            else{
                this.setState({previousOperand:''});
            }
            
        }

        

    }

    componentDidMount(){
        const numberButtons = document.querySelectorAll('.number');
        const operationButtons = document.querySelectorAll('.operation');
        const equalsButton = document.querySelector('#equals');
        const deleteButton = document.querySelector('#delete');
        const allClearButton = document.querySelector('#clear');
        const displayElement = document.querySelector('#display');

        numberButtons.forEach(button=>{
            button.addEventListener('click', ()=>{
                this.appendNumber(button.innerText);
            })
        })

        operationButtons.forEach(button=>{
            button.addEventListener('click', ()=>{
                this.chooseOperation(button.innerText);
                this.updateDisplay();
            })
        })

        equalsButton.addEventListener('click', (button)=>{
            this.compute();
            this.updateDisplay();
        })

        allClearButton.addEventListener('click', (button)=>{
            this.clear();
            this.updateDisplay();
            displayElement.innerText = 0;
        })
        
        deleteButton.addEventListener('click', (button)=>{
            this.deleteNumber();
        })
    }

    render() {
        return (
            <div className="calculator-grid">
                <div className="output">
                    <div className="previous-operand">{this.state.previousOperand}</div>
                    <div className="current-operand" id='display'>{this.state.currentOperand}</div>
                </div>

                {this.state.buttons.map(button=> <Button key={button.key} attributes={button}/>)}

            </div>
        )
    }
}

export default App;