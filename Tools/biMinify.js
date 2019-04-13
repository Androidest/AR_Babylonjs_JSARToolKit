const fs = require('fs');
var path = require("path");

fs.readFile('./Source/index.html', 'utf-8', function(err, data) 
{
    if(err) console.log(err);

    let startInclude = data.indexOf("STEPHEN_START");
    let endInclude = data.indexOf("STEPHEN_END");
    let startTag = "<script";
    let endTag = ">"
    let delta = startTag.length;
    let start;
    let end = startInclude;

    command = "java -jar ./Tools/compiler.jar --js_output_file ./Build/Assets/Code/All.min.js --js";

    while(true)
    {
        start = data.indexOf(startTag, end); 
        end = data.indexOf(endTag, start);

        if (start == -1 || start > endInclude)
            break;

        let src = data.slice(start + delta, end);
        let sourcePath = eval(src.slice(src.indexOf("=")+1));
        command += path.join(" Source/", sourcePath);
    }
    
    fs.writeFile('./Tools/biMinify.bat', command, 'utf-8', function(err)
    {
        if(err) console.log(err);
    });
})