import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import type { Props } from "./TodoItem.vue";
import TodoItem from "./TodoItem.vue";

const defaultProps: Props = {
  text: "Boil some eggs",
  isDone: false,
};

function given(args?: Partial<Props>) {
  // prepare the wrapper
  const props = { ...defaultProps, ...args };
  const wrapper = mount(TodoItem, { props });

  // elements
  const checkboxElement = () =>
    wrapper.find<HTMLInputElement>("input[type=checkbox]");
  const labelElement = () => wrapper.find<HTMLLabelElement>("label");

  // user interactions
  const when = {
    checkboxClicked: () => checkboxElement().trigger("click"),
  };

  // behavioral things
  const then = {
    isChecked: () => checkboxElement().element.checked,
    emittedEvents: () => wrapper.emitted(),
    text: () => labelElement().text(),
  };

  return { when, then };
}

describe("checkbox state", () => {
  test("checked when item is done", () => {
    const { then } = given({ isDone: true });
    expect(then.isChecked()).toBe(true);
  });

  test("unchecked when item is not done", () => {
    const { then } = given({ isDone: false });
    expect(then.isChecked()).toBe(false);
  });
});

describe("check and uncheck", () => {
  test("emits `check` when clicked and not done", () => {
    const { when, then } = given({ isDone: false });
    when.checkboxClicked();
    expect(then.emittedEvents()).toHaveProperty("check");
  });
  test("emits `uncheck` when clicked and done", () => {
    const { when, then } = given({ isDone: true });
    when.checkboxClicked();
    expect(then.emittedEvents()).toHaveProperty("uncheck");
  });
});

test("shows the propped text", () => {
  const { then } = given({ text: "Call your parents" });
  expect(then.text()).toBe("Call your parents");
});
