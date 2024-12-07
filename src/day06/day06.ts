import { AOCSolver, getLinesFromFileMultipleParts } from '../utils';
import { getLinesFromFile } from '../utils';

function readMap(input: string[]): string[][] {
    const map: string[][] = [];

    for (const line of input) {
        const mapLine = line.split('');
        map.push(mapLine);
    }

    return map;
}

function getStartingPosition(map: string[][]): [number, number] {

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === '^') {
                return [i, j];
            }
        }
    }

    return [-1, -1];
}

const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1]
];

function getNextCell(map: string[][], currentPosition: [number, number], currentDirection: number): string {
    const [i, j] = currentPosition;
    const [di, dj] = directions[currentDirection];
    const newI = i + di;
    const newJ = j + dj;

    if (newI >= 0 && newI < map.length && newJ >= 0 && newJ < map[newI].length) {
        return map[newI][newJ];
    }

    return '-';
}

function canMove(nextCell: string): boolean {
    return nextCell !== '#';
}

function changeDirection(currentDirection: number): number {
    return (currentDirection + 1) % 4;
}


function outOfBounds(map: string[][], currentPosition: [number, number], currentDirection: number): boolean {
    return getNextCell(map, currentPosition, currentDirection) === '-';
}

function traverseMap(map: string[][], startingPosition: [number, number]): string[] {
    let direction = 0;

    let [i, j] = startingPosition;

    // Set of already visited cells
    const alreadyVisited = new Set<string>();

    alreadyVisited.add(`${i}, ${j}`);

    while (true) {
        const next_i = i + directions[direction][0];
        const next_j = j + directions[direction][1];

        if( map[next_i][next_j] === '#') {
            direction = changeDirection(direction);
        } else {
            i = next_i;
            j = next_j;
            alreadyVisited.add(`${i}, ${j}`);

        }

        if (outOfBounds(map, [i, j], direction)) {
            return Array.from(alreadyVisited);
        }
    }
}

function willReachCycle(map: string[][], startingPosition: [number, number], position: [number, number]): boolean {
    const mapCopy = structuredClone(map);
    let direction = 0;

    // At this position there is already a wall
    if (mapCopy[position[0]][position[1]] === '#') {
        return false;
    }

    // Place obstacle at the given position
    mapCopy[position[0]][position[1]] = '#';

    let [i, j] = startingPosition;

    // Set of already visited cells
    const alreadyVisited = new Set<string>();

    while (true) {
        if (alreadyVisited.has(`${i}, ${j}, ${direction}`)) {
            return true;
        }

        // Add current cell to the set of visited cells
        alreadyVisited.add(`${i}, ${j}, ${direction}`);

        const next_i = i + directions[direction][0];
        const next_j = j + directions[direction][1];

        if( mapCopy[next_i][next_j] === '#') {
            direction = changeDirection(direction);
        } else {
            i = next_i;
            j = next_j;
        }

        if (outOfBounds(mapCopy, [i, j], direction)) {
            return false;
        }
    }
}

export class Day06FirstTaskSolver implements AOCSolver {
    filePath: string;

    constructor(filePath: string = 'src/day06/day06-test.txt') {
        this.filePath = filePath;
    }

    solve(): number {
        const taskInput = getLinesFromFile(this.filePath);

        const map = readMap(taskInput);
        const startingPosition = getStartingPosition(map);
        const visitedCells = traverseMap(map, startingPosition);

        return visitedCells.length
    }
}

export class Day06SecondTaskSolver implements AOCSolver {
    filePath: string;

    constructor(filePath: string = 'src/day06/day06-test.txt') {
        this.filePath = filePath;
    }

    solve(): number {
        const taskInput = getLinesFromFile(this.filePath);
        const map = readMap(taskInput);

        const startingPosition = getStartingPosition(map);
        const visitedCells = traverseMap(map, startingPosition);

        let count = 0;

        for(const visitedCell of visitedCells) {
            const [i, j] = visitedCell.split(',').map(Number);

            if (willReachCycle(map, startingPosition, [i, j])) {
                count++;
            }
        
        }

        // return countValidPrintLines(secondPart, orderingMap);
        return count
    }
}
