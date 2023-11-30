import { c as create_ssr_component, v as validate_component } from "../../../chunks/index2.js";
import { L as Layout } from "../../../chunks/Layout.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="m-4"><div class="bg-panel rounded-lg m-4 p-4"><h1 class="p-4 mx-1 text-2xl">Waterway Labs Terms &amp; Conditions</h1>
      <div class="bg-panel rounded-lg m-4"><div><p class="my-2 text-xs">Last Updated: 30th November 2023</p>

          <p class="my-4">By accessing the Waterway Labs website (&quot;Site&quot;), you agree to comply
            with and be bound by the following Terms and Conditions.
          </p>

          <h2 class="text-xl font-bold">Acceptance of Terms</h2>
          <p class="my-4">You acknowledge that you have read, understood, and agree to be
            bound by these Terms.
          </p>

          <h2 class="text-xl font-bold">User Conduct</h2>
          <p class="my-4">No Automation or Bots: You agree not to use bots, automated methods,
            or other non-human ways of interacting with the site.
          </p>

          <h2 class="text-xl font-bold">Username Policy</h2>
          <p class="my-4">You agree not to use usernames that are offensive, vulgar, or
            infringe on the rights of others.
          </p>

          <h2 class="text-xl font-bold">Changes to Terms</h2>
          <p class="my-4">These Terms and Conditions are subject to change.</p></div></div></div></div>`;
    }
  })}`;
});
export {
  Page as default
};
