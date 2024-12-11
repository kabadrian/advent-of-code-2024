import * as fs from 'fs';

export function getLines(fileContent: string): string[] {
    return fileContent.split('\n').map((line) => line.trim());
}

export function readFile(filePath: string): string {
    try {
        return fs.readFileSync(filePath, 'utf-8');
    } catch (err) {
        console.error(err);
        return '';
    }
}

export function getLinesFromFile(filePath: string): string[] {
    try {
        const fileContent: string = readFile(filePath);

        return getLines(fileContent);
    } catch (err) {
        console.error(err);
        return [];
    }
}

export function getLinesFromFileMultipleParts(filePath: string, delimiter:RegExp = /\n\s*\n/): string[][] {
    try {
        const fileContent: string = fs.readFileSync(filePath, 'utf-8');
        const [firstPart, secondPart] = fileContent.trim().split(delimiter);

        return [getLines(firstPart), getLines(secondPart)];
    } catch (err) {
        console.error(err);
        return [];
    }
}

export interface AOCSolver {
    solve(): number;
}

