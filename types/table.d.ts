import { ElementUIComponent } from './component'

export declare class table extends ElementUIComponent {
  /**加载LOADING */
  load: boolean

  /**显示多选框 */
  selection: boolean

  /**绑定属性,表格属性与elementui相同 */
  tableAttribute: object

  /**绑定事件,表格事件与elementui相同*/
  tableEvents: object

  /** 表格数据源 */
  sourceData: object[]

  /**表格列字段 */
  columns: []

  /**分页参数 */

  /**是否显示分页 */
  pageHidden: boolean

  //当前页
  currentPage: number

  //分页条数
  pageSize: number

  //每页显示个数选择器的选项设置
  pageSizes: number[]

  /**分页总数 */
  total: number

  /**分页对齐方式 text-left text-center text-right*/
  pageAlign: string

  /**分页发生变化时调用方法 */
  change: (page: object) => void

  /**多选表格，回调数据 */
  selectionChange: (data: object[]) => void

  /**重新布局表格 */
  doLayout(): void

  /**自定义排序 */
  sortChange(prop: string, order: string): void
}
