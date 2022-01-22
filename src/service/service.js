import axios from 'axios';
//Creating my token
const token = 'VICTOKEN'
//Token bearer for authentication
const bearer = 'e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd'


export default class service {
    static endpoint = "https://ecsdevapi.nextline.mx/vdev/tasks-challenge/tasks";
    //Get all the tasks
    static getTasks() {
        const params = new URLSearchParams()
        params.append('token', token)
        return axios.get(
            service.endpoint,
            {
                params,
                headers: {
                    'Authorization': `Bearer ${bearer}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
    }
    //Ge task by ID
    static getTask(id) {
        const params = new URLSearchParams()
        params.append('token', token)
        return axios.get(
            `${service.endpoint}/${id}`,
            {
                params,
                headers: {
                    'Authorization': `Bearer ${bearer}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
    }
    //Post a new task
    static postTask(post) {
        const params = new URLSearchParams()
        params.append('token', token)
        for (let property in post) {
            var encodedKey = encodeURIComponent(property);
            if (post[property] != null) {
                params.append(encodedKey, post[property]);
            }
        }

        return axios.post(
            service.endpoint,
            params,
            {
                headers: {
                    'Authorization': `Bearer ${bearer}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        )

    }
    //Update task by ID
    static updateTask(post) {
        const params = new URLSearchParams()
        params.append('token', token)

        for (let property in post) {
            var encodedKey = encodeURIComponent(property);
            if (post[property] != null) {
                params.append(encodedKey, post[property]);
            }
        }

        return axios.put(
            `${service.endpoint}/${post.id}`,
            params,
            {
                headers: {
                    'Authorization': `Bearer ${bearer}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
    }
    //Delete task by ID
    static deleteTask(id) {
        const params = new URLSearchParams()
        params.append('token', token)

        return axios.delete(
            `${service.endpoint}/${id}`,
            {
                params,
                headers: {
                    'Authorization': `Bearer ${bearer}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
    }

}