

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import API from '../api';

// const ProjectWorkspace = () => {
//   const { id: projectId } = useParams();
//   const navigate = useNavigate();
//   const [tasks, setTasks] = useState([]);
//   const [project, setProject] = useState(null);
//   const [memberName, setMemberName] = useState(''); 
//   const [taskTitle, setTaskTitle] = useState('');
//   const [taskDesc, setTaskDesc] = useState('');
//   const [assignedTo, setAssignedTo] = useState('Unassigned'); // Dropdown select state

//   const fetchData = async () => {
//     try {
//       const taskRes = await API.get(`/tasks/project/${projectId}`);
//       setTasks(taskRes.data);
      
//       const projRes = await API.get('/projects/my-projects');
//       const currentProj = projRes.data.find(p => p._id === projectId);
//       setProject(currentProj);
//     } catch (err) {
//       console.error("Data load karne mein dikkat:", err);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [projectId]);

//   const handleDeleteProject = async () => {
//     if (window.confirm("Kya aap sach mein yeh project delete karna chahte hain?")) {
//       try {
//         await API.delete(`/projects/${projectId}`);
//         alert("Project deleted successfully!");
//         navigate('/dashboard');
//       } catch (err) {
//         alert("Delete karne mein dikkat aayi");
//       }
//     }
//   };

//   const handleAddMember = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await API.post(`/projects/${projectId}/add-member`, { name: memberName });
//       alert(data.message);
//       setMemberName('');
//       fetchData(); 
//     } catch (err) {
//       alert(err.response?.data?.message || 'Member add nahi ho paya');
//     }
//   };

//   const handleCreateTask = async (e) => {
//     e.preventDefault();
//     if (!taskTitle) return;
//     try {
//       const { data } = await API.post('/tasks/create', {
//         projectId,
//         title: taskTitle,
//         description: taskDesc,
//         assignedTo: assignedTo // Dropdown se selected member name jaayega
//       });
//       setTasks([...tasks, data]);
//       setTaskTitle('');
//       setTaskDesc('');
//       setAssignedTo('Unassigned');
//     } catch (err) {
//       alert('Task banane mein dikkat aayi');
//     }
//   };

//   const handleStatusChange = async (taskId, currentStatus) => {
//     let nextStatus = '';
//     if (currentStatus === 'To-Do') nextStatus = 'In Progress';
//     else if (currentStatus === 'In Progress') nextStatus = 'Done';
//     else return;

//     try {
//       const { data } = await API.put(`/tasks/${taskId}/update`, { status: nextStatus });
//       setTasks(prevTasks => prevTasks.map(t => t._id === taskId ? { ...t, status: data.status } : t));
//     } catch (err) {
//       alert('Status update nahi ho paya');
//     }
//   };

//   const getTasksByStatus = (status) => tasks.filter(task => task.status === status);

//   return (
//     <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto', color: '#fff', backgroundColor: '#12141c', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      
//       {/* Header Layout */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//         <button onClick={() => navigate('/dashboard')} style={{ padding: '8px 15px', cursor: 'pointer', background: '#333', color: '#fff', border: 'none', borderRadius: '4px' }}>← Back to Dashboard</button>
//         <button onClick={handleDeleteProject} style={{ padding: '8px 15px', cursor: 'pointer', background: '#DC3545', color: '#fff', border: 'none', borderRadius: '4px' }}>🗑️ Delete Project</button>
//       </div>

//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', marginBottom: '30px' }}>
        
//         {/* LEFT COLUMN: TEAM MEMBERS PANEL */}
//         <div style={{ background: '#1e222d', padding: '20px', borderRadius: '8px' }}>
//           <h4 style={{ margin: '0 0 15px 0', borderBottom: '1px solid #333', paddingBottom: '8px' }}>👥 Team Members List</h4>
          
//           <form onSubmit={handleAddMember} style={{ display: 'flex', gap: '5px', marginBottom: '20px' }}>
//             <input type="text" placeholder="Add Member Name..." value={memberName} onChange={(e) => setMemberName(e.target.value)} required style={{ padding: '8px', flex: '1', background: '#2c313d', border: 'none', color: '#fff', borderRadius: '4px' }} />
//             <button type="submit" style={{ background: '#007BFF', color: 'white', border: 'none', padding: '8px 15px', cursor: 'pointer', borderRadius: '4px' }}>Add</button>
//           </form>

//           {/* Render Active Names List */}
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//             <div style={{ padding: '8px', background: '#28A745', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold' }}>⭐ Owner (You)</div>
//             {project?.members && project.members.map((m, idx) => (
//               <div key={idx} style={{ padding: '8px', background: '#2c313d', borderRadius: '4px', fontSize: '14px' }}>
//                 👤 {m}
//               </div>
//             ))}
//             {(!project?.members || project.members.length === 0) && <p style={{ fontSize: '13px', color: '#aaa' }}>No team members added yet.</p>}
//           </div>
//         </div>

