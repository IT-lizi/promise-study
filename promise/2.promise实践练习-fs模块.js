const fs = reqire('fs');
// fs.readFile('./resourse/content.txt',
//     //如果错误就抛出错误
//     (err, data) => {
//         if (err) throw err;
//         //输出文件内容
//         console.log(data.toString());
//     });
let p = new Promise((resolve, reject) => {
    fs.readFile('./resourse/content.txt',
        //如果错误就抛出错误
        (err, data) => {
            if (err) reject(err);
            //输出文件内容
            resolve(data);
        });
});
p.then(value => {
        console.log(value.toString())
    },
    reason => {
        console.log(reason);
    })