import { useState } from 'react';
import { alertService } from '../services/AlertService';


function Home () {
    const [options, setOptions] = useState({
        autoClose: false,
        flagRemove: false
    })

    function handleOptionChange(e) {
        //console.log(e);
        const { name, checked} = e.target;
        //console.log(name, checked);
       // console.log(options);
        setOptions(options => ({...options, [name]: checked}));
        //console.log(options);
    }

    return (
        <div className="container">
            <h1> Alerts </h1>
            <button className="btn btn-success m-1" onClick={() => alertService.alertSuccess('Success !!!', options)}> Success </button>
            <button className="btn btn-danger m-1" onClick={() => alertService.alertDanger('Danger !!!', options)}> Danger </button>
            <button className="btn btn-info m-1" onClick={() => alertService.alertInfo('Information !!!', options)}> Information </button>
            <button className="btn btn-warning m-1" onClick={() => alertService.alertWarning('Warning !!!', options)}> Warning </button>
            {/* <button className="btn btn-outline-dark m-1" onClick={() => alertService.alertOutlineDark('Dark Message !!!', options)}> Ouline Dark </button> */}
            <button className="btn btn-outline-dark m-1" onClick={() => alertService.clear()}> Clear </button>

            <div className="form-group">
                <div className="form-check">
                    <input 
                        type="checkbox"
                        className="form-check-input"
                        name="autoClose"
                        id="autoClose"
                        checked={options.autoClose}
                        onChange={handleOptionChange} />
                    
                    <label htmlFor="autoClose"> Auto Close </label>
                </div>
            </div>
        </div>
    )
}

export {Home};