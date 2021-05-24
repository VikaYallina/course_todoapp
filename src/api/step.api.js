import { apiUrl } from "@/config/config";
import axios from "axios";

export default {
    stepApiItem: {
        resourceUrl: "resource/step",
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
        getByUserId(itemId){
            return axios({
                url: `${apiUrl}/${this.resourceUrl}/by-item-id/${itemId}`,
                method: "GET"
            });
        },
        getByGroupId(groupId){
            return axios({
                url: `${apiUrl}/${this.resourceUrl}/by-group-id/${groupId}`,
                method: "GET"
            });
        },
        toggle(id){
            return axios({
                url: `${apiUrl}/${this.resourceUrl}/toggle/${id}`,
                method: "PUT"
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