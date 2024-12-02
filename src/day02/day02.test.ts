import { Day02FirstTaskSolver, Day02SecondTaskSolver } from "./day02";

const testFilePath = 'src/day02/day02-test.txt';

// Mock implementations of the solvers for test data
describe("Day02 Solver Tests", () => {
  let day02FirstTaskSolver: Day02FirstTaskSolver;
  let day02SecondTaskSolver: Day02SecondTaskSolver;

  beforeEach(() => {
    // Initialize the solvers before each test
    day02FirstTaskSolver = new Day02FirstTaskSolver(testFilePath);
    day02SecondTaskSolver = new Day02SecondTaskSolver(testFilePath);
  });

  it("should correctly solve the first task with mock input", () => {
    const result = day02FirstTaskSolver.solve();
    expect(result).toBe(2);
  });

  it("should correctly solve the second task with mock input", () => {
    const result = day02SecondTaskSolver.solve();
    expect(result).toBe(4);
  });
});