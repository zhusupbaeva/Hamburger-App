import Up from './images_1/up.png'
import Down from './images_1/down.png'




export const Cart = ( {setActive} ) => {

    const template = /(order)/
    const localStorageItems = Object.keys(localStorage).filter((key) => {
        return key.match(template)
    })

    const orders = localStorageItems.map((order) => {
        return JSON.parse(localStorage[order])
    })


    function countUnits(array, text) {
        let count = 0

        for (let i = 0; i < array.length; i++) {
            if (array[i].text === text) {
                count++
            }
        }

        return <span>{ count }</span>
    }

    function countTotal() {
        let total = 0

        for (let i = 0; i < orders.length; i++) {
            total += orders[i].total
        }

        return <span>{ total }</span>
    }

    function deleteFromCart(id) {
        localStorage.removeItem(`order${id}`)
        window.location.reload()
    }

    const items = orders.map(({id, total, units}) => {
        return ( 
        <div key = { id } className="cart__item">
            <div className="cart__image">
            <img src={ Up } alt="up" />
                    {
                        units.map((unit, index) => {
                            return <img key={ index } src={ unit.img } alt={ unit.text } />
                        })
                    }
            <img src= { Down } alt="down" />
            </div>
            <ul className="cart__list">
                <li>
                    Cheese -
                    { countUnits(units, 'Сheese')}
                </li>
                <li>
                    Meat -
                    {  countUnits(units, 'Meat')}
                </li>
                <li>
                    Salad -
                    {  countUnits(units, 'Salad')}
                </li>
                <li>
                    Tomato -
                    {  countUnits(units, 'Tomato')}
                </li>
            </ul>
            <p className='cart__price'> { total } som</p>
            <button className='cart__delete'>
                <span className="material-icons" onClick={() => {}}>delete</span>
            </button>
        </div>
    )
    })

    

    return(
        <section className="cart">
            <div className="container">
                <div className="cart__block">
                    <h2>
                        Cart
                        <button onClick={() => { setActive(false)}}>
                            <span className="material-icons">close</span>
                        </button>
                    </h2>
                    {
                        orders.length === 0 ?
                        <h2>You have no orders</h2> :
                        <div className="cart__orders">
                            {items}
                        </div>
                    }
                    <p>Total: { countTotal() }  som</p>
                </div>
            </div>
        </section>
    )
}


// JSON.stringify - переводит объект в JSON.object (строковый объект)
// JSON.parse JSON.object переводит в объект 

// const Component = () => {
//    props.setActive()
//}

// const Component = (props) => {
//    const { setActive, ... } = props
//}

// const Component = ({ setActive }) => {
//    setActive()
// }

// [{id: 1}, {id:2} , {id: 3}]
//array.map(({id}) => {
//   return id
//})