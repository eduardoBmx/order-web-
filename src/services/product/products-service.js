import http from "../../http-common";

class ProductDataService {

    getAll(page) {

        return http.get("/product", {
            params: {
              page: page,
              size: 15,
            }
          })
    }

    getById(id) {
        return http.get('/product/'+id)
    }

    create(data) {
        return http.post('/product', data)
    }

    delete(id) {
        return http.delete('/product/'+id)
    }

    edit(id, data) {
        return http.put('/product/'+id, data)
    }
    select(){
        return http.get('/product/select')
    }

}

export default new ProductDataService()