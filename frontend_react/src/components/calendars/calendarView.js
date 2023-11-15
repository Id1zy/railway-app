import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import React from 'react'
import CalendarDay from './calendarFour'
import CalendarWeek from './calendarThree'
import CalendarMonth from './calendarTwo'
import CalendarYear from './calendarFive'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CalendarView({ events }) {
  const container = useRef(null)
  const containerNav = useRef(null)
  const containerOffset = useRef(null)
  const [option, setOption] = useState(null)

  useEffect(() => {
   
  }, [option])

  const handleOption = (e) =>{
    setOption(e.target.value)
  }

  return (
  <>
  <header className="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4">
        <h1 className="text-base font-semibold leading-6 text-gray-900">
          <time dateTime="2022-01">January 2022</time>
        </h1>
        <div className="flex items-center">
          <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
            >
              <span className="sr-only">Previous week</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
            >
              Today
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
            >
              <span className="sr-only">Next week</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden md:ml-4 md:flex md:items-center">
          <select onChange={(e)=> handleOption(e)}>
        {option == 1 && <CalendarDay events={events} />}
        {option == 2 && <CalendarWeek events={events} />}
        {option == 3 && <CalendarMonth events={events} />}
        {option == 4 && <CalendarYear events={events} />}
  </select>
            <div className="ml-6 h-6 w-px bg-gray-300" />
            <button
              type="button"
              className="ml-6 rounded-md bg-new-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Agregar Evento
            </button>
          </div>
 
        </div>
      </header>


      {option == 1 ?<><CalendarDay/></>:<><p></p></>}
  {option ==2 ?<><CalendarWeek/></>:<><p></p></>}
  {option ==3 ?<><CalendarMonth /></>:<><p></p></>}
  {option ==4 ?<><CalendarYear/></>:<><p></p></>}
  </>


  )
}