import { Day01FirstTaskSolver, Day01SecondTaskSolver } from "./day01/day01";


// Day 01
const day01FirstTaskSolver = new Day01FirstTaskSolver();
console.log(day01FirstTaskSolver.solve());

const day01SecondTaskSolver = new Day01SecondTaskSolver('src/day01/day01.txt');
console.log(day01SecondTaskSolver.solve());