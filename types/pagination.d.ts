import { ElementUIComponent } from './component'

export declare class pagination extends ElementUIComponent {
  /**分页总数 */
  total: number
  /**当前页 */
  page: number
  /**每页大小 */
  limit: number
  /**分页大小列表 [10, 20, 30, 50] */
  pageSizes: number[]
  /**分页布局 total, sizes, prev, pager, next, jumper*/
  layout: string
  /**是否背景 */
  background: boolean
  /**是否滚动 */
  autoScroll: boolean
  /**是否显示 */
  hidden: boolean
  /**分页发生变化时回调 */
  pagination(): void
}
