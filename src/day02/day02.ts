import { AOCSolver } from '../utils';
import { getLinesFromFile } from '../utils';

export function parseInput(taskInput: string[]): number[][]{
    const input: number[][] = [];

    for (const line of taskInput){
        if (line.trim() === "") {
            continue;
        }

        const parsedNumbers: number[] = line.split(/\s+/).map(Number);

        input.push(parsedNumbers);
    }
    return input;
}

function isArraySafe(numberArray: number[]): boolean {
    let lastItem = numberArray[0];
    let increasing = numberArray[0] < numberArray[1];

    for (let i = 1; i < numberArray.length; i++) {
        if (increasing && numberArray[i] <= lastItem) {
            return false;
        } else if (!increasing && numberArray[i] >= lastItem) {
            return false;
        } else if (Math.abs(numberArray[i] - lastItem) > 3) {
            return false;
        }

        lastItem = numberArray[i];
    }
    return true;
}

function removeElementAtIndex(arr: number[], index: number) {
    return arr.slice(0, index).concat(arr.slice(index + 1));
}

function countSafeArrays(input: number[][]): number {
    let count = 0;
    for (const numberArray of input) {
        if(isArraySafe(numberArray)) {
            count++;
        }
    }
    return count;
}

function countSafeArraysPartTwo(input: number[][]): number {
    let count = 0;
    for (const numberArray of input) {
        let isSafe = false;
        for (let i = 0; i < numberArray.length; i++) {
            const removedArray = removeElementAtIndex(numberArray, i);
            if(isArraySafe(removedArray)) {
                isSafe = true;
                break;
            }
        }
        if(isSafe) {
            count++;
        }
    }
    return count;
}

export class Day02FirstTaskSolver implements AOCSolver {
    filePath: string;

    constructor(filePath: string = 'src/day02/day02-test.txt') {
        this.filePath = filePath;
    }

    solve(): number {
        const taskInput = getLinesFromFile(this.filePath);  
        const parsedInput = parseInput(taskInput);

        return countSafeArrays(parsedInput);
    }
}

export class Day02SecondTaskSolver implements AOCSolver {
    filePath: string;

    constructor(filePath: string = 'src/day02/day02-test.txt') {
        this.filePath = filePath;
    }

    solve(): number {
        const taskInput = getLinesFromFile(this.filePath);
        const parsedInput = parseInput(taskInput);

        return countSafeArraysPartTwo(parsedInput);
    }
}