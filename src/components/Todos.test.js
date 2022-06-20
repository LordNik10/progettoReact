import '@testing-library/jest-dom';
import { reducer } from "./Todos";

const Date = {
  now: () => 1111111
}

test("reducer should add a new todo on action insert", () => {
  expect(reducer({ todos: [], input: "Testo esempio" }, { type: "insert" })).toBe({
    todo: [
      { text: "Testo esempio", isComplete: false, date: Date.now() }
    ]
  })
})