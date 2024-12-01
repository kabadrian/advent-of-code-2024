import { AOCSolver } from '../utils';
import { getLinesFromFile } from '../utils';

export function parseInput(taskInput: string[]): [number[], number[]]{
    const firstArray = [];
    const secondArray = [];

    for (const line of taskInput){
        const [first, second] = line.split(/\s+/).map(Number);

        if (isNaN(first) || isNaN(second)){
            continue;
        }

        firstArray.push(first);
        secondArray.push(second);
    }

    return [firstArray.sort(), secondArray.sort()];
}

export function calculateDifferences(firstArray: number[], secondArray: number[]): number {
    let result = 0;

    for (let i = 0; i < firstArray.length; i++){
        const diff = Math.abs(firstArray[i] - secondArray[i]);
        // console.debug(diff);
        result += diff;
    }

    return result;
}

export function calculateOccurences(firstArray: number[], secondArray: number[]): number {
    let result = 0;
    const occurences = new Map<number, number>();

    for (let i = 0; i < secondArray.length; i++){
        const number = secondArray[i];
        const numberCount = occurences.get(number) || 0;

        occurences.set(number, numberCount + 1);
    }
    // console.debug("occurences", occurences);

    for (let i = 0; i < firstArray.length; i++){
        const number = firstArray[i];
        const numberOccurences = occurences.get(number) || 0;

        // console.debug("nummber", number, "occurences", numberOccurences);

        result += numberOccurences * number;
    }

    return result;
}

export class Day01FirstTaskSolver implements AOCSolver {
    filePath: string;

    constructor(filePath: string = 'src/day01/day01.txt') {
        this.filePath = filePath;
    }

    solve(): number {
        const taskInput = getLinesFromFile(this.filePath);  
        const [firstArray, secondArray] = parseInput(taskInput);

        return calculateDifferences(firstArray, secondArray);
    }
}

export class Day01SecondTaskSolver implements AOCSolver {
    filePath: string;

    constructor(filePath: string = 'src/day01/day01.txt') {
        this.filePath = filePath;
    }
    solve(): number {
        const taskInput = getLinesFromFile(this.filePath);  
        const [firstArray, secondArray] = parseInput(taskInput);

        return calculateOccurences(firstArray, secondArray);
    }
}