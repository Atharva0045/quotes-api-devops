#!/bin/bash

# Navigate to the Docker directory relative to the script location
cd "$(dirname "$0")/../Docker" || {
  echo "Failed to change directory to Docker folder"
  exit 1
}

# Run docker compose up with build in detached mode
docker compose up --build --detach
if [ $? -ne 0 ]; then
    echo "Docker compose failed. Please check the logs above for more details."
    exit 1
fi
echo "Docker compose started successfully."

# Wait for a few seconds to ensure MongoDB is ready to accept connections
echo "Waiting for MongoDB to be ready..."
sleep 10

# Seed MongoDB by running insertMany inside the container using heredoc input
docker exec -i quotes-mongo mongosh <<EOF
use quotesapi

db.quotes.insertMany([
  // Motivation Category
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "motivation",
    tags: ["work", "passion", "greatness"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "motivation",
    tags: ["success", "failure", "courage", "persistence"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
    category: "motivation",
    tags: ["persistence", "time", "dedication"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "motivation",
    tags: ["dreams", "future", "belief"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
    category: "motivation",
    tags: ["hope", "darkness", "light", "focus"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Inspiration Category
  {
    text: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
    category: "inspiration",
    tags: ["authenticity", "individuality", "self"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    author: "Albert Einstein",
    category: "inspiration",
    tags: ["humor", "intelligence", "universe"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
    category: "inspiration",
    tags: ["opportunity", "difficulty", "challenges"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
    category: "inspiration",
    tags: ["action", "time", "opportunity", "growth"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "Your limitation—it's only your imagination.",
    author: "Unknown",
    category: "inspiration",
    tags: ["limitations", "imagination", "mindset"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Wisdom Category
  {
    text: "The only true wisdom is in knowing you know nothing.",
    author: "Socrates",
    category: "wisdom",
    tags: ["knowledge", "humility", "learning"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    category: "wisdom",
    tags: ["progress", "persistence", "patience"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu",
    category: "wisdom",
    tags: ["journey", "beginning", "action"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present.",
    author: "Bill Keane",
    category: "wisdom",
    tags: ["present", "time", "mindfulness"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    category: "wisdom",
    tags: ["resilience", "falling", "rising", "glory"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Life Category
  {
    text: "Life is what happens to you while you're busy making other plans.",
    author: "John Lennon",
    category: "life",
    tags: ["life", "plans", "present", "unexpected"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "The purpose of our lives is to be happy.",
    author: "Dalai Lama",
    category: "life",
    tags: ["happiness", "purpose", "meaning"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "Life is really simple, but we insist on making it complicated.",
    author: "Confucius",
    category: "life",
    tags: ["simplicity", "complexity", "philosophy"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "Get busy living or get busy dying.",
    author: "Stephen King",
    category: "life",
    tags: ["living", "choice", "action"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "You have within you right now, everything you need to deal with whatever the world can throw at you.",
    author: "Brian Tracy",
    category: "life",
    tags: ["strength", "inner power", "resilience"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Success Category
  {
    text: "Success is not the key to happiness. Happiness is the key to success.",
    author: "Albert Schweitzer",
    category: "success",
    tags: ["happiness", "success", "key"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "Don't be afraid to give up the good to go for the great.",
    author: "John D. Rockefeller",
    category: "success",
    tags: ["greatness", "sacrifice", "ambition"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    category: "success",
    tags: ["action", "execution", "beginning"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
    category: "success",
    tags: ["innovation", "leadership", "creativity"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "Success is walking from failure to failure with no loss of enthusiasm.",
    author: "Winston Churchill",
    category: "success",
    tags: ["failure", "enthusiasm", "persistence"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Additional quotes
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
    category: "motivation",
    tags: ["journey", "beginning", "possibility"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "In three words I can sum up everything I've learned about life: it goes on.",
    author: "Robert Frost",
    category: "life",
    tags: ["life", "wisdom", "continuity"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "If you want to live a happy life, tie it to a goal, not to people or things.",
    author: "Albert Einstein",
    category: "inspiration",
    tags: ["happiness", "goals", "independence"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "A person who never made a mistake never tried anything new.",
    author: "Albert Einstein",
    category: "wisdom",
    tags: ["mistakes", "innovation", "learning"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "The best revenge is massive success.",
    author: "Frank Sinatra",
    category: "success",
    tags: ["revenge", "success", "achievement"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "Whether you think you can or you think you can't, you're right.",
    author: "Henry Ford",
    category: "motivation",
    tags: ["mindset", "belief", "self-confidence"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "I have not failed. I've just found 10,000 ways that won't work.",
    author: "Thomas Edison",
    category: "inspiration",
    tags: ["failure", "learning", "persistence"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "A man who stands for nothing will fall for anything.",
    author: "Malcolm X",
    category: "wisdom",
    tags: ["principles", "values", "character"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "Life is 10% what happens to you and 90% how you react to it.",
    author: "Charles R. Swindoll",
    category: "life",
    tags: ["reaction", "attitude", "control"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "The only person you are destined to become is the person you decide to be.",
    author: "Ralph Waldo Emerson",
    category: "success",
    tags: ["destiny", "decision", "self-determination"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "Don't let yesterday take up too much of today.",
    author: "Will Rogers",
    category: "motivation",
    tags: ["past", "present", "focus"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "You miss 100% of the shots you don't take.",
    author: "Wayne Gretzky",
    category: "inspiration",
    tags: ["opportunity", "action", "courage"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
    category: "wisdom",
    tags: ["future", "creation", "prediction"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "Life isn't about finding yourself. Life is about creating yourself.",
    author: "George Bernard Shaw",
    category: "life",
    tags: ["self-creation", "identity", "purpose"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    text: "The road to success and the road to failure are almost exactly the same.",
    author: "Colin R. Davis",
    category: "success",
    tags: ["success", "failure", "journey"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

EOF

if [ $? -ne 0 ]; then
    echo "Failed to seed MongoDB."
    exit 1
else
    echo "MongoDB seeded successfully."
fi
