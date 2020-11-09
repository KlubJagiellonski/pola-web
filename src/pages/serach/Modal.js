import React, { useState, useEffect } from 'react'
import SearchModal from './SearchModal';
import axios from 'axios'
import { getCurrentDeviceId } from "../../deviceId";
import { Background, Content, Wrapper } from "./Modal.css";
import { SearchButton, SearchFormControl } from "./Search.css"
import { ImSearch } from 'react-icons/im'
import { Redirect } from "react-router-dom";
import { FaDivide } from 'react-icons/fa';

const ModalPage = ({ match, open }) => {
  const [data, setData] = useState('');
  const [isRedirect, setRedirect] = useState(false)

  const closeModal = () => {
    setRedirect(true)
  }

  useEffect(() => {
    async function api() {
      if (match.params.ean.length > 0) {
        try {
          const resp = await axios.get('https://pola-staging.herokuapp.com/a/v3/get_by_code',
            {
              params: {
                code: match.params.ean,
                device_id: getCurrentDeviceId()
              }
            })
          setData(resp.data)
        } catch (err) {
          console.log(err)
        }
      }
    }
    api()
  }, []);

  return (
    <>
      { isRedirect ?
        <Redirect to='/' /> :
        <>
          <Background>
            <Wrapper onClick={closeModal} />
            <Content open={open}>
              <SearchModal
                data={data}
                close={closeModal}
              />
            </Content>
          </Background>

        </>
      }
    </>
  )
}

export default ModalPage;