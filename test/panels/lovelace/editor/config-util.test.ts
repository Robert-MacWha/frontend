import { assert, describe, it } from "vitest";

import type { LovelaceConfig } from "../../../../src/data/lovelace/config/types";
import {
  moveCardToContainer,
  swapView,
} from "../../../../src/panels/lovelace/editor/config-util";

describe("moveCardToContainer", () => {
  it("move a card to an empty view", () => {
    const config: LovelaceConfig = {
      views: [
        {},
        {
          cards: [{ type: "card1" }, { type: "card2" }],
        },
      ],
    };

    const result = moveCardToContainer(config, [1, 0], [0]);
    const expected: LovelaceConfig = {
      views: [
        {
          cards: [{ type: "card1" }],
        },
        {
          cards: [{ type: "card2" }],
        },
      ],
    };
    assert.deepEqual(expected, result);
  });

  it("move a card to different view", () => {
    const config: LovelaceConfig = {
      views: [
        {
          cards: [{ type: "v1-c1" }, { type: "v1-c2" }],
        },
        {
          cards: [{ type: "v2-c1" }, { type: "v2-c2" }],
        },
      ],
    };

    const result = moveCardToContainer(config, [1, 0], [0]);
    const expected: LovelaceConfig = {
      views: [
        {
          cards: [{ type: "v1-c1" }, { type: "v1-c2" }, { type: "v2-c1" }],
        },
        {
          cards: [{ type: "v2-c2" }],
        },
      ],
    };
    assert.deepEqual(expected, result);
  });

  it("move a card to the same view", () => {
    const config: LovelaceConfig = {
      views: [
        {
          cards: [{ type: "v1-c1" }, { type: "v1-c2" }],
        },
        {
          cards: [{ type: "v2-c1" }, { type: "v2-c2" }],
        },
      ],
    };

    const result = () => {
      moveCardToContainer(config, [1, 0], [1]);
    };
    assert.throws(
      result,
      Error,
      "You cannot move a card to the view or section it is in."
    );
  });
});

describe("swapView", () => {
  it("swaps 2 view", () => {
    const config: LovelaceConfig = {
      views: [
        {
          title: "view1",
          cards: [],
        },
        {
          title: "view2",
          cards: [],
        },
      ],
    };

    const result = swapView(config, 1, 0);
    const expected: LovelaceConfig = {
      views: [
        {
          title: "view2",
          cards: [],
        },
        {
          title: "view1",
          cards: [],
        },
      ],
    };
    assert.deepEqual(expected, result);
  });

  it("swaps the same views", () => {
    const config: LovelaceConfig = {
      views: [
        {
          title: "view1",
          cards: [],
        },
        {
          title: "view2",
          cards: [],
        },
      ],
    };

    const result = swapView(config, 0, 0);
    const expected: LovelaceConfig = {
      views: [
        {
          title: "view1",
          cards: [],
        },
        {
          title: "view2",
          cards: [],
        },
      ],
    };
    assert.deepEqual(expected, result);
  });
});
