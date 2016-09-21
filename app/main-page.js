"use strict";
var http = require("http");
var nIssuesUrl = "https://api.github.com/repos/NativeScript/NativeScript/issues";
function navigatingTo(args) {
    return __awaiter(this, void 0, void 0, function () {
        var page, issues;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    page = args.object.page;
                    return [4 /*yield*/, http.getJSON(nIssuesUrl)];
                case 1:
                    issues = _a.sent();
                    console.log("issues: " + issues);
                    page.bindingContext = issues;
                    return [2 /*return*/];
            }
        });
    });
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map