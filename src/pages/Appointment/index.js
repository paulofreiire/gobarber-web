import React, {useEffect, useState} from "react";
import {AiFillSave, AiOutlinePlus} from "react-icons/all";

import {Button, Container, TomatoButton} from './styles';
import Appointment from "~/components/Appointment";
import api from "~/services/api";
import Provider from "~/components/Provider";
import Swal from "sweetalert2";


export default function Dashboard() {
    const [appointments, setAppointments] = useState([])
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        async function loadAppoinments() {
            const response = await api.get('appointments')
            setAppointments(response.data)
        }

        loadAppoinments()
    }, [])

    function handleToggleVisible() {
        setVisible(!visible)
    }

    async function handleCancel(id) {
        Swal.fire({
            title: 'Você tem certeza?',
            text: "Você não poderá desfazer essa ação",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sim, cancelar agendamento!',
            cancelButtonText: 'Desistir!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await api.delete(`appointments/${id}`)

                    setAppointments(
                        appointments.filter(appointment => appointment.id !== id)
                    )
                    Swal.fire(
                        'Cancelado!',
                        'Angendamento cancelado com sucesso.',
                        'success'
                    )
                } catch (e) {

                }
            }
        })
    }

    return <Container>
        <header>
            <Button color={visible ? "#f64c75" : "#00cc66"} type="button" onClick={handleToggleVisible}>
                {!visible && <AiOutlinePlus size={24}/>}
                <strong>{visible ? "Fechar" : "Novo Agendamento"}</strong>
            </Button>
        </header>

        {visible && <Provider
            appointments={appointments} setAppointments={setAppointments}
            visible={visible} setVisible={setVisible}/>}

        <ul>
            {!visible && appointments.map(item => (
                <Appointment
                    appointments={appointments} setAppointments={setAppointments}
                    key={item.date} item={item} onCancel={() => handleCancel(item.id)}/>
            ))}
        </ul>
    </Container>

}

