import axios from 'axios';
import { useState, useEffect } from 'react';

const UserApp = () => {
    let [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers();
    }, []);
    const getUsers = () => {
        axios
            .get('/user')
            .then((res) => {
                setUsers(res.data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const addUser = (e) => {
        e.preventDefault();
        let userObj = {
            email: e.target.email.value,
            password: e.target.password.value,
            userinfo: e.target.userinfo.value,
            dob: e.target.dob.value,
        };
        axios
            .post('/user', userObj)
            .then((res) => getUsers())
            .catch((e) => console.log(e));
    };
    const deleteUser = (email) => {
        axios
            .delete('/user/' + email)
            .then((res) => console.log(res.data))
            .catch((e) => console.log(e));
        getUsers();
    };
    const deleteAllUsers = () => {
        axios
            .get('/user/deleteall')
            .then((res) => getUsers())
            .catch((e) => console.log(e));
        getUsers();
    };
    return (
        <div>
            <form className='userForm' onSubmit={addUser}>
                <h3>
                    <label>email</label>
                </h3>
                <input
                    required
                    type='email'
                    name='email'
                    placeholder='enter email..'
                    className='form-control'
                />
                <h3>
                    <label>Password</label>
                </h3>
                <input
                    required
                    type='password'
                    name='password'
                    placeholder='enter password..'
                    className='form-control'
                />

                <label>
                    <h3>USerInfo</h3>
                </label>
                <textarea name='userinfo' type='text'></textarea>
                <label>
                    <h3>Date of Birth</h3>
                </label>
                <input type='date' name='dob' required />

                <br />
                <div className='text-center'>
                    <button className='btn btn-primary'>Add user</button>
                </div>
            </form>
            <div className='displayinline'>
                <button className='btn btn-danger' onClick={deleteAllUsers}>
                    Delete all Users
                </button>
            </div>
            {users.map((val, index) => {
                return (
                    <div>
                        <h3>{val.email}</h3>
                        <p>{val.password}</p>
                        <p>{val.userinfo}</p>
                        <p>{val.dob}</p>
                        <button
                            className='btn btn-warning'
                            onClick={() => {
                                deleteUser(val.email);
                            }}
                        >
                            del
                        </button>
                    </div>
                );
            })}
        </div>
    );
};
export default UserApp;
