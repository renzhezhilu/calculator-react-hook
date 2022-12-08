import React, { useState, useEffect } from 'react';

function Calculator() {
    // let data = {
    //     formula: [],
    //     curron: `0`
    // }
    // const DataContext = React.createContext(data);

    // const [state, setstate] = useState(1)
    // useEffect(() => {
    //     return () => {
    //     }
    // }, [])


    const [formula, setFormula] = useState([])
    const [curron, setCurron] = useState(`0`)
    // useEffect(() => {
    //     return () => {
    //     }
    // }, [])
    let curronFn = {
        add(num) {
            if (formula[0] + '' && Number(formula[0]) === Number(curron)) {
                setCurron(``)
            }
            setCurron(old => `${old}${num}` - 0)
        },
        clear() {
            setCurron(`0`)
        }
    }
    let formulaFn = {
        add(num) {
            formula.push(curron)
            if (formula.length >= 3) {
                let jg
                let left = Number(formula[0])
                let right = Number(formula[2])
                switch (formula[1]) {
                    case '+':
                        jg = left + right
                        break;
                    case '-':
                        jg = left - right
                        break;
                    case '*':
                        jg = left * right
                        break;
                    case '/':
                        jg = left / right
                        break;
                    case '=':
                        jg = left / right
                        break;

                    default:
                        break;
                }
                setCurron(jg)
                setFormula([jg, num])
            } else {
                formula.push(num)
                setFormula(formula)
                let left = Number(formula[0])
                setCurron(left)

                // curronFn.clear()
            }
        },
        // addType(){
        //     setFormula(old => {
        //         old.push(num)
        //         return old
        //     })
        // },
        clear() {
            setFormula([])
            setCurron(`0`)
        }
    }
    return (
        <div className="Calculator">
            {/* <DataContext value={data}> */}
            <div className="Screen ">
                <div className="history flex_center3 ">
                    {formula.length && formula.map((m, index) => <span key={index}>{m}</span>)}

                </div>
                <div className="result flex_center3">
                    {curron}
                </div>
            </div>
            <div className="Command">
                <div className="button flex_center2 minSize" onClick={_ => formulaFn.clear()}>
                    <span>{formula.length ? `C` : `AC`}</span>
                </div>
                <div className="button flex_center2 minSize">
                    <span>+/-</span>
                </div>
                <div className="button flex_center2 minSize">
                    <span>%</span>
                </div>
                <div className="button flex_center2 notBorder em bigSize" onClick={_ => formulaFn.add('/')} >
                    <span>÷</span>
                </div>
                <div className="button flex_center2" onClick={_ => curronFn.add(7)}>
                    <span>7</span>
                </div>
                <div className="button flex_center2" onClick={_ => curronFn.add(8)} >
                    <span>8</span>
                </div>
                <div className="button flex_center2 " onClick={_ => curronFn.add(9)}>
                    <span>9</span>
                </div>
                <div className="button flex_center2 notBorder em bigSize" onClick={_ => formulaFn.add('*')}>
                    <span>×</span>
                </div>
                <div className="button flex_center2" onClick={_ => curronFn.add(4)}>
                    <span>4</span>
                </div>
                <div className="button flex_center2" onClick={_ => curronFn.add(5)}>
                    <span>5</span>
                </div>
                <div className="button flex_center2" onClick={_ => curronFn.add(6)}>
                    <span>6</span>
                </div>
                <div className="button flex_center2 notBorder em minSize" onClick={_ => formulaFn.add('-')}>
                    <span>—</span>
                </div>
                <div className="button flex_center2" onClick={_ => curronFn.add(1)}>
                    <span>1</span>
                </div>
                <div className="button flex_center2" onClick={_ => curronFn.add(2)}>
                    <span>2</span>
                </div>
                <div className="button flex_center2" onClick={_ => curronFn.add(3)}>
                    <span>3</span>
                </div>
                <div className="button flex_center2 notBorder em bigSize" onClick={_ => formulaFn.add('+')}>
                    <span>+</span>
                </div>
                <div className="button flex_center2 bigerBut" onClick={_ => curronFn.add(0)}>
                    <span className="flex_center2">
                        0
                </span>
                </div>
                <div className="button flex_center2 f_w_600" onClick={_ => curronFn.add('.')} >
                    <span>.</span>
                </div>
                <div className="button flex_center2 notBorder em bigSize" onClick={_ => formulaFn.add('=')}>
                    <span>=</span>
                </div>
            </div>

            {/* </DataContext> */}
        </div>
    );
}

export default Calculator

