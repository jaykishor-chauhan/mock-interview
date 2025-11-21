import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Book, Code, ArrowRight } from "lucide-react";

type Topic = {
  id: number;
  title: string;
  bullets: string[];
  resources;
 GeeksForGeekss?: { label: string; href: string }[];
};

const topics: Topic[] = [
    {
       id: 1,
       title: "Is Java Platform Independent if then how?",
       bullets: [
            " Yes, Java is platform-independent.",
            "This is achieved through Bytecode and the JVM. When Java code is compiled, it converts into an intermediate format called Bytecode (.class file), which is not specific to any machine.",
            "This Bytecode is executed by the Java Virtual Machine (JVM). Since there is a specific JVM implementation for every Operating System (Windows, Mac, Linux), the same Bytecode can run anywhere. This is the 'Write Once, Run Anywhere' (WORA) principle."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 2,
       title: "What are the top Java Features?",
       bullets: [
            " The top features of Java include:",
            "1. Simple: Easy to learn, no pointers, automatic memory management.",
            "2. Object-Oriented: Everything is an object (except primitives).",
            "3. Platform Independent: WORA (Write Once, Run Anywhere).",
            "4. Secured: Runs inside a virtual machine sandbox; no explicit pointers.",
            "5. Robust: Strong memory management and exception handling.",
            "6. Multithreaded: Supports concurrent execution of tasks."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 3,
       title: "What is JVM?",
       bullets: [
            " JVM stands for Java Virtual Machine.",
            "It is an abstract computing machine that enables a computer to run a Java program.",
            "It creates a runtime environment in which Java Bytecode can be executed. It performs three main tasks: Loading, Linking, and Initialization."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 4,
       title: "What is JIT?",
       bullets: [
            " JIT stands for Just-In-Time compiler.",
            "It is a component of the JVM that improves performance.",
            "Instead of interpreting bytecode line-by-line every time, the JIT compiler compiles sections of bytecode that are used frequently (hotspots) into native machine code at runtime, allowing for faster execution."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 5,
       title: "What are Memory storages available with JVM?",
       bullets: [
            " The main JVM memory areas are:",
            "1. Heap Memory: Stores objects and instance variables.",
            "2. Stack Memory: Stores method calls, local variables, and reference variables.",
            "3. Class (Method) Area: Stores class structures like metadata, static variables, and constants.",
            "4. PC Register: Stores the address of the current instruction.",
            "5. Native Method Stack: Stores information about native methods."
        ],
       resources: [
            { "label": "Baeldung: Java Memory Model", "href": "https://www.baeldung.com/java-memory-management-interview-questions" }
        ]
    },
    {
       id: 6,
       title: "What is a classloader?",
       bullets: [
            " A Classloader is a subsystem of the JVM used to load class files at runtime.",
            "Java classes are loaded dynamically when referenced by the application. The hierarchy typically includes: Bootstrap ClassLoader, Extension ClassLoader, and System/Application ClassLoader."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 7,
       title: "Difference between JVM, JRE, and JDK.",
       bullets: [
            "JVM (Java Virtual Machine): The abstract machine that executes the bytecode.",
            "JRE (Java Runtime Environment): JVM + Core Libraries. It is required to RUN Java applications.",
            "JDK (Java Development Kit): JRE + Development Tools (Compiler/javac, Debugger). It is required to DEVELOP Java applications."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 8,
       title: "What are the differences between Java and C++?",
       bullets: [
            "",
            "1. Platform: Java is platform-independent; C++ is platform-dependent.",
            "2. Pointers: Java does not support explicit pointers (for security); C++ does.",
            "3. Inheritance: Java does not support multiple inheritance through classes; C++ does.",
            "4. Memory: Java has automatic Garbage Collection; C++ requires manual memory management.",
            "5. Threading: Java has built-in support for threads; C++ relies on third-party libraries (historically)."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 9,
       title: "Explain public static void main(String args[]) in Java.",
       bullets: [
            "",
            "public: Access modifier allowing the JVM to call the method from outside.",
            "static: Allows the JVM to call the main method without creating an instance of the class.",
            "void: The method returns nothing.",
            "main: The name of the method which is the entry point of the program.",
            "String args[]: Accepts command-line arguments as an array of strings."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 10,
       title: "What is Java String Pool?",
       bullets: [
            " The Java String Pool (or String Intern Pool) is a special memory region in the Heap.",
            "When a string is created using a literal (e.g., \"Hello\"), the JVM checks the pool. If the string exists, the reference is returned. If not, a new string is added to the pool.",
            "This saves memory by reusing immutable String objects."
        ],
       resources: [
             { "label": "GeeksForGeeks: String Pool", "href": "https://www.geeksforgeeks.org/string-constant-pool-in-java/" }
        ]
    },
    {
       id: 11,
       title: "What will happen if we don't declare the main as static?",
       bullets: [
            " The program will compile successfully, but it will throw a runtime error: 'NoSuchMethodError: main'.",
            "This is because the JVM attempts to call main() without creating an object of the class, and non-static methods require an object instance."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 12,
       title: "What are Packages in Java?",
       bullets: [
            " A Package in Java is a mechanism to encapsulate a group of classes, sub-packages, and interfaces.",
            "It organizes classes into a folder structure and prevents naming conflicts."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 13,
       title: "Why Packages are used?",
       bullets: [
            " Packages are used to:",
            "1. Prevent naming conflicts (two classes can have the same name if they are in different packages).",
            "2. Make searching/locating classes easier.",
            "3. Control access (protected and default access modifiers work based on packages)."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 14,
       title: "What are the advantages of Packages in Java?",
       bullets: [
            "",
            "1. Reusability: Classes in packages can be reused in other programs.",
            "2. Organization: Logical grouping of related classes (e.g., java.util, java.io).",
            "3. Encapsulation/Hiding: Provides access protection."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 15,
       title: "How many types of packages are there in Java?",
       bullets: [
            " There are two types:",
            "1. Built-in Packages: Provided by the Java API (e.g., java.lang, java.util, java.awt).",
            "2. User-defined Packages: Created by developers to organize their own classes."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 16,
       title: "Explain different data types in Java.",
       bullets: [
            " Java has two categories of data types:",
            "1. Primitive Data Types: boolean, char, byte, short, int, long, float, double.",
            "2. Non-Primitive (Reference) Data Types: Classes, Interfaces, Arrays, Strings."
        ],
       resources: [
            { "label": "Oracle: Data Types", "href": "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html" }
        ]
    },
    {
       id: 17,
       title: "When a byte datatype is used?",
       bullets: [
            " The byte datatype is used to save memory in large arrays where the memory saving is most needed.",
            "It is an 8-bit signed integer. It is also useful when working with raw binary data (e.g., reading a file or network stream)."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 18,
       title: "Can we declare Pointer in Java?",
       bullets: [
            " No, Java does not support explicit pointers.",
            "This choice was made to ensure memory security and simplicity, preventing direct memory access and manipulation."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 19,
       title: "What is the default value of byte datatype in Java?",
       bullets: [
            " The default value of a byte is 0."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 20,
       title: "What is the default value of float and double datatype in Java?",
       bullets: [
            "",
            "float: 0.0f",
            "double: 0.0d"
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 21,
       title: "What is the Wrapper class in Java?",
       bullets: [
            " A Wrapper class is a class whose object wraps or contains primitive data types.",
            "Examples include: Integer (for int), Character (for char), Double (for double), etc."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 22,
       title: "Why do we need wrapper classes?",
       bullets: [
            " We need wrapper classes because:",
            "1. Collection frameworks (like ArrayList, HashMap) store Objects, not primitives.",
            "2. To support synchronization in multithreading (Objects are needed).",
            "3. To provide utility methods (e.g., Integer.parseInt())."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 23,
       title: "Differentiate between instance and local variables.",
       bullets: [
            "",
            "Instance Variables: Declared inside a class but outside methods. They are created when an object is created and destroyed when the object is destroyed.",
            "Local Variables: Declared inside a method/block. They are created when the method is entered and destroyed when the method exits."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 24,
       title: "What are the default values assigned to variables and instances in Java?",
       bullets: [
            " Only Instance variables (and static variables) get default values.",
            "int: 0, boolean: false, objects: null, float: 0.0.",
            "Local variables do NOT get default values and must be initialized before use."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 25,
       title: "What is a Class Variable?",
       bullets: [
            " A Class Variable is also known as a static variable.",
            "It is declared with the 'static' keyword inside a class but outside any method. There is only one copy of a class variable, shared among all instances of that class."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 26,
       title: "What is the default value stored in Local Variables?",
       bullets: [
            " Local variables do not have a default value.",
            "If you try to use a local variable without initializing it, the compiler will throw an error."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 27,
       title: "Explain the difference between instance variable and a class variable.",
       bullets: [
            "",
            "Scope: Instance variable belongs to a specific object; Class variable belongs to the class itself.",
            "Memory: Instance variables get new memory for every object created; Class variables use a single shared memory space.",
            "Access: Class variables can be accessed via the Class name; Instance variables require an object."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 28,
       title: "What is a static variable?",
       bullets: [
            " A static variable is a variable that belongs to the class rather than an instance.",
            "It is initialized only once at the start of the execution. It is used for memory management and sharing properties common to all objects (e.g., a company name for all employees)."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 29,
       title: "What is the difference between System.out, System.err, and System.in?",
       bullets: [
            "",
            "System.out: Standard Output Stream. Used to print normal messages to the console.",
            "System.err: Standard Error Stream. Used to print error messages (often displayed in red in IDEs).",
            "System.in: Standard Input Stream. Used to read data from the keyboard/console."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 30,
       title: "What do you understand by an IO stream?",
       bullets: [
            " An IO Stream acts as a sequence of data.",
            "It represents a flow of data from a source (input) or to a destination (output). Java performs I/O through Streams (java.io package)."
        ],
       resources: [
            { "label": "Oracle: I/O Streams", "href": "https://docs.oracle.com/javase/tutorial/essential/io/streams.html" }
        ]
    },
    {
       id: 31,
       title: "What is the difference between the Reader/Writer class hierarchy and the InputStream/OutputStream class hierarchy?",
       bullets: [
            "",
            "InputStream/OutputStream: Byte-oriented streams. Used for reading/writing raw binary data (images, audio, etc.) or 8-bit data.",
            "Reader/Writer: Character-oriented streams. Used for reading/writing text data (16-bit Unicode characters)."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 32,
       title: "What are the super most classes for all the streams?",
       bullets: [
            "",
            "For Byte Streams: InputStream and OutputStream.",
            "For Character Streams: Reader and Writer."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 33,
       title: "What are the FileInputStream and FileOutputStream?",
       bullets: [
            "",
            "FileInputStream: Used to read bytes from a file.",
            "FileOutputStream: Used to write bytes to a file.",
            "They are byte-stream classes used for file handling."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 34,
       title: "What is the purpose of using BufferedInputStream and BufferedOutputStream classes?",
       bullets: [
            " They provide internal buffering to I/O operations.",
            "Instead of reading/writing one byte at a time (which is slow due to disk access), they read/write large blocks of data into a buffer, significantly improving performance."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 35,
       title: "What are FilterStreams?",
       bullets: [
            " FilterStreams are wrapper classes that add additional functionality to existing streams.",
            "Examples: DataInputStream (reads primitives), BufferedInputStream (adds buffering). They sit on top of a raw stream."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 36,
       title: "What is an I/O filter?",
       bullets: [
            " An I/O filter generally refers to the concept (or classes like FilterInputStream) that reads data from one stream, processes/transforms it (filters it), and passes it along.",
            "It does not exist as a standalone source of data."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 37,
       title: "How many ways you can take input from the console?",
       bullets: [
            " Common ways include:",
            "1. Using Scanner class (java.util.Scanner).",
            "2. Using BufferedReader (java.io.BufferedReader) wrapping System.in.",
            "3. Using Console class (System.console()).",
            "4. Using Command Line Arguments (String args[])."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 38,
       title: "Difference in the use of print, println, and printf.",
       bullets: [
            "",
            "print(): Prints text and keeps the cursor on the same line.",
            "println(): Prints text and moves the cursor to the next line.",
            "printf(): Used for formatted output (similar to C), allowing format specifiers like %d, %s."
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    },
    {
       id: 39,
       title: "What are operators?",
       bullets: [
            " Operators are symbols used to perform operations on variables and values.",
            "Examples include + (addition), == (comparison), && (logical AND)."
        ],
       resources: [
             { "label": "Oracle: Operators", "href": "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/operators.html" }
        ]
    },
    {
       id: 40,
       title: "How many types of operators are available in Java?",
       bullets: [
            " Major types include:",
            "1. Arithmetic (+, -, *, /, %)",
            "2. Unary (++, --, !)",
            "3. Assignment (=, +=)",
            "4. Relational (==, !=, <, >)",
            "5. Logical (&&, ||)",
            "6. Bitwise (&, |, ^)",
            "7. Ternary (? :)",
            "8. Shift (<<, >>, >>>)"
        ],
       resources: [{"label" : "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/java/java-interview-questions/"}]
    }
]

const Java = () => {
	const [query, setQuery] = useState("");
	const [expanded, setExpanded] = useState<Record<number, boolean>>({});

	const filtered = topics.filter((t) => {
		const q = query.trim().toLowerCase();
		if (!q) return true;
		if (t.title.toLowerCase().includes(q)) return true;
		return t.bullets.some((b) => b.toLowerCase().includes(q));
	});

	const toggle = (id: number) => setExpanded((s) => ({ ...s, [id]: !s[id] }));

	return (
		<div className="min-h-screen bg-gray-50 py-10">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold">Java Interview Prep —GeeksForGeeks Hub</h1>
					<p className="text-gray-600 mt-2">Concise topics, quick bullets and curatedGeeksForGeekss to prepare for Java interviews.</p>
				</div>

				<div className="flex flex-col md:flex-row gap-6">
					<div className="flex-1">
						<div className="flex items-center gap-3 mb-6">
							<Search className="w-5 h-5 text-gray-400" />
							<Input placeholder="Search topics or keywords..." value={query} onChange={(e) => setQuery(e.target.value)} />
						</div>

						<div className="grid gap-4">
							{filtered.map((t) => (
								<Card key={t.id} className="border border-gray-200">
									<CardHeader>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-3">
												<Badge className="bg-gray-100 text-gray-900 border border-gray-200">{t.id}</Badge>
												<CardTitle className="text-lg font-semibold">{t.title}</CardTitle>
											</div>
											<div className="flex items-center gap-2">
												<Button size="sm" variant={expanded[t.id] ? "default" : "outline"} onClick={() => toggle(t.id)}>
													{expanded[t.id] ? "Collapse" : "Expand"}
												</Button>
											</div>
										</div>
									</CardHeader>

									{expanded[t.id] && (
										<CardContent>
											<ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
												{t.bullets.map((b, i) => (
													<li key={i}>{b}</li>
												))}
											</ul>

											{t.resources && (
												<div className="mt-4 flex flex-wrap gap-2">
													{t.resources.map((r, i) => (
														<a key={i} href={r.href} target="_blank" rel="noreferrer">
															<Button size="sm" className="flex items-center gap-2" variant="outline">
																<Book className="w-4 h-4" /> {r.label} <ArrowRight className="w-3 h-3" />
															</Button>
														</a>
													))}
												</div>
											)}
										</CardContent>
									)}
								</Card>
							))}

							{filtered.length === 0 && (
								<Card className="text-center border border-gray-200 py-8">
									<CardContent>
										<Code className="w-6 h-6 mx-auto text-gray-400 mb-3" />
										<h3 className="font-semibold">No topics match your search</h3>
										<p className="text-sm text-gray-500">Try broader terms or clear the search</p>
										<div className="mt-4">
											<Button onClick={() => setQuery("")} className="bg-green-500 text-white">Clear</Button>
										</div>
									</CardContent>
								</Card>
							)}
						</div>
					</div>

				</div>
			</div>
		</div>
	);
};

export default Java;