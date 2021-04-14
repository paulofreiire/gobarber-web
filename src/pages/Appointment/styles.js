import styled from 'styled-components'
import {darken} from "polished";

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-self: center;
    align-items: center;


    strong {
      color: #fff;
      font-size: 24px;
      margin: 0 15px;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding: 20px;
    grid-gap: 15px;
    margin-top: 30px;
  }
`;

export const Button = styled.button`
  margin: 5px 0 0;
  height: 44px;
  background: ${props => props.color};
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  transition: background 0.2s;
  padding-left: 10px;

  &:hover {
    background: ${props => darken(0.03, props.color)};
  }

`

export const TomatoButton = styled(Button)`
  background: #ff3300;

  &:hover {
    background: ${darken(0.03, '#ff3300')};
  }
`