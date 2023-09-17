import axios from 'axios';

//Creating my token
const token = 'VICTOKEN'
// Token bearer for authentication
const bearer = 'e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd'


export default class service {
    static endpoint = "https://api-notes-one.vercel.app/api/posts";
    //Get all the tasks
    // Método para obtener todas las tareas
    static async getTasks() {
        try {
            const response = await axios.get(this.endpoint);
            // Manejar la respuesta aquí, por ejemplo:
            console.log(response.data); // Muestra los datos de la respuesta en la consola
            return response.data; // Devuelve los datos de la respuesta
        } catch (error) {
            // Manejar errores aquí
            console.error('Error al obtener las tareas:', error);
            throw error; // Opcionalmente, puedes lanzar el error para que se maneje en otro lugar
        }
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

    static async postTask(post) {
        try {
            const params = new URLSearchParams()
            // Enviar 'post' en el cuerpo de la solicitud POST
            for (let property in post) {
                var encodedKey = encodeURIComponent(property);
                if (post[property] != null) {
                    params.append(encodedKey, post[property]);
                }
            }
    
            const response = await axios.post(
                `${service.endpoint}`,
                post,
                {
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                }
            );
    
            // Manejar la respuesta aquí
            console.log('Respuesta del servidor:', response.data);
    
            return response.data; // Devuelve los datos de la respuesta
        } catch (error) {
            // Manejar errores aquí
            console.error('Error al realizar la solicitud POST:', error);
            throw error; // Opcionalmente, puedes lanzar el error para que se maneje en otro lugar
        }
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