import { Subject } from "rxjs";
import { filter } from 'rxjs/operators';

const alertSubject = new Subject();
const defaultId = 'default-alert';

export const alertType = {
    success: 'Success',
    danger: 'Danger',
    info: 'Info',
    warning: 'Warning',
    outline: 'Outline'
}

function onAlert(id = defaultId ) {
    return alertSubject.asObservable().pipe(filter(x => x && x.id === id));
}

function alertSuccess(message, options) {
   // console.log(message, options);
    const newAlert = {
        ...options,
        type: alertType.success,
        message
    };
    alert(newAlert)
}

function alertDanger(message, options) {
    // console.log(message, options);
     const newAlert = {
         ...options,
         type: alertType.danger,
         message
     };
     alert(newAlert)
 }

 function alertInfo(message, options) {
    // console.log(message, options);
     const newAlert = {
         ...options,
         type: alertType.info,
         message
     };
     alert(newAlert)
 }

 function alertWarning(message, options) {
    // console.log(message, options);
     const newAlert = {
         ...options,
         type: alertType.warning,
         message
     };
     alert(newAlert)
 }

 function alertOutlineDark(message, options) {
    // console.log(message, options);
     const newAlert = {
         ...options,
         type: alertType.outline,
         message
     };
     alert(newAlert)
 }

function alert(alert) {
    //console.log(alert);
    alert.id = alert.id || defaultId; 
    alertSubject.next(alert);
}

function clear(id = defaultId) {
    alertSubject.next({ id });
}

export const alertService = {
    onAlert,
    clear,
    alertSuccess,
    alertInfo,
    alertDanger,
    alertOutlineDark,
    alertWarning,
};