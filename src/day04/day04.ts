import { AOCSolver } from '../utils';
import { getLinesFromFile } from '../utils';

function reverseString(str: string): string {
    return str.split('').reverse().join('');
}

function flipVertical(input: string[]): string[] {
    const swapped: string[] = [];

    for (let i = 0; i < input[0].length; i++) {
        swapped.push(reverseString(input[i]));
    }
    return swapped;
}

function flipHorizontal(array: string[]): string[] {
    const rows = array.length;
    const cols = array[0].length;
    const result = [];

    for (let i = 0; i < cols; i++) {
        let newRow = '';
        for (let j = 0; j < rows; j++) {
            newRow += array[j][i];
        }
        result.push(newRow);
    }

    return result;
}

function getDiagonals(array: string[]): string[] {
    const rows = array.length;
    const cols = array[0].length;
    const diagonals = [];

    // Get left-to-right diagonals
    for (let d = 0; d < rows + cols - 1; d++) {
        let diagonal = '';
        for (let i = 0; i < rows; i++) {
            const j = d - i; // Calculate column index
            if (j >= 0 && j < cols) {
                diagonal += array[i][j];
            }
        }
        if (diagonal) diagonals.push(diagonal);
    }

    return diagonals;
}

function countXmasOccurences(input: string[]): number {
    let count = 0;

    for (const line of input) {
        count += (line.match(/XMAS/g) || []).length;
    }

    return count;
}

function countXMASOccurencesAllCombinations(input: string[]): number {
    let xmasCount = 0;

    // To get all possible combinations, we need to flip the input in all possible ways
    // original array, flipped vertically, flipped horizontally, diagonals and flipped diagonally

    // Original array
    xmasCount += countXmasOccurences(input);
    console.debug(`Left to right: ${countXmasOccurences(input)}`);


    // Flipped vertically
    const flippedVertical = flipVertical(input);
    xmasCount += countXmasOccurences(flippedVertical);
    console.debug(`Right to left: ${countXmasOccurences(flippedVertical)}`);

    // Flipped horizontally
    const flippedHorizontal = flipHorizontal(input);
    xmasCount += countXmasOccurences(flippedHorizontal);
    console.debug(`Top to bottom: ${countXmasOccurences(flippedHorizontal)}`);

    // Flipped horizontally and vertically
    const flippedHorizontalAndVertical = flipVertical(flipHorizontal(input))
    xmasCount += countXmasOccurences(flippedHorizontalAndVertical);
    console.debug(`Bottom to top: ${countXmasOccurences(flippedHorizontalAndVertical)}`);


    // Diagonals
    const diagonals = getDiagonals(input);
    xmasCount += countXmasOccurences(diagonals);
    console.debug(`Diagonals: ${countXmasOccurences(diagonals)}`);

    // Flipped diagonals - vertically
    const flippedDiagonalsVertical = getDiagonals(flippedVertical);
    xmasCount += countXmasOccurences(flippedDiagonalsVertical);
    console.debug(`Flipped diagonals vertically: ${countXmasOccurences(flippedDiagonalsVertical)}`);


    // Flipped diagonals - horizontally
    const flippedDiagonalsHorizontal = getDiagonals(flippedHorizontal);
    xmasCount += countXmasOccurences(flippedDiagonalsHorizontal);
    console.debug(`Flipped diagonals horizontally: ${countXmasOccurences(flippedDiagonalsHorizontal)}`);


    // Flipped diagonals - horizontally and vertically
    const flippedDiagonalsHorizontalAndVertical = getDiagonals(flipHorizontal(flipVertical(input)));
    xmasCount += countXmasOccurences(flippedDiagonalsHorizontalAndVertical);
    console.debug(`Flipped diagonals horizontally and vertically: ${countXmasOccurences(flippedDiagonalsHorizontalAndVertical)}`);

    return xmasCount;
}

const MASK_OPTIONS = [
    [
        'M.S',
        '.A.',
        'M.S',
    ],
    [
        'S.S',
        '.A.',
        'M.M',
    ],
    [
        'M.M',
        '.A.',
        'S.S',
    ],
    [
        'S.M',
        '.A.',
        'S.M',
    ]
]

function getSubArray(array: string[][], row: number, col: number, size: number): string[][] {
    const subArray = [];

    for (let i = row; i < row + size; i++) {
        const row = array[i].slice(col, col + size);
        subArray.push(row);
    }

    return subArray;
}

function isArrayMatchingMask(array: string[][], mask: string[][]): boolean {
    const originalArrayString = array.flat().join('');

    for (const maskOption of MASK_OPTIONS) {
        const maskString = maskOption.join('');

        const regex = new RegExp('^' + maskString.replace(/\./g, '.') + '$');
        if (regex.test(originalArrayString)) {
            return true;
        }
    }

    return false;
}

function countXMASOccurences2D(input: string[], maskLength: number = 3): number {
    const array = input.map(line => line.split(''));
    let counter = 0;

    for (let i = 0; i < array.length - maskLength + 1; i++) {
        for (let j = 0; j < array[i].length - maskLength + 1; j++) {
            counter += isArrayMatchingMask(getSubArray(array, i, j, maskLength), MASK_OPTIONS)? 1 : 0;
        }
    }

    return counter;
}


export class Day04FirstTaskSolver implements AOCSolver {
    filePath: string;

    constructor(filePath: string = 'src/day04/day04.txt') {
        this.filePath = filePath;
    }

    solve(): number {
        const taskInput = getLinesFromFile(this.filePath);

        return countXMASOccurencesAllCombinations(taskInput);
    }
}

export class Day04SecondTaskSolver implements AOCSolver {
    filePath: string;

    constructor(filePath: string = 'src/day04/day04.txt') {
        this.filePath = filePath;
    }

    solve(): number {
        const taskInput = getLinesFromFile(this.filePath);

        return countXMASOccurences2D(taskInput);
    }
}