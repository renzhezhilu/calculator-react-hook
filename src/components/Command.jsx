import React, { useState, useEffect } from 'react';

function Command() {
    // const [state, setstate] = useState(1)
    // useEffect(() => {
    //     return () => {
    //     }
    // }, [])
    return (
        <div className="Command">
            <div className="button flex_center2 minSize">
                <span>AC</span>
            </div>
            <div className="button flex_center2 minSize">
                <span>+/-</span>
            </div>
            <div className="button flex_center2 minSize">
                <span>%</span>
            </div>
            <div className="button flex_center2 notBorder em bigSize">
                <span>÷</span>
            </div>
            <div className="button flex_center2">
                <span>7</span>
            </div>
            <div className="button flex_center2">
                <span>8</span>
            </div>
            <div className="button flex_center2">
                <span>9</span>
            </div>
            <div className="button flex_center2 notBorder em bigSize">
                <span>×</span>
            </div>
            <div className="button flex_center2">
                <span>4</span>
            </div>
            <div className="button flex_center2">
                <span>5</span>
            </div>
            <div className="button flex_center2">
                <span>6</span>
            </div>
            <div className="button flex_center2 notBorder em minSize">
                <span>—</span>
            </div>
            <div className="button flex_center2">
                <span>1</span>
            </div>
            <div className="button flex_center2">
                <span>2</span>
            </div>
            <div className="button flex_center2">
                <span>3</span>
            </div>
            <div className="button flex_center2 notBorder em bigSize">
                <span>+</span>
            </div>
            <div className="button flex_center2 bigerBut">
                <span className="flex_center2">
                    0
                </span>
            </div>
            <div className="button flex_center2 f_w_600">
                <span>.</span>
            </div>
            <div className="button flex_center2 notBorder em bigSize">
                <span>=</span>
            </div>
        </div>
    );
}

export default Command

