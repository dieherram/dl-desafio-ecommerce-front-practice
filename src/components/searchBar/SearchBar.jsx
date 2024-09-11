import './SearchBar.css'
import { useContext, useState } from 'react'
import { ProductContext } from '../../contexts/ProductContext'

const SearchBar = () => {
  const { products, handleSeeSelectedCar } = useContext(ProductContext)
  const [busqueda, setBusqueda] = useState('')
  const [sugerencias, setSugerencias] = useState([])

  const handleChange = (e) => {
    const value = e.target.value
    setBusqueda(value)
    if (value) {
      const filtered = products.filter((product) =>
        product.make.toLowerCase().includes(value.toLowerCase()) ||
        product.model.toLowerCase().includes(value.toLowerCase()) ||
        product.year.toString().includes(value) ||
        product.color.toLowerCase().includes(value.toLowerCase()) ||
        product.mileage.toString().includes(value) ||
        product.price.toString().includes(value) ||
        product.fuelType.toLowerCase().includes(value.toLowerCase()) ||
        product.transmission.toLowerCase().includes(value.toLowerCase())
      )
      setSugerencias(filtered)
    } else {
      setSugerencias([])
    }
  }

  const handleSelection = (event, id) => {
    handleSeeSelectedCar(event, id)
    setBusqueda('')
    setSugerencias([])
  }

  return (
    <div className='w-75 position-relative'>
      <div className='d-flex align-items-center rounded-pill bg-secondary'>
        <input
          type='text'
          placeholder='Busca aquí el auto perfecto para ti'
          value={busqueda}
          onChange={handleChange}
          className='form-control rounded-start rounded-start-pill'
        />
        <svg className='rounded-end-pill mx-3 bi bi-search' xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' viewBox='0 0 16 16'>
          <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0' />
        </svg>
      </div>
      {sugerencias.length > 0 && (
        <ul className='sugerencias-list list-group list-group-flush position-absolute'>
          {sugerencias.map((sugerencia) => (
            <li className='list-group-item p-2 d-flex justify-content-evenly' key={sugerencia.id} onClick={() => handleSelection(event, sugerencia.id)}>
              <div className='d-flex align-items-center'>
                <img className='li-image' src={sugerencia.image} alt={sugerencia.model} />
              </div>
              <div className='d-flex align-items-center ms-3'>
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item active p-1'><span className='fw-bold'> Make:</span> {sugerencia.make}</li>
                  <li className='list-group-item p-1'><span className='fw-bold'> Model:</span> {sugerencia.model}</li>
                  <li className='list-group-item p-1'><span className='fw-bold'> Year:</span> {sugerencia.year}</li>
                  <li className='list-group-item p-1'><span className='fw-bold'> Transmission:</span> {sugerencia.transmission}</li>
                  <li className='list-group-item p-1'><span className='fw-bold'> Price:</span> {sugerencia.price}</li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBar
