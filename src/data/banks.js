// ---------------------------------------------------------------------------
// Content banks for Otterly Me!
// Questions rotate by day of year so every day feels fresh.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// School-day tagging — entries shaped { q, school: true } assume the kid went
// to school that day. They are hidden on weekends and on weekdays the kid
// answers "no" to "Did you go to school today?". Untouched entries stay plain
// strings; both shapes work everywhere via the helpers below.
// ---------------------------------------------------------------------------

/** Normalize a bank entry to its question text. */
export function qText(item) {
  return typeof item === 'string' ? item : item.q
}

/** True when a bank entry is tagged as school-related. */
export function isSchoolQuestion(item) {
  return typeof item === 'object' && item !== null && item.school === true
}

/**
 * A question bank with school-tagged questions removed, for weekends and
 * days off. Falls back to the full bank if filtering would empty it.
 */
export function noSchoolBank(bank) {
  const filtered = bank.filter((item) => !isSchoolQuestion(item))
  return filtered.length > 0 ? filtered : bank
}

export const WEATHER_OPTIONS = [
  { id: 'sunny', emoji: '☀️', label: 'Sunny' },
  { id: 'hot', emoji: '🥵', label: 'Hot' },
  { id: 'cloudy', emoji: '⛅', label: 'Cloudy' },
  { id: 'rainy', emoji: '🌧️', label: 'Rainy' },
  { id: 'snowy', emoji: '❄️', label: 'Snowy' },
  { id: 'freezing', emoji: '🥶', label: 'Freezing' },
  { id: 'stormy', emoji: '⛈️', label: 'Stormy' },
  { id: 'windy', emoji: '💨', label: 'Windy' },
]

export const MOOD_OPTIONS = [
  { id: 'thrilled', emoji: '🤩', label: 'Thrilled' },
  { id: 'happy', emoji: '😊', label: 'Happy' },
  { id: 'calm', emoji: '😌', label: 'Calm' },
  { id: 'silly', emoji: '🤪', label: 'Silly' },
  { id: 'tired', emoji: '😴', label: 'Tired' },
  { id: 'grumpy', emoji: '😠', label: 'Grumpy' },
  { id: 'sad', emoji: '😢', label: 'Sad' },
  { id: 'nervous', emoji: '😬', label: 'Nervous' },
]

export const BREAKFAST_SUGGESTIONS = [
  '🥞 Pancakes',
  '🥣 Cereal',
  '🍳 Eggs',
  '🥯 Bagel',
  '🧇 Waffles',
  '🍎 Fruit',
  '🥛 Oatmeal',
  '🍞 Toast',
]

export const SELFIE_PROMPTS = [
  'Make a goofy fish face! 🐟',
  'Give us your best mad scientist laugh! 🧪',
  'Say cheese! 🧀',
  'Make a spooky ghost face! 👻',
  'Pretend you just ate a super sour lemon! 🍋',
  'Do your best sleepy sloth impression! 🦥',
  'Strike a superhero pose! 🦸',
  'Wink and point at the camera! 😉',
  'Make the biggest smile you possibly can! 😁',
  'Pretend you are an otter floating on your back! 🦦',
  'Cross your eyes like a silly chameleon! 🦎',
  'Do your best roaring lion face! 🦁',
  'Pretend you are surprised by a birthday cake! 🎂',
  'Stick your tongue out like a goofball! 😜',
]

