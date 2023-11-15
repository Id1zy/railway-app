import React from "react";

import { Card } from "@material-tailwind/react";

export default class Comment extends React.Component{
    state = {
        title: '',
        content: ''
    }

    handleChange = (event) =>{
        const target = event.target;
        const {name, value} = target;

        this.setState({
            [name]:value
        });
    }

    handleCkeditorState = (event, editor) =>{
        const data = editor.getData();

    }

    render(){
        return(
            <>
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
           

{/*  <textarea
              rows={3}
              name="comment"
              id="comment"
              className="block w-full resize-none border-0 bg-transparent py-1.5 text-blue placeholder:text-light-blue focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Añade tu comentario..."
              defaultValue={''}
            />*/}


<div className="z-50">


</div>

            <div className="py-2" aria-hidden="true">

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
            </>
            
        )
    }
}