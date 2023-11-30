import { c as create_ssr_component, v as validate_component } from "../../chunks/index2.js";
import { L as Layout } from "../../chunks/Layout.js";
import "@dfinity/auth-client";
import "@dfinity/utils";
import "../../chunks/system-store.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
    default: () => {
      return `<h1>Waterway Labs</h1>`;
    }
  })}`;
});
export {
  Page as default
};
