import { Day07FirstTaskSolver, Day07SecondTaskSolver } from "./day07";

const testFilePath = 'src/day07/day07-test.txt';


// Mock implementations of the solvers for test data
describe("Day07 Solver Tests", () => {
  let day07FirstTaskSolver: Day07FirstTaskSolver;
  let day07SecondTaskSolver: Day07SecondTaskSolver;

  beforeEach(() => {
    // Initialize the solvers before each test
    day07FirstTaskSolver = new Day07FirstTaskSolver(testFilePath);
    day07SecondTaskSolver = new Day07SecondTaskSolver(testFilePath);
  });

  it("should correctly solve the first task with mock input", () => {
    const result = day07FirstTaskSolver.solve();
    expect(result).toBe(3749);
  });

  it("should correctly solve the second task with mock input", () => {
    const result = day07SecondTaskSolver.solve();
    expect(result).toBe(11387);
  });
});