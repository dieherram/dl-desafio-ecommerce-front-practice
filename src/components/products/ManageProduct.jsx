import { useProducts } from '../../contexts/ProductContext'
import PropTypes from 'prop-types'
import './ManageProduct.css' // Consider adding some CSS for styling
import { useAuth } from '../../contexts/AuthContext'

const ManageProduct = ({ onEditProduct }) => {
  const { products, deleteProduct } = useProducts()
  const { currentUser } = useAuth()
  
  ManageProduct.propTypes = {
    onEditProduct: PropTypes.func.isRequired
  }

  const userProducts = products.filter(product => product.id_usuario === currentUser.id)

  return (
    <div className='manage-product-container'>
      <h2 className='m-0 fs-3'>Lista de productos</h2>
      <div className='row'>
        {userProducts.map((product) => (
          <div key={product.id} className='col-lg-3 col-md-6 p-2 g-col-6 mb-3'>
            <div className='card h-100'>
              <div className='card-img-container'>
                <img src={product.img} alt={product.modelo} className='card-img-top' />
              </div>
              <div className='card-body d-flex flex-column justify-content-between'>
                <h5 className='card-title'>{product.marca} {product.modelo}</h5>
                <p className='card-text'>Precio: <span className='fw-semibold'>$ {product.precio.toLocaleString('es-ES')}</span></p>
                <p className='card-text'>Stock: <span className='fw-semibold'>{product.stock}</span></p>
                <p className='card-text'>Descripción: <span className='fw-semibold'>{product.descripcion}</span></p>
                <p className='card-text'>Categoria: <span className='fw-semibold'>{product.categoria}</span></p>
                <p className='card-text'>Favorito: <span className='fw-semibold'>{product.favorito ? 'Yes' : 'No'}</span></p>
                <div className='btn-group' role='group'>
                  <button
                    onClick={() => onEditProduct(product)}
                    className='btn btn-sm btn-primary'
                  >
                    <i className='bi bi-pen-fill me-1' />
                    Editar
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id, currentUser.token)}
                    className='btn btn-sm btn-danger'
                  >
                    <i className='bi bi-trash-fill me-1' />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManageProduct
