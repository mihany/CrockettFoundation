// Names, roles and bios are client-supplied (Member offical website bio.docx);
// portraits live in public/images/team/. Bios are verbatim except for fixing
// the "Crocket Foundation" typo in Lee West's bio.
import type { TeamMember } from "./types";

export const teamMembers: TeamMember[] = [
  {
    id: "president-founder",
    name: "Omar J. Crockett",
    role: "President & Founder",
    order: 1,
    photo: "/images/team/omar-crockett.webp",
    bio: [
      "Mr. Crockett is an educator, mentor, and youth development specialist with international experience spanning language instruction, global education, cultural immersion, and student leadership development. He currently serves as a full-time school teacher in the DMV area teaching English as a Second Language (ESL), and formally co-taught US/VA History and English Language Arts (ELA) to 100+ English learners and non-English learners.",
      "Mr. Crockett has worked in youth mentorship and leadership training through programs with The AnBryce Foundation and Virginia Commonwealth University, helping K-12 students build confidence, self-advocacy skills, and long-term academic and career goals. With academic and professional experience across Latin America, the Middle East/North Africa, and South Asia, Mr. Crockett brings a global perspective to education and cultural immersion. He has completed advanced cultural and language studies in Egypt, India, Brazil, Mexico, and Cuba, including voluntary university-level teaching experience at University of Havana where he conducted English instruction for university faculty.",
      "Mr. Crockett is fluent in English, Egyptian Arabic, Spanish, and Brazilian Portuguese, with additional proficiency in Malayalam, Hindi, and Telugu. His international background has strengthened his expertise in second-language acquisition, intercultural communication, and culturally responsive instruction, allowing him to connect with diverse learners from a wide range of linguistic and cultural communities.",
      "Mr. Crockett is currently pursuing a Ph.D. in Educational Leadership at Old Dominion University, and holds a Master of Global Affairs from The American University in Cairo and a Bachelor of Arts in Spanish from Virginia Commonwealth University. He founded The Crockett Foundation to help expand global education opportunities to low-income university and high school students. The foundation’s mission reflects Mr. Crockett’s passion for educational equity and cross-cultural training to thrive in today’s 21st century globalized workforce.",
    ],
  },
  {
    id: "secretary",
    name: "Simone Biasuzzi",
    role: "Secretary",
    order: 2,
    photo: "/images/team/simone-biasuzzi.webp",
    bio: [
      "Simone Biasuzzi is a global education enthusiast and organizational leader whose roots in international education run deep. As an international educator at Virginia Commonwealth University, she amplified Black + Abroad, a program connecting institutions, faculty, and students of color worldwide to dismantle the barriers that too often keep students of color from studying overseas — work that reflects the same mission driving The Crockett Foundation: ensuring a student's background never limits their access to transformative global experience.",
      "Today, as founder and CEO of Life Design Lab, Simone partners with organizations on strategy and organizational design, bringing more than a decade of experience translating vision into sustainable systems. She also serves as an IT Program Manager at the Virginia Community College System, leading complex, cross-functional initiatives across technology, higher education, and government.",
      "Born in the Bahamas and shaped by years living in the UK, France, and Italy before putting down roots in the U.S., Simone brings a genuinely global lens to her work. She's trilingual in English, Italian, and French, and treasures time spent visiting family in the Bahamas and Italy with her partner and their three children — the kind of cross-cultural connection she now works to open up for the next generation of students.",
      "Simone holds an MBA and is a PMP-certified project manager, with additional certifications in SAFe Agile and PROSCI Change Management.",
    ],
  },
  {
    id: "treasurer",
    name: "Lee West",
    role: "Treasurer",
    order: 3,
    photo: "/images/team/lee-west.webp",
    bio: [
      "Mr. West is an accomplished entrepreneur, licensed general contractor, real estate developer, and property management professional with more than 40 years of experience in business and construction. He is the President/Owner of SF West Construction Company, spanning over four decades, as well as the President/Owner of H&W Management Company for more than 25 years. He also previously owned and operated Bright Cut Landscaping Company for seven years. Mr. West holds several licenses as a general contractor, residential property manager, and universal HVAC licensing. His professional accomplishments include the construction of 18 homes throughout the Washington, D.C. area and serving as a General Contractor at the United States Naval Academy in Annapolis, Maryland, from 2002 to 2005. He is also a member of the National Association of Home Builders and the International Brotherhood of Electrical Workers.",
      "Mr. West has helped provide housing opportunities for homeless veterans and underprivileged families. He also serves as a board member of Kiddy Up Horse Ranch, reflecting his continued commitment to community involvement and service. Throughout his career, Mr. West has focused on creating opportunities for individuals and families to achieve greater stability and build stronger futures.",
      "Mr. West joined the Crockett Foundation to help in limiting financial barriers that can prevent individuals from reaching their full potential. The Foundation's mission to provide low-income college students with access to study-abroad opportunities aligns with his belief that education, exposure, and meaningful experiences can contribute to career readiness and long-term success.",
    ],
  },
];
