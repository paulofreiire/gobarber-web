import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker'
import {parseISO, isBefore} from 'date-fns';
import {AiFillSave} from "react-icons/all";

import {ProviderList, Hour, HourList, Button, ProviderBox, Container} from "./styles";

import api from "~/services/api";

import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';


import {toast} from "react-toastify";

export default function Provider(props) {
    const [providers, setProviders] = useState([]);
    const [providerId, setProviderId] = useState([]);
    const [date, setDate] = useState(new Date());
    const [hours, setHours] = useState([]);
    const [time, setTime] = useState([]);

    useEffect(() => {
        async function loadProviders() {
            const response = await api.get('providers');
            setProviders(response.data)
        }

        loadProviders();
    }, [])

    useEffect(() => {
        async function loadAvailable() {
            const response = await api.get(`providers/${providerId}/available`, {
                params: {
                    date: date.getTime()
                }
            })

            setHours(response.data)
        }

        loadAvailable()
    }, [providerId, date])

    function handleProvider(id) {
        setProviderId(id)
    }

    function handleSelectHour(time) {
        if(isBefore(parseISO(time), new Date())) {
            toast.error("Não é possível agendar datas anteriores")
            return
        }
        setTime(time)

    }

    async function handleSubmit() {
        try {
            const response = await api.post('appointments', {
                provider_id: providerId,
                date: time
            })

            toast.success('Agendamento marcado com sucesso!')
            console.log(response.data)
            props.setVisible(!props.visible)
            props.setAppointments([response.data, ...props.appointments])

        } catch (e) {
            toast.error('Erro ao criar agendamento!')
        }


    }

    return <Container>
        <DatePicker
            selected={date}
            onChange={date => setDate(date)}
            dateFormat={"d 'de' MMMM 'de' yyyy"}
        />
        <ProviderList>
            <ul>
                {providers.map((provider) => {
                    return <ProviderBox key={provider.id} onClick={() => handleProvider(provider.id)}
                                        active={provider.id === providerId}>
                        <img
                            src={provider.avatar ? provider.avatar.url : "https://avatars.dicebear.com/api/male/.svg"}
                            alt="provider"/>
                        <strong>{provider.name}</strong>
                    </ProviderBox>
                })}
            </ul>
        </ProviderList>

        <HourList>
            {hours.map((hour) => {
                return <Hour onClick={() => handleSelectHour(hour.value)} key={hour.time} enabled={hour.available}
                             active={hour.value === time}>
                    <p>{hour.time}</p>
                </Hour>
            })}
        </HourList>
        <footer>
            <Button type="button" onClick={handleSubmit}>
                <AiFillSave size={24}/>
                <strong>SALVAR</strong>
            </Button>
        </footer>
    </Container>

}