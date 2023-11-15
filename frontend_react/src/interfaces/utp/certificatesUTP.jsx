import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import PageHeading from "../../components/heros/pageHeading";
import { getStudentGrades , getAbsent,fetchStudentsByCourse} from '../../api/axiosGuardian';
import { utp_maps } from "../../helpers/users_helpers";
import html2pdf from 'html2pdf.js';
import toast, { Toaster } from 'react-hot-toast';

const CertificatesUTP = ({ user }) => {
  const [certificateType, setCertificateType] = useState('alumnoRegular');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentGradesData, setStudentGradesData] = useState([]); // Define el estado
  const [setstudentAbsences, setStudentAbsences] = useState([]); // Define el estado
  const [students, setStudents,] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');


  function generateCertificateHtml(student) {
    let contentHTML = '';

    switch (certificateType) {
      case 'alumnoRegular':
        contentHTML = `
        <!DOCTYPE html>
        <html lang="en">
    
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: 'Times New Roman', serif;
                    margin: 0;
                    padding: 50px;
                    box-sizing: border-box;
                    position: relative;
                    background-color: #f4f4f4;
                }
    
                header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 20px;
                    margin-bottom: 30px;
                }
    
                header img {
                    width: 150px;
                }
    
                header h1 {
                    font-size: 28px;
                    margin: 0;
                    color: #2c3e50;
                }
    
                header p {
                    font-size: 18px;
                    margin: 5px 0 0;
                    color: #7f8c8d;
                }
    
                .content {
                    font-size: 16px;
                    text-align: justify;
                    line-height: 1.8;
                    margin-bottom: 50px;
                    background-color: #ffffff;
                    padding: 30px;
                    border: 1px solid #e0e0e0;
                    box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
                }
    
                footer {
                    position: absolute;
                    bottom: 50px;
                    right: 50px;
                }
    
                footer img {
                    width: 200px;
                    display: block;
                    margin-bottom: 10px;
                }
    
                footer p {
                    font-size: 14px;
                    text-align: center;
                    margin: 0;
                    color: #34495e;
                }
    
            </style>
        </head>
    
        <body>
            <header>
                <img src="URL_DEL_LOGO" alt="Logo Universidad">
                <div>
                    <h1>CERTIFICADO DE ESTUDIANTE REGULAR</h1>
                    <p>UNIVERSIDAD AUTÓNOMA DE CHILE</p>
                </div>
                <div>
                    <p>29571672157</p>
                    <p>Código de verificación</p>
                </div>
            </header>
            <div class="content">
                <p>Quien suscribe, certifica que <strong>${selectedStudent.full_name}</strong>, R.U.T. ${selectedStudent.rut}, es Estudiante Regular del PRIMER Semestre del Periodo Académico 2023 de la carrera de Ingeniería Civil Informática, impartida en esta Casa de Estudios Superiores en la jornada DIURNA.</p>
                <p>Se deja constancia que la carrera de Ingeniería Civil Informática es de régimen SEMESTRAL.</p>
                <p>Se extiende el presente certificado a petición de ${selectedStudent.full_name} para BENEFICIOS. La institución o persona ante quien presente este documento, podrá verificarlo en la siguiente dirección <a href="http://certificado.uautonoma.cl">http://certificado.uautonoma.cl</a> con el respectivo código de verificación.</p>
                <p>La Universidad Autónoma de Chile goza de reconocimiento oficial y plena autonomía conforme a las leyes vigentes. Figura inscrita desde el 11 de agosto de 1989 en el Folio C N° 35 del libro de universidades del Ministerio de Educación.</p>
            </div>
            <footer>
                <img src="URL_DE_LA_FIRMA" alt="Firma Autorizada">
                <p>Firma Autorizada</p>
                <p>Secretario General</p>
            </footer>
        </body>
    
        </html>
    
        `;
        break;
        case 'reconocimientoAcademico':
          contentHTML = `
              <div style="font-family: 'Times New Roman', serif; width: 700px; margin: auto; padding: 30px 50px; border: 2px solid black; background-color: #f5f5f5;">
                  <div style="text-align: center;">
                      <img src="url_del_logo_de_tu_institución" alt="Logo de la Institución" style="width: 100px;" />
                      <h1 style="font-size: 28px; margin-top: 20px; color: #2c3e50;">Certificado de Reconocimiento Académico</h1>
                  </div>
                  <hr style="margin: 20px 0; border: none; border-bottom: 1px solid #2c3e50;" />
                  <div style="margin: 40px 0;">
                      <p style="font-size: 18px; text-align: justify;">
                          Por medio de la presente, <strong style="color: #2c3e50;">la institución Universidad Autonoma De Chile</strong>, certifica que <strong style="color: #2c3e50;">${selectedStudent.full_name}</strong>, identificado con el RUT <strong style="color: #2c3e50;">${selectedStudent.rut}</strong>, ha sido reconocido por su destacada trayectoria y rendimiento académico durante el año escolar.
                      </p>
                      <p style="font-size: 18px; text-align: justify;">
                          Reconocemos sus esfuerzos y dedicación en todas las materias y le felicitamos por su excelencia académica. Estamos orgullosos de contar con él/ella como parte de nuestra comunidad educativa.
                      </p>
                  </div>
                  <div style="margin-top: 60px;">
                      <p style="text-align: right; font-size: 18px;">
                          [Nombre de la Ciudad], [Fecha]
                      </p>
                      <div style="display: flex; justify-content: space-between; margin-top: 60px;">
                          <div style="width: 45%; text-align: center;">
                              <hr style="border-top: 1px solid #2c3e50; width: 80%; margin: auto;" />
                              <p style="font-size: 18px;">Firma del Director(a)</p>
                          </div>
                          <div style="width: 45%; text-align: center;">
                              <hr style="border-top: 1px solid #2c3e50; width: 80%; margin: auto;" />
                              <p style="font-size: 18px;">Firma del Docente</p>
                          </div>
                      </div>
                  </div>
              </div>
          `;
          break;
          case 'certificadonotas':
          contentHTML = `
          <!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Times New Roman', serif;
            margin: 0;
            padding: 50px;
            box-sizing: border-box;
            background-color: #f4f4f4;
        }

        .certificate-container {
            background-color: #ffffff;
            padding: 30px;
            border: 1px solid #e0e0e0;
            box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
        }

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }

        header img {
            width: 150px;
        }

        header h1 {
            font-size: 28px;
            margin: 0;
            color: #2c3e50;
        }

        header p {
            font-size: 18px;
            margin: 5px 0 0;
            color: #7f8c8d;
        }

        .content {
            font-size: 16px;
            text-align: justify;
            line-height: 1.8;
            margin-bottom: 50px;
        }

        .grades-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }

        .grades-table th, .grades-table td {
            border: 1px solid #d0d0d0;
            padding: 8px 15px;
            text-align: left;
        }

        .grades-table th {
            background-color: #f0f0f0;
        }

        footer {
            display: flex;
            justify-content: flex-end;
        }

        footer img {
            width: 200px;
            margin-right: 10px;
        }

        footer p {
            font-size: 14px;
            text-align: center;
            margin: 0;
            color: #34495e;
        }

    </style>
</head>

<body>
    <div class="certificate-container">
        <header>
            <img src="URL_DEL_LOGO" alt="Logo Universidad">
            <div>
                <h1>CERTIFICADO DE NOTAS</h1>
                <p>UNIVERSIDAD AUTÓNOMA DE CHILE</p>
            </div>
        </header>
        <div class="content">
            <p>Certificamos que el estudiante <strong>${selectedStudent.full_name}</strong>, R.U.T. ${selectedStudent.rut}, ha obtenido las siguientes calificaciones:</p>
            
            <table class="grades-table">
                <thead>
                    <tr>
                        <th>Asignatura</th>
                        <th>Nota</th>
                        <th>Coeficiente</th>
                    </tr>
                </thead>
                <tbody>
                ${studentGradesData && studentGradesData.length > 0 ? (
                  studentGradesData.map((grade, index) => `
                      <tr key="${index}">
                          <td>${grade.asignatura}</td>
                          <td>${grade.nota}</td>
                          <td>${grade.coeficiente}</td>
                      </tr>
                  `).join('')
              ) : `
                  <tr>
                      <td colspan="3">No hay calificaciones disponibles</td>
                  </tr>
              `}
          </tbody>
                  </tbody>
            </table>

            <p>La Universidad Autónoma de Chile goza de reconocimiento oficial y plena autonomía conforme a las leyes vigentes. Figura inscrita desde el 11 de agosto de 1989 en el Folio C N° 35 del libro de universidades del Ministerio de Educación.</p>
        </div>
        <footer>
            <img src="URL_DE_LA_FIRMA" alt="Firma Autorizada">
            <div>
                <p>Firma Autorizada</p>
                <p>Secretario General</p>
            </div>
        </footer>
    </div>
</body>

</html>
          
        `;
        break;
        case 'certificadoasistencia':
          contentHTML = `
          <!DOCTYPE html>
          <html lang="es">
          
          <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Certificado de Asistencia</title>
            <style>
              body {
                font-family: 'Times New Roman', serif;
                margin: 0;
                padding: 50px;
                box-sizing: border-box;
                background-color: #f4f4f4;
              }
          
              .certificate-container {
                background-color: #ffffff;
                padding: 30px;
                border: 1px solid #e0e0e0;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                max-width: 800px;
                margin: 0 auto;
              }
          
              header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-bottom: 20px;
                margin-bottom: 30px;
                border-bottom: 2px solid #e0e0e0;
              }
          
              header img {
                width: 150px;
              }
          
              header h1 {
                font-size: 28px;
                margin: 0;
                color: #2c3e50;
              }
          
              header p {
                font-size: 18px;
                margin: 5px 0 0;
                color: #7f8c8d;
              }
          
              .content {
                font-size: 16px;
                text-align: justify;
                line-height: 1.8;
                margin-bottom: 50px;
              }
          
              .absences-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
              }
          
              .absences-table th,
              .absences-table td {
                border: 1px solid #d0d0d0;
                padding: 8px 15px;
                text-align: left;
              }
          
              .absences-table th {
                background-color: #f0f0f0;
              }
          
              .signature-container {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                margin-top: 50px;
              }
          
              .signature-container img {
                width: 200px;
                margin-right: 10px;
              }
          
              .signature-container p {
                font-size: 16px;
                text-align: center;
                margin: 0;
                color: #34495e;
              }
            </style>
          </head>
          
          <body>
            <div class="certificate-container">
              <header>
                <div>
                  <h1>Certificado de Asistencia</h1>
                  <p>UNIVERSIDAD AUTÓNOMA DE CHILE</p>
                </div>
                <img src="logo.png" alt="Logo de la Institución">
              </header>
              <div class="content">
                <p>Por la presente se certifica que <strong>${selectedStudent.full_name}</strong> ha tenido el siguiente registro de asistencia
                <p>Este certificado se emite a solicitud del interesado en la fecha <strong>${student.fechaDescarga}</strong>.</p>
                <table class="absences-table">
                  <tr>
                    <th>Nombre</th>
                    <th>RUT</th>
                    <th>Fechas de Inasistencia</th>
                  </tr>
                  <tr>
                    <td>${selectedStudent.full_name}</td>
                    <td>${selectedStudent.rut}</td>
                    <td>${setstudentAbsences.absent_days.join(', ')}</td>
                  </tr>
                </table>
              </div>
            </div>
            <script>
              // Tu código de JavaScript aquí
            </script>
          </body>
          
          </html>
          `;
          break;
      default:
        contentHTML = `
        <!-- Código HTML predeterminado o para manejar errores -->
        `;
    }

    return contentHTML;
  }

  const handleDownloadCertificate = () => {

    if (!selectedCourseId) {
      toast.error("Por favor, selecciona un curso primero.");
      return;
    }
    
    if (!selectedStudent) {
      toast.error("Por favor, selecciona un estudiante primero.");
      return;
    }
  
    const fecha = new Date();
    const fechaFormateada = fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear();
    
    const studentWithDate = { ...selectedStudent, fechaDescarga: fechaFormateada };
    
    const content = generateCertificateHtml(studentWithDate, certificateType);
  
    const opt = {
      margin: 10,
      filename: `certificado_${selectedStudent.rut} - ${selectedStudent.full_name}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
  
    html2pdf().from(content).set(opt).save();
  };

  const fetchStudentGrades = async (studentRut) => {
    try {
      const gradesResponse = await getStudentGrades(studentRut);
      setStudentGradesData(gradesResponse.data.notas);
    } catch (error) {
      console.error('Error al obtener calificaciones del estudiante:', error.message);
    }
  };

  const fetchStudentAbsent = async (studentRut) => {
    try {
      const absentResponse = await getAbsent(studentRut);
      setStudentAbsences(absentResponse.data);
    } catch (error) {
      console.error('Error al obtener ausencias del estudiante:', error.message);
    }
  };

  useEffect(() => {
    const fetchCoursesAndStudents = async () => {
      try {
        const response = await fetchStudentsByCourse();
        console.log("asdka",response)
        if (Array.isArray(response.data)) {
          const coursesData = response.data.reduce((acc, student) => {
            acc[student.course_id] = acc[student.course_id] || {
              id_course: student.course_id,
              name: `Curso ${student.course_level}`,
              students: [],
            };
            acc[student.course_id].students.push(student);
            return acc;
          }, {});
          setCourses(Object.values(coursesData));
        } else {
          setCourses([]);
        }
      } catch (error) {
        console.error('Error al cargar cursos y estudiantes:', error);
        setCourses([]);
      }
    };
    
  
    fetchCoursesAndStudents();
  }, []);
  
  const handleCourseChange = (event) => {
    const courseId = event.target.value;
    setSelectedCourseId(courseId);
  
    const selectedCourse = courses.find(course => course.id_course.toString() === courseId);
    if (selectedCourse) {
      setStudents(selectedCourse.students);
    } else {
      setStudents([]);
    }

    
  };
  
  const handleStudentChange = async (event) => {
    const studentId = event.target.value;
    setSelectedStudentId(studentId);
  
    const student = students.find(s => s.rut === studentId);
    setSelectedStudent(student || null);

    if (student && student.rut) {
      try {
        await fetchStudentGrades(student.rut);
        await fetchStudentAbsent(student.rut);
      } catch (error) {
        console.error('Error al obtener calificaciones del estudiante:', error);
      }
    }
};

  return (
    <PageUser color={'bg-white text-blue'} colorInput={'bg-white text-blue'}>
      <SideBar color={'bg-blue'} userData={user} useRol="UTP" mapeo={utp_maps}>
        <div className="w-full md:w-4/5 bg-fondo p-4 h-full shadow-md">
        <PageHeading colorText='text-grey text-center md:text-left' colorButton='invisible bg-admin-black' border='border-admin-green' title='Certificados' button='' />
          <div className="mb-5">
            <label htmlFor="course" className="block text-blue font-bold mb-2">Seleccionar Curso</label>
            <select onChange={handleCourseChange} className="w-full p-3 border rounded bg-gray-100 focus:outline-none focus:border-blue-500"value={selectedCourseId || ''}>
            <option value="">Seleccione un curso</option>
              {courses.map(course => (
                <option key={course.id_course} value={course.id_course}>{course.name}</option>
              ))}
          </select>
          </div>
          <div className="mb-5">
            <label htmlFor="student" className="block text-blue font-bold mb-2">Seleccionar Estudiante</label>
            <select onChange={handleStudentChange} className="w-full p-3 border rounded bg-gray-100 focus:outline-none focus:border-blue-500" value={selectedStudentId || ''}>
              <option value="">Seleccione un estudiante</option>
              {students.map(student => (
                <option key={student.rut} value={student.rut}>{student.full_name}</option>
              ))}
          </select>
          </div>
          <div className="mb-5">
          <label htmlFor="certificateType" className="block text-blue font-bold mb-2">Tipo de Certificado</label>
          <select onChange={(e) => setCertificateType(e.target.value)} className="w-full p-3 border rounded bg-gray-100 focus:outline-none focus:border-blue-500" value={certificateType}>
            <option value="alumnoRegular">Alumno Regular</option>
            <option value="reconocimientoAcademico">Reconocimiento Académico</option>
            <option value="certificadonotas">Certificado de Notas</option>
            <option value="certificadoasistencia">Certificado de Asistencia</option>
          </select>
        </div>
        <button
          onClick={handleDownloadCertificate}
          className="w-full bg-blue text-white rounded-lg py-2 px-4 hover:bg-blue-700 focus:outline-none"
        >
          Descargar Certificado
        </button>
        </div>
      </SideBar>
    </PageUser>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
});

export default connect(mapStateToProps, {})(CertificatesUTP);
