import http from "../../http-common";

class ClientDataService {

    getAll() {

        return http.get("/client", {
            params: {
              page: 1,
              size: 500,
            }
          })
    }

    getById(id) {
        return http.get('/client/'+id)
    }

    create(data) {
        return http.post('/client', data)
    }

    delete(id) {
        return http.delete('/client/'+id)
    }

    edit(id, data) {
        return http.put('/client/'+id, data)
    }

    select() {
        return http.get('/client/select')
    }

}

export default new ClientDataService()