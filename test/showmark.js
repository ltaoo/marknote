var showdown  = require('showdown')
const highlight = require('highlight.js')

// 自定义解析器
showdown.extension('myext', function() {
    return [{
        type: 'lang',
        // regex: /<ul>/g,
        // replace: '<ul browser-default>'
        filter(code, converter, options) {
            // console.log(text, converter, options)
            let lines = code.split('\n')
            let result = ''
            lines.forEach(line => {
                result += `<li>${line}</li>`
            })
            return '<pre><code><ol>'
                + result
                + '\n</ol></code></pre>\n'; 
        }
    }]
});
let converter = new showdown.Converter({
    extensions: ['myext']
})

const noteContent = '```javascript\nvar a = "b";\n```\n - helo\n - some'

let result = converter.makeHtml(noteContent)

console.log(result)