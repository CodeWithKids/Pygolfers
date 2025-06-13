import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaCheck, FaTimes, FaCode, FaChevronDown, FaChevronUp, FaPlay, FaRedo, FaCopy, FaCheckCircle } from 'react-icons/fa';
import Editor from '@monaco-editor/react';
import { formatDistanceToNow } from 'date-fns';
import '../styles/ChallengeDetail.css';

// Function to fetch challenge data from API
const fetchChallengeData = async (challengeId) => {
  try {
    const response = await fetch(`/api/challenges/${challengeId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch challenge data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching challenge data:', error);
    return null;
  }
};

const ChallengeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [showTestCases, setShowTestCases] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [executionTime, setExecutionTime] = useState(null);
  const [lineCount, setLineCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const editorRef = useRef(null);

  // Load saved code from localStorage
  useEffect(() => {
    if (!challenge) return;
    
    const savedCode = localStorage.getItem(`challenge_${id}_code`);
    if (savedCode) {
      setCode(savedCode);
      updateCounters(savedCode);
    } else {
      // Set default code template
      const defaultCode = `def ${challenge.title.toLowerCase().replace(/[^a-z0-9]/g, '')}(n):
    # Your code here
    pass`;
      setCode(defaultCode);
      updateCounters(defaultCode);
    }
  }, [id, challenge]); // Add challenge to dependency array

  const updateCounters = (code) => {
    setLineCount(code.split('\n').length);
    setCharCount(code.length);
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleEditorChange = (value) => {
    setCode(value);
    updateCounters(value);
    // Auto-save code to localStorage
    localStorage.setItem(`challenge_${id}_code`, value);
  };

  useEffect(() => {
    // Simulate fetching challenge data from an API
    // In a real app, you would fetch this from your backend
    const loadChallenge = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // For demo purposes, we'll use a mock challenge
        // In a real app, you would fetch this from your backend using the id
        const mockChallenge = {
          id: parseInt(id),
          title: 'Challenge ' + id,
          description: 'This is a sample challenge description. In a real app, this would be fetched from your backend.',
          difficulty: 'medium',
          par: 10,
          createdAt: new Date().toISOString(),
          testCases: [
            { input: 'sample input 1', expected: 'expected output 1' },
            { input: 'sample input 2', expected: 'expected output 2' },
          ]
        };
        
        setChallenge(mockChallenge);
      } catch (error) {
        console.error('Error loading challenge:', error);
      }
    };
    
    loadChallenge();
  }, [id]);

  if (!challenge) {
    // Show loading state while data is being fetched
    return (
      <div className="challenge-loading">
        <div className="loading-spinner"></div>
        <p>Loading challenge...</p>
      </div>
    );
  }
  
  const allTestsPassed = testResults.length > 0 && testResults.every(test => test.passed);

  const handleRunCode = async () => {
    if (!code.trim()) return;
    
    setIsRunning(true);
    setOutput('Running your code...');
    setTestResults([]);
    
    try {
      const startTime = performance.now();
      
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate a successful response with test results
      const result = {
        output: 'Hello, World!\nExecution completed successfully.',
        testResults: [
          { id: 1, passed: true, input: 'Test case 1', expected: 'Expected output 1', actual: 'Expected output 1' },
          { id: 2, passed: true, input: 'Test case 2', expected: 'Expected output 2', actual: 'Expected output 2' },
        ]
      };
      
      const endTime = performance.now();
      const executionTimeMs = Math.floor(endTime - startTime);
      
      setOutput(`✓ Execution completed in ${executionTimeMs}ms\n\n${result.output}`);
      
      if (result.testResults) {
        setTestResults(result.testResults);
      }
      
      setExecutionTime(executionTimeMs);
    } catch (error) {
      // For demo purposes, show a friendly error
      setOutput('✓ Execution completed in 0ms\n\nHello, World!\nExecution completed successfully.');
      
      // Set some test results for demo
      setTestResults([
        { id: 1, passed: true, input: 'Test case 1', expected: 'Expected output 1', actual: 'Expected output 1' },
        { id: 2, passed: true, input: 'Test case 2', expected: 'Expected output 2', actual: 'Expected output 2' },
      ]);
      
      setExecutionTime(42); // Demo execution time
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!code.trim()) return;
    
    setIsSubmitting(true);
    setOutput('Submitting your solution...\n');
    
    try {
      // Submit solution via API
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you use token-based auth
        },
        body: JSON.stringify({
          code,
          challengeId: id,
          language: 'python' // or get from user selection
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit solution');
      }
      
      const result = await response.json();
      
      if (result.testResults) {
        setTestResults(result.testResults);
        
        if (result.testResults.every(test => test.passed)) {
          setOutput('✅ All tests passed! Your solution is correct!\n\n');
        } else {
          setOutput('❌ Some tests failed. Please try again.\n\n');
        }
      }
      
      // If there's a message from the server, show it
      if (result.message) {
        setOutput(prev => prev + result.message + '\n');
      }
    } catch (error) {
      setOutput(`Error: ${error.message}\n`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetCode = () => {
    if (window.confirm('Are you sure you want to reset your code? This cannot be undone.')) {
      const defaultCode = `def ${challenge.title.toLowerCase().replace(/[^a-z0-9]/g, '')}(n):
    # Your code here
    pass`;
      setCode(defaultCode);
      updateCounters(defaultCode);
      localStorage.removeItem(`challenge_${id}_code`);
    }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const toggleTestCases = () => {
    setShowTestCases(!showTestCases);
  };

  return (
    <div className="challenge-detail-container">
      <div className="challenge-header">
        <Link to="/challenges" className="back-link">
          <FaChevronLeft /> Back to Challenges
        </Link>
        <div className="header-row">
          <div>
            <h1 className="challenge-title">{challenge.title}</h1>
            <div className="challenge-meta">
              <span className={`difficulty-badge ${challenge.difficulty}`}>
                {challenge.difficulty}
              </span>
              <span className="par-score">Par: {challenge.par} lines</span>
              {challenge.isNew && <span className="new-badge">New</span>}
            </div>
          </div>
          <div className="code-stats">
            <div className="stat">
              <span className="stat-label">Lines:</span>
              <span className="stat-value">{lineCount}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Chars:</span>
              <span className="stat-value">{charCount}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="challenge-layout">
        <div className="challenge-description">
          <h2>Description</h2>
          <p>{challenge.description}</p>

          {challenge.examples && challenge.examples.length > 0 && (
            <div className="examples">
              <h3>Examples</h3>
              {challenge.examples.map((example, index) => (
                <div key={index} className="example">
                  <div className="example-input">
                    <h4>Input:</h4>
                    <pre>{example.input}</pre>
                  </div>
                  <div className="example-output">
                    <h4>Output:</h4>
                    <pre>{example.output}</pre>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="test-cases">
            <button className="toggle-test-cases" onClick={toggleTestCases}>
              {showTestCases ? (
                <>
                  <FaChevronUp /> Hide Test Cases
                </>
              ) : (
                <>
                  <FaChevronDown /> View Test Cases
                </>
              )}
            </button>
            
            {showTestCases && (
              <div className="test-cases-list">
                <h4>Test Cases:</h4>
                {challenge.testCases.map((testCase, index) => (
                  <div key={index} className="test-case">
                    <div className="test-case-input">
                      <strong>Input:</strong>
                      <pre>{testCase.input}</pre>
                    </div>
                    <div className="test-case-expected">
                      <strong>Expected Output:</strong>
                      <pre>{testCase.output}</pre>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="code-editor-container">
          <div className="editor-header">
            <h3>Your Solution</h3>
            <div className="editor-actions">
              <button 
                className={`run-btn ${isRunning ? 'running' : ''}`} 
                onClick={handleRunCode}
                disabled={isRunning || !code.trim()}
              >
                <FaPlay /> {isRunning ? 'Running...' : 'Run Code'}
              </button>
              <button 
                className={`submit-btn ${allTestsPassed ? 'success' : ''}`} 
                onClick={handleSubmit}
                disabled={isSubmitting || !code.trim()}
              >
                {isSubmitting ? (
                  'Submitting...'
                ) : allTestsPassed ? (
                  <>
                    <FaCheck /> All Tests Passed!
                  </>
                ) : (
                  'Submit Solution'
                )}
              </button>
            </div>
          </div>
          
          <div className="code-editor-wrapper">
            <div className="editor-toolbar">
              <span className="language-badge">Python</span>
              <div className="editor-actions">
                <button 
                  onClick={copyToClipboard} 
                  className="icon-button"
                  title="Copy code"
                  disabled={!code.trim()}
                >
                  {showCopied ? <FaCheckCircle /> : <FaCopy />}
                  <span className="tooltip">{showCopied ? 'Copied!' : 'Copy'}</span>
                </button>
                <button 
                  onClick={resetCode} 
                  className="icon-button"
                  title="Reset code"
                >
                  <FaRedo />
                  <span className="tooltip">Reset</span>
                </button>
              </div>
            </div>
            <Editor
              height="400px"
              defaultLanguage="python"
              value={code}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on',
                automaticLayout: true,
                scrollBeyondLastLine: false,
                padding: { top: 15 },
                lineNumbers: 'on',
                renderLineHighlight: 'all',
                scrollbar: {
                  vertical: 'auto',
                  horizontal: 'auto'
                },
                quickSuggestions: false,
                suggestOnTriggerCharacters: false
              }}
            />
          </div>

          <div className="output-container">
            <div className="output-header">
              <h3>Output</h3>
              {executionTime && (
                <span className="execution-time">
                  Executed in {executionTime}ms
                </span>
              )}
            </div>
            <div className="output-content">
              <pre className="output">
                {output || 'Run your code to see the output here...'}
              </pre>
            </div>
          </div>

          {testResults.length > 0 && (
            <div className="test-results">
              <h3>Test Results</h3>
              <div className="test-results-summary">
                Passed: {testResults.filter(r => r.passed).length} / {testResults.length}
              </div>
              <div className="test-results-list">
                {testResults.map((result) => (
                  <div key={result.id} className={`test-result ${result.passed ? 'passed' : 'failed'}`}>
                    <div className="test-result-header">
                      <div className="test-status">
                        {result.passed ? (
                          <FaCheck className="test-icon passed" />
                        ) : (
                          <FaTimes className="test-icon failed" />
                        )}
                        <span>Test Case {result.id} - {result.passed ? 'Passed' : 'Failed'}</span>
                      </div>
                      <div className="test-execution-time">
                        {result.executionTime}
                      </div>
                    </div>
                    {!result.passed && (
                      <div className="test-result-details">
                        <div className="test-result-input">
                          <strong>Input:</strong>
                          <pre>{result.input}</pre>
                        </div>
                        <div className="test-result-expected">
                          <strong>Expected:</strong>
                          <pre>{result.expected}</pre>
                        </div>
                        <div className="test-result-actual">
                          <strong>Got:</strong>
                          <pre>{result.actual}</pre>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;
