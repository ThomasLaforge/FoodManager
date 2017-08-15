import { DbSchema } from '../modules/database'

export interface PlaceSchema {
    fields : {
        name: string
    }
}

export const PlaceDbSchema :DbSchema = {
    indexes : ['name']
}