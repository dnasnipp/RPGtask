import React, {useRef, useState} from 'react';
import './App.scss';

import TextInput from './components/form/TextInput/TextInput';
import LabeledInput from "./components/form/LabeledInput/LabeledInput";
import FormSection from "./components/form/FormSection/FormSection";
import ClickInput from "./components/form/ClickInput/ClickInput";
import Btn from "./components/form/Btn/Btn";

function App() {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [power, setPower] = useState(0);

    return (
        <div className="app">
            <div className="app__constructor">
                <canvas className="app__character" ref={canvasRef}></canvas>
                <div className="app__info">
                    <FormSection>
                        <LabeledInput title={"Имя"}>
                            <TextInput placeholder={"John"}></TextInput>
                        </LabeledInput>
                    </FormSection>
                    <FormSection>
                        <LabeledInput title={"Сила"} titleCenter={true}>
                            <ClickInput></ClickInput>
                        </LabeledInput>
                    </FormSection>
                    <FormSection>
                        <LabeledInput title={"Ловкость"} titleCenter={true}>
                            <ClickInput></ClickInput>
                        </LabeledInput>
                    </FormSection>
                    <FormSection>
                        <LabeledInput title={"Интеллект"} titleCenter={true}>
                            <ClickInput value={power} onChangeValue={setPower}></ClickInput>
                        </LabeledInput>
                    </FormSection>
                    <FormSection>
                        <LabeledInput title={"Харизма"} titleCenter={true}>
                            <ClickInput></ClickInput>
                        </LabeledInput>
                    </FormSection>
                    <FormSection>
                        <Btn>Импорт</Btn>
                        <Btn>Экспорт</Btn>
                    </FormSection>
                </div>
            </div>
        </div>
    );
}

export default App;
