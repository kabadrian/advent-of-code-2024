import { Day14FirstTaskSolver, Day14SecondTaskSolver } from "./day14";

const testFilePath = 'src/day14/day14-test.txt';


// Mock implementations of the solvers for test data
describe("Day14 Solver Tests", () => {
  let day14FirstTaskSolver: Day14FirstTaskSolver;
  let day14SecondTaskSolver: Day14SecondTaskSolver;

  beforeEach(() => {
    // Initialize the solvers before each test
    day14FirstTaskSolver = new Day14FirstTaskSolver(testFilePath, { width: 11, height: 7 });
    day14SecondTaskSolver = new Day14SecondTaskSolver(testFilePath);
  });

  it("should correctly solve the first task with mock input", () => {
    const result = day14FirstTaskSolver.solve();
    expect(result).toBe(12);
  });
});