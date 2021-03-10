// products
const productTypes = ['polo','pantalon','zapato']

function getTypeMeassurement(type){
    switch(type){
        case 0: return TSHIRT_MEASSUREMENT
        case 1: return PANTS_MEASSUREMENT
    }
}

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
    
    getProducts(){
        return bucketRepo.find()
    }

    changeSize(){

    }

    addQuantity(){

    }

    subtractQuantity(){

    } 

    addProduct(product){

    }

    removeProduct(){

    }
}

const bucketService = new BucketService()


// STATES

var productShowcaseState = {
    idProduct : '',
    quantity : 0,
    meassurement: {
        size: ''
    },
    shipping : {

    }
}

var bucketState = {
    products : []
}

const PRODUCT_CONTEXT = 'PRODUCT_CONTEXT'
const BUCKET_CONTEXT = 'BUCKET_CONTEXT'

const contextState = (context) => {
    switch (context){
        case PRODUCT_CONTEXT :
            return {
                showcaseData: productShowcaseState,
            }
        case BUCKET_CONTEXT:
            return {
                bucket : bucketState
            }
    }
}


class ShippingMethodItem {

    constructor(){
        this.currentComponent=null
    }

    listeners(){
        let btnElect = this.currentComponent.querySelector('.btn-shipping-method-item')
        let context = contextState(PRODUCT_CONTEXT).showcaseData
        btnElect.addEventListener('click',()=>{
            context.shipping = {...this.data}
        })
    }

    getTemplate(){
        let div = document.createElement('div')
        div.classList.add('shipping-method-item')
        const {type,price} = this.data
        let template = `
            <button class = "btn-shipping-method-item">${type}</button>
            <span>${price}</span>
        `
        div.innerHTML = template
        this.currentComponent=div
        return div
    }

    render(container){
        let component = this.getTemplate()
        container.append(component)
        this.listeners()
    }

    setData(data){
        this.data = data
    }

}
class ShippigMethodsContainer {

    constructor(){

    }

    listeners(){

    }

    getTemplate(){
        let div = document.createElement('div')
        let template = `
            <div id = "shipping-methods-container" >
            
            </div>
        `
        div.innerHTML = template
        return div
    }

    render(container){
        let component = this.getTemplate()
        container.append(component)
        this.listeners()
        const shippingMethodsContainer = document.getElementById('shipping-methods-container')
        const { methods } = this.data
        methods.forEach(data => {
            let component = new ShippingMethodItem()
            component.setData(data)
            component.render(shippingMethodsContainer)
        })
    }

    setData(data){
        this.data = data
    }
}

class ProductSuggentionItem {

    constructor() {
        this.currentComponent = null
        this.observers=[]
    }

    attach(observer) {
        this.observers.push(observer)
    }

    detach(observer) {
        let newObservers = this.observers.filter(o => o === observer)
        this.observers = newObservers
    }

    notify() {
        let contextShowcase = contextState(PRODUCT_CONTEXT).showcaseData
        this.observers.forEach(observer => {
            observer.update(this)
        })
        let init = {
            quantity: 0,
            meassurement: {
                size: ''
            }
        }
        contextShowcase = init
        console.log('reset',contextShowcase);
    }

    listeners() {

        let btnWatch = this.currentComponent.querySelector('.btn-watch-product-suggestion-item')
        btnWatch.addEventListener('click', (e) => {
            this.notify()
        })

        let btnRemove = this.currentComponent.querySelector('.btn-remove-product-suggestion-item')
        btnRemove.addEventListener('click', (e) => {
            this.currentComponent.remove()
            e.preventDefault()
        })

    }

    render(container) {
        let component = this.getTemplate()
        container.prepend(component)
        this.listeners()
    }

    getTemplate() {
        let div = document.createElement('div')
        div.classList.add('product-suggestion-item')
        const { id } = this.data
        let template = `
            ${id}
            <button class = "btn-watch-product-suggestion-item">watch</button>
            <button class = "btn-remove-product-suggestion-item" >remove</button>
        `
        div.innerHTML = template
        this.currentComponent = div
        return div
    }

    setData(data) {
        this.data = data
    }
}

class ProductSuggestionsContainer {

    constructor() {

    }

    listeners() {

    }

    getTemplate() {
        let div = document.createElement('div')
        let template = `
            <h3>suggestions</h3>
            <div id = "suggestion-container"></div>
        `
        div.innerHTML = template
        return div
    }

    render(container) {
        let component = this.getTemplate()
        container.append(component)
        this.listeners()
        const suggestionContainer = document.getElementById('suggestion-container')
        let productSuggested = [...this.data]
        productSuggested.forEach(data => {
            let component = new ProductSuggentionItem()
            component.setData(data)
            component.render(suggestionContainer)
            component.attach(productShowcase)
        })
    }

