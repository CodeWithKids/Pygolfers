import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaCheck, FaTimes, FaCode, FaChevronDown, FaChevronUp, FaPlay, FaRedo, FaCopy, FaCheckCircle } from 'react-icons/fa';
import Editor from '@monaco-editor/react';
import { formatDistanceToNow } from 'date-fns';
import '../styles/ChallengeDetail.css';

// Mock data - in a real app, this would come from an API
const challengeData = {
  1: {
    id: 1,
    title: 'FizzBuzz',
    description: 'Write a program that prints the numbers from 1 to N. But for multiples of three print "Fizz" instead of the number and for the multiples of five print "Buzz". For numbers which are multiples of both three and five print "FizzBuzz".',
    difficulty: 'easy',
    par: 4,
    examples: [
      {
        input: '15',
        output: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz'
      }
    ],
    testCases: [
      { input: '5', output: '1\n2\nFizz\n4\nBuzz' },
      { input: '15', output: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz' },
      { input: '30', output: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz\nFizz\n22\n23\nFizz\nBuzz\n26\nFizz\n28\n29\nFizzBuzz' }
    ]
  },
  // Add more challenges here
};

const ChallengeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const challenge = challengeData[id];
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
  }, [id]);

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

  if (!challenge) {
    return (
      <div className="challenge-not-found">
        <h2>Challenge not found</h2>
        <p>The requested challenge could not be found or has been removed.</p>
        <Link to="/challenges" className="back-link">
          <FaChevronLeft /> Back to Challenges
        </Link>
      </div>
    );
  }
  
  const allTestsPassed = testResults.length > 0 && testResults.every(test => test.passed);

  const handleRunCode = async () => {
    if (!code.trim()) {
      setOutput('Error: Please write some code before running.');
      return;
    }

    setIsRunning(true);
    setOutput('Running your code...\n');
    
    try {
      // In a real app, this would be an API call to a backend service
      const startTime = performance.now();
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const endTime = performance.now();
      const executionTimeMs = (endTime - startTime).toFixed(2);
      setExecutionTime(executionTimeMs);
      
      // Mock output - in a real app, this would come from the backend
      const mockOutput = '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz';
      setOutput(`✓ Execution completed in ${executionTimeMs}ms\n\n${mockOutput}`);
    } catch (error) {
      setOutput(`Error: ${error.message}\n${error.stack || ''}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!code.trim()) {
      setOutput('Error: Please write some solution before submitting.');
      return;
    }

    setIsSubmitting(true);
    setTestResults([]);
    
    try {
      // In a real app, this would be an API call to submit the solution
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate test results
      const results = challenge.testCases.map((testCase, index) => ({
        id: index + 1,
        passed: Math.random() > 0.3, // Random pass/fail for demo
        input: testCase.input,
        expected: testCase.output,
        actual: testCase.output, // In a real app, this would be the actual output
        executionTime: (Math.random() * 100).toFixed(2) + 'ms'
      }));
      
      setTestResults(results);
      
      // Scroll to test results
      setTimeout(() => {
        const resultsElement = document.querySelector('.test-results');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      
    } catch (error) {
      setOutput(`Submission error: ${error.message}`);
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
