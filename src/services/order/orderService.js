import http from "../../http-common";

class OrderDataService {

    getAll() {

        return http.get("/order", {
            params: {
              page: 1,
              size: 500,
            }
          })
    }

    getById(id) {
        return http.get('/order/'+id)
    }

    create(data) {
        return http.post('/order', data)
    }

    delete(id) {
        return http.delete('/order/'+id)
    }

    edit(id, data) {
        return http.put('/order/'+id, data)
    }

}

export default new OrderDataService()