    setData(data) {
        this.data = data
    }
}
class ProfileCard {

    constructor() {

    }

    listeners() {

    }

    render(container) {
        let component = this.getTemplate()
        container.append(component)
        this.listeners()
    }

    getTemplate() {
        let div = document.createElement('div')
        let template = `
            profile card
            
        `
        div.innerHTML = template
        return div
    }

    setData(data) {
        this.data = data
    }
}

class BuketItem {
    
    constructor(){
        this.currentComponent=null
    }

    render(container){
        let component = this.getTemplate()
        container.prepend(component)
        this.listeners()
    }

    listeners(){
        const btnRemove = this.currentComponent.querySelector('.btn-remove-bucket-item')
        btnRemove.addEventListener('click',(e)=>{
            this.currentComponent.remove()
            e.preventDefault()
        })
    }

    getTemplate(){

        let div = document.createElement('div')
        div.classList.add('bucket-item')
        
        const {id} = this.data
        
        let template = `
            ${id}
            <button class = "btn-remove-bucket-item">remove</button>
        `
        div.innerHTML = template
        this.currentComponent=div
        return div
    }

    setData(data){
        this.data = data
    }

}
class RepresenterBucket {

    constructor() {

    }

    listeners() {

    }

    getTemplate() {
        let div = document.createElement('div')
        let template = `
            <h3>My bucket</h3>
            <div id = "products-in-bucket">
                
            </div>
        `
        div.innerHTML = template
        return div
    }

    render(container) {
        let component = this.getTemplate()
        container.append(component)
        this.listeners()
        const productsInBucket_ = document.getElementById('products-in-bucket')
        let productsInBucket = [...this.data]
        productsInBucket.forEach(data => {
            let component = new BuketItem()
            component.setData(data)
            component.render(productsInBucket_)
        })
    }

    setData(data) {
        this.data = data
    }
}


class PANTSMeasurement {

    constructor() {

    }

    listeners() {

        const m18 = document.getElementById('pants-m-18')
        const m25 = document.getElementById('pants-m-25')
        const m29 = document.getElementById('pants-m-29')

        const test = document.getElementById('test-tshirt-meassurement')

        let context = contextState(PRODUCT_CONTEXT).showcaseData

        m18.addEventListener('click', () => {
            test.innerHTML = '18'
            context.meassurement = {size : '18'}

        })

        m25.addEventListener('click', () => {
            test.innerHTML = '25'
            context.meassurement = { size: '25' }

        })

        m29.addEventListener('click', () => {
            test.innerHTML = '29'
            context.meassurement = { size: '29' }

        })

    }

    getTemplate() {
        let div = document.createElement('div')
        div.classList.add('t-shirt-measurament-component')
        let template = `
            <div>
                <button id = "pants-m-18" >18</button>
                <button id = "pants-m-25" >25</button>
                <button id = "pants-m-29" >29</button>
            </div>
            <div id = "test-tshirt-meassurement"></div>
        `
        div.innerHTML = template
        return div
    }

    render(container) {
        let component = this.getTemplate()
        container.innerHTML = ''
        container.append(component)
        this.listeners()
    }

    setData() {

    }

}

class TshirtMeasurement {
    
    constructor(){
    
    }

    listeners(){

        const small = document.getElementById('tshirt-s-small')
        const medium = document.getElementById('tshirt-s-medium')
        const large = document.getElementById('tshirt-s-large')

        const test = document.getElementById('test-tshirt-meassurement')

        let context = contextState(PRODUCT_CONTEXT).showcaseData

        small.addEventListener('click',()=>{
            test.innerHTML = 'small'
            context.meassurement = {size : 'small'}
        })

        medium.addEventListener('click',()=>{
            test.innerHTML = 'medium'
            context.meassurement = { size: 'medium' }
        })

        large.addEventListener('click',()=>{
            test.innerHTML = 'large'
            context.meassurement = { size: 'large' }
        })

    }

    getTemplate(){
        let div = document.createElement('div')
        div.classList.add('t-shirt-measurament-component')
        let template = `
            <div>
                <button id = "tshirt-s-small" >small</button>
                <button id = "tshirt-s-medium" >medium</button>
                <button id = "tshirt-s-large" >large</button>
            </div>
            <div id = "test-tshirt-meassurement"></div>
        `
        div.innerHTML = template
        return div
    }

    render(container){
        let component = this.getTemplate()
        container.append(component)
        this.listeners()
    }

    setData(){

    }

}

