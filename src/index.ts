import { createUser, getAllUsers, createProduct, CATEGORYS, getAllProducts, getAllProductsById, queryProductsByName } from './types'
import { products, users } from './database'
// createUser("u003", "beltrano@email.com", "beltrano99", '123456', '')
// getAllUsers(users)
// createProduct('002', 'smartphone', 2999, 'Smartphone samsung galaxy 2', 'img', CATEGORYS.ELECTRONICS)
// getAllProducts(products)
// getAllProductsById(products, 'prod003')
queryProductsByName(products, '')