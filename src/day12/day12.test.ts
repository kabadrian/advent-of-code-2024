import { Day12FirstTaskSolver, Day12SecondTaskSolver } from "./day12";

const testFilePath = 'src/day12/day12-test.txt';


// Mock implementations of the solvers for test data
describe("Day12 Solver Tests", () => {
  let day12FirstTaskSolver: Day12FirstTaskSolver;
  let day12SecondTaskSolver: Day12SecondTaskSolver;

  beforeEach(() => {
    // Initialize the solvers before each test
    day12FirstTaskSolver = new Day12FirstTaskSolver(testFilePath);
    day12SecondTaskSolver = new Day12SecondTaskSolver(testFilePath);
  });

  it("should correctly solve the first task with mock input", () => {
    const result = day12FirstTaskSolver.solve();
    expect(result).toBe(1930);
  });
});