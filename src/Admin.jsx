
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Admin.css'

function Admin() {
  const [reports, setReports] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    loadReports()
  }, [])

  function loadReports() {
    const savedReports = JSON.parse(
      localStorage.getItem('campusReports') || '[]'
    )
    setReports(savedReports)
  }

  // Admin Logout
  function handleLogout() {
    sessionStorage.removeItem('adminLoggedIn')
    navigate('/admin-login')
  }

  function updateIssue(id, field, value) {
    const updatedReports = reports.map((report) =>
      report.id === id
        ? { ...report, [field]: value }
        : report
    )

    setReports(updatedReports)

    localStorage.setItem(
      'campusReports',
      JSON.stringify(updatedReports)
    )
  }

  const pendingCount = reports.filter(
    (report) => report.status === 'Pending'
  ).length

  const progressCount = reports.filter(
    (report) => report.status === 'In Progress'
  ).length

  const resolvedCount = reports.filter(
    (report) => report.status === 'Resolved'
  ).length

  return (
    <div className="admin-page">
      <div className="admin-heading">
        <h1>Admin Dashboard</h1>
        <p>Manage and monitor campus complaints.</p>

        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#dc3545',
            color: 'white',
            padding: '10px 22px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            marginTop: '12px'
          }}
        >
          Logout
        </button>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Issues</h3>
          <h2>{reports.length}</h2>
        </div>

        <div className="stat-card pending">
          <h3>Pending</h3>
          <h2>{pendingCount}</h2>
        </div>

        <div className="stat-card progress">
          <h3>In Progress</h3>
          <h2>{progressCount}</h2>
        </div>

        <div className="stat-card resolved">
          <h3>Resolved</h3>
          <h2>{resolvedCount}</h2>
        </div>
      </div>

      <div className="admin-table-container">
        <h2>Student Reports</h2>

        {reports.length === 0 ? (
          <p className="no-reports">
            No complaints submitted yet.
          </p>
        ) : (
          <div className="table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Issue ID</th>
                  <th>Student</th>
                  <th>Department</th>
                  <th>Category</th>
                  <th>Problem</th>
                  <th>Priority</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td>{report.id}</td>
                    <td>{report.studentName}</td>
                    <td>{report.department}</td>
                    <td>{report.category}</td>
                    <td>{report.problem}</td>

                    <td>
                      <select
                        value={report.priority || 'Medium'}
                        onChange={(event) =>
                          updateIssue(
                            report.id,
                            'priority',
                            event.target.value
                          )
                        }
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </td>

                    <td>
                      <select
                        value={report.status}
                        onChange={(event) =>
                          updateIssue(
                            report.id,
                            'status',
                            event.target.value
                          )
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin
