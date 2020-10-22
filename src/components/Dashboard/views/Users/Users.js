import React, {useEffect, useState}  from 'react';
import PuffLoader from "react-spinners/PuffLoader";
import CallUsers from "../../../../apiCall/CallUsers";
import userImg from '../../../../scss/img/user.png'
import DeleteIcon from '@material-ui/icons/Delete';





export default function Users() {

  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [usersResultat, setUsersResultat] = useState()

  const delUser = (userName) => {
    alert('Suppression désactivé !')
    // if (window.confirm('Confirmer la suppression ?')) {
    //   CallUsers.deleteUser(userName)
    //   window.location.reload(false)
    // }
  }
  
  useEffect(() => {
    const getUsers = async () => {
      try {
        await CallUsers.getUsers().then(res => {
          const data = res.data.data
          setUsers(data)
          setIsLoading(false)
          setUsersResultat(data.length)
        })
      } catch (error) {
        console.error('Users not found');
      }
    };
    getUsers()

  }, [])

  return (
    <React.Fragment>
      <div className={`users mt-5`}>
      <h3 className="mb-4">Compte Admin: <span>resultat({usersResultat})</span></h3>

      {!isLoading ?
      ( <>
          <div className="row mt-5">
            {users.map((user, id) => (
              <div key={id} className="col-md-4 users-content text-center">
                <div className="row">

                  <div className="col-12">
                    <img src={userImg} alt={id} className="" /> <br />
                  </div>

                  <div className="col-12 users-details text-center">
                    <h4>
                    <b>nom :</b> {user.username} <br />
                    <b>email :</b> {user.email} <br /><br />
                    <b>id :</b> {user._id} <br />
                    <b>Crée le :</b> {user.created_at} <br />
                    </h4>
                    <DeleteIcon onClick={() => delUser(user.username)} style={{ color: "#f44336" }} />
                  </div>

                </div>
              </div>
            ))}
          </div>
      </>) : ( <PuffLoader size={50} color={"#f50057"}/> )}
    
      </div>
    </React.Fragment>
  );
}









