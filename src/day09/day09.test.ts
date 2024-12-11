import { Day09FirstTaskSolver, Day09SecondTaskSolver } from "./day09";

const testFilePath = 'src/day09/day09-test.txt';


// Mock implementations of the solvers for test data
describe("Day09 Solver Tests", () => {
  let day09FirstTaskSolver: Day09FirstTaskSolver;
  let day09SecondTaskSolver: Day09SecondTaskSolver;

  beforeEach(() => {
    // Initialize the solvers before each test
    day09FirstTaskSolver = new Day09FirstTaskSolver(testFilePath);
    day09SecondTaskSolver = new Day09SecondTaskSolver(testFilePath);
  });

  it("should correctly solve the first task with mock input", () => {
    const result = day09FirstTaskSolver.solve();
    expect(result).toBe(1928);
  });

  it("should correctly solve the second task with mock input", () => {
    const result = day09SecondTaskSolver.solve();
    expect(result).toBe(2858);
  });
});