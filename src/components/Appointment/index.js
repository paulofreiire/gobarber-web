import React, {useMemo} from 'react'
import {Content, Time} from "./styles";
import pt from 'date-fns/locale/pt'
import {parseISO, formatRelative} from 'date-fns'
import {MdCancel} from 'react-icons/all'


export default function Appointment({item, onCancel}) {
    const dataParsed = useMemo(
        () => {
            return formatRelative(parseISO(item.date), new Date(), {
                locale: pt,
                addSuffix: true
            })
        }, [item.date]
    )

    return (
        <Time key={item.time} past={item.past}>
            <Content>
                <span>{item.provider.name}</span>
                <strong>{dataParsed}</strong>
            </Content>
            {item.cancelable && !item.canceled_at && <button onClick={onCancel}>
                <MdCancel size={20} color="#f64c75"/>
            </button>}
        </Time>
    )
}