export const MC_QUESTIONS = [
  {
    q: 'If you could have any superpower for one day, which would you pick?',
    options: ['Fly like a bird 🕊️', 'Turn invisible 🫥', 'Talk to animals 🦜', 'Super strength 💪'],
  },
  {
    q: 'You find a treasure chest on the beach. What is inside?',
    options: ['Gold coins 🪙', 'A magic map 🗺️', 'A baby dragon 🐉', 'Chocolate bars 🍫'],
  },
  {
    q: 'Which animal would be your best buddy?',
    options: ['A playful otter 🦦', 'A speedy cheetah 🐆', 'A wise owl 🦉', 'A bouncy kangaroo 🦘'],
  },
  {
    q: 'What is the best kind of day?',
    options: ['Beach day 🏖️', 'Snow day ❄️', 'Park day with friends 🛝', 'Cozy movie day 🎬'],
  },
  {
    q: 'If you could invent a new ice cream flavor, what would it be?',
    options: ['Rainbow bubble-gum 🌈', 'Chocolate volcano 🌋', 'Cotton-candy cloud ☁️', 'Pizza?! 🍕'],
  },
  {
    q: 'You are the captain of a ship. Where do you sail?',
    options: ['A desert island 🏝️', 'The North Pole 🧊', 'A jungle river 🌿', 'Outer space?! 🚀'],
  },
  {
    q: 'Which school subject would you turn into a video game?',
    school: true,
    options: ['Math ➗', 'Reading 📚', 'Science 🧬', 'Art 🎨'],
  },
  {
    q: 'Pick a magical pet:',
    options: ['A flying hamster 🐹', 'A mini unicorn 🦄', 'A fire-breathing turtle 🐢', 'A talking fish 🐠'],
  },
  {
    q: 'What is the silliest food combo?',
    options: ['Pickles and ice cream 🥒', 'Spaghetti tacos 🍝', 'Cheese and jelly 🧀', 'Popcorn pizza 🍿'],
  },
  {
    q: 'If your stuffed animal came to life, what would it say first?',
    options: ['"Let\'s play!" 🧸', '"I\'m hungry!" 🍪', '"Tell me a secret!" 🤫', '"Nap time!" 😴'],
  },
  {
    q: 'If you could travel anywhere in the world tomorrow, where would you go?',
    options: ['Hawaii 🏝️', 'Disney World 🏰', 'The mountains 🏔️', 'New York City 🗽'],
  },
  {
    q: 'What would you ride into school on?',
    school: true,
    options: ['A dragon 🐉', 'A hoverboard 🛹', 'A unicorn 🦄', 'A rocket 🚀'],
  },
  {
    q: 'Pick a super snack:',
    options: ['Endless popcorn 🍿', 'A chocolate fountain 🍫', 'Rainbow fruit 🍓', 'A giant pretzel 🥨'],
  },
  {
    q: 'You get one wish — what do you wish for?',
    options: ['Fly anywhere ✈️', 'A million puppies 🐶', 'Never-ending summer ☀️', 'Be in a movie 🎬'],
  },
  {
    q: 'Which holiday is the best?',
    options: ['Halloween 🎃', 'Christmas 🎄', 'Your birthday 🎂', '4th of July 🎆'],
  },
  {
    q: 'What should your classroom pet be?',
    school: true,
    options: ['A hamster 🐹', 'A lizard 🦎', 'A parrot 🦜', 'A tiny dinosaur 🦕'],
  },
  {
    q: 'Pick a rainy-day activity:',
    options: ['Build a fort 🏰', 'Bake cookies 🍪', 'Board games 🎲', 'Blanket and a book 📖'],
  },
  {
    q: 'If you had a time machine, where would you go first?',
    options: ['Dinosaur times 🦕', 'The future 🤖', 'Ancient Egypt 🏛️', 'The Wild West 🤠'],
  },
  {
    q: 'What is the best pizza topping?',
    options: ['Pepperoni 🍕', 'Extra cheese 🧀', 'Pineapple 🍍', 'Just breadsticks 🥖'],
  },
  {
    q: 'Choose your adventure:',
    options: ['Explore a cave 🦇', 'Sail the ocean 🌊', 'Climb a volcano 🌋', 'Visit the moon 🌙'],
  },
  {
    q: 'What would you name a brand-new planet?',
    options: ['Bubblegum 🫧', 'Candyland 🍬', 'Zorpon-7 🛸', 'Otterworld 🦦'],
  },
  {
    q: 'Pick the perfect Saturday:',
    options: ['Trip to the zoo 🦁', 'Swimming 🏊', 'Playground 🛝', 'Pajamas all day 🛋️'],
  },
  {
    q: 'If you could talk to one animal, which would it be?',
    options: ['A dolphin 🐬', 'An elephant 🐘', 'A penguin 🐧', 'Your pet 🐾'],
  },
  {
    q: 'What dessert wins?',
    options: ['Ice cream sundae 🍨', 'Cupcakes 🧁', 'Brownies 🍫', 'Donuts 🍩'],
  },
]

