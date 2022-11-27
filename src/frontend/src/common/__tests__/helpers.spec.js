import {
  createUUIDv4,
  normalizeAdditionalItems,
  normalizeItems,
  getItemById,
  normalizeIngredientsItems,
  isEmpty,
} from "@/common/helpers";

describe("test helpers", () => {
  const testItem = {
    name: "testName",
    image: "/public/img/filling/test.svg",
  };
  const testList = [{ id: 1 }, { id: 2 }];

  it("test createUUIDv4", () => {
    const uuid = createUUIDv4();
    expect(uuid.length).toBe(36);
  });

  it("test normalizeAdditionalItems", () => {
    const normalize = normalizeAdditionalItems(testItem);
    expect(normalize).toEqual({ ...testItem, count: 0 });
  });

  it("test normalizeItems", () => {
    const normalize = normalizeItems(testItem);
    expect(normalize).toEqual({ ...testItem, label: "" });
  });

  it("test normalizeIngredientsItems", () => {
    const normalize = normalizeIngredientsItems(testItem);
    expect(normalize).toEqual({ ...testItem, count: 0, label: "test" });
  });

  it("test getItemById", () => {
    const item = getItemById(testList, 1);
    expect(item).toEqual({ id: 1 });
  });

  it("test isEmpty", () => {
    const empty = isEmpty({});
    expect(empty).toBeTruthy();
  });
});