//         {/* RIGHT COLUMN: CREATE TASK FORM */}
//         <div style={{ background: '#1e222d', padding: '20px', borderRadius: '8px' }}>
//           <h4 style={{ margin: '0 0 15px 0', borderBottom: '1px solid #333', paddingBottom: '8px' }}>📝 Create New Task</h4>
//           <form onSubmit={handleCreateTask} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//             <div style={{ display: 'flex', gap: '10px' }}>
//               <input type="text" placeholder="Task Title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} required style={{ padding: '10px', flex: '1', background: '#2c313d', border: 'none', color: '#fff', borderRadius: '4px' }} />
//               <input type="text" placeholder="Description" value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)} style={{ padding: '10px', flex: '1', background: '#2c313d', border: 'none', color: '#fff', borderRadius: '4px' }} />
//             </div>

//             {/* DYNAMIC MEMBER DROPDOWN SELECT */}
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
//               <label style={{ fontSize: '13px', color: '#aaa' }}>Assign Task To:</label>
//               <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} style={{ padding: '10px', background: '#2c313d', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>
//                 <option value="Unassigned">Leave Unassigned</option>
//                 <option value="Owner (You)">Owner (You)</option>
//                 {project?.members && project.members.map((m, idx) => (
//                   <option key={idx} value={m}>{m}</option>
//                 ))}
//               </select>
//             </div>

//             <button type="submit" style={{ background: '#28A745', color: 'white', border: 'none', padding: '12px', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}>+ Create & Assign Task</button>
//           </form>
//         </div>
//       </div>

//       <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>📊 Kanban Board & Member Progress</h3>
      
//       {/* Kanban Columns */}
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
//         {['To-Do', 'In Progress', 'Done'].map((status) => (
//           <div key={status} style={{ background: '#1e222d', padding: '15px', borderRadius: '8px', minHeight: '450px' }}>
//             <h4 style={{ borderBottom: '2px solid #333', paddingBottom: '10px', textAlign: 'center', color: '#aaa' }}>{status}</h4>
            
//             {getTasksByStatus(status).map((task) => (
//               <div key={task._id} style={{ background: '#2c313d', padding: '15px', borderRadius: '6px', marginBottom: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
//                 <h5 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#fff' }}>{task.title}</h5>
//                 <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#aaa' }}>{task.description}</p>
                
//                 {/* ASSIGNED MEMBER AT THE BOTTOM OF THE CARD */}
//                 <div style={{ margin: '0 0 10px 0', fontSize: '12px', background: '#12141c', padding: '5px 8px', borderRadius: '4px', display: 'inline-block', color: '#007BFF' }}>
//                   👤 Assigned to: <strong style={{ color: '#fff' }}>{task.assignedTo}</strong>
//                 </div>
                
//                 <br />
//                 {status !== 'Done' && (
//                   <button 
//                     onClick={() => handleStatusChange(task._id, task.status)}
//                     style={{ fontSize: '12px', background: '#444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
//                     Move Next →
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProjectWorkspace;













import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

