import { flushPromises, mount } from "@vue/test-utils";
import { describe, expect, test, vi } from "vitest";
import { mockApi } from "./api.mock";
import ApiButton from "./ApiButton.vue";
import { setState, type state } from "./store";

function given(args: { state: typeof state.value }) {
  setState(args.state);
  const wrapper = mount(ApiButton);

  const buttonElement = () => wrapper.find<HTMLButtonElement>("button");
  const loadingSpinner = () => wrapper.find<HTMLDivElement>(".loading-spinner");

  const when = {
    buttonClicked: () => buttonElement().trigger("click"),
  };

  const then = {
    isDisabled: () => buttonElement().element.disabled,
    isLoading: () => loadingSpinner().exists(),
  };

  return { when, then };
}

function disabledState() {
  return { enabled: false };
}
function enabledState() {
  return { enabled: true };
}
function irrelevantResponse() {
  return { foo: "bar" };
}

describe("disabled", () => {
  test("button is disabled when state is disabled", () => {
    const { then } = given({ state: disabledState() });
    expect(then.isDisabled()).toBe(true);
  });
  test("button is enabled when state is enabled", () => {
    const { then } = given({ state: enabledState() });
    expect(then.isDisabled()).toBe(false);
  });
  test("api not called when button disabled", async () => {
    const apiMock = mockApi({ response: irrelevantResponse() });
    const { when } = given({ state: disabledState() });
    await when.buttonClicked();
    expect(apiMock).not.toHaveBeenCalled();
  });
});

describe("loading", () => {
  test("loading spinner initially not visible", () => {
    expect(given({ state: enabledState() }).then.isLoading()).toBe(false);
    expect(given({ state: disabledState() }).then.isLoading()).toBe(false);
  });
  test("loading spinner visible while call is pending", async () => {
    vi.useFakeTimers();
    mockApi({ response: irrelevantResponse() });
    const { when, then } = given({ state: enabledState() });

    await when.buttonClicked();
    expect(then.isLoading()).toBe(true);

    vi.runAllTimers();
    await flushPromises();
    expect(then.isLoading()).toBe(false);

    vi.useRealTimers();
  });
});

test("api called when button clicked", async () => {
  const apiMock = mockApi({ response: irrelevantResponse() });
  const { when } = given({ state: enabledState() });
  await when.buttonClicked();
  expect(apiMock).toHaveBeenCalledOnce();
});
