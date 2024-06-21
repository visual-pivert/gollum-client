import { Client, FileInfo } from "basic-ftp";

type GollumFTPResult = {
    code: number | string,
    message: string
}


export class GollumFTP {
    private static client = new Client()
    private static host
    
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
        let res
        try {
            res = await GollumFTP.client.access({host: host, port: port, user: username, password: password})
            GollumFTP.host = host
            res.message = `Connection à ${host} réussie`
        } catch (error: any) {
            res = error
        } finally {
            return {code: res.code, message: res.message.replace(/^\d* /g, '')}
        }
    }

    
    /**
     * Disconnect client to FTP server
     */
    public static disconnectFTP(): GollumFTPResult {
        try {
            GollumFTP.client.close()
            return {code: '', message: `${GollumFTP.host} déconnecté`}
        } catch (error: any) {
            return {code: error.code, message: error.message.replace(/^\d* /g, '')}
        }
    }

    
    /**
     * List files and directories in the current working directory, or at path if specified
     *
     * @param {?string} [path] specified path
     * @returns {Promise<FileInfo[] | GollumFTPResult>} List if success, otherwise {error_code, error_message}
     */
    public static async listDir(path?: string): Promise<FileInfo[] | GollumFTPResult> {
        try {
            return await GollumFTP.client.list(path)
        } catch (error: any) {
            return {code: error.code, message: error.message.replace(/^\d* /g, '')}
        }
    }

    
    /**
     * Change the current working directory to a specified path
     *
     * @param {string} path 
     * @returns {Promise<FileInfo[] | GollumFTPResult>} List if success, otherwise {error_code, error_message}
     */
    public static async changeDir(path: string): Promise<FileInfo[] | GollumFTPResult> {
        try {
            await GollumFTP.client.cd(path)
            return GollumFTP.listDir()
        } catch (error: any) {
            return {code: error.code, message: error.message.replace(/^\d* /g, '')}
        }
    }

    
    /**
     * Get the path of the current working directory.
     *
     * @returns {Promise<string>}
     */
    public static async pwd(): Promise<string> {
        return GollumFTP.client.pwd()
    }

    
    /**
     * Upload the selected local directory to the current remote working directory
     *
     * @param {string} from local directory path
     * @returns {Promise<GollumFTPResult>}
     */
    public static async send(from: string): Promise<GollumFTPResult> {
        let res
        try {
            await GollumFTP.client.uploadFromDir(from, from.split('/').at(-1))
            res = {code: 226, message: 'Téléchargement terminé'}
        } catch (error: any) {
            res = error           
        } finally {
            return {code: res.code, message: res.message.replace(/^\d* /g, '')}
        }
    }

}