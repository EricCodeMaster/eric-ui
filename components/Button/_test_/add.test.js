const add = (a, b) => {
  return a + b;
};

describe("测试 Add 函数", () => {
  test("add(1, 2) === 3", () => {
    expect(add(1, 2)).toBe(3);
  });
  test("add(1, 1) === 2", () => {
    expect(add(1, 1)).toBe(2);
  });
});
