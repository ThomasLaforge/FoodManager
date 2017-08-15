import { DbSchema } from '../modules/database'

export interface LineSchema {
    fields : {
        name: string
    }
}

export const LineDbSchema :DbSchema = {
    indexes : []
}