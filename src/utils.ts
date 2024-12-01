import * as fs from 'fs';

export function getLines(fileContent: string): string[] {
    return fileContent.split('\n').map((line) => line.trim());
}

export function getLinesFromFile(filePath: string): string[] {
    try {
        const fileContent: string = fs.readFileSync(filePath, 'utf-8');

        return getLines(fileContent);
    } catch (err) {
        console.error(err);
        return [];
    }
}

export interface AOCSolver {
    solve(): number;
}

