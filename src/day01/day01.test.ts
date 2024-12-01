import { Day01FirstTaskSolver, Day01SecondTaskSolver } from "./day01";

const testFilePath = 'src/day01/day01-test.txt';

// Mock implementations of the solvers for test data
describe("Day01 Solver Tests", () => {
  let day01FirstTaskSolver: Day01FirstTaskSolver;
  let day01SecondTaskSolver: Day01SecondTaskSolver;

  beforeEach(() => {
    // Initialize the solvers before each test
    day01FirstTaskSolver = new Day01FirstTaskSolver(testFilePath);
    day01SecondTaskSolver = new Day01SecondTaskSolver(testFilePath);
  });

  it("should correctly solve the first task with mock input", () => {
    const result = day01FirstTaskSolver.solve();
    expect(result).toBe(11);
  });

  it("should correctly solve the second task with mock input", () => {
    const result = day01SecondTaskSolver.solve();
    expect(result).toBe(31);
  });
});