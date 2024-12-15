import { Day13FirstTaskSolver, Day13SecondTaskSolver } from "./day13";

const testFilePath = 'src/day13/day13-test.txt';


// Mock implementations of the solvers for test data
describe("Day13 Solver Tests", () => {
  let day13FirstTaskSolver: Day13FirstTaskSolver;
  let day13SecondTaskSolver: Day13SecondTaskSolver;

  beforeEach(() => {
    // Initialize the solvers before each test
    day13FirstTaskSolver = new Day13FirstTaskSolver(testFilePath);
    day13SecondTaskSolver = new Day13SecondTaskSolver(testFilePath);
  });

  it("should correctly solve the first task with mock input", () => {
    const result = day13FirstTaskSolver.solve();
    expect(result).toBe(480);
  });
});