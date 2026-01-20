
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
        type: 'code',
        description: 'First Contact',
        theory: `
          <h3>The Print Protocol</h3>
          <p>To communicate with the system core, we use the <code>print()</code> function.</p>
          <p>This function pushes text data to the standard output stream (stdout).</p>
          <pre>print("Hello World")</pre>
        `,
        deepDive: `
          <h3>Under the Hood: stdout</h3>
          <p>When you call <code>print()</code> in Python, you are writing to <code>sys.stdout</code>.
          It converts the objects you pass into strings and writes them to the file stream.</p>
          <p>In this simulated environment, we intercept stdout to display it in the terminal panel.</p>
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
        type: 'fillBlank',
        description: 'Variables and Assignment',
        theory: `
          <h3>Variable Assignment</h3>
          <p>Data is fleeting unless captured. We use <strong>Variables</strong> to store data in memory.</p>
          <pre>agent_id = 42\nstatus = "Active"</pre>
          <p>Variable names cannot start with numbers and cannot contain spaces.</p>
        `,
        deepDive: `
            <h3>Dynamic Typing</h3>
            <p>Python is dynamically typed. This means you don't need to declare the type (int, string) of a variable.
            The interpreter infers it at runtime based on the value assigned.</p>
        `,
        task: 'Complete the code to assign the value "INTP" to the variable `personality_type`.',
        fillBlank: {
            code: `personality_type = ____\nprint(personality_type)`,
            options: ['"INTP"', 'INTP', '101', 'True'],
            correctIndex: 0
        },
        expectedOutput: "INTP",
        xp: 150
      },
      {
        id: 'l1-3',
        title: 'Data Arithmetic',
        type: 'code',
        description: 'Basic Math Operations',
        theory: `
          <h3>Computational Logic</h3>
          <p>The system allows direct mathematical operations: <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>.</p>
          <p>Python follows standard order of operations (PEMDAS).</p>
        `,
        task: 'Calculate the result of 10 times 5 and print it.',
        initialCode: `result = 10 * 5\nprint(result)`,
        expectedOutput: "50",
        checkType: 'exact_output',
        xp: 150
      },
      {
        id: 'l1-4',
        title: 'Variable Naming',
        type: 'quiz',
        description: 'Syntax Validation',
        theory: `
            <h3>Naming Conventions</h3>
            <p>Variables must start with a letter or underscore.</p>
            <p>They <strong>cannot</strong> start with a number.</p>
            <p>They are case-sensitive (<code>Age</code> is different from <code>age</code>).</p>
        `,
        task: 'Select the INVALID variable name.',
        quiz: {
            options: ['user_data', '_system', '2_fast', 'speed_limit'],
            correctIndex: 2
        },
        xp: 100
      }
    ]
  },
  {
    id: 'm2',
    title: 'Data Streams',
    description: 'Understand the nature of data: Strings, Integers, and Floats.',
    icon: 'Database',
    lessons: [
       {
        id: 'l2-1',
        title: 'String Theory',
        type: 'code',
        description: 'String Concatenation',
        theory: `
          <h3>Combining Strings</h3>
          <p>You can add strings together using the <code>+</code> operator. This is called concatenation.</p>
          <pre>greeting = "Hello " + "World"</pre>
        `,
        task: 'Create two variables: `prefix` with "Error " and `code` with "404". Print them combined.',
        initialCode: `prefix = "Error "\ncode = "404"\n\n# Combine and print\n`,
        expectedOutput: "Error 404",
        checkType: 'exact_output',
        xp: 200
       },
       {
        id: 'l2-2',
        title: 'Type Identification',
        type: 'quiz',
        description: 'The type() function',
        theory: `
            <h3>Introspection</h3>
            <p>You can ask the system what type of data something is using <code>type()</code>.</p>
            <ul>
                <li><code>"Hello"</code> -> &lt;class 'str'&gt;</li>
                <li><code>42</code> -> &lt;class 'int'&gt;</li>
                <li><code>3.14</code> -> &lt;class 'float'&gt;</li>
            </ul>
        `,
        task: 'What is the type of the value 3.14?',
        quiz: {
            options: ['Integer (int)', 'Float (float)', 'String (str)', 'Boolean (bool)'],
            correctIndex: 1
        },
        xp: 150
       }
    ]
  },
  {
    id: 'm3',
    title: 'Logic Gates',
    description: 'Control the flow of execution with conditionals.',
    icon: 'Network',
    lessons: [
      {
        id: 'l3-1',
        title: 'The Boolean State',
        type: 'fillBlank',
        description: 'True or False',
        theory: `
          <h3>Binary Logic</h3>
          <p>A Boolean value can only be <code>True</code> or <code>False</code>.</p>
          <p>Note: In Python, they must be Capitalized.</p>
        `,
        task: 'Set the system status to True.',
        fillBlank: {
            code: `system_ready = ____\nif system_ready:\n    print("Go")`,
            options: ['true', 'True', '"True"', '1'],
            correctIndex: 1
        },
        expectedOutput: "Go",
        xp: 150
      },
      {
        id: 'l3-2',
        title: 'Binary Decisions',
        type: 'code',
        description: 'If Statements',
        theory: `
          <h3>Conditional Branching</h3>
          <p>The <code>if</code> statement creates a branch in reality. Code inside runs only if the condition is True.</p>
          <pre>if power > 90:\n    print("Overload")</pre>
          <p><strong>Indentation is crucial</strong> in Python.</p>
        `,
        task: 'Check if <code>energy</code> is below 20. If so, print "Warning".',
        initialCode: `energy = 15\n\nif energy < 20:\n    # Action here\n    pass`,
        expectedOutput: "Warning",
        checkType: 'exact_output',
        xp: 200
      },
      {
        id: 'l3-3',
        title: 'Alternative Paths',
        type: 'code',
        description: 'Else',
        theory: `
            <h3>The Else Clause</h3>
            <p>Use <code>else</code> to define what happens if the condition is False.</p>
            <pre>if x > 10:\n    print("Big")\nelse:\n    print("Small")</pre>
        `,
        task: 'If x is greater than 5, print "High". Else print "Low". (x is 3)',
        initialCode: `x = 3\n\nif x > 5:\n    print("High")\n# Add else block\n`,
        expectedOutput: "Low",
        checkType: 'exact_output',
        xp: 200
      }
    ]
  },
  {
    id: 'm4',
    title: 'Iterators',
    description: 'Automate repetition with Loops.',
    icon: 'RefreshCw',
    lessons: [
        {
            id: 'l4-1',
            title: 'The For Loop',
            type: 'code',
            description: 'Iterating over ranges',
            theory: `
                <h3>Range Iteration</h3>
                <p>The <code>for</code> loop repeats code for a specific number of times.</p>
                <p><code>range(5)</code> generates numbers 0, 1, 2, 3, 4.</p>
                <pre>for i in range(3):\n    print(i)</pre>
            `,
            task: 'Print the numbers 0, 1, 2 using a for loop and range(3).',
            initialCode: `# Loop 3 times\n`,
            expectedOutput: "0\n1\n2",
            checkType: 'exact_output',
            xp: 250
        },
        {
            id: 'l4-2',
            title: 'While Loops',
            type: 'fillBlank',
            description: 'Condition-based repetition',
            theory: `
                <h3>Looping while True</h3>
                <p>A <code>while</code> loop keeps running as long as its condition remains True.</p>
                <p><strong>Warning:</strong> Be careful of infinite loops!</p>
            `,
            task: 'Complete the loop to run while count is greater than 0.',
            fillBlank: {
                code: `count = 3\nwhile count ____ 0:\n    print(count)\n    count = count - 1`,
                options: ['<', '>', '==', '!='],
                correctIndex: 1
            },
            expectedOutput: "3\n2\n1",
            xp: 200
        }
    ]
  },
  {
    id: 'm5',
    title: 'Structures',
    description: 'Organize data with Lists and Dictionaries.',
    icon: 'Layers',
    lessons: [
        {
            id: 'l5-1',
            title: 'The List',
            type: 'code',
            description: 'Ordered Sequences',
            theory: `
                <h3>Arrays of Data</h3>
                <p>A list stores multiple items in a specific order.</p>
                <pre>items = ["Sword", "Shield", "Potion"]</pre>
            `,
            deepDive: `
                <h3>Indexing</h3>
                <p>Lists are zero-indexed. The first item is at index 0.</p>
                <p><code>items[0]</code> is "Sword".</p>
            `,
            task: 'Create a list named `colors` with "Red" and "Blue". Print the list.',
            initialCode: `colors = \nprint(colors)`,
            expectedOutput: "['Red', 'Blue']",
            checkType: 'exact_output',
            xp: 250
        },
        {
            id: 'l5-2',
            title: 'Accessing Data',
            type: 'fillBlank',
            description: 'Retrieving by Index',
            theory: `
                <h3>Zero-Index Rule</h3>
                <p>To get an item, use square brackets: <code>list[index]</code>.</p>
            `,
            task: 'Get the second item from the list (Index 1).',
            fillBlank: {
                code: `data = [10, 20, 30]\nprint(data[____])`,
                options: ['1', '2', '0', '3'],
                correctIndex: 0
            },
            expectedOutput: "20",
            xp: 150
        },
        {
            id: 'l5-3',
            title: 'Dictionaries',
            type: 'code',
            description: 'Key-Value Pairs',
            theory: `
                <h3>Hash Maps</h3>
                <p>Dictionaries store data with logical labels (keys) instead of numbered indexes.</p>
                <pre>user = {"name": "Neo", "id": 1}</pre>
                <p>Access values by key: <code>user["name"]</code></p>
            `,
            task: 'Create a dict `stats` with "hp": 100. Print the value of "hp".',
            initialCode: `stats = \nprint(stats["hp"])`,
            expectedOutput: "100",
            checkType: 'exact_output',
            xp: 300
        }
    ]
  },
  {
    id: 'm6',
    title: 'Subroutines',
    description: 'Modularize logic with Functions.',
    icon: 'Cpu',
    lessons: [
        {
            id: 'l6-1',
            title: 'Defining Functions',
            type: 'fillBlank',
            description: 'The def keyword',
            theory: `
                <h3>Reusable Code</h3>
                <p>Functions allow you to write code once and run it many times.</p>
                <p>Use the <code>def</code> keyword to define one.</p>
            `,
            task: 'Complete the function definition.',
            fillBlank: {
                code: `____ greet():\n    print("Hello")\n\ngreet()`,
                options: ['function', 'def', 'void', 'func'],
                correctIndex: 1
            },
            expectedOutput: "Hello",
            xp: 200
        },
        {
            id: 'l6-2',
            title: 'Parameters',
            type: 'code',
            description: 'Passing Data',
            theory: `
                <h3>Inputs</h3>
                <p>Functions can accept inputs, called parameters.</p>
                <pre>def square(n):\n    print(n * n)</pre>
            `,
            task: 'Define a function `double(n)` that prints n * 2. Call it with 5.',
            initialCode: `def double(n):\n    # print result\n    pass\n\n# Call it\ndouble(5)`,
            expectedOutput: "10",
            checkType: 'exact_output',
            xp: 300
        },
        {
            id: 'l6-3',
            title: 'Return Values',
            type: 'quiz',
            description: 'Outputting Data',
            theory: `
                <h3>Return vs Print</h3>
                <p><code>print()</code> shows text on screen.</p>
                <p><code>return</code> sends data back to the code that called the function.</p>
            `,
            task: 'Which keyword passes data back to the caller?',
            quiz: {
                options: ['print', 'return', 'back', 'output'],
                correctIndex: 1
            },
            xp: 150
        }
    ]
  }
];
