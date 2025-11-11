import { useSelector } from 'react-redux'

const Notifiction = () => {
  const notifiction = useSelector((state) => state.notification)
  console.log(notifiction)

  return <div>{notifiction}</div>
}

export default Notifiction