const ProjectWorkspace = () => {
  const { id: projectId } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState(null);
  const [memberName, setMemberName] = useState(''); 
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [assignedTo, setAssignedTo] = useState('Unassigned');

  // Fetch single project data and its tasks
  const fetchData = async () => {
    try {
      // 1. Get tasks for this project
      const taskRes = await API.get(`/tasks/project/${projectId}`);
      setTasks(taskRes.data);
      
      // 2. Get this single project details freshly from backend
      const projRes = await API.get(`/projects/${projectId}`);
      setProject(projRes.data);
    } catch (err) {
      console.error("Data load karne mein dikkat:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [projectId]);

  const handleDeleteProject = async () => {
    if (window.confirm("Kya aap sach mein yeh project delete karna chahte hain?")) {
      try {
        await API.delete(`/projects/${projectId}`);
        alert("Project deleted successfully!");
        navigate('/dashboard');
      } catch (err) {
        alert("Delete karne mein dikkat aayi");
      }
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!memberName.trim()) return;
    try {
      const { data } = await API.post(`/projects/${projectId}/add-member`, { name: memberName.trim() });
      alert(data.message);
      setMemberName('');
      fetchData(); // Immediately updates members list and dropdown!
    } catch (err) {
      alert(err.response?.data?.message || 'Member add nahi ho paya');
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!taskTitle) return;
    try {
      const { data } = await API.post('/tasks/create', {
        projectId,
        title: taskTitle,
        description: taskDesc,
        assignedTo: assignedTo 
      });
      setTasks([...tasks, data]);
      setTaskTitle('');
      setTaskDesc('');
      setAssignedTo('Unassigned');
    } catch (err) {
      alert('Task banane mein dikkat aayi');
    }
  };

  const handleStatusChange = async (taskId, currentStatus) => {
    let nextStatus = '';
    if (currentStatus === 'To-Do') nextStatus = 'In Progress';
    else if (currentStatus === 'In Progress') nextStatus = 'Done';
    else return;

    try {
      const { data } = await API.put(`/tasks/${taskId}/update`, { status: nextStatus });
      setTasks(prevTasks => prevTasks.map(t => t._id === taskId ? { ...t, status: data.status } : t));
    } catch (err) {
      alert('Status update nahi ho paya');
    }
  };

  const getTasksByStatus = (status) => tasks.filter(task => task.status === status);

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto', color: '#fff', backgroundColor: '#12141c', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Header Layout */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button onClick={() => navigate('/dashboard')} style={{ padding: '8px 15px', cursor: 'pointer', background: '#333', color: '#fff', border: 'none', borderRadius: '4px' }}>← Back to Dashboard</button>
        <button onClick={handleDeleteProject} style={{ padding: '8px 15px', cursor: 'pointer', background: '#DC3545', color: '#fff', border: 'none', borderRadius: '4px' }}>🗑️ Delete Project</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', marginBottom: '30px' }}>
        
        {/* LEFT COLUMN: TEAM MEMBERS PANEL */}
        <div style={{ background: '#1e222d', padding: '20px', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 15px 0', borderBottom: '1px solid #333', paddingBottom: '8px' }}>👥 Team Members List</h4>
          
          <form onSubmit={handleAddMember} style={{ display: 'flex', gap: '5px', marginBottom: '20px' }}>
            <input type="text" placeholder="Add Member Name..." value={memberName} onChange={(e) => setMemberName(e.target.value)} required style={{ padding: '8px', flex: '1', background: '#2c313d', border: 'none', color: '#fff', borderRadius: '4px' }} />
            <button type="submit" style={{ background: '#007BFF', color: 'white', border: 'none', padding: '8px 15px', cursor: 'pointer', borderRadius: '4px' }}>Add</button>
          </form>

          {/* Render Active Names List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ padding: '8px', background: '#28A745', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold' }}>⭐ Owner (You)</div>
            {project?.members && project.members.map((m, idx) => (
              <div key={idx} style={{ padding: '8px', background: '#2c313d', borderRadius: '4px', fontSize: '14px' }}>
                👤 {m}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: CREATE TASK FORM */}
        <div style={{ background: '#1e222d', padding: '20px', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 15px 0', borderBottom: '1px solid #333', paddingBottom: '8px' }}>📝 Create New Task</h4>
          <form onSubmit={handleCreateTask} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="text" placeholder="Task Title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} required style={{ padding: '10px', flex: '1', background: '#2c313d', border: 'none', color: '#fff', borderRadius: '4px' }} />
              <input type="text" placeholder="Description" value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)} style={{ padding: '10px', flex: '1', background: '#2c313d', border: 'none', color: '#fff', borderRadius: '4px' }} />
            </div>

            {/* MEMBER DROPDOWN SELECT */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '13px', color: '#aaa' }}>Assign Task To:</label>
              <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} style={{ padding: '10px', background: '#2c313d', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>
                <option value="Unassigned">Leave Unassigned</option>
                <option value="Owner (You)">Owner (You)</option>
                {project?.members && project.members.map((m, idx) => (
                  <option key={idx} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <button type="submit" style={{ background: '#28A745', color: 'white', border: 'none', padding: '12px', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}>+ Create & Assign Task</button>
          </form>
        </div>
      </div>

      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>📊 Kanban Board & Member Progress</h3>
      
      {/* Kanban Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {['To-Do', 'In Progress', 'Done'].map((status) => (
          <div key={status} style={{ background: '#1e222d', padding: '15px', borderRadius: '8px', minHeight: '450px' }}>
            <h4 style={{ borderBottom: '2px solid #333', paddingBottom: '10px', textAlign: 'center', color: '#aaa' }}>{status}</h4>
            
            {getTasksByStatus(status).map((task) => (
              <div key={task._id} style={{ background: '#2c313d', padding: '15px', borderRadius: '6px', marginBottom: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
                <h5 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#fff' }}>{task.title}</h5>
                <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#aaa' }}>{task.description}</p>
                
                {/* ASSIGNED MEMBER INFO */}
                <div style={{ margin: '0 0 10px 0', fontSize: '12px', background: '#12141c', padding: '5px 8px', borderRadius: '4px', display: 'inline-block', color: '#007BFF' }}>
                  👤 Assigned to: <strong style={{ color: '#fff' }}>{task.assignedTo}</strong>
                </div>
                
                <br />
                {status !== 'Done' && (
                  <button 
                    onClick={() => handleStatusChange(task._id, task.status)}
                    style={{ fontSize: '12px', background: '#444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                    Move Next →
                  </button>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectWorkspace;