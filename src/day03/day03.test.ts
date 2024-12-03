import { Day03FirstTaskSolver, Day03SecondTaskSolver } from "./day03";

const testFilePath = 'src/day03/day03-test.txt';
const testFilePath2 = 'src/day03/day03-test2.txt';


// Mock implementations of the solvers for test data
describe("Day02 Solver Tests", () => {
  let day03FirstTaskSolver: Day03FirstTaskSolver;
  let day03SecondTaskSolver: Day03SecondTaskSolver;

  beforeEach(() => {
    // Initialize the solvers before each test
    day03FirstTaskSolver = new Day03FirstTaskSolver(testFilePath);
    day03SecondTaskSolver = new Day03SecondTaskSolver(testFilePath2);
  });

  it("should correctly solve the first task with mock input", () => {
    const result = day03FirstTaskSolver.solve();
    expect(result).toBe(161);
  });

  it("should correctly solve the second task with mock input", () => {
    const result = day03SecondTaskSolver.solve();
    expect(result).toBe(48);
  });
});