import { useCart } from "../context/CartContext";



const ShoppingCart = () => {

    const { cart, clearCart, removeFromCart } = useCart();
    return (
        <div className="container">
            <div>
                <h1>Shopping Cart</h1>
                <ul>
                    {cart.map(product => (
                        <li key={product.id}>
                            {product.name} - {product.price}
                            <button onClick={() => removeFromCart(product.id)} className='btn btn-danger'>Remove</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <button onClick={clearCart} className='btn btn-danger'>Clear Cart</button>

            </div>
        </div>
    );
}
export default ShoppingCart;