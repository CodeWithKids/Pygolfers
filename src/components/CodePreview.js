import React, { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-tomorrow.css';

const CodePreview = () => {
  const [activeTab, setActiveTab] = useState('problem');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showScore, setShowScore] = useState(false);

  // Code examples for the preview
  const codeExamples = {
    problem: `def fizzbuzz(n):
    """
    Return a list of numbers from 1 to n, where:
    - Multiples of 3 are replaced with "Fizz"
    - Multiples of 5 are replaced with "Buzz"
    - Multiples of both 3 and 5 are replaced with "FizzBuzz"
    """
    result = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            result.append("FizzBuzz")
        elif i % 3 == 0:
            result.append("Fizz")
        elif i % 5 == 0:
            result.append("Buzz")
        else:
            result.append(str(i))
    return result`,
    solution: `def fizzbuzz(n):
    return [
        "Fizz" * (not i%3) + "Buzz" * (not i%5) or str(i)
        for i in range(1, n+1)
    ]`
  };

  // Calculate character counts
  const problemChars = codeExamples.problem.length;
  const solutionChars = codeExamples.solution.length;
  const par = 120; // Estimated par for this challenge
  const solutionScore = solutionChars - par;

  // Initialize Prism for syntax highlighting
  useEffect(() => {
    Prism.highlightAll();
  }, [activeTab]);

  const runCode = () => {
    setIsRunning(true);
    setOutput('Running...');
    
    // Simulate code execution
    setTimeout(() => {
      try {
        // In a real app, this would use a safe code execution environment
        const result = [];
        for (let i = 1; i <= 5; i++) {
          if (i % 15 === 0) result.push("FizzBuzz");
          else if (i % 3 === 0) result.push("Fizz");
          else if (i % 5 === 0) result.push("Buzz");
          else result.push(i.toString());
        }
        setOutput(`Output: ${result.join(', ')}`);
      } catch (error) {
        setOutput(`Error: ${error.message}`);
      } finally {
        setIsRunning(false);
      }
    }, 1000);
  };

  return (
    <div className="code-preview" role="region" aria-label="Code example">
      <div className="code-tabs" role="tablist" aria-label="Code tabs">
        <button 
          className={`tab ${activeTab === 'problem' ? 'active' : ''}`}
          onClick={() => setActiveTab('problem')}
          role="tab"
          aria-selected={activeTab === 'problem'}
          aria-controls="problem-tab"
          id="problem"
        >
          Problem
        </button>
        <button 
          className={`tab ${activeTab === 'solution' ? 'active' : ''}`}
          onClick={() => setActiveTab('solution')}
          role="tab"
          aria-selected={activeTab === 'solution'}
          aria-controls="solution-tab"
          id="solution"
        >
          Solution
        </button>
      </div>
      
      <div 
        className="code-block" 
        role="tabpanel"
        id={`${activeTab}-tab`}
        aria-labelledby={activeTab}
        tabIndex="0"
      >
        <pre className="line-numbers">
          <code className={`language-python`}>
            {codeExamples[activeTab]}
          </code>
        </pre>
      </div>
      
      <div className="code-footer">
        <div className="code-info">
          <span>Python 3.9</span>
          <div className="character-count">
            <span className="count-label">Characters:</span>
            <span className={`count-value ${activeTab === 'solution' ? 'solution-count' : 'problem-count'}`}>
              {activeTab === 'problem' ? problemChars : solutionChars}
            </span>
            {activeTab === 'solution' && (
              <span className={`score-indicator ${solutionScore <= 0 ? 'under-par' : 'over-par'}`}>
                {solutionScore <= 0 ? '🎉 Under Par!' : `+${solutionScore} over par`}
              </span>
            )}
          </div>
        </div>
        <button 
          className={`run-button ${isRunning ? 'running' : ''}`}
          onClick={runCode}
          disabled={isRunning}
          aria-label={isRunning ? 'Code is running' : 'Run code'}
        >
          {isRunning ? (
            <span className="spinner" aria-hidden="true"></span>
          ) : (
            <FaPlay size={10} aria-hidden="true" />
          )}
          {isRunning ? 'Running...' : 'Run Code'}
        </button>
      </div>
      
      {output && (
        <div className="code-output" aria-live="polite">
          <div className="output-header">Output</div>
          <pre className="output-content">{output}</pre>
        </div>
      )}
    </div>
  );
};

export default CodePreview;
