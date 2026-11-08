import { useState } from 'react'
import './Track.css'

function Track() {
  const [issueId, setIssueId] = useState('')
  const [issue, setIssue] = useState(null)
  const [message, setMessage] = useState('')

  function handleTrack(event) {
    event.preventDefault()

    const reports = JSON.parse(
      localStorage.getItem('campusReports') || '[]'
    )

    const foundIssue = reports.find(
      (report) =>
        report.id.toLowerCase() === issueId.trim().toLowerCase()
    )

    if (foundIssue) {
      setIssue(foundIssue)
      setMessage('')
    } else {
      setIssue(null)
      setMessage('Issue ID not found. Please check and try again.')
    }
  }

  return (
    <div className="track-page">
      <div className="track-heading">
        <h1>Track Your Issue</h1>
        <p>Enter your Issue ID to check the current status.</p>
      </div>

      <form className="track-form" onSubmit={handleTrack}>
        <label>Issue ID</label>

        <input
          type="text"
          placeholder="Example: CP123456"
          value={issueId}
          onChange={(event) => setIssueId(event.target.value)}
          required
        />

        <button type="submit">Track Issue</button>

        {message && <p className="error-message">{message}</p>}
      </form>

      {issue && (
        <div className="issue-result">
          <h2>Issue Details</h2>

          <p><strong>Issue ID:</strong> {issue.id}</p>
          <p><strong>Student:</strong> {issue.studentName}</p>
          <p><strong>Department:</strong> {issue.department}</p>
          <p><strong>Category:</strong> {issue.category}</p>
          <p><strong>Problem:</strong> {issue.problem}</p>
          <p><strong>Date:</strong> {issue.date}</p>

          <div className="status-box">
            <strong>Current Status</strong>
            <h3>{issue.status}</h3>
          </div>
        </div>
      )}
    </div>
  )
}

export default Track