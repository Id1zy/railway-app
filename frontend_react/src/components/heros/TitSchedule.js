import React, { useState } from 'react';
import CreateScheduleForm from "./scheduleCreateForm";
import Modal from "./scheduleCreateForm";

export default function TitSchedule({ colorText, colorButton, border, title }) {
  const classes = {
    first: 'flex content-center items-center justify-between mx-2 my-2 border-b-4 pb-4',
    second: 'text-xl2 sm:text-xl3 font-bold leading-7 text-blue'
  };

  const [showForm, setShowForm] = useState(true);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <div className="">
        <div className={`${classes.first} ${border} `}>
          <div className="min-w-0 flex-1">
            <h2 className={`${classes.second} ${colorText} `}>{title}</h2>
          </div>
          
          <div className="flex lg:ml-4 lg:mt-0">
            {showForm && (
              <Modal isOpen={showForm} onClose={toggleForm}>
                <CreateScheduleForm />
              </Modal>
            )}
          </div>
        </div>
      </div>
    </>
  );
}