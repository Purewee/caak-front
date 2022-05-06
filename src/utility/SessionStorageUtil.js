import { AES , enc } from "crypto-js"
import Configure from "../configure";

export function get(key){
    try{
        const stored = sessionStorage.getItem(key);
        if (!stored || stored === "undefined") {
            return null;
        }
    
        const decrypted = AES.decrypt(stored, Configure.AESKey)
        return JSON.parse(decrypted.toString(enc.Utf8));
    }catch(ex){
        console.log(ex)
        sessionStorage.removeItem(key)
    }
}

export function set(key, value){
    const encrypted = AES.encrypt(JSON.stringify(value), Configure.AESKey)
    sessionStorage.setItem(key, encrypted.toString())
    return true
}

export function remove(key){
    sessionStorage.removeItem(key)
    return true
}

const SessionStorageUtil = {
    get,
    set,
    remove
}

export default SessionStorageUtil