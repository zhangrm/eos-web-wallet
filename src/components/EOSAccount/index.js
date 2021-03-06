import EOSAccount from "./EOSAccount";
import { connect } from "react-redux";
import withEOSAccount from "../../containers/eos-account";
import { removeEOSAccount,backupEOSAccount } from "../../thunks/eos-account";
import { setNotification } from "../../redux-modules/notifications/notifications-actions";

const mapDispatchToProps = dispatch => ({
  onDisconnect: () => {
    dispatch(removeEOSAccount());
  },
  onCopy: keyname =>
    dispatch(setNotification(`${keyname} has been copied to your clipboard`)),
  onBackup:()=>{
    dispatch(backupEOSAccount());
  }
});

const ConnectedEOSAccount = connect(undefined, mapDispatchToProps)(EOSAccount);

export default withEOSAccount(ConnectedEOSAccount);
