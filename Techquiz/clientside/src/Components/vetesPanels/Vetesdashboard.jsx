import React from 'react'
import VetesLayout from './VetesLayout'

const Vetesdashboard = () => {
         const userToken = sessionStorage.getItem("vetesLogined");
      const tokenParts = userToken.split(".");
      const payload = JSON.parse(atob(tokenParts[1]));
      const id = payload.id;

         var [user, SetUserData] = useState([]);
          function userFetch() {
            axios.get(`${import.meta.env.VITE_API_URL}/vetesrecord/${id}`).then((res) => {
              SetUserData(res.data);
               console.log(res.data);
            });
          }
        var [app, SetapprData] = useState([]);
      function appFetch() {
        axios.get(`${import.meta.env.VITE_API_URL}/fetchappoint/${id}`).then((res) => {
          SetUserData(res.data);
        });
      }
            useEffect(() => {
                  
                    userFetch();
                    appFetch();
                  
                });

  return (
    <div><VetesLayout/>
    {user.lenght}
    
    </div>
  )
}

export default Vetesdashboard