
export const CURRICULUM = [
  {
    id: 'm1',
    title: 'The Awakening',
    description: 'Initialize your cognitive interface. Master the basics of output and memory.',
    icon: 'Terminal',
    lessons: [
      {
        id: 'l1-1',
        title: 'Signal Transmission',
        description: 'First Contact',
        theory: `
          <h3>The Print Protocol</h3>
          <p>To communicate with the system core, we use the <code>print()</code> function.</p>
          <p>This function pushes text data to the standard output stream (stdout).</p>
          <pre>print("Hello World")</pre>
        `,
        task: 'Transmit the message "System Online" to the console.',
        initialCode: `# Send the signal\nprint("...")`,
        expectedOutput: "System Online",
        checkType: 'exact_output',
        xp: 100
      },
      {
        id: 'l1-2',
        title: 'Memory Allocation',
        description: 'Variables',
        theory: `
          <h3>Variable Assignment</h3>
          <p>Data is fleeting unless captured. We use <strong>Variables</strong> to store data in memory.</p>
          <p>Python dynamically types variables based on the value assigned.</p>
          <pre>energy_level = 100\nstatus = "Active"</pre>
        `,
        task: 'Create a variable named <code>agent</code> with the value "INTP". Print the variable.',
        initialCode: `# Define the agent\nagent = "..."\n\n# Verify identity\nprint(agent)`,
        expectedOutput: "INTP",
        checkType: 'exact_output',
        xp: 150
      },
      {
        id: 'l1-3',
        title: 'Data Arithmetic',
        description: 'Basic Math',
        theory: `
          <h3>Computational Logic</h3>
          <p>The system allows direct mathematical operations: <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>.</p>
        `,
        task: 'Calculate the result of 10 times 5 and print it.',
        initialCode: `result = 10 * 5\nprint(result)`,
        expectedOutput: "50",
        checkType: 'exact_output',
        xp: 150
      }
    ]
  },
  {
    id: 'm2',
    title: 'Logic Gates',
    description: 'Control the flow of execution with conditionals.',
    icon: 'Network',
    lessons: [
      {
        id: 'l2-1',
        title: 'Binary Decisions',
        description: 'If Statements',
        theory: `
          <h3>Conditional Branching</h3>
          <p>The <code>if</code> statement creates a branch in reality. Code inside runs only if the condition is True.</p>
          <pre>if power > 90:\n    print("Overload")</pre>
        `,
        task: 'Check if <code>energy</code> is below 20. If so, print "Warning".',
        initialCode: `energy = 15\n\nif energy < 20:\n    # Action here\n    pass`,
        expectedOutput: "Warning",
        checkType: 'exact_output',
        xp: 200
      }
    ]
  }
];
