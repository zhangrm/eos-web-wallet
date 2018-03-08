//@flow
import {
    BACKUP_EOS_ACCOUNT,
    DISCONNECT_EOS_ACCOUNT,
    SET_EOS_ACCOUNT_NAME,
    SET_EOS_ACTIVE_KEYS,
    SET_EOS_OWNER_KEYS
} from "./account-actions";
import type { AccountState } from "./types";
import type { Action } from "../action-types";
import {saveAs} from "file-saver";
import CryptoJS from "crypto-js";
import AES from "crypto-js/aes";

export const initialState: AccountState = {
  accountName: null,
  ownerKeys: {},
  activeKeys: {}
};

export default (
  state: AccountState = initialState,
  action: Action
): AccountState => {
  switch (action.type) {
    case SET_EOS_ACCOUNT_NAME:
      return {
        ...state,
        accountName: action.accountName
      };
    case SET_EOS_ACTIVE_KEYS:
      return {
        ...state,
        activeKeys: { ...action.keys }
      };
    case SET_EOS_OWNER_KEYS:
      return {
        ...state,
        ownerKeys: { ...action.keys }
      };
    case DISCONNECT_EOS_ACCOUNT:
      return initialState;
    case BACKUP_EOS_ACCOUNT:
        const account = {
            accountName:state.accountName,
            ownerKey:state.ownerKeys.privateKey,
            activeKey:state.activeKeys.privateKey
        };
        let content = JSON.stringify(account);

        try {
            console.info("待加密："+content);
            const encrypted = AES.encrypt(content,"sic").toString();
            content = encrypted;
            console.info("加密后："+encrypted);
            let decrypted = AES.decrypt(encrypted, "sic")
            var str = CryptoJS.enc.Utf8.stringify(decrypted);
            console.info("解密后："+str);
        }catch (exception){
            console.error(exception);
        }
        //var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
        var blob = new Blob([content], {type: "application/octet-stream; charset=us-ascii"});
        saveAs(blob, "sic.bin");
      return state;
    default:
      return state;
  }
};
