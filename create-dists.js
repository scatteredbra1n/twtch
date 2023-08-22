const zipper = require("zip-local");
const fs = require("fs");

const package = require("./package.json");

// const paths = ["twtch-win32-x64", "twtch-linux-x64", "twtch-darwin-x64"]

// Recursive function to get files
function getFiles(dir, files = []) {
  // Get an array of all files and directories in the passed directory using fs.readdirSync
  const fileList = fs.readdirSync(dir);
  // Create the full path of the file/directory by concatenating the passed directory and file/directory name
  for (const file of fileList) {
    const name = `${dir}/${file}`;
    // Check if the current file/directory is a directory using fs.statSync
    if (fs.statSync(name).isDirectory()) {
      // If it is a directory, recursively call the getFiles function with the directory path and the files array
      getFiles(name, files);
    } else {
      // If it is a file, push the full path to the files array
      files.push(name);
    }
  }
  return files;
}


const dir = "./build";
const folderList = fs.readdirSync(dir);
let folders = [];
for (const folder of folderList) {
	const name = `${dir}/${folder}`;
	if (fs.statSync(name).isDirectory()) {
		let filename = `./docs/${folder}-${package.version}.zip`
		filename = filename.replace('darwin-x64', 'macos')
		filename = filename.replace('win32-x64', 'windows')
		filename = filename.replace('linux-x64', 'linux')
		console.log(`saving ${filename}`)
		zipper.sync.zip(name).compress().save(filename)
	}
}


// for (path in paths) {
// 	zipper.sync.zip("./build/twtch-win32-x64/").compress().save(`twtch-windows-${package.version}.zip`)
// }


// zipper.sync.zip("./build/twtch-win32-x64/").compress().save(`twtch-windows-${package.version}.zip`)	
// zipper.sync.zip("./build/twtch-linux-x64/").compress().save(`twtch-linux-${package.version}.zip`)	
// zipper.sync.zip("./build/twtch-darwin-x64/").compress().save(`twtch-macos-${package.version}.zip`)