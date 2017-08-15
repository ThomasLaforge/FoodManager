import { DbSchema } from '../modules/database'

export interface ProductSchema {
    fields : {
        name: string
    }
}

export const ProductDbSchema :DbSchema = {
    indexes : ['barcode']
}