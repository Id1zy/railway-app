import {Fragment} from 'react'
import {connect} from 'react-redux'

function Alert ({ alert }) {

    const displayAlert = () => {
        if (alert !== null){
            return (
              <>
<div className={`z-50 bg-deep-blue text-center py-4 lg:px-4 `}>
  <div className="p-2 z-50 bg-blue items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
    <span className="flex rounded-full bg-light-blue uppercase px-2 py-1 text-xs font-bold mr-3">{alert.title}</span>
    <span className="font-semibold mr-2 text-left flex-auto">{alert.msg}</span>
  </div>
</div>
              </>
            )
        } else {
            return(
                <Fragment></Fragment>
            )
        }
    }
    return (
        <Fragment>
            {displayAlert()}
        </Fragment>
    )
}

const mapStateToProps = state => ({
    alert: state.Alert.alert
})

export default connect(mapStateToProps)(Alert)


