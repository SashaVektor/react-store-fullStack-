import bcrypt from 'bcryptjs'


const data = {
    users: [
        {
            name: 'Alex',
            email: 'admin@gmail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
        },
        {
            name: 'John',
            email: 'user@gmail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false,
        },
    ],
    products: [
        {
            name: "Nike Slim shirt",
            slug: "nike-slim-shirt",
            category: "Shirts",
            image: '/images/p1.jpg',
            price: 120,
            countInStock: 10,
            brand: "Nike",
            rating: 4.5, 
            numRevievs: 10,
            desc: "high quality shirt",
        },
        {
            name: "Adidas Fit Shirt",
            slug: "adidas-fit-shirt",
            category: "Shirts",
            image: '/images/p2.jpg',
            price: 140,
            countInStock: 20,
            brand: "Nike",
            rating: 4.0, 
            numRevievs: 10,
            desc: "high quality product",
        },
        {
            name: "Adidas Fit Pant",
            slug: "adidas-fit-pant",
            category: "Pants",
            image: '/images/p4.jpg',
            price: 65,
            countInStock: 0,
            brand: "Adidas",
            rating: 4.0, 
            numRevievs: 10,
            desc: "high quality product",
        },
        {
            name: "Nike Slim Pant",
            slug: "nike-slim-pant",
            category: "Pants",
            image: '/images/p3.jpg',
            price: 25,
            countInStock: 15,
            brand: "Nike",
            rating: 4.5, 
            numRevievs: 20,
            desc: "high quality pant",
        }
    ]
}

export default data