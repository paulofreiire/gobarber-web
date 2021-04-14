import styled from 'styled-components'
import {darken} from "polished";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const ProviderList = styled.div`
  display: flex;
  max-width: 700px;

  ul {
    display: flex;
    flex-flow: row;
    margin-top: 60px;
    padding: 0 20px;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }

  strong {
    margin-top: 15px;
    font-size: 14px;
    font-weight: bold;
    color: #333;
    text-align: center;
  }

  footer {
    align-self: center;
    align-items: center;

    strong {
      color: #fff;
      font-size: 24px;
      margin: 0 15px;
    }
  }
`

export const ProviderBox = styled.div`


  display: flex;
  flex-flow: column;
  max-width: 200px;
  background: #fff;
  border-radius: 4px;
  padding: ${props => props.active ? "30px" : "35px"};
  align-items: center;
  margin: 0 10px;
  border: 5px solid ${props => props.active ? 'cornflowerblue' : 'none'};

`

export const HourList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 10px;
  max-width: 600px;
  margin-top: 20px;
`

export const Button = styled.button`
  margin: 5px 0 0;
  height: 44px;
  background: #00cc66;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  transition: background 0.2s;
  padding-left: 10px;

  &:hover {
    background: ${darken(0.03, '#00cc66')};
  }
`

export const Hour = styled.div`
  background: white;
  padding: ${props => props.active ? "20px" : "25px"};
  border-radius: 4px;
  opacity: ${props => (props.enabled ? 1 : 0.6)};
  align-items: center;
  margin: 0 10px 20px;
  border: 5px solid ${props => props.active ? 'cornflowerblue' : 'none'};

  p {
    font-size: 14px;
    font-weight: bold;
    color: #333;
  }
`