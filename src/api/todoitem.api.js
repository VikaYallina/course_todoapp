import { apiUrl } from "@/config/config";
import axios from "axios";

export default {
    todoApiItem: {
        resourceUrl: "resource/todo",
        getAll() {
            return axios({
                url: `${apiUrl}/${this.resourceUrl}`,
                method: "GET"
            });
        },
        getOne(id) {
            return axios({
                url: `${apiUrl}/${this.resourceUrl}/${id}`,
                method: "GET"
            });
        },
        getByUserId(userId){
            return axios({
                url: `${apiUrl}/${this.resourceUrl}/by-user-id/${userId}`,
                method: "GET"
            });
        },
        getByGroupId(groupId){
            return axios({
                url: `${apiUrl}/${this.resourceUrl}/by-group-id/${groupId}`,
                method: "GET"
            });
        },
        add(item) {
            return axios({
                url: `${apiUrl}/${this.resourceUrl}`,
                method: "POST",
                data: item
            });
        },
        edit(id, item) {
            return axios({
                url: `${apiUrl}/${this.resourceUrl}/${id}`,
                method: "PUT",
                data: item
            });
        },
        delete(id) {
            return axios({
                url: `${apiUrl}/${this.resourceUrl}/${id}`,
                method: "DELETE"
            });
        }
    }
};