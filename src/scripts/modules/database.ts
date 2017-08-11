import * as DataStore from 'nedb'

export interface CategoryDataInterface{
    name: string
}

const dbDir = '/databases/'
let dbSuffix = '.db'

function createDataStore(name: string, index?: string){
    let ds = new DataStore({ filename : dbDir + name + dbSuffix, autoload: true })
    if(index){
        ds.ensureIndex({ fieldName: index, unique: true })
    }
    return ds
}

export class Database {

    public categories: DataStore;
    public flux: DataStore;
    public products: DataStore;
    public places: DataStore;

    constructor(){
        this.categories = createDataStore('categories', 'name')
        this.flux       = createDataStore('flux')
        this.products   = createDataStore('products', 'barcode')
        this.places     = createDataStore('places', 'name')
    }

    addCategory( data: CategoryDataInterface, callback?: (err: any, res:any) => void ){
        this.categories.insert(data, callback)
    }
    getCategories( request:any, callback?: (err: any, res:any) => void ){
        this.categories.find(request, callback)
    }

}