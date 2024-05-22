import fs from 'node:fs'
import {env} from '#main/env'

export function init (){
    // On creer une nouvelle instance de session
    fs.writeFileSync(env['VAR_PATH'], '')
}