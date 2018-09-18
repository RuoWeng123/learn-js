import { Component , OnInit} from '@angular/core';
import {Message} from 'primeng/components/common/api';
import { Table } from './domain/table';
import { DataService } from './services/dataService';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [DataService ]
})

export class AppComponent implements  OnInit {
    // chart
    data: any;
    options: any;
    msgs: Message[] = [];
    // table
    table: Table = new PrimeTable();
    displayDialog: boolean;
    displayDialogDelete: boolean;
    tables: Table[];
    selectedTable: Table;
    newTable: boolean;
    cols: any[];
    columnsType: any[];
    majorTtls: any[];
    majorTtls_2: any[];
    tempColumn: any;
    tempTag: any;
    dataBase: any[];
    togetherList: any[];
    together: any;
    dataTable: any;
    columnsList: any[];
    tagsList: any[];
    dataBaseList: any[];
    // function
    constructor(private dataService: DataService ) {

    }

    ngOnInit() {
        this.getLineChart();
        this.getDataBaseTableList();
        this.cols = [
            { field: 'tableName', header: '表名称' },
            { field: 'databaseName', header: '所属数据库' },
            { field: 'databaseType', header: '数据库类型' },
            { field: 'majorTtl', header: '保存时间' },
            { field: 'deleteMajorData', header: '修改后是否删除原数据' },
            { field: 'columns', header: '列名' },
            { field: 'tags', header: '索引' },
        ];
        this.majorTtls = [
            {label: '选择时间', value: null},
            {label: '6秒', value: '6s'},
            {label: '1分钟', value: '1m'},
            {label: '1小时', value: '1h'},
            {label: '1天', value: '1d'},
            {label: '7天', value: '7d'},
        ];
        this.majorTtls_2 = [
            {label: '选择时间', value: null},
            {label: '1小时', value: '1h'},
            {label: '1天', value: '1d'},
            {label: '7天', value: '7d'},
        ];
        this.columnsType = [
            {value: 'int', label: 'int'},
            {value: 'long', label: 'long'},
            {value: 'double', label: 'double'},
            {value: 'string', label: 'string'},
            {value: 'boolean', label: 'boolean'},
        ];
        this.dataBaseList = [
            {value: 'influxDB', label: 'influxDB'},
            {value: 'druid', label: 'druid'},
        ];
    }

    //  交互方法处理
    selectData(event) {
        this.msgs = [];
        this.msgs.push({
            severity: 'info',
            summary: 'Data Selected',
            'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index]
        });
    }

    showDialogToEdit() {
        this.newTable = false;
        this.table = this.tables[0];
        this.selectedTable = Object.assign({}, this.tables[0]);
        this.displayDialog = true;
    }
    showDialogToAdd() {
        this.newTable = true;
        this.table = new PrimeTable();
        this.table.columns = [];
        this.table.tags = [];
        this.table.databaseType = 'influxDB';
        this.displayDialog = true;
    }
    showDialogToDelete() {
        this.newTable = false;
        this.table = this.tables[0];
        this.selectedTable = Object.assign({}, this.tables[0]);
        this.displayDialogDelete = true;
    }

    addColumn() {
        this.tempColumn = {
            name: '',
            type: 'int',
            tagFlag: false
        };
        console.log("=============");
        this.table.columns.push(this.tempColumn);
    }

    deleteColumn(index) {
        this.table.columns.splice(index,1);
    }


    addTogether() {
        this.table = this.tables[0];
        this.togetherList.push(
            {
                tableName: this.table.tableName,
                majorTtl: this.table.majorTtl,
                cqName: '',
                databaseName: this.table.databaseName,
                cqTtl: '',
                during: '',
                deleteGroupData: false,
                aggregateColumns: [],
                groupByColumns: []
            }
        );
        this.setTogetherList();
    }

    deleteTogether(index) {
        this.dataService.deleteCqTable(this.togetherList[index]).then(res =>{
            if (res.code === '10000') {
                this.msgs.push({severity: 'success', summary: 'Success Message', detail: res.msg});
            }else {
                this.msgs.push({severity: 'error', summary: 'Error Message', detail: res.msg});
                this.getDataBaseTableList();
            }
        })
        this.togetherList.splice(index,1);
    }

