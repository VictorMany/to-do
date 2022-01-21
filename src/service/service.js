import axios from 'axios';
const params = new URLSearchParams()
const token = 'e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd'
params.append('token', token)

export default class service {
    static endpoint = "https://ecsdevapi.nextline.mx/vdev/tasks-challenge/tasks";
    //Get all the tasks
    static getTasks() {
        return axios.get(
            service.endpoint,

            {
                params,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
    }
    //Ge task by ID
    static getTask(id) {
        return axios.get(
            `${service.endpoint}/${id}`,
            {
                params,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
    }
    //Post a new task
    static postTask(post) {
        params.append("title", post.title);
        params.append("is_completed", post.is_completed);
        params.append("due_date", post.due_date);
        params.append("comments", post.comments);
        params.append("description", post.description);
        params.append("tags", post.tags);

        return axios.post(
            service.endpoint,
            params,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
    }
    //Update task by ID
    static updateTask(post) {
        params.append("title", post.title);
        params.append("is_completed", post.is_completed);
        params.append("due_date", post.due_date);
        params.append("comments", post.comments);
        params.append("description", post.description);
        params.append("tags", post.tags);

        return axios.put(
            `${service.endpoint}/${post.id}`,
            params,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
    }
    //Delete task by ID
    static deleteTask(id) {
        return axios.delete(
            `${service.endpoint}/${id}`,
            {
                params,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
    }
}