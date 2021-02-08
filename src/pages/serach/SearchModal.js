import React from 'react'
import axios from 'axios'
import { Wrapper, BigSection, SmallSection, Section, Content, ButtonSection, RedButton, ReportText } from './SearchModal.css'
import ModalTitle from './../../components/ModalTitle'
import ModalProgressiveBar from './../../components/ModalProgressiveBar'
import ModalCheckbox from './../../components/ModalCheckbox'
import { getCurrentDeviceId } from "../../deviceId";

const BASE_URL = process.env.NODE_ENV !== 'production' ? "" : "https://www.pola-app.pl"
const GET_BY_CODE_ENDPOINT = `${BASE_URL}/a/v3/create_report`

const SearchModal = ({ data, close }) => {

  const sendReport = async () => {
    try {
      const resp = await axios.request(
        {
          method: "POST",
          url: GET_BY_CODE_ENDPOINT,
          params: {
            device_id: "TEST-DEVICE-ID",
          },
          data: {
            description: "test-description",
            product_id: data.product_id,
            files_count: 0,
            file_ext: 'jpg',
            mime_type: 'image/jpeg',
          }
        })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Wrapper>
      <Content>
        <ModalTitle
          title={data.name}
          close={close}
        />
        {data.name !== "Nieprawidłowy kod" &&
          <>
            <BigSection>
              <ModalProgressiveBar
                now={data.plScore}
                suffix={'pkt'}
                size='big'
              />
            </BigSection>
            <SmallSection>
              <Section>
                <p style={{ margin: '0 0 8px 0' }}>udział polskiego kapitału</p>
                <ModalProgressiveBar
                  now={data.plCapital}
                  suffix={'%'}
                  size='small'
                />
              </Section>
              <div style={{ marginTop: 20 }}>
                <Section>
                  <ModalCheckbox
                    dataTestId="pl-workers"
                    value={data.plWorkers}
                    title="produkuje w Polsce"
                  />
                </Section>
                <Section>
                  <ModalCheckbox
                    dataTestId="pl-rnd"
                    value={data.plRnD}
                    title="prowadzi badania i rozwój w Polsce"
                  />
                </Section>
                <Section>
                  <ModalCheckbox
                    dataTestId="pl-registered"
                    value={data.plRegistered}
                    title="zajerestrowana w Polsce"
                  />
                </Section>
                <Section>
                  <ModalCheckbox
                    dataTestId="pl-not-glob-ent"
                    value={data.plNotGlobEnt}
                    title="nie jest częścią zagranicznego koncernu"
                  />
                </Section>
              </div>
              {/* {data.is_friend && (
                            <Section>
                                To jest przyjaciel Poli
                            </Section>
                        )} */}
              <Section>
                {data.description}
              </Section>
            </SmallSection>
            <ButtonSection>
              <hr />
              <Section>
                <ReportText>
                  Zgłoś jeśli posiadasz bardziej aktualne dane na temat tego produktu
                </ReportText>
                <RedButton><button onClick={sendReport}>zgłoś</button></RedButton>
              </Section>
            </ButtonSection>
          </>
        }
      </Content>
    </Wrapper>
  )
}

export default SearchModal