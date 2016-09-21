import * as http from "http";

const nIssuesUrl = "https://api.github.com/repos/NativeScript/NativeScript/issues";

export async function navigatingTo(args) {
  let page = args.object.page;
  let issues = await http.getJSON(nIssuesUrl);
  console.log("issues: " + issues);
  page.bindingContext = issues;
}
