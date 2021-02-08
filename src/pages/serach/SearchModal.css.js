import styled from "styled-components"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  overflow-y: auto;
  max-height: 80vh;
`

export const Content = styled.div`
  overflow-x: hidden;
`

export const BigSection = styled.div`
  padding: 0 30px;

  @media only screen and (max-width: 500px) {
    padding: 0;
  }
`

export const SmallSection = styled.div`
  padding: 0 45px;
  width: 100%;

  @media only screen and (max-width: 500px) {
    padding: 0 10px;
  }
`

export const Section = styled.div`
  margin-top: 10px;
`

export const ButtonSection = styled.div`
  margin-top: 40px;
  width: 100%;

  hr{
    border-top: 1px solid #aaa;
  }
`

export const ReportText = styled.p`
  width: 100%;
  text-align: center;
`

export const RedButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  button{
    width: 60%;
    padding: 5px 0;
    border: 2px solid red;
    background-color: white;
    text-transform: uppercase;
    color: red;
    font-weight: bold;
    cursor: pointer;

    @media only screen and (max-width: 700px) {
      width: 85%;
    }

    @media only screen and (max-width: 500px) {
      width: 100%;
    }
  }
`