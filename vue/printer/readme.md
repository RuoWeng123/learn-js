### vue中 使用 printer.min.js打印功能
1. create file in lib of 'print.min.js'
2. require print.min.js to function
```
require.ensure([], () => {
   require('@/lib/print.min')

   let properties = []
   let columns = head   //table head instance

   columns.forEach(item => {
       properties.push({
           displayName: item.title,
           field: item.key
       })
   })

   printJS({
       printable: this.tableData,  //table body data
       properties,
       type: 'json',
       header: 'print file name'              
   })
})
```
