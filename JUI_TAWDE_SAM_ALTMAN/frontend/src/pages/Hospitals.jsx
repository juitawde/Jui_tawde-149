import { useEffect, useState } from "react";

import {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital
} from "../api";

import HospitalCard from "../components/HospitalCard";
import HospitalForm from "../components/HospitalForm";
import { Plus, Search, Building2, Trash2, LoaderCircle } from "lucide-react";

function Hospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [editingHospital, setEditingHospital] =
    useState(null);

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBeds, setFilterBeds] = useState("all"); // "all" | "available"
  const [deletingHospital, setDeletingHospital] = useState(null);

  const loadHospitals = async () => {
    try {
      const data = await getHospitals();

      setHospitals(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHospitals();
  }, []);

  const handleAdd = async (hospital) => {
    try {
      await createHospital(hospital);

      alert("Hospital added successfully");

      setShowForm(false);

      loadHospitals();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleUpdate = async (hospital) => {
    try {
      await updateHospital(
        editingHospital._id,
        hospital
      );

      alert("Hospital updated successfully");

      setEditingHospital(null);
      setShowForm(false);

      loadHospitals();
    } catch (error) {
      alert(error.message);
    }
  };

  const executeDelete = async (id) => {
    try {
      await deleteHospital(id);

      alert("Hospital deleted successfully");

      loadHospitals();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEdit = (hospital) => {
    setEditingHospital(hospital);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingHospital(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <LoaderCircle className="spinner" size={32} />
        <span>Loading hospitals...</span>
      </div>
    );
  }

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch =
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBeds = filterBeds === "all" || hospital.availableBeds > 0;

    return matchesSearch && matchesBeds;
  });

  return (
    <main className="main-container">
      <div className="page-header">
        <div>
          <div className="eyebrow">
            <div className="eyebrow-accent"></div>
            <span>Overview</span>
          </div>

          <h1>Hospitals</h1>

          <p>
            Manage hospital information and bed
            availability.
          </p>
        </div>

        {!showForm && (
          <button
            className="primary-btn"
            onClick={() => {
              setEditingHospital(null);
              setShowForm(true);
            }}
          >
            <Plus size={16} />
            <span>Add Hospital</span>
          </button>
        )}
      </div>

      <div className="toolbar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search hospitals by name or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <button
            className={`filter-btn ${filterBeds === "all" ? "active" : ""}`}
            onClick={() => setFilterBeds("all")}
          >
            All hospitals
          </button>
          
          <button
            className={`filter-btn ${filterBeds === "available" ? "active" : ""}`}
            onClick={() => setFilterBeds("available")}
          >
            Available beds
          </button>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={handleCancel}>
          <div onClick={(e) => e.stopPropagation()}>
            <HospitalForm
              hospital={editingHospital}
              onSubmit={
                editingHospital
                  ? handleUpdate
                  : handleAdd
              }
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}

      {deletingHospital && (
        <div className="modal-overlay" onClick={() => setDeletingHospital(null)}>
          <div className="modal-card danger-modal" onClick={(e) => e.stopPropagation()}>
            <div className="danger-icon-badge">
              <Trash2 size={24} />
            </div>
            <h2>Delete Hospital?</h2>
            <p style={{ margin: "12px 0 24px 0", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Are you sure you want to delete <strong>{deletingHospital.name}</strong>? This action cannot be undone.
            </p>
            <div className="modal-actions" style={{ justifyContent: "center" }}>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setDeletingHospital(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="danger-btn"
                onClick={() => {
                  executeDelete(deletingHospital._id);
                  setDeletingHospital(null);
                }}
              >
                Delete Hospital
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="hospital-grid">
        {filteredHospitals.length === 0 ? (
          <div className="empty-state" style={{ gridColumn: "1 / -1" }}>
            <div className="empty-icon">
              <Building2 size={24} />
            </div>
            <h3>No hospitals found</h3>
            <p>
              {searchTerm || filterBeds !== "all"
                ? "Try adjusting your search criteria or add a new hospital."
                : "Add your first hospital to start monitoring bed availability."}
            </p>
            {!showForm && (
              <button
                className="primary-btn"
                onClick={() => {
                  setEditingHospital(null);
                  setShowForm(true);
                }}
                style={{ margin: "0 auto" }}
              >
                <Plus size={16} />
                <span>Add Hospital</span>
              </button>
            )}
          </div>
        ) : (
          filteredHospitals.map((hospital) => (
            <HospitalCard
              key={hospital._id}
              hospital={hospital}
              onEdit={handleEdit}
              onDelete={(id) => {
                const target = hospitals.find((h) => h._id === id);
                setDeletingHospital(target);
              }}
            />
          ))
        )}
      </div>
    </main>
  );
}

export default Hospitals;