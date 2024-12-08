import { Day08FirstTaskSolver, Day08SecondTaskSolver } from "./day08";

const testFilePath = 'src/day08/day08-test.txt';


// Mock implementations of the solvers for test data
describe("Day08 Solver Tests", () => {
  let day08FirstTaskSolver: Day08FirstTaskSolver;
  let day08SecondTaskSolver: Day08SecondTaskSolver;

  beforeEach(() => {
    // Initialize the solvers before each test
    day08FirstTaskSolver = new Day08FirstTaskSolver(testFilePath);
    day08SecondTaskSolver = new Day08SecondTaskSolver(testFilePath);
  });

  it("should correctly solve the first task with mock input", () => {
    const result = day08FirstTaskSolver.solve();
    expect(result).toBe(14);
  });

  it("should correctly solve the second task with mock input", () => {
    const result = day08SecondTaskSolver.solve();
    expect(result).toBe(34);
  });
});