    cancel() {
        this.displayDialogDelete = false;
    }
    ok() {
        this.dataService.deleteMajorTable(this.table).then(res =>{
            this.displayDialogDelete = false;
        });
        this.displayDialogDelete = false;
    }
    // 接口请求处理
    getLineChart() {
        const dateTimeFormat = {
            second: '%H:%M:%S',
            minute: '%H:%M',
            hour: '%H:%M',
            day: '%Y-%m-%d',
            month: '%Y-%m',
            year: '%Y'
        };

        this.dataService.getLineChart().then(res => {
            if (res.ack_details === null && res.publish_details === null) {
                let temp_obj = [];
                for (let i = 10; i > 1 ; i--) {
                    let temp = [(new Date()).getTime() - i * 5000 , null];
                    temp_obj.push(temp);
                }
                res.ack_details = {
                    samples : temp_obj
                };
                res.publish_details = {
                    samples : temp_obj
                };
            }
            this.options = {
                chart: {
                    type: 'spline',
                    width: 1100,
                    height: 400,
                    events: {
                        load: function () {

                            let series = this.series;
                            setInterval(function () {
                                this.dataService.getLineChart().then(res => {
                                    series[0].addPoint([(new Date()).getTime() , res.ack_details.rate ], true , true);
                                    series[1].addPoint([(new Date()).getTime() , res.publish_details.rate], true , true);
                                });
                            }, 5000);

                        }
                    }
                },
                title: {
                    text: '速率对比曲线',
                    floating: false,
                    align: 'center',
                    style: {
                        fontSize: '16px',
                        color: '#4d4d4d'
                    }
                },
                credits: {
                    enabled: false
                },
                tooltip: {
                    shared: true
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: dateTimeFormat
                },
                yAxis: {
                    title: {
                        text:  null
                    }
                },
                colors: ['#4bc0c0', '#565656'],
                series: [
                    {
                        name: '消费速率',
                        data: res.ack_details.samples,
                    },
                    {
                        name: '发送速率',
                        data: res.publish_details.samples,
                    }
                ]
            };
        });
    }
    getDataBaseTableList() {
        this.dataBase = [];
        this.dataService.getTableList().then(res => {
            this.dataBase = res;
            this.dataTable = this.dataBase[0];
            this.getTargetTable(this.dataTable);
            this.getTargetTogetherList(this.dataTable);
        });

    }
    setTogetherList() {
        this.columnsList = [];
        this.tagsList = [];
        this.tables[0].columns.forEach(item => {
            if (item.type === 'int' || item.type === 'double' || item.type === 'long' ) {
                const temp_max = {
                    name: 'max_' + item.name,
                    type: item.type
                };
                const temp_min = {
                    name: 'min_' + item.name,
                    type: item.type,
                };
                const temp_avg = {
                    name: 'avg_' + item.name,
                    type: item.type
                };
                this.columnsList.push(temp_max);
                this.columnsList.push(temp_min);
                this.columnsList.push(temp_avg);
            }
            if (item.type === 'string' && item.tagFlag ) {
                const temp_tag = {
                    name: item.name,
                    type: item.type
                };
                this.tagsList.push(temp_tag);
            }
        });
    }

    getTargetTable(x) {
        if (!x) return;
        this.tables = [];
        this.tables.push(x);
        this.setTogetherList();
    }

    getTargetTogetherList(x) {
        if (!x) return;
        let params = {
            tableName: x.tableName,
            majorTtl: x.majorTtl,
            dataBaseName: x.databaseName
        };
        this.dataService.getTargetTableTogether(params).then(res => {
            this.togetherList = res;
        });
    }
    save() {
        if(!this.tables) {
            this.tables = [];
        }
        const tables = [...this.tables];
        if (this.newTable) {
                tables.splice(0, 1, this.table);
                let allow_ajax = true;
                   this.dataBase.forEach( item => {
                       if (this.table.tableName === item.tableName) {
                           allow_ajax = false;
                           this.msgs.push({severity: 'warn', summary: 'Warn Message', detail: 'Not allow same tableName'});
                           return;
                       }
                   });
                   if (!allow_ajax) return;
                this.dataBase.unshift({tableName: this.table.tableName, id: 0});
        } else {
            tables[this.findSelectedCarIndex()] = this.table;
        }
        this.table.tags = [];
        this.table.columns.forEach(item => {
            if (item.tagFlag) {
                let temp_obj = {
                    name: item.name,
                    type: item.type
                };
                this.table.tags.push(temp_obj);
            }
        });

        this.dataService.saveTableList(this.table).then(res => {
            if (res.code !== '10000') {
                this.msgs.push({severity: 'error', summary: 'Error Message', detail: res.msg});
                this.getDataBaseTableList();
                return;
            }else {
                this.msgs.push({severity: 'success', summary: 'Success Message', detail: res.msg});
            }
            this.displayDialog = false;
        });
        this.table = null;
        this.tables = tables;
        this.displayDialog = false;
    }

    delete() {
        const index = this.findSelectedCarIndex();
        this.tables = this.tables.filter((val, i) => i !== index);
        this.table = null;
        this.displayDialog = false;
    }

    saveTogether() {
        this.dataService.saveCqTableList(this.togetherList).then(res => {
            if (res.code === '10000') {
                this.msgs.push({severity: 'success', summary: 'Success Message', detail: res.msg});
            }else {
                this.msgs.push({severity: 'error', summary: 'Error Message', detail: res.msg});
                this.getDataBaseTableList();
            }
        });
    }

    findSelectedCarIndex(): number {
        return this.tables.indexOf(this.selectedTable);
    }
    onTabOpen(event) {
        this.dataTable = this.dataBase[event.index];
        this.getTargetTable(this.dataTable);
        this.getTargetTogetherList(this.dataTable);
    }
}

export class PrimeTable implements Table {
    constructor(public tableName?, public databaseName?, public databaseType?, public majorTtl?, public deleteMajorData?, public columns?, public tags?) {
    }
}
