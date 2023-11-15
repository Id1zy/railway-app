import { Fragment, useState } from 'react'
import {
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'
import { Listbox, Transition } from '@headlessui/react'

const moods = [
  { name: 'Excited', value: 'excited', icon: FireIcon, iconColor: 'text-white', bgColor: 'bg-red-500' },
  { name: 'Loved', value: 'loved', icon: HeartIcon, iconColor: 'text-white', bgColor: 'bg-pink-400' },
  { name: 'Happy', value: 'happy', icon: FaceSmileIcon, iconColor: 'text-white', bgColor: 'bg-green-400' },
  { name: 'Sad', value: 'sad', icon: FaceFrownIcon, iconColor: 'text-white', bgColor: 'bg-yellow-400' },
  { name: 'Thumbsy', value: 'thumbsy', icon: HandThumbUpIcon, iconColor: 'text-white', bgColor: 'bg-blue-500' },
  { name: 'I feel nothing', value: null, icon: XMarkIcon, iconColor: 'text-gray-400', bgColor: 'bg-transparent' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CommentForum() {
  const [selected, setSelected] = useState(moods[5])

  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <img
          className="inline-block h-10 w-10 rounded-full"
          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
      <div className="min-w-0 flex-1">
        <form action="#" className="relative">
            <div  className="mb-2 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-light-blue focus-within:ring-2 focus-within:ring-blue">
            <input
                type="text"
                id="title"

                className={`block w-full resize-none border-0 bg-transparent py-1.5 text-blue placeholder:text-light-blue focus:ring-0 sm:text-sm sm:leading-6`}
                placeholder="Asunto"
              />
            </div>
          <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-light-blue focus-within:ring-2 focus-within:ring-blue">
            <label htmlFor="comment" className="sr-only">
              Añade tu comentario
            </label>
            <textarea
              rows={3}
              name="comment"
              id="comment"
              className="block w-full resize-none border-0 bg-transparent py-1.5 text-blue placeholder:text-light-blue focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Añade tu comentario..."
              defaultValue={''}
            />

            {/* Spacer element to match the height of the toolbar */}
            <div className="py-2" aria-hidden="true">
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
            <div className="flex items-center space-x-5">

             
            </div>
            <div className="flex-shrink-0">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-light-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Comentar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}