export interface Table {
    tableName?;
    databaseName?;
    databaseType?;
    majorTtl?;
    deleteMajorData?;
    columns?;
    tags?;
}
