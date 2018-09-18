import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
    })
};
@Injectable()

export class DataService {
    constructor(private  http: HttpClient) {}

    getLineChart() {
        const params = new HttpParams()
            .set('username', 'root')
            .set('password', 'root')
            .set('url', '99');
        return this.http.get<any>('http://localhost:4200/api/rabbitmq/detail', {params})
            .toPromise()
            .then(res => res.data)
            .then(data => data);
    }

    getTableList() {

        return this.http.get<any>('http://localhost:4200/api/tableData/getAllTableList')
            .toPromise()
            .then(res => res.data)
            .then(data => data);
    }

    saveTableList(x) {
        let body = {
            id: x._id || '',
            tableName: x.tableName,
            databaseName: x.databaseName,
            databaseType: x.databaseType,
            majorTtl: x.majorTtl,
            deleteMajorData: x.deleteMajorData,
            columns: x.columns,
            tags: x.tags
        };
        return this.http.post<any>('http://localhost:4200/api/tableData/createMajorTableInfo', body, httpOptions)
            .toPromise()
            .then(res => res)
            .catch(res => res);
    }
    saveCqTableList(body) {
        return this.http.post<any>('http://localhost:4200/api/tableData/createCqTableInfo', body , httpOptions)
            .toPromise()
            .then(res => res)
            .then(data => data);
    }
    getTargetTableTogether(x) {
        const params = new HttpParams()
            .set('tableName', x.tableName)
            .set('majorTtl', x.majorTtl)
            .set('dataBaseName', x.dataBaseName);
        return this.http.get<any>('http://localhost:4200/api/tableData/getAllCqTableListByMajor', {params})
            .toPromise()
            .then(res => res.data)
            .then(data => data);
    }
    deleteMajorTable(x) {
        const body = {
            tableName: x.tableName,
            databaseName: x.databaseName,
            majorTtl: x.majorTtl,
        };
        return this.http.post<any>('http://localhost:4200/api/tableData/deleteMajorTableInfo', body , httpOptions)
            .toPromise()
            .then( res => res.data)
            .then( data => data);
    }
    deleteCqTable(x) {
        const body = {
            cqName: x.cqName,
            databaseName: x.databaseName,
            cqTtl: x.cqTtl,
        };
        return this.http.post<any>('http://localhost:4200/api/tableData/deleteCqTableInfo', body , httpOptions)
            .toPromise()
            .then(res => res)
            .then(data => data);
    }
}
