import { Day10FirstTaskSolver, Day10SecondTaskSolver } from "./day10";

const testFilePath = 'src/day10/day10-test.txt';


// Mock implementations of the solvers for test data
describe("Day10 Solver Tests", () => {
  let day10FirstTaskSolver: Day10FirstTaskSolver;
  let day10SecondTaskSolver: Day10SecondTaskSolver;

  beforeEach(() => {
    // Initialize the solvers before each test
    day10FirstTaskSolver = new Day10FirstTaskSolver(testFilePath);
    day10SecondTaskSolver = new Day10SecondTaskSolver(testFilePath);
  });

  it("should correctly solve the first task with mock input", () => {
    const result = day10FirstTaskSolver.solve();
    expect(result).toBe(36);
  });

  it("should correctly solve the second task with mock input", () => {
    const result = day10SecondTaskSolver.solve();
    expect(result).toBe(81);
  });
});