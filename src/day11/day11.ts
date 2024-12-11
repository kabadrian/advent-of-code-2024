import { AOCSolver } from '../utils';
import { readFile } from '../utils';


const cacheMap = new Map<string, number>();
function solve(input: number, depth:number = 0, maxDepth: number = 25): number {
    let total = 0

    const key = `${input}-${depth}`;

    if (cacheMap.has(key)) {
        return cacheMap.get(key)!;
    }

    // console.log("input", input, "depth", depth, "maxDepth", maxDepth);
    if (depth === maxDepth) {
        // cacheMap.set(key, total);
        return 1;
    }


    const stringNumber = input.toString();

    if(input === 0) {
        total += solve(1, depth + 1, maxDepth);
    } else if(stringNumber.length % 2 === 0) {
        const half = stringNumber.length / 2;
        const firstHalf: number  = Number(stringNumber.slice(0, half));
        const secondHalf: number = Number(stringNumber.slice(half));

        // console.log("firstHalf", firstHalf, "secondHalf", secondHalf);

        total += solve(firstHalf, depth + 1, maxDepth);
        total += solve(secondHalf, depth + 1, maxDepth);
    } else {
        total += solve(input * 2024, depth + 1, maxDepth);
    }
    cacheMap.set(key, total);
    return total;
}



export class Day11FirstTaskSolver implements AOCSolver {
    filePath: string;

    constructor(filePath: string = 'src/day11/day11-test.txt') {
        this.filePath = filePath;
    }

    solve(): number {
        const input = readFile(this.filePath).split(' ').map(Number);
        const repeat = 25;
        const result = input.reduce((acc, currNumber) => (acc + solve(currNumber, 0, repeat)), 0);

        return result;
    }
}


export class Day11SecondTaskSolver implements AOCSolver {
    filePath: string;

    constructor(filePath: string = 'src/day11/day11-test.txt') {
        this.filePath = filePath;
    }

    solve(): number {
        const input = readFile(this.filePath).split(' ').map(Number);
        const repeat = 75;
        const result = input.reduce((acc, currNumber) => (acc + solve(currNumber, 0, repeat)), 0);

        return result;
    }
}