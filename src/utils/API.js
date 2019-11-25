import axios from "axios";
import apiKey from './key';
import moment from 'moment-timezone';
let sha256 = require("js-sha256");



require("dotenv").config();


const encodeUserPass = (username, password) => {
  let credential = Buffer.from(`${username}:${password}`).toString('base64');
  let basicCredential = "Basic " + credential;

  return basicCredential;
}

const hashAPIKey = (apiKey) => {
  // Get the numerical date
  const today = moment.tz('America/Chicago').date();

  // return the hash
  let key_hash = sha256(today + apiKey.toUpperCase());
  return key_hash.toUpperCase();

}

let config = {
  headers: {
    'X-API-KEY': "",
    'Authorization': ""
  },
  params: {}
}


export default {
  /////////////////////////// START LOG IN /////////////////////////

  login: (data) => {
   
    let credentials = encodeUserPass(data.username, data.password);
    config.headers.Authorization = credentials;
    config.params = { "Name": data.username }
    config.headers["X-API-KEY"] = hashAPIKey(apiKey.apiKey.apiKey);

    return axios.get(`https://opsdev.eogresources.com/inventorytest-api/Admin/AppUsers`, config);
  },

  /////////////////////////// END LOG IN   /////////////////////////


  /////////////////////////// START TYPES /////////////////////////

  getAllTypes: () => {
    config.params = {};
    return axios.get(`https://opsdev.eogresources.com/inventorytest-api/Type`, config);
  },
  postType: data => {

    config.params = {};
    config.params = { type_name: data.type_name };
    return axios.post(`https://opsdev.eogresources.com/inventorytest-api/Type`, data, config);
  },
  updateType: data => {
    config.params = {};
    return axios.put(`https://opsdev.eogresources.com/inventorytest-api/Type`, data, config);
  },
  getType: (id) => {
    config.params = {};
    config.params = { type_id: id };
    return axios.get(`https://opsdev.eogresources.com/inventorytest-api/Type`, config);
  },

  ///////////////////////////   END TYPES  //////////////////////////

  /////////////////////////// START MODELS /////////////////////////

  getAllModels: () => {
    config.params = {};
    return axios.get(`https://opsdev.eogresources.com/inventorytest-api/Model`, config);
  },
  postModel: data => {

    config.params = {};
    config.params = {
      model_name: data.model_name,
      type_id: data.type_id
    }
    return axios.post("https://opsdev.eogresources.com/inventorytest-api/Model", data, config);
  },
  updateModel: (data) => {
    config.params = {};
    config.params = data;
    return axios.put(`https://opsdev.eogresources.com/inventorytest-api/Model`, data, config);
  },
  getModel: (id) => {
    config.params = {};
    config.params = { model_id: id };
 
    return axios.get(`https://opsdev.eogresources.com/inventorytest-api/Model`, config);
  },

  /////////////////////////// END MODELS /////////////////////////

  /////////////////////////// START ITEMS /////////////////////////

  getAllItems: () => {
    config.params = {};
    return axios.get(`https://opsdev.eogresources.com/inventorytest-api/Item`, config);
  },

  getItemsAuditLogs: (data) => {
    config.params = {};
    config.params = data;
  
    return axios.get(`https://opsdev.eogresources.com/inventorytest-api/Item/AuditLog`, config);
  },

  postItem: (data) => {
    config.params = {};
    config.params = data
    return axios.post("https://opsdev.eogresources.com/inventorytest-api/Item", data, config);
  },

  updateItem: (data) => {
    config.params = {};

    return (axios.put(`https://opsdev.eogresources.com/inventorytest-api/Item/`, data, config));
  },
  getItem: (id) => {
    config.params = { item_id: id };

    return axios.get(`https://opsdev.eogresources.com/inventorytest-api/Item`, config);
  },

  postImg: (item_id, fd) => {
    config.params = {};
    config.params = { item_id: item_id };
    return axios.post(`https://opsdev.eogresources.com/inventorytest-api/Item/Photo`, fd, config);
  },

  deleteImg: (item_id) => {
    config.params = {};
    config.params = { item_id: item_id };
    return axios.delete(`https://opsdev.eogresources.com/inventorytest-api/Item/Photo`, config);
  },

  getImg: (item_id) => {
    config.params = {};
    config.params = { item_id: item_id };
    return axios.get(`https://opsdev.eogresources.com/inventorytest-api/Item/Photo`, config);
  },
  /////////////////////////// END ITEMS/////////////////////////

  /////////////////////////// START USERS /////////////////////////

  getAllUsers: () => {
    config.params = {};
    return axios.get(`https://opsdev.eogresources.com/inventorytest-api/Admin/AppUsers`, config);
  },
  getUser: (id) => {
    config.params = {};
    config.params = { UserId: id };
    return axios.get(`https://opsdev.eogresources.com/inventorytest-api/Admin/AppUsers`, config);
  },

  postUser: (data) => {
    config.params = {};
    config.params = data;
    return axios.post(`https://opsdev.eogresources.com/inventorytest-api/Admin/AppUser`, data, config);
  },

  updateUser: (data) => {
    config.params = {};
    return (axios.put(`https://opsdev.eogresources.com/inventorytest-api/Admin/AppUser`, data, config));
  },

  /////////////////////////// END USERS/////////////////////////

  /////////////////////////// START USERS TYPES /////////////////////////

  getAllUsersTypes: () => {
    config.params = {};
    return axios.get(`https://opsdev.eogresources.com/inventorytest-api/Admin/UserType`, config);
  },

  getUserType: (id) => {
    config.params = {};
    config.params = { user_type_id: id };
    return axios.get(`https://opsdev.eogresources.com/inventorytest-api/UserType`, config);
  },

  postUserType: (data) => {
  
    config.params = {};
    config.params = {
      type_name: data.type_name,
    }
    return axios.post(`https://opsdev.eogresources.com/inventorytest-api/Admin/UserType`, data, config);
  },

  updateUserType: (data) => {

    config.params = {};
    config.params = data;
    return (axios.put(`https://opsdev.eogresources.com/inventorytest-api/Admin/UserType`, data, config));
  },
  deleteUserTypes: data => {
  
    config.params = {};
    config.params = {
      user_type_id: data
    }

   
    return axios.delete(`https://opsdev.eogresources.com/inventorytest-api/Admin/UserType`, config);
  },

  /////////////////////////// START USERS TYPES /////////////////////////
};

