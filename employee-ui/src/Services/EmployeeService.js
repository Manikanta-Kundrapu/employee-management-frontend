import axios from "axios";

// BACKEND API URL
const BASE_URL = "http://localhost:8080/employees";

class EmployeeService {

    // GET ALL EMPLOYEES
    getAll() {
        return axios.get(BASE_URL);
    }

    // CREATE EMPLOYEE
    create(emp) {
        return axios.post(BASE_URL, emp);
    }

    // UPDATE EMPLOYEE
    update(id, emp) {
        return axios.put(`${BASE_URL}/${id}`, emp);
    }

    // DELETE EMPLOYEE BY ID
    delete(id) {
        return axios.delete(`${BASE_URL}/${id}`);
    }

    // DELETE ALL EMPLOYEES
    deleteAll() {
        return axios.delete(BASE_URL);
    }
}

// CREATE OBJECT
const employeeService = new EmployeeService();

export default employeeService;