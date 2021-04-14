import React, {useState} from "react";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import {Container} from './styles'

export default function Schedule({date, onChange}) {
    const [opened, setOpened] = useState(false);

    return <Container>
        <DatePicker
            selected={date}
            onChange={date => onChange(date)}
            dateFormat={"d 'de' MMMM 'de' yyyy"}
        />
    </Container>
}
