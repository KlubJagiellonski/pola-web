import React, { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql, useStaticQuery } from 'gatsby';
import { margin } from '@Styles/theme';
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';


const Wrapper = styled.section`
  margin-top: ${margin.normal};
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  text-align: center;
  min-width: 610px;  @media (max-width: 767px) {
    padding: 16px 12px;
    min-width: auto;
    max-width: 100%;
  }`;

const ContentRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
  }
`;

const ImageContainer = styled.div`
  flex-shrink: 0;
  width: 100%;
  max-width: 160px;
  display: flex;
  justify-content: center;
  align-self: center;
  @media (min-width: 768px) {
    align-self: flex-start;
  }
`;

const Name = styled.h3`
  margin: 0px 0 4px;
  font-size: 1rem;
  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Role = styled.p`
  margin: 4px 0 6px;
  font-size: 0.8rem;
  color: #e30613;
  @media (min-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Contact = styled.p`
  margin: 4px 0 0px;
  font-size: 0.8rem;
`;

const Tel = styled.p`
  margin: 0;
  font-size: 0.7rem;
`;

const CopyButton = styled.button`
  background: none;
  border: none;
  color: #e30613;
  cursor: pointer;
  font-size: 0.8rem;
  margin-left: 4px;
  padding: 0;
`;

const Bio = styled.p<{ expanded?: boolean }>`
  margin: 0;
  font-size: 0.9rem;
  color: #444444;
  cursor: pointer;
  transition: max-height 0.3s ease;
  ${props => !props.expanded && `
    max-height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  `}
`;

const ReadMore = styled.span`
  font-size: 0.8rem;
  color: #e30613;
  cursor: pointer;
  margin-top: 2px;
`;

const team = [
  { name: 'Mateusz Perowicz', role: 'Project Manager - wszystkiego dogląda, organizuje pracę poszczególnych zespołów. Do niedawna samodzielnie wykonywał wszystkie zadania w projekcie.', contact: 'mateusz.perowicz@klubjagiellonski.pl', tel: 'Tel: 660 010 034', bio: 'Koordynator aplikacji „Pola. Zabierz ją na zakupy" i warszawskiego oddziału Klubu Jagiellońskiego. Ekspert Centrum Analiz Klubu Jagiellońskiego ds. patriotyzmu gospodarczego. Mąż Anny, ojciec Filipa i Dawida.', image: 'mateusz-perowicz' },
  { name: 'Dominik Krzemiński', role: 'Backend developer - nadzoruje środowiskiem produkcyjnym (pola-app) i stagingowym (pola-staging). <a href="https://github.com/KlubJagiellonski/pola-backend" target="_blank" rel="noopener noreferrer" style={{ color: "#85036b", textDecoration: "none" }}>Backend</a> projektu Pola rozwijany jest w Pythonie i JavaScript.', contact: 'dominik.krzeminski@klubjagiellonski.pl', tel: '', bio: 'Absolwent zastosowań fizyki na Uniwersytecie Warszawskim, którą następnie wykorzystywał do badań mózgu i procesów decyzyjnych. Doświadczenie akademickie zdobywał na Uniwersytecie Cambridge, a następnie rozwijał karierę w dużych firmach technologicznych, pracując nad projektami na styku analizy danych i AI. Interesuje się działalnością i edukacją społeczną, a szczególnie tym, jak technologie mogą wspierać pozytywny rozwój wspólnot lokalnych.', image: 'dominik-krzeminski' },
  { name: 'Anna Siłaczuk', role: 'Media Manager - utrzymuje kontakt ze społecznością Poli. Przygotowuje i redaguje nasz <a href="https://www.pola-app.pl/" target="_blank" rel="noopener noreferrer" style={{ color: "#85036b", textDecoration: "none" }}>newsletter</a>. Tworzy treści na nasze komunikatory.', contact: 'anna.silaczuk@klubjagiellonski.pl', tel: '', bio: 'Absolwentka Uniwersytetu Ekonomicznego w Poznaniu, gdzie ukończyła kierunki Zarządzanie oraz Międzynarodowe Stosunki Gospodarcze. Zawodowo specjalizuje się we wsparciu projektów finansowanych ze środków krajowych oraz unijnych. Przez 11 lat działała w Związku Harcerstwa Rzeczypospolitej, w czasie studiów w Niezależnym Zrzeszeniu Studentów.', image: 'anna-silaczuk' },
  { name: 'Adam Bajerski', role: 'Redaktor - zarządza bazą danych i serwisem <a href="https://www.pola-app.pl/" target="_blank" rel="noopener noreferrer" style={{ color: "#85036b", textDecoration: "none" }}>pola-app.pl</a>. Weryfikuje firmy i produkty oraz odpowiada na wasze zgłoszenia.', contact: 'adam.bajerski@klubjagiellonski.pl', tel: '', bio: 'Absolwent Wydziału Administracji i Nauk Społecznych Politechniki Warszawskiej, a także student Stosunków międzynarodowych i Filozofii na Uniwersytecie Warszawskim. Uczestnik letnich praktyk legislacyjnych Klubu Jagiellońskiego "Prawo dla dobra wspólnego" w 2025 roku.', image: 'adam-bajerski' },
  { name: 'Marcin Kawko', role: 'Relacje z Biznesem - opiekun relacji z naszymi <a href="https://www.pola-app.pl/friends/" target="_blank" rel="noopener noreferrer" style={{ color: "#85036b", textDecoration: "none" }}>partnerami</a>. Odpowiada za <a href="https://www.pola-app.pl/business/" target="_blank" rel="noopener noreferrer" style={{ color: "#85036b", textDecoration: "none" }}>ofertę biznesową</a> projektu.', contact: 'marcin.kawko@klubjagiellonski.pl', tel: '', bio: ' Ekspert CAKJ ds. patriotyzmu rozwojowego i krótkich łańcuchów dostaw, koordynator Centrum Analiz Problemów Społecznych Caritas Polska (promotor KNS), ekonomista społeczno-ekologiczny Caritas Laudato si i Caritas Europa, doktorant SGH – w pracy badawczej skupia się na instytucjonalnej wymianie darów między pracodawcami a rodzinami pracowników. Prywatnie tancerz ludowy i miłośnik folkloru oraz turystyki kulturowej (zwłaszcza południa Włoch).', image: 'marcin-kawko' },
];

const TeamCarousel: React.FC = () => {
  const [expandedBios, setExpandedBios] = useState<{ [key: string]: boolean }>({});

  const toggleBio = (name: string) => {
    setExpandedBios(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Skopiowano do schowka!');
    } catch (err) {
      console.error('Błąd kopiowania: ', err);
    }
  };

  const { allFile } = useStaticQuery(graphql`
  query {
    allFile(filter: {sourceInstanceName: {eq: "asset-images"}, relativeDirectory: {eq: "team"}, extension: {in: ["png", "jpg"]}}) {
      nodes {
        name
        childImageSharp {
          gatsbyImageData(width: 160, height: 160, layout: CONSTRAINED)
        }
      }
    }
  }
