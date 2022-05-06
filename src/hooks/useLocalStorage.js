import { AES , enc } from "crypto-js"
import Configure from "../configure"

const useLocalStorage = (type) => {


    const passOnSSR = () => {
        return false
    }

    const retFuncs = {
        lsGet: passOnSSR,
        lsSet: passOnSSR,
        lsRemove: passOnSSR
    }

    if(typeof window === "undefined"){
        return retFuncs
    }

    const storage = type === "local" ? localStorage : sessionStorage

    const get = (key) => {
        try{
            const stored = storage.getItem(key);
            
            if (!stored || stored === "undefined") {
               
                return false;
            }
            else {
                const decrypted = AES.decrypt(stored, Configure.AESKey)
                return JSON.parse(decrypted.toString(enc.Utf8));
            }
            
        }catch(ex){
            console.log(ex)
            storage.removeItem(key)
        }
    } 

    const set = (key, value) => {
            const encrypted = AES.encrypt(JSON.stringify(value), Configure.AESKey)
            storage.setItem(key, encrypted.toString())
            return true
    }
        

    const remove = (key) => {
        storage.removeItem(key)
        return true
    }

    retFuncs.lsGet = get
    retFuncs.lsSet = set
    retFuncs.lsRemove = remove

    return retFuncs
}

export default useLocalStorage