import { AOCSolver } from '../utils';
import { readFile } from '../utils';

type Position = {
    x: number,
    y: number,
};

function isOutOfBounds(x: number, y: number, maxX: number, maxY: number): boolean {
    return x < 0 || y < 0 || x >= maxX || y >= maxY;
}

function bfs2D(
    grid: string[][],
    start: Position,
    visited: boolean[][],
    canMove: (from: Position, to: Position) => boolean
): number {
    const directions: number[][] = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];

    let area = 0;
    let perimeter = 0;
    
    const queue: Position[] = [start];
    const result: Position[] = [];

    const setVisited = (pos: Position) => {
        const {x, y} = pos;
        visited[x][y] = true;
        area += 1; 
    }

    const isVisited = (pos: Position): boolean => { 
        const {x, y} = pos;
        return visited[x][y];
    }
    
    setVisited(start);

    while (queue.length > 0) {
        const {x, y} = queue.shift()!;
        result.push({x, y});

        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;
            const newPos = {x: newX, y: newY};
            // Check if the new position is valid and not visited
            if (
                !isOutOfBounds(newX, newY, grid.length, grid[0].length) &&
                !isVisited(newPos) &&
                canMove({x, y}, newPos)
            ) {
                queue.push(newPos);
                setVisited(newPos);
            } else {
                if (!isOutOfBounds(newX, newY, grid.length, grid[0].length)) {
                    if (grid[x][y] === grid[newX][newY]) {
                        continue;
                    }
                }
                perimeter += 1;
            }
        }
    }

    console.log("Area", area);
    console.log("Perimeter", perimeter);

    return area*perimeter;
}

function canMove(from: Position, to: Position, grid: string[][],): boolean {
    return grid[from.x][from.y] === grid[to.x][to.y];
}

function countNeighbours(x: number, y: number, grid: string[][]): number {
    const directions: number[][] = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];

    let count = 0;
    for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;
        if (!isOutOfBounds(newX, newY, grid.length, grid[0].length)) {
            if (grid[x][y] === grid[newX][newY]) {
                count += 1;
            }
        }
    }

    return count;
}

function bfs2DExtended(
    grid: string[][],
    start: Position,
    visited: boolean[][],
    canMove: (from: Position, to: Position) => boolean
): number {
    const directions: number[][] = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];

    let area = 0;
    let perimeter = 0;
    
    const queue: Position[] = [start];
    const result: Position[] = [];

    const setVisited = (pos: Position) => {
        const {x, y} = pos;
        visited[x][y] = true;
        area += 1; 
    }

    const isVisited = (pos: Position): boolean => {
        const {x, y} = pos;
        return visited[x][y];
    }
    
    setVisited(start);

    while (queue.length > 0) {
        const {x, y} = queue.shift()!;
        result.push({x, y});

        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;
            const newPos = {x: newX, y: newY};
            // Check if the new position is valid and not visited
            if (
                !isOutOfBounds(newX, newY, grid.length, grid[0].length) &&
                !isVisited(newPos) &&
                canMove({x, y}, newPos)
            ) {
                queue.push(newPos);
                setVisited(newPos);
            } else {
                if (!isOutOfBounds(newX, newY, grid.length, grid[0].length)) {
                    if (grid[x][y] === grid[newX][newY]) {
                        continue;
                    }
                }
                perimeter += 1;
            }
        }
    }

    // At the end, traverse through all points and determine number of sides they have
    // Possible cases:
    // No neighbours: 4 sides
    // ...
    // .x.
    // ...
    // One neighbour: 3 sides
    // ...
    // .xx
    // ...
    // Two neighbours (L shape): 2 sides
    // .x.
    // .xx
    // ...
    // Two neighbours (I shape): 0 sides -> sides counted in the neighbours
    // ...
    // xxx
    // ...

    console.log("result", result);

    return area*perimeter;
}



export class Day12FirstTaskSolver implements AOCSolver {
    filePath: string;

    constructor(filePath: string = 'src/day12/day12-test.txt') {
        this.filePath = filePath;
    }

    solve(): number {
        const input = readFile(this.filePath).split('\n').map((line) => line.split(''));
        let result = 0;

        const startingPositions: number[][] = [];
        for (let x = 0; x < input.length; x++) {
            for (let y = 0; y < input[x].length; y++) {
            startingPositions.push([x, y]);
            }
        }

        // one global visited array
        const visited = input.map((row) => row.map(() => false));

        for (const [x, y] of startingPositions) {
            if (visited[x][y]) {
                continue;
            }
            console.debug("x,y", x, y);
            result += bfs2D(input, {x, y}, visited, (from, to) => canMove(from, to, input));
        }
    
        console.log(input);

        return result ;
    }
}


export class Day12SecondTaskSolver implements AOCSolver {
    filePath: string;

    constructor(filePath: string = 'src/day12/day12-test.txt') {
        this.filePath = filePath;
    }

    solve(): number {
        const input = readFile(this.filePath).split('\n').map((line) => line.split(''));
        let result = 0;

        const startingPositions: number[][] = [];
        for (let x = 0; x < input.length; x++) {
            for (let y = 0; y < input[x].length; y++) {
            startingPositions.push([x, y]);
            }
        }

        // one global visited array
        const visited = input.map((row) => row.map(() => false));

        for (const [x, y] of startingPositions) {
            if (visited[x][y]) {
                continue;
            }
            console.debug("x,y", x, y);
            result += bfs2DExtended(input, {x, y}, visited, (from, to) => canMove(from, to, input));
        }
    
        console.log(input);

        return result ;
    }
}