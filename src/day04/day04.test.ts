import { Day04FirstTaskSolver, Day04SecondTaskSolver } from "./day04";

const testFilePath = 'src/day04/day04-test.txt';


// Mock implementations of the solvers for test data
describe("Day02 Solver Tests", () => {
  let day04FirstTaskSolver: Day04FirstTaskSolver;
  let day04SecondTaskSolver: Day04SecondTaskSolver;

  beforeEach(() => {
    // Initialize the solvers before each test
    day04FirstTaskSolver = new Day04FirstTaskSolver(testFilePath);
    day04SecondTaskSolver = new Day04SecondTaskSolver(testFilePath);
  });

  it("should correctly solve the first task with mock input", () => {
    const result = day04FirstTaskSolver.solve();
    expect(result).toBe(18);
  });

  it("should correctly solve the second task with mock input", () => {
    const result = day04SecondTaskSolver.solve();
    expect(result).toBe(9);
  });
});