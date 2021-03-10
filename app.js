// products
const productTypes = ['polo','pantalon','zapato']

var products = [
    {
        id : 'product-1',
        type : 0,
        name : 'polo rojo',
        unitaryPrice : 15,
        offert : 15,
        idSeller : 'seller-1',
        description : 'this is red',
        sizing : [
            {
                size : 'small',
                quantity : 15,
            },
            {
                size : 'medium',
                quantity : 2
            },
            {
                size : 'large',
                quantity : 3
            }
        ]
    },
    {
        id: 'product-2',
        type: 0,
        name: 'polo naranja',
        unitaryPrice: 10,
        offert: 15,
        idSeller: 'seller-1',
        description: 'this is orange',
        sizing: [
            {
                size: 'small',
                quantity: 25,
            },
            {
                size: 'medium',
                quantity: 3
            },
            {
                size: 'large',
                quantity: 5
            }
        ]
    },
    {
        id: 'product-3',
        type: 1,
        name: 'jean 1',
        unitaryPrice: 45,
        offert: 15,
        idSeller: 'seller-1',
        description: 'this is a jean',
        sizing: [
            {
                size: '18',
                quantity: 25,
            },
            {
                size: '23',
                quantity: 3
            },
            {
                size: '28',
                quantity: 5
            }
        ]
    }
]

// user 
var user = [
    {
        id: 'id-user-1',
        fullname : 'erick grandez',
    }
]

// propduct in bucket
var bucket = [
    
]

class BucketRepo {

    find(id){

        if (id){
            let report = this.data.find(object => object.id === id)
            return report
        }else{
            let report = this.data.slice(0,15)
            return report
        }
        
    }

    update(object){
        if (!object) return
        let newData = this.data.map(data => {
            if (data.id === object.id){
                return object
            }else{
                return data
            }
        })
        this.data = newData
    }

    create(object){
        if(!object) return
        let report = this.data.find(data => data.id === object.id)
        if (report.length === 0){
            this.data.push(object)
        }else{
            return
        }
    }

    delete(id){
        if (!id) return
        let newArray = this.data.filter( data => data.id !== id )
        this.data = newArray
    }

    constructor(data){
        this.data = data
    }
}
const bucketRepo = new BucketRepo(bucket)

class ProductsRepo {

    find(id) {

        if (id) {
            let report = this.data.find(object => object.id === id)
            return report
        } else {
            let report = this.data.slice(0, 15)
            return report
        }

    }

    update(object) {
        if (!object) return
        let newData = this.data.map(data => {
            if (data.id === object.id) {
                return object
            } else {
                return data
            }
        })
        this.data = newData
    }

    create(object) {
        if (!object) return
        let report = this.data.find(data => data.id === object.id)
        if (report.length === 0) {
            this.data.push(object)
        } else {
            return
        }
    }

    delete(id) {
        if (!id) return
        let newArray = this.data.filter(data => data.id !== id)
        this.data = newArray
    }

    constructor(data) {
        this.data = data
    }
}

const productRepo = new ProductsRepo(products)

class BucketService {

    constructor() {

    }

    changeSize(){

    }

    addQuantity(){

    }

    subtractQuantity(){

    } 

    addProduct(){

    }

    removeProduct(){

    }
}

const bucketService = new BucketService()

class RepresenterProfileCard {
    
    constructor(){

    }

    listeners(){

    }

    getTemplate(){

        let div = document.createElement('div')

        let template = `
        hello
        
            <div id = "profile-card">

            </div>

            <div id = "product-showcase">

            </div>

            <div id = "product-suggestions">
            
            </div>
        
        `

        div.innerHTML = template

        return div
    }

    render(container){
        let component = this.getTemplate()
        container.append(component)
    }

    setData({product , user}){
        this.productData = product
        this.userData = user
    }

}

class RepresenterBucket{

    constructor(){

    }

    listeners(){

    }

    getTemplate(){

    }

    render(){

    }

    setData(){

    }
}

class PageProduct {
    
    constructor () {

    }

    listeners(){

    }

    render(){

    }

    render(){

    }

    getTemplate(){

    }

    setData(){

    }

}


function app() {
    let container = document.getElementById('root')
    let pageProduct = new RepresenterProfileCard()
    pageProduct.render(container)
}

app()