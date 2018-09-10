import React from "react";

import { asyncComponent } from "@jaredpalmer/after";

export default [
  {
    path: "/",
    exact: true,
    component: asyncComponent({
      loader: () => import("./home/Home"), // required
      Placeholder: () => <div>...LOADING...</div> // this is optional, just returns null by default
    })
  },
  {
    path: "/event/:slug",
    exact: true,
    component: asyncComponent({
      loader: () => import("./event/Event"), // required
      Placeholder: () => <div>...LOADING...</div> // this is optional, just returns null by default
    })
  }
];
