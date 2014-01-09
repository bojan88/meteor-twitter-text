Package.describe({
  summary: "Twitter Text"
});

Package.on_use(function (api) {
  api.add_files("./lib/twitter-text.js", "client");
});
