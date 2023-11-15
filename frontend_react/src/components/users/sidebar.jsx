import { useState } from 'react';
import { connect } from 'react-redux'
import { logout } from '../../redux/actions/auth'
import { NavLink } from 'react-router-dom'


 function SideBar(props) {
  const [color, setColor] = useState(
    window.localStorage.getItem("color"));

  const index = props.mapeo

  const color_='hover:border-'+props.colorSecond;

  const classes = ({
    hoverLink: color_ ,
    basic: 'flex flex-col top-0 left-0 text-white h-full',
    second: 'w-1/5 hidden md:block h-full',
    third: 'flex w-full h-screen',
    link: 'relative flex flex-row items-center h-11 pr-6 focus:outline-none border-l-4 border-transparent',
  });
  return (
<>

<div className={`${props.color} ${classes.third}`}>
    {/* Parte Izquierda */}
  <div className={`${props.color} ${classes.second}`}>
  <div className={`${props.color} ${classes.basic}`}>
    <div className="flex-grow">
      <ul className="flex flex-col py-4 space-y-1">
        <li className="px-5">
          <div className="flex flex-row items-center h-8">
            <div className="text-xl font-black tracking-wide text-white">{ props.useRol }</div>
          </div>
        </li>
        {index.map((item) => (
  <li key={item.id} className="ml-8">
    <NavLink key={item.id} to={item.href} className={` ${classes.link} ${classes.hoverLink}`}>
      <span className="inline-flex justify-center items-center ml-4">
        <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
      </span>
      <span className="ml-2 text-sm font-bold tracking-wide truncate">{item.name}</span>
    </NavLink>
  </li>
))}


      </ul>
    </div>
  </div>
  </div>

  {props.children}

  


</div>
</>
  )
}

const mapStateToProps = state => ({
});
export default connect(mapStateToProps,{
  logout
})(SideBar);