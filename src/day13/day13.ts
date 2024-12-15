import { AOCSolver } from '../utils';
import { readFile } from '../utils';

type PrizeMachine = {
    buttonA: [number, number], // 3 tokens
    buttonB: [number, number], // 1 token
    prizeCoordinates: [number, number],
}


// brute force solution, for max 100 iterations
function solveMachine(prizeMachine: PrizeMachine, tokenPrizes: Map<string, number>) {

    const getKey = (x: number, y: number): string  => {
        return `${x},${y}`;
    }

    const setTokenPrize = (x: number, y: number, tokenPrize: number): void => {
        const currentTokenPrize = tokenPrizes.get(getKey(x, y));
        if (!currentTokenPrize) {
            tokenPrizes.set(getKey(x, y), tokenPrize);
            return;
        }
        if(currentTokenPrize > tokenPrize) {
            tokenPrizes.set(getKey(x, y), tokenPrize);
            return;
        }
    }

    const [startX, startY] = [0, 0];

    setTokenPrize(startX, startY, 0);

    for(let i=0; i<100; i++) {
        // button A
        const [x, y] = prizeMachine.buttonA;
        for(let j=0; j<100; j++) {
            const [x2, y2] = prizeMachine.buttonB;

            const coordinates = [i*x + j*x2, i*y + j*y2];
            const tokenPrize = i*3 + j*1;

            setTokenPrize(coordinates[0], coordinates[1], tokenPrize);
        }
    }

    return tokenPrizes.get(getKey(prizeMachine.prizeCoordinates[0], prizeMachine.prizeCoordinates[1])) || 0;

}

function solveMachineThroughEquation(prizeMachine: PrizeMachine, offset: number = 0) {

    // (a_x * A + b_x * B) = (p_x)
    // (a_y * A + b_y * B) = (p_y)

    const [a_x, a_y] = prizeMachine.buttonA;
    const [b_x, b_y] = prizeMachine.buttonB;
    const [p_x, p_y] = prizeMachine.prizeCoordinates.map((coord, i) => coord + offset);

    const A = (p_x * b_y - p_y * b_x) / (a_x * b_y - a_y * b_x);
    const B = (p_y * a_x - p_x * a_y) / (a_x * b_y - a_y * b_x);

    if(Number.isInteger(A) && Number.isInteger(B)) {
        console.log(A, B);
        return A*3 + B*1;
    }
    return 0;
}

export class Day13FirstTaskSolver implements AOCSolver {
    filePath: string;

    constructor(filePath: string = 'src/day13/day13-test.txt') {
        this.filePath = filePath;
    }


    solve(): number {
        let result = 0;
        const input = readFile(this.filePath);
        const parsePrizeInput = (input: string): PrizeMachine[] => {
            const lines = input.split('\n').filter(line => line.trim() !== '');
            const prizeMachines: PrizeMachine[] = [];

            for (let i = 0; i < lines.length; i += 3) {
            const buttonA = lines[i].match(/X([+-]?\d+), Y([+-]?\d+)/);
            const buttonB = lines[i + 1].match(/X([+-]?\d+), Y([+-]?\d+)/);
            const prize = lines[i + 2].match(/X=([+-]?\d+), Y=([+-]?\d+)/);

            if (!buttonA || !buttonB || !prize) {
                throw new Error('Invalid input format');
            }

            prizeMachines.push({
                buttonA: [parseInt(buttonA[1]), parseInt(buttonA[2])],
                buttonB: [parseInt(buttonB[1]), parseInt(buttonB[2])],
                prizeCoordinates: [parseInt(prize[1]), parseInt(prize[2])],
            });
            }

            return prizeMachines;
        }
        const prizeMachines = parsePrizeInput(input);

        prizeMachines.forEach(prizeMachine => {
            result += solveMachineThroughEquation(prizeMachine);
        });

        return result;
    }
}

export class Day13SecondTaskSolver implements AOCSolver {
    filePath: string;

    constructor(filePath: string = 'src/day13/day13-test.txt') {
        this.filePath = filePath;
    }


    solve(): number {
        let result = 0;
        const input = readFile(this.filePath);
        const parsePrizeInput = (input: string): PrizeMachine[] => {
            const lines = input.split('\n').filter(line => line.trim() !== '');
            const prizeMachines: PrizeMachine[] = [];

            for (let i = 0; i < lines.length; i += 3) {
            const buttonA = lines[i].match(/X([+-]?\d+), Y([+-]?\d+)/);
            const buttonB = lines[i + 1].match(/X([+-]?\d+), Y([+-]?\d+)/);
            const prize = lines[i + 2].match(/X=([+-]?\d+), Y=([+-]?\d+)/);

            if (!buttonA || !buttonB || !prize) {
                throw new Error('Invalid input format');
            }

            prizeMachines.push({
                buttonA: [parseInt(buttonA[1]), parseInt(buttonA[2])],
                buttonB: [parseInt(buttonB[1]), parseInt(buttonB[2])],
                prizeCoordinates: [parseInt(prize[1]), parseInt(prize[2])],
            });
            }

            return prizeMachines;
        }
        const prizeMachines = parsePrizeInput(input);

        prizeMachines.forEach(prizeMachine => {
            result += solveMachineThroughEquation(prizeMachine, 10000000000000);
        });

        return result;
    }
}


