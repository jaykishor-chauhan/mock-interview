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
        title: "What is an Operating System?",
        bullets: [
            "An Operating System (OS) is system software that acts as an interface between the computer user and the computer hardware. It manages computer hardware, software resources, and provides common services for computer programs.",
            "Its primary goals are to make the computer system convenient to use and to use the computer hardware in an efficient manner. Examples include Windows, Linux, macOS, and Android."
        ],
        resources: [{ "label": "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/what-is-an-operating-system/" }]
    },
    {
        id: 2,
        title: "What is the difference between a Process and a Thread?",
        bullets: [
            "A Process is a program in execution. It is a heavyweight entity that has its own separate memory space (Stack, Heap, Data, Code). Inter-process communication is slower and more expensive.",
            "A Thread is a subset of a process, often called a 'lightweight process'. Threads within the same process share the same memory space (Code, Data, and Files) but have their own stack and registers. Context switching between threads is faster than between processes."
        ],
        resources: [{ "label": "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/difference-between-process-and-thread/" }]
    },
    {
        id: 3,
        title: "What is Deadlock and what are the necessary conditions for it?",
        bullets: [
            "Deadlock is a situation where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process.",
            "There are four necessary conditions for deadlock (Coffman conditions): 1) Mutual Exclusion (resources are non-sharable), 2) Hold and Wait (process holds a resource while waiting for others), 3) No Preemption (resources cannot be forcibly taken), and 4) Circular Wait (a closed chain of processes waiting for each other)."
        ],
        resources: [{ "label": "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/introduction-of-deadlock-in-operating-system/" }]
    },
    {
        id: 4,
        title: "What is Virtual Memory?",
        bullets: [
            "Virtual Memory is a storage allocation scheme that creates an illusion for users of a very large main memory. It allows the execution of processes that are not completely in memory.",
            "It works by separating logical memory (viewed by the user) from physical memory. The OS maps logical addresses to physical addresses using a Page Table. When RAM is full, the OS moves rarely used pages to a reserved space on the hard disk (swap space), effectively extending the available RAM."
        ],
        resources: [{ "label": "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/virtual-memory-in-operating-system/" }]
    },
    {
        id: 5,
        title: "What is Paging?",
        bullets: [
            "Paging is a memory management scheme that eliminates the need for contiguous allocation of physical memory. It avoids external fragmentation.",
            "The physical memory is divided into fixed-size blocks called 'Frames', and logical memory is divided into blocks of the same size called 'Pages'. When a process is executed, its pages are loaded into any available frames in main memory. The OS maintains a Page Table to track the mapping between pages and frames."
        ],
        resources: [{ "label": "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/paging-in-operating-system/" }]
    },
    {
        id: 6,
        title: "What is Segmentation?",
        bullets: [
            "Segmentation is a memory management technique where memory is divided into variable-size parts usually corresponding to logical units of a program, such as the main function, stack, symbol table, or local variables.",
            "Unlike paging which is invisible to the user, segmentation is visible. A logical address consists of two parts: a segment number and an offset. This allows for better protection and sharing of code compared to paging."
        ],
        resources: [{ "label": "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/segmentation-in-operating-system/" }]
    },
    {
        id: 7,
        title: "What is a Semaphore?",
        bullets: [
            "A Semaphore is a synchronization variable (integer) used to manage concurrent processes by simple integer operations. It is used to solve the critical section problem.",
            "There are two types: 1) Binary Semaphore (Mutex), which takes values 0 or 1 and is used for mutual exclusion. 2) Counting Semaphore, which can take any non-negative integer value and is used to control access to a resource that has multiple instances. Operations used are wait() (P) and signal() (V)."
        ],
        resources: [{ "label": "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/semaphores-in-process-synchronization/" }]
    },
    {
        id: 8,
        title: "What is Context Switching?",
        bullets: [
            "Context Switching is the process of storing the state of a process or thread, so that it can be reloaded when required, and execution can be resumed from the same point later.",
            "This allows multiple processes to share a single CPU. When the scheduler switches the CPU from executing one process to another, the state from the current process is saved into the Process Control Block (PCB), and the state for the new process is loaded. It is pure overhead because the system does no useful work while switching."
        ],
        resources: [{ "label": "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/context-switch-in-operating-system/" }]
    },
    {
        id: 9,
        title: "What is the difference between Internal and External Fragmentation?",
        bullets: [
            "Internal Fragmentation occurs when memory is allocated in fixed-sized blocks (like paging). If a process needs less memory than the block size, the remaining space inside the allocated block is wasted.",
            "External Fragmentation occurs when there is enough total free memory space to satisfy a request, but the available space is not contiguous (scattered in small chunks). It often happens in dynamic partitioning or segmentation. Compaction or Paging are used to solve this."
        ],
        resources: [{ "label": "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/difference-between-internal-and-external-fragmentation/" }]
    },
    {
        id: 10,
        title: "What is a Kernel and what are its types?",
        bullets: [
            "The Kernel is the core component of an Operating System. It manages system resources and serves as a bridge between applications and data processing done at the hardware level.",
            "There are two main types: 1) Monolithic Kernel: All operating system services (file system, memory management, drivers) run in the same kernel address space (e.g., Linux, Unix). It is faster but a crash in one service can crash the whole system. 2) Microkernel: Only essential services run in kernel mode; others run in user space (e.g., Minix, QNX). It is more stable but slower due to message passing."
        ],
        resources: [{ "label": "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/kernel-in-operating-system/" }]
    },
    {
        id: 11,
        title: "What is Thrashing?",
        bullets: [
            "Thrashing is a state where the CPU spends more time swapping pages in and out of memory (paging) than actually executing instructions.",
            "This happens when the degree of multiprogramming is too high, meaning there are too many processes running and the total memory required exceeds the available physical RAM. The system becomes extremely slow or unresponsive. It can be resolved by decreasing the number of running processes or adding more RAM."
        ],
        resources: [{ "label": "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/techniques-to-handle-thrashing/" }]
    },
    {
        id: 12,
        title: "What is a System Call?",
        bullets: [
            "A System Call is a programmatic way in which a computer program requests a service from the kernel of the operating system.",
            "It provides the interface between a process and the operating system. Examples include opening a file (open), creating a new process (fork), or terminating a process (exit). When a system call is made, the mode switches from user mode to kernel mode."
        ],
        resources: [{ "label": "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/introduction-of-system-call/" }]
    },
    {
        id: 13,
        title: "What is Demand Paging?",
        bullets: [
            "Demand Paging is a technique used in virtual memory systems where pages are loaded into memory only when they are actually needed (demanded) by the executing program, rather than loading the entire program at once.",
            "If the program references a page that is not in memory, a 'Page Fault' trap is triggered. The OS then fetches the missing page from the disk (backing store), loads it into a free frame, and restarts the instruction."
        ],
        resources: [{ "label": "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/virtual-memory-in-operating-system/" }]
    },
    {
        id: 14,
        title: "Explain the difference between Multiprogramming and Multitasking.",
        bullets: [
            "Multiprogramming keeps multiple jobs in memory simultaneously to maximize CPU utilization. When one job waits for I/O, the CPU switches to another job.",
            "Multitasking (Time Sharing) is a logical extension of multiprogramming. The CPU switches between jobs so frequently that users can interact with each program while it is running. The focus is on responsiveness rather than just CPU utilization."
        ],
        resources: [{ "label": "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/difference-between-multiprogramming-and-multitasking/" }]
    },
    {
        id: 15,
        title: "What is a Race Condition?",
        bullets: [
            "A Race Condition is an undesirable situation that occurs when a device or system attempts to perform two or more operations at the same time, but because of the nature of the device or system, the operations must be done in the proper sequence to be done correctly.",
            "In OS, it typically happens when multiple threads access and manipulate shared data concurrently. The final value of the shared data depends on the order of execution. Critical sections and synchronization techniques (like mutexes) are used to prevent this."
        ],
        resources: [{ "label": "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/race-condition-in-operating-system/" }]
    },
    {
        id: 16,
        title: "What is Belady's Anomaly?",
        bullets: [
            "Belady's Anomaly is a phenomenon in which increasing the number of page frames results in an increase in the number of page faults for a certain memory access pattern.",
            "It typically occurs in the First-In-First-Out (FIFO) page replacement algorithm. It contradicts the intuition that giving a process more memory should always improve performance. Algorithms like LRU (Least Recently Used) and Optimal Page Replacement do not suffer from this anomaly."
        ],
        resources: [{ "label": "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/beladys-anomaly-in-page-replacement-algorithms/" }]
    },
    {
        id: 17,
        title: "What is Spooling?",
        bullets: [
            "Spooling (Simultaneous Peripheral Operations On-Line) is a process in which data is temporarily held to be used and executed by a device, program, or the system.",
            "It is commonly used for I/O devices like printers. Since printers are slow, the OS writes documents to a buffer (spool) on the disk. The printer then reads from this buffer at its own speed, allowing the CPU to continue working on other tasks without waiting for the printer to finish."
        ],
        resources: [{ "label": "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/spooling-in-operating-system/" }]
    },
    {
        id: 18,
        title: "What is Banker's Algorithm?",
        bullets: [
            "The Banker's Algorithm is a resource allocation and deadlock avoidance algorithm. It tests for safety by simulating the allocation for predetermined maximum possible amounts of all resources.",
            "Before allocating resources to a process, the algorithm checks if granting the request will leave the system in a 'Safe State'. If yes, resources are allocated; otherwise, the process must wait. It is named so because it is used in banking systems to ensure the bank creates enough cash reserves."
        ],
        resources: [{ "label": "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/bankers-algorithm-in-operating-system-2/" }]
    },
    {
        id: 19,
        title: "What is a Real-Time Operating System (RTOS)?",
        bullets: [
            "An RTOS is an operating system intended to serve real-time applications that process data as it comes in, typically without buffer delays. The key characteristic is predictability and strict time constraints.",
            "There are two types: 1) Hard Real-Time: Deadlines are absolute (e.g., airbags, pacemakers); missing a deadline is catastrophic. 2) Soft Real-Time: Deadlines are important but missed deadlines only degrade performance (e.g., video streaming)."
        ],
        resources: [{ "label": "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/real-time-operating-systems/" }]
    },
    {
        id: 20,
        title: "What is a Zombie Process and an Orphan Process?",
        bullets: [
            "A Zombie Process is a process that has finished execution but still has an entry in the process table. This happens when the child finishes but the parent has not yet called wait() to read its exit status.",
            "An Orphan Process is a process whose parent process has finished or terminated, though it remains running itself. In Unix-like systems, these are adopted by the 'init' process (PID 1), which periodically waits for its children to clean them up."
        ],
        resources: [{ "label": "GeeksForGeeks", "href": "https://www.geeksforgeeks.org/zombie-and-orphan-processes-in-c/" }]
    }
];

const OperatingSystem = () => {
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
                    <h1 className="text-3xl font-bold">Operating System Interview Prep Hub</h1>
                    <p className="text-gray-600 mt-2">Concise topics, quick bullets to prepare for Operating system interviews.</p>
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

export default OperatingSystem;