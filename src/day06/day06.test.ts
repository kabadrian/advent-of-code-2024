import { Day06FirstTaskSolver, Day06SecondTaskSolver } from "./day06";

const testFilePath = 'src/day06/day06-test.txt';


// Mock implementations of the solvers for test data
describe("Day06 Solver Tests", () => {
  let day06FirstTaskSolver: Day06FirstTaskSolver;
  let day06SecondTaskSolver: Day06SecondTaskSolver;

  beforeEach(() => {
    // Initialize the solvers before each test
    day06FirstTaskSolver = new Day06FirstTaskSolver(testFilePath);
    day06SecondTaskSolver = new Day06SecondTaskSolver(testFilePath);
  });

  it("should correctly solve the first task with mock input", () => {
    const result = day06FirstTaskSolver.solve();
    expect(result).toBe(41);
  });

  it("should correctly solve the second task with mock input", () => {
    const result = day06SecondTaskSolver.solve();
    expect(result).toBe(6);
  });
});