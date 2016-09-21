Use async/await with TypeScript in {N} today
============================================

(Sept 2016)

Async/awayt down compiling to ES5 was recently merged in TypeScript master, and is now available within the TypeScript @next version. It comes with some nifty polyfils, but other than that it is pretty straight forward.

To use in {N} app, just make your new TypeScript enabled app:
```
tns create IssuesList --template typescript
cd IssuesList
code .
npm install typescript@next --save-dev
```

{N} ships commonjs modules and emmiting helpers in every module is undesireable.
We will generate a single file with the required helpers for async/await.
Create an `app/helpers.ts` file with the following typescript:
```
export async function test() {}
```
Then run the @next tsc:
```
./node_modules/typescript/bin/tsc app/helpers.ts --target es5
```
Once the `app/helpers.js` is ready, **delete the `app/helpers.ts`**.
Open the `.js` file and edit:
```
var __awaiter = ...
var __generator = ...
```
to
```
global.__awaiter = ...
global.__generator = ...
```
You may as well delete the `test()` function.

The {N} entry point is the `app/app.js` and we will make sure to import the helpers there:
```
require("./helpers");
import * as app from 'application';
app.start({ moduleName: 'main-page' });
```

Now we can make a good use of the async/await in our app.
Lets list some github issues, in `app/main-page.xml`:
``` XML
<Page xmlns="http://schemas.nativescript.org/tns.xsd" navigatingTo="navigatingTo">
  <ListView items="{{ $value }}">
    <ListView.itemTemplate>
      <GridLayout columns="42, *" height="42">
        <Image src="{{ user.avatar_url }}"
            width="24" height="24"
            horizontalAlignmnet="center" verticalAlignment="center"
            borderColor="gray" borderWidth="1" borderRadius="12" />
        <Label col="1" text="{{ title }}" verticalAlignment="center" textAlignment="left" />
      </GridLayout>
    </ListView.itemTemplate>
  </ListView>
</Page>
```

And finally using the async/await in `app/main-page.ts`:
``` TypeScript
import * as http from "http";

const nIssuesUrl = "https://api.github.com/repos/NativeScript/NativeScript/issues";

export async function navigatingTo(args) {
  let page = args.object.page;
  let issues = await http.getJSON(nIssuesUrl);
  console.log("issues: " + issues);
  page.bindingContext = issues;
}
```

We can finally run the app:
```
tns run ios
```
The NativeScript TypeScript plugin uses TypeScript compiler installed as dependency so it will automatically pick the latest version.

Cheers,
