import { Day01FirstTaskSolver, Day01SecondTaskSolver } from "./day01/day01";
import { Day02FirstTaskSolver, Day02SecondTaskSolver } from "./day02/day02";


// // Day 01
// const day01FirstTaskSolver = new Day01FirstTaskSolver();
// console.log(day01FirstTaskSolver.solve());

// const day01SecondTaskSolver = new Day01SecondTaskSolver('src/day01/day01.txt');
// console.log(day01SecondTaskSolver.solve());

// Day 02
const day02FirstTaskSolver = new Day02FirstTaskSolver('src/day02/day02.txt');
console.log(day02FirstTaskSolver.solve());

const day02SecondTaskSolver = new Day02SecondTaskSolver('src/day02/day02.txt');
console.log(day02SecondTaskSolver.solve());