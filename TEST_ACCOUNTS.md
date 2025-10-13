# PyGolfers Test Accounts

This document contains test account credentials for development and testing purposes.

## 🔐 Login Credentials

Use these accounts to test different user roles in PyGolfers:

---

### 👨‍🎓 **STUDENT ACCOUNT**

**Username:** `student1`  
**Password:** `student123`  
**Email:** `alex.johnson@email.com`

**Profile Details:**
- **Name:** Alex Johnson
- **Age:** 12 years old
- **Grade:** 7th Grade
- **Total Points:** 1,250
- **Challenges Completed:** 45
- **Current Streak:** 12 days
- **Rank:** #5
- **Level:** 15

**Access:**
- ✅ Student Dashboard
- ✅ Challenges
- ✅ Classrooms (Python Explorers, JavaScript Masters)
- ✅ Leaderboard
- ✅ Community
- ✅ Events
- ✅ Profile

---

### 👩‍🏫 **TEACHER ACCOUNT**

**Username:** `teacher1`  
**Password:** `teacher123`  
**Email:** `ada.lovelace@pygolfers.edu`

**Profile Details:**
- **Name:** Ms. Ada Lovelace
- **Subject:** Computer Science
- **School:** Riverside Middle School
- **Years Teaching:** 8 years
- **Total Students:** 85
- **Total Classrooms:** 4
- **Challenges Created:** 34
- **Average Student Progress:** 78%

**Classrooms:**
1. Python Explorers (ABC123) - 25 students
2. Advanced Python (ADV999) - 20 students

**Access:**
- ✅ Teacher Dashboard
- ✅ Classroom Management
- ✅ Create Challenges
- ✅ Student Analytics
- ✅ Community
- ✅ Events
- ✅ Profile

---

### 👨‍👩‍👧‍👦 **PARENT ACCOUNT**

**Username:** `parent1`  
**Password:** `parent123`  
**Email:** `michael.johnson@email.com`

**Profile Details:**
- **Name:** Michael Johnson
- **Relationship:** Father
- **Phone:** +1 (555) 123-4567

**Children:**
- **Alex Johnson** (student1)
  - Age: 12, Grade: 7th
  - Points: 1,250
  - Challenges: 45 completed
  - Streak: 12 days

**Access:**
- ✅ View child's progress
- ✅ Challenges (view only)
- ✅ Leaderboard
- ✅ Community
- ✅ Events
- ✅ Profile

---

## 🎮 Quick Login Guide

### **How to Login:**

1. **Go to:** `http://localhost:3000/login`

2. **Enter credentials:**
   ```
   Username: student1 (or teacher1, or parent1)
   Password: student123 (or teacher123, or parent123)
   ```

3. **Click:** "Login" button

4. **You'll be redirected to:**
   - Student → Student Dashboard
   - Teacher → Teacher Dashboard
   - Parent → Homepage (with parent navigation)

---

## 🔄 Alternative: Use Account Switcher

If you're already on the site, you can use the development account switcher:

1. **Scroll down** to the bottom of the page
2. **Look for:** "Switch Account:" section
3. **Click:** Student, Teacher, or Parent button
4. **Instantly switch** without logging in!

---

## 📋 All Available Test Accounts

| Role | Username | Password | Name |
|------|----------|----------|------|
| **Student** | `student1` | `student123` | Alex Johnson |
| **Teacher** | `teacher1` | `teacher123` | Ms. Ada Lovelace |
| **Parent** | `parent1` | `parent123` | Michael Johnson |

---

## 🧪 Testing Scenarios

### **Test Student Features:**
```
Login as: student1
Password: student123

Then navigate to:
- /student-dashboard → View student dashboard
- /challenges → Browse and start challenges
- /classrooms → View joined classrooms
- /leaderboard → See rankings
- /profile → View student profile
```

### **Test Teacher Features:**
```
Login as: teacher1
Password: teacher123

Then navigate to:
- /teacher-dashboard → Manage classrooms
- /classrooms → View teacher's classrooms
- Create challenges, view analytics
- Manage students
```

### **Test Parent Features:**
```
Login as: parent1
Password: parent123

Then navigate to:
- / → Homepage (parent view)
- /challenges → View challenges (read-only)
- /leaderboard → See child's ranking
- Monitor child's progress
```

---

## 🔒 Security Notes

⚠️ **IMPORTANT:**
- These are **TEST ACCOUNTS ONLY**
- **DO NOT USE IN PRODUCTION**
- Passwords are intentionally simple for development
- In production, implement proper authentication with:
  - Password hashing (bcrypt)
  - JWT tokens or session management
  - Secure password requirements
  - Password reset functionality

---

## 📝 Additional Test Users

Need more accounts? Check `src/utils/mockUsers.js` for:
- 4 additional student accounts
- 2 additional teacher accounts
- 2 additional parent accounts (with multiple children)

---

## 🚀 Quick Start

**Fastest way to test:**

1. Open `http://localhost:3000`
2. Click **"Log In"** button
3. Use credentials:
   - Username: `student1`
   - Password: `student123`
4. Explore the Student Dashboard!

Or switch accounts using the switcher at the bottom of the page.

---

**Happy Testing! 🎉**

Last Updated: January 2025

