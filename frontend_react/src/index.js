// Routes
import { SuperUserRoutes, AdminRoutes, StudentRoutes, ProfessorRoutes, PublicRoutes, UTPRoutes, GuardianRoutes, InspectorRoutes, SecretaryRoutes,DirectorRoutes} from './helpers/users_routes';
// React Functions
import React from 'react';
import { Provider } from "react-redux";
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter as Router} from "react-router-dom";
// STORE REDUX
import store from './store';
// Style CSS
import './styles/index.css';
// Interfaces
import Home from './interfaces/core/home';
import Login from './interfaces/core/login';
import EntError404 from './interfaces/core/error404';
import EntSignUp from './interfaces/admin/entSignUp';
import Activate from './interfaces/auth/auth';
import Password_Reset from './interfaces/auth/password_reset';
import Password_Reset_2 from './interfaces/auth/password_reset_confirm';
import Design from './interfaces/core/diseño';
// Interfaces Apoderado
import GuardianRoute from './hocs/routes/GuardianRoute';
import DashboardGuardian from './interfaces/guardian/dashboard';
import MeetingsGuardian from './interfaces/guardian/meetingsIf/MeetingsGuardian';
import RequestMain from './interfaces/guardian/meetingsIf/RequestMain';
import ProfessorsOfStudent from './interfaces/guardian/meetingsIf/ProfessorsOfStudent';
import ProfileGuardian from './interfaces/guardian/profile';
import Annotations_guardian from './interfaces/guardian/annotations';
import SharedFilesGuardian from './interfaces/guardian/certificateMedical';
import UploadCertificateMedical from './interfaces/guardian/uploadCertificateMedical';
import CertificatesGuardian from './interfaces/guardian/certificates';
import sharedFilesStudent from './interfaces/users/sharedFilesStudent';
// Interfaces Inpector
import InspectorRoute from './hocs/routes/InspectorRoute';
import DashboardInspector from './interfaces/inspector/dashboard';
import ProfileInspector from './interfaces/inspector/profile';

// Interfaces Secretary
import SecretaryRoute from './hocs/routes/SecretaryRoute';
import DashboardSecretary from './interfaces/secretary/dashboard';
import ProfileSecretary from './interfaces/secretary/profile';



import ForumGuardian from './interfaces/guardian/forumGuardian';
import ForumViewGuardian from './interfaces/guardian/forumViewGuardian';
import EditMedical from './interfaces/guardian/editMedical';
import StudentListGuardian from './interfaces/guardian/studentList';
import Settings_Guardian from './interfaces/guardian/config';


import Calendar_guardian from './interfaces/guardian/calendar';
// Interfaces Student
import StudentRoute from './hocs/routes/StudentRoute';
import Dashboard from './interfaces/users/dashboard';
import Profile from './interfaces/users/profile';
import Subjects from './interfaces/users/subjects';
import Attendance from './interfaces/users/attendance';
import Calendar from './interfaces/users/calendar';
import Annotations from './interfaces/users/annotations';
import Certificates from './interfaces/users/certificates';
import SharedFilesStudent from './interfaces/users/sharedFilesStudent';
import Chat from './interfaces/users/chat';
import Grades from './interfaces/users/grades';
import Settings from './interfaces/users/settings';
import ForumStudent from './interfaces/users/forumStudent';
import ForumViewStudent from './interfaces/users/forumViewStudent';
import AssignmentViewStudent from './interfaces/users/assignmentViewStudent';
import AssignmentStudent from './interfaces/users/assignmentStudent';
import SubjectsStudent from './interfaces/users/subjectsAll';
// // Interfaces Section

// Interfaces Professor
import ProfessorProfile from './interfaces/professor/ProfessorProfile';
import ProfessorSettings from './interfaces/professor/ProfessorSettings';
import ProfessorRoute from './hocs/routes/ProfessorRoute';
import AvailableTimes from './interfaces/professor/meetingsIf/AvailableTimes';
import AvailableDetails from './interfaces/professor/meetingsIf/AvailableDetails';
import Dashboard_Professor from './interfaces/professor/dashboard';
import GradesMain from './interfaces/professor/GradesMain';
import EditStudentGrade from './components/forms/edit/editStudentGrade';
import StudentGradesDisplay from './interfaces/professor/StudentGrades';
import AttendanceMain from './interfaces/professor/AttendanceMain';
import AttendanceSummary from './interfaces/professor/AttendanceSummary';
import AttendanceDetails from './interfaces/professor/AttendanceDetails';
import ProfessorsSchedule from './interfaces/professor/ProfessorsSchedule';
import SubjectsProfessor from './interfaces/professor/subjects';
import ForumProfessor from './interfaces/professor/forum';
import ForumCreate from './interfaces/professor/forumCreate';
import ForumViewProfessor from './interfaces/professor/forumView';
import ForumEdit from './interfaces/professor/forumEdit';
import AssignmentsProfessor from './interfaces/professor/assignments';
import SharedFilesProfessor from './interfaces/professor/sharedFIles';
import AddFiles from './interfaces/professor/addFiles';
import EditFile from './interfaces/professor/editFile';
import Annotations_Professor from './interfaces/professor/annotations';
import CreateAssignment from './interfaces/professor/assignmentProfessor';
import AssignmentView from './interfaces/professor/assignmentView';
import EditAssignment from './interfaces/professor/assignmentEdit';
import Calendar_professor from './interfaces/professor/calendar';
import ForumGuardianProfessor from './interfaces/professor/forumGuardian';
import ForumCreateGuardian from './interfaces/professor/forumCreateGuardian';
import ForumViewGuardianProfessor from './interfaces/professor/forumViewGuardian';

