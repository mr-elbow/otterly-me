// ---------------------------------------------------------------------------
// Content banks for Otterly Me!
// Questions rotate by day of year so every day feels fresh.
// ---------------------------------------------------------------------------

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
  'What was the trickiest part of your schoolwork today?',
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
  'If you saw someone sitting alone at lunch, what do you think they might be feeling?',
  'If you could fix one thing about the world, what would you start with?',
  'What is something you used to be scared of that doesn\'t scare you anymore?',
  'When is the last time you felt really proud of yourself? What was it about?',
  'What makes you feel like a good person?',
  'What is a compliment someone gave you that meant a lot?',
  'What happened today that made you feel smart?',
  'What is something about being your age right now that you want to remember?',
  'If you got one wish about school, what would it be?',
  'What do you wish grown-ups understood about kids?',
  'What was the most interesting thing your teacher said today?',
  'What questions did you ask at school today?',
  'What is something you saw today that made you think?',
  'Why is it important to believe in yourself?',
  'What does being happy mean to you?',
  'Which activities make you feel the most like yourself?',
  'Who did you sit with at lunch today, and what did you talk about?',
  'Who did you play with at recess, and what game did you play?',
  'Did you help anyone today, or did anyone help you?',
  'Tell me one thing you learned today that you didn\'t know yesterday.',
  'What was your favorite part of the day, and what was your least favorite?',
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
  'What is the most hilarious thing your teacher could do tomorrow?',
  'What made you laugh today?',
  'What was the weirdest or coolest thing that happened today?',
  'If an alien spaceship beamed someone up from your class, who would you want it to be?',
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
  'What is your favorite subject in school?',
  'What is your favorite place you have ever been?',
  'What is your favorite thing to do on the weekend?',
  'What is your favorite breakfast food?',
]
