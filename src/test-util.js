// @flow

import React from "react";
import ReactDOM from "react-dom";

// TODO also try shallow render first and screenshot last
export function smoke(name: string, component:React.Element<any>) {
  it(`renders ${name} without crashing`, () => {
    const div = document.createElement("div");
    ReactDOM.render(component, div);
  });
}
