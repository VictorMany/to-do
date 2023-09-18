import axios from 'axios';

export default class service {
    static endpoint = "https://api-notes-one.vercel.app/api/";
    //Get all the tasks
    // Método para obtener todas las tareas
    static async getTasks() {
        try {
            const response = await axios.get(
                `${service.endpoint}posts`);
            // Manejar la respuesta aquí, por ejemplo:
            return response.data; // Devuelve los datos de la respuesta
        } catch (error) {
            // Manejar errores aquí
            console.error('Error al obtener las tareas:', error);
            throw error; // Opcionalmente, puedes lanzar el error para que se maneje en otro lugar
        }
    }

    static async getTasksByName(name) {
        try {
            const response = await axios.get(
                `${service.endpoint}search-post?name=${name}`,
                {
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                });
            // Manejar la respuesta aquí, por ejemplo:
            return response.data; // Devuelve los datos de la respuesta
        } catch (error) {
            // Manejar errores aquí
            console.error('Error al obtener las tareas:', error);
            throw error; // Opcionalmente, puedes lanzar el error para que se maneje en otro lugar
        }
    }

    static async postTask(post) {
        try {
            const response = await axios.post(
                `${service.endpoint}posts`,
                post,
                {
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                }
            );
            return response.data; // Devuelve los datos de la respuesta
        } catch (error) {
            // Manejar errores aquí
            console.error('Error al realizar la solicitud POST:', error);
            throw error; // Opcionalmente, puedes lanzar el error para que se maneje en otro lugar
        }
    }

    static async changeStatus(post) {
        try {
            const response = await axios.patch(
                `${service.endpoint}posts`,
                post,
                {
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                }
            );
            return response.data; // Devuelve los datos de la respuesta
        } catch (error) {
            // Manejar errores aquí
            console.error('Error al realizar la solicitud PATCH:', error);
            throw error; // Opcionalmente, puedes lanzar el error para que se maneje en otro lugar
        }
    }

    static async deleteTask(id) {
        let params = {
            _id: id
        }
        try {
            const response = await axios.delete(
                `${service.endpoint}posts`,
                {
                    params,
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                }
            );
            return response.data; // Devuelve los datos de la respuesta
        } catch (error) {
            // Manejar errores aquí
            console.error('Error al realizar la solicitud DELETE:', error);
            throw error; // Opcionalmente, puedes lanzar el error para que se maneje en otro lugar
        }
    }

}