// Interfaces Administrator
import AdminRoute from './hocs/routes/AdminRoute';
import DashboardAdmin from './interfaces/admin/dashboard';
import StudentList from './interfaces/admin/studentList';
import GuardianList from './interfaces/admin/guardianList';
import ProfessorList from './interfaces/admin/professorList';
import AdministrativeList from './interfaces/admin/administrativeList';
import InspectorList from './interfaces/admin/inspectorList';
import PrincipalList from './interfaces/admin/principalList';
import UTPList from './interfaces/admin/utpList';
import ProfileAdmin from './interfaces/admin/profileAdmin';
import SettingsAdmin from './interfaces/admin/settings';
// Interfaces UTP
import UTPRoute from './hocs/routes/UTPRoute';
import DashboardUTP from './interfaces/utp/dashboard';
import ScheduleList from './interfaces/utp/schedule';
import CreateSchedule from './interfaces/utp/createSchedule';
import ViewSchedule from './interfaces/utp/viewSchedule';
import Section from './interfaces/utp/section';
import ProfileUTP from './interfaces/utp/profile';
import CourseUTP from './interfaces/utp/courseUtp';
import SubjectUTP from './interfaces/utp/subject';
import CertificatesUTP from './interfaces/utp/certificatesUTP';
import SettingsUTP from  './interfaces/utp/settings';
import SectionDetailsComponent from './interfaces/utp/SectionDetailsComponent';
import Period from './interfaces/utp/period';
//Interfaces Apoderado
//Interfaces Director

import DirectorRoute from './hocs/routes/DirectorRoute';
import DashboardDirector from './interfaces/director/dashboard';
import CommunityDirector from './interfaces/director/profileList';
import ObservationsDirector from './interfaces/director/observations';
import GradesDirector from './interfaces/director/grades';
import AttendanceDirector from './interfaces/director/attendance';
import ForumDirector from './interfaces/director/forum';
import CoursesDirector from './interfaces/director/courses';
import ProfileDirector from './interfaces/director/profile';
import SettingsDirector from './interfaces/director/settings';
//Interfaces SuperUser
import SuperUserRoute from './hocs/routes/SuperUserRoute';
import DashboardSuperUser from './interfaces/superuser/dashboard';
import SchoolList from './interfaces/superuser/school';
import AdminList from './interfaces/superuser/admin';
//para probar apis
import ComponentPrueba from './api/componentPrueba';



