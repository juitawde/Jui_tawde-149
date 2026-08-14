import { Hospital, MapPin, Pencil, Trash2, CheckCircle2, AlertCircle } from "lucide-react";

function HospitalCard({
  hospital,
  onEdit,
  onDelete
}) {
  const hasBeds = hospital.availableBeds > 0;
  const progressPercent = hospital.totalBeds > 0 
    ? Math.min(100, Math.max(0, (hospital.availableBeds / hospital.totalBeds) * 100))
    : 0;

  return (
    <div className="hospital-card">
      <div>
        <div className="hospital-header">
          <div className="hospital-icon-wrapper">
            <Hospital size={20} />
          </div>

          <div className="hospital-title">
            <h3>{hospital.name}</h3>
            <p className="city">
              <MapPin size={13} />
              <span>{hospital.city}</span>
            </p>
          </div>
        </div>

        <div className="capacity-box">
          <div className="capacity-labels">
            <span>Available Capacity</span>
            <span>
              <strong>{hospital.availableBeds}</strong> / {hospital.totalBeds} Beds
            </span>
          </div>

          <div className="capacity-bar">
            <div 
              className="capacity-fill" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <div className={`badge ${hasBeds ? "available" : "unavailable"}`}>
            {hasBeds ? (
              <>
                <CheckCircle2 size={12} />
                <span>Beds Available</span>
              </>
            ) : (
              <>
                <AlertCircle size={12} />
                <span>No Beds Available</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="card-actions">
        <button
          className="icon-action-btn edit"
          onClick={() => onEdit(hospital)}
          title="Edit Hospital"
        >
          <Pencil size={15} />
        </button>

        <button
          className="icon-action-btn delete"
          onClick={() => onDelete(hospital._id)}
          title="Delete Hospital"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}

export default HospitalCard;