import { AOCSolver, getLinesFromFileMultipleParts } from '../utils';
import { getLinesFromFile } from '../utils';


function parseLine(line: string): string[] {
    const chracters = line.split('');

    return chracters;
}

function readMap(lines: string[]): string[][] {
    const map: string[][] = [];

    for (const line of lines) {
        map.push(parseLine(line));
    }

    return map;
}

type Location = {
    [key: string]: [number, number][];
}


function getCharacterLocations(map: string[][]): Location {
    let characterLocations: Location = {};

    for (const line of map) {
        for (let i = 0; i < line.length; i++) {
            const character = line[i];

            const position: [number, number] = [i, map.indexOf(line)];

            if (character !== '.') {
                if (characterLocations[character]) {
                    characterLocations[character].push(position);
                } else {
                    characterLocations[character] = [position];
                }
            }
        }
    }

    return characterLocations;
}

function isOutOfBounds(map: string[][], position: [number, number]): boolean {
    const [i, j] = position;

    return i < 0 || i >= map[0].length || j < 0 || j >= map.length;
}

function placeAntenas(map: string[][], characterLocations: Location, useOnlyFirst: boolean = true): number {
    const newMap = map;
    let counter = 0;

    for (const character in characterLocations) {
        const locations = characterLocations[character];

        for (const location of locations) {
            const locationIndex = locations.indexOf(location);
            for (let i = locationIndex + 1; i < locations.length; i++) {
                const [x, y] = location;
                const [x1, y1] = locations[i];

                const [dx, dy] = [x1 - x, y1 - y];

                let [a1, b1] = [x - dx, y - dy];
                let [a2, b2] = [x1 + dx, y1 + dy];


                if (dx === 0 || dy === 0) {
                    continue;
                }

                while(!isOutOfBounds(map, [b1,a1])) {
                    if (newMap[b1][a1] !== '#') {
                        counter++;
                        newMap[b1][a1] = '#';
                    }
                    if(useOnlyFirst) {
                        break;
                    }
                    a1 -= dx;
                    b1 -= dy;
                }

                while(!isOutOfBounds(map, [b2, a2])) {
                    if (newMap[b2][a2] !== '#') {
                        counter++;
                        newMap[b2][a2] = '#';
                    }
                    if(useOnlyFirst) {
                        break;
                    }

                    a2 += dx;
                    b2 += dy;
                }

                if(!useOnlyFirst) {
                    if (newMap[y][x] !== '#') {
                        counter++;
                        newMap[y][x] = '#';
                    }
                    if (newMap[y1][x1] !== '#') {
                        counter++;
                        newMap[y1][x1] = '#';
                    }
                }
            }
        }
    }

    return counter;
}


export class Day08FirstTaskSolver implements AOCSolver {
    filePath: string;

    constructor(filePath: string = 'src/day07/day07-test.txt') {
        this.filePath = filePath;
    }

    solve(): number {
        const taskInput = getLinesFromFile(this.filePath);
        const map = readMap(taskInput);

        const characterLocations = getCharacterLocations(map);

        return placeAntenas(map, characterLocations);
    }
}


export class Day08SecondTaskSolver implements AOCSolver {
    filePath: string;

    constructor(filePath: string = 'src/day07/day07-test.txt') {
        this.filePath = filePath;
    }

    solve(): number {
        const taskInput = getLinesFromFile(this.filePath);
        const map = readMap(taskInput);

        const characterLocations = getCharacterLocations(map);

        return placeAntenas(map, characterLocations, false);
    }
}