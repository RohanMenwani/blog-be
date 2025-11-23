import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

import { Post } from '../models/Post';
import { Comment } from '../models/Comment';
import { Rating } from '../models/Rating';

async function main() {
  await mongoose.connect(process.env.MONGODB_URI ||"");

  await Promise.all([
    Post.deleteMany({}),
    Comment.deleteMany({}),
    Rating.deleteMany({})
  ]);

  const insertedPosts = await Post.insertMany([
    {
      title: "The Ultimate Guide to Full-Body Workouts",
      body: `Discover exercises that target every muscle group, helping you build strength and endurance. Perfect for beginners and seasoned gym-goers alike.

## Getting Started with Full-Body Training

A full-body workout targets all major muscle groups in a single session. This approach is incredibly efficient for beginners and experienced athletes alike.

### Benefits of Full-Body Training

- **Time Efficient**: Work all muscles in one session
- **Increased Calorie Burn**: More muscles working means more energy expenditure
- **Better Recovery**: Each muscle group gets adequate rest between sessions
- **Improved Coordination**: Compound movements enhance overall body awareness

## The Essential Exercises

Here are the foundational exercises every full-body routine should include:

### 1. Squats
The king of lower body exercises. Squats work your quads, hamstrings, glutes, and core.

### 2. Push-Ups
A classic upper body exercise that targets chest, shoulders, and triceps.

### 3. Rows
Essential for back development and posture correction.

### 4. Lunges
Unilateral movement that improves balance and leg strength.

### 5. Planks
Core stability is crucial for all movements and injury prevention.

## Sample Beginner Workout

Perform this workout 3 times per week with at least one rest day between sessions:

- Squats: 3 sets of 12 reps
- Push-ups: 3 sets of 10 reps
- Dumbbell Rows: 3 sets of 12 reps each arm
- Lunges: 3 sets of 10 reps each leg
- Plank: 3 sets of 30 seconds

Remember to start with weights that allow you to maintain proper form throughout all repetitions. It's better to start light and progress gradually than to risk injury with weights that are too heavy.`,
      slug: "the-ultimate-guide-to-full-body-workouts",
      date: new Date("2025-01-23")
    },
    {
      title: "5 Tips For Better Cardio Sessions",
      body: `Improve your cardio performance with these simple yet effective techniques to maximize stamina and get the most from each workout.

## Understanding Cardio Training

Cardiovascular exercise is essential for heart health, endurance, and overall fitness. Whether you're running, cycling, or swimming, these tips will help you improve.

### 1. Start with a Proper Warm-Up

Never jump straight into intense cardio. Spend 5-10 minutes gradually increasing your heart rate with dynamic movements.

### 2. Monitor Your Heart Rate

Train in different heart rate zones for optimal results:
- Zone 2: Fat burning (60-70% max HR)
- Zone 3: Aerobic fitness (70-80% max HR)
- Zone 4: Performance (80-90% max HR)

### 3. Incorporate Interval Training

Mix high-intensity bursts with recovery periods. For example:
- 2 minutes hard effort
- 1 minute easy recovery
- Repeat 6-8 times

### 4. Don't Neglect Recovery

Your body needs time to adapt. Include rest days and active recovery sessions in your routine.

### 5. Stay Hydrated

Drink water before, during, and after your cardio sessions. Dehydration can severely impact performance.

## Conclusion

Consistency is key with cardio training. Start where you are, use proper technique, and progressively challenge yourself. Your cardiovascular system will thank you!`,
      slug: "5-tips-for-better-cardio-sessions",
      date: new Date("2025-02-15")
    },
    {
      title: "Meal Prep Basics For Gym Enthusiasts",
      body: `Fuel your workouts with balanced, easy-to-prepare meals. A guide on planning, prepping, and staying consistent with your nutrition.

## Why Meal Prep Matters

Nutrition is 70% of your fitness journey. Without proper fuel, even the best workout routine won't deliver optimal results.

## Essential Meal Prep Tips

### Plan Your Macros

Calculate your daily needs:
- Protein: 0.8-1g per pound of body weight
- Carbs: 2-3g per pound (adjust based on activity)
- Fats: 0.3-0.5g per pound

### Choose the Right Containers

Invest in quality glass containers with compartments. They're:
- Microwave safe
- Easy to clean
- Portion-controlled
- Durable

### Prep in Batches

Dedicate 2-3 hours on Sunday to prepare:
- Grilled chicken breasts
- Brown rice or quinoa
- Roasted vegetables
- Pre-portioned snacks

## Sample Meal Plan

**Breakfast**: Overnight oats with protein powder and berries

**Lunch**: Grilled chicken, brown rice, broccoli

**Dinner**: Salmon, sweet potato, asparagus

**Snacks**: Greek yogurt, almonds, protein shake

## Storage Tips

- Cooked meals last 3-4 days in the fridge
- Freeze extra portions for later
- Label containers with dates
- Keep variety to prevent boredom

Meal prep doesn't have to be complicated. Start simple, stay consistent, and watch your fitness goals become achievable!`,
      slug: "meal-prep-basics-for-gym-enthusiasts",
      date: new Date("2025-03-10")
    },
    {
      title: "Building Core Strength: Exercises And Benefits",
      body: `A strong core is essential for stability and injury prevention. Learn the best exercises to enhance your core strength.

## What Is Core Strength?

Your core isn't just your abs—it includes all the muscles that stabilize your spine and pelvis, including:
- Rectus abdominis (six-pack muscles)
- Obliques (side abs)
- Transverse abdominis (deep core)
- Lower back muscles
- Hip flexors and glutes

## Benefits of a Strong Core

### Better Posture

A strong core keeps your spine aligned and reduces slouching, especially if you sit at a desk all day.

### Injury Prevention

Core stability protects your lower back during daily activities and heavy lifting.

### Improved Athletic Performance

Every movement originates from your core. A stronger core means better power transfer in all sports.

### Enhanced Balance

Core strength is crucial for balance and coordination, reducing fall risk.

## Top Core Exercises

### 1. Plank
Hold for 30-60 seconds, maintaining a straight line from head to heels.

### 2. Dead Bug
Lie on your back, extend opposite arm and leg, alternating sides.

### 3. Russian Twists
Sit with feet elevated, twist torso side to side with or without weight.

### 4. Bird Dog
On hands and knees, extend opposite arm and leg, hold, switch.

### 5. Bicycle Crunches
Alternate bringing opposite elbow to knee in a cycling motion.

### 6. Mountain Climbers
High plank position, drive knees toward chest alternately.

## Programming Your Core Training

- Train core 3-4 times per week
- 3-4 exercises per session
- 3 sets of 12-15 reps (or 30-60 second holds)
- Focus on control, not speed
- Breathe throughout movements

## Common Mistakes to Avoid

- Holding your breath
- Using momentum instead of muscle
- Arching your lower back
- Only training the front (neglecting back and sides)
- Doing too many reps with poor form

Start with these fundamentals and progress gradually. A strong core is the foundation of overall fitness!`,
      slug: "building-core-strength-exercises-and-benefits",
      date: new Date("2025-03-28")
    }
  ]);

  const [post1, post2, post3, post4] = insertedPosts;

  await Comment.insertMany([
    // Post 1
    {
      postId: post1._id,
      author: "Kang Haerin",
      comment: "This is exactly what I needed! I've been doing random exercises but never had a structured full-body routine. Starting this tomorrow!",
      createdAt: new Date("2025-01-24T10:30:00Z"),
      updatedAt: new Date("2025-01-24T10:30:00Z")
    },
    {
      postId: post1._id,
      author: "Jordan Smith",
      comment: "Great breakdown of the exercises. The explanations for each movement really helped me understand proper form. Bookmarked!",
      createdAt: new Date("2025-01-25T14:15:00Z"),
      updatedAt: new Date("2025-01-25T14:15:00Z")
    },
    {
      postId: post1._id,
      author: "Maria Garcia",
      comment: "I've been training for 3 years and still learned something new. The recovery points are spot-on. Thanks for sharing!",
      createdAt: new Date("2025-01-26T09:45:00Z"),
      updatedAt: new Date("2025-01-26T09:45:00Z")
    },
    {
      postId: post1._id,
      author: "Alex Chen",
      comment: "Perfect for my busy schedule. 3 days a week is doable. Question: can I add cardio on off days?",
      createdAt: new Date("2025-01-27T16:20:00Z"),
      updatedAt: new Date("2025-01-27T16:20:00Z")
    },
    {
      postId: post1._id,
      author: "Sarah Johnson",
      comment: "Love the progressive approach! Started with bodyweight only and now adding dumbbells. Seeing results already!",
      createdAt: new Date("2025-01-28T11:00:00Z"),
      updatedAt: new Date("2025-01-28T11:00:00Z")
    },
    // Post 2
    {
      postId: post2._id,
      author: "Mike Rodriguez",
      comment: "The interval training tip changed my running game completely. Went from struggling with 5K to comfortably running 10K in 2 months!",
      createdAt: new Date("2025-02-16T08:30:00Z"),
      updatedAt: new Date("2025-02-16T08:30:00Z")
    },
    {
      postId: post2._id,
      author: "Emily Watson",
      comment: "Heart rate zones explanation is super helpful. I was always going too hard and wondering why I wasn't improving. Now I get it!",
      createdAt: new Date("2025-02-17T13:45:00Z"),
      updatedAt: new Date("2025-02-17T13:45:00Z")
    },
    {
      postId: post2._id,
      author: "David Kim",
      comment: "Short and to the point. Implementing all 5 tips starting this week. The hydration reminder is so important!",
      createdAt: new Date("2025-02-18T10:15:00Z"),
      updatedAt: new Date("2025-02-18T10:15:00Z")
    },
    // Post 3
    {
      postId: post3._id,
      author: "Jessica Lee",
      comment: "Finally, a meal prep guide that doesn't require cooking skills! The batch prep idea saves me so much time.",
      createdAt: new Date("2025-03-11T09:00:00Z"),
      updatedAt: new Date("2025-03-11T09:00:00Z")
    },
    {
      postId: post3._id,
      author: "Robert Brown",
      comment: "The macro breakdown is gold. I was way under on protein. No wonder my gains were slow!",
      createdAt: new Date("2025-03-12T15:30:00Z"),
      updatedAt: new Date("2025-03-12T15:30:00Z")
    },
    {
      postId: post3._id,
      author: "Linda Martinez",
      comment: "Meal prepping changed my life. Down 15 pounds in 6 weeks by following this guide. Thank you!",
      createdAt: new Date("2025-03-13T11:20:00Z"),
      updatedAt: new Date("2025-03-13T11:20:00Z")
    },
    {
      postId: post3._id,
      author: "Chris Anderson",
      comment: "Glass container recommendation is A+. Got a set and they've lasted 2 years so far. Worth the investment.",
      createdAt: new Date("2025-03-14T14:45:00Z"),
      updatedAt: new Date("2025-03-14T14:45:00Z")
    },
    // Post 4
    {
      postId: post4._id,
      author: "Amanda Taylor",
      comment: "My lower back pain disappeared after 3 weeks of following these core exercises. Wish I found this sooner!",
      createdAt: new Date("2025-03-29T10:00:00Z"),
      updatedAt: new Date("2025-03-29T10:00:00Z")
    },
    {
      postId: post4._id,
      author: "Daniel White",
      comment: "The bird dog exercise is harder than it looks! Great for balance and core control. Adding to my routine.",
      createdAt: new Date("2025-03-30T13:15:00Z"),
      updatedAt: new Date("2025-03-30T13:15:00Z")
    },
    {
      postId: post4._id,
      author: "Rachel Green",
      comment: "Love that you mentioned breathing! I was holding my breath during planks and getting dizzy. Game changer!",
      createdAt: new Date("2025-03-31T09:30:00Z"),
      updatedAt: new Date("2025-03-31T09:30:00Z")
    }
  ]);

  await Rating.insertMany([
    // Post 1
    {
      postId: post1._id,
      author: "Kang Haerin",
      rating: 5,
      review: "Comprehensive guide with clear instructions. Best full-body workout article I've read!",
      createdAt: new Date("2025-01-24T10:35:00Z"),
      updatedAt: new Date("2025-01-24T10:35:00Z")
    },
    {
      postId: post1._id,
      author: "Jordan Smith",
      rating: 5,
      review: "Excellent breakdown of exercises and programming. Very helpful for structuring my workouts.",
      createdAt: new Date("2025-01-25T14:20:00Z"),
      updatedAt: new Date("2025-01-25T14:20:00Z")
    },
    {
      postId: post1._id,
      author: "Maria Garcia",
      rating: 4,
      review: "Great content! Would love to see video demonstrations in future updates.",
      createdAt: new Date("2025-01-26T09:50:00Z"),
      updatedAt: new Date("2025-01-26T09:50:00Z")
    },
    {
      postId: post1._id,
      author: "Alex Chen",
      rating: 5,
      review: "Perfect for beginners and intermediates. Following this program religiously!",
      createdAt: new Date("2025-01-27T16:25:00Z"),
      updatedAt: new Date("2025-01-27T16:25:00Z")
    },
    // Post 2
    {
      postId: post2._id,
      author: "Mike Rodriguez",
      rating: 5,
      review: "Interval training tip alone is worth 5 stars. Saw immediate improvements!",
      createdAt: new Date("2025-02-16T08:35:00Z"),
      updatedAt: new Date("2025-02-16T08:35:00Z")
    },
    {
      postId: post2._id,
      author: "Emily Watson",
      rating: 4,
      review: "Very useful information. Heart rate zones were particularly helpful.",
      createdAt: new Date("2025-02-17T13:50:00Z"),
      updatedAt: new Date("2025-02-17T13:50:00Z")
    },
    {
      postId: post2._id,
      author: "David Kim",
      rating: 4,
      review: "Solid tips. Would appreciate more specific workout examples.",
      createdAt: new Date("2025-02-18T10:20:00Z"),
      updatedAt: new Date("2025-02-18T10:20:00Z")
    },
    // Post 3
    {
      postId: post3._id,
      author: "Jessica Lee",
      rating: 5,
      review: "Life-changing! Meal prep has never been easier. Following this every week now.",
      createdAt: new Date("2025-03-11T09:05:00Z"),
      updatedAt: new Date("2025-03-11T09:05:00Z")
    },
    {
      postId: post3._id,
      author: "Robert Brown",
      rating: 5,
      review: "The macro calculations saved me. Finally hitting my protein targets!",
      createdAt: new Date("2025-03-12T15:35:00Z"),
      updatedAt: new Date("2025-03-12T15:35:00Z")
    },
    {
      postId: post3._id,
      author: "Linda Martinez",
      rating: 5,
      review: "Best meal prep guide for fitness enthusiasts. Simple, practical, effective.",
      createdAt: new Date("2025-03-13T11:25:00Z"),
      updatedAt: new Date("2025-03-13T11:25:00Z")
    },
    // Post 4
    {
      postId: post4._id,
      author: "Amanda Taylor",
      rating: 5,
      review: "Fixed my back pain! Core exercises are clearly explained and effective.",
      createdAt: new Date("2025-03-29T10:05:00Z"),
      updatedAt: new Date("2025-03-29T10:05:00Z")
    },
    {
      postId: post4._id,
      author: "Daniel White",
      rating: 4,
      review: "Good variety of exercises. The programming section is especially helpful.",
      createdAt: new Date("2025-03-30T13:20:00Z"),
      updatedAt: new Date("2025-03-30T13:20:00Z")
    },
    {
      postId: post4._id,
      author: "Rachel Green",
      rating: 5,
      review: "Amazing guide! The common mistakes section saved me from injury.",
      createdAt: new Date("2025-03-31T09:35:00Z"),
      updatedAt: new Date("2025-03-31T09:35:00Z")
    }
  ]);

  await mongoose.disconnect();
  console.log('✅ Seed data inserted successfully!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
