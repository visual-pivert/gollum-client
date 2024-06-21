import { test } from "vitest"
import { GollumFTP } from "../GollumFTP"


test('ftp_connection', async () => {
    console.log(await GollumFTP.connectFTP('192.168.200.136', 'gollum', 'gollum'))
})


// test('change_dir', async () => {
//     console.log(await GollumFTP.changeDir('prody'))
// })

// test('pwd', async () => {
//     console.log(await GollumFTP.pwd())
    
// })
// test('list_dir', async () => {      
//     console.log(await GollumFTP.listDir()) 
// })

// test('send', async () => {
//     console.log(await GollumFTP.send('/home/nyr/test_gollum/depot-remote')) 
// })

test('disconnect_ftp', () => {
    console.log(GollumFTP.disconnectFTP())
})