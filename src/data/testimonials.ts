export interface Testimonial {
  id: string;
  name: string;
  role: string;
  message: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sampath Nawgala',
    role: 'Software Architect at hSenid Mobile Solutions(pvt) Ltd.' ,
    message: 'I would like to recommend Anuththara as a full-stack developer. She started work with us by fixing bugs in the front end and back end. She did a great job there and she learn fast the project and address issues so quickly. She showed ownership and commitment to whatever tasks/issues she worked on. Hence we moved to feature development. She was such a great team player, passionate, and responsible for her work. She always delivers customer work on time with great trust. So I always recommend Anuththara as a great developer who has the capability to achieve your customer needs effectively and efficiently.',
    avatar: '/assets/testimonials/sarah.jpg'
  },
  {
    id: '2',
    name: 'Isuru Buddhika Pathirana',
    role: 'Lead Developer & Team Lead | Associate Technical Specialist @ Wiley | Building scalable distributed',
    message: "I would always recommend Anuththara as a passionate software developer with experience in frontend and backend development. She is always willing to learn and adapt to new technologies, and she did a great job supporting the team by using her problem-solving skills to deliver value to customers on time. Apart from her technical skills, she did a great job grasping the complex domain knowledge required to work efficiently on the project. Once again, I'd recommend Anuththara as a skilled developer and a great team player with a charming personality.",
    avatar: '/assets/testimonials/michael.jpg'
  }
  ,
  {
    id: '3',
    name: 'Abid Hasan',
    role: ' ',
    message: '',
    avatar: '/assets/testimonials/emily.jpg'
  }
]; 