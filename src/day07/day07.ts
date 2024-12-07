import { AOCSolver, getLinesFromFileMultipleParts } from '../utils';
import { getLinesFromFile } from '../utils';


function parseLine(line: string): [number, number[]] {
    const [first, second] = line.split(':');

    const numbers = second.trim().split(' ').map((x) => parseInt(x));

    return [parseInt(first), numbers];
}

function evaluateString(numberInput: number[], operatorString: string): number {

    const operators = operatorString.split('');

    let result: number = numberInput[0];

    for (let i = 0; i < numberInput.length - 1; i++) {
        const operator = operators[i];
        const number = (numberInput[i + 1])

        if (operator === '|') {
            result = parseInt(result.toString() + number);
        } else if (operator === '+') {
            result += number
        } else if (operator === '*') {
            result *= number
        }
    }

    return result;
}

function generatePermutations(operators:string[]= ['+', '*'], length: number): string[] {
    if (length === 0) return [''];
    const smallerPermutations = generatePermutations(operators, length - 1);
    const result = [];
    for (const permutation of smallerPermutations) {
        for (const operator of operators) {
            result.push(permutation + operator);
        }
    }
    return result;
}


function canReachNumber(numbers: number[], target: number, operators: string[] = ['*', '+']): number {
    const permutations = generatePermutations(operators, numbers.length - 1);

    for (const permutation of permutations) {
        if (evaluateString(numbers, permutation) === target) {
            return target;
        }
    }

    return -1;
}




export class Day07FirstTaskSolver implements AOCSolver {
    filePath: string;

    constructor(filePath: string = 'src/day07/day07-test.txt') {
        this.filePath = filePath;
    }

    solve(): number {
        const taskInput = getLinesFromFile(this.filePath);
        let counter = 0;

        for (const line of taskInput) {
            const [target, numberArray] = parseLine(line);

            if (canReachNumber(numberArray, target) !== -1) {
                counter += target;
            }
        }


        return counter;
    }
}


export class Day07SecondTaskSolver implements AOCSolver {
    filePath: string;

    constructor(filePath: string = 'src/day07/day07-test.txt') {
        this.filePath = filePath;
    }

    solve(): number {
        const taskInput = getLinesFromFile(this.filePath);
        let counter = 0;

        for (const line of taskInput) {
            const [target, numberArray] = parseLine(line);

            if (canReachNumber(numberArray, target, ['*', '+', '|']) !== -1) {
                counter += target;
            }
        }


        return counter;
    }
}