const fs = require("fs");
const path = require("path");
const JavaScriptObfuscator = require('javascript-obfuscator');

const settings = {
    compact: true
}

function obfuscateDir(dirPath) {
    var dirents = fs.readdirSync(dirPath, { encoding: "utf8", withFileTypes: true });
    for (let i = 0; i < dirents.length; i++) {
        let dirent = dirents[i];
        
        if (dirent.isDirectory()){
            obfuscateDir(path.join(dirPath, dirent.name));
            continue;
        }

        if (path.extname(dirent.name) !== ".js") continue;

        let filePath = path.join(dirPath, dirent.name);
        let content = fs.readFileSync(filePath, { encoding: "utf8" });

        let obfuscator = JavaScriptObfuscator.obfuscate(content, settings);
        let obfuscatedCode = obfuscator.getObfuscatedCode();

        fs.writeFileSync(filePath, obfuscatedCode, { encoding: "utf8", flag: "w+" });
    }
}

obfuscateDir(path.join(__dirname, "../../build"));