function Core() {
  return (
    <>
    <Provider store={store}>
    <Router>
<Routes>
<Route  path="*" element={<EntError404/>} />
  <Route exact path="/" element={<Home/>} />
  <Route exact path="/a" element={<Design/>} />
  {/* Public Routes */}
  <Route exact path={PublicRoutes.Login} element={<Login/>} />
  <Route exact path="/register" element={<EntSignUp/>} />
  <Route exact path={PublicRoutes.Activate} element={<Activate/>} />
  <Route exact path={PublicRoutes.Reset} element={<Password_Reset/>} />
  <Route exact path={PublicRoutes.ResetConfirm} element={<Password_Reset_2/>} />

   {/* SuperUser Routes */}
   <Route element={<SuperUserRoute/>}>
   <Route exact path={SuperUserRoutes.Dashboard}  element={<DashboardSuperUser/>} />
   <Route exact path={SuperUserRoutes.Schools}  element={<SchoolList/>} />
   <Route exact path={SuperUserRoutes.Admin}  element={<AdminList/>} />
  </Route>

  {/* Student Routes */}
  <Route element={<StudentRoute/>}>
  {/* <Route exact path={StudentRoutes.Experiment} element={<ComponentPrueba/>} /> */}
  <Route exact path={StudentRoutes.Dashboard} element={<Dashboard/>} />
  <Route exact path={StudentRoutes.Profile} element={<Profile/>} />
  <Route exact path={StudentRoutes.Settings} element={<Settings/>} />
  <Route exact path={StudentRoutes.Subject} element={<Subjects/>} />
  <Route exact path={StudentRoutes.SubjectAll} element={<SubjectsStudent/>} />
  <Route exact path={StudentRoutes.Forum} element={<ForumStudent/>} />
  <Route exact path={StudentRoutes.ForumView} element={<ForumViewStudent/>} />
  <Route exact path={StudentRoutes.SharedFiles} element={<SharedFilesStudent/>} />
  <Route exact path={StudentRoutes.Grades} element={<Grades/>} />
  <Route exact path={StudentRoutes.Attendance} element={<Attendance/>} />
  <Route exact path={StudentRoutes.Annotations} element={<Annotations/>} />
  <Route exact path={StudentRoutes.Calendar} element={<Calendar/>} />
  <Route exact path={StudentRoutes.Assignments} element={<AssignmentStudent/>} />
  <Route exact path={StudentRoutes.ViewAssignments} element={<AssignmentViewStudent/>} />
  <Route exact path={StudentRoutes.Certificates} element={<Certificates/>} />
  <Route exact path={StudentRoutes.Chat} element={<Chat/>} />
  <Route exact path={StudentRoutes.Experiment} element={<ComponentPrueba/>} />
  </Route>
  {/* Professor Routes */}
  <Route element={<ProfessorRoute/>}>
  <Route exact path={ProfessorRoutes.Profile}  element={<ProfessorProfile/>} />
  <Route exact path={ProfessorRoutes.Settings}  element={<ProfessorSettings/>} />
  <Route exact path={ProfessorRoutes.AvailableTimes}  element={<AvailableTimes/>} />
  <Route exact path={ProfessorRoutes.AvailableDetails}  element={<AvailableDetails/>} />
  <Route exact path={ProfessorRoutes.Dashboard}  element={<Dashboard_Professor/>} />
  <Route exact path={ProfessorRoutes.Subject}  element={<SubjectsProfessor/>} />
  <Route exact path={ProfessorRoutes.Grades} element={<GradesMain/>}/>
  <Route exact path={ProfessorRoutes.Attendance} element={<AttendanceMain/>}/>
  <Route exact path={ProfessorRoutes.AttendanceList} element={<AttendanceDetails/>}/>
  <Route exact path={ProfessorRoutes.Schedule} element={<ProfessorsSchedule/>} />
  <Route exact path={ProfessorRoutes.ChangingGrades} element={<EditStudentGrade/>}/>
  <Route exact path={ProfessorRoutes.Forum}  element={<ForumProfessor/>} />
  <Route exact path={ProfessorRoutes.ForumCreate}  element={<ForumCreate/>} />
  <Route exact path={ProfessorRoutes.ForumView}  element={<ForumViewProfessor/>} />
  <Route exact path={ProfessorRoutes.ForumEdit}  element={<ForumEdit/>} />
  <Route exact path={ProfessorRoutes.ForumGuardian}  element={<ForumGuardianProfessor/>} />
  <Route exact path={ProfessorRoutes.ForumCreateGuardian}  element={<ForumCreateGuardian/>} />
  <Route exact path={ProfessorRoutes.ForumViewGuardian}  element={<ForumViewGuardianProfessor/>} />
  <Route exact path={ProfessorRoutes.SharedFiles}  element={<SharedFilesProfessor/>} />
  <Route exact path={ProfessorRoutes.AddFiles}  element={<AddFiles/>} />
  <Route exact path={ProfessorRoutes.EditFiles}  element={<EditFile/>} />
  <Route exact path={ProfessorRoutes.Assignments}  element={<AssignmentsProfessor/>} />
  <Route exact path={ProfessorRoutes.CreateAssignments} element={<CreateAssignment/>} />
  <Route exact path={ProfessorRoutes.ViewAssignments} element={<AssignmentView/>} />
  <Route exact path={ProfessorRoutes.EditAssignments} element={<EditAssignment/>} />
  <Route exact path={ProfessorRoutes.Experiment} element={<ComponentPrueba/>} />
  <Route exact path={ProfessorRoutes.Annotations} element={<Annotations_Professor/>} />
  <Route exact path={ProfessorRoutes.Calendar} element={<Calendar_professor/>} />
  </Route>
  {/* Administrator Routes */}
  <Route element={<AdminRoute/>}>
   <Route exact path="/register" element={<EntSignUp/>} />
   <Route exact path={AdminRoutes.Dashboard}  element={<DashboardAdmin/>} />
   <Route exact path={AdminRoutes.Profile}  element={<ProfileAdmin/>} />
   <Route exact path={AdminRoutes.Settings}  element={<SettingsAdmin/>} />
   <Route exact path={AdminRoutes.Students}  element={<StudentList/>} />
   <Route exact path={AdminRoutes.Guardians}  element={<GuardianList/>} />
   <Route exact path={AdminRoutes.Professors}  element={<ProfessorList/>} />
   <Route exact path={AdminRoutes.Secretaries}  element={<AdministrativeList/>} />
   <Route exact path={AdminRoutes.Director}  element={<PrincipalList/>} />
   <Route exact path={AdminRoutes.Inspector}  element={<InspectorList/>} />
   <Route exact path={AdminRoutes.UTP}  element={<UTPList/>} />
  </Route>
  {/* Guardian Routes */}
  <Route element={<GuardianRoute/>}>
  <Route exact path={GuardianRoutes.Dashboard}  element={<DashboardGuardian/>} />
  <Route exact path={GuardianRoutes.Meetings}  element={<MeetingsGuardian/>} />
  <Route exact path={GuardianRoutes.MeetRequest}  element={<RequestMain/>} />
  <Route exact path={GuardianRoutes.Teachers}  element={<ProfessorsOfStudent/>} />
  <Route exact path={GuardianRoutes.Profile}  element={<ProfileGuardian/>} />
  <Route exact path={GuardianRoutes.Settings} element={<Settings_Guardian/>} />
  <Route exact path={GuardianRoutes.Certificates}  element={<CertificatesGuardian/>} />
  <Route exact path={GuardianRoutes.Annotations} element={<Annotations_guardian/>} />
  <Route exact path={GuardianRoutes.SharedFiles} element={<SharedFilesGuardian/>} />
  <Route exact path={GuardianRoutes.AddFiles} element={<UploadCertificateMedical/>} />
  <Route exact path={GuardianRoutes.EditFiles} element={<EditMedical/>} />
  <Route exact path={GuardianRoutes.ForumMain} element={<StudentListGuardian/>} /> 
  <Route exact path={GuardianRoutes.Forum} element={<ForumGuardian/>} /> 
  <Route exact path={GuardianRoutes.ForumView} element={<ForumViewGuardian/>} />
  <Route exact path={GuardianRoutes.Calendar} element={<Calendar_guardian/>} />
  </Route>


    {/* Inspector Routes */}
  <Route element={<InspectorRoute/>}>
  <Route exact path={InspectorRoutes.Dashboard}  element={<DashboardInspector/>} />
  <Route exact path={InspectorRoutes.Profile}  element={<ProfileInspector/>} />
  </Route>

      {/* Secretary Routes */}
  <Route element={<SecretaryRoute/>}>
  <Route exact path={SecretaryRoutes.Dashboard}  element={<DashboardSecretary/>} />
  <Route exact path={SecretaryRoutes.Profile}  element={<ProfileSecretary/>} />
  </Route>



  {/* UTP Routes */}
  <Route element={<UTPRoute/>}>
  <Route exact path={UTPRoutes.Dashboard}  element={<DashboardUTP/>} />
  <Route exact path={UTPRoutes.Schedule}  element={<ScheduleList/>} />
  <Route exact path={UTPRoutes.CreateSchedule}  element={<CreateSchedule/>} />
  <Route exact path={UTPRoutes.ViewSchedule}  element={<ViewSchedule/>} />
  <Route exact path={UTPRoutes.Section}  element={<Section/>} />
  <Route exact path={UTPRoutes.Profile}  element={<ProfileUTP/>} />
  <Route exact path={UTPRoutes.Course}  element={<CourseUTP/>} />
  <Route exact path={UTPRoutes.Subject}  element={<SubjectUTP/>} />
  <Route exact path={UTPRoutes.CertificatesUTP}  element={<CertificatesUTP/>} />
  <Route exact path={UTPRoutes.Settings}  element={<SettingsUTP/>} />
  <Route path="/utp/section/details/:sectionId" element={<SectionDetailsComponent/>} />
  <Route exact path={UTPRoutes.Period}  element={<Period/>} />
  </Route>

  {/* Director Routes */}
  <Route element={<DirectorRoute/>}>
  <Route exact path={DirectorRoutes.Dashboard}  element={<DashboardDirector/>} />
  <Route exact path={DirectorRoutes.Community}  element={<CommunityDirector/>} />
  <Route exact path={DirectorRoutes.Observations}  element={<ObservationsDirector/>} />
  <Route exact path={DirectorRoutes.Grades}  element={<GradesDirector/>} />
  <Route exact path={DirectorRoutes.Attendance}  element={<AttendanceDirector/>} />
  <Route exact path={DirectorRoutes.Forum}  element={<ForumDirector/>} />
  <Route exact path={DirectorRoutes.Courses}  element={<CoursesDirector/>} />
  <Route exact path={DirectorRoutes.Profile}  element={<ProfileDirector/>} />
   <Route exact path={DirectorRoutes.Settings}  element={<SettingsDirector/>} />
  </Route>

</Routes>
</Router>
    </Provider>
    </>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Core />

);

