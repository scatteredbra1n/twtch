const nativefier = require("nativefier").default;
const electronInstaller = require('electron-winstaller');
const zipper = require("zip-local");
const fs = require("fs");

const package = require("./package.json");

const globalOptions = {
	name: "twtch.",
	targetUrl: "http://twitch.tv",
	version: package.version,
	out: "./build/",
	asar: false,
	overwrite: "true",
	honest: false,
	minHeight: 400,
	minWidth: 400,
	disableOldBuildWarningYesiknowitisinsecure: true,
	inject: ["./overrides.css", "./overrides.js"]
};

const macOptions = {
	...globalOptions,
	platform: "osx",
	titleBarStyle: "hiddenInset",
	icon: "./Twtch.icns",
}

const windowsOptions = {
	...globalOptions,
	icon: "./Twtch.ico",
	platform: "windows"
}

const linuxOptions = {
	...globalOptions,
	platform: "linux",
	icon: "./Twtch.png"
}

console.log(macOptions);



nativefier(windowsOptions, function(error, appPath) {
	if (error) {
		console.error(error);
		return;
	}

	

	console.log("Twtch is ALIVE for WINDOWS!")



  	// resultPromise = electronInstaller.createWindowsInstaller({
   //  	appDirectory: 'twtch-win32-x64',
   //  	outputDirectory: './twtch-win',
   //  	authors: 'Josh Chaiken',
   //  	exe: 'twtch.exe'
  	// });

  	// resultPromise.then(() => console.log('It worked!'), e => console.log(`No dice: ${e.message}`));
});


nativefier(linuxOptions, function(error, appPath) {
	if (error) {
		console.error(error);
		return;
	}

	console.log("Twtch is ALIVE for LINUX!")
});

nativefier(macOptions, function(error, appPath) {
	if (error) {
		console.error(error);
		return;
	}

	console.log("Twtch is ALIVE for MAC!")
});
