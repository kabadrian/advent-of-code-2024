import { AOCSolver, getLinesFromFileMultipleParts } from '../utils';
import { getLinesFromFile } from '../utils';


function parseLine(line: string): [number, number] {
    const [first, second] = line.split('|').map((x) => parseInt(x));
    return [first, second];
}

type OrderingMap = {
    [key: number]: number[];
};


function createOrderingMap(input: string[]): OrderingMap {
    const orderingMap: OrderingMap = {};

    for (const line of input) {
        const [first, second] = parseLine(line);
        orderingMap[second]? orderingMap[second].push(first) : orderingMap[second] = [first];
    }

    return orderingMap;
}

function isPrintLineValid(printLine: string, orderingMap: OrderingMap): boolean {
    const pageNumbersArray = printLine.split(',').map((x) => parseInt(x));

    const previousPages: number[] = [];

    for (let i = 0; i < pageNumbersArray.length; i++) {
        const currentPage = pageNumbersArray[i];

        if (orderingMap[currentPage]) {
            const earlierPages = orderingMap[currentPage];

            for (const earlierPage of earlierPages) {
                if (pageNumbersArray.includes(earlierPage) && !previousPages.includes(earlierPage)) {
                    return false;
                }
            }

        }
        previousPages.push(currentPage);
    }
    return true;
}

function countValidPrintLines(printLines: string[], orderingMap: OrderingMap): number {
    let counter = 0;

    for (const printLine of printLines) {
        if (isPrintLineValid(printLine, orderingMap)) {
            const middlePageNumber = parseInt(printLine.split(',')[(printLine.split(',').length - 1) / 2]);
            counter += middlePageNumber;
        }
    }

    return counter;
}

function correctInvalidPrintLine(printLine: string, orderingMap: OrderingMap): string {
    const pageNumbersArray = printLine.split(',').map((x) => parseInt(x));

    const previousPages: number[] = [];

    for (let i = 0; i < pageNumbersArray.length; i++) {
        const currentPage = pageNumbersArray[i];
    
        if (orderingMap[currentPage]) {
            const earlierPages = orderingMap[currentPage];
    
            for (const earlierPage of earlierPages) {
                if (pageNumbersArray.includes(earlierPage) && !previousPages.includes(earlierPage)) {
                    previousPages.push(earlierPage);
    
                    // replace `currentPage` with `earlierPage`
                    pageNumbersArray[i] = earlierPage;
    
                    break;
                }
            }
        }
    
        if (!previousPages.includes(currentPage)) {
            previousPages.push(currentPage);
        }
    }
    if (!isPrintLineValid(previousPages.join(','), orderingMap)) {
        return correctInvalidPrintLine(previousPages.join(','), orderingMap);
    }
    return previousPages.join(',');
}

function countCorrectedInvalidLines(printLines: string[], orderingMap: OrderingMap): number {
    let counter = 0;

    const invalidPrintLines = printLines.filter((printLine) => !isPrintLineValid(printLine, orderingMap));

    for (const printLine of invalidPrintLines) {
        const correctedLine = correctInvalidPrintLine(printLine, orderingMap);
        const middlePageNumber = parseInt(correctedLine.split(',')[(correctedLine.split(',').length - 1) / 2]);
        counter += middlePageNumber;
    }

    return counter;
}


export class Day05FirstTaskSolver implements AOCSolver {
    filePath: string;

    constructor(filePath: string = 'src/day05/day05-test.txt') {
        this.filePath = filePath;
    }

    solve(): number {
        const taskInput = getLinesFromFileMultipleParts(this.filePath);
        const [firstPart, secondPart] = taskInput;

        const orderingMap = createOrderingMap(firstPart);

        return countValidPrintLines(secondPart, orderingMap);
    }
}

export class Day05SecondTaskSolver implements AOCSolver {
    filePath: string;

    constructor(filePath: string = 'src/day05/day05-test.txt') {
        this.filePath = filePath;
    }

    solve(): number {
        const taskInput = getLinesFromFileMultipleParts(this.filePath);
        const [firstPart, secondPart] = taskInput;

        const orderingMap = createOrderingMap(firstPart);

        return countCorrectedInvalidLines(secondPart, orderingMap);
    }
}