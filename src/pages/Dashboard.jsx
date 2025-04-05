import React, { useState, useEffect } from "react";
import { Trash2, Plus, CheckCircle, CheckSquare, Square, Calendar, Sun, Star, Activity } from "lucide-react";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);
  const [greeting, setGreeting] = useState("Good morning"); 
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '1.5rem',
      fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
    cardContainer: {
      width: '100%',
      maxWidth: '36rem',
      background: 'white',
      borderRadius: '1.5rem',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.05)',
      padding: '2rem',
      marginTop: '1rem',
      transition: 'transform 0.3s ease',
    },
    header: {
      marginBottom: '2rem',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '1rem',
      padding: '1.5rem',
      background: 'linear-gradient(to right, #4776E6, #8E54E9)',
    },
    headerCircle: {
      position: 'absolute',
      top: '0',
      right: '0',
      opacity: '0.1',
    },
    headerTop: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '0.5rem',
    },
    headerDate: {
      background: 'rgba(255, 255, 255, 0.2)',
      color: 'white',
      fontSize: '0.875rem',
      padding: '0.25rem 1rem',
      borderRadius: '9999px',
      fontWeight: '500',
      backdropFilter: 'blur(4px)',
    },
    headerTitle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '1rem 0',
    },
    appTitle: {
      fontSize: '2.25rem',
      fontWeight: '700',
      color: 'white',
      letterSpacing: '-0.025em',
      margin: '0 0 0 0.75rem',
    },
    motivationalQuote: {
      textAlign: 'center',
      color: 'rgba(255,255,255,0.8)',
      fontSize: '0.875rem',
      fontStyle: 'italic',
    },
    inputContainer: {
      display: 'flex',
      marginBottom: '2.5rem',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      borderRadius: '0.75rem',
      overflow: 'hidden',
      border: '2px solid rgba(129, 140, 248, 0.1)',
    },
    input: {
      flexGrow: '1',
      padding: '1rem',
      border: '0',
      outline: 'none',
      color: '#374151',
      fontSize: '1.125rem',
      '::placeholder': {
        color: '#9CA3AF',
      },
    },
    addButton: {
      background: 'linear-gradient(to right, #4F46E5, #8B5CF6)',
      color: 'white',
      padding: '1rem 1.5rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'opacity 0.3s',
      display: 'flex',
      alignItems: 'center',
    },
    progressContainer: {
      marginBottom: '2rem',
      background: '#EEF2FF',
      padding: '1.5rem',
      borderRadius: '1rem',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
    },
    progressHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0.5rem',
    },
    progressTitle: {
      fontSize: '0.9375rem',
      fontWeight: '500',
      color: '#3730A3',
    },
    progressBadge: {
      fontSize: '0.75rem',
      background: '#E0E7FF',
      color: '#4F46E5',
      fontWeight: '500',
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
    },
    progressBar: {
      width: '100%',
      background: '#E5E7EB',
      borderRadius: '9999px',
      height: '0.75rem',
      marginBottom: '0.25rem',
    },
    progressFill: {
      background: 'linear-gradient(to right, #4F46E5, #8B5CF6)',
      height: '0.75rem',
      borderRadius: '9999px',
      transition: 'width 0.5s ease',
    },
    progressText: {
      display: 'flex',
      justifyContent: 'flex-end',
      fontSize: '0.75rem',
      color: '#818CF8',
    },
    sectionTitle: {
      fontWeight: '600',
      fontSize: '1.125rem',
      color: '#374151',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
    },
    sectionIcon: {
      height: '2rem',
      width: '2rem',
      borderRadius: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '0.5rem',
    },
    taskList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
    },
    taskItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem',
      background: 'white',
      borderLeft: '4px solid #6366F1',
      borderTop: '1px solid #E5E7EB',
      borderRight: '1px solid #E5E7EB',
      borderBottom: '1px solid #E5E7EB',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s ease',
    },
    taskItemCompleted: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem',
      background: '#F9FAFB',
      borderLeft: '4px solid #10B981',
      borderTop: '1px solid #E5E7EB',
      borderRight: '1px solid #E5E7EB',
      borderBottom: '1px solid #E5E7EB',
      borderRadius: '0.5rem',
      transition: 'all 0.3s ease',
    },
    taskItemContent: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    taskCheckButton: {
      marginRight: '1rem',
      height: '1.5rem',
      width: '1.5rem',
      borderRadius: '9999px',
      background: '#E0E7FF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color 0.3s',
      border: 'none',
      cursor: 'pointer',
    },
    taskText: {
      color: '#1F2937',
      fontWeight: '500',
    },
    taskTextCompleted: {
      color: '#6B7280',
      textDecoration: 'line-through',
    },
    taskDeleteButton: {
      color: '#9CA3AF',
      transition: 'color 0.3s, background-color 0.3s',
      marginLeft: '0.5rem',
      padding: '0.5rem',
      borderRadius: '9999px',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
    },
    emptyState: {
      textAlign: 'center',
      padding: '3rem 0',
      background: 'linear-gradient(to right, #EEF2FF, #F5F3FF)',
      borderRadius: '0.75rem',
      marginBottom: '2rem',
      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
      position: 'relative',
      overflow: 'hidden',
    },
    emptyStateIcon: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '1rem',
    },
    emptyStateIconCircle: {
      height: '4rem',
      width: '4rem',
      borderRadius: '9999px',
      background: '#E0E7FF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyStateTitle: {
      fontWeight: '500',
      color: '#374151',
      fontSize: '1.125rem',
    },
    emptyStateText: {
      color: '#6B7280',
      marginTop: '0.5rem',
    },
    footer: {
      marginTop: '2.5rem',
      paddingTop: '1rem',
      borderTop: '1px solid #E5E7EB',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    footerText: {
      fontSize: '0.875rem',
      color: '#6B7280',
    },
    footerBadge: {
      display: 'flex',
      alignItems: 'center',
      background: '#4F46E5',
      color: 'white',
      fontSize: '0.875rem',
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
    },
  };

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const completeTask = (index) => {
    const completedTask = tasks[index];
    setCompletedTasks([...completedTasks, completedTask]);
    deleteTask(index);
  };

  const deleteCompletedTask = (index) => {
    const newCompletedTasks = completedTasks.filter((_, i) => i !== index);
    setCompletedTasks(newCompletedTasks);
  };

  const getMotivationalQuote = () => {
    const quotes = [
      "The secret of getting ahead is getting started.",
      "Don't wait. The time will never be just right.",
      "Small progress is still progress.",
      "Focus on being productive instead of busy.",
      "The key is not to prioritize what's on your schedule, but to schedule your priorities."
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  return (
    <div style={styles.container}>
      <div style={styles.cardContainer}>
        <div style={styles.header}>
          <div style={styles.headerCircle}>
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              <circle cx="60" cy="60" r="40" stroke="white" strokeWidth="20" />
            </svg>
          </div>
          <div style={styles.headerTop}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Sun color="white" style={{ marginRight: '0.75rem' }} size={24} />
              <h2 style={{ fontSize: '1.25rem', fontWeight: '500', color: 'white', margin: 0 }}>{greeting}!</h2>
            </div>
            <div style={styles.headerDate}>
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </div>
          </div>
          <div style={styles.headerTitle}>
            <Activity color="white" size={32} />
            <h1 style={styles.appTitle}>TaskFlow</h1>
          </div>
          <p style={styles.motivationalQuote}>"{getMotivationalQuote()}"</p>
        </div>
        <div style={styles.inputContainer}>
          <input
            type="text"
            placeholder="What needs to be done today?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyPress={handleKeyPress}
            style={styles.input}
          />
          <button 
            onClick={addTask} 
            style={styles.addButton}
          >
            <Plus size={24} />
          </button>
        </div>
        {(tasks.length > 0 || completedTasks.length > 0) && (
          <div style={styles.progressContainer}>
            <div style={styles.progressHeader}>
              <span style={styles.progressTitle}>Your Progress</span>
              <span style={styles.progressBadge}>
                {completedTasks.length}/{tasks.length + completedTasks.length} tasks
              </span>
            </div>
            <div style={styles.progressBar}>
              <div 
                style={{
                  ...styles.progressFill,
                  width: `${tasks.length + completedTasks.length > 0 ? (completedTasks.length / (tasks.length + completedTasks.length) * 100) : 0}%`
                }}
              ></div>
            </div>
            <div style={styles.progressText}>
              <span>
                {Math.round(tasks.length + completedTasks.length > 0 ? (completedTasks.length / (tasks.length + completedTasks.length) * 100) : 0)}% complete
              </span>
            </div>
          </div>
        )}
        {tasks.length > 0 ? (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={styles.sectionTitle}>
              <div style={{ ...styles.sectionIcon, background: '#E0E7FF' }}>
                <Square color="#4F46E5" size={16} />
              </div>
              Pending Tasks
            </h2>
            <div style={styles.taskList}>
              {tasks.map((t, index) => (
                <div key={index} style={styles.taskItem}>
                  <div style={styles.taskItemContent}>
                    <button 
                      onClick={() => completeTask(index)} 
                      style={styles.taskCheckButton}
                    >
                      <CheckSquare size={16} color="#4F46E5" />
                    </button>
                    <span style={styles.taskText}>{t}</span>
                  </div>
                  <button 
                    onClick={() => deleteTask(index)} 
                    style={styles.taskDeleteButton}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = '#EF4444';
                      e.currentTarget.style.backgroundColor = '#FEE2E2';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = '#9CA3AF';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={styles.emptyState}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
              <svg width="100%" height="100%" viewBox="0 0 100 100">
                <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
                  <circle id="pattern-circle" cx="10" cy="10" r="1.6257413380501518" fill="#000"></circle>
                </pattern>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
              </svg>
            </div>
            <div style={styles.emptyStateIcon}>
              <div style={styles.emptyStateIconCircle}>
                <Calendar size={32} color="#818CF8" />
              </div>
            </div>
            <p style={styles.emptyStateTitle}>Your task list is empty</p>
            <p style={styles.emptyStateText}>Time to add something new!</p>
          </div>
        )}
        {completedTasks.length > 0 && (
          <div>
            <h2 style={styles.sectionTitle}>
              <div style={{ ...styles.sectionIcon, background: '#D1FAE5' }}>
                <CheckCircle color="#10B981" size={16} />
              </div>
              Completed Tasks
            </h2>
            <div style={styles.taskList}>
              {completedTasks.map((t, index) => (
                <div key={index} style={styles.taskItemCompleted}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ ...styles.taskCheckButton, background: '#D1FAE5' }}>
                      <CheckCircle size={16} color="#10B981" />
                    </div>
                    <span style={styles.taskTextCompleted}>{t}</span>
                  </div>
                  <button 
                    onClick={() => deleteCompletedTask(index)} 
                    style={styles.taskDeleteButton}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = '#EF4444';
                      e.currentTarget.style.backgroundColor = '#FEE2E2';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = '#9CA3AF';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        <div style={styles.footer}>
          <div style={styles.footerText}>
            {tasks.length > 0 || completedTasks.length > 0 ? 
              `${tasks.length} pending · ${completedTasks.length} completed` : 
              "Let's get productive today!"}
          </div>
          <div style={styles.footerBadge}>
            <Star size={12} color="#FDE68A" style={{ marginRight: '0.25rem' }} />
            <span style={{ fontWeight: '500' }}>By Bhuvan</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;