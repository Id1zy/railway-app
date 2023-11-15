import SuperUserRoute from '../hocs/routes/SuperUserRoute'
import { SuperUserRoutes, AdminRoutes, StudentRoutes, ProfessorRoutes, UTPRoutes, GuardianRoutes, DirectorRoutes, InspectorRoutes, SecretaryRoutes} from './users_routes'

import { UserCircleIcon, AcademicCapIcon, UsersIcon,
   Cog6ToothIcon, ArrowLeftOnRectangleIcon, HomeIcon,DocumentArrowUpIcon,RectangleStackIcon,UserGroupIcon, UserIcon, BookOpenIcon, CalendarIcon, ListBulletIcon, PencilSquareIcon, CalendarDaysIcon, DocumentDuplicateIcon, DocumentTextIcon,ClipboardDocumentCheckIcon, NewspaperIcon, ClockIcon,ClipboardDocumentIcon} from '@heroicons/react/24/outline'

export const profile_maps = [
  { name: 'Dashboard', description: '', href: '', icon: HomeIcon},
    { name: 'Perfil', description: '', href: '', icon: UserCircleIcon },
]

export const guardian_maps = [
  { name: 'Dashboard', description: '', href: GuardianRoutes.Dashboard, icon: HomeIcon},
  { name: 'Foros', description: '', href: GuardianRoutes.ForumMain, icon: UserGroupIcon},
  { name: 'Reuniones', description:'', href: GuardianRoutes.Meetings, icon: ClockIcon},
  { name: 'Anotaciones', description: '', href: GuardianRoutes.Annotations, icon: DocumentTextIcon },
  { name: 'Calendario', description: '', href: GuardianRoutes.Calendar, icon: CalendarIcon },
  { name: 'Certificados', description: '', href: GuardianRoutes.Certificates, icon: ClipboardDocumentIcon},
  { name: 'Certificados Médicos', description: '', href: GuardianRoutes.SharedFiles, icon: DocumentArrowUpIcon}
]

export const index_maps = [
    { name: 'Dashboard', description: '', href: StudentRoutes.Dashboard, icon: HomeIcon},
    { name: 'Asignaturas', description: '', href: StudentRoutes.Subject, icon: BookOpenIcon },
    { name: 'Anotaciones', description: '', href: StudentRoutes.Annotations, icon: DocumentTextIcon },
    { name: 'Calendario', description: '', href: StudentRoutes.Calendar, icon: CalendarIcon },
    
  ]

export const utp_maps = [
    { name: 'Dashboard', description: '', href: UTPRoutes.Dashboard, icon: HomeIcon},
    { name: 'Cursos', description: '', href: UTPRoutes.Course, icon: DocumentTextIcon},
    { name: 'Estudiantes/Curso', description: '', href: UTPRoutes.Section, icon: UserIcon},
    { name: 'Horario', description: '', href: UTPRoutes.Schedule, icon: NewspaperIcon},
    { name: 'Asignaturas', description: '', href: UTPRoutes.Subject, icon: BookOpenIcon },
    { name: 'Certificados', description: '', href: UTPRoutes.CertificatesUTP, icon: DocumentTextIcon },
    { name: 'Periodos', description: '', href: UTPRoutes.Period, icon: AcademicCapIcon },
]


export const profesor_maps = [
  { name: 'Principal', description: '', href: ProfessorRoutes.Dashboard, icon: HomeIcon},
  { name: 'Asignaturas', description: '', href: ProfessorRoutes.Subject, icon: BookOpenIcon },
  { name: 'Calendario', description: '', href: ProfessorRoutes.Calendar, icon: CalendarIcon },
] 

export const index_admin = [
  { name: 'Dashboard', description: '', href:AdminRoutes.Dashboard, icon: HomeIcon},
  { name: 'Estudiantes', description: '', href: AdminRoutes.Students, icon: UserIcon },
  { name: 'Apoderados', description: '', href: AdminRoutes.Guardians, icon: UserIcon },
  { name: 'Docentes', description: '', href: AdminRoutes.Professors, icon: UserIcon },
  { name: 'UTPs', description: '', href: AdminRoutes.UTP, icon: UserIcon},
  { name: 'Directores', description: '', href: AdminRoutes.Director, icon: UserIcon},
]

export const director_maps = [
  { name: 'Dashboard', description: '', href:DirectorRoutes.Dashboard, icon: HomeIcon},
  //{ name: 'Perfil', description: '', href:DirectorRoutes.Profile, icon:UserCircleIcon },
  { name: 'Comunidad', description: '', href:DirectorRoutes.Community, icon: UsersIcon},
  { name: 'Cursos', description: '', href:DirectorRoutes.Courses, icon:BookOpenIcon },
  { name: 'Calificaciones', description: '', href:DirectorRoutes.Grades, icon:AcademicCapIcon },
  { name: 'Anotaciones', description: '', href:DirectorRoutes.Observations, icon:PencilSquareIcon },
  { name: 'Asistencia', description: '', href:DirectorRoutes.Attendance, icon:CalendarDaysIcon },
  { name: 'Foros', description: '', href:DirectorRoutes.Forum, icon:ListBulletIcon },
]

export const inspector_maps = [
  { name: 'Dashboard', description: '', href:InspectorRoutes.Dashboard, icon: HomeIcon},
  { name: 'Perfil', description: '', href:InspectorRoutes.Profile, icon:UserCircleIcon }
]

export const secretary_maps = [
  { name: 'Dashboard', description: '', href:SecretaryRoutes.Dashboard, icon: HomeIcon},
  { name: 'Perfil', description: '', href:SecretaryRoutes.Profile, icon:UserCircleIcon }
]
export const superuser_maps = [
  { name: 'Dashboard', description: '', href:SuperUserRoutes.Dashboard, icon: HomeIcon},
  { name: 'Perfil', description: '', href:SuperUserRoutes.Profile, icon:UserCircleIcon },
  { name: 'Escuelas', description: '', href:SuperUserRoutes.Schools, icon:AcademicCapIcon },
  { name: 'Administradores', description: '', href:SuperUserRoutes.Admin, icon:UsersIcon },
]