// Thoughtful questions — many inspired by parenting experts and child psychologists
// (Big Life Journal, Dr. Becky Kennedy/Good Inside, Amy Morin, Child Mind Institute,
// Mightier, Psych Central, Understood.org, Evergrow Therapy Collective, famello, and more).
export const REFLECTION_QUESTIONS = [
  'What is one thing that made you smile today, and why?',
  'What is something new you learned or tried today?',
  'Who is someone you are thankful for today? What did they do?',
  'What is one thing you did today that you are proud of?',
  'If today were a color, what color would it be and why?',
  'What is the kindest thing someone did for you recently?',
  'What is something you are looking forward to tomorrow?',
  'What is a challenge you faced today? How did you handle it?',
  'Describe the best moment of your day in one or two sentences.',
  'What is something about yourself that you like?',
  'If you could give today a title like a book chapter, what would it be?',
  'What is one thing you want to get better at? What is your first step?',
  'What did you do today that made you think really hard?',
  'Was there anything that made you feel stuck today? How did you get unstuck?',
  'What is something you could get better at with practice?',
  'What went well today?',
  'Name three things you are grateful for today.',
  { q: 'What was the trickiest part of your schoolwork today?', school: true },
  'What is a mistake you learned from today?',
  'Who were you proud of today, and why?',
  'What is one thing that would have made today better?',
  'Who did you help today? How?',
  'What was the most interesting thing you learned today?',
  'What is something new you would like to try?',
  'What is your rose (best part), thorn (hardest part), and bud (something you are looking forward to) of today?',
  'What was the toughest part of your day?',
  'Did anything make you feel frustrated today? What was it?',
  'Tell me about an act of kindness you saw or did today.',
  'Teach me something I don\'t know!',
  'How can you tell when you are starting to feel angry? What does your body feel like?',
  'What is something nice you could say to yourself right now?',
  'What are three things you are really good at?',
  'What was something tough that happened today?',
  'Is there something that has you feeling nervous this week?',
  'What is a goal you want to reach by the end of this week?',
  'What made you frown today?',
  'Did you see anyone being unkind today? How did you respond?',
  'How were you brave today?',
  'How were you a good friend today?',
  { q: 'If you saw someone sitting alone at lunch, what do you think they might be feeling?', school: true },
  'If you could fix one thing about the world, what would you start with?',
  'What is something you used to be scared of that doesn\'t scare you anymore?',
  'When is the last time you felt really proud of yourself? What was it about?',
  'What makes you feel like a good person?',
  'What is a compliment someone gave you that meant a lot?',
  'What happened today that made you feel smart?',
  'What is something about being your age right now that you want to remember?',
  { q: 'If you got one wish about school, what would it be?', school: true },
  'What do you wish grown-ups understood about kids?',
  { q: 'What was the most interesting thing your teacher said today?', school: true },
  { q: 'What questions did you ask at school today?', school: true },
  'What is something you saw today that made you think?',
  'Why is it important to believe in yourself?',
  'What does being happy mean to you?',
  'Which activities make you feel the most like yourself?',
  { q: 'Who did you sit with at lunch today, and what did you talk about?', school: true },
  { q: 'Who did you play with at recess, and what game did you play?', school: true },
  'Did you help anyone today, or did anyone help you?',
  'Tell me one thing you learned today that you didn\'t know yesterday.',
  'What was your favorite part of the day, and what was your least favorite?',
  'What do you like most about your best friend?',
  'Was anyone sitting or playing by themselves today? Who?',
  'If they wanted company, how could you invite them to join you?',
  { q: 'How did a classmate or friend show they cared about you today?', school: true },
  { q: 'How did you show a classmate or friend that you cared about them today?', school: true },
  { q: 'What classmates did you work with today?', school: true },
  'What did you do to make someone\'s day better?',
  'What did you talk about with your friends today?',
  { q: 'Who would you sit next to in class if you could choose? Why?', school: true },
  { q: 'Is there someone in your class you would like to get to know better?', school: true },
  'What qualities do you like your friends to have?',
  'Did you play with someone new today?',
  { q: 'What\'s everyone talking about at school right now?', school: true },
  { q: 'Who are you hanging out with this year?', school: true },
  'Tell me something you learned about a friend today.',
  'Who do you want to make friends with but haven\'t yet? Why not?',
  { q: 'Who did you share your snacks with at lunch?', school: true },
  { q: 'Which classmate do you want to talk to tomorrow that you didn\'t talk to today?', school: true },
  { q: 'If you could play with three people at recess, which ones would you want to play with? Why?', school: true },
  'Did anyone say thank you to you today? What did they thank you for?',
  { q: 'Tell me about a conversation you had with a classmate or friend that you enjoyed.', school: true },
  { q: 'Who thinks of the best games at recess?', school: true },
  { q: 'If you could swap your lunch with someone, who would you choose?', school: true },
  { q: 'Is there someone at school who has a talent you really wish you had?', school: true },
  { q: 'What do you think I would like most about your school day?', school: true },
  'Tell me about a moment today when you felt excited about what you were learning.',
  { q: 'Tell me about a moment in class when you felt confused.', school: true },
  { q: 'What is something from school you would like to know more about?', school: true },
  'What did you learn about yourself today?',
  'Is there a question you wish I would ask you about your day?',
  'What did you learn today that actually surprised you?',
  'If you could redo one part of today, what would it be?',
  'What did you do today that made you wobble?',
  'What happened today that made you keep going?',
  'What will you do to challenge yourself tomorrow?',
  { q: 'What word did your teacher say the most today?', school: true },
  { q: 'What did you ask your teacher for help with today?', school: true },
  { q: 'What new songs or stories did you learn today?', school: true },
  'Tell me about something you made, built, drew, or wrote today.',
  { q: 'What was the book about that your teacher read?', school: true },
  'What did you do that was creative today?',
  { q: 'Tell me about what you read in class.', school: true },
  { q: 'What rules are different at school than at home? Do you think they are fair?', school: true },
  { q: 'Tell me three things you used your pencil for at school.', school: true },
  { q: 'What is one thing you hope to learn before the school year is over?', school: true },
  { q: 'What did you do in art, music, or P.E. today?', school: true },
  'What part of your day went by the fastest?',
  { q: 'What do you do when you have a question during class?', school: true },
  { q: 'What is one thing your teacher explained today that finally clicked?', school: true },
  { q: 'What was the best question someone asked in class today?', school: true },
  { q: 'Did you get to choose anything at school today? What did you pick?', school: true },
  { q: 'What is something hard you kept working on at school today?', school: true },
  { q: 'Who made you laugh at school today? What happened?', school: true },
  { q: 'What is one way you were helpful in your classroom today?', school: true },
  { q: 'If you could teach your class one thing you know, what would it be?', school: true },
  { q: 'What did you notice at school today that you never noticed before?', school: true },
  { q: 'What are you most curious about right now from school?', school: true },
  { q: 'What is something you want to ask your teacher tomorrow?', school: true },
]

