import React, { useState, useEffect } from 'react'
import SearchModal from './SearchModal';
import axios from 'axios'

const Search = () => {
  const [ean, setEan] = useState("")
  const [data, setData] = useState({})
  const [isOpen, setOpen] = useState(false)
  const [deviceId, setDeviceId] = useState('')

  const randomDeviceId = () => {
    let deviceId = 'WEB-';
    let asciiNumber;
    for (let i = 0; i < 32; i++) {
      asciiNumber = Math.floor(Math.random() * 35);
      if (asciiNumber >= 0 && asciiNumber <= 9) {
        deviceId = deviceId + String.fromCharCode(asciiNumber + 48)
      }
      else {
        deviceId = deviceId + String.fromCharCode(asciiNumber + 87)
      }
    }
    return deviceId
  }

  useEffect(() => {
    if (localStorage.getItem('DEVICE_ID') == null) {
      const id = randomDeviceId();
      localStorage.setItem('DEVICE_ID', id);
      setDeviceId(id)
      
    }    
  }, []);

  const openModal = () => setOpen({ isOpen: true });
  // const closeModal = () => setOpen({ isOpen: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ean.length > 0) {
      axios.get('/get_by_code',
        {
          params: {
            code: ean,
            device_id: deviceId
          }
        }
      )
        .then(resp => {
          openModal();
          setData(resp.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Kod EAN:
        <input
            type="text"
            value={ean}
            onChange={e => setEan(e.target.value)}
        />
      </label>

      <button type="submit">Sprawdź</button>
      {
        isOpen &&
        <SearchModal
          data={data}
        />
      }
    </form>
  )
}

export default Search;