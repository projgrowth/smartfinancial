import React from 'react';
import { CheckCircle, Calendar } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const teamMembers = [
  {
    name: 'Dr. Richard Evans',
    title: 'CEO & Lead Financial Planner',
    image: '/lovable-uploads/83c79661-f83a-4390-a3ed-d2cbea760fab.png',
    description:
      'Richard is the visionary behind Smart Financial Planning. With a Ph.D. in Finance and over 20 years of experience, he specializes in crafting comprehensive financial strategies for high-net-worth individuals.',
    specializations: ['Retirement Planning', 'Investment Management', 'Estate Planning'],
    credentials: [
      'Ph.D. in Finance',
      'Certified Financial Planner (CFP®)',
      'Series 65 License',
    ],
  },
  {
    name: 'Aisha Khan, MBA',
    title: 'Senior Financial Advisor',
    image: '/lovable-uploads/9a1a6d90-cf14-4f3e-a92d-2ac3bb515025.png',
    description:
      'Aisha brings a wealth of knowledge in investment and portfolio management. With an MBA from Harvard Business School, she excels in creating customized investment plans tailored to each client’s unique risk profile.',
    specializations: ['Investment Planning', 'Portfolio Management', 'Risk Assessment'],
    credentials: [
      'MBA, Harvard Business School',
      'Chartered Financial Analyst (CFA®)',
      'Series 7 & 63 Licenses',
    ],
  },
  {
    name: 'Carlos Ramirez, JD',
    title: 'Tax & Estate Planning Specialist',
    image: '/lovable-uploads/c90c6dda-53e6-45f2-8b9b-d36329401aa9.png',
    description:
      'Carlos is our expert in tax optimization and estate planning. With a Juris Doctor degree, he helps clients minimize their tax liabilities and ensure their assets are protected for future generations.',
    specializations: ['Tax Planning', 'Estate Planning', 'Legal Compliance'],
    credentials: [
      'Juris Doctor (JD)',
      'Enrolled Agent (EA)',
      'Certified Trust and Estate Advisor (CTEA)',
    ],
  },
];

const TeamDetails = () => {
  return (
    <section id="team" className="section-large bg-background">
      <div className="container-standard">
        <div className="text-center mb-16">
          <ScrollReveal>
            <h2 className="heading-2 text-foreground mb-6">
              Meet Your Financial Advisory Team
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={150}>
            <p className="text-large mx-auto">
              Our experienced professionals bring decades of expertise in financial planning, 
              investment management, and wealth preservation strategies.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid-two grid-gap-large max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <ScrollReveal key={member.name} delay={index * 150}>
              <div className="card-premium text-center">
                <div className="mb-8">
                  <div className="w-48 h-48 mx-auto mb-6 overflow-hidden rounded-full border-4 border-accent/20">
                    <img
                      src={member.image}
                      alt={`${member.name} - ${member.title}`}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                  
                  <h3 className="heading-3 text-foreground mb-2">{member.name}</h3>
                  <p className="text-accent font-medium mb-4">{member.title}</p>
                  <p className="text-body mb-6">{member.description}</p>
                </div>

                <div className="spacing-medium">
                  <div>
                    <h4 className="heading-5 text-foreground mb-4">Specializations</h4>
                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                      {member.specializations.map((spec, specIndex) => (
                        <span
                          key={specIndex}
                          className="px-3 py-1 bg-accent/10 text-accent text-small rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="heading-5 text-foreground mb-4">Education & Credentials</h4>
                    <ul className="spacing-small text-left max-w-sm mx-auto">
                      {member.credentials.map((credential, credIndex) => (
                        <li key={credIndex} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-accent mr-3 mt-1 flex-shrink-0" />
                          <span className="text-small">{credential}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <button className="btn-outline group">
                    <span>Schedule a Consultation</span>
                    <Calendar className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamDetails;
