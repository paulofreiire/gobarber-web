import React from 'react';
import {Link} from "react-router-dom";

import {Container, Content, Profile} from './styles';

import Notifications from "~/components/Notifications";
import logo from '~/assets/logo-purple.svg'
import {useSelector} from "react-redux";

export default function Header(props) {
    const profile = useSelector((state => state.user.profile))

    return (
        <Container>
            <Content>
                <nav>
                    <img src={logo} alt="GoBarber" />
                    <Link to="/dashboard">DASHBOARD</Link>
                </nav>

                <aside>
                    <Notifications />

                    <Profile>
                        <div>
                            <strong>Paulo Freire</strong>
                            <Link to="/profile">Meu perfil</Link>
                        </div>
                        <img
                        src={profile.avatar.url || "https://avatars.dicebear.com/api/male/.svg"}
                        alt="KEKW"
                        />
                    </Profile>
                </aside>
            </Content>
        </Container>
    );
}

