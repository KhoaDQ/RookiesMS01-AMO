const rewire = require("rewire");
const index = rewire("./index");
const fetchAsset = index.__get__("fetchAsset");
// @ponicode
describe("fetchAsset", () => {
  test("0", () => {
    let callFunction = () => {
      fetchAsset("myDIV");
    };

    expect(callFunction).not.toThrow();
  });

  test("1", () => {
    let callFunction = () => {
      fetchAsset(undefined);
    };

    expect(callFunction).not.toThrow();
  });
});
