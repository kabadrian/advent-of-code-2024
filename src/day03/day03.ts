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

function extractMultiplicationStrings(inputLine: string): string[] {
    const searchRegex = /mul\(\d+,\d+\)/g;

    return inputLine.match(searchRegex) || [];
}

function extractMultiplicationAndCommands(inputLine: string): string[] {
    const searchRegex = /mul\(\d+,\d+\)|do\(\)|don\'t\(\)/g;

    return inputLine.match(searchRegex) || [];
}

function cleanMultiplicationAndCommandsString(extractedStrings: string[]): string[] {
    let include = true;
    let cleanedStrings: string[] = [];

    for (let i = 0; i < extractedStrings.length; i++) {
        if (extractedStrings[i].includes("do()")) {
            include = true;
        } else if (extractedStrings[i].includes("don't()")) {
            include = false;
        } else if (include) {
            cleanedStrings.push(extractedStrings[i]);
        }
    }
    return cleanedStrings;
}

function countMultiplication(multiplicationString: string): number {
    const numbers = multiplicationString.match(/\d+/g) || [];

    if (numbers.length !== 2) {
        throw new Error("Invalid multiplication string");
    }

    return parseInt(numbers[0]) * parseInt(numbers[1]);
}

function countMultiplicationsFromLine(inputLine: string, canIncludeCommands: boolean = false): number {
    const extractedStrings = canIncludeCommands ? extractMultiplicationAndCommands(inputLine) : extractMultiplicationStrings(inputLine);
    const cleanedStrings = canIncludeCommands ? cleanMultiplicationAndCommandsString(extractedStrings) : extractedStrings;


    return cleanedStrings.reduce((acc, multiplicationString) => {
        return acc + countMultiplication(multiplicationString);
    }, 0);
}

function countMultiplicationsFromInput(inputLines: string[], canIncludeCommands: boolean = false): number {

    return inputLines.reduce((acc, inputLine) => {
        return acc + countMultiplicationsFromLine(inputLine, canIncludeCommands);
    }, 0);
}



export class Day03FirstTaskSolver implements AOCSolver {
    filePath: string;

    constructor(filePath: string = 'src/day03/day03-test.txt') {
        this.filePath = filePath;
    }

    solve(): number {
        const taskInput = getLinesFromFile(this.filePath);
        const parsedInput = countMultiplicationsFromInput(taskInput);

        return parsedInput;
    }
}

export class Day03SecondTaskSolver implements AOCSolver {
    filePath: string;

    constructor(filePath: string = 'src/day03/day03-test.txt') {
        this.filePath = filePath;
    }

    solve(): number {
        const taskInput = getLinesFromFile(this.filePath).join("\n");

        return countMultiplicationsFromLine(taskInput, true);
    }
}