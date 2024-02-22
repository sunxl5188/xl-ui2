## https://www.cnblogs.com/hencins/p/15433763.html

### body 中变量的用法

```
TM_SELECTED_TEXT： 当前选定的文本或空字符串
TM_CURRENT_LINE：当前行的内容
TM_CURRENT_WORD：光标下的单词或空字符串的内容
TM_LINE_INDEX：基于索引为0的行数
TM_LINE_NUMBER：基于索引为1的行数
TM_FILENAME：当前文档的文件名
TM_FILENAME_BASE：不带扩展名的当前文档的文件名
TM_DIRECTORY：当前文档的目录
TM_FILEPATH：当前文档的完整文件路径
RELATIVE_FILEPATH：当前文档的相对文件路径 (相对于打开的工作区或文件夹）
CLIPBOARD：剪贴板的内容
WORKSPACE_NAME：打开的工作区或文件夹的名称
WORKSPACE_FOLDER：打开的工作区或文件夹的路径
CURSOR_INDEX：基于索引为0的光标编号
CURSOR_NUMBER：基于索引为1的光标编号
```

### 插入当前日期和时间

```
CURRENT_YEAR：当前年
CURRENT_YEAR_SHORT：当前年的最后两位数
CURRENT_MONTH：两位数的月份值（如：02）
CURRENT_MONTH_NAME：月份的全称（如'July'）
CURRENT_DATE：月份缩写（如'Jul'）
CURRENT_DATE：保留两位数的月份日期（如：09）
CURRENT_DAY_NAME：星期数（如'Monday'）
```
