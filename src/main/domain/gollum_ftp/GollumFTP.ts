import { Client, FileInfo } from "basic-ftp";

type GollumFTPResult = {
    is_success: number,
    code: number | string,
    message: string
}


export class GollumFTP {
    private static client = new Client()
    private static host: string

    /**
     * Get access to an FTP server
     *
     * @param {string} host 
     * @param {string} username
     * @param {string} password
     * @param {?number} [port]
     * @returns {Promise<GollumFTPResult>}
     */
    public static async connectFTP(host: string, username: string, password: string, port?:number): Promise<GollumFTPResult> {
        // GollumFTP.client.ftp.verbose = true
        GollumFTP.host = host
        
        let res
        try {
            res = await GollumFTP.client.access({host: host, port: port, user: username, password: password})
            res.is_success = 1
            res.message =  `Connection à ${host} réussie`
        } catch (error: any) {
            res = error
            res.is_success = 0
        } finally {
            return {is_success: res.is_success, code: res.code, message: res.message.replace(/^\d* /g, '')}
        }
    }

    
    /**
     * Disconnect client to FTP server
     */
    public static disconnectFTP(): GollumFTPResult {
        try {
            GollumFTP.client.close()
            return {is_success: 1, code: '', message: `${GollumFTP.host} déconnecté`}
        } catch (error: any) {
            return {is_success: 0, code: error.code, message: error.message.replace(/^\d* /g, '')}
        }
    }

    
    /**
     * List files and directories in the current working directory, or at path if specified
     *
     * @param {?string} [path] specified path
     * @returns {Promise<FileInfo[] | GollumFTPResult>} List if success, otherwise {error_code, error_message}
     */
    public static async listDir(path?: string): Promise<FileInfo[] | GollumFTPResult> {
        // try {
            return await GollumFTP.client.list(path)
        // } catch (error: any) {
        //     return {is_success: 0, code: error.code, message: error.message.replace(/^\d* /g, '')}
        // }
    }

    
    /**
     * Change the current working directory to a specified path
     *
     * @param {string} path 
     * @returns {Promise<FileInfo[] | GollumFTPResult>} List if success, otherwise {error_code, error_message}
     */
    public static async changeDir(path: string): Promise<FileInfo[] | GollumFTPResult> {
        // try {
            await GollumFTP.client.cd(path)
            return await GollumFTP.listDir()
        // } catch (error: any) {
        //     return {is_success: 0, code: error.code, message: error.message.replace(/^\d* /g, '')}
        // }
    }

    
    /**
     * Get the path of the current working directory.
     *
     * @returns {Promise<string>}
     */
    public static async pwd(): Promise<string> {
        return await GollumFTP.client.pwd()
    }

    
    /**
     * Upload the selected local directory to the current remote working directory
     *
     * @param {string} from local directory path
     * @returns {Promise<GollumFTPResult>}
     */
    public static async send(from: string): Promise<GollumFTPResult> {
        console.log(from)
        let res
        try {
            await GollumFTP.client.uploadFromDir(from, from.split('/').at(-1))
            res = {is_success: 1, code: 226, message: 'Téléchargement terminé'}
        } catch (error: any) {
            res = error  
            res.is_success = 0         
        } finally {
            return {is_success: res.is_success, code: res.code, message: res.message.replace(/^\d* /g, '')}
        }
    }

}