// Silly & imaginative questions — many inspired by popular parenting resources
// (LoveToKnow, Bloomsbury Mill, famello, Akron Ohio Moms, Keiki to Career,
// Coursepivot, TheEveryMom, and more).
export const FUN_QUESTIONS = [
  'Invent a new holiday! What is it called and how do people celebrate it?',
  'You wake up and you are 3 inches tall. What is your first adventure?',
  'Draw a picture with words: describe the funniest creature you can imagine.',
  'If your life had a theme song today, what would it sound like?',
  'You get to rename yourself for one day. What is your new name?',
  'Design a robot helper. What does it do and what does it look like?',
  'Write a two-line poem about your breakfast.',
  'If clouds were made of food, what would your favorite cloud taste like?',
  'You find a secret portal in your backyard. Where in the world does it take you?',
  'You get to add a brand-new room to your house. What is in it?',
  'If animals could go to school, what would your pet\'s favorite subject be?',
  'You are a detective for a day. What mystery do you solve?',
  'If you could travel 100 years into the future or 100 years into the past, which would you pick and why?',
  'What two animals would make the funniest-looking hybrid creature?',
  'If our whole family were mouse-sized, how would life be different?',
  'If grown-ups and kids switched places for a day, what would tomorrow be like?',
  'What would you do if you were president for a day?',
  'Do you think aliens exist? Why or why not?',
  'If you could be invisible for a day, what would you do?',
  'If you could be any mythical creature, which one would you be?',
  'What kind of animal would you be for a day, and why?',
  'What superpower would be a TERRIBLE idea to have?',
  'What is your superhero name, and what is your power?',
  'If you could bring a book or movie character to life, who would it be?',
  'If you were in charge of our family for a day, what is the first rule you would make?',
  'What is the worst food combination you can think of?',
  'Which animal do you think has the most embarrassing life?',
  'If you found $50 on the ground, what would you do with it?',
  'If you could open a shop, what would you sell?',
  'What would you invent to make life easier?',
  'If you could build anything in your backyard, what would it be?',
  'If a genie gave you three wishes, what would you wish for?',
  'If you had to eat one food for the rest of your life, what would it be?',
  'If your pet could talk for one minute a day, what would you ask them?',
  'If you met someone from another planet, what would you talk about?',
  { q: 'What is the most hilarious thing your teacher could do tomorrow?', school: true },
  'What made you laugh today?',
  'What was the weirdest or coolest thing that happened today?',
  { q: 'If an alien spaceship beamed someone up from your class, who would you want it to be?', school: true },
  'If your day was an emoji, which one would it be?',
  { q: 'Did you catch anyone picking their nose?', school: true },
  { q: 'Which one of your teachers would survive a zombie apocalypse? Why?', school: true },
  { q: 'If school were a ride at the fair, which ride would it be? Why?', school: true },
  { q: 'Does your teacher remind you of anyone else you know? How?', school: true },
  { q: 'If you were to get sent to the principal\'s office, what would it be for?', school: true },
  { q: 'If you could draw any picture on the whiteboard at school, what would you draw?', school: true },
  { q: 'If you could create a new subject to study at school, what would it be?', school: true },
  { q: 'If you could get to school using any mode of transportation, how would you get there?', school: true },
  { q: 'If you were a teacher, what would be the first thing you would say to your class?', school: true },
  { q: 'If you could swap desks with anyone, who would you pick and why?', school: true },
  { q: 'If you could be in another grade, which one would you pick?', school: true },
  { q: 'Would you rather eat school lunch forever or pack your lunch every day?', school: true },
  { q: 'If you were the teacher tomorrow, what would be your first rule?', school: true },
  'If you had to describe how you are feeling today in terms of weather, what would you be?',
  { q: 'Who brought the best food in their lunch today? What was it?', school: true },
  { q: 'If one of your classmates could be the teacher for the day, who would you want it to be? Why?', school: true },
  { q: 'Which person in your class is your exact opposite?', school: true },
  { q: 'Where is the coolest place at school?', school: true },
  { q: 'What is the most popular game played at lunch break?', school: true },
  'What would your dream playground look like?',
  { q: 'How many of your classmates wore red today?', school: true },
  { q: 'Would you rather be the funniest kid in school or the smartest?', school: true },
  'Would you rather have to sing everything you say or speak in a robot voice?',
  { q: 'If your classroom had a secret trapdoor, where would it lead?', school: true },
  { q: "What would your teacher's superhero costume look like?", school: true },
  { q: 'Invent a new school rule that everyone would love.', school: true },
  { q: 'What if your desk could talk — what would it complain about?', school: true },
  { q: 'Design the ultimate field trip. Where do you go?', school: true },
  { q: 'If homework were a monster, how would you defeat it?', school: true },
  { q: "What would the school mascot's diary say about today?", school: true },
  { q: 'If the principal traded places with you for a day, what would happen?', school: true },
]

