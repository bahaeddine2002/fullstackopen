import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const AnecdotesFilter = () => {

  const dispatch = useDispatch()

  const style = {
    marginBottom: 10
  }

  const handelChange = (event) => {
    const content = event.target.value 
    dispatch(filterChange(content))
  }

  return(
    <div style={style}>
      filter <input type="text" onChange={handelChange}/>
    </div>
  )
}

export default AnecdotesFilter