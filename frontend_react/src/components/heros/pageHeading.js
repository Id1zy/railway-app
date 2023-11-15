
export default function PageHeading({colorText, colorButton, border, title, button}) {
  const classes = ({
    first: 'flex content-center items-center justify-between mx-2 my-6 border-b-4 pb-4',
    second:'text-xl2 sm:text-xl3 font-bold leading-7 text-blue ',
    third: 'button_tech_colorless',
  })

  return (
    <>
    <div className=''>
    <div className={`${classes.first} ${border} `}>
      <div className="min-w-0 flex-1">
        <h2 className={`${classes.second} ${colorText} `}>
          {title}
        </h2>
      </div>
      <div className="flex lg:ml-4 lg:mt-0">
        <span className="">
          <button type="button" className={` ${colorButton} ${classes.third}`}>
            {button}
          </button>
        </span>
      </div>
    </div>
    </div>
    </>

  )
}
