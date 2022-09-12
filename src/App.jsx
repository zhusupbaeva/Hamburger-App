// Компонент - строительный блок,кот. исп-ся для разделения масштабного кода,
//далее компонент должен быть подключен в index.js,чтобы быть отоброженным в html

// JSX - это HTML вместе с js

// Функциональный компонент - функция,кот.возвращает html

// Классовый компонент - это компонент созданный на основе классов

// class --> className

import './App.css'
import Up from './images_1/up.png'
import Down from './images_1/down.png'
import Cheese from './images_1/cheese.png'
import Tomato from './images_1/tomato.png'
import Meat from './images_1/meat.png'
import Salad from './images_1/salad.png'
import { useState, useEffect } from 'react'
import { Cart } from './Cart'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// function App() {

// }

// let state = [state, function]
// state[0], state[1]
// Деструктуризация массива 
// let [element1, element2] = state 
// const [state(состояние), setState(обновить состояние) ] = useState(начальноеСостояние)


//Событие клика 
// аттрибут onClick = {function}
// onClick = {() => function(arguments)}


const App = () => {
    const [hamburger, setHamburger] = useState([])
    const [price, setPrice] = useState(20)
    const [cart, setCart] = useState([])
    const [active, setActive] = useState(false)

    const template = /(order)/
    const localStorageItems = Object.keys(localStorage).filter((key) => {
        return key.match(template)
    })

    useEffect(() => {
        const orders = localStorageItems.map((order) => {
            return JSON.parse(localStorage[order])
        })

        if (orders) {
            setCart(orders)
        }
    }, [])

    function addUnit(unit) {
        setHamburger([...hamburger, { id: hamburger.length , ...unit }])
        setPrice((prevState) => {
            return prevState + unit.price
        })
    }


    function removeUnit(id, price) {
        setHamburger(hamburger.filter((unit) => {
            return unit.id !== id 
        }))
        setPrice((prevState) => {
            return prevState - price
        })
    }

    
    function addToCart(item){
        setCart([...cart, {id: cart.length, total: price, units:[...item]}])
        localStorage.setItem(`order${cart.length}`, JSON.stringify({ id: cart.length, total: price, units:[...item] }))
        setHamburger([])
        setPrice(20)  

        toast.success("Burger has been added to cart!", {
            position: "top-right",
            autoClose: 5000,
        }) 
    }

    
 
    
    let hamburgerButtons = [
        {  text: 'Cheese', img: Cheese, price: 15}, 
        {  text: 'Tomato', img: Tomato, price: 10}, 
        {  text: 'Salad', img: Salad, price: 10}, 
        {  text: 'Meat', img: Meat, price: 40}
    ]
    return (
        <section className='app'>
            <div className="container">
            <div className='app__price'>
                <h2>Price: {price} som </h2>
            </div>
            <div className='app__block'>
                <div className='app__hamburger'>
                    <img src={ Up } alt="up" />
                    {
                        hamburger.map((unit, index) => {
                            return <img key={ index } onClick={ () => removeUnit(unit.id, unit.price) } src={ unit.img } alt={ unit.text } />
                        })
                    }
                    <img src= { Down } alt="down" />
                </div>
                <div className='app__buttons'>
                    <h2>Add</h2>
                    {
                        hamburgerButtons.map((button, index) => {
                            return <button key={ index } onClick={ () => addUnit(button) }>{ button.text }</button>
                        })
                    }
                    <div className="app__cart">
                        <button onClick={() => addToCart(hamburger) }>Add to cart</button>
                        
                        <button onClick={() => setActive(!active)}>
                            <span className="material-icons">shopping_cart</span>
                        </button>
                    </div>
                </div>
            </div>
            </div>
            <ToastContainer />
            {
                active ? <Cart setActive={setActive} /> : null
            }
            
        </section>
    )
}

export default App
//* Это тернарный оператор */
// export default App 

// array.map((element, index, array) => {}) - 


// Что такое React hook?

//React hook - позволяют нам расширить возможности функциональных компонентов, а также убирать некоторые проблемы кот. возникают из-за из их специфики 

// Для чего нужен useState()?
//useState() - этот  хук связан с состоянием компонента.Он помогает нам задавать состояния и методы минимальным кол-вом кода 

// Как вы понимаете написание [state, setState]?
//state - это обьект состояния,кот.доступен только конкретному компоненту  и кот.мы можем контролировать 
//setState()- это метод,кот.планирует изменение (state ) компонента 

// Как вы понимаете термин "состояние"?
// состояние - это положение в кот. что-то находится,в данном случае объект 

// Куда записывается начальное состояние?
// Начальное состояние записывается в конструкторе,this.state

// Напишите состояние hamburgers, где начальное значение будет массив, и через setHamburgers добавьте в массив объект
// { id: Number, img: Image, price: Number }

// class Clock extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {[date: new Date()]};
//     }
// }

// array.map(() => {
//   return <HTMLElement key= {}></HTMLElement>
//})

// localStorage.setItem(name: String, value) 
// useEffect (()=> {}, [])
// [пустой массив] ---> сработает только один раз, когда открывается приложение 
// [states, server calls] ---> будет работать каждый раз,когда переданные зн-я в массиве обновляются