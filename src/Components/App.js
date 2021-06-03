import React, { Component } from 'react';
import Button from './Button';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttons: [
                { key: 1, id: 'clear', value: 'AC', class: 'span-two' },
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
            computation:'',
            expression: ''
        }

        this.clear = ()=> {
            this.setState({currentOperand:''});
            this.setState({previousOperand:''});
            this.setState({operation: null});
            this.setState({expression: ''});
        }
    
        this.deleteNumber = ()=> {
            this.setState({currentOperand:this.state.currentOperand.toString().slice(0,-1)});
        }
    
        this.appendNumber = (number)=>{
            if(number === '.' && this.state.currentOperand.includes('.')) return;
            if(number === '0' && this.state.currentOperand.includes('0')) return;
            this.setState({currentOperand: this.state.currentOperand + number});
        }
    
        this.chooseOperation = (operation)=>{
            this.setState({
                operation: operation,
                currentOperand: '',
                previousOperand: this.state.currentOperand
            });
    
        }
    
        this.compute = ()=> {
           
            if(/÷/g.test(this.state.expression)){
                this.setState({expression: this.state.expression.replace(/÷/g,'/')});
            }
            //  If 2 or more operators are entered consecutively, use the last operator
            if(/(\*|\+|\/)-\//g.test(this.state.expression)){
                this.setState({expression: this.state.expression.replace(/(\*|\+|\/)-\//g,'/')});
            }else if(/(\/|\+|\*)-\*/g.test(this.state.expression)){
                this.setState({expression: this.state.expression.replace(/(\/|\+|\*)-\*/g,'*')});
            }else if(/(\/|\*)-\+/g.test(this.state.expression)){
                this.setState({expression: this.state.expression.replace(/(\/|\*)-\+/g,'+')});
            }
            else if(/(\*|\+|\/)\//g.test(this.state.expression)){
                this.setState({expression: this.state.expression.replace(/(\*|\+|\/)\//g,'/')});
            }else if(/(\/|-|\+)\*/g.test(this.state.expression)){
                this.setState({expression: this.state.expression.replace(/(\/|-|\+)\*/g,'*')});
            }else{
                console.log(this.state.expression);
            }

            this.setState({expression: this.state.expression + this.state.currentOperand});
             // round off the computation to 4 decimal places
             // eslint-disable-next-line
            this.setState({computation: eval(this.state.expression).toFixed(4)});
            // convert the computation into a Number
            this.setState({computation: parseFloat(this.state.computation)});
            this.setState({currentOperand: this.state.computation});

        }
    
        
    
        this.updateDisplay = ()=> {
            // if previous operand starts wit zeros remove them.
            if(/^0{1,}/.test(this.state.previousOperand)){
                this.setState({previousOperand: this.state.previousOperand.replace(/^0{1,}/,'')});
            }

            if(this.state.operation !== null){
                // this.setState({expression: this.state.computation});
                this.setState({previousOperand: this.state.previousOperand + this.state.operation});
                if(this.state.computation){
                    this.setState({expression: this.state.previousOperand});
                }else{
                    this.setState({expression: this.state.expression + this.state.previousOperand});
                }
                
            }else{
                this.setState({previousOperand: ''});
            }

            this.setState({computation: ''});
           
           
        }

        

    }

    componentDidMount(){
        const numberButtons = document.querySelectorAll('.number');
        const operationButtons = document.querySelectorAll('.operation');
        const equalsButton = document.querySelector('#equals');
        const deleteButton = document.querySelector('#delete');
        const allClearButton = document.querySelector('#clear');

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
        })

        allClearButton.addEventListener('click', (button)=>{
            this.clear();
        })
        
        deleteButton.addEventListener('click', (button)=>{
            this.deleteNumber();
        })
    }

    render() {
        return (
            <div className="calculator-grid">
                <div className="output">
                    <div className="previous-operand">{this.state.expression}</div>
                    <div className="current-operand" id='display'>{this.state.currentOperand?this.state.currentOperand:0}</div>
                </div>

                {this.state.buttons.map(button=> <Button key={button.key} attributes={button}/>)}

            </div>
        )
    }
}

export default App;