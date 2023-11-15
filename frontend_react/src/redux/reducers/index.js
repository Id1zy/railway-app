import {combineReducers} from 'redux';
import Auth from './auth';
import Alert from './alert';
import student from './student';
import admin from './admin';
import section from './section';
import course from './course';


export default combineReducers({
    Auth,
    Alert,
    student,
    section,
    admin,
    course
})