import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { alertService, alertType } from '../services/AlertService';

const propTypes = {
    id: PropTypes.string,
    fade: PropTypes.bool
};

const defaultProps = {
    id: 'default-alert',
    fade: true
};

function Alert({id, fade}) {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const subscription = alertService.onAlert(id)
            .subscribe(alert => {
                //console.log(alert);
                if(alert.message) {
                    setAlerts(alerts => ([...alerts, alert]));

                    if (alert.autoClose) {
                        setTimeout(() => removeAlert(alert), 3000);
                    }

                } else {
                    setAlerts( alerts => {
                        const filteredAlerts = alerts.filter(x => x.flagRemove);

                        filteredAlerts.forEach(x => delete x.flagRemove);
                        return filteredAlerts;
                    })
                }
            });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    function removeAlert(alert) {
        if(fade) {
            const alertWithFade = {...alert, fade: true};
            setAlerts(alerts => alerts.map(x => x === alert ? alertWithFade : x ));

            setTimeout(() => {
                setAlerts(alerts => alerts.filter(x => x !== alertWithFade));    
            }, 250)
        } else {
            setAlerts(alerts => alerts.filter(x => x !== alert));
        }
    }

    function cssAlertClass(alert) {
       // console.log(alert);

        if(!alert) return;

        const classes = ['alert', 'alert-dismissible']; 

        const alertTypeClass = {
            [alertType.success] : 'alert alert-success',
            [alertType.danger] : 'alert alert-danger',
            [alertType.warning] : 'alert alert-warning',
            [alertType.info] : 'alert alert-info',
            [alertType.outline] : 'alert alert-dark',
        };

     //   console.log(alertTypeClass);

        classes.push(alertTypeClass[alert.type]);

        return classes.join(' ');
    }

    if(!alerts.length) return null;

    return (
        <div className="container">
            <div>
                {alerts.map((alert, index) => 
                    <div key={index} className={cssAlertClass(alert)}> 
                        {/* <a className='close' onClick={() => removeAlert(alert)}>&times;</a> */}
                        <span> {alert.message} </span>
                        <button 
                            type="button" 
                            className="btn-close" 
                            data-bs-dismiss="alert" 
                            aria-label="Close"
                            onClick={() => removeAlert(alert)}
                            >
                            
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

Alert.defaultProps = defaultProps;
Alert.propTypes = propTypes;

export {Alert}