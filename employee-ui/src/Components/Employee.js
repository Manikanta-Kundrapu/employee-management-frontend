import React, { useEffect, useState } from "react";
import EmployeeService from "../Services/EmployeeService";

function Employee() {

    const [employees, setEmployees] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [emp, setEmp] = useState({
        name: "",
        department: "",
        salary: ""
    });

    const [editId, setEditId] = useState(null);

    useEffect(() => {
        loadEmployees();
    }, []);

    // LOAD EMPLOYEES
    const loadEmployees = () => {

        setLoading(true);

        EmployeeService.getAll()
            .then(res => {
                setEmployees(res.data);
                setLoading(false);
            });
    };

    // HANDLE INPUT CHANGE
    const handleChange = (e) => {
        setEmp({
            ...emp,
            [e.target.name]: e.target.value
        });
    };

    // SAVE OR UPDATE
    const save = (e) => {

        e.preventDefault();

        if (editId) {

            EmployeeService.update(editId, emp)
                .then(() => {
                    loadEmployees();
                    reset();
                });

        } else {

            EmployeeService.create(emp)
                .then(() => {
                    loadEmployees();
                    reset();
                });
        }
    };

    // EDIT
    const edit = (e) => {
        setEmp(e);
        setEditId(e.id);
    };

    // DELETE
    const remove = (id) => {

        if (window.confirm("Are you sure to delete?")) {

            EmployeeService.delete(id)
                .then(() => loadEmployees());
        }
    };

    // DELETE ALL
    const deleteAll = () => {

        if (window.confirm("Delete all employees?")) {

            EmployeeService.deleteAll()
                .then(() => loadEmployees());
        }
    };

    // RESET FORM
    const reset = () => {

        setEmp({
            name: "",
            department: "",
            salary: ""
        });

        setEditId(null);
    };

    return (

        <div className="container mt-5">

            <h1 className="text-center mb-4">
                Employee Management System
            </h1>

            <p className="text-center text-muted mb-5">
                React + Spring Boot + MySQL Full Stack Project
            </p>

            <div className="row">

                {/* FORM SECTION */}

                <div className="col-md-4">

                    <div className="card shadow p-4">

                        <h3 className="mb-3 text-center">
                            Employee Form
                        </h3>

                        <form onSubmit={save}>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter Name"
                                value={emp.name}
                                onChange={handleChange}
                                className="form-control mb-3"
                            />

                            <input
                                type="text"
                                name="department"
                                placeholder="Enter Department"
                                value={emp.department}
                                onChange={handleChange}
                                className="form-control mb-3"
                            />

                            <input
                                type="number"
                                name="salary"
                                placeholder="Enter Salary"
                                value={emp.salary}
                                onChange={handleChange}
                                className="form-control mb-3"
                            />
                            <div className="d-flex gap-2">
                            <button
                                type="submit"
                                className="btn btn-primary me-2"
                            >
                                {editId ? "Update" : "Add"}
                            </button>
                    
                            <button
                                type="button"
                                onClick={reset}
                                className="btn btn-secondary"
                            >
                                Clear
                            </button>
                            </div>
                        </form>

                    </div>

                </div>

                {/* TABLE SECTION */}

                <div className="col-md-8">

                    <div className="card shadow p-4">

                        <div className="d-flex justify-content-between align-items-start mb-3">

                            <div>
                                <h3>Employee List</h3>
                                <p className="text-muted">  
                                    Total Employees: {employees.length}
                                </p>
                            </div>
                            
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={deleteAll}
                            >
                                Delete All
                            </button>

                        </div>

                        {/* SEARCH */}

                        <input
                            type="text"
                            placeholder="Search Employee"
                            className="form-control mb-3"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                        {/* LOADING */}

                        {loading && (
                            <h5 className="text-primary">
                                Loading Employees...
                            </h5>
                        )}

                        {/* TABLE */}

                        <table className="table table-bordered table-striped text-center">

                            <thead className="table-dark">

                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Department</th>
                                    <th>Salary</th>
                                    <th>Actions</th>
                                </tr>

                            </thead>

                            <tbody>

                                {employees.length === 0 ? (

                                    <tr>
                                        <td colSpan="5">
                                            No Employees Found
                                        </td>
                                    </tr>

                                ) : (

                                    employees
                                        .filter(emp =>
                                            emp.name
                                                .toLowerCase()
                                                .includes(
                                                    search.toLowerCase()
                                                )
                                        )
                                        .map(e => (

                                            <tr key={e.id}>

                                                <td>{e.id}</td>
                                                <td>{e.name}</td>
                                                <td>{e.department}</td>
                                                <td>₹ {e.salary}</td>

                                                <td>

                                                    <button
                                                        className="btn btn-warning btn-sm me-2"
                                                        onClick={() => edit(e)}
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => remove(e.id)}
                                                    >
                                                        Delete
                                                    </button>

                                                </td>

                                            </tr>

                                        ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        <div className="text-center mt-5 text-muted">
                <p>Employee Management System - Full Stack Project</p>
        </div>

    </div>

    );
}


export default Employee;