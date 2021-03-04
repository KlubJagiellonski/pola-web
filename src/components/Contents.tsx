import React from 'react'
import { Wrapper, LeftColumn, RightColumn, Column } from './Contents.css'
import DevelopmentSection from './DevelopmentSection'
import SocialMedia from './SocialMedia'
import Articles from './Articles'
import Rectangle12 from './../assets/Rectangle12.png'
import Friends from './Friends'
import Teams from './Teams'
import Download from './Download'

const Contents = () => {
  return (
    <Wrapper>
      <Column>
        <LeftColumn>
          <Articles />
        </LeftColumn>
      </Column>
      <Column >
        <RightColumn>
          <DevelopmentSection />
          <SocialMedia />
          <img src={Rectangle12} width={'100%'} height={410} style={{ marginTop: 15 }} />
        </RightColumn>
      </Column>
      <Friends />
      <Column>
        <LeftColumn>
          <Teams
            title="Dołącz do Przyjaciół Poli i odnieś sukces!"
            text="Jedno zdanie, że sekcja jest kierowana do firm"
            buttonText="POZNAJ SZCZEGÓŁY"
          />
        </LeftColumn>
      </Column>
      <Column>
        <RightColumn>
          <Teams
            title="Zespół"
            text="1-2 zdania: ogólnie kto tworzy Polę (jaka grupa ludzi np. studenci, członkowie Klubu itp.)"
            buttonText="DOŁĄCZ DO ZESPOŁU"
          />
        </RightColumn>
      </Column>
      <Download/>
    </Wrapper >
  )

}

export default Contents;