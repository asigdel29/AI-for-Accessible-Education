# AI for Accessible Education

This project is an **adaptive learning platform** that personalizes courses based on the user’s learning preferences and personality traits. Using the **RAISEC personality test**, the system generates customized lesson plans, quizzes, and assessments, adjusting dynamically as users progress.

---

## Key Features  
- **Topic Selection**: Users specify a subject to learn.  
- **RAISEC Personality Test**: Determines learning style.  
- **Personalized Course Generation**: Tailored lesson plans, quizzes, and assessments.  
- **Adaptive Learning**: Course structure adjusts based on user performance.  
- **Feedback & Progress Tracking**: Users track progress and provide feedback.

---

## User Flow  
1. **Enter Topic**: Users specify a subject.  
2. **Complete RAISEC Test**: Assesses learning preferences.  
3. **Generate Course**: Custom lesson plan is created.  
4. **Adaptive Learning**: Course adapts based on quiz results.  
5. **Completion & Feedback**: Certificate issued, and feedback collected.

---

## Technology Stack

- **Frontend**: React.js, TailwindCSS
- **Backend**: GoLang
- **Database**: MongoDB
- **Authentication**: Google OAuth
- **CI/CD & Deployment**: Vercel
- **Version Control**: GitHub

---

## AI Integration

The AI model, **Meta-Llama-3.1-8B-bnb-4bit**, is **locally hosted** and trained on the following datasets:

- **LectureBank**: A corpus for NLP Education and Prerequisite Chain Learning.
- **Open University Learning Analytics Dataset (OULAD)**: Provides valuable insights into learning patterns and user engagement.

The following tasks were performed to enhance the model
- **Enhancing Training Data with Personality Metadata**: Integrating personality traits to personalize learning pathways.
- **Fine-Tuning the Model**: Refining the model's abilities by adjusting it for specific tasks or domains.
- **Implementing Dynamic Course Adaptation**: Using assessment feedback to adjust course material in real time, ensuring a personalized and adaptive learning experience.

*[Google Colab link for training notebook](https://colab.research.google.com/drive/1dbOKwKIJGd1OANHxSr6IiORZ459Ju__5?usp=sharing)*

The model is currently optimized for **Natural Language Processing (NLP)** and **Chain Learning**. To enhance its course generation, additional datasets are required. The next steps for the model include:

- **AI-based recommendations**  
- **Gamification** (badges, leaderboards)

---

## Contributing  
Feel free to contribute by reporting bugs, suggesting features, or submitting pull requests. Please follow the **Standard contribution process**.

---

This project was created during the *[Devpost MEGA Hackathon](https://mega-hackathon-2025.devpost.com/)* as part of our team submission.  

**Team Members**:  
- Anubhav Sigdel  
- Sakshyam Sarki  
- Ayusha Bhandari  
- Shrishtika Bajracharya  

---

Licensed under the MIT License.
