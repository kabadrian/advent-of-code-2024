import { AOCSolver } from '../utils';
import { readFile } from '../utils';
import { createCanvas } from 'canvas';
import fs from 'fs';


type Robot = {
    x: number,
    y: number,
    x_velocity: number,
    y_velocity: number,
};

type MapSize = {
    width: number,
    height: number,
};

function simulateRobotMovenment(robot: Robot, time: number, mapSize: MapSize): Robot {
    let newX = ((robot.x + robot.x_velocity * time) % mapSize.width + mapSize.width) % mapSize.width;
    let newY = ((robot.y + robot.y_velocity * time) % mapSize.height + mapSize.height) % mapSize.height;

    return {
        ...robot,
        x: newX,
        y: newY,
    };
}

function countRobots(robots: Robot[], mapSize: MapSize, quadrant: number): number {
    const x_offset = Math.floor(mapSize.width / 2);
    const y_offset = Math.floor(mapSize.height / 2);

    console.log("x_offset", x_offset);
    console.log("y_offset", y_offset);

    switch (quadrant) {
        case 1:
            return robots.filter((robot) => {
                return robot.x > x_offset && robot.y > y_offset;
            }).length;
        case 2:
            return robots.filter((robot) => {
                return robot.x < x_offset && robot.y > y_offset;
            }).length;
        case 3:
            return robots.filter((robot) => {
                return robot.x < x_offset && robot.y < y_offset;
            }).length;
        case 4:
            return robots.filter((robot) => {
                return robot.x > x_offset && robot.y < y_offset;
            }).length;
        default:
            return 0;
    }
}

// Function to generate an image from a 2D array
const generateImageFromArray = (array: string[][], outputPath: string, pixelSize: number = 10) => {
    const rows = array.length;
    const cols = array[0]?.length || 0;

    // Create a canvas with appropriate dimensions
    const canvas = createCanvas(cols * pixelSize, rows * pixelSize);
    const ctx = canvas.getContext('2d');

    // Draw the pixels
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            // Set the color based on the character
            if (array[y][x] === '.') {
                ctx.fillStyle = 'white';
            } else {
                ctx.fillStyle = 'black';
            }

            // Draw the pixel
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
    }

    // Save the canvas to an image file
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
};

export class Day14FirstTaskSolver implements AOCSolver {
    filePath: string;
    mapSize: MapSize;

    constructor(filePath: string = 'src/day14/day14-test.txt', mapSize: MapSize = { width: 101, height: 103 }) {    

        this.filePath = filePath;
        this.mapSize = mapSize;
    }

    solve(): number {
        const input: Robot[] = readFile(this.filePath).split('\n').map((line) => {
            const parts = line.split(' ');
            const position = parts[0].split('=')[1].split(',');
            const velocity = parts[1].split('=')[1].split(',');

            return {
                x: parseInt(position[0]),
                y: parseInt(position[1]),
                x_velocity: parseInt(velocity[0]),
                y_velocity: parseInt(velocity[1]),
            };
        });

        const rounds = 100;

        const result = input.map((robot) => {
            return simulateRobotMovenment(robot, rounds, this.mapSize);
        });

        const map = Array(this.mapSize.height).fill(0).map(() => Array(this.mapSize.width).fill('.'));

        for (const robot of result) {
            map[robot.y][robot.x] = '1';
        }

        console.log(map.map((row) => row.join('')).join('\n'));

        const quadrants = [1, 2, 3, 4];
        const robotsInQuadrants = quadrants.map((quadrant) => {
            return countRobots(result, this.mapSize, quadrant);
        }).reduce((acc, val) => acc * val, 1);

        console.log('Robots in each quadrant:', robotsInQuadrants);

        return robotsInQuadrants;
    }
}

export class Day14SecondTaskSolver implements AOCSolver {
    filePath: string;

    constructor(filePath: string = 'src/day13/day13-test.txt') {
        this.filePath = filePath;
    }

    solve(): number {
        const input: Robot[] = readFile(this.filePath).split('\n').map((line) => {
            const parts = line.split(' ');
            const position = parts[0].split('=')[1].split(',');
            const velocity = parts[1].split('=')[1].split(',');

            return {
                x: parseInt(position[0]),
                y: parseInt(position[1]),
                x_velocity: parseInt(velocity[0]),
                y_velocity: parseInt(velocity[1]),
            };
        });

        const mapSize: MapSize = {
            width: 101,
            height: 103,
        };
        const rounds = 10000;

        for (let i = 1; i < rounds; i++) {
            const fileName = `src/day14/images/image-${i}.png`;
            console.log("time elapsed", i)
            const result = input.map((robot) => {
                return simulateRobotMovenment(robot, i, mapSize);
            });
    
            const map = Array(mapSize.height).fill(0).map(() => Array(mapSize.width).fill('.'));
    
            for (const robot of result) {
                map[robot.y][robot.x] = '1';
            }

            generateImageFromArray(map, fileName);
        }
        const result = input.map((robot) => {
            return simulateRobotMovenment(robot, rounds, mapSize);
        });

        const map = Array(mapSize.height).fill(0).map(() => Array(mapSize.width).fill('.'));

        for (const robot of result) {
            map[robot.y][robot.x] = '1';
        }

        return 0;
    }
}

