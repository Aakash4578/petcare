import React, { useEffect, useState } from 'react'
import Admin_Index from './Admin_Index'

const Dashboard = () => {
   var [shelter, Setshelter] = useState([]);
    function shelterFetch() {
      axios.get(`${import.meta.env.VITE_API_URL}/fetch_shelter`).then((res) => {
        Setshelter(res.data);
      });
    }
      var [categories, SetCategory] = useState([]);
  var fetch_data = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/fetchCategory`).then((resp) => {
      SetCategory(resp.data);
    });
  };   var [cont, listcont] = useState([]);
      function fetchCon() {
        axios.get(`${import.meta.env.VITE_API_URL}/fetchOrder`).then((resp) => {
          listcont(resp.data);
        });
      }
      var [user, SetUserData] = useState([]);
  function userFetch() {
    axios.get(`${import.meta.env.VITE_API_URL}/fetch_user`).then((res) => {
      SetUserData(res.data);
    });
  }

 var [myprodut, SetProduct] = useState([]);
  var fetchData = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/productDetails`).then((res) => {
      SetProduct(res.data);
    });
  };
  const [faqs, setFaqs] = useState([]);


const fetchFaqs = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/faq_fetch`);
    setFaqs(response.data);
  } catch (error) {
    console.error(error);
  }
};
 var [vetes, SetUservetes] = useState([]);
    function vetesFetch() {
      axios.get(`${import.meta.env.VITE_API_URL}/fetch_vets`).then((res) => {
        SetUservetes(res.data);
      });
    }
   useEffect(() => {
   shelterFetch()
   fetch_data()
   fetchCon()
   userFetch()
   fetchData()
   fetchFaqs()
   vetesFetch()
    }
  , []);
   
  return (
    <div>
      <Admin_Index></Admin_Index>

{shelter.length}
{categories.length}
{cont.length}
{user.length}
{myprodut.length}
{faqs.length}
{vetes.length}
    </div>
  )
}

export default Dashboard
