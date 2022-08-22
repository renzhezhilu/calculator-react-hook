import React, { useState, useEffect } from 'react';

import Screen from './Screen'
import Command from './Command'
function Calculator() {
    // const [state, setstate] = useState(1)
    // useEffect(() => {
    //     return () => {
    //     }
    // }, [])
    return (
        <div className="Calculator">
            <Screen />
            <Command />
        </div>
    );
}

export default Calculator

