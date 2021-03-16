import React from "react"
import { Wraper, Row, LogoImage, Text, Title, SocialRows, SocialImage } from "./Footer.css"
import Logo from "./../assets/logo.png"
import SocialFooter from "./../assets/SocialFooter.png"

const Footer = () => {
    return (
        <Wraper>
            <div>
                <LogoImage src={Logo}/>
            </div>
            <Row>
                <Title>Informacje</Title>
                <Text>Home</Text>
                <Text>Aktualności</Text>
                <Text>O Poli</Text>
            </Row>
            <Row>
                <Title>Działaj z nami</Title>
                <Text>Wesprzyj aplikację</Text>
                <Text>Klub przyjaciół Poli</Text>
                <Text>Dołącz do zespołu</Text>
            </Row>
            <Row>
                <Title>Jakieś pytania?</Title>
                <Text>Kontakt</Text>
                <Text>FAQ</Text>
                <Text>Uzupełnij dane o firmie</Text>
            </Row>
            <Row>
                <Title>Social media Title</Title>
                <SocialRows>
                    <SocialImage src={SocialFooter}></SocialImage>
                    <SocialImage src={SocialFooter}></SocialImage>
                    <SocialImage src={SocialFooter}></SocialImage>
                    <SocialImage src={SocialFooter}></SocialImage>
                </SocialRows>
            </Row>
        </Wraper>
    )
}

export default Footer;