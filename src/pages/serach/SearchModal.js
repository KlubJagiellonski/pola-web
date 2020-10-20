import React from 'react'

const SearchModal = ({ data }) => {
  return (
    <div>
      <div>
        {data.name}
      </div>
      {data.name !== "Nieprawidłowy kod" &&
        <>
          <div>
            {data.plScore} pkt
      </div>
          <div>
            udział polskiego kapitału {data.plCapital} %
      </div>
          <div>
            <input type='checkbox' disabled checked={data.plWorkers === 100 ? true : false} />
          produkuje w Polsce
      </div>
          <div>
            <input type='checkbox' disabled checked={data.plRnD === 100 ? true : false} />
          prowadzi badania i rozwój w Polsce
      </div>
          <div>
            <input type='checkbox' disabled checked={data.plRegistered === 100 ? true : false} />
          zajerestrowana w Polsce
      </div>
          <div>
            <input type='checkbox' disabled checked={data.plNotGlobEnt === 100 ? true : false} />
          nie jest częścią zagranicznego koncernu
      </div>
          {data.is_friend &&
            <div>
              To jest przyjaciel Poli
        </div>
          }
          <div>
            {data.description}
          </div>
        </>
      }
    </div>
  )
}

export default SearchModal