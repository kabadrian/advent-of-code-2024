import { Day05FirstTaskSolver, Day05SecondTaskSolver } from "./day05";

const testFilePath = 'src/day05/day05-test.txt';


// Mock implementations of the solvers for test data
describe("Day05 Solver Tests", () => {
  let day05FirstTaskSolver: Day05FirstTaskSolver;
  let day05SecondTaskSolver: Day05SecondTaskSolver;

  beforeEach(() => {
    // Initialize the solvers before each test
    day05FirstTaskSolver = new Day05FirstTaskSolver(testFilePath);
    day05SecondTaskSolver = new Day05SecondTaskSolver(testFilePath);
  });

  it("should correctly solve the first task with mock input", () => {
    const result = day05FirstTaskSolver.solve();
    expect(result).toBe(143);
  });

  it("should correctly solve the second task with mock input", () => {
    const result = day05SecondTaskSolver.solve();
    expect(result).toBe(123);
  });
});