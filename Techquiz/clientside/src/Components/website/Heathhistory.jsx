import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const HealthHistory = () => {
  const [healthRecords, setHealthRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
var {petId}=useParams()
  useEffect(() => {

    const fetchHealthHistory = async () => {
      const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/healthHistory/${petId}`
        );
        setHealthRecords(response.data)
        console.log(response.data)
    };

    fetchHealthHistory();
  }, [petId]);

  return (
    <div className="health-history">
      <h3 className="mb-3">Health History</h3>
      {healthRecords.length === 0 ? (
        <p>No health records found for this pet.</p>
      ) : (
        <ul className="list-group">
          {healthRecords.map((record) => (
            <li key={record._id} className="list-group-item">
              <strong>Treatment:</strong> {record.treatment} <br />
              <strong>Diagnosis:</strong> {record.diagnosis} <br />
              <strong>Veterinarian:</strong>{record.vet_name}
     
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HealthHistory;
