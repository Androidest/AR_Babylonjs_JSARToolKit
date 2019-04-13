const fs = require('fs');
fs.readFile('./Source/index.html', 'utf-8', function(err, script) 
{
    if(err) console.log(err);

    let start = script.indexOf("<!-- FB_START -->");
    let end = script.indexOf("<!-- FB_END -->");

    if(start != -1 && end != -1)
    {
        let str = script.slice(start, end);
        script = script.replace(str, '<!-- FB_START --><script src="https://connect.facebook.com/en_US/fbinstant.6.2.js"></script>');
        
        fs.writeFile('./Source/index.html', script, 'utf-8', function(err)
        {
            if(err) console.log(err);
        });
    }
})