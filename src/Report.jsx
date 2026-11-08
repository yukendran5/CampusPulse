
import { useState } from 'react'
import './Report.css'

function Report() {
  const [formData, setFormData] = useState({
    studentName: '',
    department: '',
    category: '',
    problem: ''
  })

  function handleChange(event) {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newIssue = {
      id: 'CP' + Date.now(),
      ...formData,
      status: 'Pending',
      priority: 'Medium',
      date: new Date().toLocaleString()
    }

    const reports = JSON.parse(
      localStorage.getItem('campusReports') || '[]'
    )

    reports.push(newIssue)

    localStorage.setItem(
      'campusReports',
      JSON.stringify(reports)
    )

    alert('Your issue has been submitted successfully!')

    setFormData({
      studentName: '',
      department: '',
      category: '',
      problem: ''
    })

    alert('Your Issue ID: ' + newIssue.id)
  }

  return (
    <div className="report-page">

      <div className="report-heading">
        <h1>Report a Campus Issue</h1>
        <p>Help us make your campus a better place.</p>
      </div>

      <form className="report-form" onSubmit={handleSubmit}>

        <label>Student Name</label>
        <input
          type="text"
          name="studentName"
          placeholder="Enter your name"
          value={formData.studentName}
          onChange={handleChange}
          required
        />

        <label>Department</label>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        >
          <option value="">Select Department</option>
          <option value="CSE">Computer Science</option>
          <option value="ECE">Electronics</option>
          <option value="EEE">Electrical</option>
          <option value="MECH">Mechanical</option>
          <option value="CIVIL">Civil</option>
          <option value="IT">Information Technology</option>
        </select>

        <label>Issue Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Issue Category</option>
          <option value="Infrastructure">Infrastructure</option>
          <option value="Electrical">Electrical</option>
          <option value="Water">Water Problem</option>
          <option value="Cleanliness">Cleanliness</option>
          <option value="Network">Internet / Network</option>
          <option value="Other">Other</option>
        </select>

        <label>Describe Your Problem</label>
        <textarea
          name="problem"
          placeholder="Explain your campus issue..."
          value={formData.problem}
          onChange={handleChange}
          rows="5"
          required
        />

        <button type="submit" className="submit-report">
          Submit Report
        </button>

      </form>
    </div>
  )
}

export default Report
