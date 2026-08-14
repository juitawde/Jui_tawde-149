import { useEffect, useState } from "react";
import { Building2, MapPin, Bed } from "lucide-react";

function HospitalForm({
  hospital,
  onSubmit,
  onCancel
}) {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    totalBeds: "",
    availableBeds: ""
  });

  useEffect(() => {
    if (hospital) {
      setFormData({
        name: hospital.name,
        city: hospital.city,
        totalBeds: hospital.totalBeds,
        availableBeds: hospital.availableBeds
      });
    } else {
      setFormData({
        name: "",
        city: "",
        totalBeds: "",
        availableBeds: ""
      });
    }
  }, [hospital]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      name: formData.name,
      city: formData.city,
      totalBeds: Number(formData.totalBeds),
      availableBeds: Number(formData.availableBeds)
    });
  };

  return (
    <div className="modal-card">
      <div className="modal-header">
        <div>
          <h2>{hospital ? "Update Hospital" : "Add New Hospital"}</h2>
          <p>
            {hospital
              ? "Modify details of this registered healthcare facility."
              : "Register a new healthcare facility and configure initial bed capacity."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form-layout">
        <div className="input-group">
          <label>Hospital Name</label>
          <div className="input-wrapper">
            <Building2 size={16} />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter hospital name"
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label>City</label>
          <div className="input-wrapper">
            <MapPin size={16} />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label>Total Beds</label>
            <div className="input-wrapper">
              <Bed size={16} />
              <input
                type="number"
                name="totalBeds"
                value={formData.totalBeds}
                onChange={handleChange}
                placeholder="0"
                min="0"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Available Beds</label>
            <div className="input-wrapper">
              <Bed size={16} />
              <input
                type="number"
                name="availableBeds"
                value={formData.availableBeds}
                onChange={handleChange}
                placeholder="0"
                min="0"
                required
              />
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>
          
          <button type="submit" className="primary-btn">
            {hospital ? "Save Changes" : "Add Hospital"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default HospitalForm;