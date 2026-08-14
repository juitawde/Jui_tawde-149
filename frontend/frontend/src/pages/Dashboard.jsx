import { useEffect, useState } from "react";
import {
  getHospitals,
  getAvailableHospitals
} from "../api";
import {
  Hospital,
  Building2,
  Bed,
  Database,
  ShieldCheck,
  Lock,
  ArrowUpRight,
  Users,
  HeartPulse,
  MapPin,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

function Dashboard() {
  const [hospitals, setHospitals] = useState([]);
  const [total, setTotal] = useState(0);
  const [available, setAvailable] = useState(0);
  const [beds, setBeds] = useState(0);
  const [totalBedsCount, setTotalBedsCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const hospitalsData = await getHospitals();
        const availableHospitals = await getAvailableHospitals();

        setHospitals(hospitalsData);
        setTotal(hospitalsData.length);
        setAvailable(availableHospitals.length);

        const totalAvailableBeds = hospitalsData.reduce(
          (sum, hospital) => sum + hospital.availableBeds,
          0
        );
        const sumTotalBeds = hospitalsData.reduce(
          (sum, hospital) => sum + hospital.totalBeds,
          0
        );

        setBeds(totalAvailableBeds);
        setTotalBedsCount(sumTotalBeds);
        
        const now = new Date();
        setLastUpdated(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  const occupiedBeds = totalBedsCount - beds;
  const occupiedPercent = totalBedsCount > 0 
    ? Math.round((occupiedBeds / totalBedsCount) * 100) 
    : 0;
  
  // Circumference of radius 70 is 2 * pi * 70 = ~439.8
  const strokeDashoffset = 440 - (440 * occupiedPercent) / 100;

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
      <div className="dashboard-header">
        <div>
          <div className="eyebrow">
            <div className="eyebrow-accent"></div>
            <span>Overview</span>
          </div>

          <h1>Dashboard</h1>

          <p>
            Monitor live bed availability, manage registry database records, and audit clinic capacity.
          </p>
        </div>

        {lastUpdated && (
          <div className="status-badge">
            <div className="status-dot"></div>
            <span>Sync Live: {lastUpdated}</span>
          </div>
        )}
      </div>

      {/* Dribbble Style top Metrics Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-top">
            <span className="stat-label">Total Beds</span>
            <div className="stat-icon purple" style={{ color: "var(--primary)", background: "var(--primary-light)" }}>
              <Bed size={20} />
            </div>
          </div>
          <div className="stat-bottom">
            <span className="stat-number">{totalBedsCount}</span>
            <span className="stat-subtext">Across all facilities</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span className="stat-label">Available Beds</span>
            <div className="stat-icon green">
              <HeartPulse size={20} />
            </div>
          </div>
          <div className="stat-bottom">
            <span className="stat-number">{beds}</span>
            <span className="stat-subtext">{totalBedsCount > 0 ? Math.round((beds / totalBedsCount) * 100) : 0}% vacant capacity</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span className="stat-label">Hospitals Registered</span>
            <div className="stat-icon gold">
              <Hospital size={20} />
            </div>
          </div>
          <div className="stat-bottom">
            <span className="stat-number">{total}</span>
            <span className="stat-subtext">{available} accepting patients</span>
          </div>
        </div>
      </div>

      {/* Dribbble style double widgets grid */}
      <div className="dashboard-analytics-grid">
        {/* SVG Circle Progress Widget */}
        <div className="capacity-report-card">
          <h2>Beds Occupancy Report</h2>
          
          <div className="report-ring-container">
            <svg width="160" height="160" viewBox="0 0 160 160">
              <circle 
                cx="80" 
                cy="80" 
                r="65" 
                fill="transparent" 
                stroke="var(--border)" 
                strokeWidth="11" 
              />
              <circle 
                cx="80" 
                cy="80" 
                r="65" 
                fill="transparent" 
                stroke="var(--primary)" 
                strokeWidth="11"
                strokeDasharray="408.4" 
                strokeDashoffset={408.4 - (408.4 * occupiedPercent) / 100}
                strokeLinecap="round" 
                transform="rotate(-90 80 80)" 
                style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }} 
              />
            </svg>
            <div className="report-ring-text">
              <span className="report-ring-percent">{occupiedPercent}%</span>
              <span className="report-ring-label">Occupied</span>
            </div>
          </div>

          <div className="report-legend">
            <div className="legend-item">
              <div className="legend-dot primary"></div>
              <span>Occupied Beds ({occupiedBeds})</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot accent"></div>
              <span>Vacant Beds ({beds})</span>
            </div>
          </div>
        </div>

        {/* Right card: Feature list restructured to show clinical infrastructure specs */}
        <div className="overview-card" style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h2>Clinical System Specs</h2>
            <p>Carevia is powered by high-performance architecture built for secure health record auditing.</p>
          </div>

          <div className="feature-grid">
            <div className="feature-pill">
              <Database size={16} />
              <span>MongoDB Database</span>
            </div>

            <div className="feature-pill">
              <ShieldCheck size={16} />
              <span>Passport Secure Auth</span>
            </div>

            <div className="feature-pill">
              <Lock size={16} />
              <span>Bcrypt Password Hash</span>
            </div>

            <div className="feature-pill">
              <ArrowUpRight size={16} />
              <span>RESTful Endpoint APIs</span>
            </div>

            <div className="feature-pill">
              <Users size={16} />
              <span>Interactive CRUD</span>
            </div>

            <div className="feature-pill">
              <HeartPulse size={16} />
              <span>Live Bed Analytics</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dribbble style bottom details table listing all hospitals */}
      <div className="registry-card">
        <h2 className="registry-title">Hospital Registry Details</h2>
        <div className="registry-table-container">
          <table className="registry-table">
            <thead>
              <tr>
                <th>Facility Name</th>
                <th>City / Location</th>
                <th>Beds Availability</th>
                <th>Capacity Fill</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {hospitals.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", color: "var(--text-muted)", padding: "30px" }}>
                    No hospitals registered yet.
                  </td>
                </tr>
              ) : (
                hospitals.map((hospital) => {
                  const percent = hospital.totalBeds > 0 
                    ? Math.round((hospital.availableBeds / hospital.totalBeds) * 100) 
                    : 0;
                  const hasBeds = hospital.availableBeds > 0;
                  return (
                    <tr key={hospital._id}>
                      <td style={{ fontWeight: 700, color: "var(--text-main)" }}>
                        {hospital.name}
                      </td>
                      <td style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <MapPin size={13} style={{ color: "var(--text-muted)" }} />
                        <span>{hospital.city}</span>
                      </td>
                      <td style={{ fontWeight: 600 }}>
                        {hospital.availableBeds} / {hospital.totalBeds} Beds
                      </td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div className="capacity-bar" style={{ width: "80px", marginBottom: 0 }}>
                            <div className="capacity-fill" style={{ width: `${percent}%` }}></div>
                          </div>
                          <span style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-secondary)" }}>
                            {percent}%
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className={`badge ${hasBeds ? "available" : "unavailable"}`} style={{ padding: "4px 8px", fontSize: "11px" }}>
                          {hasBeds ? (
                            <>
                              <CheckCircle2 size={11} />
                              <span>Beds Available</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle size={11} />
                              <span>Full Capacity</span>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;