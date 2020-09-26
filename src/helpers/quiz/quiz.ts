import { LEVEL_TYPE } from "helpers/level-type"

export const MAX_QUIZ_SIZE = 5

export interface Question {
    question: string
    options: string[]
    corrects: string[]
    isOr: boolean
    difficulty: "Easy" | "Medium" | "Hard"
}

const quizList: Question[] = [
    {
        question: "What is the name of our project ?",
        options: ["BacTail", " iGEM", " IONIS"],
        corrects: ["BacTail"],
        isOr: false,
        difficulty: "Easy",
    },
    {
        question: "What is the antimicrobial resistance ?",
        options: [
            "Plants resistant to viruses",
            " Bacteria resistant to antibiotics",
            " fungis resistans to bacteria",
        ],
        corrects: ["Bacteria resistant to antibiotics"],
        isOr: false,
        difficulty: "Easy",
    },
    {
        question: "Are bacteria only pathogenic to humans ? ",
        options: ["Yes", " No"],
        corrects: ["No"],
        isOr: false,
        difficulty: "Easy",
    },
    {
        question: "Where can we find bacteria ?",
        options: ["In animals", " In humans", " In nature", " In Space"],
        corrects: ["In animals", " In humans", " In nature"],
        isOr: false,
        difficulty: "Easy",
    },
    {
        question: "How can we kill bacteria ?",
        options: [
            "Antibiotics",
            " Hygiene",
            " Antiseptic solution",
            " Telling them to die",
        ],
        corrects: ["Antibiotics", " Hygiene", " Antiseptic solution"],
        isOr: false,
        difficulty: "Medium",
    },
    {
        question: "The most abundant organisms on Earth are?",
        options: ["Humans", " Microbes", " Viruses"],
        corrects: ["Microbes"],
        isOr: false,
        difficulty: "Easy",
    },
    {
        question: "How many cells does one bacteria have?",
        options: ["One", " Two", "", " Multiple"],
        corrects: ["One", " Two", "", " Multiple"],
        isOr: false,
        difficulty: "Hard",
    },
    {
        question:
            "Bacteria share similar structures that plants have. What are two of these structures?",
        options: [
            "Nucleus & Cell Wall",
            " Cell Wall & Cell Membrane",
            " Cell Wall & Tail",
        ],
        corrects: ["Cell Wall & Cell Membrane"],
        isOr: false,
        difficulty: "Easy",
    },
    {
        question: "Do bacteria have a nucleus ?",
        options: ["Yes", " No"],
        corrects: ["Yes"],
        isOr: false,
        difficulty: "Easy",
    },
    {
        question: "How do you name a cell without a nucleus ?",
        options: ["Prokaryotes", " Eukaryotes", " Viruses"],
        corrects: ["Prokaryotes"],
        isOr: false,
        difficulty: "Easy",
    },
    {
        question: "Which kingdom are considered as the living ? ",
        options: ["Eubacteria", " Archaebacteria", " Prolaryotes", " Viruses"],
        corrects: ["Eubacteria", " Archaebacteria", " Prolaryotes"],
        isOr: false,
        difficulty: "Easy",
    },
    {
        question: "From what do the living kingdom came from ?",
        options: ["Space", " LUCA", " Egyptians"],
        corrects: ["LUCA or Last Unkwnon Commnon Ancestor"],
        isOr: false,
        difficulty: "Easy",
    },
    {
        question: "A group of bacteria growing in a Petri plate are called a?",
        options: ["Colony", " Group", " Blob"],
        corrects: ["Colony"],
        isOr: false,
        difficulty: "Easy",
    },
    {
        question: "Thanks to which strucure can bacteria move ? ",
        options: ["Flagellum", " Tail", " Appendage"],
        corrects: ["Flagellum"],
        isOr: false,
        difficulty: "Easy",
    },
    {
        question: "How can bacteria do reproduce theselves ? ",
        options: ["Sexually", " Asexually", " Electricity"],
        corrects: ["Sexually", " Asexually"],
        isOr: false,
        difficulty: "Easy",
    },
    {
        question: "Bacteriophages are",
        options: ["Bacteria viruses", " Immunity cells", " Plants"],
        corrects: ["Bacteria viruses"],
        isOr: false,
        difficulty: "Easy",
    },
    {
        question: "How do bacteria reproduce most of the time ?",
        options: ["Asexually", " Sexually", " Equal amounts"],
        corrects: ["Asexually"],
        isOr: false,
        difficulty: "Easy",
    },
    {
        question: "What is the main action of bacteria on earth ? ",
        options: ["Decomposers", " Make medicine", " Clean up plastics"],
        corrects: ["Decomposers"],
        isOr: false,
        difficulty: "Easy",
    },
    {
        question: "The outer covering of a bacteria cell is called the",
        options: ["Flagella", " Cell wall", " Cytoplasm"],
        corrects: ["Cell Wall & Cell Membrane"],
        isOr: false,
        difficulty: "Easy",
    },
    {
        question: "Strep throat is caused by",
        options: ["Bacteria", " Viruses"],
        corrects: ["Bacteria"],
        isOr: false,
        difficulty: "Easy",
    },
    {
        question: "The flu is caused by",
        options: ["Bacteria", " Viruses"],
        corrects: ["Viruses"],
        isOr: false,
        difficulty: "Easy",
    },
    {
        question: "Bacteria are only found in dirty places",
        options: ["True", " False"],
        corrects: ["False"],
        isOr: false,
        difficulty: "Easy",
    },
    {
        question: "Bacteria can only be spread through coughing",
        options: ["True", " False"],
        corrects: ["False"],
        isOr: false,
        difficulty: "Easy",
    },
    {
        question: "The name of a bacteria can be described by its shape",
        options: ["True", " False"],
        corrects: ["True"],
        isOr: false,
        difficulty: "Easy",
    },
    {
        question: "What is the process that sterilizes bacteria so it is safe to eat?",
        options: ["Pasteurization", " Boiling", " Kindness"],
        corrects: ["Pasteurization"],
        isOr: false,
        difficulty: "Easy",
    },
    {
        question:
            "Which special chemicals that some bacteria can produce to stop other bacteria from growing or kill it?",
        options: ["Pasteurization", " Vaccines", " Toxins"],
        corrects: ["Vaccines"],
        isOr: false,
        difficulty: "Easy",
    },
    {
        question: "Bacteria cells are exactly like animal cells",
        options: ["True", " False"],
        corrects: ["False"],
        isOr: false,
        difficulty: "Easy",
    },
    {
        question:
            'If a bacterial shape is described as being "strepto", scientists know the bacteria is growing in a',
        options: ["Chain", " Clump", " Cluster"],
        corrects: ["Chain"],
        isOr: false,
        difficulty: "Easy",
    },
]

export const quiz = quizList.map(
    (quizElm): Question => ({
        ...quizElm,
        options: quizElm.options.map(option => option.trim()),
        corrects: quizElm.corrects.map(correct => correct.trim()),
    }),
)

export const mapDifficultyToLevelType = {
    Easy: LEVEL_TYPE.EASY,
    Medium: LEVEL_TYPE.MEDIUM,
    Hard: LEVEL_TYPE.HARD,
}
