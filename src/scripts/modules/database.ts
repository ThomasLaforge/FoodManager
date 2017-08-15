import * as DataStore from 'nedb'
import { NotInDbError } from './Errors'
import { PlaceSchema, PlaceDbSchema } from '../models/Place'
import { CategorySchema, CategoryDbSchema } from '../models/Category'
import { LineSchema, LineDbSchema } from '../models/Line'
import { ProductSchema, ProductDbSchema } from '../models/Product'

export interface DbSchema {
    indexes: string[]
}

const dbDir = './databases/'
let dbSuffix = '.db'

class DataStoreCrud<T> {

    private dataStore: DataStore
    private name: string
    private dbSchema: string

    constructor(name: string, dbSchema: any){
        let ds = new DataStore({ filename : dbDir + name + dbSuffix, autoload: true })
        if(dbSchema && dbSchema.indexes){
            dbSchema.indexes.forEach( (index: string) => {
                ds.ensureIndex({ fieldName: index, unique: true })
            });
        }
        this.dataStore = ds
        this.name = name
        this.dbSchema = dbSchema
    }

    find(data: any, option?: any): Promise<T[]> {
        return new Promise((resolve, reject) => {
            let cursor = this.dataStore.find(data);
            let count = -1;
            if (option) {
                if (option.sort) {
                    cursor = cursor.sort(option.sort);
                }
                if (option.limit) {
                    cursor = cursor.limit(option.limit);
                }
                if (option.skip) {
                    cursor = cursor.skip(option.skip);
                }
            }
            cursor.exec(function (err, result:T[]) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    update(id: string, data: any, options = { upsert: false, returnUpdatedDocs: true }): Promise<T> {
        return new Promise((resolve, reject) => {
            this.dataStore.update({ _id: id }, { $set: data }, options, (err, numAffected: number, affectedDocuments:T, upsert) => {
                if (err) {
                    reject(err);
                } else if (upsert === false && numAffected == 0) {
                    reject(new NotInDbError({ dbid: id, dbName: this.name }));
                } else {
                    resolve(affectedDocuments);
                }
            });
        });
    }
    get(id: string): Promise<T> {
        return new Promise((resolve, reject) => {
            this.dataStore.findOne({ _id: id }, (err, result:T) => {
                if (err || !result) {
                    reject(err || new NotInDbError({ dbid: id, dbName: this.name }));
                } else {
                    resolve(result);
                }
            })
        });
    }
    getLastEntry(data = {}): Promise<T> {
        return new Promise((resolve, reject) => {
            this.dataStore.find(data).sort({ timestamp: -1 }).limit(1).exec( (err, res: T[]) => {
                if (err || !res) {
                    reject(err || new NotInDbError({ dbName: this.name }));
                }
                else {
                    console.log('getLastEntry::care of type could be res to resolve and not res[0]')
                    resolve(res[0]);
                }
            })
        });
    }
    getSince(timestamp: number): Promise<T> {
        return new Promise((resolve, reject) => {
            this.dataStore.find({ timestamp: { $gt: timestamp } }, function (err, result:T) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        });
    }
    insertSingle(data: any): Promise<T> {
        delete data._id;
        delete data.createdAt;
        delete data.updatedAt;
        return this.update(data.id, data, { upsert: true, returnUpdatedDocs: true });
    }
    insert(data: any): Promise<T | T[]> {
        if (Array.isArray(data)) {
            return Promise.all(data.map(d => this.insertSingle(d)));
        } else {
            return this.insertSingle(data);
        }
    }
    remove(arrId: string | string[]): Promise<any> {
        if (Array.isArray(arrId)) {
            return Promise.all(arrId.map((id) => {
                return this.remove(id);
            }));
        }
        return new Promise((resolve, reject) => {
            return this.dataStore.remove({ _id: arrId }, {}, (err, nb) => {
                if (err) {
                    reject(err);
                } else if (nb == 0) {
                    reject(new NotInDbError({ dbid: arrId, dbName: this.name }));
                } else {
                    resolve(nb);
                }
            });
        });
    }
    count(data: any, option?: any): Promise<number> {
        return new Promise((resolve, reject) => {
            if (!option && !data) {
                this.dataStore.count(function (err, result: number) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
                return;
            }
            let cursor = this.dataStore.count(data);
            if (option) {
                if (option.sort) {
                    cursor = cursor.sort(option.sort);
                }
                if (option.limit) {
                    cursor = cursor.limit(option.limit);
                }
                if (option.skip) {
                    cursor = cursor.skip(option.skip);
                }
            }
            cursor.exec(function (err, count) {
                if (err) {
                    reject(err);
                } else {
                    resolve(count);
                }
            });
        });
    }

}

export class Database {

    public categories: DataStoreCrud<CategorySchema>;
    public lines: DataStoreCrud<LineSchema>;
    public products: DataStoreCrud<ProductSchema>;
    public places: DataStoreCrud<PlaceSchema>;

    constructor(){
        this.categories = new DataStoreCrud<CategorySchema>('categories', CategoryDbSchema)
        this.lines       = new DataStoreCrud<LineSchema>('line', LineDbSchema)
        this.products   = new DataStoreCrud<ProductSchema>('products', ProductDbSchema)
        this.places     = new DataStoreCrud<PlaceSchema>('places', PlaceDbSchema)
    }

    // addCategory( data: CategoryDataInterface, callback?: (err: any, res:any) => void ){
    //     this.categories.insert(data, callback)
    // }
    // getCategories( request:any, callback?: (err: any, res:any) => void ){
    //     this.categories.find(request, callback)
    // }

}