export interface Question {
  level: 'easy' | 'medium' | 'hard';
  q: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface Topic {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  color: string;
  glow: string;
  tags: string[];
  questions: Question[];
}

export const TOPICS: Topic[] = [
  {
    id: 'binary',
    emoji: '🔢',
    title: 'Binary & Bits',
    subtitle: 'The secret ON/OFF language of computers',
    color: 'from-violet-600/20 to-blue-600/20',
    glow: 'rgba(139,92,246,0.3)',
    tags: ['Bits', 'Bytes', 'Base-2', 'Binary Math'],
    questions: [
      { level:'easy', q:'How many bits are in 1 byte?', options:['4','8','16','32'], answer:1, explanation:'8 bits = 1 byte. Think of it as 8 light switches that can each be ON(1) or OFF(0).' },
      { level:'easy', q:'What are the only two digits used in binary?', options:['1 and 2','0 and 1','A and B','True and False'], answer:1, explanation:'Binary is base-2, using only 0 (OFF) and 1 (ON), just like a light switch!' },
      { level:'medium', q:'What is the decimal value of binary 1010?', options:['8','10','12','16'], answer:1, explanation:'1010 = 1×8 + 0×4 + 1×2 + 0×1 = 8+2 = 10 in decimal.' },
      { level:'medium', q:'What is the largest number 1 byte can store?', options:['128','255','256','512'], answer:1, explanation:'1 byte = 8 bits → 2⁸ = 256 combos. Since we start at 0, max value is 255 (11111111 in binary).' },
      { level:'hard', q:'Convert decimal 25 to binary.', options:['10011','11001','10101','11010'], answer:1, explanation:'25 = 16+8+1 = 2⁴+2³+2⁰ = 11001₂. Work from the largest power of 2 that fits!' },
      { level:'hard', q:'How many unique values can 2 bytes represent?', options:['512','1024','32768','65536'], answer:3, explanation:'2 bytes = 16 bits. 2¹⁶ = 65,536 unique combinations. This is why old video games had 16-bit color!' },
    ]
  },
  {
    id: 'hex',
    emoji: '🎨',
    title: 'Hexadecimal',
    subtitle: 'Making binary human-friendly with 16 symbols',
    color: 'from-blue-600/20 to-cyan-600/20',
    glow: 'rgba(59,130,246,0.3)',
    tags: ['Base-16', 'Colors', 'Memory Addresses', 'Nibbles'],
    questions: [
      { level:'easy', q:'How many symbols does hexadecimal use?', options:['8','10','16','32'], answer:2, explanation:'Hex uses 0-9 (ten digits) plus A-F (six letters) = 16 total symbols, one per 4-bit group!' },
      { level:'easy', q:'What decimal value does hex digit "A" represent?', options:['8','9','10','11'], answer:2, explanation:'In hex: A=10, B=11, C=12, D=13, E=14, F=15. After 9 we run out of digits and use letters!' },
      { level:'medium', q:'How many bits does ONE hex digit represent?', options:['2','4','8','16'], answer:1, explanation:'One hex digit = 4 bits (called a "nibble"). 2 hex digits = 1 byte (8 bits). So #FF = 11111111.' },
      { level:'medium', q:'Convert binary 11010110 to hex.', options:['C6','D5','D6','E6'], answer:2, explanation:'Split into groups of 4: 1101|0110. 1101=13=D, 0110=6. Result: D6!' },
      { level:'hard', q:'What decimal number is hex 2F?', options:['29','47','63','37'], answer:1, explanation:'2F = 2×16 + 15 = 32+15 = 47. Each hex position is 16× the next position to the right.' },
      { level:'hard', q:'What color does CSS #FF00FF represent?', options:['Yellow','Cyan','Magenta','Orange'], answer:2, explanation:'#FF00FF = Red:255, Green:0, Blue:255. Max red + max blue = Magenta (hot pink/purple)!' },
    ]
  },
  {
    id: 'logic-gates',
    emoji: '⚡',
    title: 'Logic Gates',
    subtitle: 'Boolean algebra & the building blocks of all computation',
    color: 'from-yellow-600/20 to-orange-600/20',
    glow: 'rgba(234,179,8,0.3)',
    tags: ['AND', 'OR', 'NOT', 'NAND', 'XOR', 'Boolean'],
    questions: [
      { level:'easy', q:'What does an AND gate output when BOTH inputs are 1?', options:['0','1','Maybe','Error'], answer:1, explanation:'AND = "both must be true". Only outputs 1 when A=1 AND B=1. Like "homework done AND room clean" → you get to play!' },
      { level:'easy', q:'What does a NOT gate do?', options:['Doubles input','Flips 0→1 and 1→0','Always outputs 1','Needs two inputs'], answer:1, explanation:'NOT is an inverter — it flips the bit! NOT 0 = 1, NOT 1 = 0. Like saying "the opposite".' },
      { level:'medium', q:'What does XOR output when both inputs are 1?', options:['0','1','Error','Both'], answer:0, explanation:'XOR = "exclusive OR" = one or the other but NOT both. 1 XOR 1 = 0, because they are the SAME (not different).' },
      { level:'medium', q:'Why is NAND called a "universal gate"?', options:['It\'s the fastest gate','You can build ALL other gates using only NAND','It uses the least power','It was invented first'], answer:1, explanation:'Amazing fact: ANY logic circuit (AND, OR, NOT, XOR, even your entire CPU!) can be built using only NAND gates!' },
      { level:'hard', q:'What is 1 OR (0 AND 1) using correct precedence?', options:['0','1','2','Undefined'], answer:1, explanation:'AND has higher precedence: first 0 AND 1 = 0, then 1 OR 0 = 1. Just like × before + in math!' },
      { level:'hard', q:'How do you build a NOT gate using only NAND gates?', options:['Connect A to both NAND inputs','Use two NAND gates in series','Connect output back to input','You cannot'], answer:0, explanation:'NAND(A, A) = NOT(A AND A) = NOT A. Connect the same input to BOTH inputs of a NAND gate!' },
    ]
  },
  {
    id: 'ascii',
    emoji: '📝',
    title: 'ASCII & Unicode',
    subtitle: 'How computers understand letters, emoji & all human languages',
    color: 'from-green-600/20 to-teal-600/20',
    glow: 'rgba(34,197,94,0.3)',
    tags: ['ASCII', 'Unicode', 'Characters', 'Encoding', 'UTF-8'],
    questions: [
      { level:'easy', q:'What ASCII value represents the letter "A"?', options:['41','65','97','33'], answer:1, explanation:'Capital A = ASCII 65 = binary 01000001. Standard ASCII uses 7 bits for 128 characters total.' },
      { level:'easy', q:'Why was Unicode created?', options:['ASCII was too slow','ASCII only had 128 characters — not enough for all world languages','Unicode is smaller','ASCII had bugs'], answer:1, explanation:'ASCII only covers English! Unicode has 140,000+ characters: Chinese, Arabic, Hindi, and even 😀 emojis!' },
      { level:'medium', q:'What ASCII value is the digit character "5" (not the number 5)?', options:['5','48','53','57'], answer:2, explanation:'Digits start at ASCII 48 ("0"). So "5" = 48+5 = 53. The digit CHAR is different from the number VALUE!' },
      { level:'medium', q:'How do you convert uppercase "M" to lowercase "m" using ASCII?', options:['Subtract 26','Add 32','Multiply by 2','Add 26'], answer:1, explanation:'"M" = 77, "m" = 109. Difference = 32. In binary, only bit 5 changes! Add 32 → uppercase to lowercase.' },
      { level:'hard', q:'What does the binary 01001000 01101001 decode to in ASCII?', options:['"HI"','"Hi"','"hi"','"HI!"'], answer:1, explanation:'01001000 = 72 = "H", 01101001 = 105 = "i". Put together: "Hi"! ASCII lets us spell words in binary.' },
      { level:'hard', q:'How many bytes does "Hello!" use in ASCII?', options:['5','6','7','8'], answer:1, explanation:'H=1, e=1, l=1, l=1, o=1, !=1 → 6 characters × 1 byte each = 6 bytes total in standard ASCII.' },
    ]
  },
  {
    id: 'cpu',
    emoji: '🧠',
    title: 'CPU & Computer Architecture',
    subtitle: 'Fetch-Decode-Execute, clock speed, cores & how the machine thinks',
    color: 'from-red-600/20 to-pink-600/20',
    glow: 'rgba(239,68,68,0.3)',
    tags: ['CPU', 'RAM', 'Kernel', 'Clock', 'Cores', 'ALU', 'Cache'],
    questions: [
      { level:'easy', q:'What are the 4 steps of the CPU instruction cycle?', options:['Load, Run, Save, Stop','Fetch, Decode, Execute, Store','Read, Write, Delete, Create','Start, Process, End, Repeat'], answer:1, explanation:'Every instruction the CPU processes goes through Fetch (get), Decode (understand), Execute (do), Store (save result). Billions of times per second!' },
      { level:'easy', q:'What does GHz measure in a CPU?', options:['Memory size','Battery life','Clock cycles per second (speed)','Number of cores'], answer:2, explanation:'GHz = Gigahertz = billion cycles per second. A 3.5 GHz CPU completes 3.5 BILLION cycles every second — faster than you can blink 3 billion times!' },
      { level:'medium', q:'Why are registers faster than RAM?', options:['They are bigger','They are inside the CPU chip itself','They use different electricity','They are cooled by fans'], answer:1, explanation:'Registers live INSIDE the CPU — no data travel needed! RAM is physically separate, so it takes extra time to fetch data across the wire.' },
      { level:'medium', q:'What does a multi-core CPU do that a single-core cannot?', options:['Run faster clock speed','Run multiple tasks truly simultaneously','Store more memory','Use less electricity'], answer:1, explanation:'Multiple cores = multiple "chefs" cooking at once! A quad-core can literally do 4 different things at the exact same moment in time.' },
      { level:'hard', q:'At 4 GHz with an instruction taking 2 cycles, how many such instructions per second?', options:['2 billion','4 billion','1 billion','8 billion'], answer:0, explanation:'4 GHz = 4,000,000,000 cycles/sec ÷ 2 cycles per instruction = 2,000,000,000 = 2 billion instructions per second!' },
      { level:'hard', q:'Why doesn\'t doubling CPU cores double overall speed?', options:['Cores share the same cache','Not all tasks can be split/parallelized — some must run in sequence','More cores = more heat','Operating systems limit core usage'], answer:1, explanation:'Amdahl\'s Law: If part of a program MUST run sequentially (one step at a time), adding more cores only helps the parallelizable portion.' },
    ]
  },
  {
    id: 'python',
    emoji: '🐍',
    title: 'Python & Data Types',
    subtitle: 'Talking to computers: variables, integers, floats, strings & scientific notation',
    color: 'from-yellow-500/20 to-green-600/20',
    glow: 'rgba(234,179,8,0.3)',
    tags: ['Python', 'int', 'float', 'str', 'bool', 'Interpreter', 'Variables'],
    questions: [
      { level:'easy', q:'What is the data type of "100" (with quotes) in Python?', options:['int','float','str','bool'], answer:2, explanation:'"100" with quotes is a str (string/text). 100 without quotes is an int (integer/number). Quotes make it text!' },
      { level:'easy', q:'What does an interpreter do?', options:['Compiles all code at once to machine code','Translates and runs code line by line as it reads it','Stores data in memory','Checks for spelling errors'], answer:1, explanation:'Python is interpreted — it reads your code line by line, translates each line to machine code on-the-fly, and runs it immediately!' },
      { level:'medium', q:'What is 1.5e9 in normal notation?', options:['1,500','1,500,000','1,500,000,000','0.0000000015'], answer:2, explanation:'1.5e9 = 1.5 × 10⁹ = 1,500,000,000 (1.5 billion). The "e9" means move decimal 9 places to the RIGHT.' },
      { level:'medium', q:'Why does 0.1 + 0.2 NOT equal exactly 0.3 in Python?', options:['Python has a bug','Floats are approximations stored in binary — some decimals can\'t be exact','int and float can\'t be added','Python uses different math'], answer:1, explanation:'0.1 cannot be stored exactly in binary (like 1/3 in decimal). So 0.1 + 0.2 = 0.30000000000000004. This is called floating-point imprecision!' },
      { level:'hard', q:'What does int(3.9) return in Python?', options:['4 (rounds up)','3 (truncates)','Error','4.0'], answer:1, explanation:'int() TRUNCATES (chops off) the decimal part — does NOT round! int(3.9) = 3, int(-3.9) = -3. Use round() if you want rounding.' },
      { level:'hard', q:'How many bytes does a typical Python int use? (CPython)', options:['4 bytes','8 bytes','28+ bytes (object overhead)','1 byte'], answer:2, explanation:'Python ints are objects with overhead! A simple int uses ~28 bytes due to reference count, type pointer, and digit storage. C int uses just 4 bytes.' },
    ]
  },
  {
    id: 'memory',
    emoji: '🎯',
    title: 'Pointers & Memory',
    subtitle: 'Memory addresses, heap vs stack, segfaults, leaks & null terminators',
    color: 'from-orange-600/20 to-red-600/20',
    glow: 'rgba(234,88,12,0.3)',
    tags: ['Pointers', 'Stack', 'Heap', 'Segfault', 'Memory Leak', 'NULL'],
    questions: [
      { level:'easy', q:'What does a pointer variable store?', options:['A value like 42','A memory address (location in RAM)','A file name','A function'], answer:1, explanation:'Pointers store ADDRESSES not values! Like a treasure map that says "the treasure is at locker #0x1A2B" rather than holding the treasure itself.' },
      { level:'easy', q:'What is a memory leak?', options:['Water getting into your RAM','Allocating memory and never freeing it, causing waste','A program reading wrong memory','Sharing memory between programs'], answer:1, explanation:'Memory leak = you rent lockers but never return the keys. Over time the warehouse fills up and new programs can\'t get space = your computer slows down!' },
      { level:'medium', q:'If ptr points to int at address 0x1000, what address does (ptr+1) point to?', options:['0x1001','0x1002','0x1004','0x1008'], answer:2, explanation:'Pointer arithmetic is smart! Adding 1 to an int pointer jumps by sizeof(int) = 4 bytes. So 0x1000 + 4 = 0x1004. It scales by the data type size!' },
      { level:'medium', q:'What causes a segmentation fault?', options:['Running out of RAM','Accessing memory you don\'t own or NULL pointer','Infinite loop','Division by zero'], answer:1, explanation:'Segfault = the OS catches you breaking into memory you have no permission to access! Like trying to enter someone else\'s apartment. The OS immediately terminates your program.' },
      { level:'hard', q:'What is the NULL character (\\0) in a C string?', options:['A space character','The number zero','The string terminator that marks where the string ends','An error code'], answer:2, explanation:'C strings are char arrays ending with \\0 (ASCII 0). Without it, C keeps reading memory past your string until it happens to find a 0 byte — reading garbage!' },
      { level:'hard', q:'Why doesn\'t Python have manual memory management like C?', options:['Python programs are too small','Python has a garbage collector that automatically frees unused memory','Python stores everything on disk','Python uses infinite RAM'], answer:1, explanation:'Python\'s reference counter + garbage collector automatically track when objects have no more references and frees their memory. No manual malloc/free needed!' },
    ]
  },
  {
    id: 'arrays',
    emoji: '📦',
    title: 'Arrays & Data Structures',
    subtitle: 'Lists, linked lists, stacks, queues, hash maps & when to use each',
    color: 'from-teal-600/20 to-green-600/20',
    glow: 'rgba(20,184,166,0.3)',
    tags: ['Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Hash Maps', 'O(1)', 'Collision'],
    questions: [
      { level:'easy', q:'What index does the FIRST element of an array have?', options:['1','0','-1','Start'], answer:1, explanation:'Arrays are 0-indexed! First element = index 0. So arr[0] gets the first item, arr[1] the second. Most programming languages start counting at 0, not 1.' },
      { level:'easy', q:'What does LIFO stand for (Stack behavior)?', options:['Last In First Out','Last Index First Operation','Large Integer Format Output','Linear Input Flush Order'], answer:0, explanation:'LIFO = Last In, First Out. Like a stack of plates — you always take off the TOP plate (last one added). Push adds to top, Pop removes from top.' },
      { level:'medium', q:'Why is accessing arr[50] just as fast as arr[0]?', options:['Both use binary search','Arrays are contiguous — the CPU calculates the address directly: base + index × size','Processors cache all arrays','arr[50] is actually slower'], answer:1, explanation:'Arrays are stored consecutively in memory. Address formula: base_address + (index × element_size). Direct math → O(1) constant time, no searching needed!' },
      { level:'medium', q:'What happens in a hash map collision?', options:['Data is lost','The program crashes','Two keys hash to same index — handled by chaining or probing','The hash map doubles in size'], answer:2, explanation:'Collision = two different keys produce the same hash index. Solutions: Chaining (linked list at that slot) or Open Addressing (try next empty slot).' },
      { level:'hard', q:'Why is inserting at the BEGINNING of an array slow?', options:['The CPU has to think harder','Every existing element must shift one position right to make room — O(n) operation','The array needs resizing','Memory must be reallocated'], answer:1, explanation:'Arrays are fixed blocks. Inserting at index 0 means shifting ALL n elements one spot right. For 1 million elements, that\'s 1 million moves! O(n) time.' },
      { level:'hard', q:'What is a hash map\'s average-case lookup complexity?', options:['O(n)','O(log n)','O(1)','O(n²)'], answer:2, explanation:'Hash maps are O(1) average! Hash the key → find index directly. No looping needed. Worst case is O(n) if everything collides, but good hash functions prevent this.' },
    ]
  },
  {
    id: 'algorithms',
    emoji: '🔍',
    title: 'Algorithms & Search',
    subtitle: 'Binary search, DFS, BFS, BSTs, Dijkstra\'s shortest path & graph traversal',
    color: 'from-indigo-600/20 to-violet-600/20',
    glow: 'rgba(99,102,241,0.3)',
    tags: ['Binary Search', 'DFS', 'BFS', 'BST', 'Dijkstra', 'Graph', 'Tree'],
    questions: [
      { level:'easy', q:'What does binary search REQUIRE about the input?', options:['The array must have an even number of elements','The array must be sorted','The array must have no duplicates','The array must fit in RAM'], answer:1, explanation:'Binary search MUST have a sorted array! It works by checking the MIDDLE — if target is greater, it eliminates the left half. No sorting = no binary search!' },
      { level:'easy', q:'What is the difference between DFS and BFS?', options:['DFS is faster, BFS is slower','DFS uses a stack and goes DEEP first; BFS uses a queue and goes WIDE first','DFS works on trees, BFS on graphs','DFS is for sorting, BFS for searching'], answer:1, explanation:'DFS = Depth First Search = go as deep as possible before backtracking (uses stack). BFS = Breadth First Search = explore all neighbors before going deeper (uses queue).' },
      { level:'medium', q:'In a Binary Search Tree, where is the SMALLEST value?', options:['Root node','Rightmost node','Leftmost node','Random node'], answer:2, explanation:'BST rule: left child < parent < right child. So the SMALLEST value is always at the FAR LEFT (keep going left until no more left children).' },
      { level:'medium', q:'What is the max comparisons binary search makes on 1000 elements?', options:['1000','500','100','~10'], answer:3, explanation:'Binary search is O(log₂ n). log₂(1000) ≈ 10. So ONLY ~10 comparisons to find any element in 1000! Compare to linear search needing up to 1000.' },
      { level:'hard', q:'Why is Dijkstra\'s algorithm NOT suitable for negative edge weights?', options:['It\'s too slow for negative weights','Once a node is marked "visited" with minimum distance, negative edges could offer a shorter path that gets missed','Negative numbers break the priority queue','It was not designed for graphs'], answer:1, explanation:'Dijkstra greedily marks nodes as "done" (minimum found). A negative edge discovered later could create a shorter path to an already-finalized node — invalidating the greedy assumption!' },
      { level:'hard', q:'What is the time complexity of binary search?', options:['O(n)','O(n²)','O(log n)','O(1)'], answer:2, explanation:'Each step HALVES the remaining search space. 1000→500→250→125→...→1. That\'s log₂(1000) ≈ 10 steps. Halving repeatedly = logarithmic time O(log n).' },
    ]
  },
  {
    id: 'functions',
    emoji: '📞',
    title: 'Functions & Recursion',
    subtitle: 'Call stack, return values, recursion, factorials & memoization',
    color: 'from-pink-600/20 to-rose-600/20',
    glow: 'rgba(236,72,153,0.3)',
    tags: ['Functions', 'Call Stack', 'Recursion', 'Factorial', 'Memoization', 'Base Case'],
    questions: [
      { level:'easy', q:'What does a function WITHOUT a return statement return in Python?', options:['0','""','None','Error'], answer:2, explanation:'Python functions implicitly return None if no return statement. None is Python\'s way of saying "nothing / no value". You can check: if result is None.' },
      { level:'easy', q:'What is a "base case" in recursion?', options:['The first function called in a program','The condition that STOPS the recursion (prevents infinite loops)','The main() function','The default parameter value'], answer:1, explanation:'Base case = the stopping condition! Without it, recursion goes forever → stack overflow. Like factorial(0)=1 — once we reach 0, stop and return 1.' },
      { level:'medium', q:'What does factorial(3) return using recursion: f(n) = n * f(n-1), f(0)=1?', options:['3','4','6','9'], answer:2, explanation:'factorial(3) = 3 × factorial(2) = 3 × (2 × factorial(1)) = 3 × 2 × (1 × factorial(0)) = 3 × 2 × 1 × 1 = 6!' },
      { level:'medium', q:'What is memoization?', options:['Writing functions from memory','Caching results of expensive function calls to avoid recalculation','A way to name variables','Storing functions in files'], answer:1, explanation:'Memoization = remember past answers! If fib(10) is calculated, store it. Next time fib(10) is needed, return the cached answer instantly instead of recalculating.' },
      { level:'hard', q:'What causes a stack overflow?', options:['Using too much heap memory','Too many function calls stacking up (usually infinite recursion) filling the call stack','A loop running too long','Assigning too many variables'], answer:1, explanation:'Each function call adds a frame to the call stack. Infinite recursion keeps adding frames until the stack is FULL → "RecursionError: maximum recursion depth exceeded" in Python!' },
      { level:'hard', q:'Why is memoized Fibonacci dramatically faster than naive recursive Fibonacci?', options:['It uses a different algorithm','Naive recursion recalculates the same values exponentially many times (2^n); memoization calculates each value exactly once (n)','Memoization uses less RAM','They have the same speed'], answer:1, explanation:'fib(40) naive: ~1 billion calls (2⁴⁰). fib(40) memoized: exactly 40 unique calculations. The speedup is EXPONENTIAL — from hours to milliseconds!' },
    ]
  },
  {
    id: 'complexity',
    emoji: '⚡',
    title: 'Complexity & Big O',
    subtitle: 'Time & space complexity, brute force vs divide & conquer, algorithm analysis',
    color: 'from-amber-600/20 to-yellow-600/20',
    glow: 'rgba(245,158,11,0.3)',
    tags: ['Big O', 'O(n)', 'O(log n)', 'O(n²)', 'Space', 'Divide & Conquer'],
    questions: [
      { level:'easy', q:'What does Big O notation measure?', options:['The size of your code in bytes','How runtime or memory GROWS as input size grows','The number of bugs in code','CPU temperature while running'], answer:1, explanation:'Big O describes growth rate, not exact speed. O(n) means: if you double the input, the time doubles. O(n²) means: double input → quadruple time. It\'s about SCALING.' },
      { level:'easy', q:'Which is FASTER for large inputs?', options:['O(n²)','O(n log n)','O(n)','O(log n)'], answer:3, explanation:'Order from fastest to slowest: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ). O(log n) is incredibly fast — only ~30 steps for 1 BILLION elements!' },
      { level:'medium', q:'What is the time complexity of this code: for i in range(n): for j in range(n): print(i,j)?', options:['O(n)','O(n + n)','O(n²)','O(2n)'], answer:2, explanation:'Nested loops: outer runs n times, inner runs n times for EACH outer iteration. Total = n × n = n² operations. This grows VERY fast — avoid for large inputs!' },
      { level:'medium', q:'Why is merge sort preferred over bubble sort for large datasets?', options:['Merge sort uses less memory','Merge sort is O(n log n) vs bubble sort\'s O(n²) — much faster for large n','Merge sort is easier to code','They have the same complexity'], answer:1, explanation:'For n=1,000,000: bubble sort needs 10¹² operations, merge sort needs only ~20 million. That\'s the difference between years and seconds of computation!' },
      { level:'hard', q:'Can an algorithm have O(1) time but O(n) space?', options:['No, time and space complexity are always equal','Yes! Example: copying an array into a hash set for instant lookup uses O(n) space but O(1) lookup time','Only in Python','Only for sorting algorithms'], answer:1, explanation:'Yes! This is a classic time-space tradeoff. Build a lookup table/hash set (O(n) space) once, then answer any query in O(1). More memory → faster time.' },
      { level:'hard', q:'What is the key idea behind "divide and conquer"?', options:['Try every possible solution (brute force)','Split problem into smaller subproblems, solve each, combine results','Use the GPU instead of CPU','Optimize loops with tricks'], answer:1, explanation:'Divide & Conquer: break BIG problem → small problems → solve small ones → merge answers. Examples: merge sort, binary search, Strassen matrix multiply. Usually gives O(n log n) from O(n²)!' },
    ]
  },
  {
    id: 'oop',
    emoji: '🎯',
    title: 'Object-Oriented Programming',
    subtitle: 'Classes, objects, inheritance, polymorphism, encapsulation & abstraction',
    color: 'from-violet-600/20 to-purple-600/20',
    glow: 'rgba(124,58,237,0.3)',
    tags: ['OOP', 'Classes', 'Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction'],
    questions: [
      { level:'easy', q:'What is the difference between a class and an object?', options:['They are the same thing','Class is a blueprint/template; object is a specific instance created from it','Object is a blueprint; class is an instance','Class is in memory; object is in code'], answer:1, explanation:'Class = Cookie cutter (blueprint). Object = actual cookie made FROM that cutter. Dog class defines what a dog IS; dog1 = Dog("Rex") creates a SPECIFIC dog!' },
      { level:'easy', q:'What do the "4 Pillars of OOP" include?', options:['Speed, Memory, Storage, Network','Encapsulation, Inheritance, Polymorphism, Abstraction','Classes, Objects, Methods, Variables','Python, Java, C++, Ruby'], answer:1, explanation:'The 4 Pillars: Encapsulation (bundle + hide data), Inheritance (child class gets parent features), Polymorphism (same method, different behavior), Abstraction (hide complexity).' },
      { level:'medium', q:'What does "super().__init__()" do in a subclass?', options:['Creates a new parent class','Calls the parent class\'s __init__ constructor to initialize inherited attributes','Deletes the parent class','Copies all methods from parent'], answer:1, explanation:'super() gives you access to the PARENT class. super().__init__() runs the parent\'s constructor so the parent\'s attributes (like self.name) are properly set up first.' },
      { level:'medium', q:'What is polymorphism in OOP?', options:['A class having multiple parents','Different classes implementing the same method name with different behavior','Variables changing their type','Functions with multiple parameters'], answer:1, explanation:'Polymorphism = "many forms". Dog.speak() says "Woof!", Cat.speak() says "Meow!". Same method name, different behavior per class. Code can work with ANY Animal without knowing the specific type.' },
      { level:'hard', q:'What is the difference between inheritance and composition?', options:['They are identical','Inheritance: "is a" relationship (Dog is an Animal). Composition: "has a" relationship (Car has an Engine)','Composition is faster','Inheritance uses more memory'], answer:1, explanation:'"Favour composition over inheritance" (GoF principle). Inheritance = tight coupling. Composition = flexible. Car HAS Engine (can swap engine) vs Car IS Engine (stuck!).' },
      { level:'hard', q:'What does "private" (__ prefix in Python) do to a class attribute?', options:['Deletes it','Makes it read-only','Name-mangles it to prevent direct external access (not truly private, but discouraged)','Makes it faster'], answer:2, explanation:'Python\'s __attr becomes _ClassName__attr (name mangling). It\'s a convention/signal, not true enforcement. Prevents accidental access but a determined programmer can still reach it.' },
    ]
  },
  {
    id: 'ml',
    emoji: '🤖',
    title: 'Machine Learning',
    subtitle: 'Training data, neural networks, overfitting, supervised vs unsupervised learning',
    color: 'from-cyan-600/20 to-blue-600/20',
    glow: 'rgba(6,182,212,0.3)',
    tags: ['ML', 'Neural Networks', 'Training Data', 'Overfitting', 'Supervised', 'Model'],
    questions: [
      { level:'easy', q:'What is the purpose of TEST data in machine learning?', options:['To train the model on new examples','To evaluate how well the model performs on data it has NEVER seen before','To clean the training data','To speed up training'], answer:1, explanation:'Test data = the final exam! Training data = homework (model learns from it). Test data must be kept SEPARATE — like not studying the exact test questions. Reveals true performance!' },
      { level:'easy', q:'What is supervised learning?', options:['A human supervises the computer while it runs','Training with labeled data — input paired with correct output','Letting the model learn without any labels','Learning by playing games'], answer:1, explanation:'Supervised = "I\'ll show you the answers". You give the model 10,000 emails labeled "spam" or "not spam". It learns the pattern to classify NEW emails it\'s never seen.' },
      { level:'medium', q:'What is overfitting?', options:['Training for too long wears out the GPU','Model memorizes training data so well it fails on new/unseen data','Using too much training data','A model that is too simple'], answer:1, explanation:'Overfitting = memorizing instead of learning! Like studying by memorizing exact questions instead of understanding concepts. Gets 100% on training, fails on new data.' },
      { level:'medium', q:'What does a neuron in a neural network do?', options:['Stores data like RAM','Takes inputs, multiplies by weights, sums them, applies activation function, outputs result','Runs a loop','Connects to the internet'], answer:1, explanation:'Neural network neuron: sum(inputs × weights) + bias → activation function → output. Inspired by brain neurons! Millions of these connected in layers = deep learning.' },
      { level:'hard', q:'Why do neural networks need "activation functions"?', options:['To speed up computation','To introduce non-linearity — without them, stacked linear layers collapse to a single linear transformation','To normalize input data','To prevent overfitting'], answer:1, explanation:'Without activation functions, 100 layers of matrix multiplications = still just one big matrix multiplication (linear). Activation functions (ReLU, sigmoid) add the non-linearity needed to learn complex patterns!' },
      { level:'hard', q:'What is the difference between training error and test error?', options:['They are always equal','Training error measures performance on seen data; test error measures performance on unseen data — the gap reveals overfitting','Test error is always higher than training error','Only test error matters'], answer:1, explanation:'Large gap (low training error, high test error) = overfitting. Small gap with both low = good! The goal is LOW test error, not just low training error. The model must GENERALIZE.' },
    ]
  },
  {
    id: 'internet',
    emoji: '🌐',
    title: 'Internet & Networking',
    subtitle: 'IP addresses, DNS, TCP/IP, packets, HTTP requests & response codes',
    color: 'from-sky-600/20 to-blue-600/20',
    glow: 'rgba(14,165,233,0.3)',
    tags: ['IP', 'DNS', 'TCP', 'HTTP', 'Packets', 'URL', 'Status Codes'],
    questions: [
      { level:'easy', q:'What does DNS do?', options:['Encrypts your internet traffic','Converts human-readable domain names (google.com) to IP addresses (142.250.185.46)','Stores your passwords','Speeds up your internet connection'], answer:1, explanation:'DNS = the internet\'s phone book! You type "google.com", DNS looks it up and says "that\'s at 142.250.185.46". Your computer then connects to THAT IP address.' },
      { level:'easy', q:'What does HTTP status code 404 mean?', options:['Server error','Success — page found','Page not found (client asked for something that doesn\'t exist)','Authentication required'], answer:2, explanation:'404 Not Found = the server received your request fine, but couldn\'t find the page you asked for. Maybe you typed the URL wrong, or the page was deleted!' },
      { level:'medium', q:'Why is data sent in "packets" rather than one big stream?', options:['Packets are encrypted, streams are not','Packets share network efficiently, can take different routes, and only failed packets need resending','Packets are faster than streams','Packets are required by the hardware'], answer:1, explanation:'Packet switching is brilliant! Multiple users share the same wire, packets can route around damage, and if one packet fails only THAT packet is resent (not the whole file).' },
      { level:'medium', q:'What is the difference between GET and POST HTTP methods?', options:['GET is faster, POST is slower','GET retrieves data (visible in URL); POST sends data to server (in request body, not in URL)','POST is secure, GET is not','They are identical'], answer:1, explanation:'GET = "give me data" (parameters in URL: ?q=search). POST = "here\'s data, process it" (body, like form submissions). Passwords should NEVER be in GET URLs!' },
      { level:'hard', q:'Explain what happens when you type www.google.com and press Enter.', options:['The browser directly connects to Google\'s computer','DNS resolves domain → TCP connects to IP → HTTP GET sent → Google responds with HTML → Browser renders it','The website downloads to your computer first','Your ISP fetches the page for you'], answer:1, explanation:'Full journey: DNS lookup → TCP 3-way handshake → TLS encryption handshake → HTTP GET / → Google\'s server sends HTML+CSS+JS → Browser renders the page. All in ~50-200ms!' },
      { level:'hard', q:'What does the TCP "three-way handshake" accomplish before data transfer?', options:['Encrypts all data','Establishes a reliable connection (SYN → SYN-ACK → ACK) ensuring both sides are ready and can communicate','Compresses the data','Sets the packet size'], answer:1, explanation:'SYN (I want to connect) → SYN-ACK (OK, I\'m ready) → ACK (Great, let\'s go!). This ensures both client and server are alive, ready, and agree on connection parameters before any data flows.' },
    ]
  },
  {
    id: 'web',
    emoji: '🌍',
    title: 'Web Technologies',
    subtitle: 'HTML structure, CSS visuals, JavaScript behavior, APIs & REST methods',
    color: 'from-orange-600/20 to-amber-600/20',
    glow: 'rgba(249,115,22,0.3)',
    tags: ['HTML', 'CSS', 'JavaScript', 'API', 'REST', 'GET/POST/PUT/DELETE'],
    questions: [
      { level:'easy', q:'What does HTML provide to a web page?', options:['Visual styling (colors, fonts, layout)','The structure and content (headings, paragraphs, images, links)','Interactive behavior (clicks, animations)','Database queries'], answer:1, explanation:'HTML = the skeleton! It defines WHAT content exists: <h1> headings, <p> paragraphs, <img> images, <a> links. CSS dresses it up, JavaScript makes it dance.' },
      { level:'easy', q:'What is the purpose of CSS?', options:['To define page structure','To handle user clicks','To control visual appearance: colors, fonts, layout, animations','To send data to servers'], answer:2, explanation:'CSS = the stylist! It makes HTML look beautiful: colors, fonts, spacing, layouts, hover effects, animations. Without CSS, the web would be plain black text on white backgrounds.' },
      { level:'medium', q:'What does the DELETE HTTP method do in a REST API?', options:['Deletes the entire server','Removes a specific resource (e.g., DELETE /users/5 removes user with ID 5)','Deletes all data','Logs out the user'], answer:1, explanation:'REST API methods: GET=read, POST=create, PUT/PATCH=update, DELETE=remove. DELETE /posts/42 tells the server "delete post number 42". Like sending a demolition order!' },
      { level:'medium', q:'What does HTTP 201 status code mean?', options:['OK, request succeeded','Resource successfully CREATED (response to successful POST)','Redirect to new URL','Bad request'], answer:1, explanation:'201 Created = "I made the new thing you asked for!" Returned after a successful POST request that creates a new resource (new user, new post, new order, etc.).' },
      { level:'hard', q:'What is the difference between an HTML <div> and <span>?', options:['They are identical','<div> is a block-level container (takes full width, starts new line); <span> is inline (stays in text flow)','<div> is for text, <span> is for images','<span> is newer than <div>'], answer:1, explanation:'<div> = block element: like a paragraph, takes full row width, starts on new line. <span> = inline element: stays within text flow, like highlighting a word. Critical for CSS layout!' },
      { level:'hard', q:'What is SQL injection and how is it prevented?', options:['A database speed optimization','Malicious SQL inserted via user input to manipulate queries; prevented by parameterized queries/prepared statements','A way to join multiple tables','A database backup method'], answer:1, explanation:'SQL injection: user types "admin\'--" → query becomes: WHERE user=\'admin\'--\' AND pass=... (comment kills password check!). Fix: NEVER concatenate user input into SQL. Use prepared statements!' },
    ]
  },
  {
    id: 'databases',
    emoji: '💾',
    title: 'Databases & SQL',
    subtitle: 'Tables, queries, JOINs, indexing, SQL injection attacks & defense',
    color: 'from-emerald-600/20 to-teal-600/20',
    glow: 'rgba(16,185,129,0.3)',
    tags: ['SQL', 'Tables', 'JOIN', 'SELECT', 'INSERT', 'Index', 'SQL Injection'],
    questions: [
      { level:'easy', q:'What is a primary key in a database table?', options:['The most important column','A unique identifier for each row (no duplicates, no NULL allowed)','The first column always','The password column'], answer:1, explanation:'Primary key = the row\'s unique ID tag. Like a student ID number — no two students share one. AUTO_INCREMENT makes the database assign IDs automatically: 1, 2, 3...' },
      { level:'easy', q:'What does "SELECT * FROM users" do?', options:['Creates a new users table','Deletes all users','Retrieves ALL columns and ALL rows from the users table','Updates all user records'], answer:2, explanation:'SELECT = "give me data". * = "all columns". FROM users = "from the users table". This is the most basic SQL query — reads everything. Add WHERE to filter!' },
      { level:'medium', q:'What does a SQL JOIN do?', options:['Combines two databases','Links rows from two tables based on a related column (like user_id)','Deletes duplicate rows','Sorts a table'], answer:1, explanation:'JOIN = "combine related tables"! Users table has user_id. Orders table has user_id. JOIN on user_id → see which USER placed which ORDER. Relational databases are BUILT on this.' },
      { level:'medium', q:'Why should you NEVER do: query = "SELECT * FROM users WHERE name=\'"+user_input+"\'"?', options:['It\'s too slow','It\'s vulnerable to SQL injection — user could type \' OR \'1\'=\'1 to log in as anyone','The syntax is wrong','It returns too many results'], answer:1, explanation:'String concatenation = SQL injection waiting to happen! If user types: \' OR \'1\'=\'1, the query becomes: WHERE name=\'\' OR \'1\'=\'1\' which is ALWAYS TRUE → returns all users!' },
      { level:'hard', q:'What is a database INDEX and why is it used?', options:['A list of all tables','A data structure (B-tree) that speeds up queries on a column, at the cost of extra storage and slower writes','A backup of the database','A foreign key'], answer:1, explanation:'Index = a sorted B-tree of column values with pointers to rows. Without index: full table scan O(n). With index: tree search O(log n). Like a book\'s index vs reading every page!' },
      { level:'hard', q:'Write a safe SQL login check. Which approach is correct?', options:['cursor.execute(f"SELECT * FROM users WHERE user=\'{u}\' AND pass=\'{p}\'")',  'cursor.execute("SELECT * FROM users WHERE user=%s AND pass=%s", (u, p))','cursor.execute("SELECT * FROM " + table_name)','All of the above are safe'], answer:1, explanation:'Parameterized queries (option B) are the ONLY safe approach! The database treats %s values as DATA, not code. Even if user types \' OR \'1\'=\'1, it searches for that LITERAL string as username.' },
    ]
  },
];
