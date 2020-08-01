//@ts-check
import { FrmdbChartSeries } from "./series";
import { FrmdbChart } from "./chart";
import { FrmdbChartDataPoint } from "./point";

class FrmdbChartDataPointX extends HTMLElement {
    connectedCallback() {
        this.style.display = 'table-cell';
        this.style.borderTop = '1px solid lightgrey';
        this.style.borderRight = '1px solid lightgrey';
        this.style.padding = "5px";
    }

}
class FrmdbChartDataPointY extends HTMLElement {
    connectedCallback() {
        this.style.display = 'table-cell';
        this.style.borderTop = '1px solid lightgrey';
        this.style.borderRight = '1px solid lightgrey';
        this.style.padding = "5px";
    }
}

window.customElements.define('frmdb-chart-p', FrmdbChartDataPoint);
window.customElements.define('frmdb-chart-p-x', FrmdbChartDataPointX);
window.customElements.define('frmdb-chart-p-y', FrmdbChartDataPointY);
window.customElements.define('frmdb-chart-series', FrmdbChartSeries);
window.customElements.define('frmdb-chart', FrmdbChart);
