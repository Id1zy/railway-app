import { Fragment, useEffect, useRef } from 'react'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const numberToDayNameMap = {
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
  7: "Domingo"
};

// Función modificada para manejar números y nombres
const mapDayToNumber = (day) => {
  const dayMapping = {
    'Lunes': 'sm:col-start-[1]',
    'Martes': 'sm:col-start-[2]',
    'Miercoles': 'sm:col-start-3',
    'Jueves': 'sm:col-start-4',
    'Viernes': 'sm:col-start-5', 
    'Sabado': 'sm:col-start-[6]',
    'Domingo': 'sm:col-start-7',
  };

  // Convertir número a nombre de día si es necesario
  const dayName = numberToDayNameMap[day] || day;

  // Devolver el código CSS correspondiente
  return dayMapping[dayName];
};


function asignarValorHora(horaInicio) {
  const horaInicioDate = new Date();
  const [hora, minutos] = horaInicio.split(':');
  horaInicioDate.setHours(parseInt(hora, 10), parseInt(minutos, 10), 0, 0);

  const horasDeReferencia = [
    { hora: 8, valor: 2 },
    { hora: 9, valor: 4 },
    { hora: 10, valor:6 },
    { hora: 11, valor: 8 },
    { hora: 12, valor: 10 },
    { hora: 13, valor: 12 },
    { hora: 14, valor: 14 },
    { hora: 15, valor: 16 },
    { hora: 16, valor: 18 },
    { hora: 17, valor: 20 },
    { hora: 18, valor: 22 },
    { hora: 19, valor: 24 },
    { hora: 20, valor: 26 },
    { hora: 21, valor: 28 },
  ];

  let valorAsignado = 0;
  for (const { hora, valor } of horasDeReferencia) {
    if (horaInicioDate.getHours() >= hora) {
      valorAsignado = valor;
    } else {
      break;
    }
  }
  return valorAsignado;
}

function calcularDiferenciaHoras(horaInicial, horaFinal) {
  const diferenciaNumerica = horaFinal - horaInicial;

  return diferenciaNumerica;
}


export default function ScheduleView({block, block_2}) {
  const container = useRef(null)
  const containerNav = useRef(null)
  const containerOffset = useRef(null)

  useEffect(() => {
    // Set the container scroll position based on the current time.
    const currentMinute = new Date().getHours() * 60
    container.current.scrollTop =
      ((container.current.scrollHeight - containerNav.current.offsetHeight - containerOffset.current.offsetHeight) *
        currentMinute) /
      1440
  }, [])

  return (
    <div className="flex flex-col overflow-y-auto">
      <div ref={container} className="isolate flex flex-auto flex-col bg-white overflow-y-auto">
        <div style={{ width: '165%' }} className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
          <div
            ref={containerNav}
            className="sticky top-0 z-30 flex-none bg-blue rounded-t-lg shadow ring-1 ring-blue ring-opacity-5 sm:pr-8"
          >
            <div className="-mr-px hidden grid-cols-7 bg-blue divide-x rounded-t-lg divide-white text-sm text-white font-bold sm:grid">
              <div className="col-end-1 w-14" />
              <div className="flex items-center justify-center py-3">
                <span>
                  Lunes
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>
                  Martes
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span className="flex items-baseline">
                  Miércoles
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>
                  Jueves
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>
                  Viernes
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>
                  Sábado
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>
                 Domingo
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-auto">
            <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-light-blue" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-light-blue"
                style={{ gridTemplateRows: 'repeat(28, minmax(2.5rem, 1fr))' }}
              >
                <div ref={containerOffset} className="row-end-1 h-7"></div>
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    8AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    9AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    10AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    11AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    12PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    1PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    2PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    3PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    4PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    5PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    6PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    7PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    8PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    9PM
                  </div>
                </div>
                <div />

              </div>

              {/* Vertical lines */}
              <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-light-blue sm:grid sm:grid-cols-7">
                <div className="col-start-1 row-span-full" />
                <div className="col-start-2 row-span-full" />
                <div className="col-start-3 row-span-full" />
                <div className="col-start-4 row-span-full" />
                <div className="col-start-5 row-span-full" />
                <div className="col-start-6 row-span-full" />
                <div className="col-start-7 row-span-full" />
                <div className="col-start-8 row-span-full w-8" />
              </div>

              {/* Events */}
              
              <ol
                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
                style={{ gridTemplateRows: '1.5rem repeat(28, minmax(0, 1fr)) auto' }}
              >
                {block.map((item, index)=>(
                <>
                <li key={index}
className={`relative mt-px flex ${ mapDayToNumber(item.day)}`}
                 style={{ gridRow: `${asignarValorHora(item.init)} / span ${calcularDiferenciaHoras(asignarValorHora(item.init), asignarValorHora(item.fin))}` }}>
                  {console.log(`relative mt-px flex ${mapDayToNumber(item.day)}`)}
                  <a
                    href="#"
                    className="group absolute inset-1 flex flex-col items-center overflow-y-auto rounded-lg bg-blue p-2 text-xs leading-5 hover:bg-blue-100"
                  >
                    {/* <p>{mapDayToNumber(item.day)}</p> */}
                    <p className="order-1 font-semibold text-white">Inicio: {item.init}</p>
                    <p className="order-1 font-semibold text-white">Término: {item.fin}</p>
                  
                  </a>
                </li>
                </>
              ))}

              {block_2.length > 0? <>
                {block_2.map((item_, index)=>(
                <>
                <li key={index}
className={`relative mt-px flex ${ mapDayToNumber(item_.Block.day)}`}
                 style={{ gridRow: `${asignarValorHora(item_.Block.init)} / span ${calcularDiferenciaHoras(asignarValorHora(item_.Block.init), asignarValorHora(item_.Block.fin))}` }}>
                  <a
                    href="#"
                    className="group absolute inset-1 flex flex-col items-center overflow-y-auto rounded-lg bg-blue p-2 text-xs leading-5 hover:bg-blue-100"
                  >
                    
                    <p className="order-1 font-semibold text-white">Inicio: {item_.Block.init}</p>
                    <p className="order-1 font-semibold text-white">Término: {item_.Block.fin}</p>
                  
                  </a>
                </li>
                </>
              ))}
              </>: <></>}
            

              </ol>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}