`);

  console.log('Loaded images:', allFile.nodes);

  // Utwórz mapę obrazów po nazwie pliku (bez rozszerzenia)
 
  const images = allFile.nodes.reduce((acc, node) => {
    acc[node.name] = node.childImageSharp.gatsbyImageData;
    return acc;
  }, {});

  console.log('Images map:', images);

  return (
    <Wrapper>
      <Swiper
        modules={[EffectCoverflow, Autoplay, Pagination]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 60,
          depth: 150,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 'auto',
            spaceBetween: 30,
          },
        }}
        style={{ paddingBottom: '40px', 
          '--swiper-pagination-color': '#e30613',                 
          '--swiper-pagination-bullet-inactive-color': '#cccccc', 
          '--swiper-pagination-bullet-inactive-opacity': '1', } as React.CSSProperties}
      >
        {team.map((member) => (
          <SwiperSlide key={member.name} style={{ width: '100%', maxWidth: 450 }}>
            <Card>
              <ContentRow>
                <ImageContainer>
                  <GatsbyImage image={images[member.image]} alt={`${member.name}, ${member.role}`} />
                </ImageContainer>
                <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '160px' }}>
                    <Name>{member.name}</Name>
                    <Role dangerouslySetInnerHTML={{ __html: member.role }} />
                  <Contact>
                    <a href={`mailto:${member.contact}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {member.contact}
                    </a>
                    <CopyButton onClick={() => copyToClipboard(member.contact)}>📩</CopyButton>
                  </Contact>
                  {member.tel && (
                    <Tel>
                      <a href={`tel:${member.tel.replace('Tel: ', '').replace(/\s/g, '')}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {member.tel}
                      </a>
                      <CopyButton onClick={() => copyToClipboard(member.tel.replace('Tel: ', ''))}>📞</CopyButton>
                    </Tel>
                  )}
                </div>
              </ContentRow>
              <div>
                <Bio expanded={expandedBios[member.name]} onClick={() => toggleBio(member.name)}>
                  {member.bio}
                </Bio>
                {!expandedBios[member.name] && (
                  <ReadMore onClick={() => toggleBio(member.name)}>Czytaj dalej...</ReadMore>
                )}
              </div>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
};

export default TeamCarousel;