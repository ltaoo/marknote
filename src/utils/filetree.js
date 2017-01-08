// 传入路径，返回结构对象

const fs = require('fs')
const path = require('path')

// function scan(folder) {
//     return new Promise((resolve, reject) => {
//         // 先判断是否是文件夹，如果不是就提示
//         fs.stat(folder, (err, stats) => {
//             if(err) reject(err)
//             if(!stats.isDirectory()) {
//                 // 如果不是目录
//                 reject('非目录')
//             }

//             fs.readdir(folder, (err, files) => {
//                 if(err) reject(err)

//                 // 遍历加上文件信息
//                 files = files.map(file => {
//                     const stats = fs.statSync(path.join(folder, file))
//                     const isFile = stats.isFile()
//                     // 文件和文件夹返回不同的结构
//                     if(isFile) {
//                         return {
//                             module: file,
//                             leaf: stats.isFile()
//                         }
//                     } else {
//                         // 递归
//                         scan(file)
//                             .then(tree => {

//                             })
//                         return {
//                             module: file,
//                             children: [],
//                             collapsed: true
//                         }
//                     }
//                 })
//                 // 生成指定结构的对象
//                 resolve({
//                     module: path.parse(folder).name,
//                     children: files,
//                     // 是否合上
//                     collapsed: true
//                 })
//             })
//         })
//     })
// }

function scan(folder) {
    try {
        const folderStats = fs.statSync(folder)
        if(folderStats.isFile()) {
            return '非目录'
        }
        let result = {
            module: path.parse(folder).name,
            collapsed: true,
            children: []
        }
        let files = fs.readdirSync(folder)
        files.forEach(file => {
            const stats = fs.statSync(path.join(folder, file))
            const isFile = stats.isFile()
            if(isFile) {
                result.children.push({
                    module: file,
                    leaf: stats.isFile()
                })
            } else {
                result.children.push(scan(path.join(folder, file)))
            }
        })

        return result
    }catch(err) {
        return err
    }

}

// scan('../components')
//     .then(files => {
//         console.log(files)
//     })
//     .catch(err => {
//         console.log(err)
//     }) 

module.exports = scan