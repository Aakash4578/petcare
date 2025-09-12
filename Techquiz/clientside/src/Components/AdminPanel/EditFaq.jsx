import axios from "axios";
import React, { useEffect, useState } from "react";
import Admin_Index from "./Admin_Index";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const EditFaq = () => {
      const [subject, setSubject] = useState("");
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");
  const [message, setMessage] = useState("");

  var {id}=useParams();
    const [form, setForm] = useState({
    subject: "",
    faqQuestion: "",
    faqAnswer: "",
  });
    useEffect(() => {
  
    axios
      .get(`http://localhost:4000/faq_find/${id}`)
      .then((res) => {
        setForm({
          subject: res.data.subject,
          faqQuestion: res.data.faqQuestion,
          faqAnswer: res.data.faqAnswer,
        });
      })
  }, [id]);
  
  var [error, SetError] = useState({
  subject: "",
      faqQuestion: "",
      faqAnswer: "",
     
    });
  const handleSubmit = async (e) => {
 
    e.preventDefault();
    var newError = {
      subject: "",
      faqQuestion: "",
      faqAnswer: "",
    };

    if(!form.subject.trim()){
        newError.subject="The subject is required **";
    }
    if(!form.faqQuestion.trim()){
        newError.faqQuestion="The Faq Question is required **";
    }if(!form.faqAnswer.trim()){
        newError.faqAnswer="The Faq Answer  is required **";
    }
    if(newError.subject||newError.faqAnswer||newError.faqQuestion){
        SetError(newError);
    }
    else{
 try {
      const response = await axios.put(`http://localhost:4000/faq_edit/${id}`, {
        subject,
        faqQuestion,
        faqAnswer,
     
      }).then(()=>{
        
    
      setSubject("");
      setFaqQuestion("");
      setFaqAnswer("");
           toast.success("The Faq   is Updated  now !", {
                          position: "top-right",
                        });
                        return;
      });
      SetError({
          subject: "",
      faqQuestion: "",
      faqAnswer: "",
      });


    } catch (error) {
      alert("Error: " + error.response?.data?.error || error.message);
    }
  };
    }
  return (
    <>
      <Admin_Index></Admin_Index>
     <div className="container my-5 d-flex justify-content-center">
  <div className="card shadow p-4" style={{ maxWidth: "600px", width: "100%" }}>
    <h2 className="mb-4 text-center">Update FAQ</h2>

    <form onSubmit={handleSubmit}>
  
      <div className="mb-3">
        <label className="form-label">FAQ Subject</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Subject"
          name="subject"
          value={form.subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        {error.subject && <span className="text-danger">{error.subject}</span>}
      </div>

    
      <div className="mb-3">
        <label className="form-label">FAQ Question</label>
        <textarea
          className="form-control"
          name="faqQuestion"
          placeholder="Enter Question"
          value={form.faqQuestion}
          onChange={(e) => setFaqQuestion(e.target.value)}
          rows="3"
        ></textarea>
        {error.faqQuestion && (
          <span className="text-danger">{error.faqQuestion}</span>
        )}
      </div>

   
      <div className="mb-3">
        <label className="form-label">FAQ Answer</label>
        <textarea
          className="form-control"
          name="faqAnswer"
          placeholder="Enter Answer"
          value={form.faqAnswer}
          onChange={(e) => setFaqAnswer(e.target.value)}
          rows="4"
        ></textarea>
        {error.faqAnswer && (
          <span className="text-danger">{error.faqAnswer}</span>
        )}
      </div>

      {/* Submit Button */}
      <div className="text-end">
        <button type="submit" className="btn btn-primary px-4">
          Save
        </button>
      </div>
    </form>
  </div>
</div>

    </>
  )
}

export default EditFaq
