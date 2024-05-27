import fs from 'node:fs'
import { json } from 'stream/consumers'

export interface IGolSession {
    persist(),
    addOrModify(data: Object),
    clear(),
    delete(key: string),
    get(key: string): Object,
    getAll(): Object
}

export class GolSession implements IGolSession {
    constructor(db_path: string){
        this.db_path = db_path
        this.data = this._read()
    }
    persist() {
        const to_string_data = JSON.stringify(this.data)
        const bufferized_data = Buffer.from(to_string_data)
        const base64_data = bufferized_data.toString('base64')
        fs.writeFileSync(this.db_path, base64_data)
    }
    _read(){
        try {
            const base64_data = fs.readFileSync(this.db_path, 'ascii')
            const bufferized_data = Buffer.from(base64_data, 'base64')
            const str_data = bufferized_data.toString('ascii')
            const the_data = JSON.parse(str_data)
            return the_data
        } catch (error: any) {
            console.error(error)
            return {}
        }
    }
    addOrModify(data: Object) {
        this.data = {...this.data, ...data}
    }
    clear() {
        this.data = {}
    }
    delete(key: string) {
        delete this.data[key]
    }
    get(key: string): Object {
        return this.data[key]
    }
    getAll(): Object {
        return this.data
    }
}