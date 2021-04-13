import React, {useState, useMemo, useEffect} from "react";
import {format, addDays, subDays, setHours, setMinutes, setSeconds, isBefore, isEqual, parseISO} from 'date-fns'
import {utcToZonedTime} from 'date-fns-tz'
import {MdChevronLeft, MdChevronRight} from "react-icons/all";
import pt from 'date-fns/locale/pt';

import {Container, Time} from './styles';
import api from "~/services/api";

const range = [
    8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
];

export default function Dashboard() {
    const [schedule, setSchedule] = useState([]);
    const [date, setDate] = useState(new Date());

    const dateFormatted = useMemo(
        () => format(date, "d 'de' MMMM", {locale: pt}), [date]
    );

    useEffect(() => {
        async function loadSchedule() {
            const response = await api.get('schedule', {
                params: {date}
            });

            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            const data = range.map(hour => {
                const checkDate = setSeconds(setMinutes(setHours(date, hour), 0), 0)
                const compareDate = utcToZonedTime(checkDate, timezone)

                return {
                    time: `${hour}:00h`,
                    past: isBefore(compareDate, new Date()),
                    appointment: response.data.find(a =>
                        isEqual(parseISO(a.date), compareDate)
                    )
                }
            })

            setSchedule(data);

        }
    }, [])

    function handlePrevDay() {
        setDate(subDays(date, 1))
    }

    function handleNextDay() {
        setDate(addDays(date, 1))
    }

    return <Container>
        <header>
            <button type="button" onClick={handlePrevDay}>
                <MdChevronLeft size={36} color="#FFF"/>
            </button>
            <strong>{dateFormatted}</strong>
            <button type="button" onClick={handleNextDay}>
                <MdChevronRight size={36} color="#FFF"/>
            </button>
        </header>

        <ul>
            <Time past>
                <strong>08:00</strong>
                <span>Paulo Freire</span>
            </Time>
            <Time available>
                <strong>09:00</strong>
                <span>Em aberto</span>
            </Time>
            <Time available>
                <strong>10:00</strong>
                <span>Em aberto</span>
            </Time>
            <Time>
                <strong>11:00</strong>
                <span>Paulo Freire</span>
            </Time>
        </ul>
    </Container>

}