const TSHIRT_MEASSUREMENT = 'TSHIRT_MEASSUREMENT'
const PANTS_MEASSUREMENT = 'PANTS_MEASSUREMENT'

const FactoryMeasurementComponent = (type) => {
    switch(type){
        case TSHIRT_MEASSUREMENT :
            return new TshirtMeasurement()

        case PANTS_MEASSUREMENT :
            return new PANTSMeasurement()
    }
}
class ProductShowcase {

    constructor(FactoryMeasurementComponent) {
        this.FactoryMeasurementComponent = FactoryMeasurementComponent;
        this.currentComponent=null
        this.containerForRender=null
    }

    update(object){
        let report = productRepo.find(object.data.id)
        this.setData(report)
        this.render(this.containerForRender)
        this.listeners()
    }

    listeners() {

        const quantityProduct = document.getElementById('quantity-product')
        
        let context = contextState(PRODUCT_CONTEXT).showcaseData
        let contextBucket = contextState(BUCKET_CONTEXT).bucket
        
        const btnSum = document.getElementById('sum-quantity-product')
        btnSum.addEventListener('click',()=>{
            context.quantity++
            quantityProduct.innerText = context.quantity.toString()
        })
        const btnSubstract = document.getElementById('subtract-quantity-product')
        btnSubstract.addEventListener('click',()=>{
            if (context.quantity === 0) return
            context.quantity--
            quantityProduct.innerText = context.quantity.toString()
        })

        const btnAdd = document.getElementById('btn-add-product-showcase')
        btnAdd.addEventListener('click',()=>{
            contextBucket.products.push({...context})
            console.log(contextBucket);
        })
    }

    render(container) {
        this.containerForRender = container
        let component = this.getTemplate()

        const {type,shipping} = this.data
        let TypeMeassurement = getTypeMeassurement(type)

        container.innerHTML = ''
        container.append(component)
        this.listeners()
        const meassurementProductContainer = document.getElementById('meassurement-product-container')

        let meassurement
        switch(TypeMeassurement){
            case TSHIRT_MEASSUREMENT:
                meassurement = this.FactoryMeasurementComponent(TSHIRT_MEASSUREMENT)
                break
            case PANTS_MEASSUREMENT:
                meassurement = this.FactoryMeasurementComponent(PANTS_MEASSUREMENT)
        }
        meassurement.render(meassurementProductContainer)

        const shippingMethods_ = document.getElementById('shipping-methods')
        let shippementComponent = new ShippigMethodsContainer()
        shippementComponent.setData(shipping)
        shippementComponent.render(shippingMethods_)
    }

    getTemplate() {
        let div = document.createElement('div')
        const {name,description} = this.data
        let template = `

            <h3>${name}</h3>
            <p>${description}</p>

            <div id = "meassurement-product-container">
            
            </div>

            <div id = "shipping-methods"></div>

            <button id = "sum-quantity-product">+</button>
            <span id = "quantity-product" ></span>
            <button id = "subtract-quantity-product">-</button>
            <button id = "btn-add-product-showcase">add</button>

        `
        div.innerHTML = template
        this.currentComponent = div
        return div
    }

    setData(data) {
        this.data = data
    }

}

const representerBucket = new RepresenterBucket()
const productShowcase = new ProductShowcase(FactoryMeasurementComponent)
const productSuggestionContnainer = new ProductSuggestionsContainer()
const profileCard = new ProfileCard()


class ProductPage {
    
    constructor(){

    }

    listeners(){

    }

    getTemplate(){

        let div = document.createElement('div')
        let template = `

            <div id = "profile-card">

            </div>

            <div id = "bucket" >
                
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

        // update the state of my bucket
        let context = contextState(BUCKET_CONTEXT).bucket
        context.products = bucketRepo.find()
        console.log(context);

        let component = this.getTemplate()
        container.append(component)

        const profileCard_ = document.getElementById('profile-card')
        const productShowCase_ = document.getElementById('product-showcase')
        const productSuggestionsContainer_ = document.getElementById('product-suggestions')
        const bucket_ = document.getElementById('bucket')

        representerBucket.setData(bucketService.getProducts())
        productShowcase.setData(productRepo.find('product-1'))
        productSuggestionContnainer.setData(productRepo.find())

        representerBucket.render(bucket_)
        productShowcase.render(productShowCase_)
        productSuggestionContnainer.render(productSuggestionsContainer_)
        profileCard.render(profileCard_)
    }

    setData({product , user}){
        this.productData = product
        this.userData = user
    }

}

function app() {
    const container = document.getElementById('root')
    let pageProduct = new ProductPage()
    pageProduct.render(container)
}

app()