import { describe, test } from "vitest";

/**
 * Do not add test specific attributes here. Ideally this type is a union of the components Props and all involved external state.
 * @example type MyArgs = Props<MyComponentToTest> & MyPiniaState & MyApiResponse
 */
type MyArgs = any;

/**
 * The function sets up your components and exposes all relevant interactions (when) and all relevant extractions (then).
 *
 * It is advised to not destructure the args, as doing so will lead to more changes over time.
 *
 * @param args contains the bare bones data to create the initial state of your test
 * @returns the api to implement test cases
 */
function given(args: MyArgs) {
  return {
    when: {},
    then: {},
  };
}

/**
 * No need for a root `describe` block.
 * It will just introduce a level of nesting in the report and in code.
 */
describe("a", () => {
  test("some aspect of a", () => {
    const { when, then } = given({});
  });
  test("some other aspect of a", () => {
    const { when, then } = given({});
  });
});
describe("b", () => {
  test("some aspect of b", () => {
    const { when, then } = given({});
  });
  test("some other aspect of b", () => {
    const { when, then } = given({});
  });
});

test("no describe block is also fine", () => {
  const { when, then } = given({});
});
