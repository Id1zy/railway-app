import React from 'react';
import { Card} from "@material-tailwind/react";
import { InformationCircleIcon, BellAlertIcon, CalendarDaysIcon, ArrowPathIcon, ClockIcon, ChatBubbleLeftEllipsisIcon, ExclamationTriangleIcon} from '@heroicons/react/24/outline';
import { formatTime } from '../../helpers/users_def';

export default function Notification({type, issue, message_, seen, created}) {
   if (type === 'Informativo' ){
    return(
        <>
        <Card className='bg-white p-3'>
          <div className=''>
              <div className='flex justify-end'>
                  <div className='text-xs bg-new-blue rounded-full px-3 text-white'>{formatTime(created)}</div>
              </div>
              <div className='inline-flex justify-between px-2'>
                  <div className='grid content-center'>
                      <InformationCircleIcon className='text-new-blue w-10 h-10'/>
                  </div>
                  <div className='px-2'>
                      <div className='text-sm text-new-blue font-bold'>{issue}</div>
                      <div className='text-sm text-new-blue font-normal'>{message_}</div>
                  </div>
              </div>
              <div className='flex justify-end'>              
              </div>
          </div>
        </Card>
        </>
    )
   }

   else if (type === 'Alerta' ){
    return(
        <>
        <Card className='bg-white p-3'>
          <div className=''>
              <div className='flex justify-end'>
                  <div className='text-xs bg-new-blue rounded-full px-3 text-white'>{formatTime(created)}</div>
              </div>
              <div className='inline-flex justify-between px-2'>
                  <div className='grid content-center'>
                      <BellAlertIcon className='text-new-blue w-10 h-10'/>
                  </div>
                  <div className='px-2'>
                      <div className='text-sm text-new-blue font-bold'>{issue}</div>
                      <div className='text-sm text-new-blue font-normal'>{message_}</div>
                  </div>
              </div>
              <div className='flex justify-end'>
                  <div className='text-xs bg-new-blue rounded-full px-3 text-white'>{seen}</div>
              </div>
          </div>
        </Card>
        </>
    )
   }

   else if (type === 'Evento' ){
    return(
        <>
        <Card className='bg-white p-3'>
          <div className=''>
              <div className='flex justify-end'>
                  <div className='text-xs bg-new-blue rounded-full px-3 text-white'>{formatTime(created)}</div>
              </div>
              <div className='inline-flex justify-between px-2'>
                  <div className='grid content-center'>
                      <CalendarDaysIcon className='text-new-blue w-10 h-10'/>
                  </div>
                  <div className='px-2'>
                      <div className='text-sm text-new-blue font-bold'>{issue}</div>
                      <div className='text-sm text-new-blue font-normal'>{message_}</div>
                  </div>
              </div>
              <div className='flex justify-end'>
                  <div className='text-xs bg-new-blue rounded-full px-3 text-white'>{seen}</div>
              </div>
          </div>
        </Card>
        </>
    )
   }

   else if (type === 'Actualización' ){
    return(
        <>
        <Card className='bg-white p-3'>
          <div className=''>
              <div className='flex justify-end'>
                  <div className='text-xs bg-new-blue rounded-full px-3 text-white'>{formatTime(created)}</div>
              </div>
              <div className='inline-flex justify-between px-2'>
                  <div className='grid content-center'>
                      <ArrowPathIcon className='text-new-blue w-10 h-10'/>
                  </div>
                  <div className='px-2'>
                      <div className='text-sm text-new-blue font-bold'>{issue}</div>
                      <div className='text-sm text-new-blue font-normal'>{message_}</div>
                  </div>
              </div>
              <div className='flex justify-end'>
                  <div className='text-xs bg-new-blue rounded-full px-3 text-white'>{seen}</div>
              </div>
          </div>
        </Card>
        </>
    )
   }

   else if (type === 'Recordatorio' ){
    return(
        <>
        <Card className='bg-white p-3'>
          <div className=''>
              <div className='flex justify-end'>
                  <div className='text-xs bg-new-blue rounded-full px-3 text-white'>{formatTime(created)}</div>
              </div>
              <div className='inline-flex justify-between px-2'>
                  <div className='grid content-center'>
                      <ClockIcon className='text-new-blue w-10 h-10'/>
                  </div>
                  <div className='px-2'>
                      <div className='text-sm text-new-blue font-bold'>{issue}</div>
                      <div className='text-sm text-new-blue font-normal'>{message_}</div>
                  </div>
              </div>
              <div className='flex justify-end'>
                  <div className='text-xs bg-new-blue rounded-full px-3 text-white'>{seen}</div>
              </div>
          </div>
        </Card>
        </>
    )
   }

   else if (type === 'Social' ){
    return(
        <>
        <Card className='bg-white p-3'>
          <div className=''>
              <div className='flex justify-end'>
                  <div className='text-xs bg-new-blue rounded-full px-3 text-white'>{formatTime(created)}</div>
              </div>
              <div className='inline-flex justify-between px-2'>
                  <div className='grid content-center'>
                      <ChatBubbleLeftEllipsisIcon className='text-new-blue w-10 h-10'/>
                  </div>
                  <div className='px-2'>
                      <div className='text-sm text-new-blue font-bold'>{issue}</div>
                      <div className='text-sm text-new-blue font-normal'>{message_}</div>
                  </div>
              </div>
              <div className='flex justify-end'>
                  <div className='text-xs bg-new-blue rounded-full px-3 text-white'>{seen}</div>
              </div>
          </div>
        </Card>
        </>
    )
   }

   else if (type === 'Error' ){
    return(
        <>
        <Card className='bg-white p-3'>
          <div className=''>
              <div className='flex justify-end'>
                  <div className='text-xs bg-new-blue rounded-full px-3 text-white'>{formatTime(created)}</div>
              </div>
              <div className='inline-flex justify-between px-2'>
                  <div className='grid content-center'>
                      <ExclamationTriangleIcon className='text-new-blue w-10 h-10'/>
                  </div>
                  <div className='px-2'>
                      <div className='text-sm text-new-blue font-bold'>{issue}</div>
                      <div className='text-sm text-new-blue font-normal'>{message_}</div>
                  </div>
              </div>
              <div className='flex justify-end'>
                  <div className='text-xs bg-new-blue rounded-full px-3 text-white'>{seen}</div>
              </div>
          </div>
        </Card>
        </>
    )
   }

  
  }