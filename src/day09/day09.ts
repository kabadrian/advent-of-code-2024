import { AOCSolver } from '../utils';
import { readFile } from '../utils';


function calculateChecksum(numberArray: number[]): number {
    let checksum = 0;

    const evenIndexNumbers = numberArray.filter((_, index) => index % 2 === 0);
    const oddIndexNumbers = numberArray.filter((_, index) => index % 2 !== 0);

    const tmpArray = [];
    for (let i = 0; i < evenIndexNumbers.length; i++) {
        for (let j = 0; j < evenIndexNumbers[i]; j++) {
            tmpArray.push(i);
        }
        for(let j = 0; j < oddIndexNumbers[i]; j++) {
            tmpArray.push(-1);
        }
    }

    let lastIndex = tmpArray.length - 1;

    while (lastIndex >= oddIndexNumbers.reduce((item, acc) => item + acc, 0)) {
        const firstIndex: number = tmpArray.indexOf(-1);
        const currentNumber: number = tmpArray[lastIndex];

        if(currentNumber === -1) {
            lastIndex--;
            continue;
        }

        tmpArray[firstIndex] = currentNumber;
        tmpArray[lastIndex] = -1;

        lastIndex--;
    }

    checksum = tmpArray
        .filter((item) => item !== -1)
        .reduce((acc, item, index) => acc + item * (index), 0);

    return checksum;
}

type Block = {
    index: number;
    freeBlock: boolean;
    length: number;
    start: number;
}

function calculateChecksumForBlocks(numberArray: number[]): number {
    let checksum = 0;

    const blocksArray: Block[] = [];

    let start = 0;
    for (let i = 0; i < numberArray.length; i++) {
        blocksArray.push({
            index: Math.trunc(i / 2),
            freeBlock: i % 2 !== 0,
            length: numberArray[i],
            start: start,
        })

        start += numberArray[i];
    }


    const numberBlocks = blocksArray.filter((block) => !block.freeBlock);
    const freeBlocks = blocksArray.filter((block) => block.freeBlock).sort((a, b) => a.index - b.index);

    const finalArray: Block[] = [];



    const findFirstFreeBlock = (freeBlocks: any[], requiredSize: number): number => {
        return freeBlocks.findIndex((block) => block.freeBlock && block.length >= requiredSize);
    }

    const moveBlock = (numberBlock: Block, freeBlock: Block, freeBlocks: Block[]): void => {
        const blockLength = numberBlock.length;

        if(numberBlock.start < freeBlock.start) {
            finalArray.push({
                index: numberBlock.index,
                freeBlock: false,
                length: numberBlock.length,
                start: numberBlock.start,
            });
            return;
        }

        if(freeBlock.length === 0) {
            freeBlocks.splice(freeBlocks.indexOf(freeBlock), 1);
        }

        finalArray.push({
            index: numberBlock.index,
            freeBlock: false,
            length: numberBlock.length,
            start: freeBlock.start,
        });

        freeBlock.length -= blockLength;
        freeBlock.start += blockLength;
    }


    for(let i = numberBlocks.length - 1; i >= 0; i--) {
        const numberBlock = numberBlocks[i];
        const firstFreeBlockIndex = findFirstFreeBlock(freeBlocks, numberBlock.length);


        if(firstFreeBlockIndex === -1) {
            finalArray.push({
                index: numberBlock.index,
                freeBlock: false,
                length: numberBlock.length,
                start: numberBlock.start,
            });
            continue;
        }
        const freeBlock = freeBlocks[firstFreeBlockIndex];

        moveBlock(numberBlock, freeBlock, freeBlocks);
    }

    for (let i = 0; i < finalArray.length; i++) {
        const block = finalArray[i];
        if(block.freeBlock) {
            continue;
        }

        for (let j = 0; j < block.length; j++) {
            checksum += block.index * (block.start + j);
        }
    }

    console.log("finalArray", finalArray);

    console.log("my checksum", checksum);
    return checksum;
}


export class Day09FirstTaskSolver implements AOCSolver {
    filePath: string;

    constructor(filePath: string = 'src/day09/day09-test.txt') {
        this.filePath = filePath;
    }

    solve(): number {
        const input = readFile(this.filePath);

        return calculateChecksum(input.split('').map(Number));
    }
}


export class Day09SecondTaskSolver implements AOCSolver {
    filePath: string;

    constructor(filePath: string = 'src/day09/day09-test.txt') {
        this.filePath = filePath;
    }

    solve(): number {
        const input = readFile(this.filePath);

        return calculateChecksumForBlocks(input.split('').map(Number));
    }
}