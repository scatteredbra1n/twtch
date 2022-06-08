const zipper = require("zip-local");
const fs = require("fs");

const package = require("./package.json");

zipper.sync.zip("./twtch-win32-x64/").compress().save(`twtch-windows-${package.version}.zip`)	
zipper.sync.zip("./twtch-linux-x64/").compress().save(`twtch-linux-${package.version}.zip`)	
zipper.sync.zip("./twtch-darwin-x64/").compress().save(`twtch-macos-${package.version}.zip`)