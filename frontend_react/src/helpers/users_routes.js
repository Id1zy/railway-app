export const PublicRoutes = {
    Login: '/login',
    Activate: 'activate/:uid/:token',
    Reset: '/reset_password',
    ResetConfirm: '/password/reset/confirm/:uid/:token'
}

export const AdminRoutes = {
    Dashboard: '/admin/',
    Profile: '/admin/profile',
    Settings: '/admin/profile/settings',
    Students: '/admin/students',
    Guardians: '/admin/guardians',
    Professors: '/admin/professors',
    Secretaries: '/admin/secretaries',
    UTP: '/admin/utp_workers',
    Director: '/admin/directors',
    Inspector: '/admin/inspectors'
}

export const StudentRoutes = {
    Dashboard: '/student/',
    Profile: '/student/profile',
    Settings: '/student/profile/settings',
    Subject: '/student/subjects',
    SubjectAll: '/student/subjects/all',
    Grades: '/student/subjects/:uid/grades',
    Assignments: '/student/subjects/:uid/assignments',
    ViewAssignments: '/student/subjects/:uid/assignments/:suid/view',
    SharedFiles: '/student/subjects/:uid/sharedfiles',
    Forum: '/student/subjects/:uid/forum',
    ForumView: '/student/subjects/:uid/forum/post/:forum',
    Certificates: '/student/certificates',
    Attendance: '/student/subjects/:uid/attendance',
    Annotations: '/student/annotations',
    Calendar: '/student/calendar',
    Chat: '/student/chat',
    Experiment: '/student/prueba',
}
export const UTPRoutes = {
    Dashboard: '/utp_user/',
    Profile: '/utp_user/profile',
    Settings: '/utp_user/profile/settings',
    Chat: '/utp_user/chat',
    Course: '/utp_user/course',
    Section: '/utp_user/section',
    Schedule: '/utp_user/schedule',
    CreateSchedule: '/utp_user/schedule/create/:uid',
    EditSchedule: '/utp_user/schedule/edit/:uid',
    ViewSchedule: '/utp_user/schedule/show/:uid',
    Subject: '/utp_user/subject',
    CertificatesUTP:'/utp_user/certificatesUTP',
    Period:'/utp_user/period',
}


export const ProfessorRoutes = {
    AvailableTimes: '/professor/available-times/:sid',
    AvailableDetails: '/professor/available-details/:atid/:snid',
    Dashboard: '/professor/',
    Profile: '/professor/profile',
    Settings: '/professor/profile/settings',
    Subject: '/professor/subjects',
    Grades: '/professor/subjects/:uid/grades',
    ChangingGrades: '/professor/student-selected/:stid/grades/:snid/section',
    Assignments: '/professor/subjects/:uid/assignments',
    CreateAssignments: '/professor/subjects/:uid/assignments/create',
    ViewAssignments: '/professor/subjects/:uid/assignments/:suid/view',
    EditAssignments: '/professor/subjects/:uid/assignments/:suid/edit',
    SharedFiles: '/professor/subjects/:uid/sharedfiles',
    AddFiles: '/professor/subjects/:uid/sharedfiles/add_files/:folder', 
    EditFiles: '/professor/subjects/:uid/sharedfiles/edit_file/:file',
    Forum: '/professor/subjects/:uid/forum',
    ForumCreate: '/professor/subjects/:uid/forum/create',
    ForumView: '/professor/subjects/:uid/forum/post/:forum',
    ForumEdit: '/professor/subjects/:uid/forum/edit/:forum',
    Schedule: '/profesor/schedule/',
    Attendance: '/professor/attendance/main/:sid',
    AttendanceList: '/professor/attendance-of-students/:sid/:schid',
    Annotations: '/professor/annotations/:sid',
    Calendar: '/professor/calendar',
    Certificates: '/professor/certificates',
    ForumGuardian: '/professor/guardian/subjects/:uid/forum',
    ForumCreateGuardian: '/professor/guardian/subjects/:uid/forum/create',
    ForumViewGuardian: '/professor/guardian/subjects/:uid/forum/post/:forum',
    Experiment: '/professor/prueba',
}

export const GuardianRoutes = {
    Experiment: '/guardian/prueba',
    Annotations: '/guardian/annotations',
    Profile: '/guardian/profile',
    Meetings: '/guardian/meeting',
    MeetRequest: '/guardian/meeting-request/:puid/:stid/',
    Teachers: '/guardian/teachers/:stid',
    Certificates: '/guardian/certificates',
    Dashboard: '/guardian/dashboard',
    Settings: '/guardian/profile/config',
    Download: '/guardian/profile/DownloadFiles',
    ForumMain: '/guardian/forum',
    Forum: '/guardian/subjects/:uid/forum',
    ForumView: '/guardian/subjects/:uid/forum/post/:forum',
    SharedFiles: '/guardian/certificate_medical',
    AddFiles: '/guardian/certificate_medical/student/:uid', 
    EditFiles: '/guardian/certificate_medical/student/edit/:file', 
    Calendar: '/guardian/calendar',
}

export const DirectorRoutes = {
    Profile: '/director/profile',
    Dashboard: '/director/dashboard',
    Community: '/director/community',
    Observations: '/director/observations',
    Grades: '/director/grades',
    Settings: '/director/settings',
    Attendance: '/director/attendance',
    Forum: '/director/forum',
    Courses: '/director/courses',
}

export const InspectorRoutes = {
    Profile: '/inspector/profile',
    Dashboard: '/inspector/dashboard',
    Settings: '/inspector/profile/settings',
}

export const SecretaryRoutes = {
    Profile: '/secretary/profile',
    Dashboard: '/secretary/dashboard',
    Settings: '/secretary/profile/settings',
}


export const SuperUserRoutes = {
    Profile: '/superuser/profile',
    Dashboard: '/superuser/dashboard',
    Settings: '/superuser/profile/settings',
    Schools: '/superuser/schools',
    Admin: '/superuser/administrators',
}