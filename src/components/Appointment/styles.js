import styled from 'styled-components'

export const Content = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 20px;
  margin-top: 30px;
`

export const Time = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 20px;
  border-radius: 4px;
  background: white;
  align-items: center;

  opacity: ${props => props.past ? 0.6 : 1};
  
  strong {
    display: block;
    color: ${props => props.available ? '#999' : '#7159c1'};
    font-size: 20px;
    font-weight: normal;
  }

  span {
    display: block;
    margin-top: 3px;
    color: ${props => props.available ? '#999' : '#666'};
  }
`