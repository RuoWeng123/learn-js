### display 属性

+ table    此元素会作为块级表格来显示（类似 <table>），表格前后带有换行符。
+ table-row-group    此元素会作为一个或多个行的分组来显示（类似 <tbody>）。
+ table-header-group    此元素会作为一个或多个行的分组来显示（类似 <thead>）。
+ table-footer-group    此元素会作为一个或多个行的分组来显示（类似 <tfoot>）。
+ table-row    此元素会作为一个表格行显示（类似 <tr>）。
+ table-column-group    此元素会作为一个或多个列的分组来显示（类似 <colgroup>）。
+ table-column    此元素会作为一个单元格列显示（类似 <col>）

+ table-cell    此元素会作为一个表格单元格显示（类似 td 和 th）
+ table-caption    此元素会作为一个表格标题显示（类似 caption）   

<br>
设置头部菜单下拉列表时，默认的li元素必须采用 table-caption。
可保证父级li不会底对齐。可保证li宽度按设定的走，不会产生顶偏移。 查看menu.vue 实例。