import { Day11FirstTaskSolver, Day11SecondTaskSolver } from "./day11";

const testFilePath = 'src/day11/day11-test.txt';


// Mock implementations of the solvers for test data
describe("Day11 Solver Tests", () => {
  let day11FirstTaskSolver: Day11FirstTaskSolver;
  let day11SecondTaskSolver: Day11SecondTaskSolver;

  beforeEach(() => {
    // Initialize the solvers before each test
    day11FirstTaskSolver = new Day11FirstTaskSolver(testFilePath);
    day11SecondTaskSolver = new Day11SecondTaskSolver(testFilePath);
  });

  it("should correctly solve the first task with mock input", () => {
    const result = day11FirstTaskSolver.solve();
    expect(result).toBe(55312);
  });

  it("should correctly solve the second task with mock input", () => {
    const result = day11SecondTaskSolver.solve();
    expect(result).toBe(55312);
  });
});