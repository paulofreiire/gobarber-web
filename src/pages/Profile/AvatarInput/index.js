import React, {useState, useRef, useEffect} from 'react'

import {Container} from './styles'
import api from "~/services/api";
import {useFormContext} from "react-hook-form";


export default function AvatarInput(props) {
    const ref = useRef();
    const {register, setValue} = useFormContext();

    const defaultValue = props.defaultValue

    const [preview, setPreview] = useState(defaultValue && defaultValue.url)

    async function onSubmit(e) {
        const data = new FormData();
        const image = e.target.files[0];
        data.append('file', image)
        const response = await api.post('files', data)

        const {id, url} = response.data

        register("avatar_id")
        setValue("avatar_id", id)
        setPreview(url)
    }

    return (
        <Container>
            <label htmlFor="avatar">
                <img src={preview || "https://avatars.dicebear.com/api/male/.svg"} alt="XD"/>
                <input
                    id="avatar"
                    name="avatar"
                    type="file"
                    ref={ref}
                    onChange={onSubmit}

                />

            </label>


        </Container>
    )
}