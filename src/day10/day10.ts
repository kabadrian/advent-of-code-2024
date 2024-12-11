import { AOCSolver } from '../utils';
import { readFile } from '../utils';

function isOutOfBounds(x: number, y: number, maxX: number, maxY: number): boolean {
    return x < 0 || y < 0 || x >= maxX || y >= maxY;
}

function getStartingPositions(map: number[][]): number[][] {
    const startingPositions: number[][] = [];

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === 0) {
                startingPositions.push([x, y]);
            }
        }
    }

    return startingPositions;
}

const directions =[[-1, 0], [1, 0], [0, -1], [0, 1]];

function DFS(map: number[][], x: number, y: number, visited: boolean[][], ignoreVisited: boolean): number {
    let result = 0;

    if (isOutOfBounds(y, x, map[0].length, map.length) || (visited[y][x] && !ignoreVisited)) {
        return 0;
    }

    visited[y][x] = true;

    if (map[y][x] === 9) {
        return 1;
    }

    const currentValue = map[y][x];

    for (const [dx, dy] of directions) {
        const outOfBounds = isOutOfBounds(x + dx, y + dy, map[0].length, map.length);
        const canMove = !outOfBounds && map[y + dy][x + dx] === currentValue + 1;
        result += canMove ? DFS(map, x + dx, y + dy, visited, ignoreVisited) : 0;
    }

    return result;
}


export class Day10FirstTaskSolver implements AOCSolver {
    filePath: string;

    constructor(filePath: string = 'src/day10/day10-test.txt') {
        this.filePath = filePath;
    }

    solve(): number {
        const input = readFile(this.filePath).split('\n').map((line) => line.trim().split('').map(Number));

        const startingPositions = getStartingPositions(input);

        let result = 0;
        for (const [x, y] of startingPositions) {
            const visited = input.map((row) => row.map(() => false));
            result += DFS(input, x, y, visited, false);
        }

        return result;
    }
}


export class Day10SecondTaskSolver implements AOCSolver {
    filePath: string;

    constructor(filePath: string = 'src/day10/day10-test.txt') {
        this.filePath = filePath;
    }

    solve(): number {
        const input = readFile(this.filePath).split('\n').map((line) => line.trim().split('').map(Number));

        const startingPositions = getStartingPositions(input);

        let result = 0;
        for (const [x, y] of startingPositions) {
            const visited = input.map((row) => row.map(() => false));
            result += DFS(input, x, y, visited, true);
        }

        return result;
    }
}