// Day-off questions — asked on weekdays the kid answers "no" to
// "Did you go to school today?", following up on what they did instead.
// A mix of thoughtful and silly, all about their day off.
export const DAY_OFF_QUESTIONS = [
  'What is the best thing you did with your day off?',
  'Did you go anywhere special today? Tell me about it.',
  "What is something you did today that you can't do on a school day?",
  'Who did you spend time with today? What did you do together?',
  'What is one new thing you tried on your day off?',
  'What made today feel different from a school day?',
  'What is something you learned outside of school today?',
  'What was the coziest moment of your day?',
  'You are the boss of today — what is the schedule?',
  'Invent a brand-new way to spend a day off. What is it called?',
  'If you could teleport anywhere for one afternoon, where would you go?',
  'What is the silliest thing that happened today?',
  'Design your dream day-off fort. What is inside?',
  'If today were a video game level, what would it be called?',
]

export const BREAKFAST_ICONS = ['🥞', '🥣', '🍳', '🥯', '🧇', '🍎', '🥛', '🍞']

// Quick-fire favorites — answered in a word or two. Because these rotate,
// the Den becomes a time capsule of how favorites change over time.
export const FAVORITES_QUESTIONS = [
  'What is your favorite color right now?',
  'Who is your favorite musical artist or band?',
  'What is your favorite movie?',
  'What is your favorite food?',
  'What is your favorite animal?',
  'What is your favorite book?',
  'What is your favorite song?',
  'What is your favorite game to play?',
  'What is your favorite ice cream flavor?',
  'What is your favorite holiday?',
  { q: 'What is your favorite subject in school?', school: true },
  'What is your favorite place you have ever been?',
  'What is your favorite thing to do on the weekend?',
  'What is your favorite breakfast food?',
  'What is your favorite dessert?',
  'What is your favorite sport?',
  'What is your favorite TV show?',
  'What is your favorite superhero?',
  'What is your favorite dinosaur?',
  'What is your favorite candy?',
  'What is your favorite season?',
  'What is your favorite toy?',
  'What is your favorite thing to do outside?',
  'What is your favorite lunch food?',
]

